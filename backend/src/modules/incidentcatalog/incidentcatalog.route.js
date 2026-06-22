import { Router } from "express";
import { authMiddleware, authMiddlewareRole } from "../../middlewares/auth.middleware.js";
import { incidentcatalogController } from "./incidentcatalog.controller.js";

const incidentcatalogRoutes = Router();

incidentcatalogRoutes.post("/", authMiddleware, authMiddlewareRole(["ADMIN"]), incidentcatalogController.create);
incidentcatalogRoutes.get("/", authMiddleware, authMiddlewareRole(["ADMIN"]), incidentcatalogController.get);
incidentcatalogRoutes.get("/:id", authMiddleware, authMiddlewareRole(["ADMIN"]), incidentcatalogController.getById);
incidentcatalogRoutes.patch("/:id", authMiddleware, authMiddlewareRole(["ADMIN"]), incidentcatalogController.update);
incidentcatalogRoutes.delete("/:id", authMiddleware, authMiddlewareRole(["ADMIN"]), incidentcatalogController.delete);

export { incidentcatalogRoutes };
