'use client'

import { cn } from '@/lib/utils'

type RatingType = 'strong-buy' | 'buy' | 'hold' | 'sell' | 'strong-sell'

interface RatingBadgeProps {
  rating: RatingType
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const ratingConfig: Record<RatingType, { bg: string; text: string; label: string; color: string }> = {
  'strong-buy': {
    bg: '#DCFCE7',
    text: '#15803D',
    label: 'Strong Buy',
    color: '#16A34A',
  },
  'buy': {
    bg: '#D1FAE5',
    text: '#065F46',
    label: 'Buy',
    color: '#10B981',
  },
  'hold': {
    bg: '#FEF9C3',
    text: '#854D0E',
    label: 'Hold',
    color: '#EAB308',
  },
  'sell': {
    bg: '#FFEDD5',
    text: '#9A3412',
    label: 'Sell',
    color: '#F97316',
  },
  'strong-sell': {
    bg: '#FEE2E2',
    text: '#991B1B',
    label: 'Strong Sell',
    color: '#DC2626',
  },
}

export function RatingBadge({ rating, showLabel = true, size = 'md' }: RatingBadgeProps) {
  const config = ratingConfig[rating]
  const sizeClass = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }[size]

  return (
    <div
      className={cn('rounded-full font-medium inline-block', sizeClass)}
      style={{
        backgroundColor: config.bg,
        color: config.text,
      }}
    >
      {showLabel ? config.label : ''}
    </div>
  )
}
