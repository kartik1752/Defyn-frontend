import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

function ServerCharts({ data }) {

  const messageData = data.map(d => ({
    date: d.date.slice(5),
    messages: d.messages
  }));

  const memberGrowth = data.map((d, i) => ({
    date: d.date.slice(5),
    members: 100 + i * 3
  }));

  const moderationData = data.map((d) => ({
    date: d.date.slice(5),
    actions: Math.floor(d.messages / 10)
  }));

  const commandUsage = [
    { name: ".warn", uses: 40 },
    { name: ".mute", uses: 30 },
    { name: ".ban", uses: 10 },
    { name: ".ttt", uses: 25 },
    { name: ".weather", uses: 15 }
  ];

  return (

    <div className="charts-grid">

      {/* Messages Per Day */}

      <div className="chart-card">

        <h3>📈 Messages Per Day</h3>

        <ResponsiveContainer width="100%" height={250}>

          <LineChart data={messageData}>

            <Line type="monotone" dataKey="messages" stroke="#ffd166" strokeWidth={3} />

            <CartesianGrid stroke="#333" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

          </LineChart>

        </ResponsiveContainer>

      </div>


      {/* Member Growth */}

      <div className="chart-card">

        <h3>👥 Member Growth</h3>

        <ResponsiveContainer width="100%" height={250}>

          <LineChart data={memberGrowth}>

            <Line type="monotone" dataKey="members" stroke="#4ade80" strokeWidth={3} />

            <CartesianGrid stroke="#333" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

          </LineChart>

        </ResponsiveContainer>

      </div>


      {/* Moderation Actions */}

      <div className="chart-card">

        <h3>⚔ Moderation Actions</h3>

        <ResponsiveContainer width="100%" height={250}>

          <BarChart data={moderationData}>

            <Bar dataKey="actions" fill="#e63946" />

            <CartesianGrid stroke="#333" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

          </BarChart>

        </ResponsiveContainer>

      </div>


      {/* Command Usage */}

      <div className="chart-card">

        <h3>🤖 Command Usage</h3>

        <ResponsiveContainer width="100%" height={250}>

          <BarChart data={commandUsage}>

            <Bar dataKey="uses" fill="#ffd166" />

            <CartesianGrid stroke="#333" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default ServerCharts;