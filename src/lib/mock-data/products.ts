// Green購 - Mock 商品資料

export interface Category {
  id: string
  name: string
  slug: string
}

export interface ProductVendor {
  id: string
  name: string
  logo: string
  description?: string
  rating?: number
  esgScore?: number
}

export interface ESGTag {
  id: string
  name: string
  color: string
  icon: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  content: string
  price: number
  comparePrice: number | null
  images: string[]
  category: Category
  vendor: ProductVendor
  rating: number
  reviewCount: number
  soldCount: number
  esgTags: string[]
  esgScore: number
  carbonSaved?: number
  minOrder: number
  stock: number
  unit?: string
  specs: Record<string, string>
  status: 'DRAFT' | 'PENDING' | 'ACTIVE' | 'REJECTED' | 'ARCHIVED'
  createdAt: string
  updatedAt: string
}

export const mockProducts: Product[] = [
  {
    id: 'prod_001',
    name: '台灣在地蜂蜜禮盒',
    slug: 'taiwan-honey-gift-box',
    description: '來自花蓮純淨山區的天然蜂蜜，支持在地小農，100% 純天然無添加',
    content: `
## 產品特色

來自花蓮純淨山區的天然蜂蜜，由當地小農以傳統方式採集，確保每一滴蜂蜜都保留最天然的風味與營養。

### 為什麼選擇我們的蜂蜜？

1. **100% 純天然** - 無添加任何糖分或人工成分
2. **支持在地小農** - 每購買一盒，就是對台灣農業的支持
3. **環保包裝** - 使用可回收玻璃瓶與再生紙盒
4. **ESG 認證** - 獲得台灣永續採購認證

### 包裝內容

- 龍眼蜜 250g x 1
- 百花蜜 250g x 1
- 荔枝蜜 250g x 1
- 精美禮盒包裝
- 產地證明卡

### 保存方式

常溫保存，避免陽光直射，開封後請冷藏保存。
    `,
    price: 680,
    comparePrice: 800,
    images: [
      '/images/products/honey-1.jpg',
      '/images/products/honey-2.jpg',
      '/images/products/honey-3.jpg',
    ],
    category: { id: 'cat_gifts', name: '綠色禮品', slug: 'gifts' },
    vendor: {
      id: 'vendor_001',
      name: '花蓮蜂農合作社',
      logo: '/images/vendors/hualien-bee.png',
    },
    rating: 4.8,
    reviewCount: 126,
    soldCount: 1280,
    esgTags: ['在地採購', '社會企業', '環保包裝'],
    esgScore: 85,
    carbonSaved: 2.5,
    minOrder: 20,
    stock: 500,
    unit: '盒',
    specs: {
      '產地': '台灣花蓮',
      '淨重': '250g x 3',
      '保存期限': '2年',
      '包裝': '玻璃瓶 + 禮盒',
    },
    status: 'ACTIVE',
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-02-20T10:30:00Z',
  },
  {
    id: 'prod_002',
    name: '阿里山生態之旅（二日）',
    slug: 'alishan-eco-tour-2days',
    description: '探索阿里山原始森林，體驗生態導覽與部落文化，適合企業團建',
    content: `
## 行程特色

帶領您的團隊深入阿里山，體驗台灣最美的高山生態與原住民文化。

### 行程亮點

- 🌲 **原始森林導覽** - 專業生態解說員帶領
- 🌄 **日出觀賞** - 祝山觀日出經典體驗
- 🏠 **部落文化** - 鄒族文化體驗與交流
- 🍵 **高山茶品茗** - 品嚐正宗阿里山茶

### 行程安排

**第一天**
- 08:00 嘉義高鐵站集合
- 10:30 抵達阿里山園區
- 12:00 部落風味午餐
- 14:00 森林步道導覽
- 18:00 部落晚餐與文化體驗
- 20:00 入住生態民宿

**第二天**
- 04:30 祝山日出
- 07:00 早餐
- 09:00 高山茶園參訪
- 12:00 午餐
- 14:00 返程
- 17:00 抵達嘉義高鐵站

### 費用包含

- 交通接駁
- 住宿（雙人房）
- 三餐
- 專業導覽
- 保險
    `,
    price: 4500,
    comparePrice: 5200,
    images: [
      '/images/products/alishan-1.jpg',
      '/images/products/alishan-2.jpg',
      '/images/products/alishan-3.jpg',
    ],
    category: { id: 'cat_travel', name: '企業旅遊', slug: 'travel' },
    vendor: {
      id: 'vendor_002',
      name: '綠色旅遊聯盟',
      logo: '/images/vendors/green-travel.png',
    },
    rating: 4.9,
    reviewCount: 89,
    soldCount: 456,
    esgTags: ['碳中和', '在地採購', '文化保存'],
    esgScore: 92,
    carbonSaved: 15.0,
    minOrder: 15,
    stock: 999,
    unit: '人',
    specs: {
      '天數': '2天1夜',
      '人數': '15-40人',
      '難度': '輕鬆',
      '出發地': '嘉義高鐵站',
    },
    status: 'ACTIVE',
    createdAt: '2026-01-10T08:00:00Z',
    updatedAt: '2026-02-18T14:20:00Z',
  },
  {
    id: 'prod_003',
    name: '淨灘志工活動（半日）',
    slug: 'beach-cleanup-volunteer',
    description: '與團隊一起為海洋環境盡一份心力，適合企業團建與 ESG 實踐',
    content: `
## 活動介紹

帶領您的團隊走出辦公室，一起為海洋環境盡一份心力。這不只是一場淨灘活動，更是團隊凝聚與環境教育的絕佳機會。

### 活動內容

1. **海洋環境講座** (30分鐘)
   - 海洋垃圾現況
   - 塑膠污染危機
   - 企業可以做什麼

2. **淨灘行動** (2小時)
   - 分組競賽
   - 垃圾分類統計
   - 資源回收教學

3. **成果分享** (30分鐘)
   - 今日成果統計
   - 環保承諾簽署
   - 頒發參與證書

### 活動特色

- ✅ 提供所有裝備（手套、夾子、垃圾袋）
- ✅ 專業講師帶領
- ✅ ESG 報告數據支援
- ✅ 企業 CSR 攝影紀錄
- ✅ 參與證書
    `,
    price: 350,
    comparePrice: null,
    images: [
      '/images/products/beach-1.jpg',
      '/images/products/beach-2.jpg',
      '/images/products/beach-3.jpg',
    ],
    category: { id: 'cat_volunteer', name: '志工活動', slug: 'volunteer' },
    vendor: {
      id: 'vendor_003',
      name: '海洋守護協會',
      logo: '/images/vendors/ocean-guardian.png',
    },
    rating: 4.7,
    reviewCount: 234,
    soldCount: 2890,
    esgTags: ['社會企業', '環保認證', '志工服務'],
    esgScore: 95,
    carbonSaved: 8.5,
    minOrder: 30,
    stock: 999,
    unit: '人',
    specs: {
      '時長': '3-4小時',
      '人數': '30-100人',
      '地點': '北海岸/東北角/墾丁',
      '適合': '全年齡',
    },
    status: 'ACTIVE',
    createdAt: '2026-01-05T08:00:00Z',
    updatedAt: '2026-02-15T09:00:00Z',
  },
  {
    id: 'prod_004',
    name: 'ESG 永續策略工作坊',
    slug: 'esg-strategy-workshop',
    description: '由專業顧問帶領，建立企業永續發展藍圖，取得 ESG 認證的第一步',
    content: `
## 課程簡介

專為企業高階主管與 ESG 負責人設計的深度工作坊，協助您建立完整的永續發展策略。

### 課程大綱

**上午場：ESG 基礎與趨勢**
- ESG 國際趨勢與台灣法規
- 利害關係人溝通策略
- 重大性議題分析

**下午場：策略規劃實戰**
- 碳盤查與減碳路徑
- 供應鏈管理
- ESG 報告書撰寫
- 行動方案制定

### 課程特色

- 👨‍🏫 業界頂尖講師群
- 📊 實際案例分析
- 🛠️ 工具模板提供
- 📋 課後輔導服務

### 講師團隊

- 林永續 - 前永續顧問公司總經理
- 陳碳中 - 碳盤查認證講師
- 王社責 - CSR 報告書專家
    `,
    price: 12000,
    comparePrice: 15000,
    images: [
      '/images/products/workshop-1.jpg',
      '/images/products/workshop-2.jpg',
    ],
    category: { id: 'cat_courses', name: 'ESG 課程', slug: 'courses' },
    vendor: {
      id: 'vendor_004',
      name: 'ESG 學院',
      logo: '/images/vendors/esg-academy.png',
    },
    rating: 4.9,
    reviewCount: 56,
    soldCount: 328,
    esgTags: ['環保認證', '專業培訓'],
    esgScore: 88,
    carbonSaved: 0,
    minOrder: 10,
    stock: 999,
    unit: '人',
    specs: {
      '時長': '8小時',
      '人數': '10-30人',
      '地點': '企業內訓/線上',
      '證書': '結業證書',
    },
    status: 'ACTIVE',
    createdAt: '2026-01-20T08:00:00Z',
    updatedAt: '2026-02-21T16:00:00Z',
  },
  {
    id: 'prod_005',
    name: '環保竹製餐具組禮盒',
    slug: 'eco-bamboo-cutlery-set',
    description: '可分解竹製餐具，減少一次性塑膠使用，適合企業禮贈品',
    content: `
## 產品介紹

採用天然竹材製作的環保餐具組，質感精緻，是送給員工或客戶的最佳綠色禮品選擇。

### 套組內容

- 竹筷 x 1雙
- 竹湯匙 x 1
- 竹叉子 x 1
- 竹吸管 x 2（附清潔刷）
- 棉麻收納袋 x 1
- 精美禮盒

### 產品特色

- 🎋 100% 天然竹材
- ♻️ 可自然分解
- 🧼 方便清洗
- 👜 輕巧好攜帶
- 🎁 企業 Logo 客製

### 環保效益

每組餐具可減少約 500 組一次性餐具的使用，相當於減少 2kg 的塑膠垃圾。
    `,
    price: 280,
    comparePrice: 350,
    images: [
      '/images/products/bamboo-1.jpg',
      '/images/products/bamboo-2.jpg',
    ],
    category: { id: 'cat_gifts', name: '綠色禮品', slug: 'gifts' },
    vendor: {
      id: 'vendor_005',
      name: '綠色工坊',
      logo: '/images/vendors/green-workshop.png',
    },
    rating: 4.6,
    reviewCount: 312,
    soldCount: 5670,
    esgTags: ['再生材料', '環保認證', '減塑'],
    esgScore: 90,
    carbonSaved: 5.2,
    minOrder: 50,
    stock: 2000,
    unit: '組',
    specs: {
      '材質': '天然竹材',
      '尺寸': '22cm',
      '客製': '可印企業 Logo',
      '包裝': '禮盒+棉麻袋',
    },
    status: 'ACTIVE',
    createdAt: '2026-01-08T08:00:00Z',
    updatedAt: '2026-02-19T11:30:00Z',
  },
  {
    id: 'prod_006',
    name: '太魯閣峽谷健行團',
    slug: 'taroko-gorge-hiking',
    description: '專業領隊帶領，深度體驗台灣最美峽谷，難度適中適合團建',
    content: `
## 行程介紹

跟隨專業領隊的腳步，探索太魯閣國家公園的壯麗峽谷與自然生態。

### 行程亮點

- 🏔️ 燕子口步道
- 🌊 白楊瀑布
- 🌉 錐麓古道（進階）
- 🍃 砂卡礑步道

### 行程安排

- 07:00 花蓮車站集合
- 08:00 抵達太魯閣遊客中心
- 08:30 燕子口步道導覽
- 11:00 白楊步道健行
- 13:00 原住民風味午餐
- 14:30 砂卡礑步道
- 17:00 返回花蓮車站

### 費用包含

- 專業領隊
- 保險
- 午餐
- 入園門票
- 接駁車
    `,
    price: 3200,
    comparePrice: null,
    images: [
      '/images/products/taroko-1.jpg',
      '/images/products/taroko-2.jpg',
      '/images/products/taroko-3.jpg',
    ],
    category: { id: 'cat_travel', name: '企業旅遊', slug: 'travel' },
    vendor: {
      id: 'vendor_002',
      name: '綠色旅遊聯盟',
      logo: '/images/vendors/green-travel.png',
    },
    rating: 4.8,
    reviewCount: 67,
    soldCount: 389,
    esgTags: ['碳中和', '在地採購', '生態導覽'],
    esgScore: 88,
    carbonSaved: 12.0,
    minOrder: 20,
    stock: 999,
    unit: '人',
    specs: {
      '天數': '1天',
      '人數': '20-40人',
      '難度': '中等',
      '出發地': '花蓮車站',
    },
    status: 'ACTIVE',
    createdAt: '2026-01-12T08:00:00Z',
    updatedAt: '2026-02-17T13:45:00Z',
  },
  {
    id: 'prod_007',
    name: '有機棉環保購物袋',
    slug: 'organic-cotton-shopping-bag',
    description: 'GOTS認證有機棉，可重複使用，支持永續時尚',
    content: `
## 產品特色

採用 GOTS 認證有機棉製作的環保購物袋，結合時尚設計與環保理念。

### 產品規格

- 材質：100% GOTS 有機棉
- 尺寸：40 x 35 x 10 cm
- 承重：15 kg
- 顏色：原棉色、淺灰、深藍

### 為什麼選擇有機棉？

有機棉種植過程不使用農藥與化學肥料，用水量比傳統棉花減少 90%。

### 客製服務

可提供企業 Logo 印刷服務：
- 單色印刷
- 多色印刷
- 刺繡
    `,
    price: 180,
    comparePrice: 220,
    images: [
      '/images/products/cotton-bag-1.jpg',
      '/images/products/cotton-bag-2.jpg',
    ],
    category: { id: 'cat_gifts', name: '綠色禮品', slug: 'gifts' },
    vendor: {
      id: 'vendor_006',
      name: '有機生活館',
      logo: '/images/vendors/organic-life.png',
    },
    rating: 4.5,
    reviewCount: 189,
    soldCount: 8920,
    esgTags: ['有機認證', '再生材料', '環保包裝'],
    esgScore: 92,
    carbonSaved: 3.8,
    minOrder: 100,
    stock: 5000,
    unit: '個',
    specs: {
      '材質': 'GOTS有機棉',
      '尺寸': '40x35x10cm',
      '承重': '15kg',
      '認證': 'GOTS',
    },
    status: 'ACTIVE',
    createdAt: '2026-01-18T08:00:00Z',
    updatedAt: '2026-02-20T09:15:00Z',
  },
  {
    id: 'prod_008',
    name: '碳中和咖啡豆禮盒',
    slug: 'carbon-neutral-coffee-gift',
    description: '來自台灣高山的精品咖啡，通過碳中和認證，送禮自用兩相宜',
    content: `
## 產品介紹

嚴選台灣阿里山、日月潭等產區的精品咖啡豆，從種植到包裝全程碳中和。

### 禮盒內容

- 阿里山精品咖啡豆 200g
- 日月潭精品咖啡豆 200g
- 手工餅乾 100g
- 濾掛咖啡 5入
- 精美禮盒

### 風味特色

**阿里山**：柑橘香氣、蜂蜜甜感、絲滑口感

**日月潭**：堅果調性、巧克力尾韻、醇厚

### 碳中和認證

本產品通過 PAS 2060 碳中和認證，每盒咖啡的碳足跡已透過植樹造林完全抵銷。
    `,
    price: 880,
    comparePrice: 1050,
    images: [
      '/images/products/coffee-1.jpg',
      '/images/products/coffee-2.jpg',
    ],
    category: { id: 'cat_gifts', name: '綠色禮品', slug: 'gifts' },
    vendor: {
      id: 'vendor_007',
      name: '台灣精品咖啡',
      logo: '/images/vendors/tw-coffee.png',
    },
    rating: 4.9,
    reviewCount: 78,
    soldCount: 1560,
    esgTags: ['碳中和', '在地採購', '有機認證'],
    esgScore: 94,
    carbonSaved: 4.2,
    minOrder: 30,
    stock: 800,
    unit: '盒',
    specs: {
      '產地': '台灣阿里山/日月潭',
      '烘焙': '中焙',
      '淨重': '400g + 100g',
      '認證': 'PAS 2060',
    },
    status: 'ACTIVE',
    createdAt: '2026-01-22T08:00:00Z',
    updatedAt: '2026-02-21T10:00:00Z',
  },
]

