import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Leaf, Users, Gift, Plane, Heart, BookOpen, FileText, CheckCircle2, TrendingUp, Shield, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

// 商品分類
const categories = [
  {
    icon: Gift,
    title: '綠色禮品',
    description: '環保材質、MIT 在地品牌禮品，支持台灣本土製造',
    href: '/products?category=gifts',
    color: 'bg-emerald-100 text-emerald-700',
    image: '/images/category-gifts.png',
  },
  {
    icon: Plane,
    title: '企業旅遊',
    description: '低碳旅遊、生態行程規劃，兼顧員工福利與環境保護',
    href: '/products?category=travel',
    color: 'bg-sky-100 text-sky-700',
    image: '/images/category-travel.png',
  },
  {
    icon: Heart,
    title: '志工活動',
    description: '淨灘、植樹、社區服務等公益活動，累積 ESG 成果',
    href: '/products?category=volunteer',
    color: 'bg-rose-100 text-rose-700',
    image: '/images/category-volunteer.png',
  },
  {
    icon: BookOpen,
    title: '教育課程',
    description: 'ESG 培訓、永續發展課程，提升團隊專業能力',
    href: '/products?category=courses',
    color: 'bg-amber-100 text-amber-700',
    image: '/images/category-courses.png',
  },
]

// 為什麼選擇我們
const features = [
  {
    icon: FileText,
    title: '自動產出 ESG 報告',
    description: '每筆採購自動記錄，年度報告一鍵生成，輕鬆完成企業永續報告書',
  },
  {
    icon: Shield,
    title: '嚴選 MIT 供應商',
    description: '所有供應商經過審核，確保品質與永續認證，支持台灣在地品牌',
  },
  {
    icon: Users,
    title: '月結帳款服務',
    description: '大型企業可申請月結，每月統一請款，簡化財務流程',
  },
  {
    icon: TrendingUp,
    title: '採購流程透明',
    description: '完整的簽核流程，每筆訂單可追蹤，符合企業內控規範',
  },
]

// 數據統計
const stats = [
  { value: '500+', label: '合作企業' },
  { value: '200+', label: '優質供應商' },
  { value: '10,000+', label: '成功訂單' },
  { value: '95%', label: '客戶滿意度' },
]

// 客戶評價
const testimonials = [
  {
    content: '透過 Green購，我們的福委會採購效率提升 50%，而且自動產出的 ESG 報告讓我們省下大量時間。',
    author: '王經理',
    company: '台灣科技公司',
  },
  {
    content: '平台上的供應商品質都很好，MIT 在地品牌讓員工更有認同感，是我們長期合作的首選。',
    author: '李主委',
    company: '金融控股公司',
  },
  {
    content: '月結服務對我們大型企業來說非常方便，不用每次小額付款，財務作業簡化很多。',
    author: '陳專員',
    company: '製造業龍頭',
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Hero 背景圖片 */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero-main.png"
              alt="Green購 企業永續採購"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/60 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="max-w-2xl">
              <Badge className="mb-4 bg-green-500/20 text-green-100 hover:bg-green-500/30 backdrop-blur-sm border-green-400/30">
                <Leaf className="mr-1 h-3 w-3" />
                永續採購首選平台
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                企業福利採購
                <span className="block text-green-400">一站式 ESG 解決方案</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-stone-200">
                整合綠色禮品、企業旅遊、志工活動與課程培訓，
                自動記錄每筆採購的 ESG 貢獻，輕鬆產出永續報告。
              </p>
              <div className="mt-10 flex items-center gap-4">
                <Button size="lg" asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/register">
                    免費註冊開始
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/30 bg-transparent text-white hover:bg-white/10 backdrop-blur-sm">
                  <Link href="/products">瀏覽商品</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                四大服務類別
              </h2>
              <p className="mt-4 text-lg text-stone-600">
                無論是員工禮品、團隊旅遊、公益活動或培訓課程，都能在這裡找到
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <Link key={category.title} href={category.href}>
                  <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                    {/* 分類圖片 */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className={`absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-lg ${category.color} shadow-lg`}>
                        <category.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl group-hover:text-green-700">
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {category.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-stone-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                為什麼選擇 Green購？
              </h2>
              <p className="mt-4 text-lg text-stone-600">
                專為企業福委會設計，讓採購更簡單、更永續
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <feature.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-stone-900">{feature.title}</h3>
                  <p className="mt-2 text-stone-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-green-700 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-white">{stat.value}</div>
                  <div className="mt-2 text-green-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ESG Section */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <Badge className="mb-4 bg-amber-100 text-amber-700 hover:bg-amber-100">
                  ESG 報告自動生成
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                  每筆採購自動累積<br />ESG 永續成果
                </h2>
                <p className="mt-4 text-lg text-stone-600">
                  平台自動記錄每筆訂單的 ESG 分類貢獻，包含環境保護 (E)、社會責任 (S)、公司治理 (G) 三大面向。
                  年度報告一鍵生成，輕鬆應對永續報告書的資料需求。
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    '自動分類：系統根據商品類型自動標註 ESG 分類',
                    '即時統計：隨時查看當年度的 ESG 採購成果',
                    '報告匯出：支援多種格式匯出，可直接用於年報',
                    '客製欄位：可依企業需求選擇報告呈現的欄位',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                      <span className="text-stone-600">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" asChild className="mt-8 bg-green-600 hover:bg-green-700">
                  <Link href="/esg">了解更多 ESG 功能</Link>
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-100 to-emerald-50 p-8">
                  <div className="grid h-full grid-cols-2 gap-4">
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                      <div className="text-sm text-stone-500">環境保護 (E)</div>
                      <div className="mt-2 text-2xl font-bold text-green-600">45%</div>
                      <div className="mt-2 h-2 w-full rounded-full bg-green-100">
                        <div className="h-full w-[45%] rounded-full bg-green-600" />
                      </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                      <div className="text-sm text-stone-500">社會責任 (S)</div>
                      <div className="mt-2 text-2xl font-bold text-blue-600">35%</div>
                      <div className="mt-2 h-2 w-full rounded-full bg-blue-100">
                        <div className="h-full w-[35%] rounded-full bg-blue-600" />
                      </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                      <div className="text-sm text-stone-500">公司治理 (G)</div>
                      <div className="mt-2 text-2xl font-bold text-amber-600">20%</div>
                      <div className="mt-2 h-2 w-full rounded-full bg-amber-100">
                        <div className="h-full w-[20%] rounded-full bg-amber-600" />
                      </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                      <div className="text-sm text-stone-500">年度總採購</div>
                      <div className="mt-2 text-2xl font-bold text-stone-800">NT$ 2.5M</div>
                      <div className="mt-2 text-xs text-green-600">↑ 比去年成長 23%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-stone-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                客戶怎麼說
              </h2>
              <p className="mt-4 text-lg text-stone-600">
                來自各行各業的企業客戶分享
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Award key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-stone-600">「{testimonial.content}」</p>
                    <div className="mt-4 border-t pt-4">
                      <div className="font-semibold text-stone-900">{testimonial.author}</div>
                      <div className="text-sm text-stone-500">{testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-700 to-emerald-600 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-white">
                  準備好開始您的永續採購了嗎？
                </h2>
                <p className="mt-2 text-lg text-green-100">
                  免費註冊，立即體驗一站式企業福利採購服務
                </p>
              </div>
              <div className="flex gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/register">免費註冊</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white bg-transparent text-white hover:bg-white/10">
                  <Link href="/contact">聯絡我們</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
