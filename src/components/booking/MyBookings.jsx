import BookingCard from './BookingCard';
import './MyBookings.css';

function MyBookings({ bookings, onCancel }) {
    const upcomingBookings = bookings.filter(
        (booking) =>
            new Date(booking.slot) > new Date() &&
            booking.status === 'confirmed'
    );
    const pastBookings = bookings.filter(
        (booking) =>
            new Date(booking.slot) <= new Date() ||
            booking.status !== 'confirmed'
    );

    return (
        <div className="my-bookings">
            {upcomingBookings.length > 0 ? (
                <>
                    <h3>Предстоящие бронирования</h3>
                    <div className="bookings-grid">
                        {upcomingBookings.map((booking) => (
                            <BookingCard
                                key={booking._id}
                                booking={booking}
                                onCancel={onCancel}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <p className="no-bookings">
                    У вас нет предстоящих бронирований
                </p>
            )}

            {pastBookings.length > 0 && (
                <>
                    <h3>История бронирований</h3>
                    <div className="bookings-grid">
                        {pastBookings.map((booking) => (
                            <BookingCard key={booking._id} booking={booking} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
export default MyBookings;
