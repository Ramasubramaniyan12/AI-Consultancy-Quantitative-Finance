"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Search,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Filter,
  Star,
  Plus,
} from "lucide-react"
import { AreaChart, Area } from "recharts"

// Sample ETF data
const etfData = [
  {
    id: 1,
    name: "Nippon India Nifty 50 BeES",
    symbol: "NIFTYBEES",
    category: "Index",
    aum: 24580,
    nav: 245.67,
    change: 1.25,
    changePercent: 0.51,
    expenseRatio: 0.05,
    tracking: "Nifty 50",
    returns1Y: 12.5,
    chartData: Array.from({ length: 30 }, (_, i) => ({ value: 230 + Math.random() * 20 + i * 0.3 })),
  },
  {
    id: 2,
    name: "SBI ETF Sensex",
    symbol: "SETFSE50",
    category: "Index",
    aum: 18920,
    nav: 678.45,
    change: 3.45,
    changePercent: 0.51,
    expenseRatio: 0.07,
    tracking: "Sensex",
    returns1Y: 11.8,
    chartData: Array.from({ length: 30 }, (_, i) => ({ value: 660 + Math.random() * 25 + i * 0.4 })),
  },
  {
    id: 3,
    name: "HDFC Gold ETF",
    symbol: "HDFCGOLD",
    category: "Gold",
    aum: 8750,
    nav: 52.34,
    change: 0.87,
    changePercent: 1.69,
    expenseRatio: 0.45,
    tracking: "Gold Spot",
    returns1Y: 18.2,
    chartData: Array.from({ length: 30 }, (_, i) => ({ value: 48 + Math.random() * 5 + i * 0.1 })),
  },
  {
    id: 4,
    name: "Kotak Nifty Bank ETF",
    symbol: "KOTAKBANK",
    category: "Sectoral",
    aum: 5680,
    nav: 412.56,
    change: -4.23,
    changePercent: -1.01,
    expenseRatio: 0.15,
    tracking: "Nifty Bank",
    returns1Y: 8.4,
    chartData: Array.from({ length: 30 }, (_, i) => ({ value: 420 - Math.random() * 15 + i * 0.2 })),
  },
  {
    id: 5,
    name: "ICICI Prudential Nifty IT ETF",
    symbol: "ICICIITECH",
    category: "Sectoral",
    aum: 3450,
    nav: 34.89,
    change: -0.56,
    changePercent: -1.58,
    expenseRatio: 0.20,
    tracking: "Nifty IT",
    returns1Y: 22.6,
    chartData: Array.from({ length: 30 }, (_, i) => ({ value: 38 - Math.random() * 5 + i * 0.05 })),
  },
  {
    id: 6,
    name: "Nippon India Silver ETF",
    symbol: "SILVEREES",
    category: "Silver",
    aum: 2890,
    nav: 78.45,
    change: 1.23,
    changePercent: 1.59,
    expenseRatio: 0.40,
    tracking: "Silver Spot",
    returns1Y: 25.3,
    chartData: Array.from({ length: 30 }, (_, i) => ({ value: 72 + Math.random() * 8 + i * 0.15 })),
  },
  {
    id: 7,
    name: "Motilal Oswal Nasdaq 100 ETF",
    symbol: "N100",
    category: "International",
    aum: 4560,
    nav: 145.67,
    change: 2.34,
    changePercent: 1.63,
    expenseRatio: 0.50,
    tracking: "Nasdaq 100",
    returns1Y: 28.9,
    chartData: Array.from({ length: 30 }, (_, i) => ({ value: 135 + Math.random() * 15 + i * 0.3 })),
  },
  {
    id: 8,
    name: "UTI Nifty Next 50 ETF",
    symbol: "UTINEXT50",
    category: "Index",
    aum: 1890,
    nav: 456.78,
    change: 5.67,
    changePercent: 1.26,
    expenseRatio: 0.12,
    tracking: "Nifty Next 50",
    returns1Y: 35.4,
    chartData: Array.from({ length: 30 }, (_, i) => ({ value: 440 + Math.random() * 20 + i * 0.4 })),
  },
]

