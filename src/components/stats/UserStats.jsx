import React from 'react';
import './UserStats.css';

function UserStats({ stats }) {
    return (
        <div className="user-stats">
            <h2>Ваша статистика</h2>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Всего игр</h3>
                    <p>{stats.totalGames || 0}</p>
                </div>

                <div className="stat-card">
                    <h3>Средний счёт</h3>
                    <p>{stats.avgScore?.toFixed(2) || '0.00'}</p>
                </div>

                <div className="stat-card">
                    <h3>Любимая игра</h3>
                    <p>{stats.favoriteGame || 'Нет данных'}</p>
                </div>
            </div>

            {stats.lastGames?.length > 0 && (
                <div className="last-games">
                    <h3>Последние игры</h3>
                    <ul>
                        {stats.lastGames.map((game, index) => (
                            <li key={index}>
                                <span className="game-name">{game.game}</span>
                                <span className="game-date">
                                    {new Date(game.date).toLocaleDateString()}
                                </span>
                                <span className="game-score">
                                    Счёт: {game.score}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UserStats;
