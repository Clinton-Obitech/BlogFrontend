import axios from "axios";
import { useLoader } from "../context/LoaderContext";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});


export default api;