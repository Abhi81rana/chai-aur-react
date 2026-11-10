
import { useEffect, useState } from "react";
import {
  MessageCircle,
  Send,
  MessageSquare,
} from "lucide-react";

import CommentItem from "./components/CommentItem";

const currentUser = {
  name: "IT Ash",
  avatar: "https://i.pravatar.cc/150?img=12",
};

const initialComments = [
  {
    id: 1,
    author: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?img=47",
    text: "Great work! 🚀",
    time: "2h ago",
    createdAt: Date.now() - 7200000,
    isAuthor: false,
    likes: 2,
    liked: false,
    replies: [
      {
        id: 2,
        author: "IT Ash",
        avatar: currentUser.avatar,
        text: "Thanks! 😊",
        time: "1h ago",
        createdAt: Date.now() - 3600000,
        isAuthor: true,
        likes: 1,
        liked: false,
        replies: [
          {
            id: 3,
            author: "Rahul Mehta",
            avatar: "https://i.pravatar.cc/150?img=11",
            text: "Keep going! 💪",
            time: "30m ago",
            createdAt: Date.now() - 1800000,
            isAuthor: false,
            likes: 3,
            liked: false,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    author: "Neha Kapoor",
    avatar: "https://i.pravatar.cc/150?img=44",
    text: "Amazing feature! 👏",
    time: "3h ago",
    createdAt: Date.now() - 10800000,
    isAuthor: false,
    likes: 4,
    liked: false,
    replies: [
      {
        id: 5,
        author: "IT Ash",
        avatar: currentUser.avatar,
        text: "Thank you! 🙏",
        time: "2h ago",
        createdAt: Date.now() - 7000000,
        isAuthor: true,
        likes: 0,
        liked: false,
        replies: [],
      },
    ],
  },
];

// Count all comments including nested replies
function countComments(comments) {
  return comments.reduce(
    (total, comment) =>
      total + 1 + countComments(comment.replies || []),
    0
  );
}

// Add a reply at any nesting level
function addReply(comments, parentId, reply) {
  return comments.map((comment) => {
    if (comment.id === parentId) {
      return {
        ...comment,
        replies: [...(comment.replies || []), reply],
      };
    }

    return {
      ...comment,
      replies: addReply(
        comment.replies || [],
        parentId,
        reply
      ),
    };
  });
}

// Like or unlike at any nesting level
function updateLike(comments, id) {
  return comments.map((comment) => {
    if (comment.id === id) {
      const liked = !comment.liked;

      return {
        ...comment,
        liked,
        likes: comment.likes + (liked ? 1 : -1),
      };
    }

    return {
      ...comment,
      replies: updateLike(comment.replies || [], id),
    };
  });
}

// Delete at any nesting level
function deleteComment(comments, id) {
  return comments
    .filter((comment) => comment.id !== id)
    .map((comment) => ({
      ...comment,
      replies: deleteComment(comment.replies || [], id),
    }));
}

function App() {
  const [comments, setComments] = useState(() => {
    try {
      const saved = localStorage.getItem("nested-comments");
      return saved ? JSON.parse(saved) : initialComments;
    } catch {
      return initialComments;
    }
  });

  const [newComment, setNewComment] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // Save comments
  useEffect(() => {
    localStorage.setItem(
      "nested-comments",
      JSON.stringify(comments)
    );
  }, [comments]);

  // Add new comment
  const handlePost = (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: currentUser.name,
      avatar: currentUser.avatar,
      text: newComment.trim(),
      time: "Just now",
      createdAt: Date.now(),
      isAuthor: true,
      likes: 0,
      liked: false,
      replies: [],
    };

    setComments((prev) => [comment, ...prev]);
    setNewComment("");
  };

  // Add reply
  const handleReply = (parentId, text) => {
    const reply = {
      id: Date.now() + Math.random(),
      author: currentUser.name,
      avatar: currentUser.avatar,
      text,
      time: "Just now",
      createdAt: Date.now(),
      isAuthor: true,
      likes: 0,
      liked: false,
      replies: [],
    };

    setComments((prev) =>
      addReply(prev, parentId, reply)
    );
  };

  // Like
  const handleLike = (id) => {
    setComments((prev) => updateLike(prev, id));
  };

  // Delete
  const handleDelete = (id) => {
    setComments((prev) => deleteComment(prev, id));
  };

  // Sort comments
  const sortedComments = [...comments].sort((a, b) =>
    sortOrder === "newest"
      ? b.createdAt - a.createdAt
      : a.createdAt - b.createdAt
  );

  return (
    <div className="min-h-screen bg-[#f3f6fc] px-3 py-4 sm:px-5 sm:py-6">

      <main className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">

        {/* Header */}
        <header className="bg-gradient-to-r from-[#0755a4] to-[#1264ad] text-white px-4 py-4 sm:px-7 sm:py-5 flex items-center gap-4">

          <div className="bg-white text-blue-700 rounded-full p-2.5 shrink-0">
            <MessageSquare size={27} />
          </div>

          <div>
            <h1 className="text-lg sm:text-2xl font-bold">
              Task 2: Nested Comments & Replies
            </h1>

            <p className="text-blue-100 text-xs sm:text-base mt-1">
              Add comments, reply to comments and replies (multiple levels).
            </p>
          </div>

        </header>

        {/* Comments Section */}
        <section className="p-4 sm:p-7">

          {/* Title and Sort */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">

            <h2 className="flex items-center gap-3 text-lg sm:text-2xl font-bold text-gray-900">
              <MessageCircle className="text-blue-700" size={27} />
              Comments ({countComments(comments)})
            </h2>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

          </div>

          {/* Add Comment */}
          <form
            onSubmit={handlePost}
            className="flex gap-3 items-start mb-8"
          >

            <img
              src={currentUser.avatar}
              alt="Your profile"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shrink-0"
            />

            <div className="flex-1 min-w-0 border border-gray-300 rounded-xl overflow-hidden focus-within:border-blue-500">

              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                rows="2"
                className="w-full resize-none px-4 py-3 outline-none text-sm sm:text-base"
              />

              <div className="flex justify-end p-2 bg-gray-50">

                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 disabled:opacity-40 transition"
                >
                  Post
                  <Send size={15} />
                </button>

              </div>

            </div>

          </form>

          {/* Comments List */}
          <div className="space-y-6">

            {sortedComments.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <MessageCircle size={38} className="mx-auto mb-3 text-gray-300" />
                No comments yet. Be the first to comment!
              </div>
            ) : (
              sortedComments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onReply={handleReply}
                  onLike={handleLike}
                  onDelete={handleDelete}
                />
              ))
            )}

          </div>

        </section>

      </main>

      <footer className="text-center text-xs text-gray-400 py-5">
        Nested Comments & Replies · Built with React & Tailwind CSS
      </footer>

    </div>
  );
}

export default App;
