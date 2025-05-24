import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useBookings from '../hooks/useBookings';
import useLocations from '../hooks/useLocations';
import BookingSteps from '../components/booking/BookingSteps';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import TimeSlots from '../components/booking/TimeSlots';
import Header from '../components/ui/Header';
import './BookingPage.css';
import MainLayout from '../components/layout/MainLayout';
function BookingPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [bookingData, setBookingData] = useState({
        country: '',
        city: '',
        locationId: '',
        gameType: '',
        date: new Date(),
        slot: '',
        players: 2,
        language: 'ru',
        email: '',
    });

    const {
        locations,
        loading: locationsLoading,
        error: locationsError,
        refreshLocations,
        fetchAvailableSlots,
    } = useLocations();

    const {
        bookings,
        loading: bookingsLoading,
        error: bookingsError,
        createBooking,
        cancelBooking,
    } = useBookings();

    const handleInputChange = (field, value) => {
        setBookingData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleNextStep = () => {
        if (step === 5 && !bookingData.gameType) {
            alert('Пожалуйста, выберите игру');
            return;
        }
        if (step < 7) setStep(step + 1);
    };

    const handlePrevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmitBooking = async () => {
        try {
            // Проверяем обязательные поля
            if (!bookingData.date || !bookingData.slot) {
                throw new Error('Выберите дату и время');
            }

            // Формируем правильный объект даты
            const slotDate = new Date(bookingData.slot);
            if (isNaN(slotDate.getTime())) {
                throw new Error('Некорректная дата бронирования');
            }

            // Формируем данные для отправки
            const bookingRequest = {
                locationId: bookingData.locationId,
                gameId: bookingData.gameType,
                slot: slotDate.toISOString(), // Преобразуем в ISO строку
                players: bookingData.players,
                language: bookingData.language,
                email: bookingData.email,
            };

            const response = await createBooking(bookingRequest);

            // Перенаправление на страницу успеха
            navigate('/booking/success', {
                state: {
                    booking: {
                        ...response,
                        location: locations.find(
                            (l) => l._id === bookingData.locationId
                        ),
                        game: locations
                            .find((l) => l._id === bookingData.locationId)
                            ?.games.find((g) => g.id === bookingData.gameType),
                    },
                },
            });
        } catch (error) {
            console.error('Booking error:', error);
            alert(error.message);
        }
    };

    // Группировка локаций по странам и городам
    const countries = [...new Set(locations.map((l) => l.country))];
    const citiesByCountry = locations.reduce((acc, location) => {
        if (!acc[location.country]) {
            acc[location.country] = [];
        }
        if (!acc[location.country].includes(location.city)) {
            acc[location.country].push(location.city);
        }
        return acc;
    }, {});

    const locationsByCity = locations.filter(
        (l) => l.city === bookingData.city
    );
    const selectedLocation = locations.find(
        (l) => l._id === bookingData.locationId
    );
    const selectedGame = selectedLocation?.games.find(
        (g) => g.id === bookingData.gameType
    );

    if (locationsLoading || bookingsLoading) return <Loader />;
    if (locationsError) return <ErrorMessage message={locationsError} />;
    if (bookingsError) return <ErrorMessage message={bookingsError} />;

    return (
        <MainLayout>
            {/* <Header minimal={true} /> */}
            {/* <div className="booking-main"> */}
            <h1>Бронирование квеста</h1>

            <BookingSteps
                currentStep={step}
                onNext={handleNextStep}
                onPrev={handlePrevStep}
            />

            <div className="booking-container">
                {step === 1 && (
                    <div className="booking-step">
                        <h2>Выберите страну</h2>
                        <div className="options-grid">
                            {countries.map((country) => (
                                <button
                                    key={country}
                                    className={`option-btn ${
                                        bookingData.country === country
                                            ? 'selected'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        handleInputChange('country', country)
                                    }
                                >
                                    {country}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div className="booking-step">
                        <h2>Выберите город</h2>
                        <div className="options-grid">
                            {citiesByCountry[bookingData.country]?.map(
                                (city) => (
                                    <button
                                        key={city}
                                        className={`option-btn ${
                                            bookingData.city === city
                                                ? 'selected'
                                                : ''
                                        }`}
                                        onClick={() =>
                                            handleInputChange('city', city)
                                        }
                                    >
                                        {city}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div className="booking-step">
                        <h2>Выберите локацию</h2>
                        <div className="locations-grid">
                            {locationsByCity.map((location) => (
                                <div
                                    key={location._id}
                                    className={`location-card ${
                                        bookingData.locationId === location._id
                                            ? 'selected'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        handleInputChange(
                                            'locationId',
                                            location._id
                                        )
                                    }
                                >
                                    <h3>{location.name}</h3>
                                    <p>{location.address}</p>
                                    <p>Цена: {location.price} руб.</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {step === 4 && (
                    <div className="booking-step">
                        <h2>Выберите игру</h2>
                        <div className="options-grid">
                            {locations
                                .find((l) => l._id === bookingData.locationId)
                                ?.games.map((game) => (
                                    <button
                                        key={game.id}
                                        className={`option-btn ${
                                            bookingData.gameType === game.id
                                                ? 'selected'
                                                : ''
                                        }`}
                                        onClick={() =>
                                            handleInputChange(
                                                'gameType',
                                                game.id
                                            )
                                        }
                                    >
                                        {game.name}
                                    </button>
                                ))}
                        </div>
                    </div>
                )}
                {step === 5 && (
                    <div className="booking-step">
                        <h2>Выберите дату и время</h2>
                        <DatePicker
                            selected={bookingData.date}
                            onChange={(date) => {
                                handleInputChange('date', date);
                                handleInputChange('slot', '');
                            }}
                            minDate={new Date()}
                            inline
                        />

                        {bookingData.date && (
                            <TimeSlots
                                locationId={bookingData.locationId}
                                date={bookingData.date}
                                selectedSlot={bookingData.slot}
                                onSelectSlot={(slot) =>
                                    handleInputChange('slot', slot)
                                }
                                fetchAvailableSlots={fetchAvailableSlots}
                            />
                        )}
                    </div>
                )}

                {step === 6 && (
                    <div className="booking-step">
                        <h2>Детали бронирования</h2>

                        {/* Количество игроков */}
                        <div className="form-group">
                            <label>
                                Количество игроков (
                                {selectedGame?.minPlayers || 2}-
                                {selectedGame?.maxPlayers || 6}):
                            </label>
                            <input
                                type="number"
                                min={selectedGame?.minPlayers || 2}
                                max={selectedGame?.maxPlayers || 6}
                                value={bookingData.players}
                                onChange={(e) =>
                                    handleInputChange(
                                        'players',
                                        parseInt(e.target.value)
                                    )
                                }
                            />
                        </div>

                        {/* Выбор языка */}
                        <div className="form-group">
                            <label>Язык:</label>
                            <select
                                value={bookingData.language}
                                onChange={(e) =>
                                    handleInputChange(
                                        'language',
                                        e.target.value
                                    )
                                }
                            >
                                {selectedGame?.languages?.map((lang) => (
                                    <option key={lang} value={lang}>
                                        {{
                                            ru: 'Русский',
                                            en: 'English',
                                            ge: 'Deutsch',
                                        }[lang] || lang}
                                    </option>
                                ))}
                            </select>
                            <small>
                                Доступные языки:{' '}
                                {selectedGame?.languages?.join(', ') ||
                                    'русский'}
                            </small>
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label>Email для подтверждения:</label>
                            <input
                                type="email"
                                value={bookingData.email}
                                onChange={(e) =>
                                    handleInputChange('email', e.target.value)
                                }
                                required
                            />
                        </div>
                    </div>
                )}
                {step === 7 && (
                    <div className="booking-step confirmation">
                        <h2>Подтверждение бронирования</h2>
                        <div className="confirmation-details">
                            <p>
                                <strong>Локация:</strong>{' '}
                                {
                                    locations.find(
                                        (l) => l._id === bookingData.locationId
                                    )?.name
                                }
                            </p>
                            <p>
                                <strong>Игра:</strong>{' '}
                                {
                                    locations
                                        .find(
                                            (l) =>
                                                l._id === bookingData.locationId
                                        )
                                        ?.games.find(
                                            (g) => g.id === bookingData.gameType
                                        )?.name
                                }
                            </p>
                            <p>
                                <strong>Дата:</strong>{' '}
                                {bookingData.date?.toLocaleDateString('ru-RU')}
                            </p>
                            <p>
                                <strong>Время:</strong>{' '}
                                {bookingData.slot &&
                                    new Date(
                                        bookingData.slot
                                    ).toLocaleTimeString('ru-RU', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                            </p>
                            <p>
                                <strong>Игроков:</strong> {bookingData.players}
                            </p>
                            <p>
                                <strong>Язык:</strong>{' '}
                                {
                                    {
                                        ru: 'Русский',
                                        en: 'English',
                                        ge: 'Deutsch',
                                    }[bookingData.language]
                                }
                            </p>
                        </div>
                        <button
                            className="confirm-btn"
                            onClick={handleSubmitBooking}
                        >
                            Подтвердить бронирование
                        </button>
                    </div>
                )}
            </div>
            {/* </div> */}
        </MainLayout>
    );
}

export default BookingPage;
