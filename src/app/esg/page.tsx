'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Leaf, TrendingUp, Users, Globe, Award, FileText, ChevronRight, BarChart3, PieChart, Target, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const esgCategories = [
  {
    id: 'environmental',
    name: '環境 Environmental',
    icon: Globe,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    description: '減碳、節能、資源循環、生態保護',
    metrics: [
      { label: '碳減排量', value: '12.5 噸', trend: '+23%' },
      { label: '再生材料使用', value: '78%', trend: '+15%' },
      { label: '減少一次性用品', value: '2,340 件', trend: '+45%' },
    ],
  },
  {
    id: 'social',
    name: '社會 Social',
    icon: Users,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    description: '社區參與、員工福祉、多元共融、公益回饋',
    metrics: [
      { label: '志工服務時數', value: '1,240 小時', trend: '+38%' },
      { label: '支持社會企業', value: '15 家', trend: '+25%' },
      { label: '員工參與率', value: '89%', trend: '+12%' },
    ],
  },
  {
    id: 'governance',
    name: '治理 Governance',
    icon: Award,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    description: '透明採購、合規管理、供應商評核',
    metrics: [
      { label: 'ESG 供應商比例', value: '92%', trend: '+18%' },
      { label: '採購透明度', value: '100%', trend: '0%' },
      { label: '合規審查通過', value: '100%', trend: '0%' },
    ],
  },
]

const features = [
  {
    icon: BarChart3,
    title: '自動化報告產出',
    description: '每筆採購自動累積 ESG 數據，一鍵產出符合 GRI 標準的永續報告',
  },
  {
    icon: PieChart,
    title: '視覺化儀表板',
    description: '即時追蹤各項 ESG 指標，清楚掌握企業永續進度',
  },
  {
    icon: Target,
    title: '目標設定與追蹤',
    description: '設定年度 ESG 目標，系統自動追蹤達成進度並提供建議',
  },
  {
    icon: FileText,
    title: '採購憑證留存',
    description: '所有採購紀錄完整留存，隨時可供稽核查驗',
  },
]

const certifications = [
  { name: 'ISO 14001', desc: '環境管理系統' },
  { name: 'ISO 45001', desc: '職業安全衛生' },
  { name: 'B Corp', desc: '共益企業認證' },
  { name: 'SGS', desc: '產品驗證' },
]

export default function ESGPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-700 via-emerald-600 to-teal-600 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl">
              <Badge className="bg-white/20 text-white mb-4">ESG 專區</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                讓每一筆採購
                <br />
                <span className="text-green-200">都為 ESG 加分</span>
              </h1>
              <p className="text-lg text-green-100 mb-8">
                Green購 提供完整的 ESG 採購追蹤與報告系統。
                從商品選擇到報告產出，一站式解決企業永續採購需求。
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                  了解更多
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10">
                  下載 ESG 報告範本
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ESG 三大面向 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-800 mb-4">ESG 三大面向追蹤</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                透過 Green購 平台，自動追蹤每筆採購對應的 ESG 貢獻，建立完整的永續足跡
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {esgCategories.map((category) => (
                <Card key={category.id} className="border-0 shadow-lg overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${category.color}`} />
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${category.bgColor} flex items-center justify-center mb-4`}>
                      <category.icon className={`h-6 w-6 ${category.textColor}`} />
                    </div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.metrics.map((metric, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-stone-600">{metric.label}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{metric.value}</span>
                              <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                                {metric.trend}
                              </Badge>
                            </div>
                          </div>
                          <Progress value={70 + index * 10} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 平台功能 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-800 mb-4">智慧 ESG 管理功能</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                從採購到報告，Green購 提供全方位的 ESG 管理工具
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-stone-800 mb-2">{feature.title}</h3>
                    <p className="text-sm text-stone-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ESG 報告預覽 */}
        <section className="py-16 bg-gradient-to-br from-stone-100 to-stone-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-green-100 text-green-700 mb-4">自動化報告</Badge>
                <h2 className="text-3xl font-bold text-stone-800 mb-6">
                  一鍵產出專業 ESG 報告
                </h2>
                <p className="text-stone-600 mb-6">
                  系統自動彙整您的採購數據，產出符合國際標準的永續報告。
                  支援 GRI、SASB 等多種報告框架，大幅節省人工作業時間。
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    '自動計算碳足跡與減碳貢獻',
                    '圖表視覺化呈現 ESG 績效',
                    '支援多種報告格式輸出 (PDF, Excel)',
                    '歷史數據對比分析',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-stone-700">{item}</span>
                    </div>
                  ))}
                </div>

                <Button className="bg-green-600 hover:bg-green-700">
                  查看報告範本
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-semibold text-stone-800">年度 ESG 報告</h3>
                      <p className="text-sm text-stone-500">2025 年度</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">已產出</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Globe className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-700">92</div>
                      <div className="text-xs text-stone-500">環境分數</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-700">88</div>
                      <div className="text-xs text-stone-500">社會分數</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Award className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-700">95</div>
                      <div className="text-xs text-stone-500">治理分數</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-600">總 ESG 分數</span>
                      <span className="font-semibold text-green-700">91.7</span>
                    </div>
                    <Progress value={92} className="h-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 認證合作夥伴 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-800 mb-4">認證與合作夥伴</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                Green購 與多家認證機構合作，確保供應商品質與永續標準
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="border-0 shadow-sm text-center hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-stone-400" />
                    </div>
                    <h3 className="font-semibold text-stone-800">{cert.name}</h3>
                    <p className="text-sm text-stone-500">{cert.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-green-700 to-emerald-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">開始您的永續採購之旅</h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              立即加入 Green購，讓每一筆採購都成為企業永續發展的助力
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                免費註冊
              </Button>
              <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10">
                聯繫業務
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
