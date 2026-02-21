import Link from 'next/link'
import { ChevronRight, CheckCircle2, FileText, ShoppingCart, CreditCard, Truck, BarChart3, Users, Building2, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const steps = [
  {
    number: '01',
    icon: Users,
    title: '註冊企業帳戶',
    description: '只需 3 分鐘完成企業註冊，開始使用平台服務',
    details: [
      '填寫公司基本資料（名稱、統編、產業）',
      '設定聯絡人資訊與帳號密碼',
      '系統自動審核，最快當日通過',
    ],
  },
  {
    number: '02',
    icon: ShoppingCart,
    title: '瀏覽與選購',
    description: '探索多元綠色商品與服務，輕鬆加入購物車',
    details: [
      '依類別、ESG 標籤篩選商品',
      '查看商品詳情、ESG 分數、最低訂購量',
      '加入購物車，可一次選購多項商品',
    ],
  },
  {
    number: '03',
    icon: FileText,
    title: '提交訂單與簽核',
    description: '完整的企業簽核流程，符合內控需求',
    details: [
      '填寫配送資訊（支援多地配送）',
      '設定簽核流程與簽核人員',
      '訂單自動進入簽核流程，即時通知',
    ],
  },
  {
    number: '04',
    icon: CreditCard,
    title: '付款',
    description: '多元付款方式，彈性滿足企業需求',
    details: [
      '信用卡 / 銀行轉帳 / 月結',
      '自動開立電子發票',
      '月結客戶享 45 天付款週期',
    ],
  },
  {
    number: '05',
    icon: Truck,
    title: '出貨配送',
    description: '專業物流配送，準時送達指定地點',
    details: [
      '現貨商品 3-5 個工作天出貨',
      '即時物流追蹤',
      '支援分批出貨與多點配送',
    ],
  },
  {
    number: '06',
    icon: BarChart3,
    title: 'ESG 報告產出',
    description: '自動追蹤採購 ESG 貢獻，一鍵產出報告',
    details: [
      '即時累積 ESG 分數',
      '視覺化儀表板呈現',
      '一鍵匯出 GRI 標準報告',
    ],
  },
]

const features = [
  {
    icon: Building2,
    title: '企業專屬服務',
    items: ['專屬客戶經理', '客製化報價', '批量訂購優惠', 'VIP 優先出貨'],
  },
  {
    icon: Leaf,
    title: 'ESG 完整追蹤',
    items: ['自動 ESG 評分', '碳足跡計算', '永續報告產出', '歷史數據分析'],
  },
  {
    icon: FileText,
    title: '完善內控機制',
    items: ['多層簽核流程', '採購權限管理', '預算控制', '完整稽核記錄'],
  },
]

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-green-700 to-emerald-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <Badge className="bg-white/20 text-white mb-4">採購指南</Badge>
              <h1 className="text-4xl font-bold mb-4">企業採購完整指南</h1>
              <p className="text-green-100">
                從註冊到收貨，6 個步驟輕鬆完成企業永續採購
              </p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="relative pb-12 last:pb-0">
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-[calc(100%-5rem)] bg-green-200" />
                  )}

                  <div className="flex gap-6">
                    {/* Number */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-green-600 text-white text-xl font-bold flex items-center justify-center relative z-10">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <Card className="flex-1 border-0 shadow-md">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                            <step.icon className="h-5 w-5 text-green-600" />
                          </div>
                          <CardTitle className="text-xl">{step.title}</CardTitle>
                        </div>
                        <CardDescription className="text-base">
                          {step.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-stone-600">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-800 mb-4">企業採購專屬功能</h2>
              <p className="text-stone-600">為企業量身打造的採購管理工具</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-stone-600">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-green-700 to-emerald-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">準備開始採購了嗎？</h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              立即註冊企業帳戶，體驗便捷的永續採購服務
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                  免費註冊
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10">
                  聯繫業務
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
