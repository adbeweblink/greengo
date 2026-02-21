import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合併 Tailwind CSS 類名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 格式化金額（新台幣）
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * 格式化日期
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d)
}

/**
 * 格式化日期時間
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

/**
 * 延遲函數
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 產生隨機訂單編號
 */
export function generateOrderNumber(): string {
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `GG${year}${month}${day}${random}`
}

/**
 * 驗證統一編號
 */
export function validateTaxId(taxId: string): boolean {
  if (!/^\d{8}$/.test(taxId)) return false

  const weights = [1, 2, 1, 2, 1, 2, 4, 1]
  let sum = 0

  for (let i = 0; i < 8; i++) {
    const product = parseInt(taxId[i]) * weights[i]
    sum += Math.floor(product / 10) + (product % 10)
  }

  // 第 7 碼為 7 時，可能有兩種有效值
  if (taxId[6] === '7') {
    return sum % 10 === 0 || (sum + 1) % 10 === 0
  }

  return sum % 10 === 0
}

/**
 * 驗證手機號碼（台灣格式）
 */
export function validatePhone(phone: string): boolean {
  return /^09\d{8}$/.test(phone)
}

/**
 * 驗證 Email
 */
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * 截斷文字
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

/**
 * 取得 ESG 分類的中文名稱
 */
export function getESGCategoryName(category: 'ENVIRONMENTAL' | 'SOCIAL' | 'GOVERNANCE'): string {
  const names = {
    ENVIRONMENTAL: '環境永續',
    SOCIAL: '社會責任',
    GOVERNANCE: '公司治理',
  }
  return names[category]
}

/**
 * 取得訂單狀態的中文名稱
 */
export function getOrderStatusName(status: string): string {
  const names: Record<string, string> = {
    PENDING: '待處理',
    APPROVED: '已核准',
    REJECTED: '已駁回',
    PROCESSING: '處理中',
    SHIPPED: '已出貨',
    DELIVERED: '已送達',
    COMPLETED: '已完成',
    CANCELLED: '已取消',
  }
  return names[status] || status
}

/**
 * 取得付款狀態的中文名稱
 */
export function getPaymentStatusName(status: string): string {
  const names: Record<string, string> = {
    PENDING: '待付款',
    PAID: '已付款',
    FAILED: '付款失敗',
    REFUNDED: '已退款',
    CREDITED: '月結掛帳',
  }
  return names[status] || status
}
