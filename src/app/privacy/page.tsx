import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const sections = [
  {
    title: '1. 資料蒐集',
    content: `Green購 企業福利網（以下簡稱「本平台」）在您使用服務時，可能蒐集以下個人資料：

• 基本資料：姓名、電子郵件、電話、公司名稱、統一編號
• 帳戶資料：帳號、密碼（加密儲存）
• 交易資料：訂單記錄、付款資訊、配送地址
• 使用資料：瀏覽記錄、點擊行為、裝置資訊
• 通訊資料：客服對話記錄、問卷回覆

我們僅蒐集提供服務所必需的資料，並於蒐集時告知您資料的用途。`,
  },
  {
    title: '2. 資料使用目的',
    content: `您的個人資料將用於以下目的：

• 提供平台服務：處理訂單、安排配送、開立發票
• 客戶服務：回覆諮詢、處理申訴、寄送通知
• 服務改善：分析使用行為、優化用戶體驗
• 行銷活動：寄送促銷資訊（您可隨時取消訂閱）
• 法律遵循：配合政府機關依法調取
• ESG 報告：彙整採購數據產出永續報告

我們不會將您的個人資料用於上述以外的目的。`,
  },
  {
    title: '3. 資料分享與揭露',
    content: `除以下情形外，我們不會向第三方揭露您的個人資料：

• 您的同意：經您明確授權同意
• 服務提供者：為提供服務委託的合作廠商（如物流、金流），這些廠商僅能在提供服務的範圍內使用您的資料
• 法律要求：依法律規定或政府機關合法要求
• 保護權益：為保護本平台或用戶的權益、財產或安全

我們要求所有合作廠商遵守相同的隱私保護標準。`,
  },
  {
    title: '4. 資料安全',
    content: `我們採取以下措施保護您的個人資料：

• SSL 加密傳輸：所有資料傳輸均使用 SSL 加密
• 密碼加密儲存：使用業界標準加密演算法
• 存取控制：僅授權人員可存取個人資料
• 定期稽核：定期進行資安檢測與稽核
• 備份機制：資料定期備份，確保資料完整性

儘管我們盡力保護資料安全，但無法保證網路傳輸的絕對安全。`,
  },
  {
    title: '5. Cookie 使用',
    content: `本平台使用 Cookie 與類似技術來：

• 維持登入狀態
• 記住您的偏好設定
• 分析網站使用情況
• 提供個人化內容

您可以透過瀏覽器設定管理 Cookie，但停用某些 Cookie 可能影響網站功能。`,
  },
  {
    title: '6. 您的權利',
    content: `依據個人資料保護法，您享有以下權利：

• 查詢權：查詢您的個人資料
• 閱覽權：請求閱覽您的個人資料
• 更正權：請求更正不正確的資料
• 刪除權：請求刪除您的個人資料
• 停止處理權：請求停止處理您的資料
• 撤回同意權：撤回先前的同意

如需行使上述權利，請聯繫我們的客服團隊。`,
  },
  {
    title: '7. 資料保存期限',
    content: `我們會依據以下原則保存您的個人資料：

• 帳戶資料：帳戶存續期間及刪除後 1 年
• 交易資料：依稅法規定保存至少 5 年
• 使用資料：最長保存 2 年
• 法律訴訟相關資料：至訴訟結束後 1 年

超過保存期限後，我們會安全刪除或去識別化處理您的資料。`,
  },
  {
    title: '8. 兒童隱私',
    content: `本平台為企業採購服務，不針對 18 歲以下用戶提供服務。我們不會故意蒐集未成年人的個人資料。如果我們發現誤蒐集了未成年人的資料，將立即刪除。`,
  },
  {
    title: '9. 政策更新',
    content: `我們可能不時更新本隱私權政策。更新後的政策將在本頁面公布，並註明最後更新日期。重大變更時，我們會透過電子郵件或網站公告通知您。

繼續使用本平台服務，即表示您同意最新版本的隱私權政策。`,
  },
  {
    title: '10. 聯繫方式',
    content: `如您對本隱私權政策有任何疑問，請聯繫我們：

• 電子郵件：privacy@greengo.com.tw
• 電話：02-2345-6789
• 地址：台北市中山區南京東路三段 168 號 10 樓

我們將在收到您的請求後 30 天內回覆。`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-green-700 to-emerald-600 text-white py-12">
          <div className="container mx-auto px-4">
            <Badge className="bg-white/20 text-white mb-4">法律條款</Badge>
            <h1 className="text-3xl font-bold mb-2">隱私權政策</h1>
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
                    Green購 企業福利網（以下簡稱「本平台」）重視您的隱私權。本隱私權政策說明我們如何蒐集、使用、揭露及保護您的個人資料。使用本平台服務即表示您同意本政策的條款。
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
