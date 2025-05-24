import './LocationCard.css';

function LocationCard({ location, isSelected, onClick }) {
    return (
        <div
            className={`location-card ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
        >
            <div className="location-image">
                {location.imageUrl ? (
                    <img src={location.imageUrl} alt={location.name} />
                ) : (
                    <div className="image-placeholder">Фото отсутствует</div>
                )}
            </div>
            <div className="location-info">
                <h3>{location.name}</h3>
                <p className="address">{location.address}</p>
                <p className="description">{location.description}</p>
                <div className="location-details">
                    <span className="price">{location.price} руб.</span>
                    <span className="capacity">
                        До {location.capacity} чел.
                    </span>
                </div>
            </div>
        </div>
    );
}
export default LocationCard;
