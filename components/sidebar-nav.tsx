'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Banknote, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigationItems = [
  { label: 'Dashboard', href: '/' },
  {
    label: 'Markets',
    href: '/markets',
    submenu: [
      { label: 'Market Overview', href: '/markets' },
      { label: 'Stocks', href: '/stocks' },
      { label: 'Mutual Funds', href: '/mutual-funds' },
      { label: 'Bonds', href: '/bonds' },
      { label: 'ETFs', href: '/etfs' },
      { label: 'FD/RD Products', href: '/fd-rd' },
      { label: 'Commodities', href: '/commodities' },
      { label: 'Crypto', href: '/crypto' },
      { label: 'IPO', href: '/ipo' },
      { label: 'Ratings', href: '/ratings/stocks' },
    ],
  },
  { label: 'Portfolio', href: '/watchlist' },
  {
    label: 'Personal Finance',
    href: '/personal-finance',
    submenu: [
      { label: 'Dashboard', href: '/personal-finance' },
      { label: 'Credit Cards', href: '/personal-finance?tab=credit-cards' },
      { label: 'Banking', href: '/personal-finance?tab=banking' },
      { label: 'Mortgages', href: '/personal-finance?tab=mortgages' },
      { label: 'Student Loans', href: '/personal-finance?tab=student-loans' },
      { label: 'Personal Loans', href: '/personal-finance?tab=personal-loans' },
      { label: 'Insurance', href: '/personal-finance?tab=insurance' },
      { label: 'Taxes', href: '/personal-finance?tab=taxes' },
    ],
  },
  { label: 'Research', href: '/research' },
  { label: 'Risk Analytics', href: '/risk-analytics' },
  { label: 'AI Advisor', href: '/ai-advisor' },
]

export function SidebarNav() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    // Auto-expand Markets if on a market-related page
    if (pathname.startsWith('/markets') || pathname.startsWith('/stocks') || pathname.startsWith('/mutual-funds') ||
        pathname.startsWith('/bonds') || pathname.startsWith('/etfs') || pathname.startsWith('/fd-rd') ||
        pathname.startsWith('/commodities') || pathname.startsWith('/crypto') || pathname.startsWith('/ipo') ||
        pathname.startsWith('/ratings')) {
      setExpandedMenu('Markets')
    }
  }, [pathname])

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  const isSubmenuActive = (submenu?: typeof navigationItems[0]['submenu']) => {
    if (!submenu) return false
    return submenu.some(item => isActive(item.href))
  }

  const toggleMenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label)
  }

  if (!mounted) return null

  return (
    <nav className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 overflow-y-auto bg-slate-900 border-r border-slate-800 pt-6">
      <div className="space-y-1 px-3">
        {navigationItems.map((item) => {
          const hasSubmenu = item.submenu && item.submenu.length > 0
          const isMenuExpanded = expandedMenu === item.label
          const submenuActive = isSubmenuActive(item.submenu)

          return (
            <div key={item.label}>
              {hasSubmenu ? (
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={cn(
                    'w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300',
                    submenuActive || isMenuExpanded
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  )}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform duration-300',
                      isMenuExpanded ? 'rotate-180' : ''
                    )}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300',
                    isActive(item.href)
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  )}
                >
                  {item.label}
                </Link>
              )}

              {/* Submenu Items */}
              {hasSubmenu && isMenuExpanded && (
                <div className="space-y-1 mt-2 ml-2 border-l border-slate-700 pl-3">
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.href}
                      href={subitem.href}
                      className={cn(
                        'block px-3 py-2 rounded-lg text-sm transition-all duration-300',
                        isActive(subitem.href)
                          ? 'bg-cyan-500/10 text-cyan-300 font-medium'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      )}
                    >
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}
