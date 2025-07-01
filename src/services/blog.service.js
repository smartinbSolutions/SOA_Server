"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getBlogsByCategory = exports.getBlogBySlug = exports.getBlogById = exports.getAllBlogs = exports.createBlog = void 0;
// src/services/blog.service.ts
const Blog_1 = __importDefault(require("../models/Blog"));
const BlogCategory_1 = __importDefault(require("../models/BlogCategory"));
const slugify_1 = require("../utils/slugify");
const createBlog = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const slug = (0, slugify_1.generateSlug)(((_a = data.title) === null || _a === void 0 ? void 0 : _a.en) || "");
    const blog = new Blog_1.default(Object.assign(Object.assign({}, data), { slug }));
    return yield blog.save();
});
exports.createBlog = createBlog;
const getAllBlogs = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [blogs, total] = yield Promise.all([
        Blog_1.default.find()
            .populate("category")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }),
        Blog_1.default.countDocuments(),
    ]);
    return {
        blogs,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
    };
});
exports.getAllBlogs = getAllBlogs;
const getBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Blog_1.default.findById(id).populate("category");
});
exports.getBlogById = getBlogById;
const getBlogBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Blog_1.default.findOne({ slug }).populate("category");
});
exports.getBlogBySlug = getBlogBySlug;
const getBlogsByCategory = (slug_1, ...args_1) => __awaiter(void 0, [slug_1, ...args_1], void 0, function* (slug, page = 1, limit = 10) {
    const category = yield BlogCategory_1.default.findOne({ slug });
    if (!category)
        return { blogs: [], totalPages: 0, currentPage: page };
    const skip = (page - 1) * limit;
    const [blogs, total] = yield Promise.all([
        Blog_1.default.find({ category: category._id })
            .populate("category")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Blog_1.default.countDocuments({ category: category._id }),
    ]);
    return {
        blogs,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
    };
});
exports.getBlogsByCategory = getBlogsByCategory;
const updateBlog = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if ((_a = data.title) === null || _a === void 0 ? void 0 : _a.en) {
        data.slug = (0, slugify_1.generateSlug)(data.title.en);
    }
    return yield Blog_1.default.findByIdAndUpdate(id, data, { new: true });
});
exports.updateBlog = updateBlog;
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield Blog_1.default.findByIdAndDelete(id);
});
exports.deleteBlog = deleteBlog;
