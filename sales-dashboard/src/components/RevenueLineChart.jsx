
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function RevenueLineChart({ data }) {
  const formatCurrency = (value) =>
    `₹${value.toLocaleString("en-IN")}`;

  return (
    <div className="chart-card">
      <div className="chart-heading">
        <div>
          <h3>Revenue Analytics</h3>
          <p>Monthly revenue growth</p>
        </div>

        <span className="chart-badge">Revenue</span>
      </div>

      <ResponsiveContainer width="100%" height={290}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e9edf5"
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            formatter={(value) => formatCurrency(value)}
          />

          <Line
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke="#06b6d4"
            strokeWidth={3}
            dot={{ r: 5, fill: "#06b6d4" }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueLineChart;
