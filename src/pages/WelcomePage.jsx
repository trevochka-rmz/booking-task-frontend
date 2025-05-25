import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../components/auth/AuthModal';
import Header from '../components/ui/Header';
import './WelcomePage.css';
import MainLayout from '../components/layout/MainLayout';
function WelcomePage() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleAuthSuccess = () => {
        setIsAuthModalOpen(false);
        setTimeout(() => navigate('/home'), 300);
    };

    return (
        <MainLayout>
            {/* <div className="welcome-content"> */}
            <h1>Добро пожаловать в мир квестов!</h1>
            <p>
                Выберите игру, соберите команду и получите незабываемые
                впечатления
            </p>
            <button
                className="primary-button"
                onClick={() => setIsAuthModalOpen(true)}
            >
                Начать
            </button>
            {/* </div> */}
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onAuthSuccess={handleAuthSuccess}
            />
            {/* </div>
             */}
        </MainLayout>
    );
}

export default WelcomePage;
