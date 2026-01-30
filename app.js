import express from 'express'
import { PORT } from './config/env.js'
import authRoutes from './routes/auth.routes.js'
import subscriptionRoutes from './routes/subscriptions.routes.js'
import userRoutes from './routes/user.routes.js'
import connectToDatabase from './database/mongodb.js'
import errorMiddlware from './middleware/error.middleware.js'
import cookieParser from 'cookie-parser'
import arcJetMiddleware from './middleware/arcjet.middleware.js'
import workFlowRouter from './routes/workflow.routes.js'

const app = express()

// Parse body FIRST
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(arcJetMiddleware)

// THEN add logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    console.log('Body:', req.body)
    next()
})

// routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/subscriptions', subscriptionRoutes)
app.use("/api/v1/workflows", workFlowRouter)

app.use(errorMiddlware)

app.get('/', (req, res) => {
    res.send('Hey dont freak out, just finish this up')
})

app.listen(PORT, async () => {
    console.log(`Server Running on PORT ${PORT}`)
    await connectToDatabase()
})

export default app