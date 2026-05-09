import { useState } from "react";
import API from "./api";
import { useAuth } from "./Auth.jsx";

export default function Login({ onGoRegister, onLoginSuccess }) {
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await API.post(
                "login/",
                { username, password }
            );
            localStorage.setItem("token", res.data.access);
            localStorage.setItem("username", username);

            if (onLoginSuccess) {
                onLoginSuccess(username, res.data.access);
            }

        } catch (err) {
            setError("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Login</h2>

                <form onSubmit={handleLogin}>
                    <input
                        className="auth-input"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        className="auth-input"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <button className="auth-button" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#666" }}>
                    Don't have an account?{" "}
                    <span
                        onClick={onGoRegister}
                        style={{
                            color: "#ff69b4",
                            cursor: "pointer",
                            fontWeight: "bold",
                            textDecoration: "underline"
                        }}>
                        Register here
                    </span>
                </p>
            </div>
        </div>
    );
}