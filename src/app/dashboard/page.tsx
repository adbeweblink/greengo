'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Leaf, ShoppingCart, FileText, BarChart3, Package, Clock,
  TrendingUp, LogOut, User, Bell, Settings, ChevronRight,
  CalendarDays, Users, Building2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/lib/auth/mock-auth'
import { useCart } from '@/contexts/CartContext'
import {
  getCompanyDashboardStats,
  getRecentOrders,
  getESGReport,
  getRecentActivities
} from '@/lib/api/dashboard'

interface DashboardStats {
  totalOrders: number
  pendingOrders: number
  monthlySpending: number
  esgScore: number
  carbonSaved: number
  employeesUsed: number
}

interface RecentOrder {
  id: string
  orderNumber: string
  itemCount: number
  total: number
  status: string
  companyName: string
  createdAt: string
}

interface ESGReportData {
  summary: {
    totalAmount: number
    esgAmount: number
    esgPercentage: number
    carbonSaved: number
    treesEquivalent: number
  }
  byCategory: Array<{
    category: string
    label: string
    amount: number
    percentage: number
  }>
}

interface Activity {
  id: string
  type: string
  title: string
  description: string
  timestamp: string
}

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth()
  const { summary: cartSummary } = useCart()
  const router = useRouter()

  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [orders, setOrders] = useState<RecentOrder[]>([])
  const [esgReport, setEsgReport] = useState<ESGReportData | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
    if (!isLoading && user && user.role !== 'company') {
      router.push('/')
    }
  }, [user, isLoading, router])

  useEffect(() => {
    async function loadDashboardData() {
      if (!user) return

      try {
        const [statsData, ordersData, esgData, activitiesData] = await Promise.all([
          getCompanyDashboardStats(),
          getRecentOrders(5),
          getESGReport(),
          getRecentActivities(5),
        ])

        setStats(statsData)
        setOrders(ordersData)
        setEsgReport(esgData)
        setActivities(activitiesData)
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      } finally {
        setDataLoading(false)
      }
    }

    if (user) {
      loadDashboardData()
    }
  }, [user])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-TW', {
      month: 'short',
      day: 'numeric',
    })
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      PENDING: { label: '待處理', className: 'bg-yellow-100 text-yellow-700' },
      APPROVED: { label: '已核准', className: 'bg-blue-100 text-blue-700' },
      PROCESSING: { label: '處理中', className: 'bg-amber-100 text-amber-700' },
      SHIPPED: { label: '已出貨', className: 'bg-purple-100 text-purple-700' },
      DELIVERED: { label: '已送達', className: 'bg-green-100 text-green-700' },
      COMPLETED: { label: '已完成', className: 'bg-green-100 text-green-700' },
      CANCELLED: { label: '已取消', className: 'bg-stone-100 text-stone-700' },
    }
    const config = statusMap[status] || { label: status, className: 'bg-stone-100 text-stone-700' }
    return <Badge className={config.className}>{config.label}</Badge>
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-500">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-stone-800">Green購</span>
            <Badge variant="secondary" className="ml-2">企業後台</Badge>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartSummary.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-600 text-white text-xs flex items-center justify-center">
                    {cartSummary.itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2 ml-2 pl-4 border-l">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <User className="h-4 w-4 text-green-600" />
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-stone-800">歡迎回來，{user.name}</h1>
            <p className="text-stone-600 flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              {user.company}
            </p>
          </div>
          <Link href="/products">
            <Button className="bg-green-600 hover:bg-green-700">
              <ShoppingCart className="h-4 w-4 mr-2" />
              開始採購
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500">本月採購</p>
                  <p className="text-2xl font-bold text-stone-800">
                    {dataLoading ? '...' : `NT$ ${stats?.monthlySpending.toLocaleString()}`}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    較上月 +12.5%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500">進行中訂單</p>
                  <p className="text-2xl font-bold text-stone-800">
                    {dataLoading ? '...' : stats?.pendingOrders}
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    總訂單 {stats?.totalOrders || 0} 筆
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500">ESG 總分</p>
                  <p className="text-2xl font-bold text-stone-800">
                    {dataLoading ? '...' : stats?.esgScore}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    優於 85% 企業
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500">累積碳減量</p>
                  <p className="text-2xl font-bold text-stone-800">
                    {dataLoading ? '...' : `${stats?.carbonSaved} 噸`}
                  </p>
                  <p className="text-xs text-purple-600 mt-1">
                    約 {esgReport?.summary.treesEquivalent || 0} 棵樹
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-purple-600" />
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
                  <CardDescription>您最近的採購紀錄</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  查看全部
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                {dataLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-stone-300 mx-auto mb-3" />
                    <p className="text-stone-500">尚無訂單記錄</p>
                    <Link href="/products">
                      <Button variant="outline" size="sm" className="mt-4">
                        開始採購
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                            <Package className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-stone-800">
                              {order.companyName}
                              {order.itemCount > 1 && ` (${order.itemCount} 項商品)`}
                            </p>
                            <p className="text-sm text-stone-500">
                              {order.orderNumber} • {formatDate(order.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-stone-800">
                            NT$ {order.total.toLocaleString()}
                          </p>
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>最新動態</CardTitle>
                <CardDescription>系統通知與活動紀錄</CardDescription>
              </CardHeader>
              <CardContent>
                {dataLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'order' ? 'bg-green-500' :
                          activity.type === 'approval' ? 'bg-blue-500' :
                          activity.type === 'vendor' ? 'bg-purple-500' :
                          'bg-amber-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-stone-800">{activity.title}</p>
                          <p className="text-sm text-stone-500">{activity.description}</p>
                          <p className="text-xs text-stone-400 mt-1">
                            {formatDate(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* ESG Summary */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>ESG 分數</CardTitle>
                <CardDescription>本季度永續績效</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {esgReport?.byCategory.map((category) => (
                  <div key={category.category}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-stone-600">{category.label}</span>
                      <span className="text-sm font-medium">{Math.round(category.percentage)}%</span>
                    </div>
                    <Progress value={category.percentage} className="h-2" />
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-stone-600">ESG 採購比例</span>
                    <span className="text-lg font-bold text-green-600">
                      {esgReport?.summary.esgPercentage || 0}%
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">
                    ESG 採購金額 NT$ {esgReport?.summary.esgAmount.toLocaleString() || 0}
                  </p>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <FileText className="h-4 w-4 mr-2" />
                  下載 ESG 報告
                </Button>
              </CardContent>
            </Card>

            {/* Employee Usage */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>員工使用統計</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-stone-800">
                      {stats?.employeesUsed || 0}
                    </p>
                    <p className="text-sm text-stone-500">本月使用人數</p>
                  </div>
                </div>
                <Progress value={75} className="h-2 mb-2" />
                <p className="text-xs text-stone-500">
                  福利金使用率 75%（剩餘 NT$ 125,000）
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>快速操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/products">
                  <Button variant="outline" className="w-full justify-start">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    瀏覽商品
                  </Button>
                </Link>
                <Link href="/cart">
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="h-4 w-4 mr-2" />
                    購物車 ({cartSummary.itemCount})
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  查看訂單
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  ESG 分析
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  預約活動
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
