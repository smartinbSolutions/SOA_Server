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
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const BlogCategory_1 = __importDefault(require("../models/BlogCategory"));
const slugify_1 = require("../utils/slugify");
const createCategory = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = (0, slugify_1.generateSlug)(name.en);
    const newCategory = new BlogCategory_1.default({ name, slug });
    return yield newCategory.save();
});
exports.createCategory = createCategory;
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield BlogCategory_1.default.find();
});
exports.getAllCategories = getAllCategories;
const getCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("id", id);
    return yield BlogCategory_1.default.findById(id);
});
exports.getCategoryById = getCategoryById;
const updateCategory = (id, name) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = (0, slugify_1.generateSlug)(name.en);
    return yield BlogCategory_1.default.findByIdAndUpdate(id, { name, slug }, { new: true });
});
exports.updateCategory = updateCategory;
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield BlogCategory_1.default.findByIdAndDelete(id);
});
exports.deleteCategory = deleteCategory;
