// src/services/blog.service.ts
import BlogModel, { IBlog } from "../models/Blog";
import BlogCategory from "../models/BlogCategory";
import { generateSlug } from "../utils/slugify";

export const createBlog = async (data: Partial<IBlog>): Promise<IBlog> => {
  const slug = generateSlug(data.title?.en || "");
  const blog = new BlogModel({ ...data, slug });
  return await blog.save();
};

export const getAllBlogs = async (
  page: number = 1,
  limit: number = 10
): Promise<{
  blogs: IBlog[];
  totalPages: number;
  currentPage: number;
}> => {
  const skip = (page - 1) * limit;
  const [blogs, total] = await Promise.all([
    BlogModel.find()
      .populate("category")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    BlogModel.countDocuments(),
  ]);

  return {
    blogs,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};
export const getBlogById = async (id: string): Promise<IBlog | null> => {
  return await BlogModel.findById(id).populate("category");
};

export const getBlogBySlug = async (slug: string): Promise<IBlog | null> => {
  return await BlogModel.findOne({ slug }).populate("category");
};

export const getBlogsByCategory = async (
  slug: string,
  page: number = 1,
  limit: number = 10
): Promise<{
  blogs: IBlog[];
  totalPages: number;
  currentPage: number;
}> => {
  const category = await BlogCategory.findOne({ slug });
  if (!category) return { blogs: [], totalPages: 0, currentPage: page };

  const skip = (page - 1) * limit;
  const [blogs, total] = await Promise.all([
    BlogModel.find({ category: category._id })
      .populate("category")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    BlogModel.countDocuments({ category: category._id }),
  ]);

  return {
    blogs,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};

export const updateBlog = async (
  id: string,
  data: Partial<IBlog>
): Promise<IBlog | null> => {
  if (data.title?.en) {
    data.slug = generateSlug(data.title.en);
  }
  return await BlogModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBlog = async (id: string): Promise<void> => {
  await BlogModel.findByIdAndDelete(id);
};
