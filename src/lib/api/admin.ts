// Green購 - Admin API Service

import {
  mockVendors,
  mockOrders,
  mockProducts,
  simulateDelay,
} from '@/lib/mock-data'
import type { AdminDashboardStats } from './dashboard'

// 取得管理員 Dashboard 統計
export async function getAdminStats(): Promise<AdminDashboardStats> {
  await simulateDelay(300)

  // 計算統計資料
  const now = new Date()
  const thisMonth = now.getMonth()
  const thisYear = now.getFullYear()

  const monthlyOrders = mockOrders.filter((order) => {
    const orderDate = new Date(order.createdAt)
    return orderDate.getMonth() === thisMonth && orderDate.getFullYear() === thisYear
  })

  const monthlyGMV = monthlyOrders.reduce((sum, order) => sum + order.total, 0)

  return {
    totalCompanies: 512,
    totalVendors: mockVendors.length,
    totalOrders: mockOrders.length,
    monthlyGMV,
    pendingApprovals: mockVendors.filter((v) => v.status === 'PENDING').length + 3, // 加上模擬的企業申請
    activeUsers: 1680,
  }
}

// 待審核項目型別
export interface PendingApproval {
  id: string
  type: 'vendor' | 'company' | 'product'
  name: string
  description: string
  date: string
  status: 'pending'
}

// 取得待審核項目
export async function getPendingApprovals(limit: number = 10): Promise<PendingApproval[]> {
  await simulateDelay(200)

  // 取得待審核廠商
  const pendingVendors: PendingApproval[] = mockVendors
    .filter((v) => v.status === 'PENDING')
    .slice(0, 5)
    .map((vendor) => ({
      id: vendor.id,
      type: 'vendor' as const,
      name: vendor.name,
      description: vendor.description.slice(0, 50) + '...',
      date: new Date(vendor.createdAt).toLocaleDateString('zh-TW'),
      status: 'pending' as const,
    }))

  // 模擬待審核企業
  const pendingCompanies: PendingApproval[] = [
    {
      id: 'company_pending_001',
      type: 'company' as const,
      name: '創新科技股份有限公司',
      description: '半導體產業，員工 500 人',
      date: '2026-02-20',
      status: 'pending' as const,
    },
    {
      id: 'company_pending_002',
      type: 'company' as const,
      name: '永續發展有限公司',
      description: '綠能產業，員工 120 人',
      date: '2026-02-19',
      status: 'pending' as const,
    },
  ]

  // 模擬待審核商品
  const pendingProducts: PendingApproval[] = mockProducts
    .filter((p) => p.status === 'DRAFT')
    .slice(0, 3)
    .map((product) => ({
      id: product.id,
      type: 'product' as const,
      name: product.name,
      description: `${product.vendor.name} - NT$ ${product.price}`,
      date: new Date(product.createdAt).toLocaleDateString('zh-TW'),
      status: 'pending' as const,
    }))

  return [...pendingVendors, ...pendingCompanies, ...pendingProducts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}

// 最近活動型別
export interface AdminActivity {
  id: string
  type: 'order' | 'vendor' | 'company' | 'product' | 'system'
  action: string
  detail: string
  time: string
  timestamp: string
}

// 取得最近活動
export async function getAdminActivities(limit: number = 10): Promise<AdminActivity[]> {
  await simulateDelay(200)

  // 根據訂單生成活動
  const orderActivities: AdminActivity[] = mockOrders
    .slice(0, 3)
    .map((order) => ({
      id: `act_order_${order.id}`,
      type: 'order' as const,
      action: order.status === 'COMPLETED' ? '訂單完成' : '新訂單成立',
      detail: `${order.orderNumber} - NT$ ${order.total.toLocaleString()}`,
      time: getRelativeTime(order.createdAt),
      timestamp: order.createdAt,
    }))

  // 模擬其他活動
  const otherActivities: AdminActivity[] = [
    {
      id: 'act_vendor_001',
      type: 'vendor' as const,
      action: '供應商上架商品',
      detail: '綠色工坊 - 環保帆布袋',
      time: '15 分鐘前',
      timestamp: '2026-02-22T10:15:00Z',
    },
    {
      id: 'act_company_001',
      type: 'company' as const,
      action: '企業完成註冊',
      detail: '永續發展有限公司',
      time: '1 小時前',
      timestamp: '2026-02-22T09:30:00Z',
    },
    {
      id: 'act_system_001',
      type: 'system' as const,
      action: '系統自動備份完成',
      detail: '資料庫備份成功',
      time: '3 小時前',
      timestamp: '2026-02-22T07:00:00Z',
    },
  ]

  return [...orderActivities, ...otherActivities]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)
}

// 系統狀態型別
export interface SystemStatus {
  service: string
  status: 'online' | 'degraded' | 'offline'
  latency?: number
  lastCheck: string
}

// 取得系統狀態
export async function getSystemStatus(): Promise<SystemStatus[]> {
  await simulateDelay(150)

  return [
    {
      service: 'API 服務',
      status: 'online' as const,
      latency: 45,
      lastCheck: new Date().toISOString(),
    },
    {
      service: '金流服務',
      status: 'online' as const,
      latency: 120,
      lastCheck: new Date().toISOString(),
    },
    {
      service: '資料庫',
      status: 'online' as const,
      latency: 12,
      lastCheck: new Date().toISOString(),
    },
    {
      service: 'CDN 服務',
      status: 'online' as const,
      latency: 8,
      lastCheck: new Date().toISOString(),
    },
    {
      service: 'Email 服務',
      status: 'online' as const,
      latency: 200,
      lastCheck: new Date().toISOString(),
    },
  ]
}

// 取得平台營收趨勢
export async function getRevenueTrend(
  period: 'week' | 'month' | 'quarter' = 'month'
): Promise<{ date: string; revenue: number; orders: number; gmv: number }[]> {
  await simulateDelay(300)

  const days = period === 'week' ? 7 : period === 'month' ? 30 : 90
  const data: { date: string; revenue: number; orders: number; gmv: number }[] = []
  const now = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const gmv = Math.floor(Math.random() * 500000) + 200000
    data.push({
      date: date.toISOString().slice(0, 10),
      gmv,
      revenue: Math.floor(gmv * 0.1), // 假設平台抽成 10%
      orders: Math.floor(Math.random() * 100) + 30,
    })
  }

  return data
}

// 取得廠商排名
export async function getTopVendorsAdmin(limit: number = 5): Promise<{
  id: string
  name: string
  totalSales: number
  orderCount: number
  rating: number
  status: string
}[]> {
  await simulateDelay(200)

  return mockVendors
    .filter((v) => v.status === 'APPROVED')
    .sort((a, b) => b.totalSales - a.totalSales)
    .slice(0, limit)
    .map((vendor) => ({
      id: vendor.id,
      name: vendor.name,
      totalSales: vendor.totalSales,
      orderCount: vendor.orderCount,
      rating: vendor.rating,
      status: vendor.status,
    }))
}

// 輔助函式：取得相對時間
function getRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return '剛剛'
  if (diffMins < 60) return `${diffMins} 分鐘前`
  if (diffHours < 24) return `${diffHours} 小時前`
  if (diffDays < 7) return `${diffDays} 天前`
  return date.toLocaleDateString('zh-TW')
}

// 匯出類型
export type { AdminDashboardStats }
