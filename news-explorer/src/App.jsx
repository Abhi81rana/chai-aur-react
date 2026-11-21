
import { useEffect, useState } from "react";
import {
  Search,
  TrendingUp,
  Clock,
  Newspaper,
  RefreshCw,
  Zap,
  Bookmark,
  Trash2,
} from "lucide-react";

import Navbar from "./components/Navbar";
import NewsCard from "./components/NewsCard";

const API = import.meta.env.VITE_NEWS_API_URL;

const categories = [
  { label: "Latest", query: "" },
  { label: "React", query: "React" },
  { label: "JavaScript", query: "JavaScript" },
  { label: "AI & Tech", query: "AI" },
  { label: "Startups", query: "startups" },
  { label: "Programming", query: "programming" },
];

function App() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("Latest");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [currentQuery, setCurrentQuery] = useState("");
  const [showSaved, setShowSaved] = useState(false);

  const [savedNews, setSavedNews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("dailybyte-bookmarks")) || [];
    } catch {
      return [];
    }
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("dailybyte-theme") === "dark";
  });

  // Save bookmarks in localStorage
  useEffect(() => {
    localStorage.setItem(
      "dailybyte-bookmarks",
      JSON.stringify(savedNews)
    );
  }, [savedNews]);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem(
      "dailybyte-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  // Fetch API data
  const fetchNews = async (query = "", pageNumber = 0, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      setError("");

      const params = new URLSearchParams({
        tags: "story",
        hitsPerPage: "12",
        page: String(pageNumber),
      });

      if (query) {
        params.set("query", query);
      }

      if (!API) {
        throw new Error("API URL missing. Check your .env file.");
      }

      const response = await fetch(
        `${API}/search_by_date?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch news. Please try again.");
      }

      const data = await response.json();

      const results = data.hits || [];

      setNews((previous) =>
        append ? [...previous, ...results] : results
      );

      setPage(pageNumber);
      setHasMore(pageNumber + 1 < data.nbPages);

    } catch (err) {
      setError(err.message);
      if (!append) setNews([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Initial API call
  useEffect(() => {
    fetchNews();
  }, []);

  // Search
  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    setActive("Search");
    setShowSaved(false);
    setCurrentQuery(query);
    fetchNews(query, 0, false);
  };

  // Category selection
  const handleCategory = (category) => {
    setActive(category.label);
    setSearch("");
    setShowSaved(false);
    setCurrentQuery(category.query);
    fetchNews(category.query, 0, false);
  };

  // Refresh
  const handleRefresh = () => {
    if (showSaved) return;
    fetchNews(currentQuery, 0, false);
  };

  // Load more
  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchNews(currentQuery, page + 1, true);
    }
  };

  // Bookmark toggle
  const handleToggleSave = (item) => {
    setSavedNews((previous) => {
      const exists = previous.some(
        (saved) => saved.objectID === item.objectID
      );

      if (exists) {
        return previous.filter(
          (saved) => saved.objectID !== item.objectID
        );
      }

      return [item, ...previous];
    });
  };

  // Date format
  const formatDate = (date) => {
    if (!date) return "Recently";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const featured = news[0];

  const displayedNews = showSaved ? savedNews : news;

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">

        <Navbar
          savedCount={savedNews.length}
          showSaved={showSaved}
          setShowSaved={setShowSaved}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <main className="max-w-7xl mx-auto px-5 md:px-10">

          {/* Hero */}
          {!showSaved && (
            <section
              id="home"
              className="mt-8 rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-800 text-white px-6 py-12 md:p-16 relative overflow-hidden"
            >
              <div className="relative z-10 max-w-2xl">

                <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold tracking-widest">
                  <Zap size={15} />
                  YOUR DAILY DOSE OF TECHNOLOGY
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-6">
                  Stay curious.
                  <br />
                  Stay <span className="text-indigo-300">informed.</span>
                </h1>

                <p className="text-slate-300 mt-5 max-w-lg leading-7">
                  Discover the latest stories, ideas and innovations
                  from the world of technology.
                </p>

                <form
                  onSubmit={handleSearch}
                  className="mt-8 bg-white rounded-xl p-2 flex items-center gap-3 max-w-xl"
                >
                  <Search size={20} className="text-slate-400 ml-2 shrink-0" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search technology, AI, startups..."
                    className="flex-1 min-w-0 outline-none text-slate-900 text-sm px-1 py-2"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg text-sm font-semibold disabled:opacity-50"
                  >
                    Search
                  </button>
                </form>
              </div>

              <div className="absolute right-16 top-16 hidden lg:flex w-64 h-64 rounded-full border border-indigo-400/30 bg-indigo-400/10 items-center justify-center">
                <TrendingUp size={100} className="text-indigo-200" strokeWidth={1} />
              </div>
            </section>
          )}

          {/* Content */}
          <section id="news" className="py-14">

            <div className="flex justify-between items-center flex-wrap gap-4">

              <div>
                <p className="text-indigo-600 text-xs font-bold tracking-widest">
                  {showSaved ? "YOUR COLLECTION" : "EXPLORE CONTENT"}
                </p>

                <h2 className="text-3xl font-extrabold mt-2">
                  {showSaved ? "Saved Stories" : "Discover Stories"}
                </h2>
              </div>

              {!showSaved && (
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50"
                >
                  <RefreshCw size={16} />
                  Refresh
                </button>
              )}
            </div>

            {/* Categories */}
            {!showSaved && (
              <div id="categories" className="flex flex-wrap gap-3 mt-8 mb-12">
                {categories.map((category) => (
                  <button
                    key={category.label}
                    onClick={() => handleCategory(category)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                      active === category.label
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                        : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}

            {/* Results Heading */}
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4 mb-7">

              <h3 className="flex items-center gap-3 text-xl font-bold">
                {showSaved ? (
                  <Bookmark className="text-indigo-600" />
                ) : (
                  <TrendingUp className="text-indigo-600" />
                )}

                {showSaved
                  ? "Bookmarked Articles"
                  : active === "Search"
                  ? "Search Results"
                  : `${active} Stories`}
              </h3>

              <span className="text-sm text-slate-500">
                {displayedNews.length} articles
              </span>
            </div>

            {/* Loading */}
            {!showSaved && loading && (
              <div className="py-24 flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="text-slate-500">Fetching latest stories...</p>
              </div>
            )}

            {/* Error */}
            {!showSaved && !loading && error && (
              <div className="bg-red-50 dark:bg-red-950/30 text-red-600 rounded-xl p-8 text-center">
                <p>{error}</p>
                <button
                  onClick={handleRefresh}
                  className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Empty */}
            {(showSaved ? savedNews.length === 0 : !loading && !error && news.length === 0) && (
              <div className="py-20 text-center">
                {showSaved ? (
                  <Bookmark size={40} className="mx-auto text-slate-400" />
                ) : (
                  <Newspaper size={40} className="mx-auto text-slate-400" />
                )}

                <h3 className="text-xl font-bold mt-4">
                  {showSaved ? "No saved stories yet" : "No stories found"}
                </h3>

                <p className="text-slate-500 mt-2">
                  {showSaved
                    ? "Bookmark your favourite articles to see them here."
                    : "Try searching for another topic."}
                </p>

                {showSaved && (
                  <button
                    onClick={() => setShowSaved(false)}
                    className="mt-5 bg-indigo-600 text-white px-5 py-2.5 rounded-lg"
                  >
                    Explore News
                  </button>
                )}
              </div>
            )}

            {/* Featured News */}
            {!showSaved && !loading && !error && featured && (
              <article className="grid md:grid-cols-2 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm mb-8">

                <div className="p-7 md:p-10">
                  <span className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 px-3 py-2 rounded-lg text-xs font-bold">
                    <Zap size={14} />
                    FEATURED STORY
                  </span>

                  <h2 className="text-2xl md:text-3xl font-extrabold leading-snug mt-6">
                    {featured.title || "Untitled story"}
                  </h2>

                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-4 leading-7">
                    Discover this story and explore what the technology community is discussing.
                  </p>

                  <div className="flex flex-wrap gap-5 text-xs text-slate-400 mt-6">
                    <span>By {featured.author || "Unknown"}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {formatDate(featured.created_at)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-7">
                    <a
                      href={featured.url || `https://news.ycombinator.com/item?id=${featured.objectID}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg text-sm font-semibold"
                    >
                      Read Story
                    </a>

                    <button
                      onClick={() => handleToggleSave(featured)}
                      className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800"
                      aria-label="Bookmark featured story"
                    >
                      <Bookmark
                        size={19}
                        fill={savedNews.some(item => item.objectID === featured.objectID) ? "currentColor" : "none"}
                      />
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-950 to-indigo-600 min-h-64 flex flex-col items-center justify-center text-indigo-200">
                  <Newspaper size={100} strokeWidth={1} />
                  <span className="text-xs font-bold tracking-[4px] mt-5">
                    THE DAILY BYTE
                  </span>
                </div>
              </article>
            )}

            {/* News Grid */}
            {(showSaved || (!loading && !error && news.length > 0)) && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(showSaved ? savedNews : news.slice(1)).map((item) => (
                  <NewsCard
                    key={item.objectID}
                    news={item}
                    isSaved={savedNews.some(
                      saved => saved.objectID === item.objectID
                    )}
                    onToggleSave={handleToggleSave}
                  />
                ))}
              </div>
            )}

            {/* Load More */}
            {!showSaved && !loading && !error && news.length > 0 && hasMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2"
                >
                  {loadingMore ? (
                    <>
                      <RefreshCw size={17} className="animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Load More Stories"
                  )}
                </button>
              </div>
            )}

            {!showSaved && !loading && !error && news.length > 0 && !hasMore && (
              <p className="text-center text-slate-400 text-sm mt-10">
                You have reached the end of the stories.
              </p>
            )}
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 px-5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="font-extrabold text-xl">
              Daily<span className="text-indigo-600">Byte</span>
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Built with React, Tailwind CSS & Free API.
            </p>

            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} DailyByte
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
