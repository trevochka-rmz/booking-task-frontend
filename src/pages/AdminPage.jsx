import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import MainLayout from '../components/layout/MainLayout';
import './AdminPage.css';

function AdminPage() {
    const [locations, setLocations] = useState([]);
    const [newLocation, setNewLocation] = useState({
        name: '',
        address: '',
        price: '',
        capacity: 4,
    });
    const { fetchData, loading } = useApi();

    useEffect(() => {
        const loadLocations = async () => {
            const data = await fetchData('/admin/locations');
            setLocations(data);
        };
        loadLocations();
    }, []);

    const handleAddLocation = async () => {
        const data = await fetchData('/admin/locations', {
            method: 'POST',
            data: newLocation,
        });
        setLocations([...locations, data]);
        setNewLocation({
            name: '',
            address: '',
            price: '',
            capacity: 4,
        });
    };

    return (
        <MainLayout>
            <div className="admin-page">
                <h1>Панель администратора</h1>

                <div className="location-form">
                    <h2>Добавить новую локацию</h2>
                    <div className="form-group">
                        <label>Название:</label>
                        <input
                            type="text"
                            value={newLocation.name}
                            onChange={(e) =>
                                setNewLocation({
                                    ...newLocation,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label>Адрес:</label>
                        <input
                            type="text"
                            value={newLocation.address}
                            onChange={(e) =>
                                setNewLocation({
                                    ...newLocation,
                                    address: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label>Цена (руб):</label>
                        <input
                            type="number"
                            value={newLocation.price}
                            onChange={(e) =>
                                setNewLocation({
                                    ...newLocation,
                                    price: e.target.value,
                                })
                            }
                        />
                    </div>
                    <button onClick={handleAddLocation} disabled={loading}>
                        {loading ? 'Сохранение...' : 'Добавить локацию'}
                    </button>
                </div>

                <div className="locations-list">
                    <h2>Список локаций</h2>
                    {locations.map((location) => (
                        <div key={location.id} className="location-item">
                            <h3>{location.name}</h3>
                            <p>{location.address}</p>
                            <p>Цена: {location.price} руб.</p>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
export default AdminPage;
