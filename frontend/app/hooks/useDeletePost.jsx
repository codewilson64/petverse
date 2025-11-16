import { useState } from "react";
import { usePosts } from "../context/PostContext";
import { useAuth } from "../context/AuthContext";

export const useDeletePost = () => {
  const [loadingDeleteId, setLoadingDeleteId] = useState(false)
  const [error, setError] = useState(null)
  const { token } = useAuth()
  const { deletePost } = usePosts()

  const handleDeletePost = async (postId) => {
    setLoadingDeleteId(postId)
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/post/delete/${postId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    deletePost(postId)

    } catch (error) {
      console.log("Delete post failed", error)
      setError(error.message) 
    } finally {
      setLoadingDeleteId(false)
    }
  }

  return { deletePost: handleDeletePost, loadingDeleteId, error }
}
