// Green購 - Mock 廠商資料

export interface Vendor {
  id: string
  name: string
  taxId: string
  email: string
  phone: string
  address: string
  description: string
  logo: string
  coverImage: string
  tags: string[]
  commissionRate: number
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED'
  // 統計
  productCount: number
  orderCount: number
  totalSales: number
  rating: number
  reviewCount: number
  // ESG
  esgScore: number
  certifications: string[]
  // 時間
  createdAt: string
  approvedAt: string | null
}

export const mockVendors: Vendor[] = [
  {
    id: 'vendor_001',
    name: '花蓮蜂農合作社',
    taxId: '12345678',
    email: 'contact@hualien-bee.com.tw',
    phone: '03-8123456',
    address: '花蓮縣吉安鄉中央路一段123號',
    description: '我們是一群來自花蓮的蜂農，堅持以自然農法養殖蜜蜂，生產最純淨的台灣蜂蜜。',
    logo: '/images/vendors/hualien-bee.png',
    coverImage: '/images/vendors/hualien-bee-cover.jpg',
    tags: ['MIT', '有機', '小農'],
    commissionRate: 0.10,
    status: 'APPROVED',
    productCount: 12,
    orderCount: 89,
    totalSales: 1250000,
    rating: 4.8,
    reviewCount: 126,
    esgScore: 85,
    certifications: ['有機認證', '產銷履歷'],
    createdAt: '2025-06-15T08:00:00Z',
    approvedAt: '2025-06-20T10:00:00Z',
  },
  {
    id: 'vendor_002',
    name: '綠色旅遊聯盟',
    taxId: '23456789',
    email: 'hello@greentravel.tw',
    phone: '02-27891234',
    address: '台北市大安區忠孝東路四段123號8樓',
    description: '專注於永續旅遊的專業旅行社，規劃低碳足跡的企業旅遊行程，讓旅行也能愛地球。',
    logo: '/images/vendors/green-travel.png',
    coverImage: '/images/vendors/green-travel-cover.jpg',
    tags: ['碳中和', '生態旅遊', '文化保存'],
    commissionRate: 0.08,
    status: 'APPROVED',
    productCount: 28,
    orderCount: 156,
    totalSales: 4560000,
    rating: 4.9,
    reviewCount: 156,
    esgScore: 92,
    certifications: ['碳中和認證', '環保標章'],
    createdAt: '2025-04-10T08:00:00Z',
    approvedAt: '2025-04-15T09:00:00Z',
  },
  {
    id: 'vendor_003',
    name: '海洋守護協會',
    taxId: '34567890',
    email: 'info@ocean-guardian.org.tw',
    phone: '02-25551234',
    address: '基隆市中正區港西街38號',
    description: '致力於海洋環境保護的非營利組織，透過淨灘活動與環境教育，守護台灣的海洋生態。',
    logo: '/images/vendors/ocean-guardian.png',
    coverImage: '/images/vendors/ocean-guardian-cover.jpg',
    tags: ['NPO', '環境教育', '志工服務'],
    commissionRate: 0.05,
    status: 'APPROVED',
    productCount: 8,
    orderCount: 234,
    totalSales: 890000,
    rating: 4.7,
    reviewCount: 234,
    esgScore: 95,
    certifications: ['社會企業認證'],
    createdAt: '2025-03-01T08:00:00Z',
    approvedAt: '2025-03-05T10:00:00Z',
  },
  {
    id: 'vendor_004',
    name: 'ESG 學院',
    taxId: '45678901',
    email: 'academy@esg-tw.com',
    phone: '02-27775555',
    address: '台北市松山區南京東路五段88號12樓',
    description: '專業的 ESG 培訓機構，提供企業永續發展所需的知識與技能培訓。',
    logo: '/images/vendors/esg-academy.png',
    coverImage: '/images/vendors/esg-academy-cover.jpg',
    tags: ['專業培訓', 'ESG顧問'],
    commissionRate: 0.10,
    status: 'APPROVED',
    productCount: 15,
    orderCount: 56,
    totalSales: 2800000,
    rating: 4.9,
    reviewCount: 56,
    esgScore: 88,
    certifications: ['ISO認證'],
    createdAt: '2025-05-20T08:00:00Z',
    approvedAt: '2025-05-25T11:00:00Z',
  },
  {
    id: 'vendor_005',
    name: '綠色工坊',
    taxId: '56789012',
    email: 'hello@green-workshop.tw',
    phone: '04-22331234',
    address: '台中市北區三民路三段88號',
    description: '專注於環保生活用品的設計與製造，以天然材質取代塑膠，讓環保成為生活日常。',
    logo: '/images/vendors/green-workshop.png',
    coverImage: '/images/vendors/green-workshop-cover.jpg',
    tags: ['環保材質', '設計', '無塑'],
    commissionRate: 0.12,
    status: 'APPROVED',
    productCount: 45,
    orderCount: 312,
    totalSales: 1680000,
    rating: 4.6,
    reviewCount: 312,
    esgScore: 90,
    certifications: ['環保標章', 'FSC認證'],
    createdAt: '2025-02-10T08:00:00Z',
    approvedAt: '2025-02-15T09:30:00Z',
  },
  {
    id: 'vendor_006',
    name: '有機生活館',
    taxId: '67890123',
    email: 'service@organic-life.com.tw',
    phone: '02-28881234',
    address: '台北市士林區德行西路50號',
    description: '提供各式有機認證產品，從食品到生活用品，幫助您打造健康永續的生活方式。',
    logo: '/images/vendors/organic-life.png',
    coverImage: '/images/vendors/organic-life-cover.jpg',
    tags: ['有機認證', 'GOTS', '天然'],
    commissionRate: 0.10,
    status: 'APPROVED',
    productCount: 68,
    orderCount: 189,
    totalSales: 980000,
    rating: 4.5,
    reviewCount: 189,
    esgScore: 92,
    certifications: ['有機認證', 'GOTS認證'],
    createdAt: '2025-07-01T08:00:00Z',
    approvedAt: '2025-07-05T10:00:00Z',
  },
  {
    id: 'vendor_007',
    name: '台灣精品咖啡',
    taxId: '78901234',
    email: 'info@tw-coffee.com.tw',
    phone: '05-2781234',
    address: '嘉義縣阿里山鄉中正村88號',
    description: '專注於台灣高山精品咖啡的種植與烘焙，堅持永續農法，生產碳中和認證的優質咖啡。',
    logo: '/images/vendors/tw-coffee.png',
    coverImage: '/images/vendors/tw-coffee-cover.jpg',
    tags: ['碳中和', 'MIT', '精品咖啡'],
    commissionRate: 0.10,
    status: 'APPROVED',
    productCount: 18,
    orderCount: 78,
    totalSales: 720000,
    rating: 4.9,
    reviewCount: 78,
    esgScore: 94,
    certifications: ['PAS 2060', '有機認證'],
    createdAt: '2025-08-15T08:00:00Z',
    approvedAt: '2025-08-20T09:00:00Z',
  },
]

// 廠商狀態對照
export const vendorStatusMap: Record<Vendor['status'], { label: string; color: string }> = {
  PENDING: { label: '待審核', color: 'bg-yellow-100 text-yellow-800' },
  APPROVED: { label: '已通過', color: 'bg-green-100 text-green-800' },
  REJECTED: { label: '已拒絕', color: 'bg-red-100 text-red-800' },
  SUSPENDED: { label: '已停權', color: 'bg-gray-100 text-gray-800' },
}
