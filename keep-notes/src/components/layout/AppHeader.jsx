import { Search, Sun, Moon, Menu } from "lucide-react";

function AppHeader({
  search,
  onSearchChange,
  theme,
  onToggleTheme,
  onMenuClick,
}) {
  return (
    <header className="app-header">
      <button
        className="icon-button menu-button"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      <div className="search-wrapper">
        <Search size={21} />

        <input
          type="search"
          placeholder="Search notes..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />

        {search && (
          <button
            className="search-clear"
            onClick={() => onSearchChange("")}
          >
            Clear
          </button>
        )}
      </div>

      <div className="header-actions">
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {theme === "light" ? <Moon size={21} /> : <Sun size={21} />}
        </button>

        <div className="user-avatar">A</div>
      </div>
    </header>
  );
}

export default AppHeader;