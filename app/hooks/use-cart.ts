"use client"

import { useEffect, useState } from "react"

export interface CartItem {
  productId: number
  name: string
  price: number
  quantity: number
  color?: string
  size?: string
  image: string
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("drip-nation-cart")
    if (saved) {
      setItems(JSON.parse(saved))
    }
    setIsLoading(false)
  }, [])

  // Save cart to localStorage
  const saveCart = (newItems: CartItem[]) => {
    setItems(newItems)
    localStorage.setItem("drip-nation-cart", JSON.stringify(newItems))
  }

  const addItem = (item: CartItem) => {
    const existing = items.find((i) => i.productId === item.productId && i.color === item.color && i.size === item.size)
    if (existing) {
      saveCart(items.map((i) => (i === existing ? { ...i, quantity: i.quantity + item.quantity } : i)))
    } else {
      saveCart([...items, item])
    }
  }

  const removeItem = (productId: number, color?: string, size?: string) => {
    saveCart(items.filter((i) => !(i.productId === productId && i.color === color && i.size === size)))
  }

  const updateQuantity = (productId: number, quantity: number, color?: string, size?: string) => {
    if (quantity <= 0) {
      removeItem(productId, color, size)
    } else {
      saveCart(
        items.map((i) => (i.productId === productId && i.color === color && i.size === size ? { ...i, quantity } : i)),
      )
    }
  }

  const clearCart = () => {
    saveCart([])
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    itemCount,
    isLoading,
  }
}
