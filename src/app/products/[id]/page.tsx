'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ShoppingCart,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Leaf,
  Award,
  Truck,
  Shield,
  Star,
  Store,
  Package,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  getProductById,
  getRelatedProducts,
  addToCart,
  type Product,
} from '@/lib/api'
import { cn } from '@/lib/utils'

// ESG 標籤顏色對應
const esgTagColors: Record<string, string> = {
  碳中和: 'bg-green-100 text-green-800 border-green-200',
  MIT: 'bg-blue-100 text-blue-800 border-blue-200',
  有機: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  環保材質: 'bg-teal-100 text-teal-800 border-teal-200',
  公平貿易: 'bg-amber-100 text-amber-800 border-amber-200',
  社會企業: 'bg-purple-100 text-purple-800 border-purple-200',
  生態旅遊: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  環境教育: 'bg-lime-100 text-lime-800 border-lime-200',
}

// 格式化價格
function formatPrice(price: number): string {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addingToCart, setAddingToCart] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const [productData, related] = await Promise.all([
          getProductById(productId),
          getRelatedProducts(productId, 4),
        ])
        setProduct(productData)
        setRelatedProducts(related)
      } catch (error) {
        console.error('Failed to fetch product:', error)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchData()
    }
  }, [productId])

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = async () => {
    if (!product) return

    setAddingToCart(true)
    try {
      await addToCart(product.id, quantity)
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    } catch (error) {
      console.error('Failed to add to cart:', error)
      alert('加入購物車失敗，請稍後再試')
    } finally {
      setAddingToCart(false)
    }
  }

  const handlePrevImage = () => {
    if (product) {
      setSelectedImage((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      )
    }
  }

  const handleNextImage = () => {
    if (product) {
      setSelectedImage((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-6 w-48 bg-gray-200 rounded mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded-xl" />
              <div className="space-y-4">
                <div className="h-8 w-3/4 bg-gray-200 rounded" />
                <div className="h-6 w-1/2 bg-gray-200 rounded" />
                <div className="h-24 bg-gray-200 rounded" />
                <div className="h-12 w-32 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            找不到商品
          </h2>
          <p className="text-gray-500 mb-4">該商品可能已下架或不存在</p>
          <Button asChild>
            <Link href="/products">返回商品列表</Link>
          </Button>
        </div>
      </div>
    )
  }

  const discountPercentage = product.comparePrice
    ? Math.round((1 - product.price / product.comparePrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 麵包屑 */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-green-600">
            首頁
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/products" className="hover:text-green-600">
            所有商品
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={`/products?category=${product.category.slug}`}
            className="hover:text-green-600"
          >
            {product.category.name}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* 商品主要區塊 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* 左側：圖片區 */}
          <div className="space-y-4">
            {/* 主圖 */}
            <div className="relative aspect-square bg-white rounded-xl overflow-hidden border">
              <Image
                src={product.images[selectedImage] || '/images/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />

              {/* 折扣標籤 */}
              {discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{discountPercentage}%
                </div>
              )}

              {/* ESG 分數 */}
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <Leaf className="h-4 w-4" />
                ESG {product.esgScore}
              </div>

              {/* 圖片導航 */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* 縮圖列表 */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors',
                      selectedImage === index
                        ? 'border-green-500'
                        : 'border-transparent hover:border-gray-300'
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - 圖片 ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 右側：商品資訊 */}
          <div className="space-y-6">
            {/* 廠商 */}
            <Link
              href={`/vendor/${product.vendor.id}`}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-600"
            >
              <Store className="h-4 w-4" />
              {product.vendor.name}
            </Link>

            {/* 商品名稱 */}
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* 評分 */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      'h-5 w-5',
                      star <= Math.round(product.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    )}
                  />
                ))}
                <span className="ml-2 font-medium">{product.rating}</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500">
                已售出 {product.soldCount} 件
              </span>
            </div>

            {/* 價格 */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-green-600">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
              {product.unit && (
                <span className="text-gray-500">/ {product.unit}</span>
              )}
            </div>

            {/* ESG 標籤 */}
            <div className="flex flex-wrap gap-2">
              {product.esgTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={cn(
                    'px-3 py-1',
                    esgTagColors[tag] || 'bg-gray-100 text-gray-800'
                  )}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* 簡介 */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <Separator />

            {/* 數量選擇 */}
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">數量</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-gray-500">
                庫存 {product.stock} 件
              </span>
            </div>

            {/* 購買按鈕 */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={handleAddToCart}
                disabled={addingToCart || product.stock === 0}
              >
                {addedToCart ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    已加入購物車
                  </>
                ) : addingToCart ? (
                  '處理中...'
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    加入購物車
                  </>
                )}
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* 服務保證 */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="p-2 bg-green-50 rounded-full">
                  <Leaf className="h-4 w-4 text-green-600" />
                </div>
                <span>ESG 認證商品</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="p-2 bg-blue-50 rounded-full">
                  <Award className="h-4 w-4 text-blue-600" />
                </div>
                <span>品質保證</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="p-2 bg-orange-50 rounded-full">
                  <Truck className="h-4 w-4 text-orange-600" />
                </div>
                <span>企業配送</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="p-2 bg-purple-50 rounded-full">
                  <Shield className="h-4 w-4 text-purple-600" />
                </div>
                <span>安心付款</span>
              </div>
            </div>
          </div>
        </div>

        {/* 詳細資訊 Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent"
            >
              商品介紹
            </TabsTrigger>
            <TabsTrigger
              value="specs"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent"
            >
              規格說明
            </TabsTrigger>
            <TabsTrigger
              value="vendor"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent"
            >
              關於廠商
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div
                  className="prose prose-green max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.content }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specs" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                {product.specs && Object.keys(product.specs).length > 0 ? (
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex border-b border-gray-100 pb-3"
                      >
                        <dt className="w-1/3 text-gray-500">{key}</dt>
                        <dd className="w-2/3 font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-gray-500">暫無規格資訊</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendor" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={product.vendor.logo || '/images/placeholder.jpg'}
                      alt={product.vendor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle>{product.vendor.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1">{product.vendor.rating}</span>
                      </div>
                      <span>|</span>
                      <span>ESG 分數 {product.vendor.esgScore}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {product.vendor.description}
                </p>
                <Button variant="outline" asChild>
                  <Link href={`/vendor/${product.vendor.id}`}>
                    查看廠商頁面
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 相關商品 */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">相關商品</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-square">
                      <Image
                        src={
                          relatedProduct.images[0] || '/images/placeholder.jpg'
                        }
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        ESG {relatedProduct.esgScore}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {relatedProduct.vendor.name}
                      </p>
                      <p className="text-lg font-bold text-green-600 mt-2">
                        {formatPrice(relatedProduct.price)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
