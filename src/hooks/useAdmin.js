import { useState, useEffect } from 'react';
import {
    getAllUsers,
    getAllBookings,
    updateBookingStatus,
} from '../services/adminService';

export default function useAdmin() {
    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadAdminData = async () => {
        try {
            setLoading(true);
            const [usersData, bookingsData] = await Promise.all([
                getAllUsers(),
                getAllBookings(),
            ]);
            setUsers(usersData);
            setBookings(bookingsData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const changeBookingStatus = async (bookingId, status) => {
        try {
            await updateBookingStatus(bookingId, status);
            await loadAdminData();
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        loadAdminData();
    }, []);

    return {
        users,
        bookings,
        loading,
        error,
        refreshData: loadAdminData,
        updateBookingStatus: changeBookingStatus,
    };
}
