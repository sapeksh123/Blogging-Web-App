const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
  },

  profileImageUrl: {
    type: String,
    default: function () {
      return this.role === "admin"
        ? "/uploads/admin-profile.webp"  // 🔥 Admin ke liye alag
        : "/uploads/Profile.png";        // 🔥 Users ke liye alag
    },
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  }
}, {
  timestamps: true
});

const User = model("User", UserSchema); 

module.exports = User;
