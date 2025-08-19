// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const db = require("./src/config/db");
// const PreDefineAdmin = require("./src/utils/PreDefineAdmin");
// const authRoutes = require("./src/routes/authRoute");
// const blogRoutes  = require("./src/routes/blogRoutes")

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect DB and create admin
// db();
// PreDefineAdmin();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Serve uploaded files (profile images)
// app.use("/uploads", express.static("uploads"));


// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/blogs", blogRoutes);

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running at http://localhost:${PORT}`);
// });


const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const db = require("./src/config/db");
const PreDefineAdmin = require("./src/utils/PreDefineAdmin");

const authRoutes = require("./src/routes/authRoute");
const blogRoutes = require("./src/routes/blogRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB and create default admin
db();
PreDefineAdmin();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // useful for form-data

// Static folder for uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// 404 handler (if no route matches)
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
