import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import './BookingSuccessPage.css';

function BookingSuccessPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state?.booking) {
            navigate('/booking');
        }
    }, [state, navigate]);

    if (!state?.booking) return null;

    const { booking } = state;
    const bookingDate = new Date(booking.slot).toLocaleString('ru-RU', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <MainLayout>
            <div className="success-page">
                <div className="success-card">
                    <div className="success-icon">✓</div>
                    <h1>Бронирование подтверждено!</h1>
                    <p>
                        Мы отправили детали бронирования на вашу почту:{' '}
                        {booking.email}
                    </p>

                    <div className="booking-details">
                        <h2>Детали бронирования</h2>
                        <p>
                            <strong>Локация:</strong> {booking.location.name}
                        </p>
                        <p>
                            <strong>Адрес:</strong> {booking.location.address}
                        </p>
                        <p>
                            <strong>Игра:</strong> {booking.game.name}
                        </p>
                        <p>
                            <strong>Дата и время:</strong> {bookingDate}
                        </p>
                        <p>
                            <strong>Количество игроков:</strong>{' '}
                            {booking.players}
                        </p>
                        <p>
                            <strong>Язык:</strong> {booking.language}
                        </p>
                    </div>

                    <button
                        className="home-btn"
                        onClick={() => navigate('/home')}
                    >
                        Вернуться на главную
                    </button>
                </div>
            </div>
        </MainLayout>
    );
}

export default BookingSuccessPage;
