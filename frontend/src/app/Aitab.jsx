import { useState } from "react";
import API from "./api";

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
            const res = await API.post("predict/", { emotion, activity });
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


                <select className="ai-select" value={emotion} onChange={(e) => setEmotion(e.target.value)}>
                    <option value="">-- Choose Emotion --</option>
                    <option value="happy">Happy</option>
                    <option value="sad">Sad</option>
                    <option value="stressed">Stressed</option>
                    <option value="energetic">Energetic</option>
                    <option value="calm">Calm</option>
                    <option value="angry">Angry</option>
                    <option value="excited">Excited</option>
                </select>


                <select className="ai-select" value={activity} onChange={(e) => setActivity(e.target.value)}>
                    <option value="">-- Choose Activity --</option>
                    <option value="party">Party</option>
                    <option value="relaxing">Relaxing / Resting</option>
                    <option value="studying">Studying / Work</option>
                    <option value="gym">Gym / Workout</option>
                    <option value="meditation">Meditation</option>
                </select>

                <button
                    className="auth-button"
                    onClick={getRecommendation}
                    disabled={loading}
                >
                    {loading ? "AI is thinking..." : "Generate Vibe"}
                </button>

                {error && <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>{error}</p>}
            </div>

            <div className="result-card">
                {result ? (
                    <div className="result-box">
                        <h3 style={{ color: "#333", fontSize: "18px", marginBottom: "10px" }}>Suggested Genre</h3>
                        <div className="result-value">{result.genre}</div>
                        <p style={{ fontStyle: "italic", color: "#666", marginTop: "10px" }}>
                            "{result.message}"
                        </p>
                    </div>
                ) : (
                    <div className="result-placeholder">
                        <h3 style={{ color: "#ff69b4", opacity: 0.6 }}>
                            {loading ? "Analyzing..." : "Your recommendation will appear here"}
                        </h3>
                    </div>
                )}
            </div>
        </div>
    );
}