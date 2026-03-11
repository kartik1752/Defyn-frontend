import "./App.css";
import "@fontsource/poppins";
import Home from "./pages/Home";
import logo from "./assets/logo.png";

function App() {

  const handleLogin = () => {
    window.location.href = "https://defyn-backend.onrender.com/auth/login";
  };

  return (
    <div className="app">

      {/* 🌸 Floating Cherry Blossom Petals */}
      <div className="petals">
  {[...Array(25)].map((_, i) => (
    <div
      key={i}
      className="petal"
      style={{
        left: Math.random() * 100 + "%",
        animationDuration: 8 + Math.random() * 8 + "s",
        animationDelay: Math.random() * 6 + "s"
      }}
    />
  ))}
</div>

      {/* Background lights */}
      <div className="spotlight-1"></div>
      <div className="spotlight-2"></div>
      <div className="spotlight-3"></div>

      {/* Navbar */}
      <nav className="navbar">

        <div className="nav-left">
          <img src={logo} alt="Defyn Logo" className="nav-logo" />
          <span className="nav-brand">DEFYN</span>
        </div>

        <div className="nav-right">
          <button
            className="discord-oauth-btn"
            onClick={handleLogin}
          >
            ⚡ Login with Discord
          </button>
        </div>

      </nav>

      {/* Main Page */}
      <Home />

    </div>
  );
}

export default App;