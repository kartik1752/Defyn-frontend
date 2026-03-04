import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import ServerConfig from "./components/ServerConfig";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/dashboard/:guildId" element={<Layout><ServerConfig /></Layout>} />
      
      {/* 404 Fallback - Optional but helpful */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  </BrowserRouter>
);