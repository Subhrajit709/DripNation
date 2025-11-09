"use client"

import type React from "react"

import Link from "next/link"
import { useCart } from "@/app/hooks/use-cart"
import { useAuth } from "@/app/auth/context"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, Package, CheckCircle } from "lucide-react"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState<"shipping" | "payment" | "success">("shipping")
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/shop" className="text-primary hover:underline">
            Back to Shopping
          </Link>
        </div>
      </div>
    )
  }

  const shippingCost = total > 50 ? 0 : 10
  const tax = total * 0.08
  const finalTotal = total + shippingCost + tax

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("payment")
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("success")
    clearCart()
    setTimeout(() => router.push("/dashboard"), 2000)
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20 px-4">
        <div className="text-center max-w-md">
          <CheckCircle size={64} className="mx-auto mb-4 text-accent glow-orange" />
          <h1 className="text-3xl font-black mb-2 text-glow-cyan">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <p className="text-lg font-bold text-primary mb-8">Order Total: ₹{(finalTotal * 83).toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-primary/20 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black text-glow-cyan mb-2">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {/* Progress */}
            <div className="flex gap-4 mb-12">
              <div
                className={`flex-1 py-3 px-4 rounded-lg font-bold text-center transition-all ${
                  step === "shipping" ? "bg-primary text-primary-foreground" : "bg-card border border-primary/30"
                }`}
              >
                Shipping
              </div>
              <div
                className={`flex-1 py-3 px-4 rounded-lg font-bold text-center transition-all ${
                  step === "payment" ? "bg-secondary text-secondary-foreground" : "bg-card border border-primary/30"
                }`}
              >
                Payment
              </div>
            </div>

            {/* Shipping Form */}
            {step === "shipping" && (
              <form
                onSubmit={handleShippingSubmit}
                className="space-y-6 bg-card border border-primary/20 p-8 rounded-lg"
              >
                <h2 className="text-2xl font-bold text-glow-magenta mb-6">Shipping Address</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-2">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">ZIP Code</label>
                    <input
                      type="text"
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-all glow-cyan"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {/* Payment Form */}
            {step === "payment" && (
              <form
                onSubmit={handlePaymentSubmit}
                className="space-y-6 bg-card border border-secondary/20 p-8 rounded-lg"
              >
                <h2 className="text-2xl font-bold text-glow-magenta mb-6 flex items-center gap-2">
                  <CreditCard size={28} />
                  Payment Information
                </h2>

                <div>
                  <label className="block font-semibold mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-secondary/30 rounded-lg focus:border-secondary focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value.replace(/\s/g, "") })}
                    className="w-full px-4 py-3 bg-background border border-secondary/30 rounded-lg focus:border-secondary focus:outline-none"
                    maxLength="19"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-secondary/30 rounded-lg focus:border-secondary focus:outline-none"
                      maxLength="5"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-secondary/30 rounded-lg focus:border-secondary focus:outline-none"
                      maxLength="3"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-secondary text-secondary-foreground rounded-lg font-bold hover:bg-secondary/90 transition-all glow-magenta"
                >
                  Complete Purchase
                </button>

                <button
                  type="button"
                  onClick={() => setStep("shipping")}
                  className="w-full py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Back to Shipping
                </button>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <aside>
            <div className="sticky top-24 p-6 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-lg space-y-4">
              <h2 className="text-xl font-bold text-glow-cyan flex items-center gap-2">
                <Package size={24} />
                Order Summary
              </h2>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm pb-2 border-b border-primary/20">
                    <span className="text-muted-foreground">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-semibold">₹{(item.price * item.quantity * 83).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-primary/20 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{(total * 83).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="font-semibold text-accent">
                    {shippingCost === 0 ? "FREE" : `₹${(shippingCost * 83).toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span className="font-semibold">₹{(tax * 83).toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-primary/20 pt-4 flex justify-between items-center font-bold">
                <span>Total</span>
                <span className="text-2xl text-accent">₹{(finalTotal * 83).toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
