"use client"

import { createContext, useState, useEffect, useContext } from "react"

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setDarkMode(savedTheme === "dark")
    } else {
      // Check if user prefers dark mode at the OS level
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      setDarkMode(prefersDarkMode)
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light")
    // Save theme preference
    localStorage.setItem("theme", darkMode ? "dark" : "light")
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode)
  }

  const value = {
    darkMode,
    toggleTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
