'use client'

import { AlertTriangle } from 'lucide-react'
import { useState } from 'react'

export function RatingsDisclaimer() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className="rounded-lg p-5 border-l-4 transition-all"
      style={{
        backgroundColor: 'var(--icon-amber-bg)',
        borderColor: '#EAB308',
        borderLeftWidth: '4px',
      }}
    >
      <div className="flex gap-4">
        <AlertTriangle className="h-6 w-6 flex-shrink-0" style={{ color: '#EAB308' }} />
        <div className="flex-1">
          <h3
            className="font-bold mb-2 text-base"
            style={{ color: 'var(--text-primary)' }}
          >
            Important Disclaimer
          </h3>
          <p
            className={cn(
              'text-sm leading-relaxed',
              !isExpanded && 'line-clamp-3'
            )}
            style={{ color: 'var(--text-primary)' }}
          >
            The ratings, scores, and analysis provided on this platform — including Chronos Quant Ratings, AI Ratings, 
            and third-party agency ratings — are intended solely for informational and educational purposes based on 
            quantitative metrics and publicly available data. These ratings do NOT constitute investment advice, 
            recommendations, guarantees of future performance, or solicitation to invest. All investments carry risk, 
            including loss of principal. Please consult a SEBI-registered investment advisor before making any investment decisions.
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-sm font-medium hover:underline"
            style={{ color: '#EAB308' }}
          >
            {isExpanded ? 'Show Less' : 'Read Full Disclaimer'}
          </button>
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-[var(--border-color)] space-y-3 text-sm">
              <p style={{ color: 'var(--text-primary)' }}>
                <strong>These ratings do NOT constitute:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1" style={{ color: 'var(--text-primary)' }}>
                <li>Investment advice or recommendations</li>
                <li>Buy or sell calls for any security</li>
                <li>Guarantee of future performance</li>
                <li>Solicitation to invest in any asset</li>
              </ul>
              <p style={{ color: 'var(--text-primary)' }}>
                Ratings are based on historical data, quantitative models, and algorithmic analysis. Past performance 
                is not indicative of future results.
              </p>
              <p style={{ color: 'var(--text-primary)' }}>
                Third-party ratings (CRISIL, ICRA, CARE, Moody's, S&P, Fitch, etc.) are provided for reference only 
                and are the property of their respective organizations. Chronos Quant is not affiliated with these agencies.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="#" className="text-blue-600 hover:underline text-sm">
                  SEBI Guidelines
                </a>
                <a href="#" className="text-blue-600 hover:underline text-sm">
                  Full Disclaimer
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
