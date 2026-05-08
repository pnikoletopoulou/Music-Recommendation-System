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
        <div>
            <h2>Register</h2>

            <form onSubmit={handleRegister}>
                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}

                <button disabled={loading}>
                    {loading ? "Creating..." : "Register"}
                </button>
            </form>
            <p>
                Already have account?
                <span 
                onClick={onGoLogin} 
                style={{ color: "blue", cursor: "pointer" }}>
                    Login
                </span>
            </p>
        </div>
    );
}