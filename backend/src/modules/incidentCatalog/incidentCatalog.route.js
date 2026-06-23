import { Router } from "express";
import {
  authMiddleware,
  authMiddlewareRole,
} from "../../middlewares/auth.middleware.js";
import { incidentCatalogController } from "./incidentCatalog.controller.js";

const incidentCatalogRoutes = Router();

incidentCatalogRoutes.post(
  "/",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  incidentCatalogController.create,
);
incidentCatalogRoutes.get(
  "/",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  incidentCatalogController.get,
);
incidentCatalogRoutes.get(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  incidentCatalogController.getById,
);
incidentCatalogRoutes.patch(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  incidentCatalogController.update,
);
incidentCatalogRoutes.delete(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  incidentCatalogController.delete,
);

export { incidentCatalogRoutes };
