import { useEffect, useState } from "react";

function ServerGrowth({ guildId }) {

  const [growth, setGrowth] = useState({
    week: 0,
    month: 0
  });

  useEffect(() => {

    async function load() {

      const res = await fetch(
        `https://defyn-backend.onrender.com/growth/${guildId}`
      );

      const data = await res.json();

      setGrowth(data);

    }

    load();

  }, [guildId]);

  return (

    <div className="growth-card">

      <h3>📈 Server Growth</h3>

      <p>+{growth.week} members this week</p>
      <p>+{growth.month} members this month</p>

    </div>

  );

}

export default ServerGrowth;