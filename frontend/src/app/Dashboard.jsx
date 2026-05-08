import { useState } from "react";
import AiTab from "./AiTab.jsx";
import Navbar from "./Navbar.jsx"; 
import { useAuth } from "./Auth.jsx";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("ai");
    const { user, logout: authLogout } = useAuth();

    const username = user?.username || localStorage.getItem("music_ai_user") || "Guest";

    const handleLogout = () => {
        if (authLogout) {
            authLogout();
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("music_ai_user");
            window.location.reload(); 
        }
    };

    return (
        <div className="dashboard">
            {/* Sidebar / Navbar */}
            <div className="sidebar">
                <div className="logo">MusicAI </div>
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
                
                <div style={{ marginTop: 'auto' }}>
                    <p style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>
                        Logged in as: <strong>{username}</strong>
                    </p>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="main">
                <div className="topbar">
                    <h2>{activeTab === "ai" ? "Generate New Vibe" : "Your Collection"}</h2>
                </div>
                
                <div className="content">
                    {activeTab === "ai" && <AiTab />}
                    
                    {activeTab === "saved" && (
                        <div className="result-card">
                            <h2 className="result-title">Coming Soon</h2>
                            <p className="result-message">Your saved playlists will appear here!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}