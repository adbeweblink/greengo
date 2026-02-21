// Green購 - Dashboard API Service

import {
  mockDashboardStats,
  mockESGReport,
  mockOrders,
  mockVendors,
  mockProducts,
  simulateDelay,
} from '@/lib/mock-data'

// Dashboard 統計資料型別
export interface CompanyDashboardStats {
  totalOrders: number
  pendingOrders: number
  monthlySpending: number
  esgScore: number
  carbonSaved: number
  employeesUsed: number
}

export interface VendorDashboardStats {
  totalProducts: number
  activeProducts: number
  totalOrders: number
  pendingOrders: number
  monthlyRevenue: number
  rating: number
}

export interface AdminDashboardStats {
  totalCompanies: number
  totalVendors: number
  totalOrders: number
  monthlyGMV: number
  pendingApprovals: number
  activeUsers: number
}

// 取得企業 Dashboard 統計
export async function getCompanyDashboardStats(): Promise<CompanyDashboardStats> {
  await simulateDelay(300)
  return mockDashboardStats.company
}

// 取得廠商 Dashboard 統計
export async function getVendorDashboardStats(): Promise<VendorDashboardStats> {
  await simulateDelay(300)
  return mockDashboardStats.vendor
}

// 取得管理員 Dashboard 統計
export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  await simulateDelay(300)
  return mockDashboardStats.admin
}

// ESG 報告型別
export interface ESGReportSummary {
  totalAmount: number
  esgAmount: number
  esgPercentage: number
  carbonSaved: number
  treesEquivalent: number
}

export interface ESGCategoryData {
  category: string
  label: string
  amount: number
  percentage: number
}

export interface ESGMonthlyData {
  month: string
  amount: number
  esgAmount: number
}

export interface ESGTopVendor {
  name: string
  amount: number
  esgScore: number
}

export interface ESGReport {
  summary: ESGReportSummary
  byCategory: ESGCategoryData[]
  byMonth: ESGMonthlyData[]
  topVendors: ESGTopVendor[]
}

// 取得 ESG 報告
export async function getESGReport(): Promise<ESGReport> {
  await simulateDelay(400)
  return mockESGReport
}

// 取得最近訂單（Dashboard 用）
export async function getRecentOrders(limit: number = 5) {
  await simulateDelay(200)

  return [...mockOrders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
    .map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      total: order.total,
      createdAt: order.createdAt,
      companyName: order.companyName,
      itemCount: order.items.length,
    }))
}

// 取得待處理事項
export async function getPendingTasks(): Promise<{
  pendingApprovals: number
  pendingPayments: number
  pendingShipments: number
  pendingVendors: number
}> {
  await simulateDelay(200)

  return {
    pendingApprovals: mockOrders.filter((o) => o.status === 'PENDING_APPROVAL').length,
    pendingPayments: mockOrders.filter((o) => o.status === 'PENDING_PAYMENT').length,
    pendingShipments: mockOrders.filter((o) => o.status === 'PROCESSING').length,
    pendingVendors: mockVendors.filter((v) => v.status === 'PENDING').length,
  }
}

// 取得銷售趨勢（圖表用）
export async function getSalesTrend(
  period: 'week' | 'month' | 'quarter' = 'month'
): Promise<{ date: string; amount: number; orders: number }[]> {
  await simulateDelay(300)

  // 模擬資料
  const data: { date: string; amount: number; orders: number }[] = []
  const now = new Date()
  const days = period === 'week' ? 7 : period === 'month' ? 30 : 90

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().slice(0, 10),
      amount: Math.floor(Math.random() * 500000) + 100000,
      orders: Math.floor(Math.random() * 20) + 5,
    })
  }

  return data
}

// 取得分類銷售統計
export async function getCategorySales(): Promise<
  { category: string; amount: number; percentage: number }[]
> {
  await simulateDelay(200)

  // 根據 mock 商品計算
  const categoryMap = new Map<string, number>()

  mockProducts.forEach((product) => {
    const current = categoryMap.get(product.category.name) || 0
    categoryMap.set(product.category.name, current + product.price * product.soldCount)
  })

  const total = Array.from(categoryMap.values()).reduce((sum, val) => sum + val, 0)

  return Array.from(categoryMap.entries()).map(([category, amount]) => ({
    category,
    amount,
    percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
  }))
}

// 取得熱門商品（Dashboard 用）
export async function getTopProducts(limit: number = 5) {
  await simulateDelay(200)

  return [...mockProducts]
    .sort((a, b) => b.soldCount - a.soldCount)
    .slice(0, limit)
    .map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      soldCount: product.soldCount,
      revenue: product.price * product.soldCount,
      image: product.images[0],
    }))
}

// 取得熱門廠商（Dashboard 用）
export async function getTopVendors(limit: number = 5) {
  await simulateDelay(200)

  return [...mockVendors]
    .filter((v) => v.status === 'APPROVED')
    .sort((a, b) => b.totalSales - a.totalSales)
    .slice(0, limit)
    .map((vendor) => ({
      id: vendor.id,
      name: vendor.name,
      totalSales: vendor.totalSales,
      orderCount: vendor.orderCount,
      rating: vendor.rating,
      esgScore: vendor.esgScore,
      logo: vendor.logo,
    }))
}

// 取得活動紀錄（Dashboard 用）
export async function getRecentActivities(limit: number = 10): Promise<
  {
    id: string
    type: 'order' | 'approval' | 'vendor' | 'product'
    title: string
    description: string
    timestamp: string
  }[]
> {
  await simulateDelay(200)

  // 模擬活動紀錄
  return [
    {
      id: 'act_001',
      type: 'order' as const,
      title: '新訂單',
      description: '綠色科技股份有限公司 下了一筆 $45,600 的訂單',
      timestamp: '2026-02-22T10:30:00Z',
    },
    {
      id: 'act_002',
      type: 'approval' as const,
      title: '訂單簽核',
      description: '李總經理 核准了訂單 GG20260220003',
      timestamp: '2026-02-22T09:15:00Z',
    },
    {
      id: 'act_003',
      type: 'vendor' as const,
      title: '新廠商申請',
      description: '「永續農場」提交了廠商進駐申請',
      timestamp: '2026-02-21T16:45:00Z',
    },
    {
      id: 'act_004',
      type: 'product' as const,
      title: '商品上架',
      description: '花蓮蜂農合作社 上架了新商品「龍眼蜜禮盒」',
      timestamp: '2026-02-21T14:20:00Z',
    },
    {
      id: 'act_005',
      type: 'order' as const,
      title: '訂單完成',
      description: '訂單 GG20260215001 已完成配送',
      timestamp: '2026-02-20T11:00:00Z',
    },
  ].slice(0, limit)
}
