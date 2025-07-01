import { Router } from "express";
import {
  getAllUsers,
  login,
  register,
  updateUserController,
} from "../controllers/usersController";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

// 🔓 Public routes
router.post("/register", requireAuth, register);
router.get("/users", requireAuth, getAllUsers);
router.put("/users/:id", requireAuth, updateUserController);
router.post("/login", login);

export default router;
