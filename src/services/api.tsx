import axios from "axios";

const api = axios.create({
    baseURL: "3.140.193.152:3300"
    //baseURL: "/api"
});

export default api;