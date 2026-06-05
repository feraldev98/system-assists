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

gradeRouter.put(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  gradeController.update,
);

gradeRouter.delete(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  gradeController.delete,
);

export { gradeRouter };
