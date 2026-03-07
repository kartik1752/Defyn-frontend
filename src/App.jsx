import "./App.css";
import "@fontsource/poppins";
import Home from "./pages/Home";
import logo from "./assets/logo.png";

function App() {
  const handleLogin = () => {
    // For mobile, we need to ensure we're not in a popup
    window.location.href = "https://defyn-backend.onrender.com/auth/login";
  };

  return (
    <div className="app">
      <div className="spotlight-1"></div>
      <div className="spotlight-2"></div>
      <div className="spotlight-3"></div>

      <nav className="navbar">
        <div className="nav-left">
          <img src={logo} alt="Defyn Logo" className="nav-logo" />
          <span className="nav-brand">DEFYN</span>
        </div>

        <div className="nav-right">
          <button className="discord-oauth-btn" onClick={handleLogin}>
            ⚡ Login with Discord
          </button>
        </div>
      </nav>

      <Home />
    </div>
  );
}

export default App;