// ===========================================
// Green購 企業福利網 - 共用型別定義
// 與 Prisma Schema 同步
// ===========================================

// ==================== 用戶相關 ====================

// 使用者角色 (對應 Prisma UserRole)
export type UserRole =
  | 'BUYER'         // 企業採購人員
  | 'COMPANY_ADMIN' // 企業管理員
  | 'VENDOR'        // 廠商人員
  | 'VENDOR_ADMIN'  // 廠商管理員
  | 'ADMIN'         // 平台管理員
  | 'SUPER_ADMIN'   // 超級管理員

// ==================== 企業相關 ====================

// 方案類型 (對應 Prisma PlanType)
export type PlanType = 'FREE' | 'BASIC' | 'PRO'

// 公司狀態 (對應 Prisma CompanyStatus)
export type CompanyStatus =
  | 'PENDING'   // 待審核
  | 'APPROVED'  // 已通過
  | 'REJECTED'  // 已拒絕
  | 'SUSPENDED' // 已停權

// ==================== 供應商相關 ====================

// 供應商狀態 (對應 Prisma VendorStatus)
export type VendorStatus =
  | 'PENDING'   // 待審核
  | 'APPROVED'  // 已通過
  | 'REJECTED'  // 已拒絕
  | 'SUSPENDED' // 已停權

// ==================== 商品相關 ====================

// 商品狀態 (對應 Prisma ProductStatus)
export type ProductStatus =
  | 'DRAFT'     // 草稿
  | 'PENDING'   // 待審核
  | 'ACTIVE'    // 已上架 (對應 Prisma APPROVED)
  | 'REJECTED'  // 審核未通過
  | 'ARCHIVED'  // 已下架

// ==================== 訂單相關 ====================

// 訂單狀態 (對應 Prisma OrderStatus)
export type OrderStatus =
  | 'PENDING_APPROVAL'  // 待簽核
  | 'PENDING_PAYMENT'   // 待付款
  | 'PROCESSING'        // 處理中
  | 'SHIPPED'           // 已出貨
  | 'DELIVERED'         // 已送達
  | 'COMPLETED'         // 已完成
  | 'CANCELLED'         // 已取消
  | 'REFUNDING'         // 退款中
  | 'REFUNDED'          // 已退款

// 付款狀態 (對應 Prisma PaymentStatus)
export type PaymentStatus =
  | 'PENDING'   // 待付款
  | 'PAID'      // 已付款
  | 'FAILED'    // 付款失敗
  | 'REFUNDED'  // 已退款

// 付款方式 (對應 Prisma PaymentMethod)
export type PaymentMethod =
  | 'CREDIT_CARD'     // 信用卡
  | 'ATM'             // ATM 轉帳
  | 'MONTHLY_BILLING' // 月結

// 發票類型 (對應 Prisma InvoiceType)
export type InvoiceType =
  | 'PERSONAL'  // 個人
  | 'COMPANY'   // 公司
  | 'DONATE'    // 捐贈

// 出貨狀態 (對應 Prisma ShippingStatus)
export type ShippingStatus =
  | 'PENDING'   // 待出貨
  | 'SHIPPED'   // 已出貨
  | 'DELIVERED' // 已送達
  | 'RETURNED'  // 已退貨

// ==================== 簽核相關 ====================

// 簽核狀態 (對應 Prisma ApprovalStatus)
export type ApprovalStatus =
  | 'PENDING'   // 待簽核
  | 'APPROVED'  // 已通過
  | 'REJECTED'  // 已拒絕

// 簽核類型 (對應 Prisma ApprovalType)
export type ApprovalType =
  | 'ORDER'     // 訂單簽核
  | 'INQUIRY'   // 詢價簽核

// ==================== 活動相關 ====================

// 活動類型 (對應 Prisma ActivityType)
export type ActivityType =
  | 'TRAVEL'       // 企業旅遊
  | 'VOLUNTEER'    // 志工活動
  | 'COURSE'       // 課程講座
  | 'TEAMBUILDING' // 團建活動
  | 'WORKSHOP'     // 手作體驗

