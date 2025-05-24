// TimeSlot.jsx
import './TimeSlot.css';

function TimeSlot({ time, isAvailable, isSelected, onClick }) {
    const slotTime = new Date(time);
    const timeString = slotTime.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <button
            type="button"
            className={`time-slot ${isSelected ? 'selected' : ''} ${
                !isAvailable ? 'booked' : ''
            }`}
            onClick={() => isAvailable && onClick(time)}
            disabled={!isAvailable}
        >
            {timeString}
            {!isAvailable && <span className="booked-label">Занято</span>}
        </button>
    );
}

export default TimeSlot;
