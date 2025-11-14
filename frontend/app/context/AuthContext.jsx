import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter()

  // Load user/token from AsyncStorage on app start
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const storedToken = await AsyncStorage.getItem("token");
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (err) {
        console.error("Error loading auth data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAuthData();
  }, []);

  // Login 
  const login = async (username, password) => {
    setError(null)
    setLoading(true)

    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username, password})
      })

      const data = await res.json()
      if(!res.ok) throw new Error(data.error || "Login failed")

      const loggedInUser = { _id: data._id, username: data.username }
      await AsyncStorage.setItem("user", JSON.stringify(loggedInUser))
      await AsyncStorage.setItem("token", data.token)

      setUser(loggedInUser)
      setToken(data.token)

      return data

    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // Signup 
  const signup = async (username, password) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      const newUser = { _id: data._id, username: data.username };
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
      await AsyncStorage.setItem("token", data.token);

      setUser(newUser);
      setToken(data.token);

      return data;
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true)
    try {
      await AsyncStorage.removeItem("user")
      await AsyncStorage.removeItem("token")

      setUser(null)
      setToken(null)

      router.replace('/(auth)')
    } catch (error) {
      console.error("Logout error:", error);
      setError(error.message);
    } finally {
      setLoading(false)
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
