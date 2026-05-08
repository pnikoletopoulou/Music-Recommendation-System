import React, { useState } from "react";

import Login from "./app/Login.jsx";
import Register from "./app/Register.jsx";
import Dashboard from "./app/Dashboard.jsx";

import "./app/styles/App.css";

function App() {
  const [mode, setMode] = useState("login");
  const [user, setUser] = useState(
    localStorage.getItem("music_ai_user") || null
  );

  const handleLogin = (username, token) => {
    localStorage.setItem("music_ai_user", username);
    if (token) localStorage.setItem("token", token);

    setUser(username);
    setMode("dashboard");
  };

  const handleRegisterSuccess = (username, token) => {
    localStorage.setItem("music_ai_user", username);
    if (token) localStorage.setItem("token", token);

    setUser(username);
    setMode("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("music_ai_user");
    localStorage.removeItem("token");

    setUser(null);
    setMode("login");
  };

  return (
    <div className="app">

      {mode === "login" && (
        <Login
          onLoginSuccess={handleLogin}
          onGoRegister={() => setMode("register")}
        />
      )}

      {mode === "register" && (
        <Register
          onRegisterSuccess={handleRegisterSuccess}
          onGoLogin={() => setMode("login")}
        />
      )}

      {mode === "dashboard" && (
        <Dashboard
          username={user}
          onLogout={handleLogout}
        />
      )}

    </div>
  );
}

export default App;