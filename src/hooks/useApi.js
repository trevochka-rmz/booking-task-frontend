import { useState, useCallback } from 'react';
import api from '../services/api';

export function useApi() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (url, options = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api({
                url,
                ...options,
            });
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Произошла ошибка');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { fetchData, loading, error };
}
