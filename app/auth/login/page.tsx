"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/auth/context"
import { LogIn, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid credentials")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center pt-20 px-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-8 rounded-lg border border-primary/20">
          <Link href="/" className="text-glow-cyan text-2xl font-black mb-8 block">
            DRIP-NATION
          </Link>

          <h1 className="text-3xl font-black mb-2">Welcome Back</h1>
          <p className="text-muted-foreground mb-8">Sign in to your Drip account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-card border border-primary/30 rounded-lg focus:border-primary focus:outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-card border border-primary/30 rounded-lg focus:border-primary focus:outline-none transition-all"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 glow-cyan mt-6"
            >
              <LogIn size={20} />
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline font-semibold">
              Sign up
            </Link>
          </p>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-primary hover:text-accent transition-colors mt-8"
          >
            <ArrowRight size={18} />
            Continue as guest
          </Link>
        </div>
      </div>
    </div>
  )
}
