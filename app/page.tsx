"use client"

import { MarketCard } from "@/components/market-card"
import { PortfolioSummary } from "@/components/portfolio-summary"
import { Watchlist } from "@/components/watchlist"
import { TrendingAssets } from "@/components/trending-assets"
import { QuickActions } from "@/components/quick-actions"
import { FloatingChatbot } from "@/components/floating-chatbot"
import { MarketHeatmap } from "@/components/market-heatmap"
import { EconomicCalendar } from "@/components/economic-calendar"
import { PortfolioHealth } from "@/components/portfolio-health"
import { MarketOverviewBanner } from "@/components/market-overview-banner"
import { DashboardWidgets } from "@/components/dashboard-widgets"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"
import { useFetch } from "@/hooks/useFetch"
import { parseYahooIndexQuote, yahooChartProxyUrl } from "@/lib/api"
import * as React from "react"

const dashboardIndicesConfig = [
  { name: "NIFTY 50", symbol: "^NSEI", value: "22,456.80", change: 128.45, changePercent: 0.57 },
  { name: "SENSEX", symbol: "^BSESN", value: "73,852.30", change: 412.65, changePercent: 0.56 },
  { name: "NIFTY Bank", symbol: "^NSEBANK", value: "48,125.50", change: -156.20, changePercent: -0.32 },
  { name: "NIFTY IT", symbol: "^CNXIT", value: "35,248.70", change: 285.30, changePercent: 0.82 },
]

const globalIndicesConfig = [
  { name: "S&P 500", symbol: "^GSPC", value: "5,234.18", change: 45.28, changePercent: 0.87, market: "US" },
  { name: "NASDAQ", symbol: "^IXIC", value: "16,428.82", change: 152.65, changePercent: 0.94, market: "US" },
  { name: "FTSE 100", symbol: "^FTSE", value: "8,124.56", change: 42.35, changePercent: 0.52, market: "UK" },
  { name: "DAX", symbol: "^GDAXI", value: "18,245.80", change: 125.45, changePercent: 0.69, market: "Germany" },
]

const topCrypto = [
  { symbol: "BTC", name: "Bitcoin", price: "$97,450", change: 2.45, changePercent: 2.45 },
  { symbol: "ETH", name: "Ethereum", price: "$3,245", change: -1.20, changePercent: -1.20 },
  { symbol: "XRP", name: "Ripple", price: "$2.85", change: 3.65, changePercent: 3.65 },
  { symbol: "ADA", name: "Cardano", price: "$1.12", change: 1.80, changePercent: 1.80 },
]

const topMutualFunds = [
  { name: "SBI Bluechip Fund", aum: "₹45,230 Cr", return1Y: 18.5, rating: 5 },
  { name: "HDFC Top 100 Fund", aum: "₹38,450 Cr", return1Y: 17.2, rating: 5 },
  { name: "ICICI Prudential Growth", aum: "₹32,100 Cr", return1Y: 16.8, rating: 4 },
  { name: "Axis Bluechip Fund", aum: "₹28,900 Cr", return1Y: 19.1, rating: 5 },
]

