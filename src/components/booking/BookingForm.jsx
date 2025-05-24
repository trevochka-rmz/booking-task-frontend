import { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Input from '../ui/Input';
import Button from '../ui/Button';
import './BookingForm.css';

function BookingForm({ location, onSuccess, user }) {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        email: user?.email || '',
        players: 2,
        date: new Date(),
        slot: null,
        comment: '',
    });
    const [availableSlots, setAvailableSlots] = useState([]);
    const { fetchData, loading } = useApi();

    useEffect(() => {
        const loadSlots = async () => {
            const slots = await fetchData(
                `/locations/${
                    location._id
                }/slots?date=${formData.date.toISOString()}`
            );
            setAvailableSlots(slots);
        };
        loadSlots();
    }, [formData.date]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.slot) return;

        const bookingData = {
            ...formData,
            locationId: location._id,
            slot: new Date(
                formData.date.getFullYear(),
                formData.date.getMonth(),
                formData.date.getDate(),
                formData.slot.getHours(),
                formData.slot.getMinutes()
            ).toISOString(),
        };

        await fetchData('/bookings', {
            method: 'POST',
            data: bookingData,
        });

        onSuccess();
    };

    return (
        <div className="booking-form-container">
            <h2>Бронирование: {location.name}</h2>
            <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-row">
                    <Input
                        label="Ваше имя"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        required
                    />
                    <Input
                        label="Телефон"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                    />
                </div>

                <div className="form-row">
                    <Input
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        required
                    />
                    <div className="form-group">
                        <label>Количество игроков</label>
                        <select
                            value={formData.players}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    players: parseInt(e.target.value),
                                })
                            }
                        >
                            {Array.from(
                                { length: location.capacity - 1 },
                                (_, i) => i + 2
                            ).map((num) => (
                                <option key={num} value={num}>
                                    {num}{' '}
                                    {num === 1
                                        ? 'игрок'
                                        : num < 5
                                        ? 'игрока'
                                        : 'игроков'}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Дата бронирования</label>
                        <DatePicker
                            selected={formData.date}
                            onChange={(date) =>
                                setFormData({ ...formData, date, slot: null })
                            }
                            minDate={new Date()}
                            dateFormat="dd.MM.yyyy"
                        />
                    </div>
                </div>

                <div className="time-slots">
                    <h3>Доступное время</h3>
                    <div className="slots-grid">
                        {availableSlots.map((slot) => {
                            const slotTime = new Date(slot.time);
                            return (
                                <button
                                    key={slot.time}
                                    type="button"
                                    className={`time-slot ${
                                        formData.slot?.getTime() ===
                                        slotTime.getTime()
                                            ? 'selected'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            slot: slotTime,
                                        })
                                    }
                                >
                                    {slotTime.toLocaleTimeString('ru-RU', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <Button type="submit" disabled={loading || !formData.slot}>
                    {loading ? 'Обработка...' : 'Подтвердить бронь'}
                </Button>
            </form>
        </div>
    );
}
export default BookingForm;
