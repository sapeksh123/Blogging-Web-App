


const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
      trim: true,
    },
    coverImageUrl: {
      type: String,
      trim: true,
      default: "/uploads/default-cover.jpg", // ✅ absolute path (works with express.static)
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ✅ must match User model name
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;

