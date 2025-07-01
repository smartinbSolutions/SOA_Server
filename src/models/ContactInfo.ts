// src/models/ContactInfo.ts
import mongoose, { Schema, Document } from "mongoose";

type Platform =
  | "facebook"
  | "instagram"
  | "twitter"
  | "youtube"
  | "tiktok"
  | "linkedin"
  | "whatsapp"
  | "other";

interface SocialMedia {
  platform: Platform;
  label?: string;
  url: string;
}

interface PhoneNumber {
  label?: string;
  number: string;
}

interface Email {
  label?: string;
  email: string;
}

interface PhysicalAddress {
  label?: string;
  address: string;
}

export interface IContactInfo extends Document {
  socialMedia: SocialMedia[];
  phoneNumbers: PhoneNumber[];
  emails: Email[];
  addresses: PhysicalAddress[];
  updatedAt: Date;
  createdAt: Date;
}

const ContactInfoSchema = new Schema<IContactInfo>(
  {
    socialMedia: [
      {
        platform: {
          type: String,
          enum: [
            "facebook",
            "instagram",
            "twitter",
            "youtube",
            "tiktok",
            "linkedin",
            "whatsapp",
            "other",
          ],
          required: true,
        },
        label: { type: String },
        url: { type: String, required: true },
      },
    ],
    phoneNumbers: [
      {
        label: { type: String },
        number: { type: String, required: true },
      },
    ],
    emails: [
      {
        label: { type: String },
        email: { type: String, required: true },
      },
    ],
    addresses: [
      {
        label: { type: String },
        address: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IContactInfo>("ContactInfo", ContactInfoSchema);
