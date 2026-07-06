'use client'

import React, { useEffect, useState } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ToastProps {
  id: string
  type?: 'success' | 'error' | 'info'
  title: string
  message?: string
  onClose: (id: string) => void
  duration?: number
}

export function Toast({ id, type = 'info', title, message, onClose, duration = 4000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose(id), 300)
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, id, onClose])

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  }

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 max-w-sm bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-4 flex items-start gap-3 transition-all duration-300',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      )}
    >
      {icons[type]}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-slate-100 text-sm">{title}</h4>
        {message && <p className="text-slate-400 text-xs mt-1">{message}</p>}
      </div>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(() => onClose(id), 300)
        }}
        className="text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = (toast: Omit<ToastProps, 'id' | 'onClose'>) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { ...toast, id, onClose: removeToast }])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <>
      <div className="fixed bottom-0 right-0 z-50 pointer-events-none">
        <div className="flex flex-col gap-3 p-4 pointer-events-auto">
          {toasts.map(toast => (
            <Toast key={toast.id} {...toast} onClose={removeToast} />
          ))}
        </div>
      </div>
      {/* Expose addToast via window for easy access */}
      {typeof window !== 'undefined' && (
        // @ts-ignore
        (window.showToast = addToast)
      )}
    </>
  )
}
