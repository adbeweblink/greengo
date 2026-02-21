'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/auth/mock-auth'
import { toast } from 'sonner'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const result = await login(email, password)

    if (!result.success) {
      toast.error(result.error || '登入失敗')
    } else {
      toast.success('登入成功！')
    }

    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen">
      {/* 左側品牌區 */}
      <div className="hidden w-1/2 bg-gradient-to-br from-green-700 to-emerald-600 lg:flex lg:flex-col lg:justify-between p-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">Green購</span>
        </Link>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white">
            歡迎回來
          </h1>
          <p className="text-lg text-green-100">
            登入您的帳戶，開始永續採購之旅。
            管理訂單、查看 ESG 報告、探索更多綠色商品。
          </p>
          <div className="flex gap-4">
            <div className="rounded-lg bg-white/10 backdrop-blur-sm p-4">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-green-100">合作企業</div>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur-sm p-4">
              <div className="text-2xl font-bold text-white">200+</div>
              <div className="text-sm text-green-100">優質供應商</div>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur-sm p-4">
              <div className="text-2xl font-bold text-white">95%</div>
              <div className="text-sm text-green-100">滿意度</div>
            </div>
          </div>

          {/* 測試帳號提示 */}
          <div className="rounded-lg bg-white/10 backdrop-blur-sm p-4 text-sm">
            <p className="font-medium text-white mb-2">測試帳號：</p>
            <p className="text-green-100">企業：company@test.com / 12345678</p>
            <p className="text-green-100">供應商：vendor@test.com / 12345678</p>
          </div>
        </div>

        <p className="text-sm text-green-100">
          © {new Date().getFullYear()} Green購 企業福利網
        </p>
      </div>

      {/* 右側登入表單 */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="flex justify-center lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-500">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-stone-800">Green購</span>
            </Link>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">登入帳戶</CardTitle>
              <CardDescription>
                選擇您的身份類型進行登入
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="company" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="company">企業用戶</TabsTrigger>
                  <TabsTrigger value="vendor">供應商</TabsTrigger>
                </TabsList>

                <TabsContent value="company">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">電子郵件</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="company@test.com"
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
                        <Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-700">
                          忘記密碼？
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="12345678"
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

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                      {isLoading ? '登入中...' : '登入'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="vendor">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="vendor-email">供應商帳號</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                        <Input
                          id="vendor-email"
                          type="email"
                          placeholder="vendor@test.com"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="vendor-password">密碼</Label>
                        <Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-700">
                          忘記密碼？
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                        <Input
                          id="vendor-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="12345678"
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

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                      {isLoading ? '登入中...' : '供應商登入'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center text-sm text-stone-600">
                還沒有帳戶？{' '}
                <Link href="/register" className="font-medium text-green-600 hover:text-green-700">
                  立即註冊
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
