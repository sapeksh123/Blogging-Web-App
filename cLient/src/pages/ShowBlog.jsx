import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Show = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/blogs/getAll");
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-indigo-700 text-lg">Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-blue-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-8 text-center">
          All Blogs
        </h1>

        {blogs.length === 0 ? (
          <p className="text-gray-700 text-center">No blogs found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-indigo-50 rounded-xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
              >
                {blog.coverImageUrl && (
                  <img
                    src={`http://localhost:5000${blog.coverImageUrl}`}
                    alt={blog.title}
                    className="w-full h-48 object-contain mt-2"
                  />
                )}
                <div className="p-4 flex flex-col flex-1">
                  <h2 className="text-xl font-semibold text-indigo-700 mb-1">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-indigo-600 mb-2">
                    By: {blog.createdBy?.name || "Unknown"}
                  </p>
                  <p className="text-gray-700 text-sm flex-1">
                    {blog.content.length > 150
                      ? blog.content.slice(0, 150) + "..."
                      : blog.content}
                  </p>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Show;
