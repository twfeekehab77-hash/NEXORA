import { useState } from "react";
import { supabase } from "./lib/supabaseClient";
import "./Login.css";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setMessage("من فضلك أدخل البريد الإلكتروني وكلمة المرور.");
      return;
    }

    if (mode === "signup" && !fullName.trim()) {
      setMessage("من فضلك أدخل اسمك الكامل.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) setMessage(error.message);
      } else {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { full_name: fullName.trim() } },
        });

        if (error) {
          setMessage(error.message);
        } else {
          setMessage("تم إنشاء الحساب بنجاح. تحقق من بريدك الإلكتروني إذا طُلب منك ذلك.");
          setMode("login");
        }
      }
    } catch {
      setMessage("حدث خطأ في الاتصال. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword() {
    if (!email.trim()) {
      setMessage("اكتب بريدك الإلكتروني أولًا.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        { redirectTo: window.location.origin }
      );

      setMessage(
        error
          ? error.message
          : "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك."
      );
    } catch {
      setMessage("تعذر إرسال الرابط. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  function switchMode() {
    setMode((current) => current === "login" ? "signup" : "login");
    setMessage("");
  }

  return (
    <main className="nexora-auth-page" dir="rtl">
      <section className="nexora-visual-side">
        <div className="nexora-top-brand">
          <div className="nexora-mark">N<span>.</span></div>
          <span>NEXORA</span>
        </div>

        <div className="egypt-art">
          <div className="egypt-sun" />
          <div className="egypt-pyramid pyramid-back" />
          <div className="egypt-pyramid pyramid-front" />
          <div className="egypt-ground" />
          <div className="egypt-flag" aria-label="علم مصر">
            <span className="flag-red" />
            <span className="flag-white"><b>★</b></span>
            <span className="flag-black" />
          </div>
          <div className="egypt-caption">
            <span>من مصر إلى العالم</span>
            <h1>عالمك، <em>على طريقتك.</em></h1>
            <p>تواصل. شارك لحظاتك. واكتشف مجتمعًا يشبهك.</p>
          </div>
          <div className="art-glow" />
        </div>

        <div className="visual-footer">
          <span><i /> مساحة تجمعنا</span>
          <span>تواصل بلا حدود</span>
        </div>
      </section>

      <section className="nexora-form-side">
        <div className="login-card">
          <div className="mobile-brand">
            <div className="nexora-mark">N<span>.</span></div>
            <span>NEXORA</span>
          </div>

          <div className="form-heading">
            <div className="welcome-tag"><span /> أهلاً بك في مجتمعنا</div>
            <h2>{mode === "login" ? "مرحبًا بعودتك" : "أنشئ حسابك"}</h2>
            <p>
              {mode === "login"
                ? "سجّل الدخول لتكمل رحلتك مع NEXORA."
                : "خطوة واحدة تفصلك عن مجتمع NEXORA."}
            </p>
          </div>

          <div className="auth-tabs">
            <button
              type="button"
              className={mode === "login" ? "active" : ""}
              onClick={() => { setMode("login"); setMessage(""); }}
            >
              تسجيل الدخول
            </button>
            <button
              type="button"
              className={mode === "signup" ? "active" : ""}
              onClick={() => { setMode("signup"); setMessage(""); }}
            >
              حساب جديد
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div className="input-group">
                <label htmlFor="nexora-fullname">الاسم الكامل</label>
                <div className="input-wrapper">
                  <span className="field-symbol">♙</span>
                  <input
                    id="nexora-fullname"
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="اكتب اسمك الكامل"
                    autoComplete="name"
                  />
                </div>
              </div>
            )}

            <div className="input-group">
              <label htmlFor="nexora-email">البريد الإلكتروني</label>
              <div className="input-wrapper">
                <span className="field-symbol">✉</span>
                <input
                  id="nexora-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  dir="ltr"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="nexora-password">كلمة المرور</label>
              <div className="input-wrapper">
                <span className="field-symbol">♙</span>
                <input
                  id="nexora-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="أدخل كلمة المرور"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  dir="ltr"
                  required
                />
                <button
                  type="button"
                  className="eye-button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                >
                  {showPassword ? "إخفاء" : "عرض"}
                </button>
              </div>
            </div>

            {mode === "login" && (
              <div className="forgot-row">
                <button
                  type="button"
                  className="forgot-button"
                  onClick={handleResetPassword}
                  disabled={loading}
                >
                  نسيت كلمة المرور؟
                </button>
              </div>
            )}

            {message && (
              <div className="login-message" role="status">{message}</div>
            )}

            <button type="submit" className="login-main-button" disabled={loading}>
              <span>
                {loading
                  ? "جارٍ التنفيذ..."
                  : mode === "login" ? "تسجيل الدخول" : "إنشاء حساب جديد"}
              </span>
              <span className="submit-arrow">←</span>
            </button>
          </form>

          <div className="or-divider"><span /> <b>أو تابع باستخدام</b> <span /></div>

          <button
            type="button"
            className="google-button"
            onClick={() => setMessage("لتفعيل Google، افتح Supabase ثم Authentication ثم Sign In / Providers وفعّل Google.")}
          >
            <span className="google-icon">G</span>
            <span>المتابعة باستخدام Google</span>
          </button>

          <p className="switch-account">
            {mode === "login" ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}
            <button type="button" onClick={switchMode}>
              {mode === "login" ? " أنشئ حسابًا الآن" : " سجّل الدخول"}
            </button>
          </p>

          <div className="form-legal">
            بالمتابعة، أنت توافق على شروط الاستخدام وسياسة الخصوصية.
          </div>
        </div>
      </section>
    </main>
  );
}
