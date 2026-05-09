import axios from "axios";

const API = axios.create({
    baseURL: window.location.hostname === "localhost" 
        ? "http://localhost:8000/api/" 
        : "https://shark-app-xxxx.ondigitalocean.app/api/",
});

API.interceptors.request.use((req) => {

    const token = localStorage.getItem("token") || localStorage.getItem("access");

    const isAuthRequest = req.url.includes("login") || req.url.includes("register");

    if (token && !isAuthRequest) {
        req.headers.Authorization = `Bearer ${token}`;
        console.log("Token sent to protected route:", req.url);
    } else {
        console.log("Request sent without token:", req.url);
    }

    return req;
});

export default API;