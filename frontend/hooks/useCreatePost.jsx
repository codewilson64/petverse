import { useState } from "react"
import { useAuth } from "../app/context/AuthContext"

export const useCreatePost = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { token } = useAuth()

  const createPost = async (content) => {
    if(!token) throw new Error("Unauthorized — no token found")
    if(!content?.trim()) return setError("Post cannot be empty")

    setError(null)
    setLoading(true)

    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/post`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({content})
      })

      const data = await res.json()
      if(!res.ok) throw new Error(data.error || "Posting failed")
      
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