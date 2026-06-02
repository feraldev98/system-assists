import { Router } from "express";
import {
  authMiddleware,
  authMiddlewareRole,
} from "../../middlewares/auth.middleware.js";
import { userController } from "./user.controller.js";

const userRouter = Router();

userRouter.post(
  "/",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  userController.create,
);

userRouter.get(
  "/",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  userController.get,
);

userRouter.patch(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  userController.update,
);

export { userRouter };
