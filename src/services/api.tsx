import axios from "axios";

const api = axios.create({
    //baseURL: "http://localhost:3300"
    baseURL: "http://3.140.193.152:3300"
});

export default api;