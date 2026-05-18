import { Router } from "express";
import { auxiliarRouter } from "../modules/user/auxiliar/auxiliar.router.js";
import { errorHandler } from "../middlewares/errorHandler.js";

const appRouter = Router()

appRouter.use('/auxiliar', auxiliarRouter)

appRouter.use(errorHandler)

export { appRouter }