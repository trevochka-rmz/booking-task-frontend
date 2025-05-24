import './StatsOverview.css';

function StatsOverview({ stats }) {
    return (
        <div className="stats-overview">
            <div className="stat-card">
                <h3>Всего игр</h3>
                <p>{stats?.totalGames || 0}</p>
            </div>

            <div className="stat-card">
                <h3>Текущие брони</h3>
                <p>{stats?.upcomingBookings || 0}</p>
            </div>

            <div className="stat-card">
                <h3>Последняя игра</h3>
                <p>
                    {stats?.lastGameDate
                        ? new Date(stats.lastGameDate).toLocaleDateString()
                        : 'Нет данных'}
                </p>
            </div>
        </div>
    );
}

export default StatsOverview;
