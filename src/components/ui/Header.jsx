import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

function Header({ minimal }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <header className={`app-header ${minimal ? 'minimal' : ''}`}>
            <div className="header-container">
                <Link to="/" className="logo">
                    КвестРум
                </Link>

                {user && (
                    <nav className="nav-links">
                        <Link to="/booking">Бронирование</Link>
                        <Link to="/profile">Профиль</Link>
                        {user.role === 'admin' && (
                            <Link to="/admin">Админ</Link>
                        )}
                    </nav>
                )}

                {user ? (
                    <button onClick={handleLogout} className="logout-button">
                        Выйти
                    </button>
                ) : (
                    <div></div>
                )}
            </div>
        </header>
    );
}

export default Header;
