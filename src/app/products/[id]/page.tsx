import { mockProducts } from '@/lib/mock-data/products'
import ProductDetailClient from './ProductDetailClient'

// 為靜態輸出生成所有產品頁面路徑
export function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }))
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params
  return <ProductDetailClient productId={id} />
}
