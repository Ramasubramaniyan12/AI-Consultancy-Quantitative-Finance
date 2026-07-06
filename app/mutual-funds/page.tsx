"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  Search,
  TrendingUp,
  TrendingDown,
  Star,
  Filter,
  BarChart3,
  ArrowRight,
} from "lucide-react"
import { useFetch } from "@/hooks/useFetch"
import { MUTUAL_FUND_LIST_URL, mutualFundNavUrl } from "@/lib/api"
import { SkeletonLoader } from "@/components/skeleton-loader"

interface MutualFund {
  id: string
  name: string
  category: string
  amc: string
  nav: number
  change: number
  return1Y: number
  return3Y: number
  return5Y: number
  aum: string
  expenseRatio: number
  rating: number
  risk: "Low" | "Moderate" | "High"
  minSIP: number
  minLumpsum: number
  date?: string
}

const mutualFundsData: MutualFund[] = [
  { id: "hdfc-flexi", name: "HDFC Flexi Cap Fund", category: "Flexi Cap", amc: "HDFC AMC", nav: 1425.60, change: 0.88, return1Y: 22.4, return3Y: 18.5, return5Y: 15.2, aum: "₹52,000 Cr", expenseRatio: 1.65, rating: 5, risk: "High", minSIP: 500, minLumpsum: 5000 },
  { id: "axis-bluechip", name: "Axis Bluechip Fund", category: "Large Cap", amc: "Axis AMC", nav: 52.85, change: -0.45, return1Y: 15.8, return3Y: 14.2, return5Y: 12.8, aum: "₹38,500 Cr", expenseRatio: 1.58, rating: 4, risk: "Moderate", minSIP: 500, minLumpsum: 5000 },
  { id: "sbi-smallcap", name: "SBI Small Cap Fund", category: "Small Cap", amc: "SBI AMC", nav: 142.65, change: 1.24, return1Y: 35.2, return3Y: 28.4, return5Y: 22.5, aum: "₹24,200 Cr", expenseRatio: 1.78, rating: 5, risk: "High", minSIP: 500, minLumpsum: 5000 },
  { id: "icici-balanced", name: "ICICI Pru Balanced Advantage", category: "Balanced", amc: "ICICI Pru AMC", nav: 62.45, change: 0.52, return1Y: 12.5, return3Y: 11.8, return5Y: 10.5, aum: "₹58,400 Cr", expenseRatio: 1.42, rating: 4, risk: "Moderate", minSIP: 1000, minLumpsum: 5000 },
  { id: "mirae-emerging", name: "Mirae Asset Emerging Bluechip", category: "Large & Mid Cap", amc: "Mirae Asset", nav: 125.80, change: 0.95, return1Y: 28.5, return3Y: 22.4, return5Y: 18.8, aum: "₹32,100 Cr", expenseRatio: 1.52, rating: 5, risk: "High", minSIP: 500, minLumpsum: 5000 },
  { id: "kotak-equity", name: "Kotak Equity Opportunities", category: "Large & Mid Cap", amc: "Kotak AMC", nav: 285.45, change: 0.72, return1Y: 24.2, return3Y: 19.8, return5Y: 16.2, aum: "₹18,500 Cr", expenseRatio: 1.62, rating: 4, risk: "Moderate", minSIP: 500, minLumpsum: 1000 },
  { id: "parag-flexi", name: "Parag Parikh Flexi Cap Fund", category: "Flexi Cap", amc: "PPFAS AMC", nav: 68.92, change: 0.65, return1Y: 26.8, return3Y: 21.5, return5Y: 18.2, aum: "₹45,200 Cr", expenseRatio: 1.28, rating: 5, risk: "Moderate", minSIP: 1000, minLumpsum: 5000 },
  { id: "nippon-midcap", name: "Nippon India Growth Fund", category: "Mid Cap", amc: "Nippon AMC", nav: 3245.60, change: 1.15, return1Y: 32.5, return3Y: 25.8, return5Y: 20.2, aum: "₹28,400 Cr", expenseRatio: 1.68, rating: 4, risk: "High", minSIP: 500, minLumpsum: 5000 },
]

const categories = ["All", "Large Cap", "Mid Cap", "Small Cap", "Flexi Cap", "Large & Mid Cap", "Balanced", "ELSS"]

