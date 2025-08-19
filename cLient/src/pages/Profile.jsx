import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaUser, FaUserShield, FaSignOutAlt, FaBlog } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editBlogId, setEditBlogId] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", coverImageUrl: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (!localUser) {
      toast.warn("Please login to view your profile", { autoClose: 2000 });
      navigate("/login");
      return;
    }
    try {
      const parsedUser = JSON.parse(localUser);
      if (parsedUser && (parsedUser.id || parsedUser._id)) {
        const userId = parsedUser.id || parsedUser._id;
        setUser(parsedUser);
        fetchUserBlogs(userId);
      } else {
        toast.error("Invalid user data", { autoClose: 2000 });
        navigate("/login");
      }
    } catch (err) {
      toast.error("Corrupted user data", { autoClose: 2000 });
      localStorage.removeItem("user");
      navigate("/login");
    }
    setLoading(false);
  }, [navigate]);

  const fetchUserBlogs = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/user/${userId}`);
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load blogs", { autoClose: 2000 });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully", {
      autoClose: 1500,
      onClose: () => navigate("/login"),
    });
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await fetch(`http://localhost:5000/api/blogs/delete/${id}`, { method: "DELETE" });
      setBlogs(blogs.filter((blog) => blog._id !== id));
      toast.success("Blog deleted successfully", { autoClose: 1500 });
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete blog", { autoClose: 2000 });
    }
  };

  const startEdit = (blog) => {
    setEditBlogId(blog._id);
    setForm({
      title: blog.title,
      content: blog.content,
      coverImageUrl: blog.coverImageUrl,
    });
  };

  const updateBlog = async () => {
    try {
      await fetch(`http://localhost:5000/api/blogs/update/${editBlogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setEditBlogId(null);
      fetchUserBlogs(user.id || user._id);
      toast.success("Blog updated successfully", { autoClose: 1500 });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update blog", { autoClose: 2000 });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-gray-600 text-lg">Loading profile...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen  flex justify-center py-10 px-4">
      <ToastContainer position="top-center" />
      <div className="max-w-6xl w-full">
        {/* Profile Header */}
        <div className="relative bg-indigo-100 p-6 rounded-xl text-indigo-800 shadow-lg mb-10">
          {/* Logout Button Top-Right */}
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 bg-red-500 text-white hover:bg-red-600 px-3 py-2 md:px-4 md:py-2 rounded-full font-semibold flex items-center gap-2 transition transform hover:scale-105"
          >
            <FaSignOutAlt />
            <span className="hidden md:inline">Logout</span>
          </button>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
            <img
              src={`http://localhost:5000${user.profileImageUrl}`}
              onError={(e) => { e.target.onerror = null; e.target.src = "/default-avatar.png"; }}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
              <p className="flex items-center justify-center md:justify-start gap-2 text-lg"><FaEnvelope /> {user.email}</p>
              <p className="flex items-center justify-center md:justify-start gap-2 mt-1"><FaUserShield /> Role: {user.role}</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex justify-center mb-10">
          <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl shadow text-center hover:shadow-lg transition w-full max-w-xs">
            <p className="text-gray-600 text-xl font-medium">Total Blogs</p>
            <h3 className="text-3xl font-bold text-indigo-700 flex items-center justify-center gap-2 mt-2">
              <FaBlog /> {blogs.length}
            </h3>
          </div>
        </div>

        {/* User Blogs */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">📝 Your Blogs</h2>

          {blogs.length === 0 ? (
            <p className="text-gray-600">You haven't written any blogs yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {blogs.map((blog) => (
                <div key={blog._id} className="p-4 border rounded-xl shadow-md bg-indigo-50 border-indigo-200 transition hover:shadow-xl">
                  {editBlogId === blog._id ? (
                    <>
                      <input
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full border p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Title"
                      />
                      <textarea
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        className="w-full border p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Content"
                        rows={4}
                      />
                      <input
                        value={form.coverImageUrl}
                        onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })}
                        className="w-full border p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Cover Image URL"
                      />
                      <div className="flex gap-2 mt-2">
                        <button onClick={updateBlog} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">Save</button>
                        <button onClick={() => setEditBlogId(null)} className="border px-4 py-2 rounded hover:bg-gray-100 transition">Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      {blog.coverImageUrl && (
                        <img
                          src={`http://localhost:5000${blog.coverImageUrl}`}
                          alt="cover"
                          className="w-full h-48 object-cover rounded mb-3"
                        />
                      )}
                      <h3 className="text-xl font-semibold text-indigo-700">{blog.title}</h3>
                      <p className="text-gray-700 mt-2">
                        {blog.content.length > 150 ? blog.content.slice(0, 150) + "..." : blog.content}
                      </p>
                      <div className="flex gap-3 mt-3">
                        <button
                          onClick={() => startEdit(blog)}
                          className="bg-indigo-400 text-white px-3 py-1 rounded hover:bg-indigo-500 transition flex items-center gap-1"
                        >
                          <FaUser /> Edit
                        </button>
                        <button
                          onClick={() => deleteBlog(blog._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition flex items-center gap-1"
                        >
                          <FaSignOutAlt /> Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
