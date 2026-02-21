'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import {
  getCart,
  addToCart as apiAddToCart,
  updateCartItem as apiUpdateCartItem,
  removeFromCart as apiRemoveFromCart,
  clearCart as apiClearCart,
  getCartSummary,
  type Cart,
  type CartItem,
} from '@/lib/api/cart'

interface CartSummary {
  subtotal: number
  discount: number
  shipping: number
  total: number
  itemCount: number
  esgScore: number
  carbonSaved: number
}

interface CartContextType {
  cart: Cart
  summary: CartSummary
  loading: boolean
  addToCart: (productId: string, quantity?: number) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const defaultSummary: CartSummary = {
  subtotal: 0,
  discount: 0,
  shipping: 0,
  total: 0,
  itemCount: 0,
  esgScore: 0,
  carbonSaved: 0,
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [], subtotal: 0, itemCount: 0 })
  const [summary, setSummary] = useState<CartSummary>(defaultSummary)
  const [loading, setLoading] = useState(true)

  const refreshCart = useCallback(async () => {
    try {
      const [cartData, summaryData] = await Promise.all([
        getCart(),
        getCartSummary(),
      ])
      setCart(cartData)
      setSummary(summaryData)
    } catch (error) {
      console.error('Failed to refresh cart:', error)
    }
  }, [])

  useEffect(() => {
    const initCart = async () => {
      setLoading(true)
      await refreshCart()
      setLoading(false)
    }
    initCart()
  }, [refreshCart])

  const addToCart = useCallback(
    async (productId: string, quantity: number = 1) => {
      try {
        await apiAddToCart(productId, quantity)
        await refreshCart()
      } catch (error) {
        console.error('Failed to add to cart:', error)
        throw error
      }
    },
    [refreshCart]
  )

  const updateQuantity = useCallback(
    async (productId: string, quantity: number) => {
      try {
        await apiUpdateCartItem(productId, quantity)
        await refreshCart()
      } catch (error) {
        console.error('Failed to update cart item:', error)
        throw error
      }
    },
    [refreshCart]
  )

  const removeItem = useCallback(
    async (productId: string) => {
      try {
        await apiRemoveFromCart(productId)
        await refreshCart()
      } catch (error) {
        console.error('Failed to remove from cart:', error)
        throw error
      }
    },
    [refreshCart]
  )

  const clearCartItems = useCallback(async () => {
    try {
      await apiClearCart()
      await refreshCart()
    } catch (error) {
      console.error('Failed to clear cart:', error)
      throw error
    }
  }, [refreshCart])

  return (
    <CartContext.Provider
      value={{
        cart,
        summary,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart: clearCartItems,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
