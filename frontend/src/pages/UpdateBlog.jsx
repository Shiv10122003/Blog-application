import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogById, updateBlog } from "../api/api.jsx";
import { toast, Toaster } from "react-hot-toast";
import { useState } from "react";

function UpdateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(()=> {
    fetchBlog();
  },[id]);
  const onCancel = () => {
    navigate("/home");
  };
 const fetchBlog = async() =>{
  try{
    const response= await getBlogById(id);
    const blog = response.data.data;
    setTitle(blog.title);
    setContent(blog.content);
  }
  catch(error){
  setError(error.message);
  }
 }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and Content are required");
      return;
    }
    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("User is not authenticated");
        navigate("/login");
        return;
      }
      await updateBlog(id, { title, content }, token);
      toast.success("Blog updated successfully! 🎉", {
        duration: 3000,
        position: "top-center",
      });
      navigate('/home');
    } catch (error) {
      console.error("Update error:", error);
      setError("Failed to update blog. Please try again.");
      toast.error("Failed to update blog");
    } finally {
      
      setSubmitting(false);
    }
  };

  return (
    
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-2xl w-full p-8 rounded-xl shadow-2xl bg-gray-900 border border-gray-800">
    
        <h2 className="text-4xl font-bold mb-8 text-center text-white">
          Update Blog
        </h2>

        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

      
        <form onSubmit={handleSubmit}>
        
          <div className="mb-6">
            <label
              className="block text-gray-300 font-bold mb-3 text-lg"
              htmlFor="title"
            >
              📝 Title
            </label>
            <input
              className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title..."
              disabled={submitting}
            />
          </div>

          
          <div className="mb-6">
            <label
              className="block text-gray-300 font-bold mb-3 text-lg"
              htmlFor="content"
            >
              📄 Content
            </label>
            <textarea
              className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your content..."
              rows={10}
              disabled={submitting}
            />
          </div>

          
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            >
              {submitting ? "Updating..." : "✅ Update Blog"}
            </button>

            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-red-500/50 disabled:opacity-50 transform hover:scale-105 active:scale-95"
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default UpdateBlog;
