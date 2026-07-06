import { LucideIcon } from 'lucide-react'

interface StatIconProps {
  icon: LucideIcon
  type: 'green' | 'blue' | 'amber' | 'orange' | 'red' | 'purple' | 'gray'
  size?: 'sm' | 'md' | 'lg'
}

const iconConfig = {
  green: {
    bg: 'var(--icon-green-bg)',
    text: 'var(--icon-green-text)'
  },
  blue: {
    bg: 'var(--icon-blue-bg)',
    text: 'var(--icon-blue-text)'
  },
  amber: {
    bg: 'var(--icon-amber-bg)',
    text: 'var(--icon-amber-text)'
  },
  orange: {
    bg: 'var(--icon-orange-bg)',
    text: 'var(--icon-orange-text)'
  },
  red: {
    bg: 'var(--icon-red-bg)',
    text: 'var(--icon-red-text)'
  },
  purple: {
    bg: 'var(--icon-purple-bg)',
    text: 'var(--icon-purple-text)'
  },
  gray: {
    bg: 'var(--icon-gray-bg)',
    text: 'var(--icon-gray-text)'
  }
}

const sizeMap = {
  sm: { container: 32, icon: 16 },
  md: { container: 40, icon: 20 },
  lg: { container: 48, icon: 24 }
}

export function StatIcon({ icon: Icon, type, size = 'md' }: StatIconProps) {
  const config = iconConfig[type]
  const sizes = sizeMap[size]

  return (
    <div
      className="rounded-[10px] flex items-center justify-center"
      style={{
        width: sizes.container,
        height: sizes.container,
        backgroundColor: config.bg,
        padding: '8px'
      }}
    >
      <Icon
        style={{
          width: sizes.icon,
          height: sizes.icon,
          color: config.text
        }}
      />
    </div>
  )
}
