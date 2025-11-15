import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext()

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
  
    const fetchPosts = async () => {
      setLoading(true)
  
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/post`)
        const data = await res.json()
  
        if(!res.ok) throw new Error(data.error || "Fetch posts failed")
  
        setPosts(data)
      } catch (error) {
        console.log("Fetch posts failed", error)
      } finally {
        setLoading(false)
      }
    }

    const addPost = (post) => {
      setPosts((prev) => [post, ...prev])
    };
  
    useEffect(() => {
      fetchPosts()
    }, [])

    return (
      <PostContext.Provider value={{ fetchPosts, posts, addPost, loading }}>
        { children }
      </PostContext.Provider>
    )
}

export const usePosts = () => useContext(PostContext)