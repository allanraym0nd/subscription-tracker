import express from 'express'
import { PORT } from './config/env.js'

const app = express()

app.get('/', (req, res) => {


})

app.listen(PORT, () => {
    console.log("Server Running")
})

export default app;