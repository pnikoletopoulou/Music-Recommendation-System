import { useState } from "react";
import AiTab from "./AiTab.jsx";
import HistoryTab from "./HistoryTab.jsx";
import Navbar from "./Navbar.jsx";
import { useAuth } from "./Auth.jsx";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("ai");
    const { user, logout: authLogout } = useAuth();

    const username = user?.username || localStorage.getItem("music_ai_user") || "Guest";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("access_token");
        localStorage.removeItem("music_ai_user");

        if (authLogout) {
            authLogout();
        }
        window.location.href = "/";
    };

    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="logo">MusicAI</div>

                <button
                    className={`sidebar-btn ${activeTab === 'ai' ? 'active' : ''}`}
                    onClick={() => setActiveTab("ai")}
                >
                    AI Recommendation
                </button>

                <button
                    className={`sidebar-btn ${activeTab === 'saved' ? 'active' : ''}`}
                    onClick={() => setActiveTab("saved")}
                >
                    Saved Vibes
                </button>

                <div style={{ marginTop: 'auto', padding: '10px' }}>
                    <p style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>
                        Logged in as: <br />
                        <strong style={{ color: '#ff69b4' }}>{username}</strong>
                    </p>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="main">
                <div className="topbar">
                    <h2 style={{ color: '#333', fontWeight: '800' }}>
                        {activeTab === "ai" ? "Generate New Vibe" : "Your Vibe History"}
                    </h2>
                </div>

                <div className="content">
                    {activeTab === "ai" && <AiTab />}

                    {activeTab === "saved" && <HistoryTab />}
                </div>
            </div>
        </div>

    );
}