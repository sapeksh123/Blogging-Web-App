const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);

module.exports = router;
