"use client"

import * as React from "react"
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
  Shield,
  Clock,
  ArrowUpDown,
  Filter,
  Star,
  Info,
} from "lucide-react"

// Sample bond data
const bondData = [
  {
    id: 1,
    name: "Government of India 7.26% 2033",
    issuer: "Government of India",
    type: "G-Sec",
    coupon: 7.26,
    yield: 7.15,
    maturity: "Jan 2033",
    rating: "Sovereign",
    faceValue: 100,
    price: 101.45,
    minInvestment: 10000,
  },
  {
    id: 2,
    name: "REC Ltd 7.45% 2027",
    issuer: "REC Limited",
    type: "PSU",
    coupon: 7.45,
    yield: 7.52,
    maturity: "Mar 2027",
    rating: "AAA",
    faceValue: 1000,
    price: 998.50,
    minInvestment: 10000,
  },
  {
    id: 3,
    name: "HDFC Ltd 7.95% 2028",
    issuer: "HDFC Ltd",
    type: "Corporate",
    coupon: 7.95,
    yield: 8.05,
    maturity: "Sep 2028",
    rating: "AAA",
    faceValue: 1000,
    price: 995.25,
    minInvestment: 10000,
  },
  {
    id: 4,
    name: "NHAI 7.30% 2030",
    issuer: "NHAI",
    type: "PSU",
    coupon: 7.30,
    yield: 7.38,
    maturity: "Dec 2030",
    rating: "AAA",
    faceValue: 1000,
    price: 997.80,
    minInvestment: 10000,
  },
  {
    id: 5,
    name: "IRFC 7.15% 2026",
    issuer: "IRFC",
    type: "PSU",
    coupon: 7.15,
    yield: 7.22,
    maturity: "Jun 2026",
    rating: "AAA",
    faceValue: 1000,
    price: 999.10,
    minInvestment: 10000,
  },
  {
    id: 6,
    name: "Tata Capital 8.25% 2027",
    issuer: "Tata Capital",
    type: "Corporate",
    coupon: 8.25,
    yield: 8.35,
    maturity: "Apr 2027",
    rating: "AA+",
    faceValue: 1000,
    price: 996.50,
    minInvestment: 10000,
  },
  {
    id: 7,
    name: "SBI 7.55% 2029",
    issuer: "State Bank of India",
    type: "Bank",
    coupon: 7.55,
    yield: 7.62,
    maturity: "Aug 2029",
    rating: "AAA",
    faceValue: 1000,
    price: 998.25,
    minInvestment: 10000,
  },
  {
    id: 8,
    name: "LIC Housing 8.10% 2028",
    issuer: "LIC Housing Finance",
    type: "Corporate",
    coupon: 8.10,
    yield: 8.18,
    maturity: "Nov 2028",
    rating: "AAA",
    faceValue: 1000,
    price: 997.50,
    minInvestment: 10000,
  },
]

export default function BondsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [bondType, setBondType] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("yield")

  const filteredData = bondData.filter(bond => {
    const matchesSearch = bond.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bond.issuer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = bondType === "all" || bond.type.toLowerCase() === bondType.toLowerCase()
    return matchesSearch && matchesType
  }).sort((a, b) => {
    if (sortBy === "yield") return b.yield - a.yield
    if (sortBy === "coupon") return b.coupon - a.coupon
    if (sortBy === "rating") return a.rating.localeCompare(b.rating)
    return 0
  })

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Bonds</h1>
        <p className="text-muted-foreground mt-1">
          Invest in government securities, PSU bonds, and corporate bonds
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gain/10">
                <TrendingUp className="h-5 w-5 text-gain" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">10Y G-Sec Yield</p>
                <p className="text-lg font-semibold text-foreground">7.15%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">AAA Bonds</p>
                <p className="text-lg font-semibold text-foreground">
                  {bondData.filter(b => b.rating === "AAA" || b.rating === "Sovereign").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-3/10">
                <Clock className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Maturity</p>
                <p className="text-lg font-semibold text-foreground">4.5 Years</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-4/10">
                <Info className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Bonds Available</p>
                <p className="text-lg font-semibold text-foreground">{bondData.length}+</p>
              </div>
            </div>
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
                placeholder="Search bonds by name or issuer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={bondType} onValueChange={setBondType}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Bond Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="g-sec">G-Sec</SelectItem>
                <SelectItem value="psu">PSU Bonds</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
                <SelectItem value="bank">Bank Bonds</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-40">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yield">Highest Yield</SelectItem>
                <SelectItem value="coupon">Highest Coupon</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bonds Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bond</TableHead>
                <TableHead className="text-right">Coupon</TableHead>
                <TableHead className="text-right">Yield</TableHead>
                <TableHead className="text-right hidden sm:table-cell">Maturity</TableHead>
                <TableHead className="text-right hidden md:table-cell">Price</TableHead>
                <TableHead className="text-right">Rating</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((bond) => (
                <TableRow key={bond.id} className="cursor-pointer hover:bg-secondary/50">
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{bond.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">{bond.issuer}</span>
                        <Badge variant="outline" className="text-[10px]">{bond.type}</Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-medium text-foreground">{bond.coupon}%</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold text-gain">{bond.yield}%</span>
                  </TableCell>
                  <TableCell className="text-right hidden sm:table-cell">
                    <span className="text-muted-foreground">{bond.maturity}</span>
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell">
                    <span className="text-muted-foreground">
                      {bond.price.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge 
                      variant="secondary"
                      className={
                        bond.rating === "Sovereign" 
                          ? "bg-primary/10 text-primary"
                          : bond.rating === "AAA"
                          ? "bg-gain/10 text-gain"
                          : "bg-chart-3/10 text-chart-3"
                      }
                    >
                      {bond.rating}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Star className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}
