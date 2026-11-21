
import { useState } from "react";
import {
  Newspaper,
  ExternalLink,
  Menu,
  X,
  Bookmark,
  Sun,
  Moon,
} from "lucide-react";

function Navbar({ savedCount, showSaved, setShowSaved, darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        <div className="h-20 flex items-center justify-between">

          <a
            href="#home"
            onClick={() => {
              setShowSaved(false);
              closeMenu();
            }}
            className="flex items-center gap-3"
          >
            <div className="bg-indigo-600 text-white p-2.5 rounded-xl">
              <Newspaper size={24} />
            </div>

            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Daily<span className="text-indigo-600">Byte</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            <button
              onClick={() => setShowSaved(false)}
              className={`text-sm font-semibold ${
                !showSaved
                  ? "text-indigo-600"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              Home
            </button>

            <a
              href="#news"
              onClick={() => setShowSaved(false)}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600"
            >
              Latest News
            </a>

            <a
              href="#categories"
              onClick={() => setShowSaved(false)}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600"
            >
              Categories
            </a>

            <button
              onClick={() => setShowSaved(true)}
              className={`relative flex items-center gap-2 text-sm font-semibold ${
                showSaved
                  ? "text-indigo-600"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              <Bookmark size={17} />
              Saved
              {savedCount > 0 && (
                <span className="bg-indigo-600 text-white text-[10px] rounded-full px-2 py-0.5">
                  {savedCount}
                </span>
              )}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-yellow-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            <a
              href="https://news.ycombinator.com/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700"
            >
              Hacker News
              <ExternalLink size={15} />
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-700 dark:text-white"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-700 py-5 flex flex-col gap-5">

            <button
              onClick={() => {
                setShowSaved(false);
                closeMenu();
              }}
              className="text-left text-sm font-semibold text-indigo-600"
            >
              Home
            </button>

            <a
              href="#news"
              onClick={() => {
                setShowSaved(false);
                closeMenu();
              }}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300"
            >
              Latest News
            </a>

            <a
              href="#categories"
              onClick={() => {
                setShowSaved(false);
                closeMenu();
              }}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300"
            >
              Categories
            </a>

            <button
              onClick={() => {
                setShowSaved(true);
                closeMenu();
              }}
              className="flex items-center gap-2 text-left text-sm font-semibold text-slate-600 dark:text-slate-300"
            >
              <Bookmark size={17} />
              Saved News ({savedCount})
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 text-left text-sm font-semibold text-slate-600 dark:text-slate-300"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            <a
              href="https://news.ycombinator.com/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-indigo-600"
            >
              Hacker News <ExternalLink size={15} />
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
