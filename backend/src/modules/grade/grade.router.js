import { Router } from "express";
import { gradeController } from "./grade.controller.js";
import {
  authMiddleware,
  authMiddlewareRole,
} from "../../middlewares/auth.middleware.js";

const gradeRouter = Router();

gradeRouter.post(
  "/",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  gradeController.create,
);

gradeRouter.get(
  "/",
  authMiddleware,
  authMiddlewareRole(["ADMIN", "AUXILIAR"]),
  gradeController.get,
);

gradeRouter.get(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN", "AUXILIAR"]),
  gradeController.getById,
);

gradeRouter.patch(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  gradeController.update,
);

export { gradeRouter };
