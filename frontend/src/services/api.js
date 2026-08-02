import axios from "axios";

const api = axios.create({
    baseURL: "https://note-app-98w2.onrender.com/api",
    withCredentials: true
});

export default api;