import { useState } from "react";

function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>NEXORA</h1>
        <p>{isRegister ? "Create your account" : "Welcome back"}</p>

        {isRegister && (
          <input
            type="text"
            placeholder="Full name"
          />
        )}

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button onClick={onLogin}>
          {isRegister ? "Create Account" : "Login"}
        </button>

        <div className="login-switch">
          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            className="switch-btn"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;