import { Router } from "express";
import {
authMiddleware,
authMiddlewareRole,
} from "../../middlewares/auth.middleware.js";

import { periodController } from "./period.controller.js";

const periodRoutes = Router();

periodRoutes.post(
"/",
authMiddleware,
authMiddlewareRole(["ADMIN"]),
periodController.create,
);

periodRoutes.get(
"/",
authMiddleware,
authMiddlewareRole(["ADMIN"]),
periodController.get,
);

periodRoutes.get(
"/",
authMiddleware,
authMiddlewareRole(["ADMIN"]),
periodController.getById,
);

periodRoutes.patch(
"/",
authMiddleware,
authMiddlewareRole(["ADMIN"]),
periodController.update,
);

periodRoutes.delete(
"/",
authMiddleware,
authMiddlewareRole(["ADMIN"]),
periodController.delete,
);

export { periodRoutes };
