// src/services/contactInfo.service.ts
import ContactInfo, { IContactInfo } from "../models/ContactInfo";

// Get the existing contact info (singleton logic: always assume one document)
export const getContactInfo = async (): Promise<IContactInfo> => {
  let contactInfo = await ContactInfo.findOne();

  if (!contactInfo) {
    contactInfo = new ContactInfo({
      socialMedia: [],
      phoneNumbers: [],
      emails: [],
      addresses: [],
    });
    await contactInfo.save();
  }

  return contactInfo;
};

// Create or update contact info
export const upsertContactInfo = async (
  data: Partial<IContactInfo>
): Promise<IContactInfo> => {
  let contactInfo = await ContactInfo.findOne();

  if (contactInfo) {
    contactInfo.set(data);
  } else {
    contactInfo = new ContactInfo(data);
  }

  await contactInfo.save();
  return contactInfo;
};

// Optional: Delete contact info (if needed)
export const deleteContactInfo = async (): Promise<void> => {
  await ContactInfo.deleteMany();
};
