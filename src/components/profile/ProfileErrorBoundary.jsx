import { Component } from 'react';
import './ProfileErrorBoundary.css';

class ProfileErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Profile Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="profile-error-boundary">
                    <h2>Что-то пошло не так</h2>
                    <p>
                        Не удалось загрузить профиль. Пожалуйста, попробуйте
                        позже.
                    </p>
                    <button onClick={() => window.location.reload()}>
                        Обновить страницу
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ProfileErrorBoundary;
