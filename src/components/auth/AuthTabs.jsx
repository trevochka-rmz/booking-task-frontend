import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthForm from './AuthForm';
import { forgotPassword } from '../../services/authService';
import ForgotPasswordForm from './ForgotPasswordForm';
import './AuthTabs.css';

function AuthTabs({ onAuthSuccess }) {
    const [activeTab, setActiveTab] = useState('login');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const { login, register } = useAuth();

    const handleAuthSubmit = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            if (activeTab === 'login') {
                await login(credentials.email, credentials.password);
            } else {
                await register(credentials.email, credentials.password);
            }

            if (onAuthSuccess) {
                onAuthSuccess();
            } else {
                navigate('/home');
            }
        } catch (error) {
            setError(error.message || 'Ошибка авторизации');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPasswordSubmit = async (email) => {
        setLoading(true);
        setError(null);
        try {
            await forgotPassword(email);
            setMessage('Ссылка для сброса пароля отправлена на ваш email');
        } catch (error) {
            setError(
                error.response?.data?.message || 'Ошибка при отправке ссылки'
            );
        } finally {
            setLoading(false);
        }
    };

    if (showForgotPassword) {
        return (
            <div className="auth-tabs">
                <ForgotPasswordForm
                    onSubmit={handleForgotPasswordSubmit}
                    onBack={() => setShowForgotPassword(false)}
                    loading={loading}
                    error={error}
                    message={message}
                />
            </div>
        );
    }

    return (
        <div className="auth-tabs">
            <div className="tab-buttons">
                <button
                    className={activeTab === 'login' ? 'active' : ''}
                    onClick={() => setActiveTab('login')}
                >
                    Вход
                </button>
                <button
                    className={activeTab === 'register' ? 'active' : ''}
                    onClick={() => setActiveTab('register')}
                >
                    Регистрация
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            <AuthForm
                type={activeTab}
                onSubmit={handleAuthSubmit}
                loading={loading}
            />

            {/* {activeTab === 'login' && (
                <button
                    className="forgot-password-button"
                    onClick={() => setShowForgotPassword(true)}
                >
                    Забыли пароль?
                </button>
            )} */}
        </div>
    );
}

export default AuthTabs;
