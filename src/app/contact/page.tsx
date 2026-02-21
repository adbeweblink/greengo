'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Building2, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const contactInfo = [
  {
    icon: Phone,
    title: '電話',
    content: '02-2345-6789',
    desc: '週一至週五 09:00-18:00',
  },
  {
    icon: Mail,
    title: '電子郵件',
    content: 'service@greengo.com.tw',
    desc: '24 小時內回覆',
  },
  {
    icon: MapPin,
    title: '地址',
    content: '台北市中山區南京東路三段 168 號 10 樓',
    desc: '歡迎預約拜訪',
  },
  {
    icon: Clock,
    title: '營業時間',
    content: '週一至週五',
    desc: '09:00 - 18:00',
  },
]

const inquiryTypes = [
  { value: 'general', label: '一般諮詢' },
  { value: 'enterprise', label: '企業採購洽詢' },
  { value: 'vendor', label: '供應商合作' },
  { value: 'technical', label: '技術支援' },
  { value: 'billing', label: '帳務問題' },
  { value: 'other', label: '其他' },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // TODO: 實作表單提交
    setTimeout(() => setIsSubmitting(false), 1000)
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-green-700 to-emerald-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <Badge className="bg-white/20 text-white mb-4">聯絡我們</Badge>
              <h1 className="text-4xl font-bold mb-4">我們樂意為您服務</h1>
              <p className="text-green-100">
                無論是採購諮詢、合作提案或技術支援，我們專業的團隊隨時準備為您解答
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* 聯絡資訊 */}
              <div className="lg:col-span-1 space-y-6">
                <h2 className="text-2xl font-bold text-stone-800 mb-6">聯絡資訊</h2>

                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-0 shadow-sm">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-800">{info.title}</h3>
                        <p className="text-green-700">{info.content}</p>
                        <p className="text-sm text-stone-500">{info.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* 快速連結 */}
                <Card className="border-0 shadow-sm bg-green-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-stone-800 mb-4">快速連結</h3>
                    <div className="space-y-2">
                      <a href="/faq" className="flex items-center gap-2 text-green-700 hover:text-green-800">
                        <MessageSquare className="h-4 w-4" />
                        <span>常見問題 FAQ</span>
                      </a>
                      <a href="/guide" className="flex items-center gap-2 text-green-700 hover:text-green-800">
                        <Building2 className="h-4 w-4" />
                        <span>企業採購指南</span>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 聯絡表單 */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>傳送訊息</CardTitle>
                    <CardDescription>
                      填寫以下表單，我們將盡快與您聯繫
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">姓名 *</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                            <Input id="name" placeholder="您的姓名" className="pl-10" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">公司名稱</Label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                            <Input id="company" placeholder="公司名稱（選填）" className="pl-10" />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">電子郵件 *</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                            <Input id="email" type="email" placeholder="your@email.com" className="pl-10" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">聯絡電話</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                            <Input id="phone" type="tel" placeholder="0912-345-678" className="pl-10" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="type">諮詢類型 *</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="請選擇諮詢類型" />
                          </SelectTrigger>
                          <SelectContent>
                            {inquiryTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">主旨 *</Label>
                        <Input id="subject" placeholder="請輸入主旨" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">訊息內容 *</Label>
                        <Textarea
                          id="message"
                          placeholder="請詳細描述您的需求或問題..."
                          className="min-h-[150px]"
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                        {isSubmitting ? '傳送中...' : '傳送訊息'}
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map placeholder */}
        <section className="h-[400px] bg-stone-200 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-stone-400 mx-auto mb-4" />
              <p className="text-stone-500">地圖載入區域</p>
              <p className="text-sm text-stone-400">台北市中山區南京東路三段 168 號 10 樓</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
