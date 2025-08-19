

// const Blog = require('../models/blogModel');
// const fs = require('fs');
// const path = require('path');

// // Create a new blog
// const createBlog = async (req, res) => {
//   try {
//     const { title, content, createdBy } = req.body;
//     const coverImageUrl = req.file ? `/uploads/${req.file.filename}` : './uploads/default-cover.jpg';

//     const blog = new Blog({
//       title,
//       content,
//       coverImageUrl,
//       createdBy,
//     });

//     await blog.save();
//     res.status(201).json(blog);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get all blogs
// const getAllBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find()
//       .populate('createdBy', 'name email') // Optional: if you're using User model
//       .sort({ createdAt: -1 });

//     res.status(200).json(blogs);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get a blog by ID
// const getBlogById = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id)
//       .populate('createdBy', 'name email');

//     if (!blog) {
//       return res.status(404).json({ error: 'Blog not found' });
//     }

//     res.status(200).json(blog);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update a blog
// const updateBlog = async (req, res) => {
//   try {
//     const { title, content } = req.body;

//     const blog = await Blog.findById(req.params.id);
//     if (!blog) {
//       return res.status(404).json({ error: 'Blog not found' });
//     }

//     blog.title = title || blog.title;
//     blog.content = content || blog.content;

//     if (req.file) {
//       // Delete old image if it exists and is not the default
//       if (blog.coverImageUrl && blog.coverImageUrl !== './uploads/default-cover.jpg') {
//         const oldImagePath = path.join(__dirname, '..', blog.coverImageUrl);
//         if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
//       }

//       blog.coverImageUrl = `/uploads/${req.file.filename}`;
//     }

//     await blog.save();
//     res.status(200).json(blog);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Delete a blog
// const deleteBlog = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) {
//       return res.status(404).json({ error: 'Blog not found' });
//     }

//     // Delete image file if it exists and not the default image
//     if (blog.coverImageUrl && blog.coverImageUrl !== './uploads/default-cover.jpg') {
//       const imagePath = path.join(__dirname, '..', blog.coverImageUrl);
//       if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
//     }

//     await blog.deleteOne();
//     res.status(200).json({ message: 'Blog deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// module.exports = {
//   createBlog,
//   getAllBlogs,
//   getBlogById,
//   updateBlog,
//   deleteBlog,
// };


const Blog = require("../models/blogModel");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const createBlog = async (req, res) => {
  try {
    const { title, content, createdBy } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const coverImageUrl = req.file ? `/uploads/${req.file.filename}` : '/uploads/default-cover.jpg';

    const blog = new Blog({
      title,
      content,
      coverImageUrl,
      createdBy: req.user?._id || createdBy,   // ✅ safe fallback
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error("❌ Error creating blog:", error);
    res.status(500).json({ error: error.message });
  }
};


// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    // Populate 'createdBy' with name & email
    const blogs = await Blog.find().populate("createdBy", "name email");
    res.status(200).json(blogs);
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    res.status(500).json({ error: error.message });
  }
};



// Get a blog by ID
const getBlogById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid blog ID" });
    }

    const blog = await Blog.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!blog) return res.status(404).json({ error: "Blog not found" });

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all blogs by a userId
const getUserBlogs = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const blogs = await Blog.find({ createdBy: userId })
      .populate("createdBy", "name email");

    res.status(200).json(blogs);
  } catch (error) {
    console.error("getUserBlogs error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update a blog
const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ error: "Blog not found" });

    blog.title = title || blog.title;
    blog.content = content || blog.content;

    if (req.file) {
      if (
        blog.coverImageUrl &&
        blog.coverImageUrl !== "./uploads/default-cover.jpg"
      ) {
        const oldImagePath = path.join(__dirname, "..", blog.coverImageUrl);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      blog.coverImageUrl = `/uploads/${req.file.filename}`;
    }

    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    if (
      blog.coverImageUrl &&
      blog.coverImageUrl !== "./uploads/default-cover.jpg"
    ) {
      const imagePath = path.join(__dirname, "..", blog.coverImageUrl);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  getUserBlogs,
  updateBlog,
  deleteBlog,
};
