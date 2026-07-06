'use client'

import * as React from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // Initialize theme on mount
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null
    const theme = savedTheme || 'system'
    
    const html = document.documentElement
    
    if (theme === 'system') {
      // Remove data-theme to let CSS media query decide
      html.removeAttribute('data-theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      html.classList.remove('dark')
      if (prefersDark) {
        html.classList.add('dark')
      }
    } else {
      html.setAttribute('data-theme', theme)
      html.classList.remove('dark')
      if (theme === 'dark') {
        html.classList.add('dark')
      }
    }

    // Listen to system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      const currentTheme = localStorage.getItem('theme')
      if (currentTheme === 'system' || !currentTheme) {
        html.classList.remove('dark')
        if (e.matches) {
          html.classList.add('dark')
        }
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return <>{children}</>
}
