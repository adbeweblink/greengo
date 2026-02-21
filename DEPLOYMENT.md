# Green購 Netlify 部署指南

## 部署前檢查清單

- [x] `npm run build` 成功 (22/22 頁面)
- [x] `netlify.toml` 已配置
- [x] `@netlify/plugin-nextjs` 已安裝
- [x] `.gitignore` 已更新

## Netlify 部署步驟

### 1. 登入 Netlify

前往 [app.netlify.com](https://app.netlify.com)

### 2. 新增網站

1. 點擊 **"Add new site"** → **"Import an existing project"**
2. 選擇 **GitHub** 或你的 Git 提供商
3. 選擇 `greengo` 專案

### 3. 建置設定（自動偵測）

Netlify 會自動從 `netlify.toml` 讀取設定，確認以下內容正確：

| 設定項目 | 值 |
|---------|-----|
| Build command | `npm run build` |
| Publish directory | `.next` |
| Node version | 20 |

### 4. 設定子網域

1. 部署完成後，前往 **Site configuration** → **Domain management**
2. 點擊 **"Add domain alias"**
3. 輸入 `greengo.netlify.app`
4. 如果名稱已被使用，嘗試：
   - `greengo-tw.netlify.app`
   - `greengo-welfare.netlify.app`
   - `green-go.netlify.app`

### 5. 環境變數（目前不需要）

當前版本使用 Mock 資料，**不需要設定任何環境變數**。

未來上線正式版本時需要設定：
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- 金流相關 Key（ECPay/NewebPay）

## 部署驗證

部署完成後，測試以下頁面：

1. **首頁**: `https://greengo.netlify.app/`
2. **商品頁**: `https://greengo.netlify.app/products`
3. **登入頁**: `https://greengo.netlify.app/login`

### 測試帳號

| 角色 | 帳號 | 密碼 |
|------|------|------|
| 企業用戶 | company@test.com | 12345678 |
| 供應商 | vendor@test.com | 12345678 |
| 管理員 | admin@greengo.com.tw | admin123 |

## 常見問題

### Q: 部署失敗怎麼辦？

1. 檢查 Netlify 的 Deploy Log
2. 確認 Node.js 版本是 20
3. 確認 `npm run build` 在本地能成功

### Q: 網站顯示 404？

- 確認已選擇正確的分支（通常是 `main` 或 `master`）
- 確認 `netlify.toml` 已提交到 Git

### Q: 圖片沒顯示？

- 目前使用 `/images/` 目錄下的靜態圖片
- 確認圖片檔案已提交到 Git

## 檔案結構

```
greengo/
├── netlify.toml          # Netlify 配置
├── next.config.ts        # Next.js 配置
├── package.json          # 依賴和腳本
├── .env.example          # 環境變數範本
└── src/
    ├── app/              # 頁面
    ├── components/       # 元件
    └── lib/
        └── auth/
            └── mock-auth.tsx  # Mock 登入系統
```

## 技術規格

- **框架**: Next.js 16.1.6 (App Router)
- **UI**: React 19, Tailwind CSS, shadcn/ui
- **認證**: Mock 系統（LocalStorage）
- **部署**: Netlify (Serverless)

---

最後更新：2026-02-22
