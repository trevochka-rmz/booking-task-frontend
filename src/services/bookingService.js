import api from './api';

export const getLocations = async () => {
    const response = await api.get('/locations');
    return response.data;
};

export const getLocationDetails = async (id) => {
    const response = await api.get(`/locations/${id}`);
    return response.data;
};

export const getAvailableTimeSlots = async (locationId, date) => {
    const response = await api.get(
        `/locations/${locationId}/slots?date=${
            date.toISOString().split('T')[0]
        }`
    );
    return response.data;
};

export const createBooking = async (bookingData) => {
    const data = {
        ...bookingData,
        slot: new Date(bookingData.slot).toISOString(),
    };
    const response = await api.post('/bookings', data);
    return response.data;
};

export const getMyBookings = async () => {
    const response = await api.get('/bookings');
    return response.data;
};

export const cancelBooking = async (bookingId) => {
    const response = await api.delete(`/bookings/${bookingId}`);
    return response.data;
};
