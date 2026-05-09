import { useState, useEffect } from "react";
import API from "./api";

export default function HistoryTab() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {

                const res = await API.get("vibes/");
                setHistory(res.data);
            } catch (err) {
                console.error("Error loading history:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    return (
        <div className="history-container">
            {loading ? <p>Loading your vibes...</p> : (
                <div className="history-grid">
                    {history.length > 0 ? history.map((vibe) => (
                        <div key={vibe.id} className="history-card">
                            <div className="history-genre">{vibe.recommended_genre}</div>

                            <div className="history-details">
                                <span>Vibe: <strong>{vibe.emotion}</strong></span>
                                <span>Activity: <strong>{vibe.activity}</strong></span>
                            </div>

                            <div className="history-date">
                                {new Date(vibe.created_at).toLocaleDateString('el-GR')}
                            </div>
                        </div>
                    )) : <p>You haven't saved any vibes yet!</p>}
                </div>
            )}
        </div>
    );
}