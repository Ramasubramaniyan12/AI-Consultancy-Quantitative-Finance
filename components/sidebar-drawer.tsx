'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const navigationItems = [
  { label: 'Dashboard', href: '/', icon: '📊' },
  {
    label: 'Markets',
    href: '/markets',
    icon: '📈',
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
  { label: 'Portfolio', href: '/watchlist', icon: '💼' },
  { label: 'Research', href: '/research', icon: '🔬' },
  { label: 'Risk Analytics', href: '/risk-analytics', icon: '⚠️' },
  { label: 'AI Advisor', href: '/ai-advisor', icon: '🤖' },
  { label: 'Learn', href: '/learn', icon: '📚' },
  { label: 'Pricing', href: '/pricing', icon: '💳' },
]

export function SidebarDrawer({ isOpen, onClose }: SidebarDrawerProps) {
  const pathname = usePathname()
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Auto-expand Markets if on a market-related page
    if (pathname.startsWith('/markets') || pathname.startsWith('/stocks') || 
        pathname.startsWith('/mutual-funds') || pathname.startsWith('/bonds') ||
        pathname.startsWith('/etfs') || pathname.startsWith('/fd-rd') ||
        pathname.startsWith('/commodities') || pathname.startsWith('/crypto') || 
        pathname.startsWith('/ipo') || pathname.startsWith('/ratings')) {
      setExpandedMenu('Markets')
    }
  }, [pathname])

  // Close drawer on route change
  useEffect(() => {
    onClose()
  }, [pathname])

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

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
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-l-2 border-cyan-400 dark:border-cyan-500 shadow-2xl z-50 transition-transform duration-300 overflow-y-auto',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b-2 border-cyan-300/30 dark:border-cyan-400/20 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-cyan-300 dark:to-blue-300 bg-clip-text text-transparent">
            Menu
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-cyan-200 dark:hover:bg-cyan-700 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-cyan-600 dark:text-cyan-300" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="px-4 py-6 space-y-2">
          {navigationItems.map((item) => {
            const hasSubmenu = item.submenu && item.submenu.length > 0
            const isMenuExpanded = expandedMenu === item.label
            const submenuActive = isSubmenuActive(item.submenu)
            const itemActive = isActive(item.href)

            return (
              <div key={item.label}>
                {hasSubmenu ? (
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all duration-300',
                      submenuActive || isMenuExpanded
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg scale-105'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-cyan-200/40 dark:hover:bg-cyan-800/40'
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      {item.label}
                    </span>
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 transition-transform duration-300',
                        isMenuExpanded ? 'rotate-180' : ''
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300',
                      itemActive
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg scale-105'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-cyan-200/40 dark:hover:bg-cyan-800/40'
                    )}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {item.label}
                  </Link>
                )}

                {/* Submenu Items */}
                {hasSubmenu && isMenuExpanded && (
                  <div className="mt-2 ml-4 space-y-1 border-l-3 border-cyan-300 dark:border-cyan-500 pl-4 py-2">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className={cn(
                          'block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300',
                          isActive(subitem.href)
                            ? 'bg-cyan-300 dark:bg-cyan-600 text-blue-900 dark:text-white font-bold'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-cyan-200/50 dark:hover:bg-cyan-700/50'
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
        </nav>

        {/* Footer Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-cyan-300/30 dark:border-cyan-400/20 bg-gradient-to-t from-blue-100/50 to-transparent dark:from-blue-900/50">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-cyan-600 dark:text-cyan-400">Chronos Quant</span> • AI-Powered Finance
          </p>
        </div>
      </div>
    </>
  )
}
