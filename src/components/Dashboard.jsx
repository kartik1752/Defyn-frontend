import { useEffect, useState } from "react";
import "../pages/Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [guilds, setGuilds] = useState([]);

  // ✅ Avatar URL
  const getAvatarUrl = (user) => {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
  };

  // ✅ Fetch user
  const fetchUser = async () => {
    const res = await fetch("https://defyn-backend.vercel.app/auth/user", {
      credentials: "include",
    });
    return res.json();
  };

  // ✅ Fetch guilds
  const fetchGuilds = async () => {
    const res = await fetch("https://defyn-backend.vercel.app/auth/guilds", {
      credentials: "include",
    });
    return res.json();
  };

  // ✅ Load data
  useEffect(() => {
    const loadData = async () => {
      const userData = await fetchUser();

      // 🔐 Not logged in → redirect
      if (userData.error) {
        window.location.href = "/";
        return;
      }

      setUser(userData);

      const guildData = await fetchGuilds();
      setGuilds(guildData);
    };

    loadData();
  }, []);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="dashboard">
      <h1>🚀 DEFYN Dashboard</h1>

      {/* 👤 USER INFO */}
      <div className="user-info">
        <img src={getAvatarUrl(user)} alt="avatar" className="avatar" />
        <h2>
          Welcome, {user.username}#{user.discriminator}
        </h2>
      </div>

      {/* 🏠 SERVERS */}
      <h2>Your Servers</h2>

      <div className="servers">
        {guilds.map((guild) => (
          <div key={guild.id} className="server-card">
            <h3>{guild.name}</h3>
            <p>Server ID: {guild.id}</p>

            
            <a
              href={`https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&scope=bot&permissions=8&guild_id=${guild.id}`}
              target="_blank"
              rel="noreferrer"
            >
              <a href={`/dashboard/${guild.id}`}>
  <button className="add-btn">Manage Server</button>
</a>
            </a>
          </div>
        ))}
      </div>

      {/* 🔥 FEATURES */}
      <h2>Features</h2>

      <div className="features-grid">
        <div className="feature-card">🚫 Anti-Spam</div>
        <div className="feature-card">⚔️ Anti-Raid</div>
        <div className="feature-card">🤖 AI Moderation</div>
      </div>
    </div>
  );
}

export default Dashboard;