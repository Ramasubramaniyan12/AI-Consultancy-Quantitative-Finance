"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  Search,
  TrendingUp,
  TrendingDown,
  Star,
  ExternalLink,
} from "lucide-react"
import { Area, AreaChart } from "recharts"
import { useFetch } from "@/hooks/useFetch"
import { coinGeckoMarketsUrl, formatCurrencyInr, formatNumberCompact } from "@/lib/api"

interface Crypto {
  symbol: string
  name: string
  price: number
  change24h: number
  change7d: number
  marketCap: string
  marketCapValue?: number
  volume24h: string
  volume24hValue?: number
  supply: string
  chartData: { value: number }[]
}

function generateChartData(trend: number) {
  const data = []
  let value = 100
  for (let i = 0; i < 24; i++) {
    value = value + (Math.random() - 0.5 + trend * 0.02) * 3
    data.push({ value: Math.max(value, 80) })
  }
  return data
}

const fallbackCryptoData: Crypto[] = [
  { symbol: "BTC", name: "Bitcoin", price: 5842500, change24h: 3.28, change7d: 8.52, marketCap: "₹114.5L Cr", volume24h: "₹2.1L Cr", supply: "19.6M BTC", chartData: generateChartData(3.28) },
  { symbol: "ETH", name: "Ethereum", price: 312450, change24h: -1.43, change7d: 5.24, marketCap: "₹37.5L Cr", volume24h: "₹98,500 Cr", supply: "120.2M ETH", chartData: generateChartData(-1.43) },
  { symbol: "BNB", name: "BNB", price: 52450, change24h: 2.15, change7d: 4.85, marketCap: "₹8.1L Cr", volume24h: "₹12,400 Cr", supply: "153.8M BNB", chartData: generateChartData(2.15) },
  { symbol: "SOL", name: "Solana", price: 14850, change24h: 5.42, change7d: 12.85, marketCap: "₹6.8L Cr", volume24h: "₹18,200 Cr", supply: "458.5M SOL", chartData: generateChartData(5.42) },
  { symbol: "XRP", name: "XRP", price: 52.45, change24h: -0.85, change7d: 2.14, marketCap: "₹2.9L Cr", volume24h: "₹8,500 Cr", supply: "55.4B XRP", chartData: generateChartData(-0.85) },
  { symbol: "ADA", name: "Cardano", price: 48.25, change24h: 1.24, change7d: -2.45, marketCap: "₹1.7L Cr", volume24h: "₹3,200 Cr", supply: "35.4B ADA", chartData: generateChartData(1.24) },
  { symbol: "DOGE", name: "Dogecoin", price: 12.85, change24h: 8.52, change7d: 15.24, marketCap: "₹1.9L Cr", volume24h: "₹8,500 Cr", supply: "143.5B DOGE", chartData: generateChartData(8.52) },
  { symbol: "MATIC", name: "Polygon", price: 82.45, change24h: -2.85, change7d: -5.42, marketCap: "₹82,500 Cr", volume24h: "₹4,200 Cr", supply: "10B MATIC", chartData: generateChartData(-2.85) },
]

