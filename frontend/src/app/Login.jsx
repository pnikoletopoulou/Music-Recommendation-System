import { useState } from "react";
import axios from "axios";
import { useAuth } from "./Auth.jsx";

export default function Login({ onGoRegister, onLoginSuccess}) {
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
            const res = await axios.post(
                "/api/login/",
                { username, password }
            );

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
                <p>
                    Don't have account?
                    <span
                        onClick={() => onGoRegister?.()}
                        style={{ color: "blue", cursor: "pointer" }}>
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}