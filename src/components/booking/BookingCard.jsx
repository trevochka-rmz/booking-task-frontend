import './BookingCard.css';

function BookingCard({ booking }) {
    const bookingDate = new Date(booking.slot);
    const isPast = new Date() > bookingDate;

    return (
        <div className={`booking-card ${isPast ? 'past' : ''}`}>
            <div className="booking-info">
                <h3>{booking.location.name}</h3>
                <p>Дата: {bookingDate.toLocaleDateString('ru-RU')}</p>
                <p>
                    Время:{' '}
                    {bookingDate.toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
                <p>Игроков: {booking.players}</p>
                <p>
                    Статус:{' '}
                    {booking.status === 'confirmed'
                        ? 'Подтверждено'
                        : 'Отменено'}
                </p>
            </div>
        </div>
    );
}
export default BookingCard;
