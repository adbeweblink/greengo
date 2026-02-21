'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  ChevronRight,
  Leaf,
  ArrowLeft,
  ShieldCheck,
  Truck,
  CreditCard,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { useCart } from '@/contexts/CartContext'

// 格式化價格
function formatPrice(price: number): string {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export default function CartPage() {
  const { cart, summary, loading, updateQuantity, removeItem, clearCart } =
    useCart()
  const [selectedItems, setSelectedItems] = useState<Set<string>>(
    new Set(cart.items.map((item) => item.productId))
  )

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(new Set(cart.items.map((item) => item.productId)))
    } else {
      setSelectedItems(new Set())
    }
  }

  const handleSelectItem = (productId: string, checked: boolean) => {
    const newSelected = new Set(selectedItems)
    if (checked) {
      newSelected.add(productId)
    } else {
      newSelected.delete(productId)
    }
    setSelectedItems(newSelected)
  }

  const handleQuantityChange = async (productId: string, delta: number) => {
    const item = cart.items.find((i) => i.productId === productId)
    if (!item) return

    const newQuantity = item.quantity + delta
    if (newQuantity < 1) {
      await removeItem(productId)
      selectedItems.delete(productId)
      setSelectedItems(new Set(selectedItems))
    } else {
      await updateQuantity(productId, newQuantity)
    }
  }

  const handleRemoveSelected = async () => {
    for (const productId of selectedItems) {
      await removeItem(productId)
    }
    setSelectedItems(new Set())
  }

  const allSelected =
    cart.items.length > 0 && selectedItems.size === cart.items.length
  const someSelected = selectedItems.size > 0

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-48" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                        <div className="h-6 bg-gray-200 rounded w-1/4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg p-6 h-fit">
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-12 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 麵包屑 */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-green-600">
            首頁
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">購物車</span>
        </nav>

        {/* 標題 */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingBag className="h-7 w-7 text-green-600" />
            購物車
            {cart.itemCount > 0 && (
              <span className="text-lg text-gray-500 font-normal">
                ({cart.itemCount} 件商品)
              </span>
            )}
          </h1>
          <Button variant="ghost" asChild>
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              繼續購物
            </Link>
          </Button>
        </div>

        {cart.items.length === 0 ? (
          /* 空購物車 */
          <div className="bg-white rounded-xl p-12 text-center">
            <ShoppingBag className="h-20 w-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              您的購物車是空的
            </h2>
            <p className="text-gray-500 mb-8">
              探索我們的永續商品，為地球盡一份心力！
            </p>
            <Button size="lg" asChild>
              <Link href="/products">開始選購</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左側：購物車項目 */}
            <div className="lg:col-span-2 space-y-4">
              {/* 全選工具列 */}
              <Card>
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={handleSelectAll}
                      id="select-all"
                    />
                    <label
                      htmlFor="select-all"
                      className="text-sm font-medium cursor-pointer"
                    >
                      全選 ({cart.items.length} 件)
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    {someSelected && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={handleRemoveSelected}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        刪除選取 ({selectedItems.size})
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500"
                      onClick={() => clearCart()}
                    >
                      清空購物車
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 購物車項目列表 */}
              {cart.items.map((item) => (
                <Card key={item.productId}>
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex gap-4">
                      {/* 選取 */}
                      <div className="flex items-center">
                        <Checkbox
                          checked={selectedItems.has(item.productId)}
                          onCheckedChange={(checked) =>
                            handleSelectItem(item.productId, checked as boolean)
                          }
                        />
                      </div>

                      {/* 商品圖片 */}
                      <Link
                        href={`/products/${item.productId}`}
                        className="relative w-24 h-24 lg:w-32 lg:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100"
                      >
                        <Image
                          src={
                            item.product.images[0] || '/images/placeholder.jpg'
                          }
                          alt={item.product.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform"
                        />
                        {/* ESG 標籤 */}
                        <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                          ESG {item.product.esgScore}
                        </div>
                      </Link>

                      {/* 商品資訊 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
                          <div>
                            <Link
                              href={`/products/${item.productId}`}
                              className="font-medium text-gray-900 hover:text-green-600 line-clamp-2"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">
                              {item.product.vendor.name}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.product.esgTags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* 價格 */}
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatPrice(item.product.price)} / 件
                            </p>
                          </div>
                        </div>

                        {/* 數量控制與操作 */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border rounded-lg">
                              <button
                                onClick={() =>
                                  handleQuantityChange(item.productId, -1)
                                }
                                className="p-2 hover:bg-gray-100"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-12 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(item.productId, 1)
                                }
                                disabled={item.quantity >= item.product.stock}
                                className="p-2 hover:bg-gray-100 disabled:opacity-50"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <span className="text-sm text-gray-400">
                              庫存 {item.product.stock} 件
                            </span>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeItem(item.productId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 右側：訂單摘要 */}
            <div className="space-y-4">
              {/* ESG 影響力 */}
              {summary.esgScore > 0 && (
                <Card className="bg-green-50 border-green-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-800 flex items-center gap-2 text-lg">
                      <Leaf className="h-5 w-5" />
                      永續影響力
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">平均 ESG 分數</span>
                      <span className="font-bold text-green-800">
                        {summary.esgScore} 分
                      </span>
                    </div>
                    {summary.carbonSaved > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-700">預估減碳量</span>
                        <span className="font-bold text-green-800">
                          {summary.carbonSaved.toFixed(1)} kg CO₂
                        </span>
                      </div>
                    )}
                    <p className="text-xs text-green-600 mt-2">
                      感謝您選擇永續商品，為地球盡一份心力！
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* 訂單金額 */}
              <Card>
                <CardHeader>
                  <CardTitle>訂單摘要</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        商品小計 ({cart.itemCount} 件)
                      </span>
                      <span>{formatPrice(summary.subtotal)}</span>
                    </div>
                    {summary.discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>折扣優惠</span>
                        <span>-{formatPrice(summary.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">運費</span>
                      <span>
                        {summary.shipping === 0
                          ? '免運費'
                          : formatPrice(summary.shipping)}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>應付金額</span>
                    <span className="text-green-600">
                      {formatPrice(summary.total)}
                    </span>
                  </div>

                  {/* 滿額免運提示 */}
                  {summary.subtotal < 5000 && (
                    <div className="bg-yellow-50 text-yellow-800 text-sm p-3 rounded-lg">
                      再消費 {formatPrice(5000 - summary.subtotal)} 即可享免運費！
                    </div>
                  )}

                  {/* 滿額折扣提示 */}
                  {summary.subtotal < 10000 && (
                    <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded-lg">
                      滿 $10,000 享 95 折優惠
                    </div>
                  )}

                  <Button
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700"
                    asChild
                  >
                    <Link href="/checkout">前往結帳</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* 服務保證 */}
              <Card>
                <CardContent className="py-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                    <span>安全付款保障</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Truck className="h-5 w-5 text-green-600" />
                    <span>企業專屬配送服務</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CreditCard className="h-5 w-5 text-green-600" />
                    <span>支援月結帳款</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
