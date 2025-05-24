import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useProfile from '../hooks/useProfile';
import useBookings from '../hooks/useBookings';
import ProfileInfo from '../components/profile/ProfileInfo';
import OnboardingForm from '../components/profile/OnBoardingForm';
import BookingHistory from '../components/profile/BookingHistory';
import StatsOverview from '../components/stats/StatsOverview';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import Button from '../components/ui/Button';
import './ProfilePage.css';
import MainLayout from '../components/layout/MainLayout';
function ProfilePage() {
    const navigate = useNavigate();
    const {
        profile,
        stats,
        loading: profileLoading,
        error: profileError,
        updateProfile,
        refresh: refreshProfile,
    } = useProfile();

    const {
        bookings,
        loading: bookingsLoading,
        error: bookingsError,
        refreshBookings,
    } = useBookings();

    const [editMode, setEditMode] = useState(false);

    // Убрали автоматическое включение editMode при отсутствии completedOnboarding
    // Теперь editMode включается только по кнопке
    useEffect(() => {
        // Можно добавить другую логику инициализации при необходимости
    }, [profile]);

    const handleSubmit = async (formData) => {
        try {
            await updateProfile(formData);
            await refreshProfile();
            setEditMode(false);
        } catch (err) {
            console.error('Failed to save profile:', err);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        try {
            await cancelBooking(bookingId);
            await refreshBookings();
        } catch (err) {
            console.error('Failed to cancel booking:', err);
        }
    };

    if (profileLoading || bookingsLoading) return <Loader />;
    if (profileError) return <ErrorMessage message={profileError} />;
    if (bookingsError) return <ErrorMessage message={bookingsError} />;

    return (
        <MainLayout>
            <div className="profile-header">
                <h1>Мой профиль</h1>
                {!editMode && (
                    <Button
                        onClick={() => setEditMode(true)}
                        className="edit-button"
                    >
                        Редактировать профиль
                    </Button>
                )}
            </div>

            {editMode ? (
                <OnboardingForm
                    initialData={profile}
                    onSubmit={handleSubmit}
                    onCancel={() => setEditMode(false)} // Добавили кнопку отмены
                />
            ) : (
                <>
                    <ProfileInfo profile={profile} />

                    <div className="profile-stats-section">
                        <h2>Моя статистика</h2>
                        <StatsOverview stats={stats} />
                    </div>

                    <div className="booking-history-section">
                        <h2>История бронирований</h2>
                        <BookingHistory
                            bookings={bookings}
                            onCancel={handleCancelBooking}
                        />
                    </div>
                </>
            )}
        </MainLayout>
    );
}

export default ProfilePage;
