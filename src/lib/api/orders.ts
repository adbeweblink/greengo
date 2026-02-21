// Green購 - 訂單 API Service

import {
  mockOrders,
  simulateDelay,
  paginate,
  type Order,
  type OrderItem,
  orderStatusMap,
  paymentStatusMap,
} from '@/lib/mock-data'

export interface OrderSearchParams {
  status?: Order['status']
  paymentStatus?: Order['paymentStatus']
  companyId?: string
  vendorId?: string
  startDate?: string
  endDate?: string
  keyword?: string
  page?: number
  pageSize?: number
}

export interface OrderSearchResult {
  orders: Order[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface CreateOrderInput {
  items: {
    productId: string
    quantity: number
  }[]
  shippingName: string
  shippingPhone: string
  shippingAddress: string
  shippingNote?: string
  paymentMethod?: Order['paymentMethod']
}

// 取得訂單列表
export async function getOrders(
  params: OrderSearchParams = {}
): Promise<OrderSearchResult> {
  await simulateDelay(300)

  let filtered = [...mockOrders]

  // 狀態篩選
  if (params.status) {
    filtered = filtered.filter((o) => o.status === params.status)
  }

  // 付款狀態篩選
  if (params.paymentStatus) {
    filtered = filtered.filter((o) => o.paymentStatus === params.paymentStatus)
  }

  // 公司篩選
  if (params.companyId) {
    filtered = filtered.filter((o) => o.companyId === params.companyId)
  }

  // 廠商篩選（訂單項目中包含該廠商）
  if (params.vendorId) {
    filtered = filtered.filter((o) =>
      o.items.some((item) => item.vendorId === params.vendorId)
    )
  }

  // 日期範圍篩選
  if (params.startDate) {
    const start = new Date(params.startDate)
    filtered = filtered.filter((o) => new Date(o.createdAt) >= start)
  }
  if (params.endDate) {
    const end = new Date(params.endDate)
    filtered = filtered.filter((o) => new Date(o.createdAt) <= end)
  }

  // 關鍵字搜尋（訂單編號、商品名稱、公司名稱）
  if (params.keyword) {
    const keyword = params.keyword.toLowerCase()
    filtered = filtered.filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(keyword) ||
        o.companyName.toLowerCase().includes(keyword) ||
        o.items.some((item) =>
          item.productName.toLowerCase().includes(keyword)
        )
    )
  }

  // 按建立時間倒序
  filtered.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  // 分頁
  const { data, meta } = paginate(
    filtered,
    params.page || 1,
    params.pageSize || 10
  )

  return {
    orders: data,
    total: meta.total,
    page: meta.page,
    pageSize: meta.pageSize,
    totalPages: meta.totalPages,
  }
}

// 取得單一訂單
export async function getOrderById(id: string): Promise<Order | null> {
  await simulateDelay(200)
  return mockOrders.find((o) => o.id === id) || null
}

// 取得訂單 by 訂單編號
export async function getOrderByNumber(
  orderNumber: string
): Promise<Order | null> {
  await simulateDelay(200)
  return mockOrders.find((o) => o.orderNumber === orderNumber) || null
}

// 建立訂單（模擬）
export async function createOrder(input: CreateOrderInput): Promise<Order> {
  await simulateDelay(500)

  // 模擬建立訂單
  const newOrder: Order = {
    id: `order_${Date.now()}`,
    orderNumber: `GG${new Date().toISOString().slice(0, 10).replace(/-/g, '')}${String(mockOrders.length + 1).padStart(3, '0')}`,
    status: 'PENDING_APPROVAL',
    paymentStatus: 'PENDING',
    paymentMethod: input.paymentMethod || null,
    items: [], // 實際應該從購物車取得完整資訊
    subtotal: 0,
    discount: 0,
    shipping: 0,
    total: 0,
    shippingName: input.shippingName,
    shippingPhone: input.shippingPhone,
    shippingAddress: input.shippingAddress,
    shippingNote: input.shippingNote || null,
    companyId: 'company_001',
    companyName: '綠色科技股份有限公司',
    userId: 'user_001',
    userName: '模擬用戶',
    requireApproval: true,
    approvalStatus: 'PENDING',
    approverName: null,
    esgScore: 85,
    carbonSaved: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    paidAt: null,
    shippedAt: null,
    deliveredAt: null,
  }

  return newOrder
}

// 取消訂單（模擬）
export async function cancelOrder(orderId: string): Promise<Order | null> {
  await simulateDelay(300)

  const order = mockOrders.find((o) => o.id === orderId)
  if (!order) return null

  // 模擬取消（不實際修改 mock 資料）
  return {
    ...order,
    status: 'CANCELLED',
    updatedAt: new Date().toISOString(),
  }
}

// 簽核訂單（模擬）
export async function approveOrder(
  orderId: string,
  approved: boolean,
  approverName: string
): Promise<Order | null> {
  await simulateDelay(300)

  const order = mockOrders.find((o) => o.id === orderId)
  if (!order) return null

  return {
    ...order,
    status: approved ? 'PENDING_PAYMENT' : 'CANCELLED',
    approvalStatus: approved ? 'APPROVED' : 'REJECTED',
    approverName,
    updatedAt: new Date().toISOString(),
  }
}

// 取得訂單狀態對照表
export function getOrderStatusMap() {
  return orderStatusMap
}

// 取得付款狀態對照表
export function getPaymentStatusMap() {
  return paymentStatusMap
}

// 取得待簽核訂單數量
export async function getPendingApprovalCount(
  companyId?: string
): Promise<number> {
  await simulateDelay(100)

  return mockOrders.filter(
    (o) =>
      o.status === 'PENDING_APPROVAL' &&
      (!companyId || o.companyId === companyId)
  ).length
}

// 取得訂單統計
export async function getOrderStats(companyId?: string): Promise<{
  total: number
  pending: number
  processing: number
  completed: number
  cancelled: number
  totalAmount: number
}> {
  await simulateDelay(200)

  const filtered = companyId
    ? mockOrders.filter((o) => o.companyId === companyId)
    : mockOrders

  return {
    total: filtered.length,
    pending: filtered.filter(
      (o) => o.status === 'PENDING_APPROVAL' || o.status === 'PENDING_PAYMENT'
    ).length,
    processing: filtered.filter(
      (o) => o.status === 'PROCESSING' || o.status === 'SHIPPED'
    ).length,
    completed: filtered.filter(
      (o) => o.status === 'COMPLETED' || o.status === 'DELIVERED'
    ).length,
    cancelled: filtered.filter((o) => o.status === 'CANCELLED').length,
    totalAmount: filtered.reduce((sum, o) => sum + o.total, 0),
  }
}
