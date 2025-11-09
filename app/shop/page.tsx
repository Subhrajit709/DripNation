"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { products } from "@/app/data/products"
import { ChevronDown, Filter } from "lucide-react"

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedSort, setSelectedSort] = useState<string>("trending")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 16600])
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const categories = ["all", "hoodies", "tees", "pants", "shoes", "accessories", "limited"]

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter(
      (p) =>
        (selectedCategory === "all" || p.category === selectedCategory) &&
        p.price >= priceRange[0] &&
        p.price <= priceRange[1],
    )

    if (selectedSort === "price-low") filtered.sort((a, b) => a.price - b.price)
    if (selectedSort === "price-high") filtered.sort((a, b) => b.price - a.price)
    if (selectedSort === "rating") filtered.sort((a, b) => b.rating - a.rating)
    if (selectedSort === "trending") filtered.sort((a, b) => b.reviews - a.reviews)

    return filtered
  }, [selectedCategory, selectedSort, priceRange])

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="border-b border-border py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Shop Collection</h1>
          <p className="text-muted-foreground">Explore our premium streetwear collection</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`hidden lg:block w-64 flex-shrink-0`}>
            <div className="space-y-8 sticky top-24">
              <div>
                <h3 className="font-bold text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all capitalize text-sm ${
                        selectedCategory === cat
                          ? "bg-primary text-primary-foreground font-medium"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat === "all" ? "All Products" : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-bold text-lg mb-4">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="16600"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">₹{priceRange[0].toLocaleString("en-IN")}</span>
                    <span className="text-primary font-bold">₹{priceRange[1].toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              {/* Sustainability Filter */}
              <div>
                <h3 className="font-bold text-lg mb-4">Sustainability</h3>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-muted-foreground">High Impact (8.0+)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-muted-foreground">Sustainable Materials</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
              <p className="text-muted-foreground text-sm">Showing {filteredAndSortedProducts.length} products</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted text-sm font-medium"
                >
                  <Filter size={18} />
                  Filters
                </button>
                <div className="relative">
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="appearance-none px-4 py-2 border border-border rounded-lg hover:border-primary/50 cursor-pointer pr-10 text-sm font-medium bg-background"
                  >
                    <option value="trending">Trending</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="group">
                  <div className="relative mb-4 rounded-lg overflow-hidden border border-border group-hover:border-primary/50 transition-all h-64">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-lg">
                      {product.sustainabilityScore.toFixed(1)}/10
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-4">
                      <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all text-sm">
                        View Details
                      </button>
                    </div>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <p className="text-white font-bold">Out of Stock</p>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-sm">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-primary font-bold text-sm">₹{(product.price * 83).toFixed(2)}</p>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-accent">★</span>
                      <span className="text-muted-foreground text-xs">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
