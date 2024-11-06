import axios from "axios";

const api = axios.create({
    //baseURL: "http://localhost:3300"
    baseURL: "/api"
});

export default api;