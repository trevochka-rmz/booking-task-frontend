import './StatsTable.css';

function StatsTable({ stats }) {
    return (
        <div className="stats-table">
            <h3>История игр</h3>
            <table>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Локация</th>
                        <th>Правильные ответы</th>
                        <th>Среднее время</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((stat, i) => (
                        <tr key={i}>
                            <td>{new Date(stat.date).toLocaleDateString()}</td>
                            <td>{stat.location}</td>
                            <td>{stat.correctAnswers}%</td>
                            <td>{stat.avgResponseTime} сек</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default StatsTable;
