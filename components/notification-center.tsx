'use client'

import React, { useState } from 'react'
import { Bell, X, AlertCircle, TrendingUp, Zap, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface Notification {
  id: string
  type: 'price' | 'risk' | 'news' | 'ai' | 'volatility'
  title: string
  message: string
  timestamp: Date
  read: boolean
  icon: React.ReactNode
  color: string
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'price',
    title: 'Price Alert: TCS',
    message: 'Your watchlist item TCS reached ₹3,850',
    timestamp: new Date(Date.now() - 5 * 60000),
    read: false,
    icon: <TrendingUp className="w-4 h-4" />,
    color: 'text-green-500',
  },
  {
    id: '2',
    type: 'risk',
    title: 'Portfolio Risk Alert',
    message: 'Tech sector concentration increased to 42%',
    timestamp: new Date(Date.now() - 15 * 60000),
    read: false,
    icon: <AlertCircle className="w-4 h-4" />,
    color: 'text-red-500',
  },
  {
    id: '3',
    type: 'volatility',
    title: 'Market Volatility Warning',
    message: 'VIX increased 15% — market turbulence detected',
    timestamp: new Date(Date.now() - 30 * 60000),
    read: true,
    icon: <Zap className="w-4 h-4" />,
    color: 'text-yellow-500',
  },
  {
    id: '4',
    type: 'ai',
    title: 'AI Recommendation',
    message: 'Diversify portfolio — consider 5% allocation to Gold ETF',
    timestamp: new Date(Date.now() - 60 * 60000),
    read: true,
    icon: <Brain className="w-4 h-4" />,
    color: 'text-blue-500',
  },
]

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-300 hover:text-white hover:bg-slate-800/50"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 max-h-96 overflow-hidden p-0 border-slate-700 bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700 bg-slate-800/50">
          <h3 className="font-semibold text-slate-100">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs text-cyan-500 hover:text-cyan-400"
            >
              Mark all as read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-80">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <Bell className="w-10 h-10 mb-3 opacity-50" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            notifications.map(notification => (
              <div
                key={notification.id}
                className={cn(
                  'px-4 py-3 border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors cursor-pointer',
                  !notification.read && 'bg-slate-800/50'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn('mt-1', notification.color)}>
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-slate-100 text-sm">{notification.title}</h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNotification(notification.id)
                        }}
                        className="text-slate-500 hover:text-slate-400 shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{notification.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-slate-500">{formatTime(notification.timestamp)}</span>
                      {!notification.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            markAsRead(notification.id)
                          }}
                          className="text-xs text-cyan-500 hover:text-cyan-400"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-700 bg-slate-800/50">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs text-slate-400 hover:text-slate-300"
            >
              View all notifications
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
