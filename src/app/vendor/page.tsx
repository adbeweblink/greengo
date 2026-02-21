import Link from 'next/link'
import { Leaf, TrendingUp, Users, Shield, ChevronRight, CheckCircle2, Store, BarChart3, Handshake, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const benefits = [
  {
    icon: Users,
    title: '接觸 500+ 企業客戶',
    description: '直接對接有採購需求的優質企業，擴大銷售通路',
  },
  {
    icon: TrendingUp,
    title: '穩定訂單來源',
    description: '企業採購需求穩定，提供持續性的業務機會',
  },
  {
    icon: BarChart3,
    title: '數據化經營',
    description: '完整的銷售數據分析，幫助優化商品策略',
  },
  {
    icon: Shield,
    title: '安心交易保障',
    description: '平台保障交易安全，款項準時撥付',
  },
]

const requirements = [
  '具備合法營業登記',
  '商品/服務符合 ESG 標準',
  '願意配合平台品質規範',
  '能提供穩定的供貨能力',
]

const process = [
  { step: '01', title: '線上申請', desc: '填寫供應商申請表單' },
  { step: '02', title: '資料審核', desc: '3-5 個工作天審核' },
  { step: '03', title: '簽約上架', desc: '完成合約並上架商品' },
  { step: '04', title: '開始銷售', desc: '接受企業客戶訂單' },
]

const categories = [
  { icon: Store, name: '綠色禮品', desc: '環保材質、在地特產' },
  { icon: Globe, name: '企業旅遊', desc: '生態旅遊、深度體驗' },
  { icon: Handshake, name: '志工活動', desc: '環保、公益、社區' },
  { icon: BarChart3, name: 'ESG 課程', desc: '永續培訓、工作坊' },
]

export default function VendorPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-green-700 via-emerald-600 to-teal-600 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl">
              <Badge className="bg-white/20 text-white mb-4">供應商專區</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                成為 Green購
                <br />
                <span className="text-green-200">優質供應夥伴</span>
              </h1>
              <p className="text-lg text-green-100 mb-8">
                加入台灣最大的企業永續採購平台，
                連結 500+ 優質企業客戶，
                讓您的綠色商品與服務被更多企業看見。
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register?type=vendor">
                  <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                    立即申請
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/vendor/login">
                  <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10">
                    供應商登入
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-green-700 mb-2">500+</div>
                <div className="text-stone-600">合作企業</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-700 mb-2">200+</div>
                <div className="text-stone-600">優質供應商</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-700 mb-2">85%</div>
                <div className="text-stone-600">訂單成交率</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-700 mb-2">7 天</div>
                <div className="text-stone-600">平均撥款週期</div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-800 mb-4">加入的優勢</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                Green購 提供完整的供應商支援服務，助您輕鬆拓展企業客戶
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-7 w-7 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-stone-800 mb-2">{benefit.title}</h3>
                    <p className="text-sm text-stone-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-800 mb-4">招募類別</h2>
              <p className="text-stone-600">我們正在尋找以下類別的優質供應商</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <cat.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-stone-800">{cat.name}</h3>
                    <p className="text-sm text-stone-500">{cat.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-gradient-to-br from-stone-100 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-800 mb-4">申請流程</h2>
              <p className="text-stone-600">簡單四步驟，快速成為合作夥伴</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {process.map((item, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-16 h-16 rounded-full bg-green-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-stone-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-stone-600">{item.desc}</p>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-green-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-stone-800 mb-4">申請條件</h2>
                <p className="text-stone-600">符合以下條件即可申請</p>
              </div>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-4">
                    {requirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-stone-700">{req}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-green-700 to-emerald-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">準備好加入了嗎？</h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              立即提交申請，我們的團隊將在 3-5 個工作天內與您聯繫
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register?type=vendor">
                <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                  立即申請
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10">
                  聯繫我們
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
