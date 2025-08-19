import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPenFancy, FaImage, FaFileAlt, FaPaperPlane } from "react-icons/fa";

const AddBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!title || !content) {
    toast.error("Please fill in all fields!", { autoClose: 2000 });
    return;
  }
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (coverImage) formData.append("coverImage", coverImage);

    // Dynamically get logged-in user
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && (user.id || user._id)) {
      formData.append("createdBy", user.id || user._id);
    } else {
      toast.error("User not logged in", { autoClose: 2000 });
      return;
    }

    const res = await fetch("http://localhost:5000/api/blogs/create", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Failed to create blog");

    toast.success("Blog created successfully!", {
      autoClose: 2000,
      onClose: () => navigate("/"),
    });
  } catch (err) {
    console.error("Create failed:", err);
    toast.error("Failed to create blog", { autoClose: 2000 });
  }
};


  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-2xl border-t-4 border-b-4 border-indigo-500">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3 text-indigo-700">
          <FaPenFancy className="text-purple-500" /> Create a New Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="relative">
            <FaFileAlt className="absolute top-4 left-4 text-indigo-500" />
            <input
              placeholder="Title"
              className="w-full border border-indigo-300 pl-12 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-indigo-600 text-indigo-900"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content */}
          <div className="relative">
            <FaFileAlt className="absolute top-4 left-4 text-indigo-500" />
            <textarea
              placeholder="Content"
              rows={6}
              className="w-full border border-indigo-300 pl-12 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-indigo-600 text-indigo-900"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* Cover Image */}
          <label className="flex items-center gap-3 cursor-pointer border border-dashed border-purple-300 p-4 rounded-xl hover:bg-purple-50 transition bg-white">
            <FaImage className="text-purple-500 text-xl" />
            <span className="text-indigo-700">{coverImage ? coverImage.name : "Upload Cover Image"}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-600 hover:from-purple-600 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl"
          >
            <FaPaperPlane /> Post Blog
          </button>
        </form>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default AddBlog;
