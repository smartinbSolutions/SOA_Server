// src/controllers/blogController.ts

import { Request, Response } from "express";
import * as BlogService from "../services/blog.service";
import { IBlog } from "../models/Blog";
import { saveImageUsingSharp } from "../middlewares/saveImageUsingSharp";

export const createBlog = async (req: Request, res: Response) => {
  try {
    const files = req.files as {
      coverImage?: Express.Multer.File[];
      thumbnailImage?: Express.Multer.File[];
    };

    // ✅ معالجة الصور باستخدام Sharp
    const coverImagePath = files?.coverImage?.[0]
      ? await saveImageUsingSharp(
          files.coverImage[0].buffer,
          files.coverImage[0].originalname
        )
      : undefined;

    const thumbnailImagePath = files?.thumbnailImage?.[0]
      ? await saveImageUsingSharp(
          files.thumbnailImage[0].buffer,
          files.thumbnailImage[0].originalname
        )
      : undefined;

    // ✅ تحليل البيانات القادمة من FormData
    const parsedTitle = JSON.parse(req.body.title || "{}");
    const parsedContent = JSON.parse(req.body.content || "{}");
    const parsedTags = JSON.parse(req.body.tags || "{}"); // كائن متعدد اللغات
    const published = req.body.published === "true";

    // ✅ ملاحظة: category عبارة عن ID نصي، لا داعي لـ JSON.parse
    const category = req.body.category;

    // ✅ بناء بيانات المدونة
    const parsedData: Partial<IBlog> = {
      title: parsedTitle,
      content: parsedContent,
      category,
      tags: parsedTags,
      published,
      ...(coverImagePath && { coverImage: coverImagePath }),
      ...(thumbnailImagePath && { thumbnailImage: thumbnailImagePath }),
    };

    // ✅ إنشاء المدونة
    const blog = await BlogService.createBlog(parsedData);
    res.status(201).json(blog);
  } catch (error) {
    console.error("❌ Create Blog Error:", error);
    res.status(500).json({ error: "Failed to create blog" });
  }
};

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await BlogService.getAllBlogs(page, limit);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

export const getBlogsByCategory = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await BlogService.getBlogsByCategory(slug, page, limit);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getBlogsByCategory controller:", error);
    res.status(500).json({ error: "Failed to fetch blogs by category" });
  }
};

export const getBlogById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const blog = await BlogService.getBlogById(req.params.id);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

export const getBlogBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const blog = await BlogService.getBlogBySlug(req.params.slug);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog by slug" });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const files = req.files as {
      coverImage?: Express.Multer.File[];
      thumbnailImage?: Express.Multer.File[];
    };

    const coverImagePath = files?.coverImage?.[0]
      ? await saveImageUsingSharp(
          files.coverImage[0].buffer,
          files.coverImage[0].originalname
        )
      : undefined;

    const thumbnailImagePath = files?.thumbnailImage?.[0]
      ? await saveImageUsingSharp(
          files.thumbnailImage[0].buffer,
          files.thumbnailImage[0].originalname
        )
      : undefined;

    const parsedData: Partial<IBlog> = {
      title: JSON.parse(req.body.title || "{}"),
      content: JSON.parse(req.body.content || "{}"),
      category: JSON.parse(req.body.category || "{}"),
      tags: req.body.tags ? JSON.parse(req.body.tags) : [],
      published: req.body.published === "true",
      ...(coverImagePath && { coverImage: coverImagePath }),
      ...(thumbnailImagePath && { thumbnailImage: thumbnailImagePath }),
    };

    const updatedBlog = await BlogService.updateBlog(req.params.id, parsedData);
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("Update Blog Error:", error);
    res.status(500).json({ error: "Failed to update blog" });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    await BlogService.deleteBlog(req.params.id);
    res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
};
