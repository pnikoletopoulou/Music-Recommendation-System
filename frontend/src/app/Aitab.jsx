import { useState } from "react";
import axios from "axios";

export default function AiTab() {
    const [emotion, setEmotion] = useState("");
    const [activity, setActivity] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const getRecommendation = async () => {
        if (!emotion || !activity) {
            setError("Please select both emotion and activity");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                "/api/predict/", 
                { emotion, activity },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setResult(res.data);
        } catch (err) {
            setError("AI Error: Could not process these choices.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ai-container">
            <div className="ai-card">
                <h2 className="ai-title">AI Recommendation</h2>
                <p style={{ color: "#666", marginBottom: "15px" }}>Select your current vibe:</p>

        
                <select 
                    className="ai-select" 
                    value={emotion} 
                    onChange={(e) => setEmotion(e.target.value)}
                >
                    <option value="">-- Choose Emotion --</option>
                    <option value="HAPPY">Happy</option>
                    <option value="SAD">Sad</option>
                    <option value="ENERGETIC">Energetic</option>
                    <option value="STRESSED">Stressed</option>
                </select>

                <select 
                    className="ai-select" 
                    value={activity} 
                    onChange={(e) => setActivity(e.target.value)}
                >
                    <option value="">-- Choose Activity --</option>
                    <option value="GYM">Gym / Workout</option>
                    <option value="STUDY">Study / Work</option>
                    <option value="RELAXING">Relaxing</option>
                    <option value="PARTY">Party</option>
                </select>

                <button className="ai-button" onClick={getRecommendation} disabled={loading}>
                    {loading ? "AI is thinking..." : "Generate Vibe"}
                </button>

                {error && <p className="auth-error">{error}</p>}
            </div>

            <div className="result-card">
    
                {result && (
                    <div className="result-box">
                        <h3 className="result-title">Suggested Genre</h3>
                        <div className="result-value">{result.genre}</div>
                        <p className="result-message">"{result.message}"</p>
                    </div>
                )}
            </div>
        </div>
    );
}