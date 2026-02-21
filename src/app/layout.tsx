import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/lib/auth/mock-auth'
import { CartProvider } from '@/contexts/CartContext'
import './globals.css'

const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-sans-tc',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Green購 企業福利網 | 一站式 ESG 採購平台',
    template: '%s | Green購 企業福利網',
  },
  description:
    '整合綠色禮品、企業旅遊、志工活動與課程培訓，自動產出 ESG 報告。專為企業福委會設計的永續採購平台。',
  keywords: [
    'ESG',
    '企業福利',
    '綠色採購',
    'MIT',
    '台灣製造',
    '企業旅遊',
    '志工活動',
    '永續發展',
    '福委會',
  ],
  authors: [{ name: 'Green購' }],
  creator: 'Green購 企業福利網',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: '/',
    siteName: 'Green購 企業福利網',
    title: 'Green購 企業福利網 | 一站式 ESG 採購平台',
    description:
      '整合綠色禮品、企業旅遊、志工活動與課程培訓，自動產出 ESG 報告。專為企業福委會設計的永續採購平台。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Green購 企業福利網',
    description: '一站式 ESG 採購平台',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW" className={notoSansTC.variable}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster position="top-right" richColors />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
