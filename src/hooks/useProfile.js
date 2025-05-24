import { useState, useEffect } from 'react';
import {
    getProfile as apiGetProfile,
    updateProfile as apiUpdateProfile,
    getUserStats as apiGetUserStats,
    getGameHistory as apiGetGameHistory,
    getUserBookingStats as apiGetUserBookingStats,
} from '../services/profileService';

export default function useProfile() {
    const [profile, setProfile] = useState(null);
    const [stats, setStats] = useState(null);
    const [gameHistory, setGameHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = async () => {
        try {
            setLoading(true);
            const [profileData, statsData, bookingStats] = await Promise.all([
                apiGetProfile(),
                apiGetUserStats(),
                apiGetUserBookingStats(),
            ]);
            setProfile(profileData);
            setStats({
                ...statsData,
                ...bookingStats,
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (formData) => {
        try {
            const updated = await apiUpdateProfile(formData);
            setProfile(updated);
            return updated;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return {
        profile,
        stats,
        gameHistory,
        loading,
        error,
        updateProfile,
        refresh: loadData,
    };
}
