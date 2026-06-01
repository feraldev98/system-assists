import { Router } from "express";
import { authRouter } from "../modules/auth/auth.router.js";
import { errorsMiddleware } from "../middlewares/errors.middleware.js";
import {
  authMiddleware,
  authMiddlewareRole,
} from "../middlewares/auth.middleware.js";
import { userRouter } from "../modules/user/user.router.js";

const appRouter = Router();

appRouter.get(
  "/protected",
  authMiddleware,
  authMiddlewareRole(["AUXILIAR"]),
  async (req, res) => {
    return res.json({ message: "Bienvenido a la API de sistema assistentes" });
  },
);

appRouter.use("/", authRouter);
appRouter.use("/user", userRouter);

appRouter.use(errorsMiddleware);

export { appRouter };
