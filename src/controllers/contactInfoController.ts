import { Request, Response } from "express";
import * as ContactInfoService from "../services/contactInfo.service";

export const getContactInfo = async (_req: Request, res: Response) => {
  try {
    const contactInfo = await ContactInfoService.getContactInfo();
    res.status(200).json(contactInfo);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve contact information" });
  }
};

export const upsertContactInfo = async (req: Request, res: Response) => {
  try {
    const updatedInfo = await ContactInfoService.upsertContactInfo(req.body);
    res.status(200).json(updatedInfo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update contact information" });
  }
};

export const deleteContactInfo = async (_req: Request, res: Response) => {
  try {
    await ContactInfoService.deleteContactInfo();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete contact information" });
  }
};
