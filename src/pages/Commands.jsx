import "../styles/Commands.css";

function Commands() {

  const commandGroups = [
    {
      title: "📜 Moderation",
      commands: [
        { cmd: ".warn", desc: "Warn a user" },
        { cmd: ".mute", desc: "Mute a user for a duration" },
        { cmd: ".ban", desc: "Ban a member" }
      ]
    },
    {
      title: "🎮 Fun",
      commands: [
        { cmd: ".hug", desc: "Hug someone" },
        { cmd: ".punch", desc: "Punch someone" },
        { cmd: ".kick", desc: "Kick someone" },
        { cmd: ".ttt", desc: "Play Tic Tac Toe" }
      ]
    },
    {
      title: "🌤 Utility",
      commands: [
        { cmd: ".weather / .w", desc: "Check weather of a city" },
        { cmd: ".av", desc: "Get a user's avatar" },
        { cmd: ".userinfo / .ui", desc: "Display user information" }
      ]
    },
    {
      title: "⚙️ Server",
      commands: [
        { cmd: ".afk", desc: "Set AFK status" }
      ]
    }
  ];

  return (
    <div className="commands-page">

      <h1>📜 Defyn Commands</h1>

      <div className="commands-grid">

        {commandGroups.map((group, index) => (
          <div key={index} className="command-card">

            <h3>{group.title}</h3>

            <ul className="command-list">

              {group.commands.map((c, i) => (
                <li key={i}>
                  <b>{c.cmd}</b> — {c.desc}
                </li>
              ))}

            </ul>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Commands;