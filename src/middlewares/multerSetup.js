"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
// 🧠 استخدام التخزين المؤقت في الذاكرة لتجهيز الصور عبر Sharp لاحقًا
const storage = multer_1.default.memoryStorage();
// ✅ السماح فقط لأنواع الصور المدعومة
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Only JPEG, PNG, or WEBP images are allowed"));
    }
};
// 🧩 التهيئة النهائية لـ multer مع تحديد الحجم المسموح
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 1 * 1024 * 1024, // 1MB
    },
});
