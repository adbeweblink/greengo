import Link from 'next/link'
import { Leaf, Mail, Phone, MapPin } from 'lucide-react'

const footerNavigation = {
  商品服務: [
    { name: '綠色禮品', href: '/products?category=gifts' },
    { name: '企業旅遊', href: '/products?category=travel' },
    { name: '志工活動', href: '/products?category=volunteer' },
    { name: '教育課程', href: '/products?category=courses' },
  ],
  企業專區: [
    { name: '企業註冊', href: '/register' },
    { name: 'ESG 報告', href: '/esg' },
    { name: '採購指南', href: '/guide' },
    { name: '常見問題', href: '/faq' },
  ],
  供應商: [
    { name: '加入供應商', href: '/vendor' },
    { name: '供應商登入', href: '/vendor/login' },
    { name: '合作條款', href: '/vendor/terms' },
  ],
  關於我們: [
    { name: '公司介紹', href: '/about' },
    { name: '聯絡我們', href: '/contact' },
    { name: '隱私權政策', href: '/privacy' },
    { name: '服務條款', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-500">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-stone-800">Green購</span>
                <span className="text-xs text-stone-500">企業福利網</span>
              </div>
            </Link>
            <p className="text-sm text-stone-600">
              整合綠色採購、企業旅遊、志工活動與課程培訓，
              <br />
              一站式滿足企業福委會的 ESG 採購需求。
            </p>
            <div className="space-y-2 text-sm text-stone-600">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>02-2345-6789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>service@greengo.com.tw</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>台北市中山區民生東路三段</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-stone-900">商品服務</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavigation.商品服務.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-stone-600 hover:text-green-700">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-stone-900">企業專區</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavigation.企業專區.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-stone-600 hover:text-green-700">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-stone-900">供應商</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavigation.供應商.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-stone-600 hover:text-green-700">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-stone-900">關於我們</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavigation.關於我們.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-stone-600 hover:text-green-700">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-stone-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-stone-500">
              © {new Date().getFullYear()} Green購 企業福利網. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                MIT 台灣製造
              </span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                ESG 認證
              </span>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                綠色採購
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