export default function ETFsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [category, setCategory] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("aum")

  const filteredData = etfData.filter(etf => {
    const matchesSearch = etf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          etf.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === "all" || etf.category.toLowerCase() === category.toLowerCase()
    return matchesSearch && matchesCategory
  }).sort((a, b) => {
    if (sortBy === "aum") return b.aum - a.aum
    if (sortBy === "returns") return b.returns1Y - a.returns1Y
    if (sortBy === "expense") return a.expenseRatio - b.expenseRatio
    if (sortBy === "change") return b.changePercent - a.changePercent
    return 0
  })

  const totalAUM = etfData.reduce((sum, etf) => sum + etf.aum, 0)
  const avgExpenseRatio = (etfData.reduce((sum, etf) => sum + etf.expenseRatio, 0) / etfData.length).toFixed(2)

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Exchange Traded Funds</h1>
        <p className="text-muted-foreground mt-1">
          Explore and compare ETFs across categories
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total AUM</p>
            <p className="text-lg font-semibold text-foreground">
              {(totalAUM / 1000).toFixed(1)}K Cr
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">ETFs Listed</p>
            <p className="text-lg font-semibold text-foreground">{etfData.length}+</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg Expense Ratio</p>
            <p className="text-lg font-semibold text-foreground">{avgExpenseRatio}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Categories</p>
            <p className="text-lg font-semibold text-foreground">6</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search ETFs by name or symbol..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="index">Index</SelectItem>
                <SelectItem value="sectoral">Sectoral</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="international">International</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-40">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aum">Highest AUM</SelectItem>
                <SelectItem value="returns">Best Returns</SelectItem>
                <SelectItem value="expense">Lowest Expense</SelectItem>
                <SelectItem value="change">Today&apos;s Change</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* ETF Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ETF Name</TableHead>
                <TableHead className="text-right">NAV</TableHead>
                <TableHead className="text-right hidden sm:table-cell">1Y Returns</TableHead>
                <TableHead className="text-right hidden md:table-cell">AUM (Cr)</TableHead>
                <TableHead className="text-right hidden lg:table-cell">Expense</TableHead>
                <TableHead className="hidden xl:table-cell">Chart</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((etf) => {
                const isPositive = etf.changePercent >= 0
                return (
                  <TableRow key={etf.id} className="cursor-pointer hover:bg-secondary/50">
                    <TableCell>
                      <div>
                        <Link href={`/etfs/${etf.symbol}`} className="font-medium text-foreground hover:text-primary">
                          {etf.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground">{etf.symbol}</span>
                          <Badge variant="outline" className="text-[10px]">{etf.category}</Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end">
                        <span className="font-medium text-foreground">
                          {etf.nav.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                        </span>
                        <span className={`text-xs flex items-center ${isPositive ? "text-gain" : "text-loss"}`}>
                          {isPositive ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                          {isPositive ? "+" : ""}{etf.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right hidden sm:table-cell">
                      <span className={`font-medium ${etf.returns1Y >= 0 ? "text-gain" : "text-loss"}`}>
                        {etf.returns1Y >= 0 ? "+" : ""}{etf.returns1Y}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right hidden md:table-cell">
                      <span className="text-muted-foreground">{etf.aum.toLocaleString("en-IN")}</span>
                    </TableCell>
                    <TableCell className="text-right hidden lg:table-cell">
                      <span className="text-muted-foreground">{etf.expenseRatio}%</span>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <AreaChart width={80} height={32} data={etf.chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke={isPositive ? "oklch(0.55 0.18 145)" : "oklch(0.55 0.22 25)"}
                          strokeWidth={1.5}
                          fill={isPositive ? "oklch(0.55 0.18 145 / 0.1)" : "oklch(0.55 0.22 25 / 0.1)"}
                        />
                      </AreaChart>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Star className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}
