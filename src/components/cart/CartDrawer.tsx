'use client'

import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus, ShoppingBag, Trash2, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import { useCart } from '@/contexts/CartContext'
import { cn } from '@/lib/utils'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
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

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, summary, loading, updateQuantity, removeItem, clearCart } =
    useCart()

  const handleQuantityChange = async (productId: string, delta: number) => {
    const item = cart.items.find((i) => i.productId === productId)
    if (!item) return

    const newQuantity = item.quantity + delta
    if (newQuantity < 1) {
      await removeItem(productId)
    } else {
      await updateQuantity(productId, newQuantity)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="space-y-2.5 pb-4 border-b">
          <SheetTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              購物車
              {cart.itemCount > 0 && (
                <span className="bg-green-100 text-green-800 text-sm px-2 py-0.5 rounded-full">
                  {cart.itemCount} 件
                </span>
              )}
            </span>
            {cart.items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => clearCart()}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                清空
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* 購物車內容 */}
        <div className="flex-1 overflow-y-auto py-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 animate-pulse">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                購物車是空的
              </h3>
              <p className="text-gray-500 mb-6">快去選購永續好物吧！</p>
              <Button asChild onClick={onClose}>
                <Link href="/products">開始購物</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.productId} className="flex gap-4">
                  {/* 商品圖片 */}
                  <Link
                    href={`/products/${item.productId}`}
                    onClick={onClose}
                    className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100"
                  >
                    <Image
                      src={
                        item.product.images[0] || '/images/placeholder.jpg'
                      }
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  {/* 商品資訊 */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.productId}`}
                      onClick={onClose}
                      className="font-medium text-gray-900 hover:text-green-600 line-clamp-2"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {item.product.vendor.name}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold text-green-600">
                        {formatPrice(item.product.price)}
                      </span>

                      {/* 數量控制 */}
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.productId, -1)
                          }
                          className="p-1.5 hover:bg-gray-100"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.productId, 1)
                          }
                          disabled={item.quantity >= item.product.stock}
                          className="p-1.5 hover:bg-gray-100 disabled:opacity-50"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 刪除按鈕 */}
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="p-1 text-gray-400 hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 購物車摘要 */}
        {cart.items.length > 0 && (
          <SheetFooter className="flex-col border-t pt-4 space-y-4">
            {/* ESG 資訊 */}
            {summary.esgScore > 0 && (
              <div className="flex items-center justify-center gap-4 bg-green-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-green-700">
                  <Leaf className="h-4 w-4" />
                  <span className="text-sm">
                    平均 ESG 分數：<strong>{summary.esgScore}</strong>
                  </span>
                </div>
                {summary.carbonSaved > 0 && (
                  <>
                    <Separator orientation="vertical" className="h-4" />
                    <span className="text-sm text-green-700">
                      減碳：<strong>{summary.carbonSaved.toFixed(1)} kg</strong>
                    </span>
                  </>
                )}
              </div>
            )}

            {/* 金額明細 */}
            <div className="space-y-2 w-full">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">小計</span>
                <span>{formatPrice(summary.subtotal)}</span>
              </div>
              {summary.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>折扣</span>
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
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>總計</span>
                <span className="text-green-600">
                  {formatPrice(summary.total)}
                </span>
              </div>
            </div>

            {/* 結帳按鈕 */}
            <div className="flex gap-3 w-full">
              <Button variant="outline" className="flex-1" onClick={onClose}>
                繼續購物
              </Button>
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                asChild
                onClick={onClose}
              >
                <Link href="/checkout">前往結帳</Link>
              </Button>
            </div>

            {/* 滿額免運提示 */}
            {summary.subtotal < 5000 && (
              <p className="text-center text-sm text-gray-500">
                再消費 {formatPrice(5000 - summary.subtotal)} 即可免運費
              </p>
            )}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
