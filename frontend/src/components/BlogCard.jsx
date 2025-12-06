import React from "react";
import { useNavigate } from "react-router-dom";

function BlogCard({ blog, onDelete }) {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isAuthor = currentUser?.name === blog.username;

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(blog._id);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-2xl hover:shadow-blue-500/30 overflow-hidden transition-all duration-300 border-2 border-gray-800 hover:border-blue-500 transform hover:scale-[1.02]">
      <div className="p-6">
        {/* Title and Badge */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-2xl font-bold text-white flex-1 line-clamp-2 hover:text-blue-400 transition-colors">
            {blog.title}
          </h3>
          {isAuthor && (
            <span className="ml-2 bg-linear-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shrink-0 shadow-lg">
              ✓ You
            </span>
          )}
        </div>

        {/* Content */}
        <p className="text-gray-400 text-base leading-relaxed mb-5 line-clamp-3 hover:text-gray-300 transition-colors">
          {blog.content}
        </p>

        {/* Author Section */}
        <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-800">
          <div className="w-10 h-10 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-base shadow-lg">
            {blog.username?.charAt(0).toUpperCase()}
          </div>
          <span className="text-gray-300 font-semibold text-sm">
            {blog.username}
          </span>
        </div>

        {/* Action Buttons */}
        {isAuthor && (
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/update-blog/${blog._id}`)}
              className="flex-1 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-green-500/50 flex items-center justify-center gap-2"
            >
              <span className="text-lg">✏️</span>
              <span>Edit</span>
            </button>

            <button
              onClick={handleDelete}
              className="flex-1 bg-linear-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-500/50 flex items-center justify-center gap-2"
            >
              <span className="text-lg">🗑️</span>
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </div>
  );
}

export default BlogCard;
