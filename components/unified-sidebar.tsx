'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronDown, ChevronLeft, BarChart3, TrendingUp, Briefcase, Search, BarChart2, Zap, Brain, Bell, Star, Banknote } from 'lucide-react'
import { cn } from '@/lib/utils'

// Create context for sidebar state
import { createContext, useContext } from 'react'

interface SidebarContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider')
  }
  return context
}

interface SidebarSection {
  id: string
  label: string
  icon: React.ReactNode
  href?: string
  items: Array<{
    label: string
    href: string
  }>
}

const sidebarSections: SidebarSection[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <BarChart3 className="w-5 h-5" />,
    items: [{ label: 'Overview', href: '/' }],
  },
  {
    id: 'market-data',
    label: 'Market Data',
    icon: <TrendingUp className="w-5 h-5" />,
    items: [
      { label: 'Market Overview', href: '/markets' },
      { label: 'Stocks', href: '/stocks' },
      { label: 'Mutual Funds', href: '/mutual-funds' },
      { label: 'Bonds', href: '/bonds' },
      { label: 'ETFs', href: '/etfs' },
      { label: 'FD/RD Products', href: '/fd-rd' },
      { label: 'Commodities', href: '/commodities' },
      { label: 'Crypto', href: '/crypto' },
      { label: 'IPO', href: '/ipo' },
    ],
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    icon: <Briefcase className="w-5 h-5" />,
    items: [
      { label: 'My Portfolio', href: '/watchlist' },
      { label: 'Comparison', href: '/compare' },
    ],
  },
  {
    id: 'ratings',
    label: 'Ratings',
    icon: <Star className="w-5 h-5" />,
    items: [{ label: 'Ratings & Analysis', href: '/ratings' }],
  },
  {
    id: 'risk-management',
    label: 'Risk Management',
    icon: <BarChart2 className="w-5 h-5" />,
    items: [
      { label: 'Analytics', href: '/analytics' },
      { label: 'Risk Analytics', href: '/risk-analytics' },
      { label: 'Portfolio Health', href: '/ratings/portfolio-health' },
    ],
  },
  {
    id: 'personal-finance',
    label: 'Personal Finance',
    icon: <Banknote className="w-5 h-5" />,
    href: '/personal-finance',
    items: [
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
  {
    id: 'financial-metrics',
    label: 'Financial Metrics',
    icon: <Search className="w-5 h-5" />,
    items: [
      { label: 'Research', href: '/research' },
      { label: 'Screener', href: '/screener' },
    ],
  },
  {
    id: 'strategy-builder',
    label: 'Strategy Builder',
    icon: <Zap className="w-5 h-5" />,
    items: [
      { label: 'Backtesting', href: '/research' },
      { label: 'Strategy Library', href: '/learn' },
    ],
  },
  {
    id: 'ai-consultancy',
    label: 'AI Consultancy',
    icon: <Brain className="w-5 h-5" />,
    items: [{ label: 'AI Advisor', href: '/ai-advisor' }],
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <Bell className="w-5 h-5" />,
    items: [{ label: 'Alerts', href: '/watchlist' }],
  },
]

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('sidebar-open')
    if (saved !== null) {
      setIsOpen(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('sidebar-open', JSON.stringify(isOpen))
    }
  }, [isOpen, mounted])

  if (!mounted) return null

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar()
  
  return (
    <div className={cn(
      'flex-1 overflow-y-auto transition-all duration-300 ease-in-out flex flex-col box-border',
      isOpen ? 'ml-64' : 'ml-16'
    )}>
      <div className="flex flex-col flex-1">
        {children}
      </div>
    </div>
  )
}

export function UnifiedSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { isOpen, setIsOpen } = useSidebar()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['market-data']))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Auto-expand sections based on current path
    const newExpanded = new Set<string>()
    sidebarSections.forEach(section => {
      if (section.items.some(item => pathname === item.href || pathname.startsWith(item.href + '/'))) {
        newExpanded.add(section.id)
      }
    })
    if (newExpanded.size > 0) {
      setExpandedSections(newExpanded)
    }
  }, [pathname])

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const isItemActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  if (!mounted) return null

  return (
    <aside 
      className={cn(
        'fixed left-0 top-16 h-[calc(100vh-64px)] bg-sidebar border-r border-sidebar-border overflow-y-auto scrollbar-thin scrollbar-thumb-sidebar-accent scrollbar-track-sidebar transition-all duration-300 ease-in-out',
        isOpen ? 'w-64' : 'w-16'
      )}
    >
      {/* Toggle Button */}
      <div className="sticky top-0 z-10 bg-sidebar border-b border-sidebar-border p-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full flex items-center justify-center px-3 py-2.5 rounded-lg transition-all duration-200',
            'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary'
          )}
          title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <ChevronLeft
            className={cn(
              'w-5 h-5 transition-transform duration-300',
              !isOpen && 'rotate-180'
            )}
          />
        </button>
      </div>

      <nav className={cn('space-y-2 transition-all duration-300', isOpen ? 'p-4' : 'p-2')}>
        {sidebarSections.map(section => {
          const isExpanded = expandedSections.has(section.id)
          const hasActiveItem = section.items.some(item => isItemActive(item.href))

          return (
            <div key={section.id} className="space-y-1">
              {/* Section Header */}
              <button
                onClick={() => {
                  if (section.href) {
                    router.push(section.href)
                    return
                  }
                  if (isOpen) {
                    toggleSection(section.id)
                  }
                }}
                className={cn(
                  'w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200',
                  isOpen ? 'justify-between' : 'justify-center',
                  'text-sm font-semibold',
                  hasActiveItem || isExpanded
                    ? 'bg-sidebar-primary/15 text-sidebar-primary border border-sidebar-primary/30'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
                title={isOpen ? undefined : section.label}
              >
                <div className={cn('flex items-center', isOpen && 'gap-2')}>
                  <span className="text-sidebar-primary flex-shrink-0">{section.icon}</span>
                  {isOpen && <span className="truncate">{section.label}</span>}
                </div>
                {isOpen && (
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 transition-transform duration-200 flex-shrink-0',
                      isExpanded ? 'rotate-180' : ''
                    )}
                  />
                )}
              </button>

              {/* Section Items - Only show when open and expanded */}
              {isOpen && isExpanded && (
                <div className="ml-2 space-y-1 border-l-2 border-sidebar-primary/20 pl-2">
                  {section.items.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'block px-3 py-2 rounded-lg text-sm transition-all duration-200 truncate',
                        isItemActive(item.href)
                          ? 'bg-sidebar-primary/20 text-sidebar-primary font-semibold'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      )}
                      title={item.label}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
