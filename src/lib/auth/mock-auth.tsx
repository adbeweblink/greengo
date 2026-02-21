'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

// Mock 用戶資料
export const MOCK_USERS = {
  // 企業用戶
  'company@test.com': {
    id: '1',
    email: 'company@test.com',
    password: '12345678',
    name: '王小明',
    role: 'company' as const,
    company: '台灣科技股份有限公司',
    taxId: '12345678',
  },
  // 供應商
  'vendor@test.com': {
    id: '2',
    email: 'vendor@test.com',
    password: '12345678',
    name: '陳綠意',
    role: 'vendor' as const,
    company: '綠色工坊',
    taxId: '87654321',
  },
  // 管理員
  'admin@greengo.com.tw': {
    id: '3',
    email: 'admin@greengo.com.tw',
    password: 'admin123',
    name: '系統管理員',
    role: 'admin' as const,
  },
}

export type UserRole = 'company' | 'vendor' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  company?: string
  taxId?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // 初始化：從 localStorage 讀取登入狀態
  useEffect(() => {
    const savedUser = localStorage.getItem('greengo_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // 模擬 API 延遲
    await new Promise(resolve => setTimeout(resolve, 500))

    const mockUser = MOCK_USERS[email as keyof typeof MOCK_USERS]

    if (!mockUser) {
      return { success: false, error: '帳號不存在' }
    }

    if (mockUser.password !== password) {
      return { success: false, error: '密碼錯誤' }
    }

    // 登入成功
    const { password: _, ...userWithoutPassword } = mockUser
    setUser(userWithoutPassword)
    localStorage.setItem('greengo_user', JSON.stringify(userWithoutPassword))

    // 導向對應的 dashboard
    switch (mockUser.role) {
      case 'company':
        router.push('/dashboard')
        break
      case 'vendor':
        router.push('/vendor/dashboard')
        break
      case 'admin':
        router.push('/admin/dashboard')
        break
    }

    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('greengo_user')
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
