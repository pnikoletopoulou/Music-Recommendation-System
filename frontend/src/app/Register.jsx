import { useState } from "react";
import axios from "axios";

export default function Register({onGoLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await axios.post(
                "/api/register/",
                {
                    username,
                    password,
                }
            );

            setSuccess("User created successfully. You can now login.");

            setUsername("");
            setPassword("");

        } catch (err) {
            setError(
                err.response?.data?.error ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

   return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Create Account</h2>

                <form onSubmit={handleRegister}>
                    <input
                        className="auth-input"
                        placeholder="Choose Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Choose Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <p className="auth-error">{error}</p>}
                    
                    {success && (
                        <p style={{ 
                            color: "#28a745", 
                            textAlign: "center", 
                            marginBottom: "15px",
                            fontSize: "14px" 
                        }}>
                            {success}
                        </p>
                    )}

                    <button 
                        className="auth-button" 
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Register"}
                    </button>
                </form>

                <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
                    Already have an account?{" "}
                    <span 
                        onClick={onGoLogin} 
                        style={{ 
                            color: "#ff69b4", 
                            cursor: "pointer", 
                            fontWeight: "bold",
                            textDecoration: "underline" 
                        }}>
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
}