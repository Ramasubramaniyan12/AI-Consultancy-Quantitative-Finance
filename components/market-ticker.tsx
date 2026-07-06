'use client'

import { ChevronUp, ChevronDown } from 'lucide-react'

interface TickerItem {
  symbol: string
  value: string
  change: number
}

const tickerData: TickerItem[] = [
  { symbol: 'NIFTY 50', value: '22,456.80', change: 0.57 },
  { symbol: 'SENSEX', value: '73,852.30', change: 0.56 },
  { symbol: 'BANK NIFTY', value: '48,125.50', change: -0.32 },
  { symbol: 'RELIANCE', value: '₹3,245.80', change: 1.2 },
  { symbol: 'TCS', value: '₹4,125.50', change: 0.85 },
  { symbol: 'HDFC BANK', value: '₹1,845.25', change: -0.45 },
  { symbol: 'INFOSYS', value: '₹2,456.75', change: 1.15 },
  { symbol: 'GOLD', value: '₹7,425.00', change: 0.62 },
  { symbol: 'BTC', value: '$97,450', change: 2.35 },
  { symbol: 'USD/INR', value: '₹83.45', change: -0.15 },
]

export function MarketTicker() {
  return (
    <div className="bg-[#0B1220] border-b border-slate-800 overflow-hidden">
      <div className="flex animate-scroll">
        {[...tickerData, ...tickerData].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 px-6 py-3 min-w-max hover:bg-slate-900/50 transition-colors"
          >
            <span className="text-sm font-semibold text-slate-300">{item.symbol}</span>
            <span className="text-sm font-bold text-white">{item.value}</span>
            <div
              className={`flex items-center gap-0.5 text-xs font-semibold ${
                item.change >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {item.change >= 0 ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
              {Math.abs(item.change).toFixed(2)}%
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 50s linear infinite;
        }
      `}</style>
    </div>
  )
}
