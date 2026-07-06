"use client"

import * as React from "react"
import { StockTable, type Stock } from "@/components/stock-table"
import { StockFilters } from "@/components/stock-filters"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useFetch } from "@/hooks/useFetch"
import { parseYahooQuoteMeta, yahooChartProxyUrl } from "@/lib/api"
import { SkeletonLoader } from "@/components/skeleton-loader"

const stocksData: Stock[] = [
  { symbol: "RELIANCE", name: "Reliance Industries Ltd", price: 2847.50, change: 35.20, changePercent: 1.24, marketCap: "₹19.2L Cr", pe: 28.5, return1Y: 18.5, return3Y: 45.2, volume: "8.5M", sector: "Energy", tags: ["Top Gainer"] },
  { symbol: "TCS", name: "Tata Consultancy Services Ltd", price: 4125.80, change: -23.40, changePercent: -0.56, marketCap: "₹15.1L Cr", pe: 32.1, return1Y: 12.3, return3Y: 38.7, volume: "4.2M", sector: "Technology" },
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd", price: 1678.25, change: 14.85, changePercent: 0.89, marketCap: "₹12.8L Cr", pe: 22.4, return1Y: 8.2, return3Y: 25.6, volume: "12.1M", sector: "Banking", tags: ["High Volume"] },
  { symbol: "INFY", name: "Infosys Ltd", price: 1542.60, change: -17.45, changePercent: -1.12, marketCap: "₹6.4L Cr", pe: 25.8, return1Y: -5.2, return3Y: 22.1, volume: "6.8M", sector: "Technology", tags: ["Top Loser"] },
  { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd", price: 1425.30, change: 32.65, changePercent: 2.34, marketCap: "₹8.5L Cr", pe: 45.2, return1Y: 42.5, return3Y: 125.8, volume: "5.1M", sector: "Telecom", tags: ["Top Gainer"] },
  { symbol: "ICICIBANK", name: "ICICI Bank Ltd", price: 1089.45, change: 8.75, changePercent: 0.81, marketCap: "₹7.6L Cr", pe: 19.8, return1Y: 15.4, return3Y: 68.2, volume: "9.4M", sector: "Banking" },
  { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd", price: 2456.80, change: -12.30, changePercent: -0.50, marketCap: "₹5.8L Cr", pe: 58.2, return1Y: -2.1, return3Y: 15.8, volume: "2.1M", sector: "Consumer Goods" },
  { symbol: "ITC", name: "ITC Ltd", price: 445.60, change: 5.25, changePercent: 1.19, marketCap: "₹5.6L Cr", pe: 28.4, return1Y: 32.5, return3Y: 78.4, volume: "18.5M", sector: "Consumer Goods", tags: ["High Volume"] },
  { symbol: "SBIN", name: "State Bank of India", price: 628.90, change: -4.20, changePercent: -0.66, marketCap: "₹5.6L Cr", pe: 11.2, return1Y: 22.8, return3Y: 95.2, volume: "22.4M", sector: "Banking", tags: ["Undervalued", "High Volume"] },
  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank Ltd", price: 1785.40, change: 18.90, changePercent: 1.07, marketCap: "₹3.5L Cr", pe: 24.6, return1Y: -8.5, return3Y: 12.4, volume: "3.8M", sector: "Banking" },
  { symbol: "TATAMOTORS", name: "Tata Motors Ltd", price: 945.80, change: 50.65, changePercent: 5.67, marketCap: "₹3.5L Cr", pe: 8.2, return1Y: 85.2, return3Y: 245.6, volume: "12.5M", sector: "Automobile", tags: ["Top Gainer"] },
  { symbol: "WIPRO", name: "Wipro Ltd", price: 485.25, change: -8.45, changePercent: -1.71, marketCap: "₹2.5L Cr", pe: 22.1, return1Y: -12.5, return3Y: 8.2, volume: "5.2M", sector: "Technology", tags: ["Top Loser"] },
  { symbol: "SUNPHARMA", name: "Sun Pharmaceutical Industries", price: 1245.60, change: 22.35, changePercent: 1.83, marketCap: "₹3.0L Cr", pe: 35.8, return1Y: 28.4, return3Y: 62.5, volume: "4.1M", sector: "Pharmaceuticals" },
  { symbol: "MARUTI", name: "Maruti Suzuki India Ltd", price: 10542.80, change: -125.40, changePercent: -1.18, marketCap: "₹3.3L Cr", pe: 32.4, return1Y: 18.2, return3Y: 42.8, volume: "0.8M", sector: "Automobile" },
  { symbol: "LT", name: "Larsen & Toubro Ltd", price: 3256.90, change: 45.80, changePercent: 1.43, marketCap: "₹4.5L Cr", pe: 38.5, return1Y: 35.6, return3Y: 88.4, volume: "2.4M", sector: "Infrastructure" },
  { symbol: "AXISBANK", name: "Axis Bank Ltd", price: 1125.45, change: 12.65, changePercent: 1.14, marketCap: "₹3.5L Cr", pe: 15.2, return1Y: 25.8, return3Y: 52.4, volume: "8.2M", sector: "Banking" },
  { symbol: "ADANIENT", name: "Adani Enterprises Ltd", price: 2845.60, change: -85.20, changePercent: -2.91, marketCap: "₹3.2L Cr", pe: 95.4, return1Y: -15.2, return3Y: 185.6, volume: "4.5M", sector: "Infrastructure", tags: ["Top Loser"] },
  { symbol: "TATASTEEL", name: "Tata Steel Ltd", price: 142.85, change: 2.45, changePercent: 1.74, marketCap: "₹1.8L Cr", pe: 6.8, return1Y: -22.4, return3Y: 45.2, volume: "42.5M", sector: "Infrastructure", tags: ["Undervalued", "High Volume"] },
  { symbol: "HCLTECH", name: "HCL Technologies Ltd", price: 1425.80, change: 18.25, changePercent: 1.30, marketCap: "₹3.9L Cr", pe: 24.2, return1Y: 15.8, return3Y: 48.5, volume: "3.2M", sector: "Technology" },
  { symbol: "BAJFINANCE", name: "Bajaj Finance Ltd", price: 6845.20, change: -95.40, changePercent: -1.37, marketCap: "₹4.2L Cr", pe: 42.5, return1Y: -8.2, return3Y: 35.8, volume: "1.5M", sector: "Banking" },
]

export default function StocksPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [sortColumn, setSortColumn] = React.useState<string>("")
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("desc")
  const [activeTab, setActiveTab] = React.useState("all")

  const stockSymbols = [
    "RELIANCE.NS",
    "TCS.NS",
    "HDFCBANK.NS",
    "INFY.NS",
    "BHARTIARTL.NS",
    "TATAMOTORS.NS",
    "WIPRO.NS",
    "ICICIBANK.NS",
    "KOTAKBANK.NS",
    "AXISBANK.NS",
    "SUNPHARMA.NS",
    "MARUTI.NS",
  ]

  const { data: quoteResults, error: quoteError, isLoading: quotesLoading } = useFetch(
    async () => {
      const results = await Promise.allSettled(
        stockSymbols.map(async (symbol) => {
          const response = await fetch(yahooChartProxyUrl(symbol, "1d", "1d"), { cache: "no-store" })
          if (!response.ok) {
            throw new Error(`Failed to fetch quote for ${symbol}`)
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

  const enrichedStocks = React.useMemo(() => {
    return stocksData.map((stock) => {
      const quote = quoteResults?.find((item) =>
        item?.symbol?.toUpperCase() === `${stock.symbol}.NS`
      )
      if (!quote) {
        return stock
      }

      return {
        ...stock,
        price: quote.price,
        change: quote.change,
        changePercent: quote.changePercent,
        volume: quote.volume ? quote.volume.toLocaleString("en-IN") : stock.volume,
        marketCap: quote.marketCap ? `₹${quote.marketCap.toLocaleString("en-IN")}` : stock.marketCap,
      }
    })
  }, [quoteResults])

  const gainersLosersRaw = stocksData ?? []

  const filteredStocks = React.useMemo(() => {
    const liveQuotes = quoteResults?.filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? []
    const topGainers = [...liveQuotes]
      .sort((a, b) => b.changePercent - a.changePercent)
      .slice(0, 5)
      .map((item) => item.symbol.toUpperCase())
    const topLosers = [...liveQuotes]
      .sort((a, b) => a.changePercent - b.changePercent)
      .slice(0, 5)
      .map((item) => item.symbol.toUpperCase())

    let filtered = enrichedStocks.filter((stock) =>
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (activeTab === "gainers") {
      filtered = filtered.filter((stock) => topGainers.includes(`${stock.symbol}.NS`))
    }

    if (activeTab === "losers") {
      filtered = filtered.filter((stock) => topLosers.includes(`${stock.symbol}.NS`))
    }

    if (activeTab === "52high") {
      filtered = filtered.filter((stock) => stock.return1Y > 30)
    }

    if (activeTab === "volume") {
      filtered = filtered.filter((stock) => stock.tags?.includes("High Volume"))
    }

    if (sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        let aVal: number | string = 0
        let bVal: number | string = 0

        switch (sortColumn) {
          case "name":
            aVal = a.name
            bVal = b.name
            break
          case "price":
            aVal = a.price
            bVal = b.price
            break
          case "change":
            aVal = a.changePercent
            bVal = b.changePercent
            break
          case "marketCap":
            aVal = parseFloat(a.marketCap.replace(/[₹L Cr,]/g, ""))
            bVal = parseFloat(b.marketCap.replace(/[₹L Cr,]/g, ""))
            break
          case "pe":
            aVal = a.pe
            bVal = b.pe
            break
          case "return1Y":
            aVal = a.return1Y
            bVal = b.return1Y
            break
          case "return3Y":
            aVal = a.return3Y
            bVal = b.return3Y
            break
          default:
            return 0
        }

        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortDirection === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal)
        }

        return sortDirection === "asc"
          ? (aVal as number) - (bVal as number)
          : (bVal as number) - (aVal as number)
      })
    }

    return filtered
  }, [activeTab, enrichedStocks, gainersLosersRaw, searchQuery, sortColumn, sortDirection])

  const quotePartialError = quoteResults?.some((item) => item === null) ?? false
  const hasLoading = quotesLoading
  const hasError = quoteError || quotePartialError

  const handleSort = (column: string) => {
    const newDirection = sortColumn === column && sortDirection === "desc" ? "asc" : "desc"
    setSortColumn(column)
    setSortDirection(newDirection)
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Stocks</h1>
          <p className="text-muted-foreground mt-1">
            Explore and analyze {stocksData.length}+ stocks listed on NSE & BSE
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <Link href="/compare">
              <BarChart3 className="h-4 w-4" />
              Compare
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Stocks</TabsTrigger>
          <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
          <TabsTrigger value="losers">Top Losers</TabsTrigger>
          <TabsTrigger value="52high">52W High</TabsTrigger>
          <TabsTrigger value="volume">High Volume</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filters */}
      <div className="mb-6">
        <StockFilters onSearchChange={handleSearch} />
      </div>

      {hasError ? (
        <p className="text-sm text-loss mb-4">
          Live stock data is unavailable. Displaying fallback values.
        </p>
      ) : null}

      {hasLoading && !quoteResults ? (
        <div className="space-y-3 mb-6">
          <SkeletonLoader className="h-10 w-full rounded-lg" />
          <SkeletonLoader className="h-10 w-full rounded-lg" />
          <SkeletonLoader className="h-10 w-full rounded-lg" />
        </div>
      ) : null}

      {/* Stock Table */}
      <StockTable
        stocks={filteredStocks}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />
    </div>
  )
}
