import { useState } from "react";

export default function Navbar({ username, onLogout, onNavigate }) {
    const [menuOpen, setMenuOpen] = useState(false);


    return (
        <div style={styles.navbar}>
            
            <div style={styles.brand}>
                Music AI
            </div>

            <div style={styles.links}>
                <button
                    style={styles.link}
                    onClick={() => onNavigate("dashboard")}
                >
                    Dashboard
                </button>

                <button
                    style={styles.link}
                    onClick={() => onNavigate("ai")}
                >
                    AI
                </button>

                <button
                    style={styles.link}
                    onClick={() => alert("History coming soon")}
                >
                    History
                </button>
            </div>

            <div style={styles.userArea}>
                <span style={styles.username}>
                    {username}
                </span>

                <button
                    style={styles.logout}
                    onClick={onLogout}
                >
                    Logout
                </button>
            </div>

        </div>
    );
}