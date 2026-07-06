'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Upload, Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Holding {
  id: string
  symbol: string
  quantity: number
  buyPrice: number
  currentPrice: number
  assetClass: 'Stocks' | 'Mutual Funds' | 'Bonds' | 'ETFs' | 'Cryptocurrency' | 'Commodities'
}

export function PortfolioAnalysis() {
  const [holdings, setHoldings] = useState<Holding[]>([
    { id: '1', symbol: 'INFY', quantity: 50, buyPrice: 1200, currentPrice: 1450, assetClass: 'Stocks' },
    { id: '2', symbol: 'BTC', quantity: 0.5, buyPrice: 35000, currentPrice: 97450, assetClass: 'Cryptocurrency' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newHolding, setNewHolding] = useState<Partial<Holding>>({})

  const addHolding = () => {
    if (newHolding.symbol && newHolding.quantity && newHolding.buyPrice && newHolding.currentPrice && newHolding.assetClass) {
      setHoldings([...holdings, { id: Date.now().toString(), ...newHolding as Holding }])
      setNewHolding({})
      setShowForm(false)
    }
  }

  const removeHolding = (id: string) => {
    setHoldings(holdings.filter(h => h.id !== id))
  }

  const calculatePnL = (holding: Holding) => {
    return (holding.currentPrice - holding.buyPrice) * holding.quantity
  }

  const calculateReturn = (holding: Holding) => {
    return ((holding.currentPrice - holding.buyPrice) / holding.buyPrice) * 100
  }

  const totalValue = holdings.reduce((sum, h) => sum + (h.currentPrice * h.quantity), 0)
  const totalCost = holdings.reduce((sum, h) => sum + (h.buyPrice * h.quantity), 0)
  const totalPnL = totalValue - totalCost
  const totalReturn = ((totalValue - totalCost) / totalCost) * 100

  const assetClassBreakdown = holdings.reduce((acc, h) => {
    const existing = acc.find(a => a.assetClass === h.assetClass)
    if (existing) {
      existing.value += h.currentPrice * h.quantity
    } else {
      acc.push({ assetClass: h.assetClass, value: h.currentPrice * h.quantity })
    }
    return acc
  }, [] as Array<{ assetClass: string; value: number }>)

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold">₹{totalValue.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Cost</p>
              <p className="text-2xl font-bold">₹{totalCost.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total P&L</p>
              <p className={cn('text-2xl font-bold', totalPnL >= 0 ? 'text-green-500' : 'text-red-500')}>
                ₹{totalPnL.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Return</p>
              <p className={cn('text-2xl font-bold', totalReturn >= 0 ? 'text-green-500' : 'text-red-500')}>
                {totalReturn.toFixed(2)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Holdings Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Holdings</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Holding
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Import CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showForm && (
            <div className="mb-4 p-4 border rounded-lg space-y-4 bg-muted">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Symbol" value={newHolding.symbol || ''} onChange={e => setNewHolding({ ...newHolding, symbol: e.target.value })} />
                <select className="px-3 py-2 border rounded-md bg-background" onChange={e => setNewHolding({ ...newHolding, assetClass: e.target.value as any })}>
                  <option>Select Asset Class</option>
                  <option>Stocks</option>
                  <option>Mutual Funds</option>
                  <option>Bonds</option>
                  <option>ETFs</option>
                  <option>Cryptocurrency</option>
                  <option>Commodities</option>
                </select>
                <Input type="number" placeholder="Quantity" value={newHolding.quantity || ''} onChange={e => setNewHolding({ ...newHolding, quantity: parseFloat(e.target.value) })} />
                <Input type="number" placeholder="Buy Price" value={newHolding.buyPrice || ''} onChange={e => setNewHolding({ ...newHolding, buyPrice: parseFloat(e.target.value) })} />
                <Input type="number" placeholder="Current Price" value={newHolding.currentPrice || ''} onChange={e => setNewHolding({ ...newHolding, currentPrice: parseFloat(e.target.value) })} />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={addHolding}>Save Holding</Button>
                <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Symbol</th>
                  <th className="text-left p-2">Asset Class</th>
                  <th className="text-right p-2">Qty</th>
                  <th className="text-right p-2">Buy Price</th>
                  <th className="text-right p-2">Current Price</th>
                  <th className="text-right p-2">Value</th>
                  <th className="text-right p-2">P&L</th>
                  <th className="text-right p-2">Return %</th>
                  <th className="text-center p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map(h => {
                  const pnl = calculatePnL(h)
                  const ret = calculateReturn(h)
                  return (
                    <tr key={h.id} className="border-b hover:bg-muted">
                      <td className="p-2 font-medium">{h.symbol}</td>
                      <td className="p-2"><Badge variant="secondary">{h.assetClass}</Badge></td>
                      <td className="text-right p-2">{h.quantity}</td>
                      <td className="text-right p-2">₹{h.buyPrice.toFixed(2)}</td>
                      <td className="text-right p-2">₹{h.currentPrice.toFixed(2)}</td>
                      <td className="text-right p-2 font-medium">₹{(h.currentPrice * h.quantity).toFixed(2)}</td>
                      <td className={cn('text-right p-2 font-medium', pnl >= 0 ? 'text-green-500' : 'text-red-500')}>
                        {pnl >= 0 ? <TrendingUp className="inline w-4 h-4 mr-1" /> : <TrendingDown className="inline w-4 h-4 mr-1" />}
                        ₹{pnl.toFixed(2)}
                      </td>
                      <td className={cn('text-right p-2 font-medium', ret >= 0 ? 'text-green-500' : 'text-red-500')}>
                        {ret.toFixed(2)}%
                      </td>
                      <td className="text-center p-2">
                        <button onClick={() => removeHolding(h.id)} className="text-red-500 hover:text-red-700">
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Asset Class Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Asset Class Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assetClassBreakdown.map(ac => (
              <div key={ac.assetClass} className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm font-medium">{ac.assetClass}</p>
                  <div className="w-full bg-muted rounded-full h-2 mt-1">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(ac.value / totalValue) * 100}%` }} />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">₹{ac.value.toFixed(0)}</p>
                  <p className="text-xs text-muted-foreground">{((ac.value / totalValue) * 100).toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
