import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogBySlug,
  getBlogsByCategory,
} from "../controllers/blogController";
import { upload } from "../middlewares/multerSetup";

const router = Router();

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

export default router;
