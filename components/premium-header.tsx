'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, Bell, User, LogOut, Settings, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { MarketTicker } from '@/components/market-ticker'
import { ThemeToggle } from '@/components/theme-toggle'
import { NotificationCenter } from '@/components/notification-center'
import { AiConsultancyPanel } from '@/components/ai-consultancy-panel'
import { GlobalSearch } from '@/components/GlobalSearch'
import { useSidebar } from '@/components/unified-sidebar'
import { cn } from '@/lib/utils'

export function PremiumHeader() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [aiPanelOpen, setAiPanelOpen] = React.useState(false)
  const { isOpen, setIsOpen } = useSidebar()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      {/* Market Ticker */}
      <MarketTicker />

      {/* Main Header */}
      <nav
        className={cn(
          'bg-[#0B1220] border-b border-slate-800 transition-all duration-300',
          isScrolled && 'backdrop-blur-md bg-[#0B1220]/80 border-slate-700/50'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Sidebar Toggle + Logo - Left */}
            <div className="flex items-center gap-2 min-w-fit">
              {/* Sidebar Toggle Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-all"
                title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>

              {/* Logo & Brand */}
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CQ</span>
                </div>
                <span className="font-bold text-lg text-white hidden sm:inline">Chronos Quant</span>
              </Link>
            </div>

            {/* Search Bar - Center (Hidden on mobile) */}
            <div className="hidden lg:flex flex-1 max-w-md">
              <GlobalSearch />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-slate-300 hover:text-white hover:bg-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* AI Consultancy Icon */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setAiPanelOpen(!aiPanelOpen)}
                className="text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors"
                title="Open AI Consultancy"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </Button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Notifications */}
              <NotificationCenter />

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    <User className="h-5 w-5" />
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-slate-900 border-slate-800">
                  <DropdownMenuItem className="text-slate-200 focus:bg-slate-800">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-200 focus:bg-slate-800">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem className="text-red-500 focus:bg-slate-800">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Get Started Button */}
              <Button className="hidden sm:flex bg-cyan-600 hover:bg-cyan-700 text-white">
                Get Started
              </Button>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-72 bg-slate-900 border-slate-800"
                  aria-describedby={undefined}
                >
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="flex flex-col gap-6 mt-6">
                    {/* Mobile Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <Input
                        placeholder="Search..."
                        className="pl-10 bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
                      />
                    </div>



                    {/* Additional Links */}
                    <div className="border-t border-slate-800 pt-4 flex flex-col gap-2">
                      <Link href="/about" className="px-3 py-2 text-sm text-slate-300 hover:text-white">
                        About
                      </Link>
                      <Link href="/research" className="px-3 py-2 text-sm text-slate-300 hover:text-white">
                        Research
                      </Link>
                      <Link href="/risk-analytics" className="px-3 py-2 text-sm text-slate-300 hover:text-white">
                        Risk Analytics
                      </Link>
                      <Link href="/ai-advisor" className="px-3 py-2 text-sm text-slate-300 hover:text-white">
                        AI Advisor
                      </Link>
                      <Link href="/learn" className="px-3 py-2 text-sm text-slate-300 hover:text-white">
                        Learn
                      </Link>
                      <Link href="/pricing" className="px-3 py-2 text-sm text-slate-300 hover:text-white">
                        Pricing
                      </Link>
                    </div>

                    {/* Mobile Buttons */}
                    <div className="flex gap-2 pt-4 border-t border-slate-800">
                      <Button variant="outline" className="flex-1 border-slate-700 text-slate-300">
                        Sign In
                      </Button>
                      <Button className="flex-1 bg-cyan-600 hover:bg-cyan-700">
                        Get Started
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Search Bar (Expanded) */}
          {searchOpen && (
            <div className="mt-4 lg:hidden">
              <GlobalSearch />
            </div>
          )}
        </div>
      </nav>

      {/* AI Consultancy Panel */}
      <AiConsultancyPanel isOpen={aiPanelOpen} onClose={() => setAiPanelOpen(false)} />
    </header>
  )
}
