import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import './ProfileStats.css';

function ProfileStats({ stats }) {
    return (
        <div className="profile-stats">
            <h2>Статистика игр</h2>

            <div className="stats-overview">
                <div className="stat-card">
                    <h3>Всего игр</h3>
                    <p className="stat-value">{stats.totalGames || 0}</p>
                </div>
                <div className="stat-card">
                    <h3>Средний результат</h3>
                    <p className="stat-value">
                        {stats.avgScore?.toFixed(1) || 0}%
                    </p>
                </div>
            </div>

            {stats.games && stats.games.length > 0 && (
                <>
                    <h3>Результаты по играм</h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={stats.games}>
                                <XAxis dataKey="game.name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="score"
                                    fill="#8884d8"
                                    name="Результат %"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="games-list">
                        {stats.games.map((game) => (
                            <div key={game._id} className="game-item">
                                <h4>{game.game.name}</h4>
                                <p>
                                    Последняя игра:{' '}
                                    {new Date(
                                        game.lastPlayed
                                    ).toLocaleDateString()}
                                </p>
                                <p>Всего сыграно: {game.totalGames}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default ProfileStats;
