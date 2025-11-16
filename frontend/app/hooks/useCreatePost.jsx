import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { usePosts } from "../context/PostContext"

export const useCreatePost = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { token } = useAuth()
  const { addPost } = usePosts()

  const createPost = async (formData) => {
    if(!token) throw new Error("Unauthorized — no token found")
    setError(null)
    setLoading(true)

    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/post`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      })

      const data = await res.json()
      if(!res.ok) throw new Error(data.error || "Posting failed")
      
      addPost(data)  
      
      return data
    } catch (error) {
      console.error("Create post error:", error);
      setError(error.message);
    } finally {
      setLoading(false)
    }
  }

  return { createPost, loading, error }
}