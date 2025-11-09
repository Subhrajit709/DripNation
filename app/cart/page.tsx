"use client"

import Link from "next/link"
import { useCart } from "@/app/hooks/use-cart"
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart, isLoading } = useCart()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <p className="text-muted-foreground">Loading cart...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-primary/20 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black text-glow-cyan mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {items.length === 0
              ? "Your cart is empty"
              : `${items.length} item${items.length !== 1 ? "s" : ""} in your cart`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto mb-4 text-muted-foreground/30" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Let's fill it with some amazing Drip products</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all"
            >
              Start Shopping
              <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-6 bg-card border border-primary/20 rounded-lg hover:border-primary/60 transition-all"
                >
                  <div className="w-24 h-24 rounded-lg overflow-hidden border border-primary/30">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-lg hover:text-primary transition-colors">
                      <Link href={`/product/${item.productId}`}>{item.name}</Link>
                    </h3>
                    <div className="text-sm text-muted-foreground mt-1 space-y-1">
                      {item.color && <p>Color: {item.color}</p>}
                      {item.size && <p>Size: {item.size}</p>}
                    </div>
                    <p className="font-bold text-primary mt-3">₹{(item.price * item.quantity * 83).toFixed(2)}</p>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    {/* Quantity */}
                    <div className="flex items-center gap-3 p-2 bg-background rounded-lg border border-primary/30">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1, item.color, item.size)}
                        className="text-primary hover:text-accent transition-colors font-bold"
                      >
                        −
                      </button>
                      <span className="font-bold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1, item.color, item.size)}
                        className="text-primary hover:text-accent transition-colors font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.productId, item.color, item.size)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                      title="Remove from cart"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 p-6 bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/30 rounded-lg space-y-4">
                <h2 className="text-xl font-bold text-glow-magenta">Order Summary</h2>

                <div className="space-y-2 border-t border-secondary/20 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">₹{(total * 83).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold text-accent">{total > 50 ? "FREE" : "₹830"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-semibold">₹{(total * 0.08 * 83).toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-secondary/20 pt-4 flex justify-between items-center">
                  <span className="font-bold">Total</span>
                  <span className="text-2xl font-black text-primary">
                    ₹{((total + (total > 50 ? 0 : 10) + total * 0.08) * 83).toFixed(2)}
                  </span>
                </div>

                <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-all glow-cyan">
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => clearCart()}
                  className="w-full py-2 text-muted-foreground hover:text-foreground transition-colors text-sm underline"
                >
                  Clear Cart
                </button>

                <Link
                  href="/shop"
                  className="block text-center py-2 border border-primary/30 rounded-lg text-primary hover:border-primary/60 transition-all text-sm font-semibold"
                >
                  Continue Shopping
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
