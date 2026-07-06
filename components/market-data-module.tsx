'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, GripVertical, Trash2, TrendingUp, TrendingDown, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WatchlistItem {
  id: string
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
}

interface GainerLoser {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

export function MarketDataModule() {
  const [searchQuery, setSearchQuery] = useState('')
  const [marketToggle, setMarketToggle] = useState<'india' | 'global'>('india')
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([
    { id: '1', symbol: 'INFY', name: 'Infosys', price: 1450.50, change: 45.50, changePercent: 3.23, volume: 2450000 },
    { id: '2', symbol: 'TCS', name: 'Tata Consultancy', price: 3850.25, change: -25.75, changePercent: -0.66, volume: 1230000 },
    { id: '3', symbol: 'RELIANCE', name: 'Reliance Industries', price: 2890.50, change: 120.50, changePercent: 4.35, volume: 3100000 },
  ])

  const gainers: GainerLoser[] = [
    { symbol: 'SAIL', name: 'Steel Authority', price: 245.30, change: 12.80, changePercent: 5.49 },
    { symbol: 'TATASTEEL', name: 'Tata Steel', price: 156.50, change: 8.75, changePercent: 5.9 },
    { symbol: 'APOLLOHOSP', name: 'Apollo Hospitals', price: 6850.00, change: 325.50, changePercent: 5.0 },
  ]

  const losers: GainerLoser[] = [
    { symbol: 'MARUTI', name: 'Maruti Suzuki', price: 11850.00, change: -850.00, changePercent: -6.7 },
    { symbol: 'SBIN', name: 'State Bank of India', price: 850.25, change: -65.75, changePercent: -7.2 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1850.50, change: -120.50, changePercent: -6.1 },
  ]

  const indices = {
    india: [
      { name: 'NIFTY 50', value: 22456.80, change: 128.45, changePercent: 0.57 },
      { name: 'SENSEX', value: 73852.30, change: 412.65, changePercent: 0.56 },
      { name: 'NIFTY Bank', value: 48125.50, change: -156.20, changePercent: -0.32 },
    ],
    global: [
      { name: 'S&P 500', value: 5234.18, change: 45.28, changePercent: 0.87 },
      { name: 'NASDAQ', value: 16428.82, change: 152.65, changePercent: 0.94 },
      { name: 'FTSE 100', value: 8124.56, change: 42.35, changePercent: 0.52 },
    ],
  }

  const removeFromWatchlist = (id: string) => {
    setWatchlist(watchlist.filter(item => item.id !== id))
  }

  const autocompleteResults = ['INFY', 'ITC', 'ICICIBANK', 'INDIGO', 'IOC', 'JSWSTEEL', 'JETAIRWAYS', 'JINDALSTEL']
    .filter(s => s.includes(searchQuery.toUpperCase()))
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Search Bar with Autocomplete */}
      <Card>
        <CardHeader>
          <CardTitle>Search Stocks & Crypto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3" />
              <Input
                placeholder="Search stocks, crypto, indices..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Autocomplete Dropdown */}
            {searchQuery && (
              <div className="absolute top-12 left-0 right-0 bg-popover border rounded-lg shadow-lg z-50">
                {autocompleteResults.length > 0 ? (
                  <div className="p-2">
                    {autocompleteResults.map(result => (
                      <button
                        key={result}
                        onClick={() => setSearchQuery('')}
                        className="w-full text-left px-3 py-2 hover:bg-muted rounded text-sm"
                      >
                        {result}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-xs text-muted-foreground">No results found</div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Market Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Market Overview</CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={marketToggle === 'india' ? 'default' : 'outline'}
              onClick={() => setMarketToggle('india')}
            >
              India
            </Button>
            <Button
              size="sm"
              variant={marketToggle === 'global' ? 'default' : 'outline'}
              onClick={() => setMarketToggle('global')}
            >
              Global
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {indices[marketToggle].map(idx => (
              <div key={idx.name} className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <p className="text-sm font-medium text-muted-foreground">{idx.name}</p>
                <p className="text-2xl font-bold mt-2">{idx.value.toLocaleString()}</p>
                <div className={cn('flex items-center gap-1 mt-2 text-sm font-medium', idx.change >= 0 ? 'text-green-500' : 'text-red-500')}>
                  {idx.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {idx.change >= 0 ? '+' : ''}{idx.change.toFixed(2)} ({idx.changePercent.toFixed(2)}%)
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Watchlist with Drag-to-Reorder */}
      <Card>
        <CardHeader>
          <CardTitle>My Watchlist</CardTitle>
          <p className="text-xs text-muted-foreground mt-2">Drag to reorder. Click eye icon to hide.</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 w-8"></th>
                  <th className="text-left p-2">Symbol</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-right p-2">Price</th>
                  <th className="text-right p-2">Change</th>
                  <th className="text-right p-2">Volume</th>
                  <th className="text-center p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {watchlist.map(item => (
                  <tr key={item.id} className="border-b hover:bg-muted">
                    <td className="p-2 cursor-move"><GripVertical className="w-4 h-4 text-muted-foreground" /></td>
                    <td className="p-2 font-bold">{item.symbol}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="text-right p-2">₹{item.price.toFixed(2)}</td>
                    <td className={cn('text-right p-2 font-medium', item.change >= 0 ? 'text-green-500' : 'text-red-500')}>
                      {item.change >= 0 ? '+' : ''}₹{item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
                    </td>
                    <td className="text-right p-2 text-xs text-muted-foreground">{(item.volume / 1000000).toFixed(2)}M</td>
                    <td className="text-center p-2 flex gap-2 justify-center">
                      <button className="text-muted-foreground hover:text-foreground"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => removeFromWatchlist(item.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top Gainers & Losers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gainers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-500">
              <TrendingUp className="w-5 h-5" />
              Top Gainers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {gainers.map(gainer => (
                <div key={gainer.symbol} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted">
                  <div>
                    <p className="font-bold">{gainer.symbol}</p>
                    <p className="text-xs text-muted-foreground">{gainer.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{gainer.price.toFixed(2)}</p>
                    <p className="text-sm font-bold text-green-500">+{gainer.changePercent.toFixed(2)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Losers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-500">
              <TrendingDown className="w-5 h-5" />
              Top Losers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {losers.map(loser => (
                <div key={loser.symbol} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted">
                  <div>
                    <p className="font-bold">{loser.symbol}</p>
                    <p className="text-xs text-muted-foreground">{loser.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{loser.price.toFixed(2)}</p>
                    <p className="text-sm font-bold text-red-500">{loser.changePercent.toFixed(2)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
