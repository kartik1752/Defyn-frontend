import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [guilds, setGuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_BASE = "https://defyn-backend.onrender.com";

  // Fetch with credentials for every request
  const fetchWithCredentials = async (url) => {
    try {
      const res = await fetch(`${API_BASE}${url}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      return await res.json();
    } catch (err) {
      console.error(`Fetch error for ${url}:`, err);
      throw err;
    }
  };

  // Check login status immediately when component mounts
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        setLoading(true);
        
        // Check URL for login success param (from callback)
        const params = new URLSearchParams(window.location.search);
        if (params.get('login') === 'success') {
          console.log("Login successful, loading dashboard...");
          // Clean URL
          window.history.replaceState({}, '', '/dashboard');
        }
        
        // Fetch user data
        const userData = await fetchWithCredentials('/auth/user');
        
        if (userData.error) {
          console.log("Not authenticated, redirecting to home");
          navigate('/');
          return;
        }
        
        setUser(userData);
        
        // Fetch guilds
        const guildData = await fetchWithCredentials('/auth/guilds');
        setGuilds(Array.isArray(guildData) ? guildData : []);
        
      } catch (err) {
        console.error("Dashboard load error:", err);
        setError("Failed to load dashboard. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [navigate]);

  // Test session (debug function)
  const testSession = async () => {
    try {
      const res = await fetch(`${API_BASE}/health`, {
        credentials: 'include'
      });
      const data = await res.json();
      console.log("Session test:", data);
    } catch (err) {
      console.error("Session test failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <h2>Loading your dashboard...</h2>
        <button onClick={testSession} style={{marginTop: '20px'}}>
          Debug Session
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <h2>❌ {error}</h2>
        <button onClick={() => window.location.reload()}>Retry</button>
        <button onClick={testSession} style={{marginLeft: '10px'}}>
          Debug
        </button>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.username}!</h1>
      
      <div className="servers-section">
        <h2>Your Servers</h2>
        {guilds.length === 0 ? (
          <p>No admin servers found</p>
        ) : (
          <div className="servers-grid">
            {guilds.map(guild => (
              <div key={guild.id} className="server-card">
                <h3>{guild.name}</h3>
                <Link to={`/dashboard/${guild.id}`}>
                  <button>Configure</button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;