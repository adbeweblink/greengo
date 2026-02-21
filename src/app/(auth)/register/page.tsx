'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Leaf, Mail, Lock, Eye, EyeOff, Building2, User, Phone, FileText, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const benefits = [
  '一站式採購綠色禮品、旅遊、志工活動',
  '自動產出 ESG 報告，節省大量時間',
  '大型企業可申請月結服務',
  '完整的簽核流程，符合企業內控',
]

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 2) {
      setStep(step + 1)
      return
    }
    setIsLoading(true)
    // TODO: 實作註冊邏輯
    setTimeout(() => setIsLoading(false), 1000)
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
            加入 Green購
          </h1>
          <p className="text-lg text-green-100">
            開始您的企業永續採購之旅，
            讓每一筆採購都為 ESG 加分。
          </p>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-300 flex-shrink-0" />
                <span className="text-green-100">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-green-100">
          © {new Date().getFullYear()} Green購 企業福利網
        </p>
      </div>

      {/* 右側註冊表單 */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2 overflow-auto">
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
              <CardTitle className="text-2xl">註冊帳戶</CardTitle>
              <CardDescription>
                選擇您的註冊類型
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="company" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="company">企業註冊</TabsTrigger>
                  <TabsTrigger value="vendor">供應商申請</TabsTrigger>
                </TabsList>

                <TabsContent value="company">
                  {/* 進度指示 */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${step >= 1 ? 'bg-green-600 text-white' : 'bg-stone-200 text-stone-600'}`}>
                      1
                    </div>
                    <div className={`h-1 w-12 rounded ${step >= 2 ? 'bg-green-600' : 'bg-stone-200'}`} />
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${step >= 2 ? 'bg-green-600 text-white' : 'bg-stone-200 text-stone-600'}`}>
                      2
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {step === 1 && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="company-name">公司名稱</Label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                            <Input
                              id="company-name"
                              placeholder="台灣科技股份有限公司"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tax-id">統一編號</Label>
                          <div className="relative">
                            <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                            <Input
                              id="tax-id"
                              placeholder="12345678"
                              maxLength={8}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="industry">產業類別</Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="請選擇產業類別" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tech">科技業</SelectItem>
                              <SelectItem value="finance">金融業</SelectItem>
                              <SelectItem value="manufacturing">製造業</SelectItem>
                              <SelectItem value="service">服務業</SelectItem>
                              <SelectItem value="retail">零售業</SelectItem>
                              <SelectItem value="other">其他</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="employee-count">員工人數</Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="請選擇員工人數" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-50">1-50 人</SelectItem>
                              <SelectItem value="51-200">51-200 人</SelectItem>
                              <SelectItem value="201-500">201-500 人</SelectItem>
                              <SelectItem value="501-1000">501-1000 人</SelectItem>
                              <SelectItem value="1000+">1000 人以上</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="contact-name">聯絡人姓名</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                            <Input
                              id="contact-name"
                              placeholder="王小明"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contact-phone">聯絡電話</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                            <Input
                              id="contact-phone"
                              type="tel"
                              placeholder="0912345678"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">電子郵件</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="contact@company.com"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password">設定密碼</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                            <Input
                              id="password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="至少 8 個字元"
                              className="pl-10 pr-10"
                              required
                              minLength={8}
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
                      </>
                    )}

                    <div className="flex gap-3">
                      {step > 1 && (
                        <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                          上一步
                        </Button>
                      )}
                      <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700" disabled={isLoading}>
                        {isLoading ? '處理中...' : step < 2 ? '下一步' : '完成註冊'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="vendor">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="vendor-name">公司/品牌名稱</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                        <Input
                          id="vendor-name"
                          placeholder="綠色工坊"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vendor-tax-id">統一編號</Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                        <Input
                          id="vendor-tax-id"
                          placeholder="12345678"
                          maxLength={8}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vendor-category">商品類別</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="請選擇主要商品類別" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gifts">綠色禮品</SelectItem>
                          <SelectItem value="travel">企業旅遊</SelectItem>
                          <SelectItem value="volunteer">志工活動</SelectItem>
                          <SelectItem value="courses">教育課程</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vendor-contact">聯絡人姓名</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                        <Input
                          id="vendor-contact"
                          placeholder="陳小姐"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vendor-email">電子郵件</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                        <Input
                          id="vendor-email"
                          type="email"
                          placeholder="vendor@example.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vendor-phone">聯絡電話</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                        <Input
                          id="vendor-phone"
                          type="tel"
                          placeholder="02-12345678"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
                      <p className="font-medium">供應商審核說明</p>
                      <p className="mt-1">
                        提交申請後，我們會在 3-5 個工作天內審核您的資料。
                        審核通過後將發送通知信至您的電子郵件。
                      </p>
                    </div>

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                      {isLoading ? '提交中...' : '提交申請'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center text-sm text-stone-600">
                已經有帳戶？{' '}
                <Link href="/login" className="font-medium text-green-600 hover:text-green-700">
                  立即登入
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
