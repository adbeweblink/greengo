// Green購 - Mock 訂單資料

export interface OrderItem {
  id: string
  productId: string
  productName: string
  productImage: string
  price: number
  quantity: number
  subtotal: number
  vendorId: string
  vendorName: string
}

export interface Order {
  id: string
  orderNumber: string
  status: 'PENDING_APPROVAL' | 'PENDING_PAYMENT' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'COMPLETED' | 'CANCELLED'
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
  paymentMethod: 'CREDIT_CARD' | 'ATM' | 'MONTHLY_BILLING' | null
  items: OrderItem[]
  subtotal: number
  discount: number
  shipping: number
  total: number
  // 收件資訊
  shippingName: string
  shippingPhone: string
  shippingAddress: string
  shippingNote: string | null
  // 企業資訊
  companyId: string
  companyName: string
  userId: string
  userName: string
  // 簽核
  requireApproval: boolean
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | null
  approverName: string | null
  // ESG
  esgScore: number
  carbonSaved: number // kg
  // 時間
  createdAt: string
  updatedAt: string
  paidAt: string | null
  shippedAt: string | null
  deliveredAt: string | null
}

export const mockOrders: Order[] = [
  {
    id: 'order_001',
    orderNumber: 'GG20260215001',
    status: 'COMPLETED',
    paymentStatus: 'PAID',
    paymentMethod: 'MONTHLY_BILLING',
    items: [
      {
        id: 'item_001',
        productId: 'prod_001',
        productName: '台灣在地蜂蜜禮盒',
        productImage: '/images/products/honey-1.jpg',
        price: 680,
        quantity: 50,
        subtotal: 34000,
        vendorId: 'vendor_001',
        vendorName: '花蓮蜂農合作社',
      },
      {
        id: 'item_002',
        productId: 'prod_005',
        productName: '環保竹製餐具組禮盒',
        productImage: '/images/products/bamboo-1.jpg',
        price: 280,
        quantity: 50,
        subtotal: 14000,
        vendorId: 'vendor_005',
        vendorName: '綠色工坊',
      },
    ],
    subtotal: 48000,
    discount: 2400,
    shipping: 0,
    total: 45600,
    shippingName: '王經理',
    shippingPhone: '0912-345-678',
    shippingAddress: '台北市信義區信義路五段7號',
    shippingNote: '請於上班時間送達',
    companyId: 'company_001',
    companyName: '綠色科技股份有限公司',
    userId: 'user_001',
    userName: '王小明',
    requireApproval: true,
    approvalStatus: 'APPROVED',
    approverName: '李總經理',
    esgScore: 87,
    carbonSaved: 25.5,
    createdAt: '2026-02-15T09:30:00Z',
    updatedAt: '2026-02-18T14:00:00Z',
    paidAt: '2026-02-16T10:00:00Z',
    shippedAt: '2026-02-17T08:00:00Z',
    deliveredAt: '2026-02-18T14:00:00Z',
  },
  {
    id: 'order_002',
    orderNumber: 'GG20260218002',
    status: 'PROCESSING',
    paymentStatus: 'PAID',
    paymentMethod: 'CREDIT_CARD',
    items: [
      {
        id: 'item_003',
        productId: 'prod_002',
        productName: '阿里山生態之旅（二日）',
        productImage: '/images/products/alishan-1.jpg',
        price: 4500,
        quantity: 25,
        subtotal: 112500,
        vendorId: 'vendor_002',
        vendorName: '綠色旅遊聯盟',
      },
    ],
    subtotal: 112500,
    discount: 5625,
    shipping: 0,
    total: 106875,
    shippingName: '張人資',
    shippingPhone: '0922-333-444',
    shippingAddress: '台北市內湖區內湖路一段88號',
    shippingNote: '員工旅遊，預計3/15出發',
    companyId: 'company_002',
    companyName: '永續能源股份有限公司',
    userId: 'user_002',
    userName: '張美美',
    requireApproval: true,
    approvalStatus: 'APPROVED',
    approverName: '陳董事長',
    esgScore: 92,
    carbonSaved: 0,
    createdAt: '2026-02-18T14:20:00Z',
    updatedAt: '2026-02-19T09:00:00Z',
    paidAt: '2026-02-18T14:25:00Z',
    shippedAt: null,
    deliveredAt: null,
  },
  {
    id: 'order_003',
    orderNumber: 'GG20260220003',
    status: 'PENDING_APPROVAL',
    paymentStatus: 'PENDING',
    paymentMethod: null,
    items: [
      {
        id: 'item_004',
        productId: 'prod_003',
        productName: '淨灘志工活動（半日）',
        productImage: '/images/products/beach-1.jpg',
        price: 350,
        quantity: 40,
        subtotal: 14000,
        vendorId: 'vendor_003',
        vendorName: '海洋守護協會',
      },
      {
        id: 'item_005',
        productId: 'prod_007',
        productName: '有機棉環保購物袋',
        productImage: '/images/products/cotton-bag-1.jpg',
        price: 180,
        quantity: 40,
        subtotal: 7200,
        vendorId: 'vendor_006',
        vendorName: '有機生活館',
      },
    ],
    subtotal: 21200,
    discount: 0,
    shipping: 0,
    total: 21200,
    shippingName: '林行政',
    shippingPhone: '0933-555-666',
    shippingAddress: '新北市板橋區中山路一段168號',
    shippingNote: null,
    companyId: 'company_001',
    companyName: '綠色科技股份有限公司',
    userId: 'user_003',
    userName: '林小華',
    requireApproval: true,
    approvalStatus: 'PENDING',
    approverName: null,
    esgScore: 95,
    carbonSaved: 8.0,
    createdAt: '2026-02-20T11:00:00Z',
    updatedAt: '2026-02-20T11:00:00Z',
    paidAt: null,
    shippedAt: null,
    deliveredAt: null,
  },
  {
    id: 'order_004',
    orderNumber: 'GG20260221004',
    status: 'PENDING_PAYMENT',
    paymentStatus: 'PENDING',
    paymentMethod: 'ATM',
    items: [
      {
        id: 'item_006',
        productId: 'prod_004',
        productName: 'ESG 永續策略工作坊',
        productImage: '/images/products/workshop-1.jpg',
        price: 12000,
        quantity: 15,
        subtotal: 180000,
        vendorId: 'vendor_004',
        vendorName: 'ESG 學院',
      },
    ],
    subtotal: 180000,
    discount: 18000,
    shipping: 0,
    total: 162000,
    shippingName: '吳永續長',
    shippingPhone: '0955-777-888',
    shippingAddress: '台中市西屯區台灣大道三段99號',
    shippingNote: '企業內訓，日期待確認',
    companyId: 'company_003',
    companyName: '台灣製造股份有限公司',
    userId: 'user_004',
    userName: '吳永續',
    requireApproval: true,
    approvalStatus: 'APPROVED',
    approverName: '周執行長',
    esgScore: 88,
    carbonSaved: 0,
    createdAt: '2026-02-21T16:30:00Z',
    updatedAt: '2026-02-21T17:00:00Z',
    paidAt: null,
    shippedAt: null,
    deliveredAt: null,
  },
]

// 訂單狀態對照
export const orderStatusMap: Record<Order['status'], { label: string; color: string }> = {
  PENDING_APPROVAL: { label: '待簽核', color: 'bg-yellow-100 text-yellow-800' },
  PENDING_PAYMENT: { label: '待付款', color: 'bg-orange-100 text-orange-800' },
  PROCESSING: { label: '處理中', color: 'bg-blue-100 text-blue-800' },
  SHIPPED: { label: '已出貨', color: 'bg-purple-100 text-purple-800' },
  DELIVERED: { label: '已送達', color: 'bg-indigo-100 text-indigo-800' },
  COMPLETED: { label: '已完成', color: 'bg-green-100 text-green-800' },
  CANCELLED: { label: '已取消', color: 'bg-gray-100 text-gray-800' },
}

// 付款狀態對照
export const paymentStatusMap: Record<Order['paymentStatus'], { label: string; color: string }> = {
  PENDING: { label: '待付款', color: 'bg-yellow-100 text-yellow-800' },
  PAID: { label: '已付款', color: 'bg-green-100 text-green-800' },
  FAILED: { label: '付款失敗', color: 'bg-red-100 text-red-800' },
  REFUNDED: { label: '已退款', color: 'bg-gray-100 text-gray-800' },
}
