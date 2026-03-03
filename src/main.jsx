import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ServerConfig from "./components/ServerConfig";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/:guildId" element={<ServerConfig />} />
    </Routes>
  </BrowserRouter>
);