export default function DashboardPage() {
  const { data: dashboardQuotes, error: dashboardError, isLoading: dashboardLoading } = useFetch(
    async () => {
      const results = await Promise.allSettled(
        dashboardIndicesConfig.map(async (index) => {
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

  const dashboardPartialError = dashboardQuotes?.some((item) => item === null) ?? false
  const hasLiveDashboardData = dashboardQuotes?.some((item) => item !== null) ?? false
  const fallbackIndices = dashboardIndicesConfig
  const indicesData = React.useMemo(
    () =>
      dashboardIndicesConfig.map((index, idx) => {
        const quote = dashboardQuotes?.[idx]
        return {
          ...index,
          value: quote ? quote.price.toLocaleString("en-IN", { maximumFractionDigits: 2 }) : index.value,
          change: quote?.change ?? index.change,
          changePercent: quote?.changePercent ?? index.changePercent,
          loading: dashboardLoading,
        }
      }),
    [dashboardQuotes, dashboardLoading]
  )

  const marketIndices = indicesData ?? fallbackIndices
  const showDashboardWarning = dashboardError && !hasLiveDashboardData

  const { data: globalQuotes, error: globalError, isLoading: globalLoading } = useFetch(
    async () => {
      const results = await Promise.allSettled(
        globalIndicesConfig.map(async (index) => {
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

  const globalPartialError = globalQuotes?.some((item) => item === null) ?? false
  const hasLiveGlobalData = globalQuotes?.some((item) => item !== null) ?? false
  const globalIndices = React.useMemo(
    () =>
      globalIndicesConfig.map((index, idx) => {
        const quote = globalQuotes?.[idx]
        return {
          ...index,
          value: quote ? quote.price.toLocaleString("en-IN", { maximumFractionDigits: 2 }) : index.value,
          change: quote?.change ?? index.change,
          changePercent: quote?.changePercent ?? index.changePercent,
          market: index.market,
          loading: globalLoading,
        }
      }),
    [globalQuotes, globalLoading]
  )

  const showGlobalWarning = globalError && !hasLiveGlobalData

  return (
    <>
      <div className="w-full px-8 py-6 box-border">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Welcome back, Investor</h1>
          <p className="text-base mt-2" style={{ color: 'var(--text-label)' }}>
            Your investment grew by {"₹"}12,450 today. Keep it up!
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <QuickActions />
        </div>

        {/* Market Overview Banner */}
        <div className="mb-8">
          <MarketOverviewBanner />
        </div>

        {/* Main Content - Tabbed Markets */}
        <Tabs defaultValue="india" className="space-y-6 mb-8">
          <TabsList>
            <TabsTrigger value="india">India Markets</TabsTrigger>
            <TabsTrigger value="global">Global Markets</TabsTrigger>
            <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
            <TabsTrigger value="mf">Mutual Funds</TabsTrigger>
          </TabsList>

          {/* India Markets */}
          <TabsContent value="india" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketIndices.map((index) => (
                <MarketCard
                  key={index.name}
                  name={index.name}
                  value={index.value}
                  change={index.change}
                  changePercent={index.changePercent}
                  loading={index.loading}
                />
              ))}
            </div>
            {showDashboardWarning ? (
              <p className="text-sm text-loss">Live India market data is unavailable. Showing fallback values.</p>
            ) : null}
          </TabsContent>

          {/* Global Markets */}
          <TabsContent value="global" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {globalIndices.map((index) => {
                const isPositive = index.changePercent >= 0
                return (
                  <Card key={index.name} className="hover:border-primary/20 transition-colors">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="outline" className="text-xs">{index.market}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{index.name}</p>
                      <p className="text-2xl font-bold mt-1">{index.value}</p>
                      <div className={cn(
                        "flex items-center gap-1 mt-2 text-sm font-medium",
                        isPositive ? "text-gain" : "text-loss"
                      )}>
                        {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        {isPositive ? "+" : ""}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            {showGlobalWarning ? (
              <p className="text-sm text-loss">Live global market data is unavailable. Showing fallback values.</p>
            ) : null}
          </TabsContent>

          {/* Cryptocurrency */}
          <TabsContent value="crypto" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {topCrypto.map((coin) => {
                const isPositive = coin.changePercent >= 0
                return (
                  <Card key={coin.symbol} className="hover:border-primary/20 transition-colors">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary" className="text-xs font-bold">{coin.symbol}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{coin.name}</p>
                      <p className="text-2xl font-bold mt-1">{coin.price}</p>
                      <div className={cn(
                        "flex items-center gap-1 mt-2 text-sm font-medium",
                        isPositive ? "text-gain" : "text-loss"
                      )}>
                        {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        {isPositive ? "+" : ""}{coin.changePercent.toFixed(2)}%
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Mutual Funds */}
          <TabsContent value="mf" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {topMutualFunds.map((fund) => (
                <Card key={fund.name} className="hover:border-primary/20 transition-colors">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex gap-1">
                        {[...Array(fund.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-500">★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground line-clamp-2">{fund.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">AUM: {fund.aum}</p>
                    <p className="text-2xl font-bold mt-3">{fund.return1Y}%</p>
                    <p className="text-xs text-muted-foreground mt-1">1 Year Return</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Market Heatmap & Economic Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <MarketHeatmap />
          <EconomicCalendar />
        </div>

        {/* Portfolio Health & Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Portfolio */}
          <div className="lg:col-span-2 space-y-6">
            <PortfolioSummary />
            <TrendingAssets />
          </div>

          {/* Right Column - Portfolio Health */}
          <div>
            <PortfolioHealth />
          </div>
        </div>

        {/* Watchlist */}
        <div className="mb-8">
          <Watchlist />
        </div>

        {/* New Dashboard Widgets */}
        <div className="mb-8">
          <DashboardWidgets />
        </div>
      </div>

      {/* Floating Chatbot */}
      <FloatingChatbot />
    </>
  )
}
