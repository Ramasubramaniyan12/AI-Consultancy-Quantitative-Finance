'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RightDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const navigationItems = [
  { label: 'Dashboard', href: '/' },
  {
    label: 'Markets',
    href: '/markets',
    submenu: [
      { label: 'Stocks', href: '/stocks' },
      { label: 'Mutual Funds', href: '/mutual-funds' },
      { label: 'Bonds', href: '/bonds' },
      { label: 'ETFs', href: '/etfs' },
      { label: 'FD/RD', href: '/fd-rd' },
    ],
  },
  { label: 'Portfolio', href: '/watchlist' },
  { label: 'Research', href: '/research' },
  { label: 'Risk Analytics', href: '/risk-analytics' },
  { label: 'AI Advisor', href: '/ai-advisor' },
]

export function RightDrawer({ isOpen, onClose }: RightDrawerProps) {
  const pathname = usePathname()
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      // Auto-expand Markets if on a market-related page
      if (pathname.startsWith('/stocks') || pathname.startsWith('/mutual-funds') ||
          pathname.startsWith('/bonds') || pathname.startsWith('/etfs') ||
          pathname.startsWith('/fd-rd')) {
        setExpandedMenu('Markets')
      }
    }
  }, [isOpen, pathname])

  useEffect(() => {
    // Close drawer on Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  const isSubmenuActive = (submenu?: typeof navigationItems[0]['submenu']) => {
    if (!submenu) return false
    return submenu.some(item => isActive(item.href))
  }

  const handleMenuClick = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label)
  }

  const handleLinkClick = () => {
    onClose()
  }

  if (!mounted) return null

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          'fixed right-0 top-0 h-screen w-80 bg-white dark:bg-slate-950 shadow-2xl overflow-y-auto z-50 transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close drawer"
          >
            <X className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Navigation */}
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
                    onClick={() => handleMenuClick(item.label)}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all duration-300',
                      submenuActive || isMenuExpanded
                        ? 'bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
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
                    onClick={handleLinkClick}
                    className={cn(
                      'block px-4 py-3 rounded-lg font-medium transition-all duration-300',
                      itemActive
                        ? 'bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Submenu Items */}
                {hasSubmenu && isMenuExpanded && (
                  <div className="space-y-1 mt-2 ml-2 border-l-2 border-blue-300 dark:border-blue-700 pl-4">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        onClick={handleLinkClick}
                        className={cn(
                          'block px-3 py-2 rounded-lg text-sm transition-all duration-300',
                          isActive(subitem.href)
                            ? 'bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-300 font-medium'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
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
      </div>
    </>
  )
}
