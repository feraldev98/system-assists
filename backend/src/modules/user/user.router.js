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

export { userRouter };

/*userRouter.get(
  "/protected",
  authMiddleware,
  authMiddlewareRole(["ADMIN", "AUXILIAR", "PARENT"]),
  async (req, res) => {
    return res.json({ message: "Bienvenido a la API de sistema assistentes" });
  },
);*/
