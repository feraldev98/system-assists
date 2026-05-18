import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan  from 'morgan'
import { appRouter } from './routes/appRouter.js'

const app = express()

// middlewares 
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/', appRouter)

export default app