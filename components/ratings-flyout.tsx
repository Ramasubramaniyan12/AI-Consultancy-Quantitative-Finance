'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingsFlyoutProps {
  isOpen: boolean
  onClose: () => void
}

const ratingsItems = [
  { label: 'Stocks Ratings', href: '/ratings/stocks' },
  { label: 'Mutual Funds Ratings', href: '/ratings/mutual-funds' },
  { label: 'Bonds Ratings', href: '/ratings/bonds' },
  { label: 'ETFs Ratings', href: '/ratings/etfs' },
  { label: 'FD/RD Products Ratings', href: '/ratings/fd-rd' },
  { label: 'Portfolio Health Ratings', href: '/ratings/portfolio-health' },
]

export function RatingsFlyout({ isOpen, onClose }: RatingsFlyoutProps) {
  const pathname = usePathname()
  const flyoutRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (flyoutRef.current && !flyoutRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = isMobile ? 'hidden' : 'auto'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, isMobile, onClose])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  const handleItemClick = (href: string) => {
    localStorage.setItem('last-ratings-page', href)
    if (isMobile) {
      onClose()
    }
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Flyout Panel */}
      <div
        ref={flyoutRef}
        className={cn(
          'fixed top-16 right-0 h-[calc(100vh-64px)] w-80 lg:w-72 bg-[#020617] border-l border-[#1E293B] shadow-2xl z-50',
          'transition-transform duration-300 ease-out',
          isMobile
            ? isOpen
              ? 'translate-x-0'
              : 'translate-x-full'
            : isOpen
              ? 'translate-x-0'
              : 'translate-x-full',
          !isMobile && 'pointer-events-none' && !isOpen ? '' : ''
        )}
        style={{
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E293B]">
          <h2 className="text-lg font-semibold text-[#F8FAFC]">Ratings</h2>
          {isMobile && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-[#0F172A] rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-[#CBD5E1]" />
            </button>
          )}
        </div>

        {/* Content */}
        <nav className="space-y-1 px-3 py-4 overflow-y-auto h-[calc(100%-73px)]">
          {ratingsItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleItemClick(item.href)}
              className={cn(
                'block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                isActive(item.href)
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-[#CBD5E1] hover:text-white hover:bg-[#0F172A]'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
