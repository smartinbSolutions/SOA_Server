// routes/contactInfoRoutes.js
const express = require("express");
const {
  getContactInfo,
  upsertContactInfo,
  deleteContactInfo,
} = require("../controllers/contactInfoController");

const router = express.Router();

router.get("/", getContactInfo);
router.put("/", upsertContactInfo);
router.delete("/", deleteContactInfo);

module.exports = router;
