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
exports.saveImageUsingSharp = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const saveImageUsingSharp = (buffer_1, originalName_1, ...args_1) => __awaiter(void 0, [buffer_1, originalName_1, ...args_1], void 0, function* (buffer, originalName, folder = "public/uploads") {
    // تأكد من وجود المجلد
    yield promises_1.default.mkdir(folder, { recursive: true });
    // توليد اسم فريد للصورة
    const timestamp = Date.now();
    const ext = path_1.default.extname(originalName) || ".webp"; // تأكيد الامتداد
    const fileName = `${timestamp}-${Math.floor(Math.random() * 10000)}${ext}`;
    const filePath = path_1.default.join(folder, fileName);
    // ضغط الصورة وحفظها بصيغة WebP (أو حسب الامتداد)
    yield (0, sharp_1.default)(buffer)
        .resize({ width: 1200 }) // ⚙️ يمكنك تخصيص الحجم
        .toFormat("webp")
        .webp({ quality: 80 })
        .toFile(filePath);
    // إرجاع المسار النسبي لاستخدامه في قاعدة البيانات
    return `/${filePath.replace(/\\/g, "/")}`;
});
exports.saveImageUsingSharp = saveImageUsingSharp;
