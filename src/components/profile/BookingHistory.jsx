import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Button from '../ui/Button';
import './BookingHistory.css';

function BookingHistory({ bookings, onCancel }) {
    if (!bookings || bookings.length === 0) {
        return <p className="no-bookings">У вас пока нет бронирований</p>;
    }

    return (
        <div className="booking-history">
            {bookings.map((booking) => (
                <div key={booking._id} className="booking-card">
                    <div className="booking-info">
                        <h3>{booking.locationId?.name || 'Локация'}</h3>
                        <p>
                            <strong>Игра:</strong> {booking.gameId}
                        </p>
                        <p>
                            <strong>Дата:</strong>{' '}
                            {format(
                                new Date(booking.slot),
                                'dd MMMM yyyy, HH:mm',
                                { locale: ru }
                            )}
                        </p>
                        <p>
                            <strong>Игроков:</strong> {booking.players}
                        </p>
                        <p>
                            <strong>Статус:</strong>{' '}
                            <span className={`status-${booking.status}`}>
                                {getStatusText(booking.status)}
                            </span>
                        </p>
                    </div>

                    {booking.status === 'confirmed' && (
                        <Button
                            variant="danger"
                            onClick={() => onCancel(booking._id)}
                            className="cancel-button"
                        >
                            Отменить
                        </Button>
                    )}
                </div>
            ))}
        </div>
    );
}

function getStatusText(status) {
    const statusMap = {
        confirmed: 'Подтверждено',
        cancelled: 'Отменено',
        completed: 'Завершено',
    };
    return statusMap[status] || status;
}

export default BookingHistory;
