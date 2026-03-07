import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../pages/ServerConfig.css";

function ServerConfig() {
  const { guildId } = useParams();

  const [settings, setSettings] = useState({
    antiSpam: false,
    antiRaid: false,
    aiMod: false,
  });

  // 🔐 Fetch existing config
  useEffect(() => {
    fetch(`https://defyn-backend.onrender.com/config/${guildId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) setSettings(data);
      });
  }, [guildId]);

  // 🔁 Toggle
  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // 💾 Save
  const saveConfig = async () => {
    await fetch(`https://defyn-backend.onrender.com/config/${guildId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(settings),
    });

    alert("✅ Settings saved!");
  };

  return (
    <div className="config-page">
      <h1>⚙️ Server Config</h1>
      <p>Guild ID: {guildId}</p>

      <div className="config-card">
        <div className="toggle">
          <span>🚫 Anti-Spam</span>
          <button onClick={() => toggle("antiSpam")}>
            {settings.antiSpam ? "ON" : "OFF"}
          </button>
        </div>

        <div className="toggle">
          <span>⚔️ Anti-Raid</span>
          <button onClick={() => toggle("antiRaid")}>
            {settings.antiRaid ? "ON" : "OFF"}
          </button>
        </div>

        <div className="toggle">

  <span>Anti Spam</span>

  <label className="switch">

    <input
      type="checkbox"
      checked={settings.antiSpam}
      onChange={() => toggle("antiSpam")}
    />

    <span className="slider"></span>

  </label>

</div>

        <button className="save-btn" onClick={saveConfig}>
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default ServerConfig;