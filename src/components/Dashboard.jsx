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

        <h2 className="section-title">Your Servers</h2>

        <div className="servers-grid">

          {guilds.map((guild) => (

            <div key={guild.id} className="server-card">

              <h3>{guild.name}</h3>

              <p>ID: {guild.id}</p>

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