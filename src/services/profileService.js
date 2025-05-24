import api from './api';

export const getProfile = async () => {
    const response = await api.get('/user/me');
    return response.data;
};

export const updateProfile = async (formData) => {
    const response = await api.patch('/user/me', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getUserStats = async () => {
    const response = await api.get('/stats/me');
    return response.data;
};

export const getGameHistory = async () => {
    const response = await api.get('/stats/me/games');
    return response.data;
};
export const getUserBookingStats = async () => {
    const response = await api.get('/bookings/stats');
    return response.data;
};
