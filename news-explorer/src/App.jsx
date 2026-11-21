
import { useEffect, useState } from "react";
import {
  Search,
  TrendingUp,
  Clock,
  Newspaper,
  RefreshCw,
  Zap,
} from "lucide-react";

import Navbar from "./components/Navbar";
import NewsCard from "./components/NewsCard";

const API = "https://hn.algolia.com/api/v1";

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
  const [error, setError] = useState("");

  // Fetch News API
  const fetchNews = async (query = "") => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams({
        tags: "story",
        hitsPerPage: "30",
      });

      if (query) {
        params.set("query", query);
      }

      const response = await fetch(
        `${API}/search_by_date?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const data = await response.json();
      setNews(data.hits || []);

    } catch (err) {
      setError(err.message);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  // Load Latest News
  useEffect(() => {
    fetchNews();
  }, []);

  // Search News
  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    setActive("Search");
    fetchNews(query);
  };

  // Category Filter
  const handleCategory = (category) => {
    setActive(category.label);
    setSearch("");
    fetchNews(category.query);
  };

  // Format Date
  const formatDate = (date) => {
    if (!date) return "Recently";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Refresh News
  const handleRefresh = () => {
    if (active === "Search") {
      fetchNews(search.trim());
    } else {
      const selectedCategory = categories.find(
        (category) => category.label === active
      );

      fetchNews(selectedCategory?.query || "");
    }
  };

  const featured = news[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Navbar */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Hero Section */}
        <section
          id="home"
          className="mt-8 rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-800 text-white px-6 py-12 md:p-16 overflow-hidden relative"
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

            {/* Search Form */}
            <form
              onSubmit={handleSearch}
              className="mt-8 bg-white rounded-xl p-2 flex items-center gap-3 max-w-xl"
            >
              <Search
                className="text-slate-400 ml-2 shrink-0"
                size={20}
              />

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
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg text-sm font-semibold transition disabled:opacity-50"
              >
                Search
              </button>
            </form>
          </div>

          {/* Hero Decoration */}
          <div className="absolute right-16 top-16 hidden lg:flex w-64 h-64 rounded-full border border-indigo-400/30 bg-indigo-400/10 items-center justify-center">
            <TrendingUp
              size={100}
              className="text-indigo-200"
              strokeWidth={1}
            />
          </div>
        </section>

        {/* News Section */}
        <section id="news" className="py-16">

          {/* Section Heading */}
          <div className="flex justify-between items-center flex-wrap gap-4">

            <div>
              <p className="text-indigo-600 text-xs font-bold tracking-widest">
                EXPLORE CONTENT
              </p>

              <h2 className="text-3xl font-extrabold mt-2">
                Discover stories
              </h2>
            </div>

            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-2 border border-slate-200 bg-white px-4 py-3 rounded-xl text-sm font-semibold hover:bg-slate-100 disabled:opacity-50"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          {/* Categories */}
          <div
            id="categories"
            className="flex flex-wrap gap-3 mt-8 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.label}
                onClick={() => handleCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                  active === category.label
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-indigo-500 hover:text-indigo-600"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Results Heading */}
          <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-7">

            <h3 className="flex items-center gap-3 text-xl font-bold">
              <TrendingUp className="text-indigo-600" />

              {active === "Search"
                ? "Search Results"
                : `${active} Stories`}
            </h3>

            <span className="text-sm text-slate-500">
              {news.length} articles
            </span>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="py-24 flex flex-col items-center gap-4">

              <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>

              <p className="text-slate-500">
                Fetching latest stories...
              </p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="bg-red-50 text-red-600 rounded-xl p-8 text-center">

              <p>{error}</p>

              <button
                onClick={handleRefresh}
                className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && news.length === 0 && (
            <div className="py-20 text-center">

              <Newspaper
                size={40}
                className="mx-auto text-slate-400"
              />

              <h3 className="text-xl font-bold mt-4">
                No stories found
              </h3>

              <p className="text-slate-500 mt-2">
                Try another search.
              </p>
            </div>
          )}

          {/* Featured Story */}
          {!loading && !error && featured && (
            <>
              <article className="grid md:grid-cols-2 bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm mb-8">

                <div className="p-7 md:p-10">

                  <span className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-2 rounded-lg text-xs font-bold">
                    <Zap size={14} />
                    FEATURED STORY
                  </span>

                  <h2 className="text-2xl md:text-3xl font-extrabold leading-snug mt-6">
                    {featured.title || "Untitled story"}
                  </h2>

                  <p className="text-slate-500 text-sm mt-4 leading-7">
                    Discover this story and explore what the technology
                    community is discussing.
                  </p>

                  <div className="flex flex-wrap gap-5 text-xs text-slate-400 mt-6">

                    <span>
                      By {featured.author || "Unknown"}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {formatDate(featured.created_at)}
                    </span>
                  </div>

                  <a
                    href={
                      featured.url ||
                      `https://news.ycombinator.com/item?id=${featured.objectID}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg text-sm font-semibold mt-7"
                  >
                    Read Story
                  </a>
                </div>

                <div className="bg-gradient-to-br from-indigo-950 to-indigo-600 min-h-64 flex flex-col items-center justify-center text-indigo-200">

                  <Newspaper size={100} strokeWidth={1} />

                  <span className="text-xs font-bold tracking-[4px] mt-5">
                    THE DAILY BYTE
                  </span>
                </div>
              </article>

              {/* Reusable News Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {news.slice(1).map((item) => (
                  <NewsCard
                    key={item.objectID}
                    news={item}
                  />
                ))}

              </div>
            </>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-5">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

          <h2 className="font-extrabold text-xl">
            Daily<span className="text-indigo-600">Byte</span>
          </h2>

          <p className="text-sm text-slate-500">
            Built with React, Tailwind CSS & Free API.
          </p>

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} DailyByte
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;
