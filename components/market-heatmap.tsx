'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

export interface HeatmapTile {
  id: string
  name: string
  shortName?: string
  price: string
  change: number
  category: 'global' | 'sector' | 'crypto' | 'commodity'
  marketCap?: number
}

// Color mapping based on percentage change
const getHeatmapColor = (change: number): string => {
  if (change >= 5) return 'bg-[#15803D]' // dark green
  if (change >= 3) return 'bg-[#16A34A]' // green
  if (change >= 1) return 'bg-[#4ADE80]' // light green
  if (change >= 0.5) return 'bg-[#DCFCE7]' // very light green
  if (change > -0.5) return 'bg-[#F3F4F6]' // neutral gray
  if (change > -1) return 'bg-[#FEE2E2]' // very light red
  if (change > -3) return 'bg-[#FECACA]' // light red
  if (change > -5) return 'bg-[#F87171]' // red
  return 'bg-[#DC2626]' // dark red
}

const getTextColor = (change: number): string => {
  if (change >= 3) return 'text-[#15803D]' // dark green text
  if (change > -0.5 && change <= 0.5) return 'text-[#374151]' // dark gray
  if (change < -3) return 'text-[#991B1B]' // dark red text
  return 'text-[#111827]' // default dark text
}

const heatmapFallback: HeatmapTile[] = [
  { id: 'reliance', name: 'RELIANCE', change: 1.24, price: '₹2,847.50', category: 'sector' },
  { id: 'tcs', name: 'TCS', change: -0.56, price: '₹4,125.80', category: 'sector' },
  { id: 'hdfcbank', name: 'HDFCBANK', change: 0.89, price: '₹1,678.25', category: 'sector' },
  { id: 'infy', name: 'INFY', change: -1.12, price: '₹1,542.60', category: 'sector' },
  { id: 'bhartiartl', name: 'BHARTIARTL', change: 2.34, price: '₹1,425.30', category: 'sector' },
  { id: 'icicibank', name: 'ICICIBANK', change: 0.81, price: '₹1,089.45', category: 'sector' },
  { id: 'tatamotors', name: 'TATAMOTORS', change: -0.45, price: '₹945.80', category: 'sector' },
  { id: 'wipro', name: 'WIPRO', change: -0.78, price: '₹485.25', category: 'sector' },
  { id: 'sunpharma', name: 'SUNPHARMA', change: 1.05, price: '₹1,245.60', category: 'sector' },
  { id: 'maruti', name: 'MARUTI', change: 0.63, price: '₹10,542.80', category: 'sector' },
  { id: 'btc', name: 'BTC', change: 3.28, price: '$97,450', category: 'crypto' },
  { id: 'eth', name: 'ETH', change: -1.43, price: '$3,245', category: 'crypto' },
  { id: 'gold', name: 'GOLD', change: 0.45, price: '₹74,850/10g', category: 'commodity' },
  { id: 'silver', name: 'SILVER', change: 1.70, price: '₹89,250/kg', category: 'commodity' },
  { id: 'sp500', name: 'S&P 500', change: 0.57, price: '5,847.63', category: 'global' },
  { id: 'nasdaq', name: 'NASDAQ', change: 0.82, price: '18,442.55', category: 'global' },
]

const HeatmapTile = ({ id, name, shortName, price, change, marketCap, onClick }: HeatmapTile & { onClick?: () => void }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  
  const displayPrice = price || '—'
  const displayChange = change !== undefined && change !== null ? `${change > 0 ? '+' : ''}${change.toFixed(2)}%` : '0.00%'
  const sizeMultiplier = marketCap ? Math.max(1, Math.min(2, Math.sqrt((marketCap || 1) / 100000000000))) : 1
  const baseHeight = 70
  
  return (
    <div
      className="relative group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={onClick}
    >
      <div
        className={cn(
          'p-2 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 flex flex-col items-center justify-center',
          getHeatmapColor(change),
          'border-[var(--border-color)]'
        )}
        style={{
          minHeight: `${baseHeight * sizeMultiplier}px`,
          minWidth: '60px',
        }}
      >
        {/* Asset name */}
        <p className={cn('font-bold text-center leading-tight', getTextColor(change))} style={{ fontSize: '11px' }}>
          {shortName || name}
        </p>
        
        {/* Price for larger tiles */}
        {baseHeight * sizeMultiplier > 90 && (
          <p className={cn('text-xs font-semibold text-center leading-tight mt-0.5', getTextColor(change))}>
            {displayPrice}
          </p>
        )}
        
        {/* Percentage change */}
        <div className={cn('text-xs font-bold text-center flex items-center gap-0.5 mt-1', getTextColor(change))}>
          {change > 0.5 && <TrendingUp className="w-2.5 h-2.5" />}
          {change < -0.5 && <TrendingDown className="w-2.5 h-2.5" />}
          <span>{displayChange}</span>
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-2 shadow-lg whitespace-nowrap text-xs">
          <p className="font-bold text-[var(--text-primary)]">{name}</p>
          <p className="text-[var(--text-secondary)] text-xs">{displayPrice}</p>
          <p className={change >= 0 ? 'text-[var(--icon-green-text)]' : 'text-[var(--icon-red-text)]'}>
            {displayChange}
          </p>
        </div>
      )}
    </div>
  )
}

