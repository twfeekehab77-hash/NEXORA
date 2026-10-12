import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import TRTC from "trtc-sdk-v5";
import { supabase } from "./lib/supabaseClient";

const channelName = (id) => `nexora-call-${id}`;

async function sendSignal(id, payload) {
  const channel = supabase.channel(channelName(id));
  try {
    await new Promise((resolve, reject) => {
      channel.subscribe((status) => {
        if (status === "SUBSCRIBED") resolve();
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          reject(new Error("تعذّر الاتصال بخدمة إشارات المكالمات."));
        }
      });
    });
    const result = await channel.send({
      type: "broadcast",
      event: "call-signal",
      payload,
    });
    if (result !== "ok") throw new Error("تعذّر إرسال إشارة المكالمة.");
  } finally {
    await supabase.removeChannel(channel);
  }
}

export default function CallManager({ session, selectedChat }) {
  const [host, setHost] = useState(null);
  const [incoming, setIncoming] = useState(null);
  const [active, setActive] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const clientRef = useRef(null);
  const activeRef = useRef(null);
  const incomingRef = useRef(null);

  useEffect(() => { activeRef.current = active; }, [active]);
  useEffect(() => { incomingRef.current = incoming; }, [incoming]);

  useEffect(() => {
    setHost(document.getElementById("nexora-call-actions"));
  }, [selectedChat?.id]);

  const credentials = useCallback(async () => {
    const { data, error } = await supabase.functions.invoke("trtc-user-sig");
    if (error) throw error;
    if (!data?.sdkAppId || !data?.userId || !data?.userSig) {
      throw new Error(data?.error || "بيانات الاتصال غير مكتملة.");
    }
    return data;
  }, []);

  const cleanup = useCallback(async () => {
    const client = clientRef.current;
    clientRef.current = null;
    activeRef.current = null;
    setActive(null);
    setIncoming(null);
    setBusy(false);
    if (client) {
      try { await client.exitRoom(); }
      catch (e) { console.warn("TRTC exitRoom:", e); }
    }
  }, []);

  const join = useCallback(async (call, auth) => {
    const client = TRTC.create();
    clientRef.current = client;
    activeRef.current = call;
    setActive(call);
    setIncoming(null);

    if (TRTC.EVENT?.REMOTE_VIDEO_AVAILABLE) {
      client.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, ({ userId }) => {
        if (activeRef.current?.type === "video") {
          client.startRemoteVideo({
            userId,
            view: "nexora-remote-video",
          });
        }
      });
    }

    await client.enterRoom({
      sdkAppId: Number(auth.sdkAppId),
      userId: auth.userId,
      userSig: auth.userSig,
      strRoomId: call.roomId,
      scene: "rtc",
      autoReceiveAudio: true,
      autoReceiveVideo: true,
    });
    await client.startLocalAudio();

    if (call.type === "video") {
      await client.startLocalVideo({
        view: "nexora-local-video",
        option: { profile: "480p", useFrontCamera: true },
      });
    }
  }, []);

  const startCall = useCallback(async (type) => {
    if (!session?.user?.id || !selectedChat?.id ||
        busy || activeRef.current) return;

    if (selectedChat.id === session.user.id) {
      setError("لا يمكنك الاتصال بحسابك الشخصي.");
      return;
    }

    setBusy(true);
    setError("");

    const call = {
      kind: "invite",
      type,
      roomId: String(Math.floor(100000000 + Math.random() * 900000000)),
      fromId: session.user.id,
      toId: selectedChat.id,
      fromName: session.user.user_metadata?.full_name ||
        session.user.email || "NEXORA User",
    };

    try {
      const auth = await credentials();
      await sendSignal(selectedChat.id, call);
      await join(call, auth);
    } catch (e) {
      console.error("NEXORA call failed:", e);
      setError(e?.message || "تعذّر بدء المكالمة.");
      await cleanup();
    } finally {
      setBusy(false);
    }
  }, [session, selectedChat, busy, credentials, join, cleanup]);

  const accept = useCallback(async () => {
    const call = incomingRef.current;
    if (!call || busy) return;
    setBusy(true);
    setError("");
    try {
      const auth = await credentials();
      await join(call, auth);
    } catch (e) {
      console.error("NEXORA accept call failed:", e);
      setError(e?.message || "تعذّر قبول المكالمة.");
      await cleanup();
    } finally {
      setBusy(false);
    }
  }, [busy, credentials, join, cleanup]);

  const decline = useCallback(async () => {
    const call = incomingRef.current;
    if (call?.fromId) {
      try {
        await sendSignal(call.fromId, {
          kind: "end", roomId: call.roomId,
          fromId: session?.user?.id,
        });
      } catch (e) { console.warn(e); }
    }
    setIncoming(null);
  }, [session?.user?.id]);

  const hangUp = useCallback(async () => {
    const call = activeRef.current;
    const otherId = call?.fromId === session?.user?.id
      ? call?.toId : call?.fromId;

    if (otherId) {
      try {
        await sendSignal(otherId, {
          kind: "end", roomId: call.roomId,
          fromId: session?.user?.id,
        });
      } catch (e) { console.warn(e); }
    }
    await cleanup();
  }, [session?.user?.id, cleanup]);

  useEffect(() => {
    const id = session?.user?.id;
    if (!id) {
      setIncoming(null);
      return;
    }

    const channel = supabase.channel(channelName(id));
    channel.on("broadcast", { event: "call-signal" }, ({ payload }) => {
      if (!payload || payload.fromId === id) return;

      if (payload.kind === "invite" && payload.toId === id &&
          !activeRef.current && !incomingRef.current) {
        setIncoming(payload);
      }

      if (payload.kind === "end" &&
          activeRef.current?.roomId === payload.roomId) {
        void cleanup();
      }

      if (payload.kind === "end" &&
          incomingRef.current?.roomId === payload.roomId) {
        setIncoming(null);
      }
    });
    channel.subscribe((status) => {
      if (status === "CHANNEL_ERROR") {
        console.error("NEXORA call signaling channel failed.");
      }
    });

    return () => { void supabase.removeChannel(channel); };
  }, [session?.user?.id, cleanup]);

  const btn = {
    border: 0, borderRadius: 10, padding: "10px 16px",
    cursor: "pointer", fontSize: 16,
  };

  return (
    <>
      {host && selectedChat && session?.user?.id &&
        createPortal(
          <div style={{ display: "flex", gap: 8 }}>
            <button title="اتصال صوتي" aria-label="اتصال صوتي"
              disabled={busy || !!active}
              onClick={() => void startCall("audio")}
              style={{ ...btn, padding: 8, background: "#e0f2fe" }}>
              📞
            </button>
            <button title="اتصال فيديو" aria-label="اتصال فيديو"
              disabled={busy || !!active}
              onClick={() => void startCall("video")}
              style={{ ...btn, padding: 8, background: "#ede9fe" }}>
              🎥
            </button>
          </div>,
          host
        )}

      {(incoming || active || error) && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 20000,
          background: "rgba(0,0,0,.75)", display: "flex",
          alignItems: "center", justifyContent: "center", padding: 16,
        }}>
          <section role="dialog" aria-modal="true" style={{
            width: "100%", maxWidth: 560, padding: 20,
            borderRadius: 16, background: "#111827", color: "white",
            textAlign: "center", boxSizing: "border-box",
          }}>
            {incoming && !active && !error && <>
              <h2>مكالمة {incoming.type === "video" ? "فيديو" : "صوتية"} واردة</h2>
              <p>{incoming.fromName || "مستخدم NEXORA"}</p>
              <button disabled={busy} onClick={() => void accept()}
                style={{ ...btn, background: "#16a34a", color: "white" }}>
                قبول
              </button>
              <button onClick={() => void decline()}
                style={{ ...btn, background: "#dc2626", color: "white", marginInlineStart: 10 }}>
                رفض
              </button>
            </>}

            {active && !error && <>
              <h2>مكالمة {active.type === "video" ? "فيديو" : "صوتية"}</h2>
              {active.type === "video" && <div style={{
                position: "relative", minHeight: 220,
                background: "#030712", borderRadius: 12, overflow: "hidden",
              }}>
                <div id="nexora-remote-video" style={{ width: "100%", height: 300 }} />
                <div id="nexora-local-video" style={{
                  position: "absolute", right: 10, bottom: 10,
                  width: 110, height: 150, background: "#374151",
                }} />
              </div>}
              <button onClick={() => void hangUp()}
                style={{ ...btn, background: "#dc2626", color: "white" }}>
                إنهاء المكالمة
              </button>
            </>}

            {error && <>
              <p role="alert">{error}</p>
              <button onClick={() => setError("")} style={btn}>إغلاق</button>
            </>}
          </section>
        </div>
      )}
    </>
  );
}
