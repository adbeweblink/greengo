'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Filter, Grid3X3, List, ChevronDown, Leaf, Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const categories = [
  { id: 'all', name: '全部商品', count: 156 },
  { id: 'gifts', name: '綠色禮品', count: 48 },
  { id: 'travel', name: '企業旅遊', count: 32 },
  { id: 'volunteer', name: '志工活動', count: 28 },
  { id: 'courses', name: 'ESG 課程', count: 24 },
  { id: 'team', name: '團建活動', count: 24 },
]

const esgTags = [
  { id: 'carbon-neutral', name: '碳中和', color: 'bg-green-100 text-green-800' },
  { id: 'recycled', name: '再生材料', color: 'bg-blue-100 text-blue-800' },
  { id: 'local', name: '在地採購', color: 'bg-amber-100 text-amber-800' },
  { id: 'social', name: '社會企業', color: 'bg-purple-100 text-purple-800' },
  { id: 'certified', name: '環保認證', color: 'bg-emerald-100 text-emerald-800' },
]

const mockProducts = [
  {
    id: '1',
    name: '台灣在地蜂蜜禮盒',
    description: '來自花蓮純淨山區的天然蜂蜜，支持在地小農',
    price: 680,
    originalPrice: 800,
    image: '/images/category-gifts.png',
    category: 'gifts',
    vendor: '花蓮蜂農合作社',
    rating: 4.8,
    reviews: 126,
    esgTags: ['local', 'social'],
    esgScore: 85,
    minOrder: 20,
  },
  {
    id: '2',
    name: '阿里山生態之旅（二日）',
    description: '探索阿里山原始森林，體驗生態導覽與部落文化',
    price: 4500,
    originalPrice: 5200,
    image: '/images/category-travel.png',
    category: 'travel',
    vendor: '綠色旅遊聯盟',
    rating: 4.9,
    reviews: 89,
    esgTags: ['carbon-neutral', 'local'],
    esgScore: 92,
    minOrder: 15,
  },
  {
    id: '3',
    name: '淨灘志工活動（半日）',
    description: '與團隊一起為海洋環境盡一份心力，適合企業團建',
    price: 350,
    originalPrice: null,
    image: '/images/category-volunteer.png',
    category: 'volunteer',
    vendor: '海洋守護協會',
    rating: 4.7,
    reviews: 234,
    esgTags: ['social', 'certified'],
    esgScore: 95,
    minOrder: 30,
  },
  {
    id: '4',
    name: 'ESG 永續策略工作坊',
    description: '由專業顧問帶領，建立企業永續發展藍圖',
    price: 12000,
    originalPrice: 15000,
    image: '/images/category-courses.png',
    category: 'courses',
    vendor: 'ESG 學院',
    rating: 4.9,
    reviews: 56,
    esgTags: ['certified'],
    esgScore: 88,
    minOrder: 10,
  },
  {
    id: '5',
    name: '環保竹製餐具組禮盒',
    description: '可分解竹製餐具，減少一次性塑膠使用',
    price: 280,
    originalPrice: 350,
    image: '/images/category-gifts.png',
    category: 'gifts',
    vendor: '綠色工坊',
    rating: 4.6,
    reviews: 312,
    esgTags: ['recycled', 'certified'],
    esgScore: 90,
    minOrder: 50,
  },
  {
    id: '6',
    name: '太魯閣峽谷健行團',
    description: '專業領隊帶領，深度體驗台灣最美峽谷',
    price: 3200,
    originalPrice: null,
    image: '/images/category-travel.png',
    category: 'travel',
    vendor: '綠色旅遊聯盟',
    rating: 4.8,
    reviews: 67,
    esgTags: ['carbon-neutral', 'local'],
    esgScore: 88,
    minOrder: 20,
  },
]

