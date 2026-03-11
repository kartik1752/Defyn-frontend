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

  const getGuildIcon = (guild) => {
    if (!guild.icon) {
      return "https://cdn-icons-png.flaticon.com/512/5968/5968756.png";
    }
    return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
  };

  const fetchUser = async () => {
    try {
      const res = await fetch(
        "https://defyn-backend.onrender.com/auth/user",
        { credentials: "include" }
      );
      return res.json();
    } catch {
      return { error: true };
    }
  };

  const fetchGuilds = async () => {
    try {
      const res = await fetch(
        "https://defyn-backend.onrender.com/auth/guilds",
        { credentials: "include" }
      );
      return res.json();
    } catch {
      return [];
    }
  };

  useEffect(() => {

    const loadData = async () => {

      const userData = await fetchUser();

      if (!userData || userData.error) {
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
    return <div className="loading">Loading Dashboard...</div>;
  }

  return (

    <div className="dashboard">

      <div className="container">

        {/* USER CARD */}

        <div className="user-card">

          <img
            src={getAvatarUrl(user)}
            alt="avatar"
            className="avatar"
          />

          <div>
            <h2>{user.username}</h2>
            <p>Manage your Discord servers</p>
          </div>

        </div>

        {/* COMMANDS BUTTON */}

        <div className="dashboard-actions">

          <Link to="/commands">
            <button className="commands-btn">
              📜 View Bot Commands
            </button>
          </Link>

        </div>

        <h2 className="section-title">Your Servers</h2>

        <div className="servers-grid">

          {guilds.map((guild) => (

            <div key={guild.id} className="server-card">

              <div className="server-header">

                <img
                  src={getGuildIcon(guild)}
                  alt="server icon"
                  className="server-icon"
                />

                <div>
                  <h3>{guild.name}</h3>
                  <p className="server-members">
                    👥 {guild.memberCount || "Unknown"} members
                  </p>
                </div>

              </div>

              <p className="server-id">ID: {guild.id}</p>

              <div className="server-buttons">

                <Link to={`/dashboard/${guild.id}`}>
                  <button className="manage-btn">
                    Manage
                  </button>
                </Link>

                <a
                  href={`https://discord.com/oauth2/authorize?client_id=1473684574411296838&scope=bot&permissions=8&guild_id=${guild.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="invite-btn">
                    Invite
                  </button>
                </a>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default Dashboard;