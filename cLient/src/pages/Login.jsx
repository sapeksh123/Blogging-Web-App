import React, { useState , useRef } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";

const LoginSignup = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", profileImage: null });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    if (isLogin) {
      // Login API call
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login Successful!");

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      // Signup API call
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      if (formData.profileImage)
        formDataToSend.append("profileImage", formData.profileImage);

      await axios.post("http://localhost:5000/api/auth/register", formDataToSend);

      toast.success("Signup Successful! Please login.");

      // Reset form
      setIsLogin(true);
      setFormData({ name: "", email: "", password: "", profileImage: null });

      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  } catch (err) {
    console.error(err);

    // Backend error handling
    if (err.response) {
      if (err.response.status === 404) {
        toast.error("User not found!");
      } else if (err.response.status === 401) {
        toast.error("Invalid credentials!");
      } else if (err.response.status === 409) {
        toast.error("User already exists!");
      } else {
        toast.error(err.response.data.message || "Something went wrong!");
      }
    } else {
      toast.error("Server not responding. Try again later.");
    }
  } finally {
    setLoading(false);
  }
};



  return (


<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-white p-4">
  <div className="relative w-full max-w-md perspective-1000">
    {/* Book Flip Container */}
    <motion.div
      className="relative w-full h-[690px] rounded-3xl"
      animate={{ 
        rotateY: isLogin ? 0 : 180,
        boxShadow: isLogin 
          ? "0 30px 50px -15px rgba(99, 102, 241, 0.4)" 
          : "0 30px 50px -15px rgba(99, 102, 241, 0.6)"
      }}
      transition={{ 
        duration: 1, 
        ease: [0.16, 1, 0.3, 1],
        boxShadow: { duration: 0.8 }
      }}
      style={{ 
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glow effect container */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <motion.div 
          className="absolute inset-0 bg-indigo-400 opacity-10 blur-xl"
          animate={{
            x: isLogin ? -20 : 20,
            opacity: [0, 0.1, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Login Form */}
      <motion.div
        className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-100 to-indigo-50"
        style={{ 
          backfaceVisibility: "hidden",
          borderRadius: "1.5rem",
          boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.5)"
        }}
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: isLogin ? 1 : 0.7,
          filter: isLogin ? "blur(0px)" : "blur(2px)"
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
       <div className="text-center mb-2">
  <FaUserCircle className="mx-auto text-indigo-500 text-6xl mb-4 drop-shadow-md " />
  
<h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-3 drop-shadow-lg">
    Welcome to Bloggify
  </h1>

  <p className="text-indigo-400 text-lg mb-1 font-semibold">
    Your personal space to write, read, and share ideas.
  </p>
  <p className="text-indigo-400 italic text-lg font-semibold">
    Join our community and start your blogging journey today!
  </p>
</div>
        </motion.div>
        
        <form className="w-full" onSubmit={handleSubmit}>
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mb-4 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm hover:shadow-indigo-100 transition-all duration-200"
              required
            />
          </motion.div>
          
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mb-6 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm hover:shadow-indigo-100 transition-all duration-200"
              required
            />
          </motion.div>
          
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-indigo-300/50 active:scale-95 active:shadow-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Login
                </>
              )}
            </button>
          </motion.div>
        </form>
        
        <motion.p 
          className="mt-6 text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Don't have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer font-semibold hover:text-indigo-800 transition-colors duration-200"
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </span>
        </motion.p>
      </motion.div>

      {/* Signup Form */}
      <motion.div
        className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-100 to-indigo-50"
        style={{ 
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          borderRadius: "1.5rem",
          boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.5)"
        }}
        initial={{ opacity: 0.7 }}
        animate={{ 
          opacity: isLogin ? 0.7 : 1,
          filter: isLogin ? "blur(2px)" : "blur(0px)"
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="text-center ">
  <FaUserPlus className="mx-auto text-indigo-500 text-6xl mb-4 drop-shadow-lg " />
  
  <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-3 drop-shadow-lg">
    Start Your Blogging Journey
  </h1>

  <p className="text-indigo-400 italic text-lg font-semibold mb-1">
    Create your account and become part of our blogging community.
  </p>

</div>
        </motion.div>
        
        <form className="w-full" onSubmit={handleSubmit}>
          <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 mb-4 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm hover:shadow-indigo-100 transition-all duration-200"
              required
            />
          </motion.div>
          
          <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mb-4 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm hover:shadow-indigo-100 transition-all duration-200"
              required
            />
          </motion.div>
          
          <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mb-4 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm hover:shadow-indigo-100 transition-all duration-200"
              required
            />
          </motion.div>
          
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-6"
          >
            <div className="relative">
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleChange}
                className="w-full p-3 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm hover:shadow-indigo-100 transition-all duration-200 opacity-0 absolute z-10 cursor-pointer"
                
              />
              <div className="w-full p-3 border-2 border-indigo-200 rounded-xl bg-white text-gray-500 flex items-center justify-between">
                <span>{formData.profileImage?.name || "Choose profile image..."}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-indigo-300/50 active:scale-95 active:shadow-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                  </svg>
                  Sign Up
                </>
              )}
            </button>
          </motion.div>
        </form>
        
        <motion.p 
          className="mt-6 text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Already have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer font-semibold hover:text-indigo-800 transition-colors duration-200"
            onClick={() => setIsLogin(true)}
          >
            Login
          </span>
        </motion.p>
      </motion.div>
    </motion.div>
  </div>
</div>
  );
};

export default LoginSignup;
