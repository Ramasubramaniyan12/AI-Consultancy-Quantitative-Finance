"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Globe, Clock } from "lucide-react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import { MarketOverviewBanner } from "@/components/market-overview-banner"
import { MarketGridCard } from "@/components/market-grid-card"
import { MarketHeatmap, type HeatmapTile } from "@/components/market-heatmap"
import { useFetch } from "@/hooks/useFetch"
import { parseYahooIndexQuote, parseYahooQuoteMeta, yahooChartProxyUrl } from "@/lib/api"
import { SkeletonLoader } from "@/components/skeleton-loader"
import * as React from "react"

const indiaIndexConfig = [
  { name: "NIFTY 50", symbol: "^NSEI", value: "22,456.80", change: 128.45, changePercent: 0.57 },
  { name: "SENSEX", symbol: "^BSESN", value: "73,852.30", change: 412.65, changePercent: 0.56 },
  { name: "NIFTY Bank", symbol: "^NSEBANK", value: "48,125.50", change: -156.20, changePercent: -0.32 },
  { name: "NIFTY IT", symbol: "^CNXIT", value: "35,248.70", change: 285.30, changePercent: 0.82 },
  { name: "NIFTY Midcap", symbol: "^NIYMID", value: "48,562.40", change: 425.80, changePercent: 0.88 },
  { name: "NIFTY Smallcap", symbol: "^SMLCAP", value: "15,842.60", change: -124.50, changePercent: -0.78 },
]

const globalIndexConfig = [
  { name: "S&P 500", symbol: "^GSPC", value: "5,234.18", change: 45.28, changePercent: 0.87, market: "US", time: "4:00 PM EST" },
  { name: "NASDAQ", symbol: "^IXIC", value: "16,428.82", change: 152.65, changePercent: 0.94, market: "US", time: "4:00 PM EST" },
  { name: "FTSE 100", symbol: "^FTSE", value: "8,124.56", change: 42.35, changePercent: 0.52, market: "UK", time: "5:00 PM GMT" },
  { name: "NIKKEI 225", symbol: "^N225", value: "38,456.20", change: -245.80, changePercent: -0.64, market: "Japan", time: "3:00 PM JST" },
  { name: "Dow Jones", symbol: "^DJI", value: "33,456.20", change: 120.40, changePercent: 0.36, market: "US", time: "4:00 PM EST" },
  { name: "Hang Seng", symbol: "^HSI", value: "20,156.45", change: -85.30, changePercent: -0.42, market: "Hong Kong", time: "4:00 PM HKT" },
]

const sectorPerformance = [
  { name: "Information Technology", change: 1.24, leaders: ["TCS", "INFY", "WIPRO"] },
  { name: "Banking", change: 0.85, leaders: ["HDFCBANK", "ICICIBANK", "SBIN"] },
  { name: "Energy", change: 0.62, leaders: ["RELIANCE", "ONGC", "BPCL"] },
  { name: "Automobile", change: 2.15, leaders: ["TATAMOTORS", "MARUTI", "M&M"] },
  { name: "Pharmaceuticals", change: -0.45, leaders: ["SUNPHARMA", "DRREDDY", "CIPLA"] },
  { name: "Consumer Goods", change: 0.32, leaders: ["HINDUNILVR", "ITC", "NESTLEIND"] },
  { name: "Metals", change: -1.28, leaders: ["TATASTEEL", "HINDALCO", "JSWSTEEL"] },
  { name: "Telecom", change: 1.85, leaders: ["BHARTIARTL", "IDEA", "RELIANCE"] },
]

const marketGridCards = [
  { name: "NIFTY 50", price: "23,977.95", change: -0.32, sparklineData: generateMiniChartData(-0.32) },
  { name: "USD/INR", price: "94.81", change: 0.11, sparklineData: generateMiniChartData(0.11) },
  { name: "Gold", price: "14,426.84", change: -1.95, sparklineData: generateMiniChartData(-1.95) },
  { name: "NIFTY 100 Largecap", price: "25,008.45", change: -0.42, sparklineData: generateMiniChartData(-0.42) },
  { name: "NIFTY 100 Midcap", price: "61,644.15", change: -0.24, sparklineData: generateMiniChartData(-0.24) },
  { name: "NIFTY 100 Smallcap", price: "18,696.75", change: -0.50, sparklineData: generateMiniChartData(-0.50) },
  { name: "NIFTY Bank", price: "57,836.45", change: -0.59, sparklineData: generateMiniChartData(-0.59) },
  { name: "NIFTY IT", price: "27,035.30", change: -1.08, sparklineData: generateMiniChartData(-1.08) },
  { name: "NIFTY Pharma", price: "25,177.85", change: 0.83, sparklineData: generateMiniChartData(0.83) },
]

