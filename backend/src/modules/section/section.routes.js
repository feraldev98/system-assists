import { Router } from "express";
import {
  authMiddleware,
  authMiddlewareRole,
} from "../../middlewares/auth.middleware.js";

import { sectionController } from "./section.controller.js";

const sectionRoutes = Router();

sectionRoutes.post(
  "/",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  sectionController.create,
);

sectionRoutes.get(
  "/",
  authMiddleware,
  authMiddlewareRole(["ADMIN", "AUXILIAR"]),
  sectionController.get,
);

sectionRoutes.get(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN", "AUXILIAR"]),
  sectionController.getById,
);

sectionRoutes.patch(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  sectionController.update,
);

sectionRoutes.delete(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  sectionController.delete,
);

export { sectionRoutes };
