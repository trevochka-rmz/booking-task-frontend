import './ProfileInfo.css';

function ProfileInfo({ profile, onEdit }) {
    if (!profile || !profile.profile) {
        return <div className="profile-error">Профиль не загружен</div>;
    }

    return (
        <div className="profile-info">
            <div className="profile-header">
                {/* <div className="avatar-container">
                    <img
                        src={profile.profile.avatar || '/default-avatar.png'}
                        alt="Аватар"
                        className="profile-avatar"
                    />
                </div> */}
                <div className="profile-main">
                    <h1>{profile.profile.name || 'Без имени'}</h1>
                    {/* <p className="username">
                        @{profile.username || 'без ника'}
                    </p> */}
                    <p className="status">
                        {profile.profile.status || 'Не указан'}
                    </p>
                </div>
                {/* <button onClick={onEdit} className="edit-button">
                    Редактировать
                </button> */}
            </div>

            <div className="profile-details">
                <div className="detail-item">
                    <span className="detail-label">Телефон:</span>
                    <span className="detail-value">
                        {profile.profile.phone || 'Не указан'}
                    </span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Дата рождения:</span>
                    <span className="detail-value">
                        {profile.profile.birthDate
                            ? new Date(
                                  profile.profile.birthDate
                              ).toLocaleDateString('ru-RU')
                            : 'Не указана'}
                    </span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Родной язык:</span>
                    <span className="detail-value">
                        {profile.profile.nativeLanguage || 'Не указан'}
                    </span>
                </div>
                {profile.profile.bio && (
                    <div className="detail-item bio">
                        <span className="detail-label">О себе:</span>
                        <p className="detail-value">{profile.profile.bio}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileInfo;