// 商品分類
export const mockCategories = [
  { id: 'cat_all', slug: 'all', name: '全部商品', count: 156, image: '/images/category-all.png' },
  { id: 'cat_gifts', slug: 'gifts', name: '綠色禮品', count: 48, image: '/images/category-gifts.png' },
  { id: 'cat_travel', slug: 'travel', name: '企業旅遊', count: 32, image: '/images/category-travel.png' },
  { id: 'cat_volunteer', slug: 'volunteer', name: '志工活動', count: 28, image: '/images/category-volunteer.png' },
  { id: 'cat_courses', slug: 'courses', name: 'ESG 課程', count: 24, image: '/images/category-courses.png' },
  { id: 'cat_team', slug: 'team', name: '團建活動', count: 24, image: '/images/category-team.png' },
]

// ESG 標籤
export const mockEsgTags = [
  { id: 'carbon-neutral', name: '碳中和', color: 'bg-green-100 text-green-800', icon: '🌱' },
  { id: 'recycled', name: '再生材料', color: 'bg-blue-100 text-blue-800', icon: '♻️' },
  { id: 'local', name: '在地採購', color: 'bg-amber-100 text-amber-800', icon: '📍' },
  { id: 'social', name: '社會企業', color: 'bg-purple-100 text-purple-800', icon: '🤝' },
  { id: 'certified', name: '環保認證', color: 'bg-emerald-100 text-emerald-800', icon: '✅' },
  { id: 'organic', name: '有機認證', color: 'bg-lime-100 text-lime-800', icon: '🌿' },
  { id: 'volunteer', name: '志工服務', color: 'bg-pink-100 text-pink-800', icon: '💝' },
]
