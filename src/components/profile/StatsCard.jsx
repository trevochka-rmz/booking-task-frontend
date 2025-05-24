import './StatsCard.css';

function StatsCard({ stat }) {
    return (
        <div className="stat-card">
            <h3>{stat._id}</h3>
            <div className="stat-item">
                <span className="stat-label">Всего игр:</span>
                <span className="stat-value">{stat.totalGames}</span>
            </div>
            <div className="stat-item">
                <span className="stat-label">Правильные ответы:</span>
                <span className="stat-value">
                    {stat.avgCorrectAnswers.toFixed(1)}%
                </span>
            </div>
            <div className="stat-item">
                <span className="stat-label">Среднее время:</span>
                <span className="stat-value">
                    {stat.avgResponseTime.toFixed(1)} сек
                </span>
            </div>
            <div className="stat-item">
                <span className="stat-label">Последняя игра:</span>
                <span className="stat-value">
                    {new Date(stat.lastPlayed).toLocaleDateString('ru-RU')}
                </span>
            </div>
        </div>
    );
}
export default StatsCard;
