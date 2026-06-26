import { Router } from "express";
import {
  authMiddleware,
  authMiddlewareRole,
} from "../../middlewares/auth.middleware.js";

import { studentController } from "./student.controller.js";

const studentRoutes = Router();

studentRoutes.post(
  "/",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  studentController.create,
);

studentRoutes.get(
  "/",
  authMiddleware,
  authMiddlewareRole(["ADMIN", "AUXILIAR"]),
  studentController.get,
);

studentRoutes.get(
  "/:id/attendance",
  authMiddleware,
  authMiddlewareRole(["ADMIN", "AUXILIAR", "PARENT"]),
  studentController.getAttendance,
);

studentRoutes.get(
  "/:id/incidents",
  authMiddleware,
  authMiddlewareRole(["ADMIN", "AUXILIAR", "PARENT"]),
  studentController.getIncidents,
);

studentRoutes.get(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN", "AUXILIAR"]),
  studentController.getById,
);

studentRoutes.patch(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  studentController.update,
);

studentRoutes.delete(
  "/:id",
  authMiddleware,
  authMiddlewareRole(["ADMIN"]),
  studentController.delete,
);

export { studentRoutes };
