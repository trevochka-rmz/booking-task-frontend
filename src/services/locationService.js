import api from './api';

export const getLocations = async () => {
    const response = await api.get('/locations');
    return response.data;
};

export const getLocationDetails = async (id) => {
    const response = await api.get(`/locations/${id}`);
    return response.data;
};

// Добавляем новый метод для получения слотов
export const getAvailableTimeSlots = async (locationId, date) => {
    const response = await api.get(
        `/locations/${locationId}/slots?date=${
            date.toISOString().split('T')[0]
        }`
    );
    return response.data;
};
