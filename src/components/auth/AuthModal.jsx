import { useEffect } from 'react';
import AuthTabs from './AuthTabs';
import './AuthModal.css';

function AuthModal({ isOpen, onClose, onAuthSuccess }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="auth-modal-overlay">
            <div className="auth-modal">
                <button className="close-button" onClick={onClose}>
                    ×
                </button>
                <h2>Вход в систему</h2>
                <AuthTabs onAuthSuccess={onAuthSuccess} />
            </div>
        </div>
    );
}

export default AuthModal;
