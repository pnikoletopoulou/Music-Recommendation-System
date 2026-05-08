import { useState } from "react";

export default function Navbar({ username, onLogout, onNavigate }) {
    const [menuOpen, setMenuOpen] = useState(false);


return (
        <div className="topbar">
           
            <div className="brand" style={{ fontWeight: '800', color: '#333' }}>
                Music AI <span style={{ color: '#ff69b4' }}>•</span> Dashboard
            </div>

            <div className="userArea" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span className="username" style={{ fontSize: '14px', fontWeight: '500' }}>
                    Welcome, <strong style={{ color: '#ff69b4' }}>{username}</strong>
                </span>

                <button
                    className="logout-btn"
                    onClick={onLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}