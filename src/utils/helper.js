export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
};

export const formatTime = (timeString) => {
    return timeString.slice(0, 5); // Форматирует "14:00:00" в "14:00"
};

export const calculateTotal = (price, players) => {
    return price * players;
};
