// Green購 - Mock 資料統一匯出

export * from './products'
export * from './orders'
export * from './vendors'

// 模擬 API 延遲
export const simulateDelay = (ms: number = 500) =>
  new Promise(resolve => setTimeout(resolve, ms))

// 模擬分頁
export function paginate<T>(
  items: T[],
  page: number = 1,
  pageSize: number = 12
): {
  data: T[]
  meta: {
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
} {
  const total = items.length
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  const end = start + pageSize

  return {
    data: items.slice(start, end),
    meta: {
      total,
      page,
      pageSize,
      totalPages,
    },
  }
}

// Dashboard 統計資料
export const mockDashboardStats = {
  company: {
    totalOrders: 156,
    pendingOrders: 3,
    monthlySpending: 385000,
    esgScore: 87,
    carbonSaved: 125.5,
    employeesUsed: 89,
  },
  vendor: {
    totalProducts: 45,
    activeProducts: 38,
    totalOrders: 234,
    pendingOrders: 12,
    monthlyRevenue: 680000,
    rating: 4.7,
  },
  admin: {
    totalCompanies: 156,
    totalVendors: 48,
    totalOrders: 2340,
    monthlyGMV: 12500000,
    pendingApprovals: 8,
    activeUsers: 1250,
  },
}

// ESG 報告資料
export const mockESGReport = {
  summary: {
    totalAmount: 2850000,
    esgAmount: 2280000,
    esgPercentage: 80,
    carbonSaved: 450.5,
    treesEquivalent: 15,
  },
  byCategory: [
    { category: 'ENVIRONMENTAL', label: '環境', amount: 1200000, percentage: 52.6 },
    { category: 'SOCIAL', label: '社會', amount: 850000, percentage: 37.3 },
    { category: 'GOVERNANCE', label: '治理', amount: 230000, percentage: 10.1 },
  ],
  byMonth: [
    { month: '2026-01', amount: 380000, esgAmount: 304000 },
    { month: '2026-02', amount: 420000, esgAmount: 336000 },
    { month: '2025-12', amount: 350000, esgAmount: 280000 },
    { month: '2025-11', amount: 400000, esgAmount: 320000 },
    { month: '2025-10', amount: 380000, esgAmount: 304000 },
    { month: '2025-09', amount: 360000, esgAmount: 288000 },
  ],
  topVendors: [
    { name: '綠色旅遊聯盟', amount: 680000, esgScore: 92 },
    { name: '花蓮蜂農合作社', amount: 420000, esgScore: 85 },
    { name: '海洋守護協會', amount: 380000, esgScore: 95 },
    { name: 'ESG 學院', amount: 320000, esgScore: 88 },
    { name: '綠色工坊', amount: 280000, esgScore: 90 },
  ],
}
