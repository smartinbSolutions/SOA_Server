const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogsByCategory,
  getBlogBySlug,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { upload } = require("../middlewares/multerSetup");

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "thumbnailImage", maxCount: 1 },
  ]),
  createBlog
);

router.get("/", getAllBlogs);
router.get("/category/:slug", getBlogsByCategory);
router.get("/slug/:slug", getBlogBySlug);
router.get("/:id", getBlogById);

router.put(
  "/:id",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "thumbnailImage", maxCount: 1 },
  ]),
  updateBlog
);

router.delete("/:id", deleteBlog);

module.exports = router;
