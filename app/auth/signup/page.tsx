"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/auth/context"
import { UserPlus, ArrowRight } from "lucide-react"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)

    try {
      await signup(name, email, password)
      router.push("/dashboard")
    } catch (err) {
      setError("Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center pt-20 px-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-secondary/5 via-background to-accent/5 p-8 rounded-lg border border-secondary/20">
          <Link href="/" className="text-glow-magenta text-2xl font-black mb-8 block">
            DRIP-NATION
          </Link>

          <h1 className="text-3xl font-black mb-2">Join The Drip</h1>
          <p className="text-muted-foreground mb-8">Create your account and start shopping</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 bg-card border border-secondary/30 rounded-lg focus:border-secondary focus:outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-card border border-secondary/30 rounded-lg focus:border-secondary focus:outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full px-4 py-3 bg-card border border-secondary/30 rounded-lg focus:border-secondary focus:outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 bg-card border border-secondary/30 rounded-lg focus:border-secondary focus:outline-none transition-all"
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
              className="w-full py-3 bg-secondary text-secondary-foreground rounded-lg font-bold hover:bg-secondary/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 glow-magenta mt-6"
            >
              <UserPlus size={20} />
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-secondary hover:underline font-semibold">
              Sign in
            </Link>
          </p>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-secondary hover:text-accent transition-colors mt-8"
          >
            <ArrowRight size={18} />
            Continue as guest
          </Link>
        </div>
      </div>
    </div>
  )
}
