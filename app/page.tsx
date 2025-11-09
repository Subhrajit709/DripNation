"use client"

import Link from "next/link"
import { ShoppingCart, Search, User, Zap, Eye, Palette, ChevronRight } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Landing() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const categories = [
    { id: "hoodies", name: "Hoodies", color: "bg-primary" },
    { id: "tees", name: "T-Shirts", color: "bg-secondary" },
    { id: "pants", name: "Pants", color: "bg-accent" },
    { id: "accessories", name: "Accessories", color: "bg-primary" },
    { id: "shoes", name: "Shoes", color: "bg-secondary" },
    { id: "limited", name: "Limited Edition", color: "bg-accent" },
  ]

  const trendingProducts = [
    { id: 1, name: "Cyber Hoodie", price: 7472.17, image: "/futuristic-cyber-hoodie-neon.jpg" },
    { id: 2, name: "Neon Tee", price: 2903.17, image: "/neon-graphic-t-shirt-streetwear.jpg" },
    { id: 3, name: "Tech Pants", price: 6639.17, image: "/futuristic-tech-pants.jpg" },
    { id: 4, name: "Glow Sneakers", price: 10790.17, image: "/glowing-neon-sneakers.jpg" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-black text-primary">
            DRIP-NATION
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/ar-try-on" className="text-sm font-medium hover:text-primary transition-colors">
              AR Try-On
            </Link>
            <Link href="/recommendations" className="text-sm font-medium hover:text-primary transition-colors">
              AI Recommendations
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="p-2 hover:bg-muted rounded-lg transition-all">
              <Search size={20} />
            </button>
            <Link href="/dashboard" className="p-2 hover:bg-muted rounded-lg transition-all">
              <User size={20} />
            </Link>
            <Link href="/cart" className="p-2 hover:bg-muted rounded-lg transition-all relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              The Future of
              <br />
              <span className="text-primary">Smart Shopping</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience premium streetwear with AR try-ons, AI-powered personalization, and 3D product previews.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              Explore Collection
              <ChevronRight size={20} />
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="grid md:grid-cols-3 gap-4 mt-16">
            <div className="p-6 border border-border rounded-lg hover:border-primary/50 transition-all">
              <Eye className="text-primary mb-3" size={24} />
              <h3 className="font-semibold mb-2 text-foreground">AR Try-On</h3>
              <p className="text-sm text-muted-foreground">See how products look on you with advanced AR technology</p>
            </div>
            <div className="p-6 border border-border rounded-lg hover:border-secondary/50 transition-all">
              <Zap className="text-secondary mb-3" size={24} />
              <h3 className="font-semibold mb-2 text-foreground">AI Recommendations</h3>
              <p className="text-sm text-muted-foreground">Get personalized suggestions based on your style</p>
            </div>
            <div className="p-6 border border-border rounded-lg hover:border-accent/50 transition-all">
              <Palette className="text-accent mb-3" size={24} />
              <h3 className="font-semibold mb-2 text-foreground">3D Preview</h3>
              <p className="text-sm text-muted-foreground">Explore products from every angle interactively</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Shop by Category</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                onMouseEnter={() => setHoveredCategory(cat.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`relative h-48 rounded-lg overflow-hidden group cursor-pointer transition-all ${
                  hoveredCategory === cat.id ? "scale-105" : ""
                }`}
              >
                <div className={`absolute inset-0 ${cat.color} opacity-10`}></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="text-2xl font-bold text-foreground">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">Explore</p>
                </div>
                <div
                  className={`absolute inset-0 border-2 border-border rounded-lg group-hover:border-primary/50 transition-all`}
                ></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Trending Now</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group">
                <div className="relative mb-4 rounded-lg overflow-hidden border border-border group-hover:border-primary/50 transition-all h-64">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-4">
                    <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all text-sm">
                      Quick View
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-primary font-bold mt-1">₹{product.price.toLocaleString("en-IN")}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Join the Community</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get exclusive access to limited editions and personalized recommendations
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            Sign Up Today
            <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 bg-card/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4 text-foreground">About</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-foreground">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Returns
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-foreground">Shop</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    All Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Sale
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-foreground">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Drip-Nation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
