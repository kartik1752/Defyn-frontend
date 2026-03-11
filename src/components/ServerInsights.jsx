import { useEffect, useState } from "react";

function ServerInsights({ guildId }) {

  const [insights, setInsights] = useState([]);

  useEffect(() => {

    async function load() {

      const res = await fetch(
        `https://defyn-backend.onrender.com/insights/${guildId}`
      );

      const data = await res.json();

      setInsights(data.insights || []);

    }

    load();

  }, [guildId]);

  return (

    <div className="insights-panel">

      <h2>🧠 AI Server Insights</h2>

      {insights.map((i, index) => (
        <p key={index}>• {i}</p>
      ))}

    </div>

  );

}

export default ServerInsights;