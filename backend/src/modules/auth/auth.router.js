import { Router } from "express";
import { authController } from "./auth.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/logout", authMiddleware, authController.logout);

export { authRouter };