function ProductCard({ product }: { product: typeof mockProducts[0] }) {
  const getEsgTagInfo = (tagId: string) => {
    return esgTags.find(t => t.id === tagId)
  }

  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.originalPrice && (
          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </Badge>
        )}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <Leaf className="h-3 w-3 text-green-600" />
          <span className="text-xs font-medium text-green-700">{product.esgScore}</span>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex gap-1 mb-2">
          {product.esgTags.slice(0, 2).map(tagId => {
            const tag = getEsgTagInfo(tagId)
            return tag ? (
              <Badge key={tagId} variant="secondary" className={`text-xs ${tag.color}`}>
                {tag.name}
              </Badge>
            ) : null
          })}
        </div>
        <h3 className="font-semibold text-stone-800 mb-1 line-clamp-1 group-hover:text-green-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-stone-500 mb-2 line-clamp-2">{product.description}</p>
        <p className="text-xs text-stone-400 mb-3">{product.vendor}</p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-xs text-stone-400">({product.reviews} 評價)</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-green-700">NT$ {product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-stone-400 line-through ml-2">
                NT$ {product.originalPrice.toLocaleString()}
              </span>
            )}
            <p className="text-xs text-stone-400">最低訂購 {product.minOrder} 份</p>
          </div>
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function FilterSidebar({ className }: { className?: string }) {
  return (
    <div className={className}>
      {/* 價格範圍 */}
      <div className="mb-6">
        <h4 className="font-semibold text-stone-800 mb-3">價格範圍</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox id="price-1" />
            <span className="text-sm">NT$ 500 以下</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox id="price-2" />
            <span className="text-sm">NT$ 500 - 2,000</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox id="price-3" />
            <span className="text-sm">NT$ 2,000 - 5,000</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox id="price-4" />
            <span className="text-sm">NT$ 5,000 以上</span>
          </label>
        </div>
      </div>

      {/* ESG 標籤 */}
      <div className="mb-6">
        <h4 className="font-semibold text-stone-800 mb-3">ESG 標籤</h4>
        <div className="space-y-2">
          {esgTags.map(tag => (
            <label key={tag.id} className="flex items-center gap-2 cursor-pointer">
              <Checkbox id={tag.id} />
              <Badge variant="secondary" className={`text-xs ${tag.color}`}>
                {tag.name}
              </Badge>
            </label>
          ))}
        </div>
      </div>

      {/* ESG 分數 */}
      <div className="mb-6">
        <h4 className="font-semibold text-stone-800 mb-3">ESG 分數</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox id="esg-90" />
            <span className="text-sm">90 分以上</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox id="esg-80" />
            <span className="text-sm">80 分以上</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox id="esg-70" />
            <span className="text-sm">70 分以上</span>
          </label>
        </div>
      </div>

      {/* 最低訂購量 */}
      <div>
        <h4 className="font-semibold text-stone-800 mb-3">最低訂購量</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox id="min-10" />
            <span className="text-sm">10 份以下</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox id="min-30" />
            <span className="text-sm">30 份以下</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox id="min-50" />
            <span className="text-sm">50 份以下</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = mockProducts.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false
    }
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <main className="pt-20">
        {/* 頁面標題區 */}
        <div className="bg-gradient-to-r from-green-700 to-emerald-600 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">商品目錄</h1>
            <p className="text-green-100">探索多元綠色採購選項，為企業 ESG 加分</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* 搜尋與篩選列 */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <Input
                placeholder="搜尋商品..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="newest">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">最新上架</SelectItem>
                  <SelectItem value="price-low">價格低到高</SelectItem>
                  <SelectItem value="price-high">價格高到低</SelectItem>
                  <SelectItem value="rating">評價最高</SelectItem>
                  <SelectItem value="esg">ESG 分數</SelectItem>
                </SelectContent>
              </Select>

              {/* 手機版篩選按鈕 */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    篩選
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>篩選條件</SheetTitle>
                  </SheetHeader>
                  <FilterSidebar className="mt-6" />
                </SheetContent>
              </Sheet>

              <div className="hidden lg:flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* 分類標籤 */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className={selectedCategory === category.id ? 'bg-green-600 hover:bg-green-700' : ''}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
                <Badge variant="secondary" className="ml-2 bg-white/20">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          <div className="flex gap-8">
            {/* 桌面版篩選側欄 */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg text-stone-800 mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  篩選條件
                </h3>
                <FilterSidebar />
              </div>
            </aside>

            {/* 商品列表 */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <p className="text-stone-600">
                  共 <span className="font-semibold text-green-700">{filteredProducts.length}</span> 項商品
                </p>
              </div>

              {filteredProducts.length > 0 ? (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-10 w-10 text-stone-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-2">找不到符合的商品</h3>
                  <p className="text-stone-500 mb-4">請嘗試調整搜尋條件或篩選器</p>
                  <Button variant="outline" onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                  }}>
                    清除所有篩選
                  </Button>
                </div>
              )}

              {/* 載入更多 */}
              {filteredProducts.length > 0 && (
                <div className="text-center mt-8">
                  <Button variant="outline" size="lg">
                    載入更多商品
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
