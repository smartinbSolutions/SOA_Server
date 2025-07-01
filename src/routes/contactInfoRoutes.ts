// src/routes/contactInfo.routes.ts

import { Router } from "express";
import {
  deleteContactInfo,
  getContactInfo,
  upsertContactInfo,
} from "../controllers/contactInfoController";

const router = Router();

router.get("/", getContactInfo);
router.put("/", upsertContactInfo);
router.delete("/", deleteContactInfo);

export default router;
