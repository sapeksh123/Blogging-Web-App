// PreDefineAdmin.js
const User = require("../models/authModel");
const bcrypt = require("bcrypt");

const PreDefineAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@bloggify.com" });

    if (existingAdmin) {
      console.log("👑 Admin already exists:", existingAdmin.email);
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const adminUser = new User({
      name: "Admin The Bloggify",
      email: "admin@bloggify.com",
      password: hashedPassword,
      role: "admin",
      profileImage: "/uploads/admin-profile.webp", 
    });

    await adminUser.save();
    console.log("✅ Admin user created successfully 👑");
  } catch (err) {
    console.error("❌ Error creating admin user:", err.message);
  }
};

module.exports = PreDefineAdmin;
