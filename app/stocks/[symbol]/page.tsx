"use client"

import * as React from "react"
import { use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import {
  TrendingUp,
  TrendingDown,
  Star,
  Share2,
  Bell,
  ArrowLeft,
  Building2,
  Users,
  DollarSign,
  BarChart3,
  PieChart,
  FileText,
  Newspaper,
} from "lucide-react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

// Mock price data for chart
const generatePriceData = (days: number, basePrice: number) => {
  const data = []
  let price = basePrice * 0.85
  for (let i = 0; i < days; i++) {
    price = price + (Math.random() - 0.48) * (basePrice * 0.02)
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { 
        month: "short", 
        day: "numeric" 
      }),
      price: Math.max(price, basePrice * 0.7),
    })
  }
  return data
}

const stockDetails: Record<string, {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  sector: string
  industry: string
  marketCap: string
  pe: number
  pb: number
  dividendYield: number
  eps: number
  roe: number
  debtToEquity: number
  bookValue: number
  faceValue: number
  high52w: number
  low52w: number
  avgVolume: string
  beta: number
  about: string
}> = {
  reliance: {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    price: 2847.50,
    change: 35.20,
    changePercent: 1.24,
    sector: "Energy",
    industry: "Oil & Gas Refining",
    marketCap: "₹19.2L Cr",
    pe: 28.5,
    pb: 2.8,
    dividendYield: 0.32,
    eps: 99.91,
    roe: 9.8,
    debtToEquity: 0.42,
    bookValue: 1016.78,
    faceValue: 10,
    high52w: 3024.90,
    low52w: 2220.30,
    avgVolume: "8.5M",
    beta: 1.12,
    about: "Reliance Industries Limited is an Indian multinational conglomerate company, headquartered in Mumbai. It has diverse businesses including energy, petrochemicals, natural gas, retail, telecommunications, mass media, and textiles.",
  },
  tcs: {
    symbol: "TCS",
    name: "Tata Consultancy Services Ltd",
    price: 4125.80,
    change: -23.40,
    changePercent: -0.56,
    sector: "Technology",
    industry: "IT Services",
    marketCap: "₹15.1L Cr",
    pe: 32.1,
    pb: 14.2,
    dividendYield: 1.28,
    eps: 128.52,
    roe: 48.2,
    debtToEquity: 0.05,
    bookValue: 290.45,
    faceValue: 1,
    high52w: 4592.25,
    low52w: 3056.05,
    avgVolume: "4.2M",
    beta: 0.82,
    about: "Tata Consultancy Services is an Indian multinational information technology services and consulting company. It is a part of the Tata Group and operates in 149 locations across 46 countries.",
  },
}

const newsData = [
  { title: "Company reports strong Q3 earnings, beats estimates", date: "2 hours ago", source: "Economic Times" },
  { title: "Analysts upgrade stock to 'Buy' with new price target", date: "5 hours ago", source: "Moneycontrol" },
  { title: "Board approves dividend of ₹10 per share", date: "1 day ago", source: "BSE Filing" },
  { title: "Company announces expansion plans in renewable energy", date: "2 days ago", source: "Business Standard" },
]

const timeRanges = ["1D", "1W", "1M", "3M", "6M", "1Y", "3Y", "5Y", "MAX"]

