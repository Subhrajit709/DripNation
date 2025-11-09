"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  joinedDate: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("drip-nation-user")
    if (saved) {
      setUser(JSON.parse(saved))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    const mockUser: User = {
      id: "user-" + Date.now(),
      name: email.split("@")[0],
      email,
      joinedDate: new Date().toISOString(),
    }
    setUser(mockUser)
    localStorage.setItem("drip-nation-user", JSON.stringify(mockUser))
  }

  const signup = async (name: string, email: string, password: string) => {
    const mockUser: User = {
      id: "user-" + Date.now(),
      name,
      email,
      joinedDate: new Date().toISOString(),
    }
    setUser(mockUser)
    localStorage.setItem("drip-nation-user", JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("drip-nation-user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (undefined === context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
