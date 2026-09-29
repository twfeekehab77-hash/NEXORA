import { useState } from "react";
import "./App.css";

function App() {
  const [active, setActive] = useState("Home");

  const menu = [
    { name: "Home", icon: "🏠" },
    { name: "Explore", icon: "🔎" },
    { name: "Messages", icon: "💬" },
    { name: "Notifications", icon: "🔔" },
    { name: "Profile", icon: "👤" },
  ];

  return (
    <div className="nexora">
      <aside className="sidebar">
        <div className="logo">NEXORA</div>

        <nav>
          {menu.map((item) => (
            <button
              key={item.name}
              className={active === item.name ? "menu active" : "menu"}
              onClick={() => setActive(item.name)}
            >
              <span>{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <button className="create-btn">＋ Create Post</button>

        <div className="developer-card">
          <div className="avatar">D</div>
          <div>
            <strong>Developer</strong>
            <small>Developer Account ✓</small>
          </div>
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <h1>{active}</h1>
          <div className="search">
            🔎 <input placeholder="Search NEXORA..." />
          </div>
          <div className="profile-mini">D</div>
        </header>

        <section className="welcome">
          <h2>Welcome to NEXORA 🚀</h2>
          <p>
            Connect, share, discover and communicate in one place.
          </p>
          <button className="primary-btn">Create your first post</button>
        </section>

        <section className="feed">
          <article className="post">
            <div className="post-header">
              <div className="avatar">D</div>
              <div>
                <strong>NEXORA Developer ✓</strong>
                <span>@developer · Just now</span>
              </div>
            </div>

            <p>
              Welcome to NEXORA! This is the beginning of our new social
              platform.
            </p>

            <div className="post-actions">
              <button>♡ Like</button>
              <button>💬 Comment</button>
              <button>↗ Share</button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;