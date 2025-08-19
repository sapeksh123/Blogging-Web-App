// const express = require('express');
// const upload = require('../middlewares/uploadMiddleware'); // multer file from above
// const {
//   createBlog,
//   getAllBlogs,
//   getBlogById,
//   updateBlog,
//   deleteBlog,
// } = require('../controllers/blogController');

// const router = express.Router();

// router.post('/create', upload.single('coverImage'), createBlog);
// router.get('/getAll', getAllBlogs);
// router.get('/get/:id', getBlogById);
// router.put('/update/:id', upload.single('coverImage'), updateBlog);
// router.delete('/delete/:id', deleteBlog);

// module.exports = router;


const express = require("express");
const upload = require("../middlewares/uploadMiddleware");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  getUserBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();

router.post("/create", upload.single("coverImage"), createBlog);
router.get("/getAll", getAllBlogs);
router.get("/get/:id", getBlogById);         // single blog by blogId
router.get("/user/:userId", getUserBlogs);   // all blogs by userId
router.put("/update/:id", upload.single("coverImage"), updateBlog);
router.delete("/delete/:id", deleteBlog);

module.exports = router;
