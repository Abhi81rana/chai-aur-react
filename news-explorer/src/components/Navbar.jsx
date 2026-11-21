
import { Newspaper, ExternalLink } from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-20 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <div className="bg-indigo-600 text-white p-2.5 rounded-xl">
            <Newspaper size={24} />
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900">
            Daily<span className="text-indigo-600">Byte</span>
          </h1>
        </a>

        {/* Live Status */}
        <div className="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          LIVE TECH STORIES
        </div>

        {/* External Link */}
        <a
          href="https://news.ycombinator.com/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition"
        >
          Hacker News
          <ExternalLink size={15} />
        </a>

      </div>
    </nav>
  );
}

export default Navbar;
