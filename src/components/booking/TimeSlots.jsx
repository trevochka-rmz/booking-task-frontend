// TimeSlots.jsx
import { useEffect, useState } from 'react';
import TimeSlot from './TimeSlot';

function TimeSlots({
    locationId,
    date,
    selectedSlot,
    onSelectSlot,
    fetchAvailableSlots,
}) {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadSlots = async () => {
            try {
                setLoading(true);
                const availableSlots = await fetchAvailableSlots(
                    locationId,
                    date
                );
                setSlots(availableSlots);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (locationId && date) {
            loadSlots();
        }
    }, [locationId, date]);

    if (loading)
        return (
            <div className="loading-slots">Загрузка доступных слотов...</div>
        );
    if (error) return <div className="error-slots">Ошибка: {error}</div>;
    if (!slots.length)
        return <div className="no-slots">Нет доступных слотов на эту дату</div>;

    return (
        <div className="time-slots-grid">
            {slots.map((slot) => (
                <TimeSlot
                    key={slot.time}
                    time={slot.time}
                    isAvailable={slot.available}
                    isSelected={selectedSlot === slot.time}
                    onClick={() => onSelectSlot(slot.time)}
                />
            ))}
        </div>
    );
}

export default TimeSlots;
