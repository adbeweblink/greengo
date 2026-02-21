'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/auth/mock-auth'
import { toast } from 'sonner'

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && user.role === 'admin') {
      router.push('/admin/dashboard')
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const result = await login(email, password)

    if (result.success) {
      toast.success('登入成功', { description: '歡迎回來，管理員' })
    } else {
      toast.error('登入失敗', { description: result.error })
    }

    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-500">
              <Leaf className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Green購</span>
          </Link>
        </div>

        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center">
                <Shield className="h-7 w-7 text-stone-700" />
              </div>
            </div>
            <CardTitle className="text-2xl">管理員登入</CardTitle>
            <CardDescription>
              僅限授權管理人員使用
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">管理員帳號</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@greengo.com.tw"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">密碼</Label>
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

              <Button type="submit" className="w-full bg-stone-800 hover:bg-stone-900" disabled={isLoading}>
                {isLoading ? '登入中...' : '登入管理後台'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            {/* 測試帳密提示 */}
            <div className="mt-6 pt-4 border-t">
              <p className="text-xs text-stone-400 text-center mb-2">測試帳號</p>
              <div className="bg-stone-50 rounded-lg p-3 text-xs text-stone-600">
                <p><span className="font-medium">帳號：</span>admin@greengo.com.tw</p>
                <p><span className="font-medium">密碼：</span>admin123</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-stone-400">
          <Link href="/" className="hover:text-white">
            返回首頁
          </Link>
          <span className="mx-2">•</span>
          <Link href="/login" className="hover:text-white">
            企業登入
          </Link>
          <span className="mx-2">•</span>
          <Link href="/vendor/login" className="hover:text-white">
            供應商登入
          </Link>
        </div>
      </div>
    </div>
  )
}
