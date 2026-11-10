
import { useState } from "react";
import {
  Heart,
  MessageCircle,
  MoreVertical,
  Send,
  Trash2,
  CornerDownRight,
} from "lucide-react";

function CommentItem({
  comment,
  onReply,
  onLike,
  onDelete,
  depth = 0,
}) {
  const [replyText, setReplyText] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleReply = (e) => {
    e.preventDefault();

    if (!replyText.trim()) return;

    onReply(comment.id, replyText.trim());
    setReplyText("");
    setShowReply(false);
  };

  return (
    <div className="relative">

      <div className="flex gap-3 items-start">

        {/* Avatar */}
        <img
          src={comment.avatar}
          alt={comment.author}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shrink-0"
        />

        {/* Comment Content */}
        <div className="flex-1 min-w-0">

          <div className="flex items-start justify-between gap-2">

            <div className="bg-[#f0f3fa] rounded-2xl px-4 py-3 min-w-0 max-w-full">

              <div className="flex flex-wrap items-center gap-2 mb-1">

                <span className="font-bold text-sm text-gray-900">
                  {comment.author}
                </span>

                {comment.isAuthor && (
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                    Author
                  </span>
                )}

                <span className="text-xs text-gray-500">
                  {comment.time}
                </span>

              </div>

              <p className="text-sm sm:text-base text-gray-900 break-words whitespace-pre-wrap">
                {comment.text}
              </p>

            </div>

            {/* More Menu */}
            <div className="relative shrink-0">

              <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
                aria-label="Comment options"
              >
                <MoreVertical size={19} />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-8 z-20 bg-white border rounded-lg shadow-lg py-1 w-32">

                  <button
                    type="button"
                    onClick={() => {
                      onDelete(comment.id);
                      setShowMenu(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>

                </div>
              )}

            </div>

          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-2 ml-2">

            <button
              type="button"
              onClick={() => onLike(comment.id)}
              className={`flex items-center gap-1 text-xs font-semibold ${
                comment.liked
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <Heart
                size={15}
                fill={comment.liked ? "currentColor" : "none"}
              />
              {comment.likes > 0 ? `Like (${comment.likes})` : "Like"}
            </button>

            <span className="text-gray-300">·</span>

            <button
              type="button"
              onClick={() => setShowReply(!showReply)}
              className="flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-blue-600"
            >
              <MessageCircle size={15} />
              Reply
            </button>

          </div>

          {/* Reply Input */}
          {showReply && (
            <form
              onSubmit={handleReply}
              className="flex gap-2 mt-3"
            >

              <input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Reply to ${comment.author}...`}
                className="flex-1 min-w-0 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-blue-500"
                autoFocus
              />

              <button
                type="submit"
                disabled={!replyText.trim()}
                className="bg-blue-600 text-white p-2 rounded-full disabled:opacity-40"
              >
                <Send size={16} />
              </button>

            </form>
          )}

        </div>

      </div>

      {/* Nested Replies */}
      {comment.replies?.length > 0 && (
        <div className="ml-5 sm:ml-7 pl-4 sm:pl-5 mt-3 border-l-2 border-gray-200 space-y-4">

          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onLike={onLike}
              onDelete={onDelete}
              depth={depth + 1}
            />
          ))}

        </div>
      )}

    </div>
  );
}

export default CommentItem;
