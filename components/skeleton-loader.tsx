import { cn } from '@/lib/utils'

interface SkeletonLoaderProps {
  className?: string
  variant?: 'line' | 'card' | 'circle'
}

export function SkeletonLoader({ className, variant = 'line' }: SkeletonLoaderProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded',
        variant === 'line' && 'h-4 w-full',
        variant === 'card' && 'h-32 w-full rounded-lg',
        variant === 'circle' && 'h-10 w-10 rounded-full',
        className
      )}
    />
  )
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLoader key={i} className={i === lines - 1 ? 'w-3/4' : undefined} />
      ))}
    </div>
  )
}