export default function MutualFundsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [category, setCategory] = React.useState("All")
  const [sortBy, setSortBy] = React.useState("return1Y")

  const popularSchemeCodes = [
    "120503", // SBI Bluechip
    "119598", // Axis Long Term Equity
    "118989", // Mirae Asset Large Cap
    "125354", // Parag Parikh Flexi Cap
    "120465", // HDFC Mid-Cap Opportunities
  ]

  const { data: fundList, error: fundListError, isLoading: fundListLoading } = useFetch<any[]>(
    async () => {
      const response = await fetch(MUTUAL_FUND_LIST_URL, { cache: "no-store" })
      if (!response.ok) {
        throw new Error("Failed to fetch mutual fund list")
      }
      return response.json()
    },
    [],
    300000
  )

  const { data: topFundDetails, error: fundDetailsError, isLoading: fundDetailsLoading } = useFetch<{
    schemeCode: string
    schemeName: string
    nav: number
    date: string
  }[]>(
    async () => {
      const results = await Promise.allSettled(
        popularSchemeCodes.map(async (schemeCode) => {
          const response = await fetch(mutualFundNavUrl(schemeCode), { cache: "no-store" })
          if (!response.ok) {
            throw new Error(`Failed to fetch fund ${schemeCode}`)
          }
          const payload = await response.json()
          const dataPoint = payload?.data?.[0]
          if (!dataPoint) {
            return null
          }

          return {
            schemeCode,
            schemeName: String(payload?.scheme?.schemeName ?? payload?.meta?.schemeName ?? ""),
            nav: Number(dataPoint.nav ?? 0),
            date: String(dataPoint.date ?? ""),
          }
        })
      )

      return results
        .filter((result) => result.status === "fulfilled" && result.value !== null)
        .map((result) => (result as PromiseFulfilledResult<any>).value)
    },
    [],
    3600000
  )

  const displayedFunds = React.useMemo(() => {
    const fetchedFunds = topFundDetails.length > 0
      ? topFundDetails.map((detail) => ({
          id: detail.schemeCode,
          name: detail.schemeName,
          category: "Large Cap",
          amc: "",
          nav: detail.nav,
          change: 0,
          return1Y: 0,
          return3Y: 0,
          return5Y: 0,
          aum: "",
          expenseRatio: 0,
          rating: 4,
          risk: "Moderate" as const,
          minSIP: 500,
          minLumpsum: 5000,
          date: detail.date,
        }))
      : []

    const sourceFunds = fetchedFunds.length > 0
      ? [...fetchedFunds, ...mutualFundsData.slice(0, 5)]
      : mutualFundsData

    return sourceFunds
      .filter((fund) => {
        const matchesSearch = fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fund.amc.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = category === "All" || fund.category === category
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "return1Y":
            return b.return1Y - a.return1Y
          case "return3Y":
            return b.return3Y - a.return3Y
          case "rating":
            return b.rating - a.rating
          case "aum":
            return parseFloat(b.aum.replace(/[₹, Cr]/g, "")) - parseFloat(a.aum.replace(/[₹, Cr]/g, ""))
          default:
            return 0
        }
      })
  }, [category, searchQuery, sortBy, topFundDetails])

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Mutual Funds</h1>
          <p className="text-muted-foreground mt-1">
            Explore {mutualFundsData.length}+ mutual funds across categories
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <Link href="/compare">
              <BarChart3 className="h-4 w-4" />
              Compare
            </Link>
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={category} onValueChange={setCategory} className="mb-6">
        <TabsList className="flex-wrap h-auto gap-1">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat} className="text-xs">
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search mutual funds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="return1Y">1Y Returns</SelectItem>
            <SelectItem value="return3Y">3Y Returns</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="aum">AUM</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {(fundListError || fundDetailsError) ? (
        <p className="text-sm text-loss mb-4">Live mutual fund data is unavailable. Showing fallback values.</p>
      ) : null}

      {(fundListLoading && fundDetailsLoading && !topFundDetails?.length) ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="hover:border-primary/20 transition-colors">
              <CardContent className="pt-4 space-y-4">
                <SkeletonLoader className="h-6 w-40" />
                <SkeletonLoader className="h-10 w-full" />
                <SkeletonLoader className="h-4 w-32" />
                <SkeletonLoader className="h-5 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      {/* Fund Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {displayedFunds.map((fund) => {
          const isPositive = fund.change >= 0
          return (
            <Card key={fund.id} className="hover:border-primary/20 transition-colors">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-[10px]">{fund.category}</Badge>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-[10px]",
                          fund.risk === "Low" && "border-gain text-gain",
                          fund.risk === "Moderate" && "border-chart-4 text-chart-4",
                          fund.risk === "High" && "border-loss text-loss"
                        )}
                      >
                        {fund.risk} Risk
                      </Badge>
                    </div>
                    <Link href={`/mutual-funds/${fund.id}`}>
                      <h3 className="font-semibold mt-2 hover:text-primary transition-colors">{fund.name}</h3>
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">{fund.amc}</p>
                    {fund.date ? (
                      <p className="text-xs text-muted-foreground mt-1">As of {fund.date}</p>
                    ) : null}
                    
                    {/* Ratings */}
                    <div className="flex items-center gap-1 mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3 w-3",
                            i < fund.rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold">{"₹"}{fund.nav.toFixed(2)}</p>
                    <div className={cn(
                      "flex items-center justify-end gap-0.5 text-xs font-medium",
                      isPositive ? "text-gain" : "text-loss"
                    )}>
                      {isPositive ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {isPositive ? "+" : ""}{fund.change.toFixed(2)}%
                    </div>
                  </div>
                </div>

                {/* Returns Grid */}
                <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-[10px] text-muted-foreground">1Y Return</p>
                    <p className={cn(
                      "text-sm font-semibold",
                      fund.return1Y >= 0 ? "text-gain" : "text-loss"
                    )}>
                      {fund.return1Y >= 0 ? "+" : ""}{fund.return1Y.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">3Y Return</p>
                    <p className={cn(
                      "text-sm font-semibold",
                      fund.return3Y >= 0 ? "text-gain" : "text-loss"
                    )}>
                      {fund.return3Y >= 0 ? "+" : ""}{fund.return3Y.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">AUM</p>
                    <p className="text-sm font-semibold">{fund.aum}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Expense</p>
                    <p className="text-sm font-semibold">{fund.expenseRatio}%</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4">
                  <Button size="sm" className="flex-1 gap-1">
                    Start SIP
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Invest Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
