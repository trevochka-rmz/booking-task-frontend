import api from './api';

export const getAllUsers = async () => {
    const response = await api.get('/admin/users');
    return response.data;
};

export const getAllBookings = async (params = {}) => {
    const response = await api.get('/admin/bookings', { params });
    return response.data;
};

export const updateBookingStatus = async (bookingId, status) => {
    const response = await api.patch(`/admin/bookings/${bookingId}/status`, {
        status,
    });
    return response.data;
};