export default function StockDetailPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = use(params)
  const [selectedRange, setSelectedRange] = React.useState("1Y")
  const [isWatchlisted, setIsWatchlisted] = React.useState(false)

  const stock = stockDetails[symbol.toLowerCase()] || stockDetails.reliance
  const isPositive = stock.change >= 0

  const priceData = React.useMemo(() => {
    const days = {
      "1D": 1,
      "1W": 7,
      "1M": 30,
      "3M": 90,
      "6M": 180,
      "1Y": 365,
      "3Y": 1095,
      "5Y": 1825,
      "MAX": 2555,
    }[selectedRange] || 365
    return generatePriceData(days, stock.price)
  }, [selectedRange, stock.price])

  const metrics = [
    { label: "Market Cap", value: stock.marketCap, icon: Building2 },
    { label: "P/E Ratio", value: stock.pe.toFixed(2), icon: BarChart3 },
    { label: "P/B Ratio", value: stock.pb.toFixed(2), icon: PieChart },
    { label: "Dividend Yield", value: `${stock.dividendYield.toFixed(2)}%`, icon: DollarSign },
    { label: "EPS", value: `₹${stock.eps.toFixed(2)}`, icon: FileText },
    { label: "ROE", value: `${stock.roe.toFixed(1)}%`, icon: TrendingUp },
    { label: "Debt/Equity", value: stock.debtToEquity.toFixed(2), icon: Users },
    { label: "Book Value", value: `₹${stock.bookValue.toFixed(2)}`, icon: FileText },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back Button */}
      <Link
        href="/stocks"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Stocks
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-xl bg-secondary flex items-center justify-center shrink-0">
            <span className="text-lg font-bold">{stock.symbol.slice(0, 2)}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold">{stock.symbol}</h1>
              <Badge variant="secondary">{stock.sector}</Badge>
              <Badge variant="outline">{stock.industry}</Badge>
            </div>
            <p className="text-muted-foreground mt-1">{stock.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsWatchlisted(!isWatchlisted)}
          >
            <Star className={cn("h-4 w-4", isWatchlisted && "fill-yellow-500 text-yellow-500")} />
          </Button>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="hidden sm:flex" asChild>
            <Link href={`/compare?assets=${stock.symbol}`}>Compare</Link>
          </Button>
          <Button className="bg-gain hover:bg-gain/90 text-gain-foreground">Buy</Button>
          <Button variant="outline" className="border-loss text-loss hover:bg-loss/10">Sell</Button>
        </div>
      </div>

      {/* Price Section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-4xl font-bold">{"₹"}{stock.price.toLocaleString("en-IN")}</p>
              <div className={cn(
                "flex items-center gap-2 mt-2",
                isPositive ? "text-gain" : "text-loss"
              )}>
                {isPositive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                <span className="text-lg font-semibold">
                  {isPositive ? "+" : ""}{"₹"}{Math.abs(stock.change).toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </span>
                <span className="text-sm text-muted-foreground">today</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {timeRanges.map((range) => (
                <Button
                  key={range}
                  variant={selectedRange === range ? "default" : "ghost"}
                  size="sm"
                  className="h-8 px-3"
                  onClick={() => setSelectedRange(range)}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>

          {/* Price Chart */}
          <div className="h-64 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <AreaChart data={priceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isPositive ? "oklch(0.55 0.18 145)" : "oklch(0.55 0.22 25)"} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={isPositive ? "oklch(0.55 0.18 145)" : "oklch(0.55 0.22 25)"} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0 0)" vertical={false} />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "oklch(0.45 0 0)" }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  domain={["dataMin - 50", "dataMax + 50"]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "oklch(0.45 0 0)" }}
                  tickFormatter={(value) => `₹${value.toFixed(0)}`}
                  width={60}
                />
                <Tooltip
                  formatter={(value: number) => [`₹${value.toFixed(2)}`, "Price"]}
                  contentStyle={{
                    backgroundColor: "oklch(1 0 0)",
                    border: "1px solid oklch(0.9 0 0)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={isPositive ? "oklch(0.55 0.18 145)" : "oklch(0.55 0.22 25)"}
                  strokeWidth={2}
                  fill="url(#priceGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* 52W Range */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">52W Low: {"₹"}{stock.low52w.toLocaleString("en-IN")}</span>
              <span className="text-muted-foreground">52W High: {"₹"}{stock.high52w.toLocaleString("en-IN")}</span>
            </div>
            <div className="relative h-2 bg-secondary rounded-full">
              <div
                className="absolute h-full bg-primary rounded-full"
                style={{
                  width: `${((stock.price - stock.low52w) / (stock.high52w - stock.low52w)) * 100}%`,
                }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-primary rounded-full border-2 border-background"
                style={{
                  left: `${((stock.price - stock.low52w) / (stock.high52w - stock.low52w)) * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <Card key={metric.label}>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <metric.icon className="h-4 w-4" />
                    <span className="text-xs">{metric.label}</span>
                  </div>
                  <p className="text-lg font-semibold">{metric.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About {stock.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{stock.about}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Face Value</p>
                  <p className="font-semibold">{"₹"}{stock.faceValue}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Beta</p>
                  <p className="font-semibold">{stock.beta}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Avg Volume</p>
                  <p className="font-semibold">{stock.avgVolume}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Sector</p>
                  <p className="font-semibold">{stock.sector}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Financial Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Financial statements, quarterly results, and balance sheet data would be displayed here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news" className="space-y-4">
          {newsData.map((news, index) => (
            <Card key={index} className="hover:bg-secondary/30 transition-colors cursor-pointer">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Newspaper className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium leading-tight">{news.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {news.source} • {news.date}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analyst Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Analyst ratings, price targets, and technical analysis would be displayed here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
