
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  TrendingUp,
  Package,
  Menu,
  X,
  CalendarDays,
} from "lucide-react";

function Navbar({
  selectedMonth,
  setSelectedMonth,
  menuOpen,
  setMenuOpen,
  months,
}) {
  return (
    <>
      {menuOpen && (
        <div
          className="overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="logo">
          <div className="logo-icon">
            <TrendingUp size={23} />
          </div>

          <h2>SalesPro<span>.</span></h2>

          <button
            className="close-menu"
            onClick={() => setMenuOpen(false)}
          >
            <X />
          </button>
        </div>

        <p className="menu-label">MENU</p>

        <nav>
          <a href="#dashboard" className="nav-item active"
            onClick={() => setMenuOpen(false)}>
            <LayoutDashboard size={19} />
            Dashboard
          </a>

          <a href="#transactions" className="nav-item"
            onClick={() => setMenuOpen(false)}>
            <ShoppingCart size={19} />
            Orders
          </a>

          <a href="#stats" className="nav-item"
            onClick={() => setMenuOpen(false)}>
            <Users size={19} />
            Customers
          </a>

          <a href="#analytics" className="nav-item"
            onClick={() => setMenuOpen(false)}>
            <TrendingUp size={19} />
            Analytics
          </a>

          <a href="#transactions" className="nav-item"
            onClick={() => setMenuOpen(false)}>
            <Package size={19} />
            Products
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="profile">
            <div className="avatar">A</div>
            <div>
              <h4>Abhi</h4>
              <span>Admin</span>
            </div>
          </div>
        </div>
      </aside>

      <header className="topbar">
        <div className="header-left">
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={23} />
          </button>

          <div>
            <h1>Dashboard Overview</h1>
            <p>Welcome back! Here's your sales report.</p>
          </div>
        </div>

        <div className="header-right">
          <div className="date-filter">
            <CalendarDays size={18} />

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="All">All Months</option>

              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
