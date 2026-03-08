'use client'

import { useEffect, useState } from "react"

export default function ThemeProvider({ children }: any) {
  const getInitialTheme = () => {
    if (typeof window === "undefined") return "light"

    const saved = localStorage.getItem("theme")
    if (saved === "dark" || saved === "light") return saved

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  }

  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem("theme", theme)
  }, [theme])

  return children
}