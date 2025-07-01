import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

// 🧠 استخدام التخزين المؤقت في الذاكرة لتجهيز الصور عبر Sharp لاحقًا
const storage = multer.memoryStorage();

// ✅ السماح فقط لأنواع الصور المدعومة
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, or WEBP images are allowed"));
  }
};

// 🧩 التهيئة النهائية لـ multer مع تحديد الحجم المسموح
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB
  },
});
