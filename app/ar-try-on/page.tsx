"use client"

import Link from "next/link"
import { Eye, Zap } from "lucide-react"

export default function ARTryOnPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-primary/20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black text-glow-cyan mb-2">AR Try-On Experience</h1>
          <p className="text-muted-foreground">See how products look on you in real-time</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* AR Viewer */}
          <div>
            <div className="aspect-video bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-lg border-2 border-primary/30 flex items-center justify-center mb-6">
              <div className="text-center">
                <Eye size={64} className="mx-auto mb-4 text-primary/50" />
                <p className="text-muted-foreground text-lg mb-2">Camera Feed</p>
                <p className="text-sm text-muted-foreground">Position product in frame</p>
                <button className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all glow-cyan">
                  Enable Camera
                </button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Allow camera access to use the AR try-on feature. Your device will overlay Drip-Nation products in
              real-time.
            </p>
          </div>

          {/* Instructions */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-glow-magenta mb-4">How AR Try-On Works</h2>
              <div className="space-y-4">
                <div className="p-4 bg-card border border-primary/20 rounded-lg">
                  <h3 className="font-bold text-primary mb-2">1. Select a Product</h3>
                  <p className="text-muted-foreground text-sm">
                    Choose any item from our collection that supports AR try-on
                  </p>
                </div>
                <div className="p-4 bg-card border border-secondary/20 rounded-lg">
                  <h3 className="font-bold text-secondary mb-2">2. Enable Camera Access</h3>
                  <p className="text-muted-foreground text-sm">
                    Allow permission to use your device camera for the experience
                  </p>
                </div>
                <div className="p-4 bg-card border border-accent/20 rounded-lg">
                  <h3 className="font-bold text-accent mb-2">3. Position & Preview</h3>
                  <p className="text-muted-foreground text-sm">
                    Center yourself in frame and see how the product looks on you
                  </p>
                </div>
                <div className="p-4 bg-card border border-primary/20 rounded-lg">
                  <h3 className="font-bold text-primary mb-2">4. Customize & Buy</h3>
                  <p className="text-muted-foreground text-sm">Choose colors, sizes, and add to cart when satisfied</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/30 p-6 rounded-lg">
              <h3 className="font-bold text-secondary mb-3 flex items-center gap-2">
                <Zap size={20} />
                Supported Products
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Hoodies & Jackets</li>
                <li>• T-Shirts & Tees</li>
                <li>• Accessories</li>
                <li>• Footwear & Shoes</li>
              </ul>
            </div>

            <Link
              href="/shop"
              className="block text-center py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-all glow-cyan"
            >
              Start AR Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
