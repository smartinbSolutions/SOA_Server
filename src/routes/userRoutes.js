"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// 🔓 Public routes
router.post("/register", auth_middleware_1.requireAuth, usersController_1.register);
router.get("/users", auth_middleware_1.requireAuth, usersController_1.getAllUsers);
router.put("/users/:id", auth_middleware_1.requireAuth, usersController_1.updateUserController);
router.post("/login", usersController_1.login);
exports.default = router;
