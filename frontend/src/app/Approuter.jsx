import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Dashboard from "./Dashboard.jsx";
import NotFound from "./NotFound";

export default function AppRouter({ isLoggedIn }) {
    return (
        <BrowserRouter>
            <Routes>


                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard"
                    element={
                        isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
                    }
                />

                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}