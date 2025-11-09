"use client"

import Link from "next/link"
import { products } from "@/app/data/products"
import { Brain, Heart, TrendingUp } from "lucide-react"

export default function RecommendationsPage() {
  // Simulate AI recommendations based on trending products
  const aiRecommendations = products.sort((a, b) => b.reviews - a.reviews).slice(0, 8)

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-primary/20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black text-glow-cyan mb-2 flex items-center gap-3">
            <Brain size={40} />
            AI-Powered Recommendations
          </h1>
          <p className="text-muted-foreground">Personalized suggestions based on your style</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* AI Info */}
        <div className="mb-12 grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-card border border-primary/20 rounded-lg">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <Brain size={24} className="text-primary" />
            </div>
            <h3 className="font-bold mb-2">Smart Analysis</h3>
            <p className="text-sm text-muted-foreground">AI analyzes your preferences and browsing history</p>
          </div>
          <div className="p-6 bg-card border border-secondary/20 rounded-lg">
            <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp size={24} className="text-secondary" />
            </div>
            <h3 className="font-bold mb-2">Trending Now</h3>
            <p className="text-sm text-muted-foreground">Discover what's popular in the community</p>
          </div>
          <div className="p-6 bg-card border border-accent/20 rounded-lg">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
              <Heart size={24} className="text-accent" />
            </div>
            <h3 className="font-bold mb-2">Perfect Match</h3>
            <p className="text-sm text-muted-foreground">Find items that match your exact style</p>
          </div>
        </div>

        {/* Recommendations */}
        <h2 className="text-3xl font-black text-glow-magenta mb-8">For You</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {aiRecommendations.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group">
              <div className="mb-4 rounded-lg overflow-hidden border border-primary/20 group-hover:border-primary/60 transition-all h-64">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <p className="text-primary font-bold">₹{(product.price * 83).toFixed(2)}</p>
                <span className="text-xs text-accent">★ {product.rating}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">Want more personalized recommendations?</p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-all glow-cyan"
            >
              Create Account
            </Link>
            <Link
              href="/shop"
              className="px-6 py-3 border border-primary/30 rounded-lg font-bold hover:border-primary/60 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
