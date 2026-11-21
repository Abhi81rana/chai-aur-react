
import {
  TrendingUp,
  MessageCircle,
  ExternalLink,
  Clock,
  Bookmark,
} from "lucide-react";

function NewsCard({ news, isSaved, onToggleSave }) {
  const articleUrl =
    news.url ||
    `https://news.ycombinator.com/item?id=${news.objectID}`;

  const formattedDate = news.created_at
    ? new Date(news.created_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Recently";

  return (
    <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col hover:-translate-y-1 hover:shadow-xl transition duration-300">

      <div className="flex justify-between items-center">
        <span className="bg-indigo-50 dark:bg-indigo-950 text-indigo-600 px-3 py-2 rounded-lg text-[10px] font-bold">
          TECH NEWS
        </span>

        <div className="flex items-center gap-3">
          <span className="text-amber-600 text-xs font-semibold flex items-center gap-1">
            <TrendingUp size={14} />
            {news.points || 0}
          </span>

          <button
            onClick={() => onToggleSave(news)}
            className={`p-2 rounded-lg transition ${
              isSaved
                ? "bg-indigo-100 dark:bg-indigo-950 text-indigo-600"
                : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600"
            }`}
            aria-label={isSaved ? "Remove bookmark" : "Save article"}
            title={isSaved ? "Remove bookmark" : "Save article"}
          >
            <Bookmark size={17} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <h3 className="font-bold text-lg leading-relaxed text-slate-800 dark:text-white mt-6 mb-5">
        {news.title || "Untitled Story"}
      </h3>

      <div className="flex justify-between gap-2 text-xs text-slate-400 mt-auto mb-5">
        <span>By {news.author || "Unknown"}</span>

        <span className="flex items-center gap-1">
          <Clock size={13} />
          {formattedDate}
        </span>
      </div>

      <div className="border-t border-slate-100 dark:border-slate-800 pt-5 flex justify-between items-center text-xs">

        <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <MessageCircle size={15} />
          {news.num_comments || 0} comments
        </span>

        <a
          href={articleUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-indigo-600 font-bold hover:text-indigo-800"
        >
          Read More
          <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
}

export default NewsCard;
