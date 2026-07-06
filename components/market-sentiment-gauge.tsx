'use client'

interface MarketSentimentGaugeProps {
  sentiment: 'fear' | 'neutral' | 'greed'
  value: number // 0-100
}

export function MarketSentimentGauge({ sentiment, value }: MarketSentimentGaugeProps) {
  const sentimentText = sentiment.charAt(0).toUpperCase() + sentiment.slice(1)
  
  const getSentimentColor = () => {
    if (sentiment === 'fear') return '#DC2626' // red
    if (sentiment === 'neutral') return '#EAB308' // amber
    return '#16A34A' // green
  }

  const getSentimentTextColor = () => {
    if (sentiment === 'fear') return 'text-[#DC2626]'
    if (sentiment === 'neutral') return 'text-[#EAB308]'
    return 'text-[#16A34A]'
  }

  // Calculate needle rotation (0° = Fear/left, 180° = Neutral/right, 270° = Greed/top)
  const rotation = (value / 100) * 180

  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4 py-2">
      <div className="relative w-32 h-32">
        {/* SVG Gauge */}
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Background track */}
          <circle cx="60" cy="60" r="48" fill="none" stroke="#F3F4F6" strokeWidth="12" />
          
          {/* Fear zone (red) */}
          <path
            d="M 60 12 A 48 48 0 0 0 14 60"
            fill="none"
            stroke="#DC2626"
            strokeWidth="12"
            strokeLinecap="round"
          />
          
          {/* Neutral zone (amber) */}
          <path
            d="M 14 60 A 48 48 0 0 0 60 108"
            fill="none"
            stroke="#EAB308"
            strokeWidth="12"
            strokeLinecap="round"
          />
          
          {/* Greed zone (green) */}
          <path
            d="M 60 108 A 48 48 0 0 0 106 60"
            fill="none"
            stroke="#16A34A"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Needle */}
          <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '60px 60px', transition: 'transform 600ms ease-in-out' }}>
            {/* Needle line */}
            <line x1="60" y1="60" x2="60" y2="16" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
            {/* Needle tip circle */}
            <circle cx="60" cy="12" r="4" fill="#111827" />
          </g>

          {/* Center dot */}
          <circle cx="60" cy="60" r="6" fill="#111827" />
        </svg>
      </div>

      {/* Sentiment text */}
      <div className="text-center mt-2">
        <p className="text-xs" style={{ color: 'var(--text-label)' }}>The market is in</p>
        <p className={`text-sm font-bold ${getSentimentTextColor()}`}>{sentimentText} zone</p>
      </div>
    </div>
  )
}
