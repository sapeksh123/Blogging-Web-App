import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Add Blogs", path: "/blogs" },
    { name: "Login", path: "/login" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-cyan-400">
          Bloggify
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-cyan-400"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 dark:text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-gray-900">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-cyan-400"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
