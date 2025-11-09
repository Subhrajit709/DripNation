"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { products } from "@/app/data/products"
import { SearchIcon, X } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")

  const results = useMemo(() => {
    if (!searchQuery.trim()) return []

    const query = searchQuery.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query),
    )
  }, [searchQuery])

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-primary/20 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-black text-glow-cyan mb-6">AI Smart Search</h1>

          {/* Search Bar */}
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={24} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products... (e.g., 'neon under ₹4,150' or 'tech hoodies')"
              className="w-full pl-12 pr-4 py-4 bg-card border-2 border-primary/30 rounded-lg focus:border-primary focus:outline-none text-lg"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Search Tips */}
          <div className="mt-4 grid md:grid-cols-3 gap-3 text-sm">
            <button
              onClick={() => setSearchQuery("under ₹4,150")}
              className="text-left p-2 text-muted-foreground hover:text-foreground hover:bg-card/50 rounded transition-all"
            >
              Try: "under ₹4,150"
            </button>
            <button
              onClick={() => setSearchQuery("neon hoodies")}
              className="text-left p-2 text-muted-foreground hover:text-foreground hover:bg-card/50 rounded transition-all"
            >
              Try: "neon hoodies"
            </button>
            <button
              onClick={() => setSearchQuery("cyber streetwear")}
              className="text-left p-2 text-muted-foreground hover:text-foreground hover:bg-card/50 rounded transition-all"
            >
              Try: "cyber streetwear"
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {searchQuery ? (
          <>
            <p className="text-muted-foreground mb-8">
              {results.length === 0
                ? `No results found for "${searchQuery}". Try different keywords.`
                : `Found ${results.length} result${results.length !== 1 ? "s" : ""} for "${searchQuery}"`}
            </p>

            {results.length > 0 && (
              <div className="grid md:grid-cols-4 gap-6">
                {results.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`} className="group">
                    <div className="mb-4 rounded-lg overflow-hidden border border-primary/20 group-hover:border-primary/60 transition-all h-64">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-primary font-bold">₹{(product.price * 83).toFixed(2)}</p>
                      <span className="text-xs text-accent">★ {product.rating}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <SearchIcon size={64} className="mx-auto mb-4 text-muted-foreground/30" />
            <p className="text-muted-foreground text-lg">Start typing to search for products across our collection</p>
          </div>
        )}
      </div>
    </div>
  )
}
