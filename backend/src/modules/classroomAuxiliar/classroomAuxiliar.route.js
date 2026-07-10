import { Router } from "express";
import {
  authMiddleware,
  authMiddlewareRole,
} from "../../middlewares/auth.middleware.js";
import { classroomAuxiliarController } from "./classroomAuxiliar.controller.js";

const classroomAuxiliarRoutes = Router();

classroomAuxiliarRoutes.post(
  "/",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  classroomAuxiliarController.create,
);
classroomAuxiliarRoutes.get(
  "/",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  classroomAuxiliarController.get,
);
classroomAuxiliarRoutes.get(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  classroomAuxiliarController.getById,
);
classroomAuxiliarRoutes.patch(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  classroomAuxiliarController.update,
);
classroomAuxiliarRoutes.delete(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  classroomAuxiliarController.delete,
);

export { classroomAuxiliarRoutes };
