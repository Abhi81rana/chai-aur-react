
import { useEffect, useState } from "react";
import {
  Search, Newspaper, TrendingUp, Clock,
  MessageCircle, ExternalLink, RefreshCw, Zap
} from "lucide-react";

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

  const fetchNews = async (query = "") => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams({
        tags: "story",
        hitsPerPage: "30",
      });

      if (query) params.set("query", query);

      const response = await fetch(
        `${API}/search_by_date?${params}`
      );

      if (!response.ok) throw new Error("Failed to fetch news");

      const data = await response.json();
      setNews(data.hits || []);
    } catch (err) {
      setError(err.message);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setActive("Search");
    fetchNews(search.trim());
  };

  const handleCategory = (category) => {
    setActive(category.label);
    setSearch("");
    fetchNews(category.query);
  };

  const articleUrl = (item) =>
    item.url || `https://news.ycombinator.com/item?id=${item.objectID}`;

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Recently";

  const featured = news[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-20 flex justify-between items-center">

          <a href="/" className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white p-2.5 rounded-xl">
              <Newspaper size={24} />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Daily<span className="text-indigo-600">Byte</span>
            </h1>
          </a>

          <div className="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            LIVE TECH STORIES
          </div>

          <a
            href="https://news.ycombinator.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm font-semibold hover:text-indigo-600"
          >
            Hacker News <ExternalLink size={15} />
          </a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Hero */}
        <section className="mt-8 rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-800 text-white px-6 py-12 md:p-16 overflow-hidden relative">

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold tracking-widest">
              <Zap size={15} />
              YOUR DAILY DOSE OF TECHNOLOGY
            </div>

            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mt-6">
              Stay curious.
              <br />
              Stay <span className="text-indigo-300">informed.</span>
            </h2>

            <p className="text-slate-300 mt-5 max-w-lg leading-7">
              Discover the latest stories, ideas and innovations
              from the world of technology.
            </p>

            <form
              onSubmit={handleSearch}
              className="mt-8 bg-white rounded-xl p-2 flex items-center gap-3 max-w-xl"
            >
              <Search className="text-slate-400 ml-2 shrink-0" size={20} />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search technology, AI, startups..."
                className="flex-1 min-w-0 outline-none text-slate-900 text-sm px-1 py-2"
              />

              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg text-sm font-semibold transition">
                Search
              </button>
            </form>
          </div>

          <div className="absolute right-16 top-16 hidden lg:flex w-64 h-64 rounded-full border border-indigo-400/30 bg-indigo-400/10 items-center justify-center">
            <TrendingUp size={100} className="text-indigo-200" strokeWidth={1} />
          </div>
        </section>

        {/* News Section */}
        <section className="py-16">

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
              onClick={() => fetchNews(
                categories.find(c => c.label === active)?.query || ""
              )}
              disabled={loading}
              className="flex items-center gap-2 border border-slate-200 bg-white px-4 py-3 rounded-xl text-sm font-semibold hover:bg-slate-100 disabled:opacity-50"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 mt-8 mb-12">
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

          <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-7">
            <h3 className="flex items-center gap-3 text-xl font-bold">
              <TrendingUp className="text-indigo-600" />
              {active === "Search" ? "Search Results" : `${active} Stories`}
            </h3>
            <span className="text-sm text-slate-500">
              {news.length} articles
            </span>
          </div>

          {/* Loading */}
          {loading && (
            <div className="py-24 flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
              <p className="text-slate-500">Fetching latest stories...</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="bg-red-50 text-red-600 rounded-xl p-8 text-center">
              <p>{error}</p>
              <button
                onClick={() => fetchNews()}
                className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && news.length === 0 && (
            <div className="py-20 text-center">
              <Newspaper size={40} className="mx-auto text-slate-400" />
              <h3 className="text-xl font-bold mt-4">No stories found</h3>
              <p className="text-slate-500 mt-2">Try another search.</p>
            </div>
          )}

          {/* Featured Story */}
          {!loading && !error && featured && (
            <>
              <article className="grid md:grid-cols-2 bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm mb-8">

                <div className="p-7 md:p-10">
                  <span className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-2 rounded-lg text-xs font-bold">
                    <Zap size={14} /> FEATURED STORY
                  </span>

                  <h2 className="text-2xl md:text-3xl font-extrabold leading-snug mt-6">
                    {featured.title}
                  </h2>

                  <p className="text-slate-500 text-sm mt-4 leading-7">
                    Discover this story and explore what the technology
                    community is discussing.
                  </p>

                  <div className="flex flex-wrap gap-5 text-xs text-slate-400 mt-6">
                    <span>By {featured.author || "Unknown"}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {formatDate(featured.created_at)}
                    </span>
                  </div>

                  <a
                    href={articleUrl(featured)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg text-sm font-semibold mt-7"
                  >
                    Read Story <ExternalLink size={15} />
                  </a>
                </div>

                <div className="bg-gradient-to-br from-indigo-950 to-indigo-600 min-h-64 flex flex-col items-center justify-center text-indigo-200">
                  <Newspaper size={100} strokeWidth={1} />
                  <span className="text-xs font-bold tracking-[4px] mt-5">
                    THE DAILY BYTE
                  </span>
                </div>
              </article>

              {/* News Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.slice(1).map((item) => (
                  <article
                    key={item.objectID}
                    className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 transition duration-300"
                  >
                    <div className="flex justify-between items-center">
                      <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-3 py-2 rounded-lg">
                        TECH NEWS
                      </span>

                      <span className="text-amber-600 text-xs font-semibold flex items-center gap-1">
                        <TrendingUp size={14} /> {item.points || 0}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg leading-relaxed mt-6 mb-5">
                      {item.title || "Untitled story"}
                    </h3>

                    <div className="flex justify-between gap-2 text-xs text-slate-400 mt-auto mb-5">
                      <span>{item.author || "Unknown"}</span>
                      <span>{formatDate(item.created_at)}</span>
                    </div>

                    <div className="border-t border-slate-100 pt-5 flex justify-between items-center text-xs">
                      <span className="flex items-center gap-2 text-slate-500">
                        <MessageCircle size={15} />
                        {item.num_comments || 0} comments
                      </span>

                      <a
                        href={articleUrl(item)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-indigo-600 font-bold hover:text-indigo-800"
                      >
                        Read More <ExternalLink size={14} />
                      </a>
                    </div>
                  </article>
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
