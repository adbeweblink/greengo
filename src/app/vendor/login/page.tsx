'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight, Store } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/auth/mock-auth'
import { toast } from 'sonner'

export default function VendorLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && user.role === 'vendor') {
      router.push('/vendor/dashboard')
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const result = await login(email, password)

    if (result.success) {
      toast.success('登入成功', { description: '歡迎回來，夥伴' })
    } else {
      toast.error('登入失敗', { description: result.error })
    }

    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen">
      {/* 左側品牌區 */}
      <div className="hidden w-1/2 bg-gradient-to-br from-emerald-700 to-teal-600 lg:flex lg:flex-col lg:justify-between p-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">Green購</span>
        </Link>

        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Store className="h-8 w-8 text-white" />
            <span className="text-lg text-emerald-100">供應商專區</span>
          </div>
          <h1 className="text-4xl font-bold text-white">
            歡迎回來，夥伴
          </h1>
          <p className="text-lg text-emerald-100">
            登入供應商後台，管理您的商品、訂單與帳務。
            與 500+ 企業客戶建立長期合作關係。
          </p>
          <div className="flex gap-4">
            <div className="rounded-lg bg-white/10 backdrop-blur-sm p-4">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-emerald-100">企業客戶</div>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur-sm p-4">
              <div className="text-2xl font-bold text-white">85%</div>
              <div className="text-sm text-emerald-100">成交率</div>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur-sm p-4">
              <div className="text-2xl font-bold text-white">7 天</div>
              <div className="text-sm text-emerald-100">撥款週期</div>
            </div>
          </div>
        </div>

        <p className="text-sm text-emerald-100">
          © {new Date().getFullYear()} Green購 企業福利網
        </p>
      </div>

      {/* 右側登入表單 */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="flex justify-center lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-500">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-stone-800">Green購</span>
            </Link>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Store className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">供應商登入</CardTitle>
              <CardDescription>
                登入您的供應商帳戶
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">電子郵件</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="vendor@company.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">密碼</Label>
                    <Link href="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700">
                      忘記密碼？
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                  {isLoading ? '登入中...' : '登入'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-stone-600">
                還不是供應商？{' '}
                <Link href="/vendor" className="font-medium text-emerald-600 hover:text-emerald-700">
                  了解如何加入
                </Link>
              </div>

              {/* 測試帳密提示 */}
              <div className="mt-6 pt-4 border-t">
                <p className="text-xs text-stone-400 text-center mb-2">測試帳號</p>
                <div className="bg-emerald-50 rounded-lg p-3 text-xs text-stone-600">
                  <p><span className="font-medium">帳號：</span>vendor@test.com</p>
                  <p><span className="font-medium">密碼：</span>12345678</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t text-center">
                <Link href="/login" className="text-sm text-stone-500 hover:text-stone-700">
                  企業用戶請由此登入
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
