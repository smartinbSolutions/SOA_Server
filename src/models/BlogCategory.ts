import { Schema, model, Document } from "mongoose";

interface IBlogCategory extends Document {
  name: {
    en: string;
    ar: string;
    tr: string;
  };
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogCategorySchema = new Schema<IBlogCategory>(
  {
    name: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      tr: { type: String, required: true },
    },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default model<IBlogCategory>("BlogCategory", BlogCategorySchema);
