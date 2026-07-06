'use client'

import * as React from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'system'>('system')

  React.useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      // Default to system preference
      applyTheme('system')
    }
    setMounted(true)
  }, [])

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    const html = document.documentElement
    
    if (newTheme === 'system') {
      // Remove data-theme to let CSS media query decide
      html.removeAttribute('data-theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      html.classList.remove('dark')
      if (prefersDark) {
        html.classList.add('dark')
      }
    } else {
      html.setAttribute('data-theme', newTheme)
      html.classList.remove('dark')
      if (newTheme === 'dark') {
        html.classList.add('dark')
      }
    }
  }

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  if (!mounted) {
    return null
  }

  const currentIcon = theme === 'light' ? <Sun className="h-5 w-5" /> : theme === 'dark' ? <Moon className="h-5 w-5" /> : <Monitor className="h-5 w-5" />

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-300 hover:text-white hover:bg-slate-800 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
          title="Toggle theme"
        >
          {currentIcon}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
      >
        <DropdownMenuItem
          onClick={() => handleThemeChange('light')}
          className={`text-slate-700 dark:text-slate-300 focus:bg-slate-100 dark:focus:bg-slate-800 cursor-pointer ${theme === 'light' ? 'font-semibold' : ''}`}
        >
          <Sun className="h-4 w-4 mr-2" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange('dark')}
          className={`text-slate-700 dark:text-slate-300 focus:bg-slate-100 dark:focus:bg-slate-800 cursor-pointer ${theme === 'dark' ? 'font-semibold' : ''}`}
        >
          <Moon className="h-4 w-4 mr-2" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange('system')}
          className={`text-slate-700 dark:text-slate-300 focus:bg-slate-100 dark:focus:bg-slate-800 cursor-pointer ${theme === 'system' ? 'font-semibold' : ''}`}
        >
          <Monitor className="h-4 w-4 mr-2" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
