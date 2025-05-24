import LocationCard from './LocationCard';
import './BookingList.css';

function BookingList({ locations, onSelectLocation }) {
    return (
        <div className="booking-list">
            <h2>Выберите локацию</h2>
            <div className="locations-grid">
                {locations.map((location) => (
                    <LocationCard
                        key={location._id}
                        location={location}
                        onClick={() => onSelectLocation(location)}
                    />
                ))}
            </div>
        </div>
    );
}
export default BookingList;
