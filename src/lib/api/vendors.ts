// Green購 - 廠商 API Service

import {
  mockVendors,
  simulateDelay,
  paginate,
  type Vendor,
  vendorStatusMap,
} from '@/lib/mock-data'

export interface VendorSearchParams {
  keyword?: string
  status?: Vendor['status']
  tags?: string[]
  minRating?: number
  sortBy?: 'rating' | 'sales' | 'products' | 'newest'
  page?: number
  pageSize?: number
}

export interface VendorSearchResult {
  vendors: Vendor[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 取得廠商列表
export async function getVendors(
  params: VendorSearchParams = {}
): Promise<VendorSearchResult> {
  await simulateDelay(300)

  let filtered = [...mockVendors]

  // 關鍵字搜尋
  if (params.keyword) {
    const keyword = params.keyword.toLowerCase()
    filtered = filtered.filter(
      (v) =>
        v.name.toLowerCase().includes(keyword) ||
        v.description.toLowerCase().includes(keyword) ||
        v.tags.some((tag) => tag.toLowerCase().includes(keyword))
    )
  }

  // 狀態篩選
  if (params.status) {
    filtered = filtered.filter((v) => v.status === params.status)
  }

  // 標籤篩選
  if (params.tags && params.tags.length > 0) {
    filtered = filtered.filter((v) =>
      params.tags!.some((tag) => v.tags.includes(tag))
    )
  }

  // 最低評分篩選
  if (params.minRating !== undefined) {
    filtered = filtered.filter((v) => v.rating >= params.minRating!)
  }

  // 排序
  switch (params.sortBy) {
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'sales':
      filtered.sort((a, b) => b.totalSales - a.totalSales)
      break
    case 'products':
      filtered.sort((a, b) => b.productCount - a.productCount)
      break
    case 'newest':
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      break
    default:
      // 預設按評分排序
      filtered.sort((a, b) => b.rating - a.rating)
  }

  // 分頁
  const { data, meta } = paginate(
    filtered,
    params.page || 1,
    params.pageSize || 12
  )

  return {
    vendors: data,
    total: meta.total,
    page: meta.page,
    pageSize: meta.pageSize,
    totalPages: meta.totalPages,
  }
}

// 取得單一廠商
export async function getVendorById(id: string): Promise<Vendor | null> {
  await simulateDelay(200)
  return mockVendors.find((v) => v.id === id) || null
}

// 取得已通過審核的廠商
export async function getApprovedVendors(
  page: number = 1,
  pageSize: number = 12
): Promise<VendorSearchResult> {
  await simulateDelay(300)

  const approved = mockVendors.filter((v) => v.status === 'APPROVED')
  const { data, meta } = paginate(approved, page, pageSize)

  return {
    vendors: data,
    total: meta.total,
    page: meta.page,
    pageSize: meta.pageSize,
    totalPages: meta.totalPages,
  }
}

// 取得熱門廠商
export async function getPopularVendors(limit: number = 6): Promise<Vendor[]> {
  await simulateDelay(200)
  return [...mockVendors]
    .filter((v) => v.status === 'APPROVED')
    .sort((a, b) => b.totalSales - a.totalSales)
    .slice(0, limit)
}

// 取得高評分廠商
export async function getTopRatedVendors(limit: number = 6): Promise<Vendor[]> {
  await simulateDelay(200)
  return [...mockVendors]
    .filter((v) => v.status === 'APPROVED')
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}

// 取得廠商狀態對照表
export function getVendorStatusMap() {
  return vendorStatusMap
}

// 取得廠商統計
export async function getVendorStats(): Promise<{
  total: number
  approved: number
  pending: number
  suspended: number
  totalProducts: number
  totalSales: number
}> {
  await simulateDelay(200)

  return {
    total: mockVendors.length,
    approved: mockVendors.filter((v) => v.status === 'APPROVED').length,
    pending: mockVendors.filter((v) => v.status === 'PENDING').length,
    suspended: mockVendors.filter((v) => v.status === 'SUSPENDED').length,
    totalProducts: mockVendors.reduce((sum, v) => sum + v.productCount, 0),
    totalSales: mockVendors.reduce((sum, v) => sum + v.totalSales, 0),
  }
}

// 取得所有標籤
export async function getVendorTags(): Promise<string[]> {
  await simulateDelay(100)

  const tags = new Set<string>()
  mockVendors.forEach((v) => v.tags.forEach((tag) => tags.add(tag)))
  return Array.from(tags)
}

// 取得所有認證
export async function getVendorCertifications(): Promise<string[]> {
  await simulateDelay(100)

  const certs = new Set<string>()
  mockVendors.forEach((v) =>
    v.certifications.forEach((cert) => certs.add(cert))
  )
  return Array.from(certs)
}
