"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import {
  Filter,
  Play,
  Save,
  Trash2,
  Plus,
  TrendingUp,
  TrendingDown,
  Sparkles,
  RotateCcw,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

interface FilterCondition {
  id: string
  field: string
  operator: string
  value: number | string
}

interface PresetScreen {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  conditions: FilterCondition[]
  results: number
}

const presetScreens: PresetScreen[] = [
  {
    id: "undervalued",
    name: "Undervalued Stocks",
    description: "Low P/E with strong fundamentals",
    icon: <TrendingUp className="h-5 w-5 text-gain" />,
    conditions: [
      { id: "1", field: "pe", operator: "<", value: 15 },
      { id: "2", field: "roe", operator: ">", value: 15 },
    ],
    results: 42,
  },
  {
    id: "highgrowth",
    name: "High Growth Companies",
    description: "Strong revenue and profit growth",
    icon: <Sparkles className="h-5 w-5 text-chart-4" />,
    conditions: [
      { id: "1", field: "revenue_growth", operator: ">", value: 20 },
      { id: "2", field: "profit_growth", operator: ">", value: 15 },
    ],
    results: 28,
  },
  {
    id: "dividend",
    name: "Dividend Champions",
    description: "High dividend yield stocks",
    icon: <TrendingUp className="h-5 w-5 text-chart-3" />,
    conditions: [
      { id: "1", field: "dividend_yield", operator: ">", value: 3 },
      { id: "2", field: "payout_ratio", operator: "<", value: 60 },
    ],
    results: 35,
  },
  {
    id: "momentum",
    name: "Momentum Stocks",
    description: "Strong price momentum",
    icon: <TrendingUp className="h-5 w-5 text-gain" />,
    conditions: [
      { id: "1", field: "return_1m", operator: ">", value: 10 },
      { id: "2", field: "return_3m", operator: ">", value: 20 },
    ],
    results: 19,
  },
  {
    id: "bluechip",
    name: "Blue Chip Stocks",
    description: "Large cap, stable companies",
    icon: <Sparkles className="h-5 w-5 text-chart-3" />,
    conditions: [
      { id: "1", field: "market_cap", operator: ">", value: 50000 },
      { id: "2", field: "debt_equity", operator: "<", value: 0.5 },
    ],
    results: 52,
  },
  {
    id: "smallcap",
    name: "Small Cap Gems",
    description: "Hidden small cap opportunities",
    icon: <TrendingUp className="h-5 w-5 text-chart-4" />,
    conditions: [
      { id: "1", field: "market_cap", operator: "<", value: 5000 },
      { id: "2", field: "roe", operator: ">", value: 20 },
    ],
    results: 67,
  },
]

const filterFields = [
  { value: "pe", label: "P/E Ratio" },
  { value: "pb", label: "P/B Ratio" },
  { value: "roe", label: "ROE (%)" },
  { value: "roce", label: "ROCE (%)" },
  { value: "debt_equity", label: "Debt/Equity" },
  { value: "dividend_yield", label: "Dividend Yield (%)" },
  { value: "market_cap", label: "Market Cap (Cr)" },
  { value: "revenue_growth", label: "Revenue Growth (%)" },
  { value: "profit_growth", label: "Profit Growth (%)" },
  { value: "return_1m", label: "1M Returns (%)" },
  { value: "return_3m", label: "3M Returns (%)" },
  { value: "return_1y", label: "1Y Returns (%)" },
  { value: "eps", label: "EPS" },
  { value: "book_value", label: "Book Value" },
]

const operators = [
  { value: "<", label: "Less than" },
  { value: "<=", label: "Less than or equal" },
  { value: "=", label: "Equal to" },
  { value: ">=", label: "Greater than or equal" },
  { value: ">", label: "Greater than" },
]

// Sample results
const sampleResults = [
  { symbol: "COALINDIA", name: "Coal India Ltd", price: 428.50, change: 2.15, pe: 8.2, roe: 52.4, marketCap: "₹2.6L Cr" },
  { symbol: "ONGC", name: "Oil & Natural Gas Corp", price: 275.80, change: -0.85, pe: 7.5, roe: 18.2, marketCap: "₹3.5L Cr" },
  { symbol: "POWERGRID", name: "Power Grid Corp", price: 312.45, change: 1.42, pe: 12.8, roe: 21.5, marketCap: "₹2.9L Cr" },
  { symbol: "NTPC", name: "NTPC Ltd", price: 385.20, change: 0.95, pe: 14.2, roe: 12.8, marketCap: "₹3.7L Cr" },
  { symbol: "VEDL", name: "Vedanta Ltd", price: 425.60, change: -1.25, pe: 6.8, roe: 28.5, marketCap: "₹1.6L Cr" },
]