export default function CryptoPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [watchlist, setWatchlist] = React.useState<string[]>(["BTC", "ETH"])

  const { data: liveCryptoData, error: cryptoError, isLoading: cryptoLoading } = useFetch<Crypto[]>(
    async () => {
      const response = await fetch(coinGeckoMarketsUrl(50, 1), { cache: "no-store" })
      if (!response.ok) {
        throw new Error("Failed to fetch crypto markets")
      }
      const payload = await response.json()
      return payload.map((item: any) => ({
        symbol: String(item.symbol || "").toUpperCase(),
        name: String(item.name || ""),
        price: Number(item.current_price ?? 0),
        change24h: Number(item.price_change_percentage_24h ?? 0),
        change7d: Number(item.price_change_percentage_7d_in_currency ?? 0),
        marketCapValue: Number(item.market_cap ?? 0),
        marketCap: formatCurrencyInr(Number(item.market_cap ?? 0)),
        volume24hValue: Number(item.total_volume ?? 0),
        volume24h: formatCurrencyInr(Number(item.total_volume ?? 0)),
        supply: item.circulating_supply ? `${Number(item.circulating_supply).toLocaleString("en-IN")} ${String(item.symbol).toUpperCase()}` : "N/A",
        chartData: Array.isArray(item.sparkline_in_7d?.price)
          ? item.sparkline_in_7d.price.map((value: number) => ({ value: Number(value) }))
          : generateChartData(Number(item.price_change_percentage_24h ?? 0)),
      }))
    },
    [],
    300000
  )

  const liveCrypto = liveCryptoData?.length ? liveCryptoData : fallbackCryptoData
  const displayCrypto = liveCrypto
  const filteredCrypto = displayCrypto.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalMarketCap = displayCrypto.reduce((sum, crypto) => {
    return sum + (crypto.marketCapValue ?? Number(crypto.marketCap.replace(/[^0-9.-]+/g, "")))
  }, 0)
  const totalVolume = displayCrypto.reduce((sum, crypto) => {
    return sum + (crypto.volume24hValue ?? Number(crypto.volume24h.replace(/[^0-9.-]+/g, "")))
  }, 0)
  const btcDominance = displayCrypto.length
    ? ((displayCrypto[0].marketCapValue ?? 0) / (totalMarketCap || 1)) * 100
    : 0
  const activeCoins = displayCrypto.length
  const showCryptoWarning = cryptoError && !liveCryptoData?.length

  const toggleWatchlist = (symbol: string) => {
    setWatchlist((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol]
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Cryptocurrency</h1>
          <p className="text-muted-foreground mt-1">
            Track top cryptocurrencies by market cap
          </p>
        </div>
        <Badge variant="outline" className="w-fit">
          Prices in INR
        </Badge>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground">Total Market Cap</p>
            <p className="text-xl font-bold">{formatCurrencyInr(totalMarketCap)}</p>
            <p className="text-xs text-gain">{totalMarketCap > 0 ? "+1.23%" : "-"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground">24h Volume</p>
            <p className="text-xl font-bold">{formatCurrencyInr(totalVolume)}</p>
            <p className="text-xs text-loss">{totalVolume > 0 ? "-" : ""}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground">BTC Dominance</p>
            <p className="text-xl font-bold">{btcDominance.toFixed(2)}%</p>
            <p className="text-xs text-gain">{btcDominance > 0 ? "+0.00%" : "-"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground">Active Coins</p>
            <p className="text-xl font-bold">{activeCoins}</p>
            <p className="text-xs text-muted-foreground">+24 today</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search cryptocurrencies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 max-w-md"
        />
      </div>

      {/* Crypto Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left p-4 font-medium text-sm w-10">#</th>
                  <th className="text-left p-4 font-medium text-sm">Name</th>
                  <th className="text-right p-4 font-medium text-sm">Price</th>
                  <th className="text-right p-4 font-medium text-sm">24h</th>
                  <th className="text-right p-4 font-medium text-sm hidden md:table-cell">7d</th>
                  <th className="text-right p-4 font-medium text-sm hidden lg:table-cell">Market Cap</th>
                  <th className="text-right p-4 font-medium text-sm hidden lg:table-cell">Volume (24h)</th>
                  <th className="p-4 font-medium text-sm hidden md:table-cell w-32">Last 24h</th>
                  <th className="p-4 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filteredCrypto.map((crypto, index) => {
                  const isPositive24h = crypto.change24h >= 0
                  const isPositive7d = crypto.change7d >= 0
                  const isInWatchlist = watchlist.includes(crypto.symbol)

                  return (
                    <tr key={crypto.symbol} className="border-b border-border last:border-0 hover:bg-secondary/30">
                      <td className="p-4 text-sm text-muted-foreground">{index + 1}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold">{crypto.symbol.slice(0, 2)}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{crypto.name}</p>
                            <p className="text-xs text-muted-foreground">{crypto.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right font-semibold">
                        {"₹"}{crypto.price.toLocaleString("en-IN")}
                      </td>
                      <td className="p-4 text-right">
                        <div className={cn(
                          "flex items-center justify-end gap-1 font-medium text-sm",
                          isPositive24h ? "text-gain" : "text-loss"
                        )}>
                          {isPositive24h ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {isPositive24h ? "+" : ""}{crypto.change24h.toFixed(2)}%
                        </div>
                      </td>
                      <td className="p-4 text-right hidden md:table-cell">
                        <span className={cn(
                          "font-medium text-sm",
                          isPositive7d ? "text-gain" : "text-loss"
                        )}>
                          {isPositive7d ? "+" : ""}{crypto.change7d.toFixed(2)}%
                        </span>
                      </td>
                      <td className="p-4 text-right hidden lg:table-cell text-sm text-muted-foreground">
                        {crypto.marketCap}
                      </td>
                      <td className="p-4 text-right hidden lg:table-cell text-sm text-muted-foreground">
                        {crypto.volume24h}
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <AreaChart width={112} height={40} data={crypto.chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id={`gradient-${crypto.symbol}`} x1="0" y1="0" x2="0" y2="1">
                              <stop 
                                offset="5%" 
                                stopColor={isPositive24h ? "oklch(0.55 0.18 145)" : "oklch(0.55 0.22 25)"} 
                                stopOpacity={0.3} 
                              />
                              <stop 
                                offset="95%" 
                                stopColor={isPositive24h ? "oklch(0.55 0.18 145)" : "oklch(0.55 0.22 25)"} 
                                stopOpacity={0} 
                              />
                            </linearGradient>
                          </defs>
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke={isPositive24h ? "oklch(0.55 0.18 145)" : "oklch(0.55 0.22 25)"}
                            strokeWidth={1.5}
                            fill={`url(#gradient-${crypto.symbol})`}
                          />
                        </AreaChart>
                      </td>
                      <td className="p-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => toggleWatchlist(crypto.symbol)}
                        >
                          <Star className={cn(
                            "h-4 w-4",
                            isInWatchlist && "fill-yellow-500 text-yellow-500"
                          )} />
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground mt-6 text-center">
        Cryptocurrency prices are highly volatile. Past performance does not guarantee future results.
        <a href="#" className="inline-flex items-center gap-1 ml-1 text-primary hover:underline">
          Learn more <ExternalLink className="h-3 w-3" />
        </a>
      </p>
    </div>
  )
}
