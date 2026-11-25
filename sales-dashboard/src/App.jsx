
import { useState } from "react";
import {
  IndianRupee,
  TrendingUp,
  ShoppingCart,
  Users,
} from "lucide-react";

import Navbar from "./components/Navbar";
import StatCard from "./components/StateCard.jsx";
import SalesBarChart from "./components/SalesBarChart";
import RevenueLineChart from "./components/RevenueLineChart";
import CategoryPieChart from "./components/CategoryPieChart";

import {
  salesData,
  transactions,
} from "./data/salesData";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import "./App.css";

function App() {
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Month Filter
  const filteredData =
    selectedMonth === "All"
      ? salesData
      : salesData.filter(
          (item) => item.month === selectedMonth
        );

  // Statistics
  const totalRevenue = filteredData.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  const totalSales = filteredData.reduce(
    (sum, item) => sum + item.sales,
    0
  );

  const totalOrders = filteredData.reduce(
    (sum, item) => sum + item.orders,
    0
  );

  const totalCustomers = filteredData.reduce(
    (sum, item) => sum + item.customers,
    0
  );

  // Category Data
  const categoryNames = [
    "Electronics",
    "Fashion",
    "Furniture",
    "Other",
  ];

  const categoryData = categoryNames.map((name) => ({
    name,
    value: filteredData.reduce(
      (sum, item) => sum + item.categories[name],
      0
    ),
  }));

  // Weekly Data
  const weeklyData = [0, 1, 2, 3].map((index) => ({
    week: `Week ${index + 1}`,
    sales: filteredData.reduce(
      (sum, item) => sum + item.weeklySales[index],
      0
    ),
  }));

  // Transactions Filter
  const filteredTransactions = transactions.filter((item) => {
    const matchesMonth =
      selectedMonth === "All" ||
      item.date === selectedMonth;

    const matchesSearch =
      item.customer.toLowerCase().includes(search.toLowerCase()) ||
      item.product.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());

    return matchesMonth && matchesSearch;
  });

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "purple",
    },
    {
      title: "Total Sales",
      value: totalSales.toLocaleString("en-IN"),
      icon: TrendingUp,
      color: "blue",
    },
    {
      title: "Total Orders",
      value: totalOrders.toLocaleString("en-IN"),
      icon: ShoppingCart,
      color: "orange",
    },
    {
      title: "Total Customers",
      value: totalCustomers.toLocaleString("en-IN"),
      icon: Users,
      color: "green",
    },
  ];

  return (
    <div className="dashboard">

      <main className="main-content">

        {/* Navbar */}
        <Navbar
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          months={salesData.map((item) => item.month)}
        />

        {/* Statistics */}
        <section className="stats-grid" id="stats">
          {stats.map((item) => (
            <StatCard
              key={item.title}
              title={item.title}
              value={item.value}
              icon={item.icon}
              color={item.color}
              period={
                selectedMonth === "All"
                  ? "January - June"
                  : selectedMonth
              }
            />
          ))}
        </section>

        {/* Main Charts */}
        <section className="charts-grid" id="analytics">

          <SalesBarChart data={filteredData} />

          <RevenueLineChart data={filteredData} />

          <CategoryPieChart data={categoryData} />

          {/* Weekly Sales */}
          <div className="chart-card">
            <div className="chart-heading">
              <div>
                <h3>Weekly Sales</h3>
                <p>Weekly revenue breakdown</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={290}>
              <BarChart data={weeklyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis dataKey="week" />
                <YAxis />

                <Tooltip
                  formatter={(value) =>
                    `₹${value.toLocaleString("en-IN")}`
                  }
                />

                <Bar
                  dataKey="sales"
                  name="Revenue"
                  fill="#f59e0b"
                  radius={[7, 7, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </section>

        {/* Transactions */}
        <section className="transactions-card" id="transactions">

          <div className="transactions-header">
            <div>
              <h3>Recent Transactions</h3>
              <p>Latest orders from your customers</p>
            </div>

            <div className="search-box">
              <input
                type="text"
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Month</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((item) => (
                    <tr key={item.id}>
                      <td className="order-id">{item.id}</td>
                      <td>{item.customer}</td>
                      <td>{item.product}</td>
                      <td>{item.date}</td>
                      <td className="amount">
                        ₹{item.amount.toLocaleString("en-IN")}
                      </td>
                      <td>
                        <span
                          className={`status ${
                            item.status === "Completed"
                              ? "completed"
                              : "pending"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="empty-state">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </section>

        <footer className="footer">
          © 2026 SalesPro. All rights reserved.
        </footer>

      </main>
    </div>
  );
}

export default App;
