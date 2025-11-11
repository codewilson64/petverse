import express from 'express'
import { ENV } from './configs/env.js'
import { connectDB } from './configs/db.js'

const app = express()

connectDB()

app.get('/', (req, res) => res.send("hello world"))

app.listen(ENV.PORT, () => console.log(`Server run on port ${ENV.PORT}`))