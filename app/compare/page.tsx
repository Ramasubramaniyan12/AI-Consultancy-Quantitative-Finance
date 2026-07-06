"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  TrendingUp,
  TrendingDown,
  Plus,
  X,
  Search,
  BarChart3,
  ArrowRight,
} from "lucide-react"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts"

interface Asset {
  symbol: string
  name: string
  type: "stock" | "mutualfund" | "etf"
  price: number
  change: number
  changePercent: number
  marketCap: string
  pe: number
  return1Y: number
  return3Y: number
  return5Y: number
  risk: string
  rating: number
  expenseRatio?: number
}

const allAssets: Asset[] = [
  { symbol: "RELIANCE", name: "Reliance Industries Ltd", type: "stock", price: 2847.50, change: 35.20, changePercent: 1.24, marketCap: "₹19.2L Cr", pe: 28.5, return1Y: 18.5, return3Y: 45.2, return5Y: 85.4, risk: "Moderate", rating: 4 },
  { symbol: "TCS", name: "Tata Consultancy Services", type: "stock", price: 4125.80, change: -23.40, changePercent: -0.56, marketCap: "₹15.1L Cr", pe: 32.1, return1Y: 12.3, return3Y: 38.7, return5Y: 95.2, risk: "Low", rating: 5 },
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd", type: "stock", price: 1678.25, change: 14.85, changePercent: 0.89, marketCap: "₹12.8L Cr", pe: 22.4, return1Y: 8.2, return3Y: 25.6, return5Y: 62.8, risk: "Low", rating: 4 },
  { symbol: "INFY", name: "Infosys Ltd", type: "stock", price: 1542.60, change: -17.45, changePercent: -1.12, marketCap: "₹6.4L Cr", pe: 25.8, return1Y: -5.2, return3Y: 22.1, return5Y: 78.5, risk: "Moderate", rating: 4 },
  { symbol: "NIFTYBEES", name: "Nippon Nifty 50 ETF", type: "etf", price: 265.50, change: 2.85, changePercent: 1.08, marketCap: "₹45,000 Cr", pe: 24.2, return1Y: 15.8, return3Y: 42.5, return5Y: 78.2, risk: "Moderate", rating: 5, expenseRatio: 0.05 },
  { symbol: "HDFC-MF", name: "HDFC Flexi Cap Fund", type: "mutualfund", price: 1425.60, change: 12.45, changePercent: 0.88, marketCap: "₹52,000 Cr", pe: 26.8, return1Y: 22.4, return3Y: 48.2, return5Y: 92.5, risk: "High", rating: 4, expenseRatio: 1.65 },
]

const generateCompareChartData = (assets: Asset[]) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return months.map((month, i) => {
    const data: Record<string, string | number> = { month }
    assets.forEach((asset) => {
      const baseReturn = asset.return1Y / 12
      const variance = (Math.random() - 0.5) * 5
      data[asset.symbol] = ((baseReturn * (i + 1)) + variance).toFixed(2)
    })
    return data
  })
}

const colors = ["oklch(0.55 0.18 145)", "oklch(0.55 0.15 250)", "oklch(0.65 0.18 85)", "oklch(0.55 0.22 25)"]

