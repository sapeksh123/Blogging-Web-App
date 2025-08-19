const User = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for existing user
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    let profileImageUrl;

    if (req.file) {
      profileImageUrl = `/uploads/${req.file.filename}`;
    } else {

      profileImageUrl = req.body.role === "admin"
        ? null
        : "/uploads/Profile.png";
    }
    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // Create JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send user data and token
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImageUrl: user.profileImageUrl,
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
