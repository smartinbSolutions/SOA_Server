import slugify from "slugify";

/**
 * Generate a URL-friendly slug from a given text.
 * Example: "My Awesome Blog" => "my-awesome-blog"
 */
export const generateSlug = (text: string): string => {
  console.log("text", text);
  return slugify(text, { lower: true, strict: true });
};