export default function ComparePage() {
  const searchParams = useSearchParams()
  const [selectedAssets, setSelectedAssets] = React.useState<Asset[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showSearch, setShowSearch] = React.useState(false)

  React.useEffect(() => {
    const assetsParam = searchParams.get("assets")
    if (assetsParam) {
      const symbols = assetsParam.split(",")
      const found = allAssets.filter((a) => symbols.includes(a.symbol))
      setSelectedAssets(found)
    }
  }, [searchParams])

  const filteredAssets = allAssets.filter(
    (asset) =>
      !selectedAssets.find((s) => s.symbol === asset.symbol) &&
      (asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const addAsset = (asset: Asset) => {
    if (selectedAssets.length < 4) {
      setSelectedAssets([...selectedAssets, asset])
      setSearchQuery("")
      setShowSearch(false)
    }
  }

  const removeAsset = (symbol: string) => {
    setSelectedAssets(selectedAssets.filter((a) => a.symbol !== symbol))
  }

  const chartData = React.useMemo(() => generateCompareChartData(selectedAssets), [selectedAssets])

  const comparisonMetrics = [
    { key: "price", label: "Current Price", format: (v: number) => `₹${v.toLocaleString("en-IN")}` },
    { key: "changePercent", label: "Today's Change", format: (v: number) => `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`, isChange: true },
    { key: "marketCap", label: "Market Cap", format: (v: string) => v },
    { key: "pe", label: "P/E Ratio", format: (v: number) => v.toFixed(2) },
    { key: "return1Y", label: "1Y Returns", format: (v: number) => `${v >= 0 ? "+" : ""}${v.toFixed(1)}%`, isReturn: true },
    { key: "return3Y", label: "3Y Returns", format: (v: number) => `${v >= 0 ? "+" : ""}${v.toFixed(1)}%`, isReturn: true },
    { key: "return5Y", label: "5Y Returns", format: (v: number) => `${v >= 0 ? "+" : ""}${v.toFixed(1)}%`, isReturn: true },
    { key: "risk", label: "Risk Level", format: (v: string) => v },
    { key: "rating", label: "Rating", format: (v: number) => "★".repeat(v) + "☆".repeat(5 - v) },
    { key: "expenseRatio", label: "Expense Ratio", format: (v?: number) => v ? `${v.toFixed(2)}%` : "N/A" },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          Compare Investments
        </h1>
        <p className="text-muted-foreground mt-1">
          Compare stocks, mutual funds, and ETFs side by side
        </p>
      </div>

      {/* Selected Assets */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {selectedAssets.map((asset, index) => (
          <Card key={asset.symbol} className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6"
              onClick={() => removeAsset(asset.symbol)}
            >
              <X className="h-4 w-4" />
            </Button>
            <CardContent className="pt-6 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: colors[index] }}
                />
                <Badge variant="secondary" className="text-[10px]">
                  {asset.type === "stock" ? "Stock" : asset.type === "etf" ? "ETF" : "MF"}
                </Badge>
              </div>
              <p className="font-semibold">{asset.symbol}</p>
              <p className="text-xs text-muted-foreground truncate">{asset.name}</p>
              <p className="text-lg font-bold mt-2">{"₹"}{asset.price.toLocaleString("en-IN")}</p>
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium",
                asset.changePercent >= 0 ? "text-gain" : "text-loss"
              )}>
                {asset.changePercent >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {asset.changePercent >= 0 ? "+" : ""}{asset.changePercent.toFixed(2)}%
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add Asset Button */}
        {selectedAssets.length < 4 && (
          <Card
            className="border-dashed cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => setShowSearch(true)}
          >
            <CardContent className="h-full flex flex-col items-center justify-center py-8">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center mb-2">
                <Plus className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Add to compare</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Search Modal/Dropdown */}
      {showSearch && (
        <Card className="mb-6">
          <CardContent className="pt-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search stocks, mutual funds, ETFs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>
            <div className="max-h-64 overflow-y-auto space-y-1">
              {filteredAssets.slice(0, 10).map((asset) => (
                <button
                  key={asset.symbol}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors text-left"
                  onClick={() => addAsset(asset)}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center">
                      <span className="text-xs font-bold">{asset.symbol.slice(0, 2)}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{asset.symbol}</span>
                        <Badge variant="outline" className="text-[10px]">
                          {asset.type === "stock" ? "Stock" : asset.type === "etf" ? "ETF" : "MF"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{asset.name}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-2"
              onClick={() => setShowSearch(false)}
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Comparison Content */}
      {selectedAssets.length >= 2 ? (
        <div className="space-y-6">
          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Comparison (1Y)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height={288} minWidth={0}>
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0 0)" vertical={false} />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "oklch(0.45 0 0)" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "oklch(0.45 0 0)" }}
                      tickFormatter={(v) => `${v}%`}
                      width={50}
                    />
                    <Tooltip
                      formatter={(value: number, name: string) => [`${value}%`, name]}
                      contentStyle={{
                        backgroundColor: "oklch(1 0 0)",
                        border: "1px solid oklch(0.9 0 0)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Legend />
                    {selectedAssets.map((asset, index) => (
                      <Line
                        key={asset.symbol}
                        type="monotone"
                        dataKey={asset.symbol}
                        stroke={colors[index]}
                        strokeWidth={2}
                        dot={false}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Side-by-Side Comparison</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="text-left p-4 font-medium text-sm">Metric</th>
                      {selectedAssets.map((asset, index) => (
                        <th key={asset.symbol} className="text-right p-4 font-medium text-sm">
                          <div className="flex items-center justify-end gap-2">
                            <div
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: colors[index] }}
                            />
                            {asset.symbol}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonMetrics.map((metric) => (
                      <tr key={metric.key} className="border-b border-border last:border-0">
                        <td className="p-4 text-sm text-muted-foreground">{metric.label}</td>
                        {selectedAssets.map((asset) => {
                          const value = asset[metric.key as keyof Asset]
                          const formatted = metric.format(value as never)
                          const isPositive = typeof value === "number" && value >= 0

                          return (
                            <td
                              key={asset.symbol}
                              className={cn(
                                "text-right p-4 text-sm font-medium",
                                (metric.isChange || metric.isReturn) && (
                                  isPositive ? "text-gain" : "text-loss"
                                )
                              )}
                            >
                              {formatted}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 text-center">
            <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Add assets to compare</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Select at least 2 investments to see a detailed side-by-side comparison of their performance, metrics, and risk levels.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
