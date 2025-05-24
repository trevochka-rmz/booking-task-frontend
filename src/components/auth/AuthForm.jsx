import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import './AuthForm.css';

function AuthForm({ type, onSubmit, loading, error }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'Email обязателен';
        else if (!/^\S+@\S+\.\S+$/.test(email))
            newErrors.email = 'Неверный формат email';

        if (!password) newErrors.password = 'Пароль обязателен';
        else if (password.length < 6)
            newErrors.password = 'Пароль слишком короткий';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                onSubmit({ email, password });
            } catch (err) {
                // Ошибка уже будет содержать сообщение из API
                setErrors({ form: err.message });
            }
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            {error && (
                <div className="error-message">
                    {error.form.includes('email') ? '✉️ ' : '🔒 '}
                    {error.form}
                </div>
            )}

            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                required
            />

            <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                required
                minLength="6"
            />

            <Button type="submit" disabled={loading}>
                {loading
                    ? 'Загрузка...'
                    : type === 'login'
                    ? 'Войти'
                    : 'Зарегистрироваться'}
            </Button>
        </form>
    );
}

export default AuthForm;
