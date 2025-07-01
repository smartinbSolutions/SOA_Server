"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogController_1 = require("../controllers/blogController");
const multerSetup_1 = require("../middlewares/multerSetup");
const router = (0, express_1.Router)();
router.post("/", multerSetup_1.upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "thumbnailImage", maxCount: 1 },
]), blogController_1.createBlog);
router.get("/", blogController_1.getAllBlogs);
router.get("/category/:slug", blogController_1.getBlogsByCategory);
router.get("/slug/:slug", blogController_1.getBlogBySlug);
router.get("/:id", blogController_1.getBlogById);
router.put("/:id", multerSetup_1.upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "thumbnailImage", maxCount: 1 },
]), blogController_1.updateBlog);
router.delete("/:id", blogController_1.deleteBlog);
exports.default = router;
