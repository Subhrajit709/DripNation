"use client"

import { useState } from "react"
import Link from "next/link"
import { products } from "@/app/data/products"
import { ShoppingCart, Heart, Share2, Eye, Zap } from "lucide-react"
import { useParams } from "next/navigation"

export default function ProductDetail() {
  const params = useParams()
  const productId = Number.parseInt(params.id as string)
  const product = products.find((p) => p.id === productId)

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0])
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0])
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showAR, setShowAR] = useState(false)
  const [show3D, setShow3D] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
          <Link href="/shop" className="text-primary hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Breadcrumb */}
      <div className="border-b border-primary/20 px-4 py-4 bg-card/30">
        <div className="max-w-7xl mx-auto text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          {" / "}
          <Link href="/shop" className="hover:text-primary transition-colors">
            Shop
          </Link>
          {" / "}
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative rounded-lg overflow-hidden border-2 border-primary/30 group aspect-square">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 bg-accent text-background text-xs font-bold px-3 py-1 rounded-full">
                Sustainability: {product.sustainabilityScore.toFixed(1)}/10
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
            </div>

            {/* AR & 3D Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowAR(!showAR)}
                className="w-full p-4 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/50 rounded-lg hover:border-primary hover:from-primary/30 transition-all flex items-center justify-center gap-2 font-semibold group"
              >
                <Eye size={20} className="group-hover:text-primary transition-colors" />
                AR Try-On
              </button>
              <button
                onClick={() => setShow3D(!show3D)}
                className="w-full p-4 bg-gradient-to-r from-secondary/20 to-secondary/10 border border-secondary/50 rounded-lg hover:border-secondary hover:from-secondary/30 transition-all flex items-center justify-center gap-2 font-semibold group"
              >
                <Zap size={20} className="group-hover:text-secondary transition-colors" />
                3D Preview
              </button>
            </div>

            {/* AR Try-On Demo */}
            {showAR && (
              <div className="p-6 bg-card border-2 border-primary/50 rounded-lg">
                <h4 className="font-bold mb-4 text-primary">AR Try-On Experience</h4>
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center border border-primary/30">
                  <div className="text-center">
                    <Eye size={48} className="mx-auto mb-4 text-primary/50" />
                    <p className="text-muted-foreground">AR Camera Ready</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Position product in frame to see how it looks on you
                    </p>
                    <button className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all">
                      Start AR
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3D Preview Demo */}
            {show3D && (
              <div className="p-6 bg-card border-2 border-secondary/50 rounded-lg">
                <h4 className="font-bold mb-4 text-secondary">3D Interactive Preview</h4>
                <div className="aspect-video bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg flex items-center justify-center border border-secondary/30">
                  <div className="text-center">
                    <Zap size={48} className="mx-auto mb-4 text-secondary/50" />
                    <p className="text-muted-foreground">3D Model Viewer</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Drag to rotate • Scroll to zoom • Click to inspect
                    </p>
                    <button className="mt-4 px-6 py-2 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-all">
                      Load 3D Model
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-black text-glow-cyan mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-accent text-xl">★</span>
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                <span className="text-sm px-3 py-1 bg-primary/20 text-primary rounded-full">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            <div className="border-y border-primary/20 py-6">
              <p className="text-lg text-muted-foreground mb-4">{product.description}</p>
              <p className="text-4xl font-black text-accent">₹{(product.price * 83).toFixed(2)}</p>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-bold mb-3">Color</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedColor === color
                          ? "border-primary bg-primary/20 text-foreground"
                          : "border-primary/30 hover:border-primary/60"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-bold mb-3">Size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-lg border-2 font-semibold transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary/20 text-foreground"
                          : "border-primary/30 hover:border-primary/60"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-bold mb-3">Quantity</h3>
              <div className="flex items-center gap-4 p-3 bg-card border border-primary/30 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-lg hover:text-primary transition-colors"
                >
                  −
                </button>
                <span className="font-bold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-lg hover:text-primary transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 glow-cyan">
                <ShoppingCart size={24} />
                Add to Cart
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-4 rounded-lg font-bold transition-all border-2 ${
                  isWishlisted
                    ? "bg-secondary/20 border-secondary text-secondary glow-magenta"
                    : "bg-card border-primary/30 hover:border-primary/60 text-muted-foreground"
                }`}
              >
                <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
              <button className="p-4 rounded-lg border-2 border-primary/30 hover:border-primary/60 text-muted-foreground hover:text-foreground transition-all">
                <Share2 size={24} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-primary/20">
              <div className="p-4 bg-card border border-primary/20 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Free Shipping</p>
                <p className="font-bold">Orders over ₹4,150</p>
              </div>
              <div className="p-4 bg-card border border-primary/20 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Easy Returns</p>
                <p className="font-bold">30 days</p>
              </div>
              <div className="p-4 bg-card border border-primary/20 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Sustainability</p>
                <p className="font-bold text-accent">{product.sustainabilityScore}/10</p>
              </div>
              <div className="p-4 bg-card border border-primary/20 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Premium Material</p>
                <p className="font-bold">Tech Fabric</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-primary/20">
            <h2 className="text-3xl font-black mb-8 text-glow-magenta">Related Products</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="group">
                  <div className="mb-4 rounded-lg overflow-hidden border border-primary/20 group-hover:border-primary/60 transition-all h-48">
                    <img
                      src={p.image || "/placeholder.svg"}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">{p.name}</h3>
                  <p className="text-primary font-bold mt-2">₹{(p.price * 83).toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
