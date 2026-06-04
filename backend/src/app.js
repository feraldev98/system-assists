import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { authRouter } from "./modules/auth/auth.router.js";
import { errorsMiddleware } from "./middlewares/errors.middleware.js";
import { userRouter } from "./modules/user/user.router.js";
import { gradeRouter } from "./modules/grade/grade.router.js";

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
app.use(morgan("dev"));
app.use(cookieParser());

// routes
app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/grade", gradeRouter);

app.use(errorsMiddleware);

export default app;
