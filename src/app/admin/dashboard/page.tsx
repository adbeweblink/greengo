'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Leaf, Users, Store, ShoppingCart, DollarSign, TrendingUp, LogOut, User, Bell, Settings, AlertTriangle, CheckCircle, Clock, FileText, Activity, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth/mock-auth'
import {
  getAdminStats,
  getPendingApprovals,
  getAdminActivities,
  getSystemStatus,
  type PendingApproval,
  type AdminActivity,
  type SystemStatus,
} from '@/lib/api/admin'
import type { AdminDashboardStats } from '@/lib/api/dashboard'

export default function AdminDashboardPage() {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()

  // 狀態管理
  const [stats, setStats] = useState<AdminDashboardStats | null>(null)
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([])
  const [activities, setActivities] = useState<AdminActivity[]>([])
  const [systemStatus, setSystemStatus] = useState<SystemStatus[]>([])
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/admin/login')
    }
    if (!isLoading && user && user.role !== 'admin') {
      router.push('/')
    }
  }, [user, isLoading, router])

  // 載入資料
  useEffect(() => {
    async function loadData() {
      if (!user || user.role !== 'admin') return

      try {
        const [statsData, approvalsData, activitiesData, statusData] = await Promise.all([
          getAdminStats(),
          getPendingApprovals(5),
          getAdminActivities(5),
          getSystemStatus(),
        ])

        setStats(statsData)
        setPendingApprovals(approvalsData)
        setActivities(activitiesData)
        setSystemStatus(statusData)
      } catch (error) {
        console.error('載入資料失敗:', error)
      } finally {
        setDataLoading(false)
      }
    }

    if (user && user.role === 'admin') {
      loadData()
    }
  }, [user])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
      </div>
    )
  }

  // 取得系統健康狀態
  const onlineServices = systemStatus.filter(s => s.status === 'online').length
  const totalServices = systemStatus.length

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Header */}
      <header className="bg-stone-900 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">Green購</span>
            <Badge variant="secondary" className="ml-2 bg-red-500 text-white">管理員</Badge>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
              <Bell className="h-5 w-5" />
              {pendingApprovals.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {pendingApprovals.length}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <span className="text-sm">{user.name}</span>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={logout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-stone-800">管理員儀表板</h1>
          <p className="text-stone-600">平台營運概覽</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500">總企業數</p>
                  {dataLoading ? (
                    <div className="h-8 w-20 bg-stone-200 animate-pulse rounded mt-1" />
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-stone-800">{stats?.totalCompanies.toLocaleString()}</p>
                      <p className="text-xs text-green-600">+12 本月</p>
                    </>
                  )}
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500">供應商數</p>
                  {dataLoading ? (
                    <div className="h-8 w-20 bg-stone-200 animate-pulse rounded mt-1" />
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-stone-800">{stats?.totalVendors.toLocaleString()}</p>
                      <p className="text-xs text-green-600">+5 本月</p>
                    </>
                  )}
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Store className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500">本月訂單</p>
                  {dataLoading ? (
                    <div className="h-8 w-20 bg-stone-200 animate-pulse rounded mt-1" />
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-stone-800">{stats?.totalOrders.toLocaleString()}</p>
                      <p className="text-xs text-green-600">+23% vs 上月</p>
                    </>
                  )}
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500">本月 GMV</p>
                  {dataLoading ? (
                    <div className="h-8 w-20 bg-stone-200 animate-pulse rounded mt-1" />
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-stone-800">
                        NT$ {((stats?.monthlyGMV || 0) / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-xs text-green-600">+18% vs 上月</p>
                    </>
                  )}
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pending Approvals */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    待審核項目
                  </CardTitle>
                  <CardDescription>需要您處理的申請</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                  {stats?.pendingApprovals || 0} 待處理
                </Badge>
              </CardHeader>
              <CardContent>
                {dataLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-stone-200 animate-pulse rounded-lg" />
                          <div>
                            <div className="h-4 w-32 bg-stone-200 animate-pulse rounded" />
                            <div className="h-3 w-24 bg-stone-200 animate-pulse rounded mt-2" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingApprovals.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            item.type === 'vendor' ? 'bg-emerald-100' :
                            item.type === 'company' ? 'bg-blue-100' : 'bg-purple-100'
                          }`}>
                            {item.type === 'vendor' ? (
                              <Store className="h-5 w-5 text-emerald-600" />
                            ) : item.type === 'company' ? (
                              <Users className="h-5 w-5 text-blue-600" />
                            ) : (
                              <ShoppingCart className="h-5 w-5 text-purple-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-stone-800">{item.name}</p>
                            <p className="text-sm text-stone-500">
                              {item.type === 'vendor' ? '供應商申請' :
                               item.type === 'company' ? '企業註冊' : '商品上架'} • {item.date}
                            </p>
                            {item.description && (
                              <p className="text-xs text-stone-400 mt-1">{item.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                            拒絕
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            核准
                          </Button>
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
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  最近活動
                </CardTitle>
                <CardDescription>平台即時動態</CardDescription>
              </CardHeader>
              <CardContent>
                {dataLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-stone-200 animate-pulse rounded-full" />
                        <div className="flex-1">
                          <div className="h-4 w-32 bg-stone-200 animate-pulse rounded" />
                          <div className="h-3 w-24 bg-stone-200 animate-pulse rounded mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.type === 'order' ? 'bg-purple-100' :
                          activity.type === 'vendor' ? 'bg-emerald-100' :
                          activity.type === 'company' ? 'bg-blue-100' : 'bg-stone-100'
                        }`}>
                          {activity.type === 'order' ? (
                            <ShoppingCart className="h-4 w-4 text-purple-600" />
                          ) : activity.type === 'vendor' ? (
                            <Store className="h-4 w-4 text-emerald-600" />
                          ) : activity.type === 'company' ? (
                            <Users className="h-4 w-4 text-blue-600" />
                          ) : (
                            <Settings className="h-4 w-4 text-stone-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-stone-800">{activity.action}</p>
                          <p className="text-xs text-stone-500">{activity.detail}</p>
                        </div>
                        <span className="text-xs text-stone-400">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & System */}
          <div className="space-y-6">
            {/* Platform Health */}
            <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-stone-800">平台健康度</h3>
                  <Badge className="bg-green-100 text-green-700 border-0">
                    {totalServices > 0 ? Math.round((onlineServices / totalServices) * 100) : 0}% 正常
                  </Badge>
                </div>
                <div className="text-center py-4">
                  <p className="text-4xl font-bold text-green-600">
                    {onlineServices}/{totalServices}
                  </p>
                  <p className="text-sm text-stone-500 mt-1">服務運行中</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>快速操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  企業管理
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Store className="h-4 w-4 mr-2" />
                  供應商管理
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  訂單管理
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  報表中心
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  ESG 總覽
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>系統狀態</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dataLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="h-4 w-24 bg-stone-200 animate-pulse rounded" />
                        <div className="h-5 w-12 bg-stone-200 animate-pulse rounded" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {systemStatus.map((service) => (
                      <div key={service.service} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {service.status === 'online' ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : service.status === 'degraded' ? (
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-sm">{service.service}</span>
                        </div>
                        <Badge variant="secondary" className={
                          service.status === 'online' ? 'bg-green-100 text-green-700' :
                          service.status === 'degraded' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }>
                          {service.status === 'online' ? '正常' :
                           service.status === 'degraded' ? '降級' : '離線'}
                          {service.latency && ` ${service.latency}ms`}
                        </Badge>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-stone-400" />
                        <span className="text-sm">最後檢查</span>
                      </div>
                      <span className="text-xs text-stone-500">剛剛</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
