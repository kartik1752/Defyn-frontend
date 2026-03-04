import '/src/App.css';
import "@fontsource/poppins";
import logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";

function Layout({ children }) {
  const handleLogin = () => {
    window.location.href = "https://defyn-backend.onrender.com/auth/login";
  };
  
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="app">
      {/* 🌟 Background glow */}
      <div className="spotlight-1"></div>
      <div className="spotlight-2"></div>
      <div className="spotlight-3"></div>

      {/* 🔝 Navbar - Now shows on all pages */}
      <nav className="navbar">
        <div className="nav-left">
          <img src={logo} alt="Defyn Logo" className="nav-logo" />
          <span className="nav-brand">DEFYN</span>
        </div>

        <div className="nav-right">
          {/* Only show login button on homepage, or based on auth status */}
          {isHomePage && (
            <button className="discord-oauth-btn" onClick={handleLogin}>
              ⚡ Login with Discord
            </button>
          )}
        </div>
      </nav>

      {/* Page content */}
      {children}
    </div>
  );
}

export default Layout;