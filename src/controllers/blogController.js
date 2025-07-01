"use strict";
// src/controllers/blogController.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getBlogBySlug = exports.getBlogById = exports.getBlogsByCategory = exports.getAllBlogs = exports.createBlog = void 0;
const BlogService = __importStar(require("../services/blog.service"));
const saveImageUsingSharp_1 = require("../middlewares/saveImageUsingSharp");
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const files = req.files;
        // ✅ معالجة الصور باستخدام Sharp
        const coverImagePath = ((_a = files === null || files === void 0 ? void 0 : files.coverImage) === null || _a === void 0 ? void 0 : _a[0])
            ? yield (0, saveImageUsingSharp_1.saveImageUsingSharp)(files.coverImage[0].buffer, files.coverImage[0].originalname)
            : undefined;
        const thumbnailImagePath = ((_b = files === null || files === void 0 ? void 0 : files.thumbnailImage) === null || _b === void 0 ? void 0 : _b[0])
            ? yield (0, saveImageUsingSharp_1.saveImageUsingSharp)(files.thumbnailImage[0].buffer, files.thumbnailImage[0].originalname)
            : undefined;
        // ✅ تحليل البيانات القادمة من FormData
        const parsedTitle = JSON.parse(req.body.title || "{}");
        const parsedContent = JSON.parse(req.body.content || "{}");
        const parsedTags = JSON.parse(req.body.tags || "{}"); // كائن متعدد اللغات
        const published = req.body.published === "true";
        // ✅ ملاحظة: category عبارة عن ID نصي، لا داعي لـ JSON.parse
        const category = req.body.category;
        // ✅ بناء بيانات المدونة
        const parsedData = Object.assign(Object.assign({ title: parsedTitle, content: parsedContent, category, tags: parsedTags, published }, (coverImagePath && { coverImage: coverImagePath })), (thumbnailImagePath && { thumbnailImage: thumbnailImagePath }));
        // ✅ إنشاء المدونة
        const blog = yield BlogService.createBlog(parsedData);
        res.status(201).json(blog);
    }
    catch (error) {
        console.error("❌ Create Blog Error:", error);
        res.status(500).json({ error: "Failed to create blog" });
    }
});
exports.createBlog = createBlog;
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = yield BlogService.getAllBlogs(page, limit);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ error: "Failed to fetch blogs" });
    }
});
exports.getAllBlogs = getAllBlogs;
const getBlogsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params.slug;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = yield BlogService.getBlogsByCategory(slug, page, limit);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error in getBlogsByCategory controller:", error);
        res.status(500).json({ error: "Failed to fetch blogs by category" });
    }
});
exports.getBlogsByCategory = getBlogsByCategory;
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield BlogService.getBlogById(req.params.id);
        if (!blog) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch blog" });
    }
});
exports.getBlogById = getBlogById;
const getBlogBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield BlogService.getBlogBySlug(req.params.slug);
        if (!blog) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch blog by slug" });
    }
});
exports.getBlogBySlug = getBlogBySlug;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const files = req.files;
        const coverImagePath = ((_a = files === null || files === void 0 ? void 0 : files.coverImage) === null || _a === void 0 ? void 0 : _a[0])
            ? yield (0, saveImageUsingSharp_1.saveImageUsingSharp)(files.coverImage[0].buffer, files.coverImage[0].originalname)
            : undefined;
        const thumbnailImagePath = ((_b = files === null || files === void 0 ? void 0 : files.thumbnailImage) === null || _b === void 0 ? void 0 : _b[0])
            ? yield (0, saveImageUsingSharp_1.saveImageUsingSharp)(files.thumbnailImage[0].buffer, files.thumbnailImage[0].originalname)
            : undefined;
        const parsedData = Object.assign(Object.assign({ title: JSON.parse(req.body.title || "{}"), content: JSON.parse(req.body.content || "{}"), category: JSON.parse(req.body.category || "{}"), tags: req.body.tags ? JSON.parse(req.body.tags) : [], published: req.body.published === "true" }, (coverImagePath && { coverImage: coverImagePath })), (thumbnailImagePath && { thumbnailImage: thumbnailImagePath }));
        const updatedBlog = yield BlogService.updateBlog(req.params.id, parsedData);
        res.status(200).json(updatedBlog);
    }
    catch (error) {
        console.error("Update Blog Error:", error);
        res.status(500).json({ error: "Failed to update blog" });
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield BlogService.deleteBlog(req.params.id);
        res.status(200).json({ message: "Category deleted successfully." });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete blog" });
    }
});
exports.deleteBlog = deleteBlog;
