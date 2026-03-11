import { useEffect, useState } from "react";
import axios from "axios";

function TopStats({ guildId }) {

  const [channels, setChannels] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {

    async function load() {

      const ch = await axios.get(
        `https://defyn-backend.onrender.com/top-channels/${guildId}`
      );

      const us = await axios.get(
        `https://defyn-backend.onrender.com/top-users/${guildId}`
      );

      setChannels(ch.data);
      setUsers(us.data);

    }

    load();

  }, [guildId]);

  return (

    <div className="top-stats">

      <div className="leaderboard">

        <h2>🔥 Top Active Channels</h2>

        {channels.map((c, i) => (
          <div key={i} className="leader-item">
            #{c._id} — {c.messages} messages
          </div>
        ))}

      </div>

      <div className="leaderboard">

        <h2>👑 Top Users</h2>

        {users.map((u, i) => (
          <div key={i} className="leader-item">
            {u._id} — {u.messages} messages
          </div>
        ))}

      </div>

    </div>

  );

}

export default TopStats;