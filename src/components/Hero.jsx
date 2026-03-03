function Hero() {

  const handleAddBot = () => {
    window.open(
      "https://discord.com/oauth2/authorize?client_id=1473684574411296838&scope=bot%20applications.commands&permissions=8",
      "_blank"
    );
  };

  return (
    <div className="hero">
      {/* 🔥 Main heading */}
      <h1 className="main-title">
        Defyn<br />
        <span className="subtitle">Powerful Discord Bot</span>
      </h1>

      {/* 🧠 Description */}
      <p className="description">
        Add it to your server and enjoy smart moderation,<br />
        automation, and next-level security.
      </p>

      {/* 🚀 CTA BUTTON */}
      <button className="btn-primary" onClick={handleAddBot}>
        🚀 Add to Server
      </button>
    </div>
  );
}

export default Hero;