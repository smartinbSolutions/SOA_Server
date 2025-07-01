import { Request, Response } from "express";
import * as BlogCategoryService from "../services/blogCategory.service";

export const createCategory = async (req: Request, res: Response) => {
  try {
    console.log("📥 Incoming body:", req.body); // DEBUG LOG

    const category = await BlogCategoryService.createCategory(req.body.name);
    res.status(201).json(category);
  } catch (error: any) {
    console.error("❌ Error creating category:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to create category" });
  }
};
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await BlogCategoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category = await BlogCategoryService.getCategoryById(req.params.id);

    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return; // this ends the function, but avoids returning Response directly
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const updated = await BlogCategoryService.updateCategory(
      req.params.id,
      req.body.name
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update category" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await BlogCategoryService.deleteCategory(req.params.id);
    res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};
