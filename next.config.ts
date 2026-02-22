import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 靜態輸出（用於 Netlify 部署）
  output: 'export',
  // 圖片優化設定（靜態輸出需要 unoptimized）
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  // 關閉尾端斜線
  trailingSlash: true,
}

export default nextConfig
