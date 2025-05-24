import { useState, useEffect } from 'react';
import {
    getMyBookings,
    cancelBooking,
    createBooking as apiCreateBooking,
} from '../services/bookingService';

export default function useBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const createBooking = async (bookingData) => {
        setLoading(true);
        try {
            const response = await apiCreateBooking(bookingData);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const refreshBookings = async () => {
        try {
            setLoading(true);
            const data = await getMyBookings();
            setBookings(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        try {
            await cancelBooking(bookingId);
            await refreshBookings();
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        refreshBookings();
    }, []);

    return {
        bookings,
        loading,
        error,
        refreshBookings,
        createBooking,
        cancelBooking: handleCancelBooking,
    };
}
