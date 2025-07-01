import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  category: mongoose.Types.ObjectId;
  title: {
    en: string;
    ar: string;
    tr: string;
    de: string;
  };
  content: {
    en: string;
    ar: string;
    tr: string;
    de: string;
  };
  slug: string;
  tags: string[];
  coverImage: string;
  thumbnailImage: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema<IBlog>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: true,
    },
    title: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      tr: { type: String, required: true },
      de: { type: String, required: true },
    },
    content: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      tr: { type: String, required: true },
      de: { type: String, required: true },
    },
    slug: { type: String, unique: true, required: true },
    tags: {
      en: { type: [String], default: [] },
      ar: { type: [String], default: [] },
      tr: { type: [String], default: [] },
      de: { type: [String], default: [] },
    },
    coverImage: { type: String },
    thumbnailImage: { type: String },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IBlog>("Blog", BlogSchema);
