import { Router } from "express";
import { userController } from "./user.controller.js";

const userRouter = Router()

userRouter.route("/").post(userController.create);

export { userRouter }
