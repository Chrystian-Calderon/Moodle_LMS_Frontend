import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const apiService = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

apiService.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

let isRedirectingToLogin = false;

apiService.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !isRedirectingToLogin) {
            isRedirectingToLogin = true;

            useAuthStore.getState().logout();

            window.location.href = "/login";
        }

        return Promise.reject(error);
    },
);

export { apiService };