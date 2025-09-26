'use client'

import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check saved preference first
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
      setIsDark(true)
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark')
      setIsDark(false)
    } else {
      // No saved preference, fallback to system
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (systemDark) {
        document.documentElement.classList.add('dark')
        setIsDark(true)
      } else {
        document.documentElement.classList.remove('dark')
        setIsDark(false)
      }
    }
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    if (newIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDark(true)
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setIsDark(false)
    }
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="fixed top-6 right-6 z-50 opacity-50">
        <div className="w-12 h-6 bg-gray-300 rounded-full"></div>
      </div>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={`fixed bottom-6 right-6 z-50 w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isDark 
          ? 'bg-gray-700 focus:ring-gray-600' 
          : 'bg-gray-300 focus:ring-gray-400'
      }`}
    >
      {/* Toggle circle */}
      <div 
        className={`w-4 h-4 rounded-full shadow-sm transition-transform duration-300 flex items-center justify-center ${
          isDark ? 'translate-x-7' : 'translate-x-1'
        }`}
      >
        <span className="text-xs">
          {isDark ? '🌙' : '☀️'}
        </span>
      </div>
    </button>
  )
}
