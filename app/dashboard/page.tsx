"use client"

import { useAuth } from "@/app/auth/context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect } from "react"
import { LogOut, ShoppingBag, Heart, Settings, User, Package } from "lucide-react"

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, router])

  if (!user) return null

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-primary/20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black text-glow-cyan mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-card border border-primary/20 rounded-lg p-6 space-y-2">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                  <User size={32} className="text-background" />
                </div>
                <h2 className="font-bold text-lg">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Member since {new Date(user.joinedDate).toLocaleDateString()}
                </p>
              </div>

              <nav className="space-y-1">
                <button className="w-full text-left px-4 py-3 rounded-lg bg-primary/20 border border-primary/50 text-foreground font-semibold transition-all flex items-center gap-2">
                  <ShoppingBag size={18} />
                  Orders
                </button>
                <Link
                  href="#"
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-card text-muted-foreground hover:text-foreground transition-all flex items-center gap-2"
                >
                  <Heart size={18} />
                  Wishlist
                </Link>
                <Link
                  href="#"
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-card text-muted-foreground hover:text-foreground transition-all flex items-center gap-2"
                >
                  <Settings size={18} />
                  Settings
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-destructive/10 text-destructive transition-all flex items-center gap-2 mt-4"
                >
                  <LogOut size={18} />
                  Log Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Recent Orders */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-glow-magenta flex items-center gap-2">
                  <Package size={24} />
                  Recent Orders
                </h2>
                <Link href="/shop" className="text-primary hover:text-accent transition-colors font-semibold">
                  Continue Shopping
                </Link>
              </div>

              <div className="bg-card border border-primary/20 rounded-lg p-8 text-center">
                <Package size={48} className="mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground mb-4">No orders yet</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Start exploring our collection and make your first purchase
                </p>
                <Link
                  href="/shop"
                  className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all"
                >
                  Shop Now
                </Link>
              </div>
            </section>

            {/* Wishlist */}
            <section>
              <h2 className="text-2xl font-bold text-glow-magenta mb-6 flex items-center gap-2">
                <Heart size={24} />
                Wishlist
              </h2>

              <div className="bg-card border border-secondary/20 rounded-lg p-8 text-center">
                <Heart size={48} className="mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Add items from our shop to keep track of products you love
                </p>
              </div>
            </section>

            {/* Account Stats */}
            <section>
              <h2 className="text-2xl font-bold text-glow-cyan mb-6">Your Stats</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-muted-foreground text-sm mb-2">Total Orders</p>
                  <p className="text-3xl font-black text-primary">0</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-lg">
                  <p className="text-muted-foreground text-sm mb-2">Total Spent</p>
                  <p className="text-3xl font-black text-secondary">₹0.00</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-lg">
                  <p className="text-muted-foreground text-sm mb-2">Wishlist Items</p>
                  <p className="text-3xl font-black text-accent">0</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
