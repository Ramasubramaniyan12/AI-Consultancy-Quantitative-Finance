'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Save, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Strategy {
  id: string
  name: string
  conditions: string
  cagr: number
  winRate: number
  maxDrawdown: number
  sharpe: number
}

export function StrategyBuilder() {
  const [strategies, setStrategies] = useState<Strategy[]>([
    {
      id: '1',
      name: 'RSI Mean Reversion',
      conditions: 'IF RSI < 30 AND Price > 200 EMA THEN Buy | IF RSI > 70 THEN Sell',
      cagr: 22.5,
      winRate: 58,
      maxDrawdown: -18.3,
      sharpe: 1.85,
    },
    {
      id: '2',
      name: 'MACD Crossover',
      conditions: 'IF MACD > Signal Line AND Close > SMA(50) THEN Buy | IF MACD < Signal Line THEN Sell',
      cagr: 18.9,
      winRate: 54,
      maxDrawdown: -22.1,
      sharpe: 1.42,
    },
  ])

  const [newStrategy, setNewStrategy] = useState({ name: '', conditions: '' })
  const [showForm, setShowForm] = useState(false)

  const addStrategy = () => {
    if (newStrategy.name && newStrategy.conditions) {
      setStrategies([
        ...strategies,
        {
          id: Date.now().toString(),
          name: newStrategy.name,
          conditions: newStrategy.conditions,
          cagr: 15 + Math.random() * 20,
          winRate: 45 + Math.random() * 20,
          maxDrawdown: -30 + Math.random() * 15,
          sharpe: 1 + Math.random() * 2,
        },
      ])
      setNewStrategy({ name: '', conditions: '' })
      setShowForm(false)
    }
  }

  const deleteStrategy = (id: string) => {
    setStrategies(strategies.filter(s => s.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Strategy Template Library */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Strategy Templates</CardTitle>
          <Button size="sm" onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4 mr-2" />
            New Strategy
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {showForm && (
            <div className="p-4 border rounded-lg space-y-4 bg-muted">
              <input
                type="text"
                placeholder="Strategy Name"
                value={newStrategy.name}
                onChange={e => setNewStrategy({ ...newStrategy, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
              />
              <textarea
                placeholder="Define conditions (e.g., IF RSI < 30 AND Price > 200 EMA THEN Buy)"
                value={newStrategy.conditions}
                onChange={e => setNewStrategy({ ...newStrategy, conditions: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background h-20"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={addStrategy}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Strategy
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {strategies.map(strategy => (
              <div key={strategy.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{strategy.name}</h3>
                    <p className="text-xs text-muted-foreground mt-2 font-mono">{strategy.conditions}</p>
                  </div>
                  <button onClick={() => deleteStrategy(strategy.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Backtest Results */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground">CAGR</p>
                    <p className="text-lg font-bold text-green-500">{strategy.cagr.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Win Rate</p>
                    <p className="text-lg font-bold text-blue-500">{strategy.winRate.toFixed(0)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Max Drawdown</p>
                    <p className="text-lg font-bold text-red-500">{strategy.maxDrawdown.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Sharpe Ratio</p>
                    <p className="text-lg font-bold text-purple-500">{strategy.sharpe.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strategy Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {strategies.map(strategy => (
              <div key={strategy.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <p className="font-medium">{strategy.name}</p>
                  <p className={cn('font-bold', strategy.cagr >= 20 ? 'text-green-500' : 'text-yellow-500')}>
                    {strategy.cagr.toFixed(1)}% CAGR
                  </p>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.min(strategy.cagr, 50) / 0.5}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Condition Builder Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Condition Builder Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="font-medium text-sm">Available Indicators</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 text-xs">
              {['RSI', 'MACD', 'EMA', 'SMA', 'Bollinger Bands', 'Stochastic', 'ATR', 'Volume', 'Price'].map(ind => (
                <div key={ind} className="px-2 py-1 bg-muted rounded">
                  {ind}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-medium text-sm">Example Conditions</p>
            <code className="text-xs bg-muted p-2 rounded block mt-2 whitespace-pre-wrap break-words">
              IF RSI {'<'} 30 AND Close {'>'} SMA(200) THEN Buy{'\n'}IF RSI {'>'} 70 THEN Sell
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
