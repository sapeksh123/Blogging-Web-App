import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logoo.png";

const Navbar = () => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <nav className="bg-slate-700 shadow-md sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
      <Link to="/" className="flex items-center">
  <img
    src={logo}
    alt="Logo"
    className="h-10 w-auto filter brightness-110 drop-shadow-lg"
  />
</Link>

        {/* Profile/Login */}
        <div className="flex items-center space-x-6">
          {!user ? (
            <Link
              to="/login"
              className="text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-cyan-400"
            >
              Login
            </Link>
          ) : (
            <Link to="/profile">
              <img
                src={`http://localhost:5000${user.profileImageUrl}`}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover hover:ring-2 ring-indigo-400"
              />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
