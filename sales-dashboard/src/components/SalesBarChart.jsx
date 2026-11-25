
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function SalesBarChart({ data }) {
  return (
    <div className="chart-card">
      <div className="chart-heading">
        <div>
          <h3>Sales Overview</h3>
          <p>Sales performance by month</p>
        </div>

        <span className="chart-badge">Sales</span>
      </div>

      <ResponsiveContainer width="100%" height={290}>
        <BarChart data={data}>
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

          <Tooltip />

          <Bar
            dataKey="sales"
            name="Sales"
            fill="#6366f1"
            radius={[7, 7, 0, 0]}
            barSize={35}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesBarChart;
