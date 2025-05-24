import api from './api';

export const getGameStats = async () => {
    const { data } = await api.get('/stats');
    return data;
};

export const getPlayerStats = async (playerId) => {
    const { data } = await api.get(`/stats/players/${playerId}`);
    return data;
};
