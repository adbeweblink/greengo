// Green購 - Vendor API Service

import {
  mockVendors,
  mockOrders,
  mockProducts,
  simulateDelay,
} from '@/lib/mock-data'
import type { VendorDashboardStats } from './dashboard'

// 取得廠商資料
export async function getVendorById(vendorId: string) {
  await simulateDelay(200)
  return mockVendors.find((v) => v.id === vendorId) || null
}

// 取得廠商 Dashboard 統計（依廠商 ID）
export async function getVendorStats(vendorId: string): Promise<VendorDashboardStats> {
  await simulateDelay(300)

  const vendor = mockVendors.find((v) => v.id === vendorId)

  // 計算該廠商的訂單統計
  const vendorOrders = mockOrders.filter((order) =>
    order.items.some((item) => item.vendorId === vendorId)
  )

  const pendingOrders = vendorOrders.filter(
    (o) => o.status === 'PROCESSING' || o.status === 'PENDING_PAYMENT'
  ).length

  // 計算本月營收
  const now = new Date()
  const thisMonth = now.getMonth()
  const thisYear = now.getFullYear()
  const monthlyRevenue = vendorOrders
    .filter((order) => {
      const orderDate = new Date(order.createdAt)
      return orderDate.getMonth() === thisMonth && orderDate.getFullYear() === thisYear
    })
    .reduce((sum, order) => {
      const vendorItems = order.items.filter((item) => item.vendorId === vendorId)
      return sum + vendorItems.reduce((s, item) => s + item.subtotal, 0)
    }, 0)

  // 計算該廠商的商品數量
  const vendorProducts = mockProducts.filter((p) => p.vendor.id === vendorId)
  const activeProducts = vendorProducts.filter((p) => p.status === 'ACTIVE').length

  return {
    totalProducts: vendor?.productCount || vendorProducts.length,
    activeProducts,
    totalOrders: vendor?.orderCount || vendorOrders.length,
    pendingOrders,
    monthlyRevenue,
    rating: vendor?.rating || 4.5,
  }
}

// 廠商訂單摘要（Dashboard 用）
export interface VendorOrderSummary {
  id: string
  orderNumber: string
  buyer: string
  products: { name: string; qty: number }[]
  total: number
  status: string
  statusLabel: string
  statusColor: string
  date: string
}

// 取得廠商的最近訂單
export async function getVendorRecentOrders(
  vendorId: string,
  limit: number = 5
): Promise<VendorOrderSummary[]> {
  await simulateDelay(200)

  const statusMap: Record<string, { label: string; color: string }> = {
    PENDING_APPROVAL: { label: '待簽核', color: 'bg-yellow-100 text-yellow-700' },
    PENDING_PAYMENT: { label: '待付款', color: 'bg-orange-100 text-orange-700' },
    PROCESSING: { label: '待出貨', color: 'bg-amber-100 text-amber-700' },
    SHIPPED: { label: '已出貨', color: 'bg-blue-100 text-blue-700' },
    DELIVERED: { label: '已送達', color: 'bg-indigo-100 text-indigo-700' },
    COMPLETED: { label: '已完成', color: 'bg-green-100 text-green-700' },
    CANCELLED: { label: '已取消', color: 'bg-gray-100 text-gray-700' },
  }

  // 篩選包含該廠商商品的訂單
  return mockOrders
    .filter((order) => order.items.some((item) => item.vendorId === vendorId))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
    .map((order) => {
      const vendorItems = order.items.filter((item) => item.vendorId === vendorId)
      const vendorTotal = vendorItems.reduce((sum, item) => sum + item.subtotal, 0)
      const statusInfo = statusMap[order.status] || { label: order.status, color: 'bg-gray-100 text-gray-700' }

      return {
        id: order.id,
        orderNumber: order.orderNumber,
        buyer: order.companyName,
        products: vendorItems.map((item) => ({
          name: item.productName,
          qty: item.quantity,
        })),
        total: vendorTotal,
        status: order.status,
        statusLabel: statusInfo.label,
        statusColor: statusInfo.color,
        date: new Date(order.createdAt).toLocaleDateString('zh-TW'),
      }
    })
}

