import { useState } from 'react';
import { AuthForm } from '../components/auth/AuthForm';
import './AuthPage.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1>{isLogin ? 'Вход в систему' : 'Регистрация'}</h1>
                <AuthForm type={isLogin ? 'login' : 'register'} />
                <button
                    className="toggle-auth"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin
                        ? 'Нет аккаунта? Зарегистрируйтесь'
                        : 'Уже есть аккаунт? Войдите'}
                </button>
            </div>
        </div>
    );
};

export default AuthPage;
