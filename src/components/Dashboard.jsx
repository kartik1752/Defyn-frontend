import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "../pages/Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [guilds, setGuilds] = useState([]);

  const getAvatarUrl = (user) => {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
  };

  const fetchUser = async () => {
    const res = await fetch("https://defyn-backend.onrender.com/auth/user", {
      credentials: "include",
    });
    return res.json();
  };

  const fetchGuilds = async () => {
    const res = await fetch("https://defyn-backend.onrender.com/auth/guilds", {
      credentials: "include",
    });
    return res.json();
  };

  useEffect(() => {
    const loadData = async () => {
      const userData = await fetchUser();

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

      <div className="user-info">
        <img src={getAvatarUrl(user)} alt="avatar" className="avatar" />
        <h2>Welcome, {user.username}</h2>
      </div>

      <h2>Your Servers</h2>

      <div className="servers">
        {guilds.map((guild) => (
          <div key={guild.id} className="server-card">
            <h3>{guild.name}</h3>
            <p>Server ID: {guild.id}</p>
            
            <div className="server-actions">
              {/* ✅ Use Link instead of <a> */}
              <Link to={`/dashboard/${guild.id}`}>
                <button className="manage-btn">Manage Server</button>
              </Link>
              
              {/* ✅ Keep <a> for external links */}
              <a 
                href={`https://discord.com/oauth2/authorize?client_id=1473684574411296838&scope=bot&permissions=8&guild_id=${guild.id}`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="invite-btn">Invite Bot</button>
              </a>
            </div>
          </div>
        ))}
      </div>

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