import { Router } from "express";
import { gradeController } from "./grade.controller.js";
import {
  authMiddleware,
  authMiddlewareRole,
} from "../../middlewares/auth.middleware.js";

const gradeRoutes = Router();

gradeRoutes.post(
  "/",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  gradeController.create,
);

gradeRoutes.get(
  "/",
  authMiddleware,
  authMiddlewareRole(["ADMIN", "AUXILIAR"]),
  gradeController.get,
);

gradeRoutes.get(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN", "AUXILIAR"]),
  gradeController.getById,
);

gradeRoutes.put(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  gradeController.update,
);

gradeRoutes.delete(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  gradeController.delete,
);

export { gradeRoutes };
