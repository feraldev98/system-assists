import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { errorsMiddleware } from "./middlewares/errors.middleware.js";
import { userRoutes } from "./modules/user/user.routes.js";
import { gradeRoutes } from "./modules/grade/grade.routes.js";
import { sectionRoutes } from "./modules/section/section.routes.js";
import { studentRoutes } from "./modules/student/student.routes.js";
import { parentRoutes } from "./modules/parent/parent.routes.js";
import { classroomRoutes } from "./modules/classroom/classroom.routes.js";
import { classroomStudentRoutes } from "./modules/classroomStudent/classroomStudent.routes.js";
import { attendanceRoutes } from "./modules/attendance/attendance.route.js";

const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
app.use(cookieParser());

// routes
app.use("/", authRoutes);
app.use("/user", userRoutes);
app.use("/grade", gradeRoutes);
app.use("/section", sectionRoutes);
app.use("/student", studentRoutes);
app.use("/parent", parentRoutes);
app.use("/classroom", classroomRoutes);
app.use("/classroomStudent", classroomStudentRoutes);
app.use("/attendance", attendanceRoutes);

app.use(errorsMiddleware);

export default app;
