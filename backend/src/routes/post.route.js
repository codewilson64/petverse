import express from 'express'
import { createPost, deletePost, getPost, getPosts, getUserPosts, likePost } from '../controllers/post.controller.js'
import protectRoute from '../middleware/protectRoute.js'
import upload from '../middleware/upload.middleware.js'

const router = express.Router()

router.get("/", getPosts)
router.get('/:id', getPost)
router.get('/user/:username', getUserPosts)

router.post("/", protectRoute, upload.single("image"), createPost)
router.post("/like/:postId", protectRoute, likePost)
router.delete("/delete/:postId", protectRoute, deletePost)

export default router