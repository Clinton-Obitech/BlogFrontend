import axios from "axios";
import { useLoader } from "../context/LoaderContext";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

export const attachLoaderInterceptors = (setLoading) => {
  api.interceptors.request.use((config) => {
    setLoading(true);
    return config;
  });

  api.interceptors.response.use(
    (res) => {
      setLoading(false);
      return res;
    },
    (err) => {
      setLoading(false);
      return Promise.reject(err);
    }
  );
};

export default api;