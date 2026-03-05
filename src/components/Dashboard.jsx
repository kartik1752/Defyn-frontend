import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [guilds, setGuilds] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAvatarUrl = (user) => {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
  };

  const fetchUser = async () => {
    try {
      const res = await fetch(
        "https://defyn-backend.onrender.com/auth/user",
        {
          credentials: "include"
        }
      );

      return res.json();

    } catch (err) {
      console.error("User fetch failed:", err);
      return { error: true };
    }
  };

  const fetchGuilds = async () => {
    try {
      const res = await fetch(
        "https://defyn-backend.onrender.com/auth/guilds",
        {
          credentials: "include"
        }
      );

      return res.json();

    } catch (err) {
      console.error("Guild fetch failed:", err);
      return [];
    }
  };

  useEffect(() => {

    const loadData = async () => {

      const userData = await fetchUser();

      if (!userData || userData.error) {
        console.log("Not authenticated → redirecting");
        navigate("/");
        return;
      }

      setUser(userData);

      const guildData = await fetchGuilds();
      setGuilds(guildData);

      setLoading(false);
    };

    loadData();

  }, [navigate]);

  if (loading) {
    return <h2 style={{textAlign:"center"}}>Loading Dashboard...</h2>;
  }

  return (
    <div className="dashboard">

      <h1>🚀 DEFYN Dashboard</h1>

      <div className="user-info">
        <img
          src={getAvatarUrl(user)}
          alt="avatar"
          className="avatar"
        />
        <h2>Welcome, {user.username}</h2>
      </div>

      <h2>Your Servers</h2>

      <div className="servers">

        {guilds.length === 0 && (
          <p>You don't manage any servers.</p>
        )}

        {guilds.map((guild) => (

          <div key={guild.id} className="server-card">

            <h3>{guild.name}</h3>

            <p>Server ID: {guild.id}</p>

            <div className="server-actions">

              <Link to={`/dashboard/${guild.id}`}>
                <button className="manage-btn">
                  Manage Server
                </button>
              </Link>

              <a
                href={`https://discord.com/oauth2/authorize?client_id=1473684574411296838&scope=bot&permissions=8&guild_id=${guild.id}`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="invite-btn">
                  Invite Bot
                </button>
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