// 廠商商品摘要
export interface VendorProductSummary {
  id: string
  name: string
  price: number
  stock: number
  views: number
  sales: number
  status: string
}

// 取得廠商的商品列表
export async function getVendorProducts(
  vendorId: string,
  limit: number = 5
): Promise<VendorProductSummary[]> {
  await simulateDelay(200)

  return mockProducts
    .filter((p) => p.vendor.id === vendorId)
    .slice(0, limit)
    .map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      views: Math.floor(Math.random() * 2000) + 500, // 模擬瀏覽數
      sales: product.soldCount,
      status: product.status,
    }))
}

// 廠商銷售趨勢
export async function getVendorSalesTrend(
  vendorId: string,
  period: 'week' | 'month' = 'week'
): Promise<{ date: string; revenue: number; orders: number }[]> {
  await simulateDelay(300)

  const days = period === 'week' ? 7 : 30
  const data: { date: string; revenue: number; orders: number }[] = []
  const now = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().slice(0, 10),
      revenue: Math.floor(Math.random() * 50000) + 10000,
      orders: Math.floor(Math.random() * 10) + 1,
    })
  }

  return data
}

// 廠商通知
export interface VendorNotification {
  id: string
  type: 'order' | 'review' | 'system' | 'payment'
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

// 取得廠商通知
export async function getVendorNotifications(
  vendorId: string,
  limit: number = 10
): Promise<VendorNotification[]> {
  await simulateDelay(200)

  // 模擬通知資料
  return [
    {
      id: 'notif_001',
      type: 'order' as const,
      title: '新訂單通知',
      message: '您有一筆新訂單 GG20260220003 待處理',
      isRead: false,
      createdAt: '2026-02-22T10:30:00Z',
    },
    {
      id: 'notif_002',
      type: 'review' as const,
      title: '新評價',
      message: '台灣在地蜂蜜禮盒收到 5 星好評',
      isRead: false,
      createdAt: '2026-02-22T08:15:00Z',
    },
    {
      id: 'notif_003',
      type: 'payment' as const,
      title: '款項入帳',
      message: '訂單 GG20260215001 款項 $45,600 已入帳',
      isRead: true,
      createdAt: '2026-02-21T16:00:00Z',
    },
    {
      id: 'notif_004',
      type: 'system' as const,
      title: '庫存提醒',
      message: '「有機茶葉禮盒」庫存不足 100 件',
      isRead: true,
      createdAt: '2026-02-20T09:00:00Z',
    },
  ].slice(0, limit)
}

// 取得廠商評價統計
export async function getVendorReviewStats(vendorId: string): Promise<{
  averageRating: number
  totalReviews: number
  distribution: { stars: number; count: number; percentage: number }[]
  recentReviews: {
    id: string
    rating: number
    comment: string
    productName: string
    buyerName: string
    date: string
  }[]
}> {
  await simulateDelay(300)

  const vendor = mockVendors.find((v) => v.id === vendorId)

  return {
    averageRating: vendor?.rating || 4.5,
    totalReviews: vendor?.reviewCount || 0,
    distribution: [
      { stars: 5, count: Math.floor((vendor?.reviewCount || 100) * 0.65), percentage: 65 },
      { stars: 4, count: Math.floor((vendor?.reviewCount || 100) * 0.20), percentage: 20 },
      { stars: 3, count: Math.floor((vendor?.reviewCount || 100) * 0.10), percentage: 10 },
      { stars: 2, count: Math.floor((vendor?.reviewCount || 100) * 0.03), percentage: 3 },
      { stars: 1, count: Math.floor((vendor?.reviewCount || 100) * 0.02), percentage: 2 },
    ],
    recentReviews: [
      {
        id: 'review_001',
        rating: 5,
        comment: '蜂蜜品質很好，送禮大方！',
        productName: '台灣在地蜂蜜禮盒',
        buyerName: '王**',
        date: '2026-02-20',
      },
      {
        id: 'review_002',
        rating: 4,
        comment: '包裝精美，物流快速',
        productName: '龍眼蜜禮盒',
        buyerName: '李**',
        date: '2026-02-18',
      },
    ],
  }
}
