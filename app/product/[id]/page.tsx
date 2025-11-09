"use client"

import { useState } from "react"
import Link from "next/link"
import { products } from "@/app/data/products"
import { ShoppingCart, Share2 } from "lucide-react"
import { useParams } from "next/navigation"

export default function ProductDetail() {
  const params = useParams()
  const productId = Number.parseInt(params.id as string)
  const product = products.find((p) => p.id === productId)

  // ✅ Safe fallback values
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] ?? "")
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] ?? "")
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/shop" className="text-primary hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")

    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price * 83,
      image: product.image,
      selectedColor,
      selectedSize,
      quantity,
    }

    cart.push(newItem)
    localStorage.setItem("cart", JSON.stringify(cart))

    alert("✅ Added to Cart!")
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Breadcrumb */}
      <div className="border-b border-primary/20 px-4 py-4 bg-card/30">
        <div className="max-w-7xl mx-auto text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link> /
          <Link href="/shop" className="hover:text-primary"> Shop</Link> /
          <span>{product.name}</span>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* IMAGE */}
          <div>
            <div className="rounded-lg overflow-hidden border-2 border-primary/30 aspect-square">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* INFO */}
          <div className="space-y-6">
            <h1 className="text-4xl font-black">{product.name}</h1>
            <p className="text-4xl font-black text-accent">
              ₹{(product.price * 83).toFixed(2)}
            </p>

            {/* ✅ SAFE COLOR SECTION */}
            {product.colors?.length ? (
              <div>
                <h3 className="font-bold mb-3">Color</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 ${
                        selectedColor === color 
                          ? "border-primary bg-primary/20"
                          : "border-primary/30 hover:border-primary/60"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {/* ✅ SAFE SIZE SECTION */}
            {product.sizes?.length ? (
              <div>
                <h3 className="font-bold mb-3">Size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-lg border-2 font-semibold ${
                        selectedSize === size
                          ? "border-primary bg-primary/20"
                          : "border-primary/30 hover:border-primary/60"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {/* QUANTITY */}
            <div>
              <h3 className="font-bold mb-3">Quantity</h3>
              <div className="flex items-center gap-4 p-3 border border-primary/30 rounded-lg w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span className="font-bold w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={24} />
                Add to Cart
              </button>

              <button className="p-4 rounded-lg border-2 border-primary/30 hover:border-primary/60">
                <Share2 size={24} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
