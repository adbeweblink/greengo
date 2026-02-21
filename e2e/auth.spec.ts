import { test, expect } from '@playwright/test'

test.describe('登入流程測試', () => {
  test.beforeEach(async ({ page }) => {
    // 清除 localStorage 確保乾淨狀態
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
  })

  test('首頁可正常載入', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Green購/)
  })

  test('企業登入頁可正常載入', async ({ page }) => {
    const response = await page.goto('/login')
    expect(response?.status()).toBe(200)
    // 確認登入表單存在
    await expect(page.locator('input[id="email"]')).toBeVisible()
    await expect(page.locator('input[id="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('供應商登入頁可正常載入', async ({ page }) => {
    const response = await page.goto('/vendor/login')
    expect(response?.status()).toBe(200)
    await expect(page.locator('input[id="email"]')).toBeVisible()
    await expect(page.locator('input[id="password"]')).toBeVisible()
  })

  test('管理員登入頁可正常載入', async ({ page }) => {
    const response = await page.goto('/admin/login')
    expect(response?.status()).toBe(200)
    await expect(page.locator('input[id="email"]')).toBeVisible()
    await expect(page.locator('input[id="password"]')).toBeVisible()
  })

  test('企業用戶登入失敗顯示錯誤', async ({ page }) => {
    await page.goto('/login')
    await page.waitForLoadState('networkidle')

    // 填入錯誤密碼
    await page.fill('input[id="email"]', 'company@test.com')
    await page.fill('input[id="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')

    // 確認有錯誤訊息
    await expect(page.locator('[data-sonner-toast]')).toBeVisible({ timeout: 5000 })
  })

  test('供應商登入成功導向 dashboard', async ({ page }) => {
    await page.goto('/vendor/login')
    await page.waitForLoadState('networkidle')

    await page.fill('input[id="email"]', 'vendor@test.com')
    await page.fill('input[id="password"]', '12345678')
    await page.click('button[type="submit"]')

    // 等待成功訊息或頁面跳轉
    await Promise.race([
      page.waitForURL('**/vendor/dashboard', { timeout: 15000 }),
      expect(page.locator('[data-sonner-toast]')).toBeVisible({ timeout: 5000 })
    ])
  })

  test('管理員登入成功導向 dashboard', async ({ page }) => {
    await page.goto('/admin/login')
    await page.waitForLoadState('networkidle')

    await page.fill('input[id="email"]', 'admin@greengo.com.tw')
    await page.fill('input[id="password"]', 'admin123')
    await page.click('button[type="submit"]')

    // 等待成功訊息或頁面跳轉
    await Promise.race([
      page.waitForURL('**/admin/dashboard', { timeout: 15000 }),
      expect(page.locator('[data-sonner-toast]')).toBeVisible({ timeout: 5000 })
    ])
  })
})

test.describe('頁面導航測試', () => {
  test('首頁可正常載入', async ({ page }) => {
    const response = await page.goto('/')
    expect(response?.status()).toBe(200)
  })

  test('ESG 頁面可正常載入', async ({ page }) => {
    const response = await page.goto('/esg')
    expect(response?.status()).toBe(200)
  })

  test('供應商專區可正常載入', async ({ page }) => {
    const response = await page.goto('/vendor')
    expect(response?.status()).toBe(200)
  })

  test('註冊頁面可正常載入', async ({ page }) => {
    const response = await page.goto('/register')
    expect(response?.status()).toBe(200)
  })

  test('企業 dashboard 頁面存在', async ({ page }) => {
    const response = await page.goto('/dashboard')
    expect(response?.status()).toBe(200)
  })

  test('供應商 dashboard 頁面存在', async ({ page }) => {
    const response = await page.goto('/vendor/dashboard')
    expect(response?.status()).toBe(200)
  })

  test('管理員 dashboard 頁面存在', async ({ page }) => {
    const response = await page.goto('/admin/dashboard')
    expect(response?.status()).toBe(200)
  })
})
