import { Router } from "express";
import { authController } from "./auth.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/login", authController.login);
authRoutes.post("/logout", authMiddleware, authController.logout);
authRoutes.post(
  "/change-password",
  authMiddleware,
  authController.changePassword,
);

export { authRoutes };
