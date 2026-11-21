
import {
  TrendingUp,
  MessageCircle,
  ExternalLink,
  Clock,
} from "lucide-react";

function NewsCard({ news }) {
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
    <article className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 transition duration-300">

      {/* Card Header */}
      <div className="flex justify-between items-center">
        <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-3 py-2 rounded-lg">
          TECH NEWS
        </span>

        <span className="text-amber-600 text-xs font-semibold flex items-center gap-1">
          <TrendingUp size={14} />
          {news.points || 0}
        </span>
      </div>

      {/* News Title */}
      <h3 className="font-bold text-lg leading-relaxed text-slate-800 mt-6 mb-5">
        {news.title || "Untitled Story"}
      </h3>

      {/* Author & Date */}
      <div className="flex justify-between gap-2 text-xs text-slate-400 mt-auto mb-5">
        <span>By {news.author || "Unknown"}</span>

        <span className="flex items-center gap-1">
          <Clock size={13} />
          {formattedDate}
        </span>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 pt-5 flex justify-between items-center text-xs">

        <span className="flex items-center gap-2 text-slate-500">
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
