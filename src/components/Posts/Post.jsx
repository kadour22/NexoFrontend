import React from "react";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";

const Post = ({ post, profile_image }) => {
  // Format date
  const formattedDate = new Date(post.created_at).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Safely use profile_image prop passed from Profile
  const authorImage = profile_image
    ? `https://nexobackend-7pil.onrender.com${profile_image}`
    : "https://via.placeholder.com/150";

  return (
    <div className="w-full max-w-2xl mx-auto bg-black text-white border-b border-gray-800 px-4 py-6">
      {/* Author Info */}
      <div className="flex items-center gap-3">
        <img
          src={authorImage}
          alt="Author"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">
              {post.author.first_name} {post.author.last_name}
            </h2>
            <span className="text-gray-400 text-sm">{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Post Text */}
      <div className="mt-3 text-gray-200 text-sm sm:text-base">
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </div>

      {/* Post Image */}
      <div className="mt-3">
        <img
          src={post.image ? `https://nexobackend-7pil.onrender.com${post.image}` : "https://via.placeholder.com/150"}
          alt="Post"
          className="w-full rounded-xl object-cover max-h-[500px]"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-4 text-gray-400 text-sm">
        <button className="flex items-center gap-2 hover:text-red-500 transition">
          {Array.isArray(post.likes) && post.likes.includes(post.author.id) ? (
            <Heart size={18} className="text-red-500" />
          ) : (
            <Heart size={18} />
          )}{" "}
          {post.likes_count}
        </button>
        <button className="flex items-center gap-2 hover:text-sky-500 transition">
          <MessageCircle size={18} /> 348
        </button>
        <button className="flex items-center gap-2 hover:text-green-500 transition">
          <Repeat2 size={18} /> 89
        </button>
      </div>
    </div>
  );
};

export default Post;
