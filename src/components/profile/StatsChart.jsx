import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import './StatsChart.css';

const StatsChart = ({ stats }) => {
    const chartData = stats.map((stat) => ({
        name: stat._id,
        'Правильные ответы (%)': stat.avgCorrectAnswers,
        'Среднее время ответа (сек)': stat.avgResponseTime,
        'Количество игр': stat.totalGames,
    }));

    return (
        <div className="stats-chart">
            <h3>Статистика по локациям</h3>
            <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar
                            yAxisId="left"
                            dataKey="Правильные ответы (%)"
                            fill="#8884d8"
                            name="Правильные ответы %"
                        />
                        <Bar
                            yAxisId="right"
                            dataKey="Среднее время ответа (сек)"
                            fill="#82ca9d"
                            name="Время ответа (сек)"
                        />
                        <Bar
                            yAxisId="left"
                            dataKey="Количество игр"
                            fill="#ffc658"
                            name="Количество игр"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
export default StatsChart;
