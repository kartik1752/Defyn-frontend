import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ServerConfig.css";

function ServerConfig() {

  const { guildId } = useParams();

  const [settings, setSettings] = useState({
    antiSpam: false,
    antiRaid: false,
    aiMod: false
  });

  useEffect(() => {

    fetch(`https://defyn-backend.onrender.com/config/${guildId}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data) setSettings(data);
      });

  }, [guildId]);

  const toggle = (key) => {

    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));

  };

  const saveConfig = async () => {

    await fetch(`https://defyn-backend.onrender.com/config/${guildId}`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      credentials: "include",

      body: JSON.stringify(settings)

    });

    alert("✅ Settings saved!");

  };

  return (

    <div className="config-page">

      <h1>⚙️ Server Control Panel</h1>
      <p>Guild ID: {guildId}</p>

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