import { Router } from "express";

const appRouter = Router()

appRouter.get('/', (req, res) => {
  res.json({message: 'API Assists System'})
})