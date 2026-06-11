import { Router } from "express";
import {
  authMiddleware,
  authMiddlewareRole,
} from "../../middlewares/auth.middleware.js";

import { parentController } from "./parent.controller.js";

const parentRoutes = Router();

parentRoutes.post(
  "/",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  parentController.create,
);

parentRoutes.get(
  "/",
  authMiddleware,
  authMiddlewareRole(["ADMIN", "AUXILIAR"]),
  parentController.get,
);

parentRoutes.get(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN", "AUXILIAR"]),
  parentController.getById,
);

parentRoutes.patch(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  parentController.update,
);

parentRoutes.delete(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  parentController.delete,
);

export { parentRoutes };
