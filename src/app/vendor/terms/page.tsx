import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const sections = [
  {
    title: '1. 合作關係',
    content: `1.1 本合作條款適用於所有在 Green購 平台（以下簡稱「本平台」）上架商品或服務的供應商（以下簡稱「供應商」）。

1.2 供應商與本平台為獨立合作關係，非僱傭、代理或合夥關係。

1.3 供應商須為依法設立登記的公司或商號，具備合法經營資格。`,
  },
  {
    title: '2. 申請與審核',
    content: `2.1 申請條件
• 具備合法營業登記
• 商品或服務符合本平台 ESG 標準
• 願意遵守本平台品質規範
• 能提供穩定的供貨能力

2.2 審核流程
• 提交線上申請表單
• 本平台於 3-5 個工作天內完成審核
• 審核通過後簽署合作合約
• 完成商品上架

2.3 本平台保留拒絕或終止合作的權利。`,
  },
  {
    title: '3. 商品上架',
    content: `3.1 商品資訊
供應商須提供準確、完整的商品資訊，包括：
• 商品名稱、描述、規格
• 價格、最低訂購量
• ESG 相關資訊（環保材質、碳足跡等）
• 清晰的商品圖片

3.2 價格設定
• 供應商自行設定商品售價
• 本平台依合約收取平台服務費
• 價格調整須提前 7 天通知本平台

3.3 庫存管理
• 供應商須即時更新庫存狀態
• 缺貨時須立即通知本平台
• 長期缺貨商品將暫時下架`,
  },
  {
    title: '4. 訂單處理',
    content: `4.1 訂單確認
• 本平台轉發訂單後，供應商須於 24 小時內確認
• 無法出貨須立即通知本平台

4.2 出貨時效
• 現貨商品：確認訂單後 3 個工作天內出貨
• 客製化商品：依雙方約定時程
• 延遲出貨須提前通知

4.3 配送要求
• 使用本平台指定或認可的物流服務
• 提供出貨通知與物流追蹤資訊
• 確保商品包裝完整`,
  },
  {
    title: '5. 品質要求',
    content: `5.1 商品品質
• 商品須符合描述與規格
• 符合相關法規與安全標準
• 符合本平台 ESG 要求

5.2 ESG 標準
供應商須至少符合以下一項：
• 使用環保或再生材料
• 具備環保相關認證
• 支持社會企業或在地採購
• 提供碳足跡數據

5.3 客訴處理
• 收到客訴須於 24 小時內回應
• 配合本平台處理退換貨
• 重大品質問題須提出改善計畫`,
  },
  {
    title: '6. 費用與撥款',
    content: `6.1 平台服務費
• 依商品類別收取 5%-15% 平台服務費
• 具體費率依合約約定
• 費用從銷售金額中扣除

6.2 撥款週期
• 每筆訂單完成後 7 個工作天撥款
• 採用銀行轉帳方式
• 撥款明細可於後台查詢

6.3 稅務處理
• 本平台開立服務費發票給供應商
• 供應商須開立商品發票給企業客戶`,
  },
  {
    title: '7. 智慧財產權',
    content: `7.1 供應商保證對上架商品享有合法的銷售權利。

7.2 供應商授權本平台使用商品相關圖片、文字進行行銷推廣。

7.3 如有侵權爭議，供應商須負完全責任。`,
  },
  {
    title: '8. 違規處理',
    content: `8.1 違規行為包括但不限於：
• 提供不實商品資訊
• 出貨延遲或未出貨
• 商品品質不符
• 拒絕處理合理退換貨
• 其他違反合作條款的行為

8.2 違規處置
• 輕微違規：警告並要求改善
• 重大或重複違規：暫停上架權限
• 嚴重違規：終止合作關係

8.3 違約賠償
如因供應商違規造成本平台或客戶損失，供應商須負賠償責任。`,
  },
  {
    title: '9. 保密義務',
    content: `9.1 雙方對合作過程中知悉的商業機密負有保密義務。

9.2 保密資訊包括但不限於：
• 合約內容與費率
• 銷售數據
• 客戶資訊
• 營業秘密

9.3 保密義務於合作終止後仍有效，為期 2 年。`,
  },
  {
    title: '10. 合作終止',
    content: `10.1 任一方得提前 30 天書面通知終止合作。

10.2 終止後處理
• 未完成訂單須繼續履行
• 待撥款項於 30 天內結清
• 商品資訊於 7 天內下架

10.3 本平台得於以下情況立即終止合作：
• 供應商重大違規
• 供應商喪失營業資格
• 供應商進入破產程序`,
  },
  {
    title: '11. 爭議處理',
    content: `11.1 本合作條款以中華民國法律為準據法。

11.2 發生爭議時，雙方應先以協商方式解決。

11.3 協商不成時，以台灣台北地方法院為第一審管轄法院。`,
  },
  {
    title: '12. 條款修改',
    content: `本平台保留修改本合作條款的權利。修改後的條款將提前 30 天通知供應商。如供應商不同意修改內容，得於 30 天內提出終止合作。`,
  },
]

export default function VendorTermsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-700 to-teal-600 text-white py-12">
          <div className="container mx-auto px-4">
            <Badge className="bg-white/20 text-white mb-4">供應商專區</Badge>
            <h1 className="text-3xl font-bold mb-2">供應商合作條款</h1>
            <p className="text-emerald-100">
              最後更新日期：2025 年 1 月 1 日
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="border-0 shadow-lg mb-8">
                <CardContent className="p-8">
                  <p className="text-stone-600 leading-relaxed">
                    感謝您有意成為 Green購 平台的合作供應商。請在申請前詳細閱讀以下合作條款。提交供應商申請即表示您已閱讀、理解並同意遵守本合作條款。
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {sections.map((section, index) => (
                  <Card key={index} className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <h2 className="text-lg font-semibold text-stone-800 mb-4">{section.title}</h2>
                      <div className="text-stone-600 whitespace-pre-line leading-relaxed">
                        {section.content}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* CTA */}
              <Card className="border-0 shadow-lg mt-8 bg-emerald-50">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold text-stone-800 mb-4">準備好加入了嗎？</h3>
                  <p className="text-stone-600 mb-6">
                    同意以上條款後，即可提交供應商申請
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/register?type=vendor">
                      <Button className="bg-emerald-600 hover:bg-emerald-700">
                        提交申請
                      </Button>
                    </Link>
                    <Link href="/vendor">
                      <Button variant="outline">
                        返回供應商專區
                      </Button>
                    </Link>
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
