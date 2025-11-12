import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { ENV } from './configs/env.js'
import { connectDB } from './configs/db.js'

// routes
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'
import notificationRoutes from './routes/notification.route.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Endpoint
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/notification', notificationRoutes)

// Start server
const startServer = async () => {
  try {
    await connectDB()
    if(ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => console.log(`Server run on port ${ENV.PORT}`))
    }
  } catch (error) {
    console.log("Failed to start server:", error.message)
    process.exit(1)
  }
}

startServer()

// export for Vercel
export default app