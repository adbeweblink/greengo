// Green購 - 商品 API Service

import {
  mockProducts,
  mockCategories,
  mockEsgTags,
  simulateDelay,
  paginate,
  type Product,
  type Category,
  type ESGTag,
} from '@/lib/mock-data'

export interface ProductSearchParams {
  keyword?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  esgTags?: string[]
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest' | 'popular'
  page?: number
  pageSize?: number
}

export interface ProductSearchResult {
  products: Product[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 取得所有商品（帶篩選）
export async function getProducts(
  params: ProductSearchParams = {}
): Promise<ProductSearchResult> {
  await simulateDelay(300)

  let filtered = [...mockProducts]

  // 關鍵字搜尋
  if (params.keyword) {
    const keyword = params.keyword.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(keyword) ||
        p.description.toLowerCase().includes(keyword) ||
        p.vendor.name.toLowerCase().includes(keyword)
    )
  }

  // 分類篩選
  if (params.category) {
    filtered = filtered.filter((p) => p.category.slug === params.category)
  }

  // 價格篩選
  if (params.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= params.minPrice!)
  }
  if (params.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= params.maxPrice!)
  }

  // ESG 標籤篩選
  if (params.esgTags && params.esgTags.length > 0) {
    filtered = filtered.filter((p) =>
      params.esgTags!.some((tag) => p.esgTags.includes(tag))
    )
  }

  // 排序
  switch (params.sortBy) {
    case 'price_asc':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'newest':
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      break
    case 'popular':
      filtered.sort((a, b) => b.soldCount - a.soldCount)
      break
  }

  // 分頁
  const { data, meta } = paginate(
    filtered,
    params.page || 1,
    params.pageSize || 12
  )

  return {
    products: data,
    total: meta.total,
    page: meta.page,
    pageSize: meta.pageSize,
    totalPages: meta.totalPages,
  }
}

// 取得單一商品
export async function getProductById(id: string): Promise<Product | null> {
  await simulateDelay(200)
  return mockProducts.find((p) => p.id === id) || null
}

// 取得商品 by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  await simulateDelay(200)
  return mockProducts.find((p) => p.slug === slug) || null
}

// 取得所有分類
export async function getCategories(): Promise<Category[]> {
  await simulateDelay(100)
  return mockCategories
}

// 取得所有 ESG 標籤
export async function getEsgTags(): Promise<ESGTag[]> {
  await simulateDelay(100)
  return mockEsgTags
}

// 取得相關商品
export async function getRelatedProducts(
  productId: string,
  limit: number = 4
): Promise<Product[]> {
  await simulateDelay(200)

  const product = mockProducts.find((p) => p.id === productId)
  if (!product) return []

  // 找同分類或同廠商的商品
  return mockProducts
    .filter(
      (p) =>
        p.id !== productId &&
        (p.category.id === product.category.id ||
          p.vendor.id === product.vendor.id)
    )
    .slice(0, limit)
}

// 取得熱門商品
export async function getPopularProducts(limit: number = 8): Promise<Product[]> {
  await simulateDelay(200)
  return [...mockProducts].sort((a, b) => b.soldCount - a.soldCount).slice(0, limit)
}

// 取得最新商品
export async function getNewProducts(limit: number = 8): Promise<Product[]> {
  await simulateDelay(200)
  return [...mockProducts]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit)
}

// 取得廠商的商品
export async function getProductsByVendor(
  vendorId: string,
  page: number = 1,
  pageSize: number = 12
): Promise<ProductSearchResult> {
  await simulateDelay(300)

  const filtered = mockProducts.filter((p) => p.vendor.id === vendorId)
  const { data, meta } = paginate(filtered, page, pageSize)

  return {
    products: data,
    total: meta.total,
    page: meta.page,
    pageSize: meta.pageSize,
    totalPages: meta.totalPages,
  }
}
