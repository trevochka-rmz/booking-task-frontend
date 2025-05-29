import axios from 'axios';

const api = axios.create({
    baseURL:
        'http://localhost:5000/api' ||
        'https://booking-task-backend.onrender.com/api',
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
