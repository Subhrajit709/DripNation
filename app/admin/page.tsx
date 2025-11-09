"use client"

import { useState } from "react"
import Link from "next/link"
import { products } from "@/app/data/products"
import { Plus, Edit, Trash2, BarChart3, Users, Package, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "users" | "orders">("overview")
  const [showAddProduct, setShowAddProduct] = useState(false)

  // Mock data
  const stats = [
    { label: "Total Revenue", value: "₹20,42,310", icon: TrendingUp, color: "primary" },
    { label: "Total Orders", value: "342", icon: Package, color: "secondary" },
    { label: "Total Users", value: "1,248", icon: Users, color: "accent" },
    { label: "Products", value: String(products.length), icon: BarChart3, color: "primary" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Admin Header */}
      <div className="fixed top-0 z-50 w-full bg-card border-b border-primary/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin" className="text-xl font-black text-glow-cyan">
            DRIP-NATION ADMIN
          </Link>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">Help</button>
            <button className="px-4 py-2 text-destructive hover:text-destructive/90 transition-colors">Logout</button>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-glow-cyan mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your Drip-Nation store</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              const colorClass =
                stat.color === "primary"
                  ? "border-primary/30"
                  : stat.color === "secondary"
                    ? "border-secondary/30"
                    : "border-accent/30"
              const textColorClass =
                stat.color === "primary"
                  ? "text-primary"
                  : stat.color === "secondary"
                    ? "text-secondary"
                    : "text-accent"
              return (
                <div key={idx} className={`p-6 bg-card border ${colorClass} rounded-lg`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                      <p className={`text-3xl font-black ${textColorClass}`}>{stat.value}</p>
                    </div>
                    <Icon size={32} className={`${textColorClass}/30`} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-primary/20 pb-4">
            {(["overview", "products", "users", "orders"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-semibold transition-all capitalize ${
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-glow-magenta mb-4">Welcome to Admin Panel</h2>
                <p className="text-muted-foreground mb-6">
                  Manage your Drip-Nation store including products, orders, users, and analytics. Everything you need to
                  run a successful streetwear empire.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <button className="p-4 bg-card border border-primary/30 rounded-lg hover:border-primary/60 transition-all text-left">
                    <h3 className="font-bold text-primary mb-1">Add Product</h3>
                    <p className="text-sm text-muted-foreground">Create new items</p>
                  </button>
                  <button className="p-4 bg-card border border-secondary/30 rounded-lg hover:border-secondary/60 transition-all text-left">
                    <h3 className="font-bold text-secondary mb-1">View Orders</h3>
                    <p className="text-sm text-muted-foreground">Manage all orders</p>
                  </button>
                  <button className="p-4 bg-card border border-accent/30 rounded-lg hover:border-accent/60 transition-all text-left">
                    <h3 className="font-bold text-accent mb-1">Analytics</h3>
                    <p className="text-sm text-muted-foreground">View sales data</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-glow-cyan">Products</h2>
                <button
                  onClick={() => setShowAddProduct(!showAddProduct)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all glow-cyan"
                >
                  <Plus size={20} />
                  Add Product
                </button>
              </div>

              {showAddProduct && (
                <div className="mb-8 p-6 bg-card border border-primary/20 rounded-lg">
                  <h3 className="text-lg font-bold mb-4">New Product</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Product Name"
                      className="px-4 py-2 bg-background border border-primary/30 rounded-lg"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      className="px-4 py-2 bg-background border border-primary/30 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      className="px-4 py-2 bg-background border border-primary/30 rounded-lg"
                    />
                    <input
                      type="number"
                      placeholder="Stock"
                      className="px-4 py-2 bg-background border border-primary/30 rounded-lg"
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    className="w-full mt-4 px-4 py-2 bg-background border border-primary/30 rounded-lg"
                    rows={3}
                  />
                  <div className="flex gap-2 mt-4">
                    <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all">
                      Save Product
                    </button>
                    <button
                      onClick={() => setShowAddProduct(false)}
                      className="px-6 py-2 border border-primary/30 rounded-lg hover:bg-card transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 bg-card border border-primary/20 rounded-lg hover:border-primary/60 transition-all"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          ₹{(product.price * 83).toFixed(2)} • {product.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          product.inStock ? "bg-accent/20 text-accent" : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                      <button className="p-2 hover:bg-background rounded-lg transition-all text-muted-foreground hover:text-foreground">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 hover:bg-destructive/10 rounded-lg transition-all text-muted-foreground hover:text-destructive">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div>
              <h2 className="text-2xl font-bold text-glow-magenta mb-6">Users</h2>
              <div className="bg-card border border-secondary/20 rounded-lg p-8 text-center">
                <Users size={48} className="mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-muted-foreground">User management interface</p>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-bold text-glow-cyan mb-6">Orders</h2>
              <div className="bg-card border border-primary/20 rounded-lg p-8 text-center">
                <Package size={48} className="mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-muted-foreground">Order management interface</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
