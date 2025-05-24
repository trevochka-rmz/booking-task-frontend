import { useState, useEffect } from 'react';
import {
    getUserProfile,
    updateProfile,
    getUserStats,
} from '../services/profileService';

export default function useProfile() {
    const [profile, setProfile] = useState(null);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const [profileData, statsData] = await Promise.all([
                getUserProfile(),
                getUserStats(),
            ]);
            setProfile(profileData);
            setStats(statsData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = async (profileData) => {
        try {
            const updatedProfile = await updateProfile(profileData);
            setProfile(updatedProfile);
            return updatedProfile;
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    return {
        profile,
        stats,
        loading,
        error,
        updateProfile: updateUserProfile,
        refreshProfile: loadProfile,
    };
}