// Global indices for heatmap
const globalHeatmapTiles: HeatmapTile[] = [
  { id: "sp500", name: "S&P 500", shortName: "S&P 500", price: "5,847.63", change: 2.45, category: "global", marketCap: 45000000000000 },
  { id: "nasdaq", name: "NASDAQ 100", shortName: "NASDAQ", price: "18,442.55", change: 3.21, category: "global", marketCap: 35000000000000 },
  { id: "ftse", name: "FTSE 100", shortName: "FTSE", price: "8,134.52", change: -0.42, category: "global", marketCap: 3000000000000 },
  { id: "dax", name: "DAX", shortName: "DAX", price: "17,856.23", change: 1.15, category: "global", marketCap: 2500000000000 },
  { id: "nikkei", name: "NIKKEI 225", shortName: "NIKKEI", price: "33,245.67", change: 4.32, category: "global", marketCap: 2000000000000 },
  { id: "hseng", name: "HANG SENG", shortName: "HSI", price: "16,542.35", change: -2.18, category: "global", marketCap: 1800000000000 },
  { id: "shanghai", name: "SHANGHAI", shortName: "SSE", price: "3,125.48", change: 0.58, category: "global", marketCap: 1500000000000 },
  { id: "asx", name: "ASX 200", shortName: "ASX", price: "7,864.52", change: 1.82, category: "global", marketCap: 1200000000000 },
  { id: "tsx", name: "TSX", shortName: "TSX", price: "21,847.63", change: 0.95, category: "global", marketCap: 1000000000000 },
]

// Indian sectors for heatmap
const sectorHeatmapTiles: HeatmapTile[] = [
  { id: "it-sector", name: "IT Sector", shortName: "IT", price: "18,524.50", change: 1.84, category: "sector", marketCap: 15000000000000 },
  { id: "banking-sector", name: "Banking Sector", shortName: "Banking", price: "45,623.12", change: -0.78, category: "sector", marketCap: 14000000000000 },
  { id: "energy-sector", name: "Energy Sector", shortName: "Energy", price: "8,234.55", change: 2.12, category: "sector", marketCap: 3500000000000 },
  { id: "fmcg-sector", name: "FMCG Sector", shortName: "FMCG", price: "6,842.19", change: -0.32, category: "sector", marketCap: 2500000000000 },
  { id: "healthcare", name: "Healthcare", shortName: "Healthcare", price: "12,456.78", change: 3.45, category: "sector", marketCap: 2200000000000 },
  { id: "pharma", name: "Pharma", shortName: "Pharma", price: "14,562.34", change: 1.92, category: "sector", marketCap: 2000000000000 },
  { id: "auto", name: "Auto & EV", shortName: "Auto", price: "7,823.45", change: 0.84, category: "sector", marketCap: 1800000000000 },
  { id: "metals", name: "Metals & Mining", shortName: "Metals", price: "5,642.12", change: -1.23, category: "sector", marketCap: 1500000000000 },
  { id: "realty", name: "Real Estate", shortName: "Realty", price: "4,234.56", change: 5.67, category: "sector", marketCap: 1200000000000 },
  { id: "telecom", name: "Telecom", shortName: "Telecom", price: "3,456.78", change: 2.45, category: "sector", marketCap: 900000000000 },
  { id: "utilities", name: "Utilities", shortName: "Utilities", price: "2,845.62", change: 0.56, category: "sector", marketCap: 800000000000 },
  { id: "durables", name: "Consumer Durables", shortName: "Durables", price: "3,124.78", change: -0.92, category: "sector", marketCap: 700000000000 },
]

