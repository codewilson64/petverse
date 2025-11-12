import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";

// Get comments
export const getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: 1 })
      .populate("user", "username fullName profilePicture") 

    if (!comments || comments.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error in getComments controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create comment
export const createComment = async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;
  const { content } = req.body;
  
  try {
    if (!content || content.trim() === "") {
      return res.status(400).json({ error: "Comment content is required" });
    }

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ error: "Post not found" });

    const comment = await Comment.create({
        user: userId,
        post: postId,
        content,
    });

    // link the comment to the post
    await Post.findByIdAndUpdate(postId, {
        $push: { comments: comment._id },
    });

    // create notification if not commenting on own post
    if (post.user.toString() !== userId.toString()) {
        await Notification.create({
        from: userId,
        to: post.user,
        type: "comment",
        post: postId,
        comment: comment._id,
        });
    }

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error in createComment controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
  
};

// Delete comment
export const deleteComment = async (req, res) => {
  const userId = req.user._id
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: "You can only delete your own comments" });
    }

    // remove comment from post
    await Post.findByIdAndUpdate(comment.post, {
        $pull: { comments: commentId },
    });

    // delete the comment
    await Comment.findByIdAndDelete(commentId);

    res.status(200).json(comment);
  } catch (error) {
    console.error("Error in deleteComment controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  } 
};
