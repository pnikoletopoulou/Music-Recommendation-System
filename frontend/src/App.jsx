import React, { useState, useEffect } from "react";
import Login from "./app/Login.jsx";
import Register from "./app/Register.jsx";
import Dashboard from "./app/Dashboard.jsx";
import { AuthProvider } from "./app/Auth.jsx";
import "./app/styles/App.css";

function App() {
  const [user, setUser] = useState(localStorage.getItem("music_ai_user") || null);
  const [mode, setMode] = useState(user ? "dashboard" : "login");

  useEffect(() => {
    const savedUser = localStorage.getItem("music_ai_user");
    if (savedUser) {
      setUser(savedUser);
      setMode("dashboard");
    }
  }, []);

  const handleLogin = (username, token) => {
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

    <AuthProvider>
      <div className="app">
        {mode === "login" && (
          <Login
            onLoginSuccess={handleLogin} 
            onGoRegister={() => setMode("register")}
          />
        )}

        {mode === "register" && (
          <Register 
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
    </AuthProvider>
  );
}

export default App;