export default function ScreenerPage() {
  const [conditions, setConditions] = React.useState<FilterCondition[]>([
    { id: "1", field: "pe", operator: "<", value: 20 },
    { id: "2", field: "roe", operator: ">", value: 15 },
  ])
  const [showResults, setShowResults] = React.useState(false)
  const [showAdvanced, setShowAdvanced] = React.useState(true)

  const addCondition = () => {
    const newId = String(Date.now())
    setConditions([...conditions, { id: newId, field: "pe", operator: ">", value: 0 }])
  }

  const removeCondition = (id: string) => {
    setConditions(conditions.filter((c) => c.id !== id))
  }

  const updateCondition = (id: string, updates: Partial<FilterCondition>) => {
    setConditions(conditions.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }

  const runScreen = () => {
    setShowResults(true)
  }

  const loadPreset = (preset: PresetScreen) => {
    setConditions(preset.conditions)
    setShowResults(true)
  }

  const resetFilters = () => {
    setConditions([])
    setShowResults(false)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Filter className="h-6 w-6" />
          Stock Screener
        </h1>
        <p className="text-muted-foreground mt-1">
          Build custom filters to find stocks matching your criteria
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Filters */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pre-built Screens */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pre-built Screens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {presetScreens.map((preset) => (
                  <button
                    key={preset.id}
                    className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-secondary/30 transition-colors text-left"
                    onClick={() => loadPreset(preset)}
                  >
                    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      {preset.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-sm">{preset.name}</span>
                        <Badge variant="secondary" className="text-[10px]">
                          {preset.results} stocks
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{preset.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Custom Filter Builder */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Custom Filter Builder</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="advanced" className="text-sm text-muted-foreground">
                  Advanced
                </Label>
                <Switch
                  id="advanced"
                  checked={showAdvanced}
                  onCheckedChange={setShowAdvanced}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filter Conditions */}
              {conditions.map((condition, index) => (
                <div key={condition.id} className="flex items-center gap-2 flex-wrap">
                  {index > 0 && (
                    <Badge variant="outline" className="text-xs">
                      AND
                    </Badge>
                  )}
                  <Select
                    value={condition.field}
                    onValueChange={(value) => updateCondition(condition.id, { field: value })}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {filterFields.map((field) => (
                        <SelectItem key={field.value} value={field.value}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={condition.operator}
                    onValueChange={(value) => updateCondition(condition.id, { operator: value })}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {operators.map((op) => (
                        <SelectItem key={op.value} value={op.value}>
                          {op.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    type="number"
                    value={condition.value}
                    onChange={(e) => updateCondition(condition.id, { value: Number(e.target.value) })}
                    className="w-[100px]"
                  />

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-loss"
                    onClick={() => removeCondition(condition.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {/* Add Condition Button */}
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={addCondition}
              >
                <Plus className="h-4 w-4" />
                Add Condition
              </Button>

              {/* Advanced Sliders */}
              {showAdvanced && (
                <div className="pt-4 border-t border-border space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">P/E Ratio Range</Label>
                        <span className="text-sm text-muted-foreground">0 - 50</span>
                      </div>
                      <Slider defaultValue={[0, 50]} max={100} step={1} />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">ROE Range (%)</Label>
                        <span className="text-sm text-muted-foreground">10 - 40</span>
                      </div>
                      <Slider defaultValue={[10, 40]} max={100} step={1} />
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-4">
                <Button className="gap-2" onClick={runScreen}>
                  <Play className="h-4 w-4" />
                  Run Screen
                </Button>
                <Button variant="outline" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Screen
                </Button>
                <Button variant="ghost" className="gap-2" onClick={resetFilters}>
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {showResults && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Results ({sampleResults.length} stocks found)</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/stocks">View All</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {sampleResults.map((stock) => (
                    <Link
                      key={stock.symbol}
                      href={`/stocks/${stock.symbol.toLowerCase()}`}
                      className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                          <span className="text-xs font-bold">{stock.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{stock.symbol}</p>
                          <p className="text-xs text-muted-foreground">{stock.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-muted-foreground">P/E</p>
                          <p className="font-medium text-sm">{stock.pe}</p>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-muted-foreground">ROE</p>
                          <p className="font-medium text-sm">{stock.roe}%</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{"₹"}{stock.price.toLocaleString("en-IN")}</p>
                          <div className={cn(
                            "flex items-center justify-end gap-0.5 text-xs font-medium",
                            stock.change >= 0 ? "text-gain" : "text-loss"
                          )}>
                            {stock.change >= 0 ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)}%
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Saved Screens */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Saved Screens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="p-3 rounded-lg border border-border hover:border-primary/30 cursor-pointer transition-colors">
                  <p className="font-medium text-sm">My Value Picks</p>
                  <p className="text-xs text-muted-foreground mt-0.5">3 conditions • 24 results</p>
                </div>
                <div className="p-3 rounded-lg border border-border hover:border-primary/30 cursor-pointer transition-colors">
                  <p className="font-medium text-sm">Growth Portfolio</p>
                  <p className="text-xs text-muted-foreground mt-0.5">5 conditions • 18 results</p>
                </div>
                <div className="p-3 rounded-lg border border-border hover:border-primary/30 cursor-pointer transition-colors">
                  <p className="font-medium text-sm">Dividend Income</p>
                  <p className="text-xs text-muted-foreground mt-0.5">4 conditions • 31 results</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">P/E Ratio:</strong> Lower P/E may indicate undervaluation. Industry average varies.
              </p>
              <p>
                <strong className="text-foreground">ROE:</strong> Higher ROE indicates efficient use of shareholder equity. Look for {">"} 15%.
              </p>
              <p>
                <strong className="text-foreground">Debt/Equity:</strong> Lower is generally better. {"<"} 1 is considered healthy.
              </p>
              <p>
                <strong className="text-foreground">Dividend Yield:</strong> Higher yield means more income, but verify sustainability.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
