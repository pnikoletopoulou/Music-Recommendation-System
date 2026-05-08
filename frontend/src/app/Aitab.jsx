import { useState } from "react";
import API from "./api";

export default function AiTab() {
    const [emotion, setEmotion] = useState("");
    const [activity, setActivity] = useState("");

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const styles = {
        wrapper: {
            display: "flex",
            gap: "20px",
            padding: "20px"
        },
        leftCard: {
            flex: 1,
            padding: "20px",
            background: "#111827",
            color: "white",
            borderRadius: "10px"
        },
        rightCard: {
            flex: 1,
            padding: "20px",
            background: "#0f172a",
            color: "white",
            borderRadius: "10px",
            minHeight: "250px"
        },
        title: {
            fontSize: "22px",
            marginBottom: "10px"
        },
        subtitle: {
            fontSize: "14px",
            opacity: 0.7,
            marginBottom: "15px"
        },
        input: {
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #333",
            background: "#1f2937",
            color: "white"
        },
        button: {
            width: "100%",
            padding: "10px",
            background: "#3b82f6",
            border: "none",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer"
        },
        error: {
            color: "red",
            marginTop: "10px"
        },
        placeholder: {
            opacity: 0.6,
            textAlign: "center",
            marginTop: "50px"
        },
        loadingBox: {
            textAlign: "center",
            marginTop: "50px"
        },
        spinner: {
            width: "30px",
            height: "30px",
            border: "3px solid #444",
            borderTop: "3px solid #3b82f6",
            borderRadius: "50%",
            margin: "0 auto 10px auto",
            animation: "spin 1s linear infinite"
        },
        resultBox: {
            textAlign: "center"
        },
        resultTitle: {
            fontSize: "18px",
            marginBottom: "10px"
        },
        genre: {
            fontSize: "26px",
            fontWeight: "bold",
            color: "#22c55e",
            marginBottom: "10px"
        },
        message: {
            opacity: 0.8
        },
        meta: {
            marginTop: "10px",
            fontSize: "12px",
            opacity: 0.6
        }
    };

    const getRecommendation = async () => {
        if (!emotion || !activity) {
            setError("Please fill all fields");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const res = await API.post("predict/", {
                emotion,
                activity,
            });

            setResult(res.data);
        } catch (err) {
            setError("Failed to get recommendation");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.wrapper}>

            <div style={styles.leftCard}>
                <h2 style={styles.title}>AI Music Recommendation</h2>

                <p style={styles.subtitle}>
                    Enter your mood and activity to generate a playlist.
                </p>

                <input
                    style={styles.input}
                    placeholder="Emotion (happy, sad...)"
                    value={emotion}
                    onChange={(e) => setEmotion(e.target.value)}
                />

                <input
                    style={styles.input}
                    placeholder="Activity (gym, study...)"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                />

                <button
                    style={styles.button}
                    onClick={getRecommendation}
                    disabled={loading}
                >
                    {loading ? "Analyzing..." : "Generate"}
                </button>

                {error && <p style={styles.error}>{error}</p>}
            </div>

            <div style={styles.rightCard}>

                {!loading && !result && (
                    <div style={styles.placeholder}>
                        🎧 AI is waiting for input...
                    </div>
                )}

                {loading && (
                    <div style={styles.loadingBox}>
                        <div style={styles.spinner}></div>
                        <p>Analyzing...</p>
                    </div>
                )}

                {result && (
                    <div style={styles.resultBox}>
                        <h3 style={styles.resultTitle}>Recommended Genre</h3>

                        <div style={styles.genre}>
                            {result.genre}
                        </div>

                        <p style={styles.message}>
                            {result.message}
                        </p>

                        <div style={styles.meta}>
                            Emotion: {result.emotion} <br />
                            Activity: {result.activity}
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}