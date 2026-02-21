// Green購 - 購物車 API Service
// 使用 localStorage 儲存購物車狀態

import { mockProducts, simulateDelay, type Product } from '@/lib/mock-data'

export interface CartItem {
  productId: string
  product: Product
  quantity: number
  addedAt: string
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  itemCount: number
}

const CART_STORAGE_KEY = 'greengo_cart'

// 取得購物車
export async function getCart(): Promise<Cart> {
  await simulateDelay(100)

  if (typeof window === 'undefined') {
    return { items: [], subtotal: 0, itemCount: 0 }
  }

  const stored = localStorage.getItem(CART_STORAGE_KEY)
  if (!stored) {
    return { items: [], subtotal: 0, itemCount: 0 }
  }

  try {
    const cartData = JSON.parse(stored) as { productId: string; quantity: number; addedAt: string }[]

    // 重新組裝購物車，確保商品資料是最新的
    const items: CartItem[] = cartData
      .map((item) => {
        const product = mockProducts.find((p) => p.id === item.productId)
        if (!product) return null
        return {
          productId: item.productId,
          product,
          quantity: item.quantity,
          addedAt: item.addedAt,
        }
      })
      .filter((item): item is CartItem => item !== null)

    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return { items, subtotal, itemCount }
  } catch {
    return { items: [], subtotal: 0, itemCount: 0 }
  }
}

// 儲存購物車到 localStorage
function saveCart(
  items: { productId: string; quantity: number; addedAt: string }[]
): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

// 新增商品到購物車
export async function addToCart(
  productId: string,
  quantity: number = 1
): Promise<Cart> {
  await simulateDelay(200)

  const product = mockProducts.find((p) => p.id === productId)
  if (!product) {
    throw new Error('商品不存在')
  }

  if (quantity < 1) {
    throw new Error('數量必須大於 0')
  }

  if (quantity > product.stock) {
    throw new Error('庫存不足')
  }

  const cart = await getCart()
  const existingIndex = cart.items.findIndex(
    (item) => item.productId === productId
  )

  let updatedItems: { productId: string; quantity: number; addedAt: string }[]

  if (existingIndex >= 0) {
    // 更新數量
    const newQuantity = cart.items[existingIndex].quantity + quantity
    if (newQuantity > product.stock) {
      throw new Error('超過庫存數量')
    }
    updatedItems = cart.items.map((item, index) =>
      index === existingIndex
        ? { productId: item.productId, quantity: newQuantity, addedAt: item.addedAt }
        : { productId: item.productId, quantity: item.quantity, addedAt: item.addedAt }
    )
  } else {
    // 新增項目
    updatedItems = [
      ...cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        addedAt: item.addedAt,
      })),
      { productId, quantity, addedAt: new Date().toISOString() },
    ]
  }

  saveCart(updatedItems)
  return getCart()
}

// 更新購物車項目數量
export async function updateCartItem(
  productId: string,
  quantity: number
): Promise<Cart> {
  await simulateDelay(200)

  if (quantity < 0) {
    throw new Error('數量不能為負數')
  }

  if (quantity === 0) {
    return removeFromCart(productId)
  }

  const product = mockProducts.find((p) => p.id === productId)
  if (!product) {
    throw new Error('商品不存在')
  }

  if (quantity > product.stock) {
    throw new Error('超過庫存數量')
  }

  const cart = await getCart()
  const existingIndex = cart.items.findIndex(
    (item) => item.productId === productId
  )

  if (existingIndex < 0) {
    throw new Error('購物車中沒有此商品')
  }

  const updatedItems = cart.items.map((item, index) =>
    index === existingIndex
      ? { productId: item.productId, quantity, addedAt: item.addedAt }
      : { productId: item.productId, quantity: item.quantity, addedAt: item.addedAt }
  )

  saveCart(updatedItems)
  return getCart()
}

// 從購物車移除商品
export async function removeFromCart(productId: string): Promise<Cart> {
  await simulateDelay(200)

  const cart = await getCart()
  const updatedItems = cart.items
    .filter((item) => item.productId !== productId)
    .map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      addedAt: item.addedAt,
    }))

  saveCart(updatedItems)
  return getCart()
}

// 清空購物車
export async function clearCart(): Promise<Cart> {
  await simulateDelay(100)

  if (typeof window !== 'undefined') {
    localStorage.removeItem(CART_STORAGE_KEY)
  }

  return { items: [], subtotal: 0, itemCount: 0 }
}

// 計算購物車摘要
export async function getCartSummary(): Promise<{
  subtotal: number
  discount: number
  shipping: number
  total: number
  itemCount: number
  esgScore: number
  carbonSaved: number
}> {
  await simulateDelay(100)

  const cart = await getCart()

  // 計算折扣（模擬：滿 10000 打 95 折）
  const discount = cart.subtotal >= 10000 ? Math.round(cart.subtotal * 0.05) : 0

  // 運費（模擬：滿 5000 免運）
  const shipping = cart.subtotal >= 5000 ? 0 : 100

  // 計算平均 ESG 分數
  const esgScore =
    cart.items.length > 0
      ? Math.round(
          cart.items.reduce(
            (sum, item) => sum + item.product.esgScore * item.quantity,
            0
          ) / cart.itemCount
        )
      : 0

  // 計算減碳量（模擬）
  const carbonSaved = cart.items.reduce(
    (sum, item) => sum + (item.product.carbonSaved || 0) * item.quantity,
    0
  )

  return {
    subtotal: cart.subtotal,
    discount,
    shipping,
    total: cart.subtotal - discount + shipping,
    itemCount: cart.itemCount,
    esgScore,
    carbonSaved,
  }
}

// 檢查購物車項目是否有效（庫存檢查）
export async function validateCart(): Promise<{
  valid: boolean
  invalidItems: { productId: string; reason: string }[]
}> {
  await simulateDelay(200)

  const cart = await getCart()
  const invalidItems: { productId: string; reason: string }[] = []

  for (const item of cart.items) {
    const product = mockProducts.find((p) => p.id === item.productId)

    if (!product) {
      invalidItems.push({ productId: item.productId, reason: '商品已下架' })
    } else if (product.status !== 'ACTIVE') {
      invalidItems.push({ productId: item.productId, reason: '商品已停售' })
    } else if (item.quantity > product.stock) {
      invalidItems.push({
        productId: item.productId,
        reason: `庫存不足，僅剩 ${product.stock} 件`,
      })
    }
  }

  return {
    valid: invalidItems.length === 0,
    invalidItems,
  }
}
