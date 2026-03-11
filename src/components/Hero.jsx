function Hero() {

  const handleAddBot = () => {
    window.open(
      "https://discord.com/oauth2/authorize?client_id=1473684574411296838&scope=bot%20applications.commands&permissions=8",
      "_blank"
    );
  };

  return (
    <section className="hero">

      {/* Po silhouette background */}
      <div className="hero-bg"></div>

      <div className="hero-content">

        <h1 className="main-title">
          DEFYN BOT
        </h1>

        <p className="subtitle">
          The Dragon Warrior of Discord Moderation
        </p>

        <button
          className="btn-primary"
          onClick={handleAddBot}
        >
          Add To Server
        </button>

      </div>

    </section>
  );
}

export default Hero;