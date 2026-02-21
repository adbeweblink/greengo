'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Leaf,
  Package,
  DollarSign,
  Star,
  TrendingUp,
  LogOut,
  User,
  Bell,
  Settings,
  Eye,
  ShoppingBag,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth/mock-auth'
import {
  getVendorStats,
  getVendorRecentOrders,
  getVendorProducts,
  getVendorNotifications,
  type VendorOrderSummary,
  type VendorProductSummary,
  type VendorNotification,
} from '@/lib/api/vendor'
import type { VendorDashboardStats } from '@/lib/api/dashboard'

export default function VendorDashboardPage() {
  const { user, isLoading: authLoading, logout } = useAuth()
  const router = useRouter()

  // 狀態管理
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<VendorDashboardStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<VendorOrderSummary[]>([])
  const [products, setProducts] = useState<VendorProductSummary[]>([])
  const [notifications, setNotifications] = useState<VendorNotification[]>([])

  // 模擬廠商 ID（實際應從 user 取得）
  const vendorId = 'vendor_001' // 花蓮蜂農合作社

  // 驗證登入狀態
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/vendor/login')
    }
    if (!authLoading && user && user.role !== 'vendor') {
      router.push('/')
    }
  }, [user, authLoading, router])

  // 載入資料
  useEffect(() => {
    async function loadDashboardData() {
      if (!user || user.role !== 'vendor') return

      try {
        setIsLoading(true)
        const [statsData, ordersData, productsData, notificationsData] = await Promise.all([
          getVendorStats(vendorId),
          getVendorRecentOrders(vendorId, 5),
          getVendorProducts(vendorId, 5),
          getVendorNotifications(vendorId, 5),
        ])

        setStats(statsData)
        setRecentOrders(ordersData)
        setProducts(productsData)
        setNotifications(notificationsData)
      } catch (error) {
        console.error('載入廠商資料失敗:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (!authLoading && user) {
      loadDashboardData()
    }
  }, [user, authLoading])

  // 載入中狀態
  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
      </div>
    )
  }

  // 未讀通知數
  const unreadCount = notifications.filter((n) => !n.isRead).length

  // 通知圖示
  const getNotificationIcon = (type: VendorNotification['type']) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="h-4 w-4 text-blue-600" />
      case 'review':
        return <Star className="h-4 w-4 text-yellow-600" />
      case 'payment':
        return <DollarSign className="h-4 w-4 text-green-600" />
      case 'system':
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-500">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-stone-800">Green購</span>
            <Badge variant="secondary" className="ml-2 bg-emerald-100 text-emerald-700">
              供應商
            </Badge>
          </Link>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <User className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-stone-500">{user.company}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-stone-800">供應商後台</h1>
          <p className="text-stone-600">{user.company}</p>
        </div>

        {isLoading ? (
          // 載入中骨架
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-stone-200 rounded w-20 mb-2" />
                    <div className="h-8 bg-stone-200 rounded w-32" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-stone-500">本月營收</p>
                      <p className="text-2xl font-bold text-stone-800">
                        NT$ {stats?.monthlyRevenue.toLocaleString() || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-stone-500">待處理訂單</p>
                      <p className="text-2xl font-bold text-stone-800">{stats?.pendingOrders || 0}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                      <Package className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-stone-500">上架商品</p>
                      <p className="text-2xl font-bold text-stone-800">
                        {stats?.activeProducts || 0}
                        <span className="text-sm text-stone-400 font-normal ml-1">
                          / {stats?.totalProducts || 0}
                        </span>
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Eye className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-stone-500">平均評價</p>
                      <p className="text-2xl font-bold text-stone-800">
                        {stats?.rating.toFixed(1) || 0}
                        <Star className="h-5 w-5 text-yellow-500 inline ml-1 mb-1" />
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Orders */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>最近訂單</CardTitle>
                      <CardDescription>需要處理的訂單</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      查看全部
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {recentOrders.length === 0 ? (
                      <div className="text-center py-8 text-stone-500">
                        <ShoppingBag className="h-12 w-12 mx-auto mb-2 text-stone-300" />
                        <p>目前沒有訂單</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recentOrders.map((order) => (
                          <div
                            key={order.id}
                            className="flex items-center justify-between p-4 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                                <ShoppingBag className="h-5 w-5 text-emerald-600" />
                              </div>
                              <div>
                                <p className="font-medium text-stone-800">
                                  {order.products.map((p) => `${p.name} x ${p.qty}`).join(', ')}
                                </p>
                                <p className="text-sm text-stone-500">{order.buyer}</p>
                                <p className="text-xs text-stone-400">
                                  {order.orderNumber} • {order.date}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-stone-800">
                                NT$ {order.total.toLocaleString()}
                              </p>
                              <Badge variant="secondary" className={order.statusColor}>
                                {order.statusLabel}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Notifications */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>最新通知</CardTitle>
                      <CardDescription>
                        {unreadCount > 0 ? `${unreadCount} 則未讀` : '沒有未讀通知'}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm">
                      全部標為已讀
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`flex items-start gap-3 p-3 rounded-lg ${
                            notification.isRead ? 'bg-white' : 'bg-emerald-50'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-full bg-white border flex items-center justify-center shrink-0">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-stone-800">{notification.title}</p>
                            <p className="text-sm text-stone-600 truncate">{notification.message}</p>
                            <p className="text-xs text-stone-400 mt-1">
                              {new Date(notification.createdAt).toLocaleString('zh-TW')}
                            </p>
                          </div>
                          {!notification.isRead && (
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-2" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Products & Actions */}
              <div className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>我的商品</CardTitle>
                    <CardDescription>上架中的商品</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {products.length === 0 ? (
                      <div className="text-center py-4 text-stone-500">
                        <Package className="h-8 w-8 mx-auto mb-2 text-stone-300" />
                        <p className="text-sm">尚未上架商品</p>
                      </div>
                    ) : (
                      products.map((product) => (
                        <div key={product.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-stone-800 text-sm">{product.name}</p>
                            <p className="text-xs text-stone-500">
                              庫存: {product.stock} | 銷售: {product.sales}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-emerald-600">
                            NT$ {product.price.toLocaleString()}
                          </p>
                        </div>
                      ))
                    )}
                    <Button variant="outline" className="w-full">
                      管理商品
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>快速操作</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Package className="h-4 w-4 mr-2" />
                      新增商品
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      處理訂單
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      銷售報表
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <DollarSign className="h-4 w-4 mr-2" />
                      帳務明細
                    </Button>
                  </CardContent>
                </Card>

                {/* ESG Score Card */}
                <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-teal-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-emerald-600" />
                      ESG 評分
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mb-2">
                        <span className="text-2xl font-bold text-emerald-700">85</span>
                      </div>
                      <p className="text-sm text-stone-600">優良評等</p>
                      <div className="mt-3 flex flex-wrap gap-1 justify-center">
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                          有機認證
                        </Badge>
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                          產銷履歷
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
