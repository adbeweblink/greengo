import Image from 'next/image'
import Link from 'next/link'
import { Leaf, Target, Heart, Users, Award, ChevronRight, Building2, Globe, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const stats = [
  { value: '500+', label: '合作企業' },
  { value: '200+', label: '優質供應商' },
  { value: '10,000+', label: '成功訂單' },
  { value: '95%', label: '客戶滿意度' },
]

const values = [
  {
    icon: Leaf,
    title: '永續優先',
    description: '每項商品與服務都經過嚴格的 ESG 評估，確保符合永續發展目標',
  },
  {
    icon: Heart,
    title: '社會責任',
    description: '支持在地小農、社會企業，創造更多社會價值',
  },
  {
    icon: Target,
    title: '專業服務',
    description: '專業團隊提供一站式企業採購服務，讓採購更輕鬆',
  },
  {
    icon: Users,
    title: '共創價值',
    description: '連結企業、供應商與社會，打造永續生態圈',
  },
]

const team = [
  { name: '林永續', role: '創辦人暨執行長', desc: '20 年企業採購經驗' },
  { name: '陳綠意', role: '營運長', desc: '永續供應鏈專家' },
  { name: '王環保', role: '技術長', desc: 'ESG 數據分析專家' },
  { name: '張社責', role: '業務總監', desc: '企業福利規劃顧問' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-green-700 to-emerald-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge className="bg-white/20 text-white mb-4">關於我們</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                讓企業採購
                <br />
                <span className="text-green-200">成為永續力量</span>
              </h1>
              <p className="text-lg text-green-100">
                Green購 是台灣首創的企業永續採購平台，
                致力於連結優質供應商與有永續理念的企業，
                讓每一筆採購都能為環境、社會創造正向影響。
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-green-700 mb-2">{stat.value}</div>
                  <div className="text-stone-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-green-100 text-green-700 mb-4">我們的故事</Badge>
                <h2 className="text-3xl font-bold text-stone-800 mb-6">
                  從一個簡單的想法開始
                </h2>
                <div className="space-y-4 text-stone-600">
                  <p>
                    2020 年，我們發現企業在採購員工福利時，往往難以找到兼顧品質與永續的選項。
                    傳統的企業採購模式，不僅缺乏透明度，更難以追蹤對環境與社會的影響。
                  </p>
                  <p>
                    於是，Green購 誕生了。我們建立了一個平台，匯集通過嚴格審核的綠色供應商，
                    提供從禮品、旅遊到志工活動的多元選擇，並自動追蹤每筆採購的 ESG 貢獻。
                  </p>
                  <p>
                    如今，已有超過 500 家企業選擇 Green購 作為永續採購夥伴，
                    共同為台灣的永續發展貢獻一份力量。
                  </p>
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/hero-main.png"
                  alt="Green購 團隊"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-800 mb-4">我們的核心價值</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                這些價值觀指引我們的每一個決策，驅動我們持續創新
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="border-0 shadow-md text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-7 w-7 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-stone-800 mb-2">{value.title}</h3>
                    <p className="text-sm text-stone-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 bg-gradient-to-br from-stone-100 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Sparkles className="h-12 w-12 text-green-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-stone-800 mb-6">我們的使命</h2>
              <p className="text-xl text-stone-600 leading-relaxed">
                「讓永續採購成為企業的日常，而非額外的負擔。
                我們相信，當採購變得簡單、透明且有意義，
                每一家企業都能成為推動永續發展的力量。」
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-800 mb-4">經營團隊</h2>
              <p className="text-stone-600">由經驗豐富的專業人士組成</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <Card key={index} className="border-0 shadow-md text-center">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 rounded-full bg-stone-200 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-10 w-10 text-stone-400" />
                    </div>
                    <h3 className="font-semibold text-stone-800">{member.name}</h3>
                    <p className="text-sm text-green-600 mb-2">{member.role}</p>
                    <p className="text-xs text-stone-500">{member.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-green-700 to-emerald-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">一起創造永續價值</h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              無論您是企業採購負責人或優質供應商，歡迎加入 Green購
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                  企業註冊
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/vendor">
                <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10">
                  成為供應商
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
