// routes/userRoutes.js
const express = require("express");
const {
  register,
  getAllUsers,
  updateUserController,
  login,
} = require("../controllers/usersController");
const { requireAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", requireAuth, register);
router.get("/users", requireAuth, getAllUsers);
router.put("/users/:id", requireAuth, updateUserController);
router.post("/login", login);

module.exports = router;