// 詢價類型 (對應 Prisma InquiryType)
export type InquiryType =
  | 'ACTIVITY'  // 活動詢價
  | 'PRODUCT'   // 商品大量採購
  | 'CUSTOM'    // 客製化需求

// 詢價狀態 (對應 Prisma InquiryStatus)
export type InquiryStatus =
  | 'NEW'        // 新詢價
  | 'PROCESSING' // 處理中
  | 'QUOTED'     // 已報價
  | 'ACCEPTED'   // 已接受
  | 'REJECTED'   // 已拒絕
  | 'EXPIRED'    // 已過期

// ==================== ESG 相關 ====================

// ESG 分類 (對應 Prisma ESGCategory)
export type ESGCategory =
  | 'ENVIRONMENTAL' // 環境
  | 'SOCIAL'        // 社會
  | 'GOVERNANCE'    // 治理

// ==================== 結算相關 ====================

// 結算狀態 (對應 Prisma SettlementStatus)
export type SettlementStatus =
  | 'PENDING'   // 待結算
  | 'CONFIRMED' // 已確認
  | 'PAID'      // 已付款

// 文章狀態 (對應 Prisma PostStatus)
export type PostStatus =
  | 'DRAFT'     // 草稿
  | 'PUBLISHED' // 已發布
  | 'ARCHIVED'  // 已封存

// ==================== 通用介面 ====================

// 導航項目
export interface NavItem {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  disabled?: boolean
  external?: boolean
  badge?: string
}

// 分頁回應
export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
}

// API 回應
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 搜尋參數
export interface SearchParams {
  query?: string
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// ==================== 篩選介面 ====================

// 商品篩選
export interface ProductFilters extends SearchParams {
  categoryId?: string
  vendorId?: string
  minPrice?: number
  maxPrice?: number
  esgCategory?: ESGCategory
  status?: ProductStatus
}

// 訂單篩選
export interface OrderFilters extends SearchParams {
  status?: OrderStatus
  paymentStatus?: PaymentStatus
  companyId?: string
  vendorId?: string
  startDate?: string
  endDate?: string
}

// ==================== 報表介面 ====================

// ESG 報表篩選
export interface ESGReportFilters {
  companyId: string
  startDate: string
  endDate: string
  categories?: ESGCategory[]
}

// ESG 報表摘要
export interface ESGReportSummary {
  totalOrders: number
  totalAmount: number
  totalESGAmount: number
  esgPercentage: number
  byCategory: {
    category: ESGCategory
    amount: number
    percentage: number
    orderCount: number
  }[]
  byMonth: {
    month: string
    amount: number
    esgAmount: number
  }[]
}

// 供應商結算摘要
export interface VendorSettlementSummary {
  vendorId: string
  vendorName: string
  period: string
  totalSales: number
  platformFee: number
  referralFee: number
  netAmount: number
  orderCount: number
  status: SettlementStatus
}

// ==================== Dashboard 統計 ====================

// 首頁統計
export interface DashboardStats {
  totalOrders: number
  pendingOrders: number
  totalRevenue: number
  monthlyRevenue: number
  esgScore: number
  activeVendors: number
}

// 企業 Dashboard 統計
export interface CompanyDashboardStats {
  totalOrders: number
  pendingApprovals: number
  monthlyBudget: number
  monthlySpent: number
  esgScore: number
  carbonReduction: number
}

// 廠商 Dashboard 統計
export interface VendorDashboardStats {
  totalProducts: number
  activeProducts: number
  totalOrders: number
  pendingOrders: number
  monthlyRevenue: number
  rating: number
}

// 管理員 Dashboard 統計
export interface AdminDashboardStats {
  totalCompanies: number
  totalVendors: number
  totalOrders: number
  monthlyGMV: number
  pendingApprovals: number
  activeUsers: number
}
