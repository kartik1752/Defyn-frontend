import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "../pages/ServerConfig.css";
import ServerCharts from "../components/ServerCharts";
import TopStats from "../components/TopStats";
import ServerGrowth from "../components/ServerGrowth";
import ServerInsights from "../components/ServerInsights";

function ServerConfig() {

  const { guildId } = useParams();

  /* =========================
     STATES
  ========================= */

  const [settings, setSettings] = useState({
    antiSpam: false,
    antiRaid: false,
    aiMod: false
  });

  const [activity, setActivity] = useState([]);

  const [stats, setStats] = useState({
    messages: 0,
    activeHours: 0,
    peakHour: "-"
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* =========================
     FETCH CONFIG
  ========================= */

  useEffect(() => {

    const fetchConfig = async () => {

      try {

        const res = await fetch(
          `https://defyn-backend.onrender.com/config/${guildId}`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error("Failed to fetch config");

        const data = await res.json();

        if (data) setSettings(data);

      } catch (err) {

        console.error("Config fetch error:", err);
        setError("Failed to load server configuration");

      }

    };

    fetchConfig();

  }, [guildId]);


  /* =========================
     FETCH ACTIVITY DATA
  ========================= */

  useEffect(() => {

    let interval;

    const fetchActivity = async () => {

      try {

        const res = await fetch(
          `https://defyn-backend.onrender.com/activity/${guildId}`
        );

        if (!res.ok) throw new Error("Activity fetch failed");

        const data = await res.json();

        if (!Array.isArray(data)) return;

        setActivity(data);

        /* =========================
           CALCULATE STATS
        ========================= */

        let totalMessages = 0;
        let hourMap = {};

        data.forEach(a => {

          totalMessages += a.messages || 0;

          if (!hourMap[a.hour]) hourMap[a.hour] = 0;

          hourMap[a.hour] += a.messages || 0;

        });

        let peak = "-";
        let max = 0;

        Object.keys(hourMap).forEach(h => {

          if (hourMap[h] > max) {

            max = hourMap[h];
            peak = `${h}:00`;

          }

        });

        setStats({
          messages: totalMessages,
          activeHours: Object.keys(hourMap).length,
          peakHour: peak
        });

        setLoading(false);

      } catch (err) {

        console.error("Activity fetch error:", err);
        setError("Failed to load analytics data");
        setLoading(false);

      }

    };

    fetchActivity();

    interval = setInterval(fetchActivity, 10000);

    return () => clearInterval(interval);

  }, [guildId]);


  /* =========================
     TOGGLE MODULES
  ========================= */

  const toggle = (key) => {

    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));

  };


  /* =========================
     SAVE SETTINGS
  ========================= */

  const saveConfig = async () => {

    try {

      const res = await fetch(
        `https://defyn-backend.onrender.com/config/${guildId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(settings)
        }
      );

      if (!res.ok) throw new Error("Save failed");

      alert("✅ Settings saved!");

    } catch (err) {

      console.error("Save config error:", err);
      alert("❌ Failed to save settings");

    }

  };


  /* =========================
     FORMAT HEATMAP DATA
  ========================= */

  const heatmapData = activity.map(a => ({
    date: a.date,
    count: a.messages
  }));


  /* =========================
     UI
  ========================= */

  if (loading) {
    return (
      <div className="config-page">
        <h1>⚙️ Server Control Panel</h1>
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="config-page">
        <h1>⚙️ Server Control Panel</h1>
        <p style={{color:"red"}}>{error}</p>
      </div>
    );
  }

  return (

    <div className="config-page">

      <h1>⚙️ Server Control Panel</h1>
      <p>Guild ID: {guildId}</p>

      {/* =========================
         SERVER ANALYTICS
      ========================= */}

      <div className="analytics-section">

        <h2>📊 Server Analytics</h2>

        {/* STATS */}

        <div className="stats-grid">

          <div className="stat-card">
            <h3>💬 Messages</h3>
            <p>{stats.messages}</p>
          </div>

          <div className="stat-card">
            <h3>🔥 Active Hours</h3>
            <p>{stats.activeHours}</p>
          </div>

          <div className="stat-card">
            <h3>⏰ Peak Hour</h3>
            <p>{stats.peakHour}</p>
          </div>

        </div>


        {/* HEATMAP */}

        <div className="heatmap-container">

          <h3>🔥 Server Activity Heatmap</h3>

          <CalendarHeatmap
            startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
            endDate={new Date()}
            values={heatmapData}
            classForValue={(value) => {

              if (!value) return "color-empty";
              if (value.count < 10) return "color-low";
              if (value.count < 50) return "color-mid";

              return "color-high";

            }}
          />

        </div>


        {/* CHARTS */}

        <ServerCharts data={activity} />


        {/* TOP STATS*/}

        <TopStats guildId={guildId} />

        {/*SERVER GROWTH*/}

        <ServerGrowth guildId={guildId} />

        {/* Server Insights*/}

        <ServerInsights guildId={guildId} />

      </div>


      {/* =========================
         MODULE CONFIG
      ========================= */}

      <div className="modules-grid">

        {/* Anti Spam */}

        <div className="module-card">

          <h2>🚫 Anti Spam</h2>

          <p className="desc">
            Prevents spam flooding and message abuse.
          </p>

          <p className={`status ${settings.antiSpam ? "on" : "off"}`}>
            Status: {settings.antiSpam ? "Enabled" : "Disabled"}
          </p>

          <button
            className="toggle-btn"
            onClick={() => toggle("antiSpam")}
          >
            {settings.antiSpam ? "Disable" : "Enable"}
          </button>

        </div>


        {/* Anti Raid */}

        <div className="module-card">

          <h2>⚔️ Anti Raid</h2>

          <p className="desc">
            Detects mass joins and protects against raids.
          </p>

          <p className={`status ${settings.antiRaid ? "on" : "off"}`}>
            Status: {settings.antiRaid ? "Enabled" : "Disabled"}
          </p>

          <button
            className="toggle-btn"
            onClick={() => toggle("antiRaid")}
          >
            {settings.antiRaid ? "Disable" : "Enable"}
          </button>

        </div>


        {/* AI Moderation */}

        <div className="module-card">

          <h2>🤖 AI Moderation</h2>

          <p className="desc">
            Uses AI to detect toxic or harmful messages.
          </p>

          <p className={`status ${settings.aiMod ? "on" : "off"}`}>
            Status: {settings.aiMod ? "Enabled" : "Disabled"}
          </p>

          <button
            className="toggle-btn"
            onClick={() => toggle("aiMod")}
          >
            {settings.aiMod ? "Disable" : "Enable"}
          </button>

        </div>

      </div>


      <button className="save-btn" onClick={saveConfig}>
        Save Settings
      </button>

    </div>

  );

}

export default ServerConfig;