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
  authMiddlewareRole(["ADMIN"]),
  parentController.get,
);

parentRoutes.get(
  "/",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  parentController.getById,
);

parentRoutes.patch(
  "/",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  parentController.update,
);

parentRoutes.delete(
  "/",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  parentController.delete,
);

export { parentRoutes };
