import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaBookOpen,
  FaPenFancy,
  FaUsers,
  FaRegSmile,
  FaQuoteLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-16 px-4 md:px-8">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4">
          {user ? `Welcome, ${user.name} 👋` : "Welcome to Bloggify ✨"}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Share your thoughts, read inspiring blogs, and connect with a community
          of writers. Start writing today and let your ideas shine 🌟
        </p>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            to="/add-blog"
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition transform hover:scale-105"
          >
            <FaPlus /> Add New Blog
          </Link>
          <Link
            to="/show-blog"
            className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-purple-700 transition transform hover:scale-105"
          >
            <FaBookOpen /> Show Blogs
          </Link>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {[
          {
            icon: <FaPenFancy />,
            title: "Easy Blogging",
            desc: "Write and publish blogs effortlessly with our simple editor.",
          },
          {
            icon: <FaUsers />,
            title: "Engaged Community",
            desc: "Connect with like-minded readers and writers worldwide.",
          },
          {
            icon: <FaRegSmile />,
            title: "Fun & Interactive",
            desc: "Like, comment, and share blogs to keep conversations flowing.",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition text-center border border-gray-200"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-50 border-2 border-indigo-500 text-indigo-500 text-3xl mb-4 mx-auto">
              {item.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2 text-indigo-700">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* About Section */}
      <motion.div
        className="mt-24 text-center max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">
          About Bloggify
        </h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          Bloggify is a platform built for writers and readers alike. Whether
          you want to express your ideas, discover fresh perspectives, or
          connect with a community of passionate storytellers — Bloggify is your
          creative space to shine.
        </p>
      </motion.div>

      {/* Quote Carousel Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">
          Words That Inspire ✨
        </h2>

        <div className="relative max-w-3xl mx-auto">
          {(() => {
            const quotes = [
              {
                quote: "The art of writing is the art of discovering what you believe.",
                author: "Gustave Flaubert",
              },
              {
                quote: "There is no greater agony than bearing an untold story inside you.",
                author: "Maya Angelou",
              },
              { quote: "You can make anything by writing.", author: "C.S. Lewis" },
              {
                quote: "The scariest moment is always just before you start.",
                author: "Stephen King",
              },
              {
                quote:
                  "Start writing, no matter what. The water does not flow until the faucet is turned on.",
                author: "Louis L’Amour",
              },
              {
                quote: "Fill your paper with the breathings of your heart.",
                author: "William Wordsworth",
              },
            ];

            const [index, setIndex] = React.useState(0);

            React.useEffect(() => {
              const interval = setInterval(() => {
                setIndex((prev) => (prev + 1) % quotes.length);
              }, 4000);
              return () => clearInterval(interval);
            }, []);

            return (
              <motion.div
                key={index}
                className="p-8 bg-white rounded-2xl border border-gray-200 shadow-md text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
              >
                <FaQuoteLeft className="text-indigo-500 text-3xl mb-4 mx-auto" />
                <p className="text-gray-700 italic text-lg mb-4">
                  "{quotes[index].quote}"
                </p>
                <h4 className="font-semibold text-indigo-600">
                  – {quotes[index].author}
                </h4>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {quotes.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`w-3 h-3 rounded-full border ${
                        i === index
                          ? "bg-indigo-600 border-indigo-600"
                          : "bg-white border-gray-400"
                      }`}
                    ></button>
                  ))}
                </div>
              </motion.div>
            );
          })()}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        className="mt-24 text-center bg-indigo-200 text-gray-700 p-12 rounded-2xl shadow-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Share Your Story?</h2>
        <p className="mb-6 text-indigo-800 text-lg">
          Join thousands of writers already inspiring readers across the globe.
        </p>
        <Link
          to="/add-blog"
          className="bg-indigo-500 text-white text-xl px-8 py-3 rounded-xl font-bold hover:bg-gray-100 hover:text-indigo-800  transition transform hover:scale-105"
        >
          Start Writing
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
