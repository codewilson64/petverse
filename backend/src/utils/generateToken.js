import jwt from 'jsonwebtoken'
import { ENV } from '../configs/env.js'

const generateToken = (_id) => {
  return jwt.sign({_id}, ENV.JWT_SECRET, {expiresIn: '3d'})
}

export default generateToken