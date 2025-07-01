"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BlogCategorySchema = new mongoose_1.Schema({
    name: {
        en: { type: String, required: true },
        ar: { type: String, required: true },
        tr: { type: String, required: true },
    },
    slug: { type: String, required: true, unique: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("BlogCategory", BlogCategorySchema);