// Cryptocurrencies for heatmap
const cryptoHeatmapTiles: HeatmapTile[] = [
  { id: "btc", name: "Bitcoin", shortName: "BTC", price: "$97,450", change: 2.34, category: "crypto", marketCap: 2000000000000 },
  { id: "eth", name: "Ethereum", shortName: "ETH", price: "$3,245", change: 1.82, category: "crypto", marketCap: 400000000000 },
  { id: "bnb", name: "BNB", shortName: "BNB", price: "$652.45", change: -0.56, category: "crypto", marketCap: 100000000000 },
  { id: "xrp", name: "Ripple", shortName: "XRP", price: "$2.85", change: 3.21, category: "crypto", marketCap: 150000000000 },
  { id: "cardano", name: "Cardano", shortName: "ADA", price: "$0.89", change: 1.45, category: "crypto", marketCap: 32000000000 },
  { id: "solana", name: "Solana", shortName: "SOL", price: "$178.23", change: 2.67, category: "crypto", marketCap: 80000000000 },
  { id: "polkadot", name: "Polkadot", shortName: "DOT", price: "$8.42", change: -0.78, category: "crypto", marketCap: 12000000000 },
  { id: "doge", name: "Dogecoin", shortName: "DOGE", price: "$0.34", change: 1.92, category: "crypto", marketCap: 50000000000 },
  { id: "avalanche", name: "Avalanche", shortName: "AVAX", price: "$35.62", change: 4.23, category: "crypto", marketCap: 15000000000 },
]

// Commodities for heatmap
const commodityHeatmapTiles: HeatmapTile[] = [
  { id: "gold", name: "Gold", shortName: "Gold", price: "₹74,850/10g", change: 1.23, category: "commodity", marketCap: 12000000000000 },
  { id: "silver", name: "Silver", shortName: "Silver", price: "₹89,250/kg", change: 2.34, category: "commodity", marketCap: 2000000000000 },
  { id: "crude", name: "Crude Oil", shortName: "Crude", price: "$82.45/bbl", change: -1.82, category: "commodity", marketCap: 5000000000000 },
  { id: "naturalgas", name: "Natural Gas", shortName: "Nat Gas", price: "$3.25/MMBTU", change: -2.34, category: "commodity", marketCap: 1500000000000 },
  { id: "copper", name: "Copper", shortName: "Copper", price: "$9,845/t", change: 0.92, category: "commodity", marketCap: 2000000000000 },
  { id: "aluminium", name: "Aluminium", shortName: "Alum", price: "$2,685/t", change: -0.45, category: "commodity", marketCap: 800000000000 },
  { id: "nickel", name: "Nickel", shortName: "Nickel", price: "$18,650/t", change: 1.56, category: "commodity", marketCap: 500000000000 },
  { id: "platinum", name: "Platinum", shortName: "Plat", price: "$1,045/oz", change: 0.78, category: "commodity", marketCap: 300000000000 },
  { id: "wheat", name: "Wheat", shortName: "Wheat", price: "$625/bu", change: -0.56, category: "commodity", marketCap: 200000000000 },
  { id: "coffee", name: "Coffee", shortName: "Coffee", price: "$2.45/lb", change: 2.12, category: "commodity", marketCap: 150000000000 },
]

// Combine all tiles for "All Markets" view
const allHeatmapTiles: HeatmapTile[] = [
  ...globalHeatmapTiles,
  ...sectorHeatmapTiles,
  ...cryptoHeatmapTiles.slice(0, 3),
  ...commodityHeatmapTiles.slice(0, 3),
]

function generateMiniChartData(trend: number) {
  const data = []
  let value = 100
  for (let i = 0; i < 20; i++) {
    value = value + (Math.random() - 0.5 + trend * 0.1) * 2
    data.push({ value: Math.max(value, 90) })
  }
  return data
}

