import express from 'express'
import { followUser, getUserProfile, updateProfile } from '../controllers/user.controller.js'
import protectRoute from '../middleware/protectRoute.js'

const router = express.Router()

router.put('/update', protectRoute, updateProfile)
router.get('/profile/:username', protectRoute, getUserProfile)
router.post('/follow/:id', protectRoute, followUser)

export default router