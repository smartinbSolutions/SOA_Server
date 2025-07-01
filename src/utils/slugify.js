"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlug = void 0;
const slugify_1 = __importDefault(require("slugify"));
/**
 * Generate a URL-friendly slug from a given text.
 * Example: "My Awesome Blog" => "my-awesome-blog"
 */
const generateSlug = (text) => {
    console.log("text", text);
    return (0, slugify_1.default)(text, { lower: true, strict: true });
};
exports.generateSlug = generateSlug;
