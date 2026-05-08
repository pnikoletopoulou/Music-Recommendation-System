import { useState, createElement } from "react";
import AiTab from "./AiTab.jsx";
import Navbar from "./Navbar.jsx";
import { useAuth } from "./Auth.jsx";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("ai");

    const { user, logout: authLogout } = useAuth();

    const username = user || localStorage.getItem("assess_ai_user");

    const handleLogout = () => {
        authLogout?.();
        localStorage.removeItem("token");
        localStorage.removeItem("assess_ai_user");
        window.location.href = "/login";
    };

    return (
        "div",
        { style: styles.container },

        createElement(Navbar, {
            username: username,
            onLogout: handleLogout,
            onNavigate: (page) => setActiveTab(page),
        }),

        createElement(
            "div",
            { style: styles.main },

            activeTab === "ai" && createElement(AiTab),

            activeTab === "dashboard" &&
                createElement(
                    "h2",
                    null,
                    "Welcome to Music AI Dashboard"
                )
        )
    );
}

const styles = {
    container: {
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        background: "#0f0f0f",
        color: "white"
    },
    main: {
        flex: 1,
        padding: "20px"
    }
};