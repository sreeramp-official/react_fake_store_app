"use client"

import { createContext, useState, useEffect, useContext } from "react"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on initial load
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    if (token && user) {
      setCurrentUser(JSON.parse(user))
    }

    setLoading(false)
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login
      if (email && password) {
        const userData = {
          id: 1,
          email,
          name: email.split("@")[0],
        }

        // Simulate JWT token
        const token = `fake-jwt-token-${Math.random().toString(36).substring(2)}`

        // Store in localStorage
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(userData))

        setCurrentUser(userData)
        return { success: true }
      }
      return { success: false, message: "Invalid credentials" }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  // Register function
  const register = async (name, email, password) => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful registration
      if (name && email && password) {
        const userData = {
          id: 1,
          email,
          name,
        }

        // Simulate JWT token
        const token = `fake-jwt-token-${Math.random().toString(36).substring(2)}`

        // Store in localStorage
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(userData))

        setCurrentUser(userData)
        return { success: true }
      }
      return { success: false, message: "Invalid registration data" }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
