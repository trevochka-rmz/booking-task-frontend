// useLocations.js
import { useState, useEffect } from 'react';
import {
    getLocations,
    getAvailableTimeSlots,
} from '../services/locationService';

export default function useLocations() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refreshLocations = async () => {
        try {
            setLoading(true);
            const data = await getLocations();
            setLocations(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Добавляем функцию для получения слотов
    const fetchAvailableSlots = async (locationId, date) => {
        try {
            const slots = await getAvailableTimeSlots(locationId, date);
            return slots;
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        refreshLocations();
    }, []);

    return {
        locations,
        loading,
        error,
        refreshLocations,
        fetchAvailableSlots, // Добавляем в возвращаемые значения
    };
}
