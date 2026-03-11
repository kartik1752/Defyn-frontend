import "../styles/Commands.css";

function Commands() {
  return (
    <div className="commands-page">

      <h1>📜 Defyn Commands</h1>

      {/* Moderation */}
      <div className="command-section">
        <h2>📜 Moderation</h2>

        <div className="command">
          <b>.warn</b> — Warn a user
        </div>

        <div className="command">
          <b>.mute</b> — Mute a user for a duration
        </div>

        <div className="command">
          <b>.ban</b> — Ban a member
        </div>
      </div>


      {/* Fun */}
      <div className="command-section">
        <h2>🎮 Fun</h2>

        <div className="command">
          <b>.hug</b>
        </div>

        <div className="command">
          <b>.punch</b>
        </div>

        <div className="command">
          <b>.kick</b>
        </div>

        <div className="command">
          <b>.ttt</b> — Tic Tac Toe
        </div>
      </div>


      {/* Utility */}
      <div className="command-section">
        <h2>🌤 Utility</h2>

        <div className="command">
          <b>.weather</b> / <b>.w</b>
        </div>

        <div className="command">
          <b>.av</b> — Avatar
        </div>

        <div className="command">
          <b>.userinfo</b> / <b>.ui</b>
        </div>
      </div>


      {/* Server */}
      <div className="command-section">
        <h2>⚙️ Server</h2>

        <div className="command">
          <b>.afk</b>
        </div>
      </div>

    </div>
  );
}

export default Commands;