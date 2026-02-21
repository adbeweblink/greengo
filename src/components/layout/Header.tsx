'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navigation = [
  {
    title: '商品分類',
    items: [
      { title: '綠色禮品', href: '/products?category=gifts', description: '環保材質、MIT 在地品牌禮品' },
      { title: '企業旅遊', href: '/products?category=travel', description: '低碳旅遊、生態行程規劃' },
      { title: '志工活動', href: '/products?category=volunteer', description: '淨灘、植樹、社區服務' },
      { title: '教育課程', href: '/products?category=courses', description: 'ESG、永續發展培訓' },
    ],
  },
  { title: '關於我們', href: '/about' },
  { title: 'ESG 專區', href: '/esg' },
  { title: '供應商合作', href: '/vendor' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-500">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-stone-800">Green購</span>
            <span className="text-xs text-stone-500">企業福利網</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {navigation.map((item) =>
                'items' in item ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="text-stone-700 hover:text-green-700">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        {item.items?.map((subItem) => (
                          <li key={subItem.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={subItem.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-stone-100 focus:bg-stone-100"
                              >
                                <div className="text-sm font-medium leading-none text-stone-900">{subItem.title}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-stone-500">{subItem.description}</p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.title}>
                    <Link
                      href={item.href}
                      className={cn(
                        'group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-stone-100 hover:text-green-700 focus:bg-stone-100 focus:text-green-700 focus:outline-none'
                      )}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <Button variant="ghost" asChild>
            <Link href="/login">登入</Link>
          </Button>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/register">免費註冊</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 pt-8">
              {navigation.map((item) =>
                'items' in item ? (
                  <div key={item.title}>
                    <p className="mb-2 text-sm font-semibold text-stone-500">{item.title}</p>
                    <div className="flex flex-col gap-2 pl-4">
                      {item.items?.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="text-stone-700 hover:text-green-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="text-stone-700 hover:text-green-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                )
              )}
              <hr className="my-4" />
              <Button variant="outline" asChild className="w-full">
                <Link href="/login">登入</Link>
              </Button>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/register">免費註冊</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
