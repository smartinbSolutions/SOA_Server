import BlogCategory from "../models/BlogCategory";
import { generateSlug } from "../utils/slugify";

export const createCategory = async (name: {
  en: string;
  tr: string;
  ar: string;
}) => {
  const slug = generateSlug(name.en);
  const newCategory = new BlogCategory({ name, slug });
  return await newCategory.save();
};

export const getAllCategories = async () => {
  return await BlogCategory.find();
};

export const getCategoryById = async (id: string) => {
  console.log("id", id);
  return await BlogCategory.findById(id);
};

export const updateCategory = async (
  id: string,
  name: { en: string; tr: string; ar: string }
) => {
  const slug = generateSlug(name.en);
  return await BlogCategory.findByIdAndUpdate(
    id,
    { name, slug },
    { new: true }
  );
};

export const deleteCategory = async (id: string) => {
  return await BlogCategory.findByIdAndDelete(id);
};
