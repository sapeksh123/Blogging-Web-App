import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-white py-8 mt-10 border-t border-indigo-600">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo / Brand */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="text-2xl font-bold text-indigo-400">Bloggify</h1>
          <p className="text-sm text-gray-300 mt-1">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link to="/" className="hover:text-indigo-300 transition-colors">
            Home
          </Link>
          <Link to="/add-blog" className="hover:text-indigo-300 transition-colors">
            Add Blog
          </Link>
          <Link to="/show-blog" className="hover:text-indigo-300 transition-colors">
            Show Blog
          </Link>
          <Link to="/profile" className="hover:text-indigo-300 transition-colors">
            Profile
          </Link>
        </div>

        {/* Developed by */}
        <div className="text-sm text-gray-300 text-center md:text-right flex items-center space-x-2">
          <FaLinkedin className="text-indigo-300" />
          <a
            href="https://www.linkedin.com/in/sa-12v"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-200 transition-colors font-medium"
          >
            Developed by Sapeksh
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
