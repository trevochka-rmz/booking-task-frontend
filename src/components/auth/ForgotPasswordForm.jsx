import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import './AuthForm.css';

function ForgotPasswordForm({ onSubmit, onBack, loading, error, message }) {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(email);
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h3>Восстановление пароля</h3>

            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            <Input
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <div className="form-actions">
                <Button type="button" onClick={onBack} disabled={loading}>
                    Назад
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Отправка...' : 'Отправить ссылку'}
                </Button>
            </div>
        </form>
    );
}

export default ForgotPasswordForm;
