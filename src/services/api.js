import axios from 'axios';

const api = axios.create({
    baseURL: 'booking-task-backend-production.up.railway.app/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            return Promise.reject({
                ...error,
                message:
                    error.response?.data?.message || 'Требуется авторизация',
            });
        }
        return Promise.reject(error);
    }
);

export default api;
