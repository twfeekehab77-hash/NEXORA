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

    setLoading(true);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setMessage(error.message);
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage(
          "تم إنشاء الحساب بنجاح. تحقق من بريدك الإلكتروني إذا طُلب منك ذلك."
        );
        setMode("login");
      }
    }

    setLoading(false);
  }

  async function handleResetPassword() {
    if (!email.trim()) {
      setMessage("اكتب بريدك الإلكتروني أولًا.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      {
        redirectTo: window.location.origin,
      }
    );

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك.");
    }

    setLoading(false);
  }

  function switchMode() {
    setMode((current) => (current === "login" ? "signup" : "login"));
    setMessage("");
  }

  return (
    <main className="nexora-auth-page" dir="rtl">
      <section className="nexora-egypt-side">
        <div className="egypt-sky">
          <div className="egypt-glow glow-one"></div>
          <div className="egypt-glow glow-two"></div>

          <div className="nexora-hero-brand">
            <div className="hero-logo">
              <span>N</span>
              <i></i>
            </div>

            <h1>NEXORA</h1>

            <div className="hero-tagline">
              <span>Connect</span>
              <b>•</b>
              <span>Share</span>
              <b>•</b>
              <span>Be Together</span>
            </div>
          </div>

          <div className="cairo-skyline">
            <div className="building building-one"></div>
            <div className="building building-two"></div>
            <div className="building building-three"></div>
            <div className="building building-four"></div>
            <div className="building building-five"></div>

            <div className="cairo-tower">
              <div className="tower-top"></div>
              <div className="tower-body"></div>
              <div className="tower-base"></div>
            </div>
          </div>

          <div className="egypt-flag">
            <div className="flag-red"></div>
            <div className="flag-white">
              <span>🦅</span>
            </div>
            <div className="flag-black"></div>
          </div>

          <div className="egypt-wave"></div>

          <div className="hero-bottom-text">
            <h2>معًا نبني مجتمعًا أفضل</h2>
            <div></div>
          </div>

          <div className="egypt-label">
            <span>🇪🇬</span>
            <span>من مصر إلى العالم</span>
          </div>
        </div>
      </section>

      <section className="nexora-login-side">
        <div className="login-card">
          <div className="mobile-brand">
            <div className="mobile-logo">N</div>
            <strong>NEXORA</strong>
          </div>

          <div className="login-brand">
            <div className="login-logo">
              <span>N</span>
              <i></i>
            </div>

            <h2>NEXORA</h2>

            <h3>
              {mode === "login"
                ? "مرحبًا بك في نكسورا"
                : "انضم إلى نكسورا"}
            </h3>

            <p>
              {mode === "login"
                ? "سجل الدخول للمتابعة والتواصل مع أصدقائك واكتشاف محتوى جديد."
                : "أنشئ حسابك وابدأ التواصل مع مجتمع NEXORA."}
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div className="input-group">
                <label>الاسم الكامل</label>

                <div className="input-wrapper">
                  <span className="input-icon">👤</span>

                  <input
                    type="text"
                    value={fullName}
                    onChange={(event) =>
                      setFullName(event.target.value)
                    }
                    placeholder="اكتب اسمك الكامل"
                  />
                </div>
              </div>
            )}

            <div className="input-group">
              <label>البريد الإلكتروني أو رقم الهاتف</label>

              <div className="input-wrapper">
                <span className="input-icon">♙</span>

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="البريد الإلكتروني أو رقم الهاتف"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="input-group">
              <label>كلمة المرور</label>

              <div className="input-wrapper">
                <span className="input-icon">♙</span>

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="كلمة المرور"
                  autoComplete={
                    mode === "login"
                      ? "current-password"
                      : "new-password"
                  }
                />

                <button
                  type="button"
                  className="eye-button"
                  onClick={() =>
                    setShowPassword((value) => !value)
                  }
                  aria-label="إظهار كلمة المرور"
                >
                  {showPassword ? "◉" : "◌"}
                </button>
              </div>
            </div>

            {mode === "login" && (
              <button
                type="button"
                className="forgot-button"
                onClick={handleResetPassword}
                disabled={loading}
              >
                نسيت كلمة المرور؟
              </button>
            )}

            {message && (
              <div className="login-message">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="login-main-button"
              disabled={loading}
            >
              {loading
                ? "جاري التنفيذ..."
                : mode === "login"
                ? "تسجيل الدخول"
                : "إنشاء حساب جديد"}

              <span>→</span>
            </button>
          </form>

          <div className="or-divider">
            <span></span>
            <b>أو</b>
            <span></span>
          </div>

          <button
            type="button"
            className="google-button"
            onClick={() =>
              setMessage(
                "تسجيل الدخول باستخدام Google يحتاج إلى تفعيل Google Provider في Supabase."
              )
            }
          >
            <span className="google-icon">G</span>
            <span>تسجيل الدخول باستخدام Google</span>
          </button>

          <div className="switch-account">
            <span>
              {mode === "login"
                ? "ليس لديك حساب؟"
                : "لديك حساب بالفعل؟"}
            </span>

            <button type="button" onClick={switchMode}>
              {mode === "login"
                ? "إنشاء حساب جديد"
                : "تسجيل الدخول"}
            </button>
          </div>

          <div className="language-selector">
            <span>🇪🇬</span>
            <span>العربية</span>
            <span className="arrow-down">⌄</span>
          </div>

          <div className="login-footer">
            <span>NEXORA</span>
            <b>•</b>
            <span>مصر 🇪🇬</span>
          </div>
        </div>
      </section>
    </main>
  );
}
