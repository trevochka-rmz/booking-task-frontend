import api from './api';

export const register = async (email, password) => {
    try {
        const response = await api.post('/auth/register', { email, password });
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        // Передаем полное сообщение об ошибке из API
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const getCurrentUser = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

export const logout = async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
};

export const forgotPassword = async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
};
