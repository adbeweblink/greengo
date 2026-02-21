'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ChevronDown, HelpCircle, Building2, CreditCard, Truck, FileText, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const categories = [
  { id: 'all', name: '全部', icon: HelpCircle },
  { id: 'account', name: '帳戶相關', icon: Users },
  { id: 'order', name: '訂購流程', icon: Building2 },
  { id: 'payment', name: '付款方式', icon: CreditCard },
  { id: 'delivery', name: '出貨配送', icon: Truck },
  { id: 'esg', name: 'ESG 報告', icon: FileText },
]

const faqs = [
  {
    id: '1',
    category: 'account',
    question: '如何註冊企業帳戶？',
    answer: '請點擊首頁右上角的「企業註冊」按鈕，填寫公司基本資料（公司名稱、統一編號、產業類別等）與聯絡人資訊，提交後系統會自動審核。審核通過後您將收到確認郵件，即可開始使用平台服務。',
  },
  {
    id: '2',
    category: 'account',
    question: '忘記密碼怎麼辦？',
    answer: '請在登入頁面點擊「忘記密碼」，輸入您的註冊電子郵件，系統會發送密碼重設連結至您的信箱。請在 24 小時內完成密碼重設。',
  },
  {
    id: '3',
    category: 'order',
    question: '如何進行採購？',
    answer: '登入企業帳戶後，您可以瀏覽商品目錄，將需要的商品加入購物車。確認購物車內容後，填寫配送資訊與簽核人員，提交訂單即可。支援多人簽核流程，符合企業內控需求。',
  },
  {
    id: '4',
    category: 'order',
    question: '可以客製化商品嗎？',
    answer: '是的！許多供應商提供客製化服務，包括 logo 印刷、包裝設計等。您可以在商品頁面查看是否支援客製化，或直接聯繫我們的業務團隊討論需求。客製化商品通常需要較長的製作時間，請提早下單。',
  },
  {
    id: '5',
    category: 'order',
    question: '最低訂購數量是多少？',
    answer: '每項商品的最低訂購量不同，會在商品頁面清楚標示。一般而言，禮品類商品最低訂購量約 20-50 份，活動類服務則依活動性質而定。如有特殊需求，歡迎聯繫我們協助。',
  },
  {
    id: '6',
    category: 'payment',
    question: '支援哪些付款方式？',
    answer: 'Green購 支援多元付款方式：\n• 銀行轉帳（提供虛擬帳號）\n• 信用卡付款\n• 月結服務（符合條件的企業客戶可申請）\n\n所有交易皆透過綠界/藍新金流，安全有保障。',
  },
  {
    id: '7',
    category: 'payment',
    question: '如何申請月結服務？',
    answer: '年採購金額達 50 萬以上的企業客戶可申請月結服務。請聯繫我們的業務團隊，提供公司基本資料與財務證明，審核通過後即可享有最長 45 天的付款週期。',
  },
  {
    id: '8',
    category: 'payment',
    question: '可以開立發票嗎？',
    answer: '可以。所有訂單皆可開立電子發票或三聯式發票。下單時請填寫正確的發票資訊（公司抬頭、統一編號），發票將於出貨後 7 天內寄送至指定收件地址或電子信箱。',
  },
  {
    id: '9',
    category: 'delivery',
    question: '出貨需要多久時間？',
    answer: '• 現貨商品：下單後 3-5 個工作天出貨\n• 客製化商品：依商品類型，約 7-14 個工作天\n• 活動類服務：依活動日期安排\n\n實際出貨時間以商品頁面標示為準。如需指定日期送達，請提前下單並備註。',
  },
  {
    id: '10',
    category: 'delivery',
    question: '可以配送到多個地址嗎？',
    answer: '可以！我們支援一單多配功能。下單時您可以設定多個配送地址與各地址的數量分配。適合需要將禮品分送至不同分公司或員工家中的企業。',
  },
  {
    id: '11',
    category: 'esg',
    question: 'ESG 報告如何產出？',
    answer: '系統會自動追蹤您的每筆採購對應的 ESG 貢獻（碳減排、社會影響等）。您可以在後台的「ESG 報告」專區查看即時數據，並一鍵匯出符合 GRI 標準的永續報告。報告支援 PDF 與 Excel 格式。',
  },
  {
    id: '12',
    category: 'esg',
    question: 'ESG 分數如何計算？',
    answer: 'ESG 分數由多項指標綜合評估：\n• 環境（E）：碳足跡、再生材料比例、包裝減量等\n• 社會（S）：支持在地採購、社會企業合作、志工時數等\n• 治理（G）：供應商 ESG 評核、採購透明度等\n\n每項採購都會自動計算並累積到您的企業 ESG 分數。',
  },
]

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFaqs = faqs.filter(faq => {
    if (selectedCategory !== 'all' && faq.category !== selectedCategory) {
      return false
    }
    if (searchQuery && !faq.question.toLowerCase().includes(searchQuery.toLowerCase()) && !faq.answer.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-green-700 to-emerald-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Badge className="bg-white/20 text-white mb-4">常見問題</Badge>
              <h1 className="text-4xl font-bold mb-4">有什麼可以幫助您？</h1>
              <p className="text-green-100 mb-8">
                瀏覽常見問題解答，或搜尋您的問題
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
                <Input
                  placeholder="搜尋問題..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-white text-stone-800"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map(cat => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? 'default' : 'outline'}
                  className={selectedCategory === cat.id ? 'bg-green-600 hover:bg-green-700' : ''}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <cat.icon className="h-4 w-4 mr-2" />
                  {cat.name}
                </Button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="max-w-3xl mx-auto">
              {filteredFaqs.length > 0 ? (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      {filteredFaqs.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger className="text-left hover:text-green-700">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-stone-600 whitespace-pre-line">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-12">
                  <HelpCircle className="h-16 w-16 text-stone-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-stone-800 mb-2">找不到相關問題</h3>
                  <p className="text-stone-500 mb-4">請嘗試其他關鍵字或聯繫客服</p>
                  <Button variant="outline" onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                  }}>
                    清除搜尋
                  </Button>
                </div>
              )}
            </div>

            {/* Contact CTA */}
            <div className="max-w-3xl mx-auto mt-12">
              <Card className="border-0 shadow-md bg-green-50">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold text-stone-800 mb-2">還是找不到答案？</h3>
                  <p className="text-stone-600 mb-4">我們的客服團隊隨時為您服務</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/contact">
                      <Button className="bg-green-600 hover:bg-green-700">
                        聯繫客服
                      </Button>
                    </Link>
                    <Button variant="outline">
                      02-2345-6789
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
