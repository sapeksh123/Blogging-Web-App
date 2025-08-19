import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/blogs";

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get all blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/getAll`);
      setBlogs(res.data);
    } catch (error) {
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  // Delete blog
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      toast.success("Blog deleted!");
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (error) {
      toast.error("Delete failed");
    }
  };

 // Edit blog
const handleEdit = async (id) => {
  const newTitle = prompt("Enter new blog title:");
  if (!newTitle) return;

  const newContent = prompt("Enter new blog content:");
  if (!newContent) return;

  try {
    // Send both title + content together in ONE object
    const res = await axios.put(`${API_URL}/update/${id}`, { 
      title: newTitle, 
      content: newContent 
    });

    toast.success("Blog updated!");

    setBlogs(
      blogs.map((b) =>
        b._id === id ? { ...b, title: res.data.title, content: res.data.content } : b
      )
    );
  } catch (error) {
    toast.error("Update failed");
  }
};


  // On mount fetch blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center">Loading blogs...</p>;

  return (
    <div className="p-6">
         <div className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

      <Link to="/">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          Home
        </button>
      </Link>
    </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Content</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id} className="text-center">
              <td className="p-2 border">{blog.title}</td>
              <td className="p-2 border">{blog.content.slice(0, 50)}...</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleEdit(blog._id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