interface MarketHeatmapProps {
  allTiles?: HeatmapTile[]
  sectorTiles?: HeatmapTile[]
  globalTiles?: HeatmapTile[]
  cryptoTiles?: HeatmapTile[]
  commodityTiles?: HeatmapTile[]
  onTileClick?: (tile: HeatmapTile) => void
}

export function MarketHeatmap({
  allTiles = [],
  sectorTiles = [],
  globalTiles = [],
  cryptoTiles = [],
  commodityTiles = [],
  onTileClick,
}: MarketHeatmapProps) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy] = useState('gainers')

  const allTilesData = allTiles?.length ? allTiles : heatmapFallback
  const sectorTilesData = sectorTiles?.length ? sectorTiles : heatmapFallback
  const globalTilesData = globalTiles?.length ? globalTiles : heatmapFallback
  const cryptoTilesData = cryptoTiles?.length ? cryptoTiles : heatmapFallback
  const commodityTilesData = commodityTiles?.length ? commodityTiles : heatmapFallback

  const filterMap: Record<string, HeatmapTile[]> = {
    all: allTilesData,
    sectors: sectorTilesData,
    global: globalTilesData,
    crypto: cryptoTilesData,
    commodities: commodityTilesData,
  }

  const tiles = filterMap[activeFilter] || []

  // Sort tiles based on selection
  const sortedTiles = (tiles || []).sort((a, b) => {
    switch (sortBy) {
      case 'gainers':
        return b.change - a.change
      case 'losers':
        return a.change - b.change
      case 'volatile':
        return Math.abs(b.change) - Math.abs(a.change)
      case 'marketcap':
        return (b.marketCap || 0) - (a.marketCap || 0)
      default:
        return 0
    }
  })

  return (
    <Card className="bg-[var(--bg-card)] border-[var(--border-color)] w-full">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-lg text-[var(--text-primary)]">Market Heatmap - Global Overview</CardTitle>
            <p className="text-xs text-[var(--text-muted)] mt-1">Color intensity shows market performance</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text-muted)]">Updated 2 minutes ago</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Filter and Sort controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'All Markets', value: 'all' },
              { label: 'India Sectors', value: 'sectors' },
              { label: 'Global', value: 'global' },
              { label: 'Cryptocurrencies', value: 'crypto' },
              { label: 'Commodities', value: 'commodities' },
            ].map((filter) => (
              <Button
                key={filter.value}
                variant={activeFilter === filter.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  'text-xs transition-all h-8',
                  activeFilter === filter.value
                    ? 'bg-[var(--text-primary)] text-[var(--bg-card)]'
                    : 'border-[var(--border-color)] text-[var(--text-primary)]'
                )}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 text-xs rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors h-8"
          >
            <option value="gainers">Highest Gainer</option>
            <option value="losers">Biggest Loser</option>
            <option value="volatile">Most Volatile</option>
            <option value="marketcap">Market Cap (largest first)</option>
          </select>
        </div>

        {/* Heatmap grid */}
        <div className="flex flex-wrap gap-0.5 bg-[var(--page-bg)] p-4 rounded-lg min-h-[400px]">
          {sortedTiles.map((tile) => (
            <div key={tile.id} className="flex-shrink-0">
              <HeatmapTile
                {...tile}
                onClick={() => onTileClick?.(tile)}
              />
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs mt-6 pt-4 border-t border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#15803D] rounded"></div>
            <span className="text-[var(--text-muted)]">+5% or more</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#4ADE80] rounded"></div>
            <span className="text-[var(--text-muted)]">+1% to +5%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#F3F4F6] rounded border border-[var(--border-color)]"></div>
            <span className="text-[var(--text-muted)]">-0.5% to +0.5%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#FECACA] rounded"></div>
            <span className="text-[var(--text-muted)]">-1% to -5%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#DC2626] rounded"></div>
            <span className="text-[var(--text-muted)]">-5% or less</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
