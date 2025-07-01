import sharp from "sharp";
import path from "path";
import fs from "fs/promises";

export const saveImageUsingSharp = async (
  buffer: Buffer,
  originalName: string,
  folder: string = "public/uploads"
): Promise<string> => {
  // تأكد من وجود المجلد
  await fs.mkdir(folder, { recursive: true });

  // توليد اسم فريد للصورة
  const timestamp = Date.now();
  const ext = path.extname(originalName) || ".webp"; // تأكيد الامتداد
  const fileName = `${timestamp}-${Math.floor(Math.random() * 10000)}${ext}`;
  const filePath = path.join(folder, fileName);

  // ضغط الصورة وحفظها بصيغة WebP (أو حسب الامتداد)
  await sharp(buffer)
    .resize({ width: 1200 }) // ⚙️ يمكنك تخصيص الحجم
    .toFormat("webp")
    .webp({ quality: 80 })
    .toFile(filePath);

  // إرجاع المسار النسبي لاستخدامه في قاعدة البيانات
  return `/${filePath.replace(/\\/g, "/")}`;
};