export default function MarketsPage() {
  const { data: indexQuotes, error: indexError, isLoading: indexLoading } = useFetch(
    async () => {
      const allIndexes = [...indiaIndexConfig, ...globalIndexConfig]
      const results = await Promise.allSettled(
        allIndexes.map(async (index) => {
          const response = await fetch(yahooChartProxyUrl(index.symbol, "1d", "1d"), { cache: "no-store" })
          if (!response.ok) {
            throw new Error(`Failed to fetch ${index.symbol}`)
          }
          const payload = await response.json()
          return parseYahooIndexQuote(payload)
        })
      )

      return results.map((result) =>
        result.status === "fulfilled" ? result.value : null
      )
    },
    [],
    60000
  )

  const indexPartialError = indexQuotes?.some((item) => item === null) ?? false
  const hasLiveIndexData = indexQuotes?.some((item) => item !== null) ?? false

  const indiaIndices = React.useMemo(
    () =>
      indiaIndexConfig.map((index, idx) => {
        const quote = indexQuotes?.[idx]
        return {
          ...index,
          value: quote ? quote.price.toLocaleString("en-IN", { maximumFractionDigits: 2 }) : index.value,
          change: quote?.change ?? index.change,
          changePercent: quote?.changePercent ?? index.changePercent,
          loading: indexLoading,
          data: generateMiniChartData(quote?.changePercent ?? index.changePercent),
        }
      }),
    [indexQuotes, indexLoading]
  )

  const globalIndices = React.useMemo(
    () =>
      globalIndexConfig.map((index, idx) => {
        const quote = indexQuotes?.[indiaIndexConfig.length + idx]
        return {
          ...index,
          value: quote ? quote.price.toLocaleString("en-IN", { maximumFractionDigits: 2 }) : index.value,
          change: quote?.change ?? index.change,
          changePercent: quote?.changePercent ?? index.changePercent,
          loading: indexLoading,
        }
      }),
    [indexQuotes, indexLoading]
  )

  const { data: assetQuotes, error: assetError, isLoading: assetLoading } = useFetch(
    async () => {
      const assetSymbols = ["USDINR=X", "GC=F", "SI=F"]
      const results = await Promise.allSettled(
        assetSymbols.map(async (symbol) => {
          const response = await fetch(yahooChartProxyUrl(symbol, "1d", "1d"), { cache: "no-store" })
          if (!response.ok) {
            throw new Error(`Failed to fetch ${symbol}`)
          }
          const payload = await response.json()
          return parseYahooQuoteMeta(payload)
        })
      )
      return results.map((result) =>
        result.status === "fulfilled" ? result.value : null
      )
    },
    [],
    60000
  )

  const assetData = React.useMemo(() => {
    const [usdInrQuote, goldQuote, silverQuote] = assetQuotes ?? []
    const usdRate = usdInrQuote?.price ?? 94.81

    return {
      usdInr: {
        price: usdRate.toFixed(2),
        change: usdInrQuote?.change ?? 0,
        sparklineData: usdInrQuote ? generateMiniChartData(usdInrQuote.changePercent) : generateMiniChartData(0),
      },
      gold: {
        price: goldQuote ? (goldQuote.price * usdRate).toFixed(2) : "14,426.84",
        change: goldQuote?.change ?? -1.95,
        sparklineData: goldQuote ? generateMiniChartData(goldQuote.changePercent) : generateMiniChartData(-1.95),
      },
      silver: {
        price: silverQuote ? (silverQuote.price * usdRate).toFixed(2) : "89,250.00",
        change: silverQuote?.change ?? 2.34,
        sparklineData: silverQuote ? generateMiniChartData(silverQuote.changePercent) : generateMiniChartData(2.34),
      },
    }
  }, [assetQuotes])

  const marketCards = React.useMemo(
    () =>
      marketGridCards.map((card) => {
        if (card.name === "USD/INR") {
          return {
            ...card,
            price: assetData.usdInr.price,
            change: assetData.usdInr.change,
            sparklineData: assetData.usdInr.sparklineData,
          }
        }
        if (card.name === "Gold") {
          return {
            ...card,
            price: assetData.gold.price,
            change: assetData.gold.change,
            sparklineData: assetData.gold.sparklineData,
          }
        }
        if (card.name === "Silver") {
          return {
            ...card,
            price: assetData.silver.price,
            change: assetData.silver.change,
            sparklineData: assetData.silver.sparklineData,
          }
        }
        return card
      }),
    [assetData]
  )

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <Globe className="h-8 w-8" />
          Market Overview
        </h1>
        <p className="mt-2 flex items-center gap-2" style={{ color: 'var(--text-label)' }}>
          <Clock className="h-4 w-4" />
          Last updated: {new Date().toLocaleTimeString("en-IN")} IST
        </p>
      </div>

      {/* Market Overview Banner */}
      <MarketOverviewBanner />

      {/* Market Heatmap */}
      <div className="mt-8">
        <MarketHeatmap
          allTiles={allHeatmapTiles}
          sectorTiles={sectorHeatmapTiles}
          globalTiles={globalHeatmapTiles}
          cryptoTiles={cryptoHeatmapTiles}
          commodityTiles={commodityHeatmapTiles}
          onTileClick={(tile) => console.log('Clicked tile:', tile.name)}
        />
      </div>

      {/* Market and Sectors Grid */}
      <div className="space-y-4 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Market and sectors</h2>
          <a href="#" className="text-sm font-medium" style={{ color: '#3B82F6' }}>See All</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {marketGridCards.map((card) => (
            <MarketGridCard
              key={card.name}
              name={card.name}
              price={card.price}
              change={card.change}
              sparklineData={card.sparklineData}
              onClick={() => console.log(`Clicked: ${card.name}`)}
              loading={false}
            />
          ))}
        </div>
      </div>

      {/* Detailed Market Analysis */}
      <div>
        <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Detailed Analysis</h2>
      </div>

      <Tabs defaultValue="india" className="space-y-6">
        <TabsList>
          <TabsTrigger value="india">India</TabsTrigger>
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="sectors">Sectors</TabsTrigger>
        </TabsList>

        {/* India Markets */}
        <TabsContent value="india" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {indiaIndices.map((index) => {
              const isPositive = index.changePercent >= 0
              return (
                <Card key={index.name} className="hover:border-primary/20 transition-colors">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground">{index.name}</p>
                        {index.loading ? (
                          <SkeletonLoader className="mt-2 h-8 w-28" />
                        ) : (
                          <p className="text-2xl font-bold mt-1">{index.value}</p>
                        )}
                      </div>
                      <div className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-md text-sm font-medium",
                        isPositive ? "bg-gain/10 text-gain" : "bg-loss/10 text-loss"
                      )}>
                        {isPositive ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {index.loading ? (
                          <SkeletonLoader className="h-5 w-16" />
                        ) : (
                          <span>{isPositive ? "+" : ""}{index.changePercent.toFixed(2)}%</span>
                        )}
                      </div>
                    </div>
                    <div className="h-16 w-full">
                      <ResponsiveContainer width="100%" height={64} minWidth={0}>
                        <AreaChart data={index.data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id={`gradient-${index.name}`} x1="0" y1="0" x2="0" y2="1">
                              <stop 
                                offset="5%" 
                                stopColor={isPositive ? "oklch(0.55 0.18 145)" : "oklch(0.55 0.22 25)"} 
                                stopOpacity={0.3} 
                              />
                              <stop 
                                offset="95%" 
                                stopColor={isPositive ? "oklch(0.55 0.18 145)" : "oklch(0.55 0.22 25)"} 
                                stopOpacity={0} 
                              />
                            </linearGradient>
                          </defs>
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke={isPositive ? "oklch(0.55 0.18 145)" : "oklch(0.55 0.22 25)"}
                            strokeWidth={2}
                            fill={`url(#gradient-${index.name})`}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <p className={cn(
                      "text-sm font-medium mt-2",
                      isPositive ? "text-gain" : "text-loss"
                    )}>
                      {isPositive ? "+" : ""}{index.change.toFixed(2)} pts
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          {(indexError || indexPartialError) && !hasLiveIndexData ? (
            <p className="text-sm text-loss">Live India market data is unavailable. Showing fallback values.</p>
          ) : null}
        </TabsContent>

        {/* Global Markets */}
        <TabsContent value="global">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {globalIndices.map((index) => {
              const isPositive = index.changePercent >= 0
              return (
                <Card key={index.name} className="hover:border-primary/20 transition-colors">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-[10px]">{index.market}</Badge>
                      <span className="text-[10px] text-muted-foreground">{index.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{index.name}</p>
                    {index.loading ? (
                      <SkeletonLoader className="mt-2 h-8 w-28" />
                    ) : (
                      <p className="text-xl font-bold mt-1">{index.value}</p>
                    )}
                    <div className={cn(
                      "flex items-center gap-1 mt-2 text-sm font-medium",
                      isPositive ? "text-gain" : "text-loss"
                    )}>
                      {isPositive ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      {index.loading ? (
                        <SkeletonLoader className="h-5 w-20" />
                      ) : (
                        <span>{isPositive ? "+" : ""}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          {(indexError || indexPartialError) && !hasLiveIndexData ? (
            <p className="text-sm text-loss">Live global market data is unavailable. Showing fallback values.</p>
          ) : null}
        </TabsContent>

        {/* Sector Performance */}
        <TabsContent value="sectors">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sector Performance</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {sectorPerformance.map((sector) => {
                  const isPositive = sector.change >= 0
                  return (
                    <div
                      key={sector.name}
                      className="flex items-center justify-between px-6 py-4 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{sector.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {sector.leaders.map((leader) => (
                            <Badge key={leader} variant="secondary" className="text-[10px]">
                              {leader}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className={cn(
                        "flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-semibold",
                        isPositive ? "bg-gain/10 text-gain" : "bg-loss/10 text-loss"
                      )}>
                        {isPositive ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {isPositive ? "+" : ""}{sector.change.toFixed(2)}%
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
