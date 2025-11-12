import Post from "../models/post.model.js"
import User from "../models/user.model.js"
import cloudinary from "../configs/cloudinary.js";
import Notification from "../models/notification.model.js";
import Comment from "../models/comment.model.js";

// Get Posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "username fullName profilePicture"
      })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "username fullName profilePicture"
        }
      })

    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: "No posts available" })
    }

    res.status(200).json(posts)
  } catch (error) {
    console.log("Error in getPosts controller", error.message)
    res.status(500).json({ error: "Internal server error" })
  }
}

// Get single post
export const getPost = async (req, res) => {
  const { postId } = req.params

  try {
    const post = await Post.findById(postId)
      .populate({
        path: 'user',
        select: 'username fullName profilePicture'
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'username fullName profilePicture'
        }
      })

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    res.status(200).json(post)
  } catch (error) {
    console.log('Error in getPost controller:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Get user posts
export const getUserPosts = async (req, res) => {
  const { username } = req.params

  try {
    // Find user by username
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Find all posts created by this user
    const posts = await Post.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: 'user',
        select: 'username fullName profilePicture'
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'username fullName profilePicture'
        }
      })

    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: 'No posts found for this user' })
    }

    res.status(200).json(posts)
  } catch (error) {
    console.log('Error in getUserPosts controller:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Create post
export const createPost = async (req, res) => {
  const userId = req.user._id
  const { content } = req.body;
  const imageFile = req.file;

  try {
    if (!content && !imageFile) {
    return res.status(500).json({ error: "Post must contain either text or image" });
  }

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  let imageUrl = "";

  // upload image to Cloudinary if provided
  if (imageFile) {
    try {
      // convert buffer to base64 for cloudinary
      const base64Image = `data:${imageFile.mimetype};base64,${imageFile.buffer.toString(
        "base64"
      )}`;

      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "social_media_posts",
        resource_type: "image",
        transformation: [
          { width: 800, height: 600, crop: "limit" },
          { quality: "auto" },
          { format: "auto" },
        ],
      });
      imageUrl = uploadResponse.secure_url;
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);
      return res.status(500).json({ error: "Failed to upload image" });
    }
  }
    const post = await Post.create({
      user: user._id,
      content: content || "",
      image: imageUrl,
    });

    res.status(201).json(post);
  } catch (error) {
    console.log('Error in createPost controller:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
};

// Like Post
export const likePost = async (req, res) => {
  const { postId } = req.params
  const userId = req.user._id

  try {
    const post = await Post.findById(postId)

    if(!post) {
      return res.status(500).json({error: 'Post not found'})
    }

    const isLiked = post.likes.includes(userId)

    if(isLiked) {
      await Post.findByIdAndUpdate(postId, {$pull: {likes: userId}})
    //   await User.findByIdAndUpdate(userId, {$pull: {likedPosts: postId}})
      return res.status(200).json(post)
    }
    else {
      await Post.findByIdAndUpdate(postId, {$push: {likes: userId}})
    //   await User.findByIdAndUpdate(userId, {$push: {likedPosts: postId}})

      // create notification if not liking own post
      if (post.user.toString() !== userId.toString()) {
        await Notification.create({
          from: userId,
          to: post.user,
          type: "like",
          post: postId,
        });
      }

      return res.status(200).json(post)
    }
    
  } 
  catch (error) {
    res.status(500).json({error: error.message})
    console.log('Error in likePost controller', error.message)
  }
}

// Delete post
export const deletePost = async (req, res) => {
  const userId = req.user._id
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: "You can only delete your own posts" });
    }

    // delete all comments on this post
    await Comment.deleteMany({ post: postId });

    // delete the post
    await Post.findByIdAndDelete(postId);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({error: error.message})
    console.log('Error in deletePost controller', error.message)
  }
};


