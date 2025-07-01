"use strict";
// src/routes/contactInfo.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactInfoController_1 = require("../controllers/contactInfoController");
const router = (0, express_1.Router)();
router.get("/", contactInfoController_1.getContactInfo);
router.put("/", contactInfoController_1.upsertContactInfo);
router.delete("/", contactInfoController_1.deleteContactInfo);
exports.default = router;
