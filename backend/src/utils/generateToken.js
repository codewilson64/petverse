import jwt from 'jsonwebtoken'
import { ENV } from '../configs/env.js'

const generateTokenAndSetCookie = (_id, res) => {
  const token = jwt.sign({_id}, ENV.JWT_SECRET, {expiresIn: '3d'})

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 3*24*60*60*1000,
    sameSite: "strict",
    secure: ENV.NODE_ENV !== 'development'
  })

  return token
}

export default generateTokenAndSetCookie