import { ENV } from '../configs/env.js'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt

    if(!token) {
      return res.status(401).json({error: 'Unauthorized token'})
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET)
    if(!decoded) {
      return res.status(401).json({error: 'Invalid token'})
    }

    const user = await User.findById(decoded._id).select('-password')
    req.user = user
    next()
  }
  catch(error) {
    res.status(400).json({error: error.message})
    console.log('Error in protectRoute middleware', error.message)
  }
}

export default protectRoute