import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const sections = [
  {
    title: '1. 服務說明',
    content: `Green購 企業福利網（以下簡稱「本平台」）是由活動家旅行社有限公司（以下簡稱「本公司」）經營的企業永續採購平台，提供以下服務：

• 綠色禮品採購
• 企業旅遊規劃
• 志工活動安排
• ESG 課程訂購
• ESG 報告產出

本服務條款適用於所有使用本平台服務的企業用戶（以下簡稱「用戶」）。`,
  },
  {
    title: '2. 帳戶註冊',
    content: `2.1 資格要求
• 用戶須為依法設立登記的公司或組織
• 註冊人須有權代表該公司或組織

2.2 帳戶責任
• 用戶須確保註冊資料的真實性與正確性
• 用戶須妥善保管帳號密碼，對帳號下的所有活動負責
• 如發現帳號遭盜用，應立即通知本平台

2.3 帳戶終止
本平台保留在以下情況終止用戶帳戶的權利：
• 違反本服務條款
• 提供不實資料
• 從事違法活動
• 長期未使用帳戶（超過 2 年）`,
  },
  {
    title: '3. 訂購與交易',
    content: `3.1 訂購流程
• 用戶在平台選購商品並提交訂單
• 訂單需經企業內部簽核流程
• 完成付款後訂單成立

3.2 價格與費用
• 商品價格以下單當時頁面顯示為準
• 價格不含運費，運費依配送方式另計
• 本平台保留調整價格的權利，但不影響已成立的訂單

3.3 訂單取消與修改
• 簽核完成前可取消訂單
• 付款完成後如需取消，請聯繫客服處理
• 客製化商品一旦開始製作，不接受取消

3.4 付款方式
• 支援信用卡、銀行轉帳、月結
• 月結服務需另行申請審核
• 逾期付款將加收年利率 12% 的遲延利息`,
  },
  {
    title: '4. 配送與交貨',
    content: `4.1 配送範圍
• 目前僅提供台灣本島配送
• 離島及海外配送請另洽客服

4.2 配送時間
• 現貨商品：付款完成後 3-5 個工作天出貨
• 客製化商品：依商品說明，約 7-14 個工作天
• 活動類服務：依活動日期安排

4.3 驗收
• 收貨時請當場檢查商品
• 如有瑕疵或數量短少，請於 3 日內反應
• 驗收完成後視為交貨完成`,
  },
  {
    title: '5. 退換貨政策',
    content: `5.1 可退換貨情況
• 商品與訂購內容不符
• 商品有瑕疵或損壞
• 數量短少

5.2 退換貨期限
• 收貨後 7 日內提出
• 需保持商品完整狀態

5.3 不適用退換貨
• 客製化商品
• 已使用或拆封的商品
• 活動類服務（依各活動取消政策）
• 非人為因素造成的損壞

5.4 退款方式
• 原付款方式退回
• 退款作業約需 7-14 個工作天`,
  },
  {
    title: '6. 智慧財產權',
    content: `6.1 平台內容
本平台上的所有內容，包括但不限於文字、圖片、商標、Logo、軟體等，均受智慧財產權法保護，未經授權不得使用。

6.2 用戶內容
用戶上傳的內容（如評價、圖片），用戶保有著作權，但授權本平台在提供服務的範圍內使用。

6.3 侵權處理
如發現侵權內容，請聯繫我們，我們會依法處理。`,
  },
  {
    title: '7. 免責聲明',
    content: `7.1 服務中斷
本平台可能因維護、系統故障或不可抗力因素暫時中斷服務，本公司不對此負賠償責任。

7.2 第三方連結
本平台可能包含第三方網站連結，本公司不對第三方網站內容負責。

7.3 商品責任
商品由供應商提供，商品本身的品質問題由供應商負責。本平台會協助處理，但不承擔直接責任。

7.4 ESG 資訊
ESG 相關數據與報告僅供參考，本公司不保證其完全準確性。`,
  },
  {
    title: '8. 責任限制',
    content: `在法律允許的最大範圍內，本公司對以下情況不負賠償責任：

• 間接損失、附帶損失、懲罰性損失
• 因不可抗力造成的損失
• 用戶違反本條款造成的損失
• 第三方行為造成的損失

如本公司需負賠償責任，賠償金額以該筆訂單金額為上限。`,
  },
  {
    title: '9. 爭議處理',
    content: `9.1 準據法
本服務條款以中華民國法律為準據法。

9.2 管轄法院
因本服務條款發生的爭議，以台灣台北地方法院為第一審管轄法院。

9.3 協商優先
發生爭議時，雙方應先以協商方式解決。`,
  },
  {
    title: '10. 條款修改',
    content: `本公司保留隨時修改本服務條款的權利。修改後的條款將在本頁面公布，並註明最後更新日期。

重大變更時，我們會透過電子郵件或網站公告通知用戶。繼續使用本平台服務，即表示您同意最新版本的服務條款。`,
  },
  {
    title: '11. 聯繫方式',
    content: `如您對本服務條款有任何疑問，請聯繫我們：

• 電子郵件：service@greengo.com.tw
• 電話：02-2345-6789
• 地址：台北市中山區南京東路三段 168 號 10 樓

營業時間：週一至週五 09:00-18:00`,
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-green-700 to-emerald-600 text-white py-12">
          <div className="container mx-auto px-4">
            <Badge className="bg-white/20 text-white mb-4">法律條款</Badge>
            <h1 className="text-3xl font-bold mb-2">服務條款</h1>
            <p className="text-green-100">
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
                    歡迎使用 Green購 企業福利網。請在使用本平台服務前，詳細閱讀以下服務條款。使用本平台服務即表示您已閱讀、理解並同意遵守本服務條款。如您不同意本條款的任何部分，請勿使用本平台服務。
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
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
