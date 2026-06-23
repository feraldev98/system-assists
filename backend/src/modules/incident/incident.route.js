import { Router } from "express";
import {
  authMiddleware,
  authMiddlewareRole,
} from "../../middlewares/auth.middleware.js";
import { incidentController } from "./incident.controller.js";

const incidentRoutes = Router();

incidentRoutes.post(
  "/",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  incidentController.create,
);
incidentRoutes.get(
  "/",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  incidentController.get,
);
incidentRoutes.get(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  incidentController.getById,
);
incidentRoutes.patch(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  incidentController.update,
);
incidentRoutes.delete(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  incidentController.delete,
);

export { incidentRoutes };
