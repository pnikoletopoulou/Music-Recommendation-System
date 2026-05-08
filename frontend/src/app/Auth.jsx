import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem("assess_ai_user");
        if (saved) setUser(saved);
    }, []);

    const login = (username, token) => {
        localStorage.setItem("assess_ai_user", username);
        localStorage.setItem("token", token);
        setUser(username);
    };

    const logout = () => {
        localStorage.removeItem("assess_ai_user");
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}