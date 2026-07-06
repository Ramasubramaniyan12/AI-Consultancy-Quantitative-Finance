"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
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
  Building2,
  Shield,
  Calculator,
  Star,
  ArrowUpDown,
  Filter,
} from "lucide-react"

// Sample FD data
const fdData = [
  {
    id: 1,
    bank: "State Bank of India",
    logo: "SBI",
    rating: "AAA",
    minDeposit: 1000,
    tenure: "1 Year",
    interestRate: 6.8,
    seniorRate: 7.3,
    specialRate: null,
    type: "Bank",
  },
  {
    id: 2,
    bank: "HDFC Bank",
    logo: "HDFC",
    rating: "AAA",
    minDeposit: 5000,
    tenure: "1 Year",
    interestRate: 7.0,
    seniorRate: 7.5,
    specialRate: 7.25,
    type: "Bank",
  },
  {
    id: 3,
    bank: "ICICI Bank",
    logo: "ICICI",
    rating: "AAA",
    minDeposit: 10000,
    tenure: "1 Year",
    interestRate: 6.9,
    seniorRate: 7.4,
    specialRate: null,
    type: "Bank",
  },
  {
    id: 4,
    bank: "Bajaj Finance",
    logo: "BAJ",
    rating: "AAA",
    minDeposit: 15000,
    tenure: "1 Year",
    interestRate: 8.1,
    seniorRate: 8.35,
    specialRate: 8.25,
    type: "NBFC",
  },
  {
    id: 5,
    bank: "Shriram Finance",
    logo: "SHR",
    rating: "AA+",
    minDeposit: 5000,
    tenure: "1 Year",
    interestRate: 8.5,
    seniorRate: 8.75,
    specialRate: null,
    type: "NBFC",
  },
  {
    id: 6,
    bank: "Mahindra Finance",
    logo: "MAH",
    rating: "AA+",
    minDeposit: 5000,
    tenure: "1 Year",
    interestRate: 8.25,
    seniorRate: 8.5,
    specialRate: null,
    type: "NBFC",
  },
  {
    id: 7,
    bank: "Axis Bank",
    logo: "AXIS",
    rating: "AAA",
    minDeposit: 5000,
    tenure: "1 Year",
    interestRate: 7.1,
    seniorRate: 7.6,
    specialRate: 7.35,
    type: "Bank",
  },
  {
    id: 8,
    bank: "Kotak Mahindra Bank",
    logo: "KOTAK",
    rating: "AAA",
    minDeposit: 5000,
    tenure: "1 Year",
    interestRate: 6.75,
    seniorRate: 7.25,
    specialRate: null,
    type: "Bank",
  },
]

// Sample RD data
const rdData = [
  {
    id: 1,
    bank: "State Bank of India",
    logo: "SBI",
    rating: "AAA",
    minDeposit: 100,
    tenure: "12 Months",
    interestRate: 6.5,
    seniorRate: 7.0,
    type: "Bank",
  },
  {
    id: 2,
    bank: "HDFC Bank",
    logo: "HDFC",
    rating: "AAA",
    minDeposit: 500,
    tenure: "12 Months",
    interestRate: 6.75,
    seniorRate: 7.25,
    type: "Bank",
  },
  {
    id: 3,
    bank: "ICICI Bank",
    logo: "ICICI",
    rating: "AAA",
    minDeposit: 500,
    tenure: "12 Months",
    interestRate: 6.6,
    seniorRate: 7.1,
    type: "Bank",
  },
  {
    id: 4,
    bank: "Post Office",
    logo: "POST",
    rating: "Sovereign",
    minDeposit: 100,
    tenure: "12 Months",
    interestRate: 6.7,
    seniorRate: 6.7,
    type: "Government",
  },
  {
    id: 5,
    bank: "Axis Bank",
    logo: "AXIS",
    rating: "AAA",
    minDeposit: 500,
    tenure: "12 Months",
    interestRate: 6.85,
    seniorRate: 7.35,
    type: "Bank",
  },
]

export default function FDRDPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [depositType, setDepositType] = React.useState("fd")
  const [providerType, setProviderType] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("interest")
  
  // Calculator state
  const [principal, setPrincipal] = React.useState(100000)
  const [rate, setRate] = React.useState(7.5)
  const [tenure, setTenure] = React.useState(12)
  
  const calculateMaturity = () => {
    const years = tenure / 12
    const maturityAmount = principal * Math.pow((1 + rate / 100), years)
    const interest = maturityAmount - principal
    return { maturityAmount, interest }
  }
  
  const { maturityAmount, interest } = calculateMaturity()

  const currentData = depositType === "fd" ? fdData : rdData
  
  const filteredData = currentData.filter(item => {
    const matchesSearch = item.bank.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = providerType === "all" || item.type.toLowerCase() === providerType.toLowerCase()
    return matchesSearch && matchesType
  }).sort((a, b) => {
    if (sortBy === "interest") return b.interestRate - a.interestRate
    if (sortBy === "rating") return a.rating.localeCompare(b.rating)
    if (sortBy === "minDeposit") return a.minDeposit - b.minDeposit
    return 0
  })

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Fixed & Recurring Deposits</h1>
        <p className="text-muted-foreground mt-1">
          Compare interest rates across banks and NBFCs
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
                <p className="text-xs text-muted-foreground">Highest FD Rate</p>
                <p className="text-lg font-semibold text-foreground">8.50%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Banks Listed</p>
                <p className="text-lg font-semibold text-foreground">45+</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-3/10">
                <Shield className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Insurance Cover</p>
                <p className="text-lg font-semibold text-foreground">5 Lakhs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-4/10">
                <Star className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Senior Citizen Bonus</p>
                <p className="text-lg font-semibold text-foreground">+0.50%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tabs */}
          <Tabs value={depositType} onValueChange={setDepositType}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="fd">Fixed Deposits</TabsTrigger>
              <TabsTrigger value="rd">Recurring Deposits</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Filters */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search banks or NBFCs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={providerType} onValueChange={setProviderType}>
                  <SelectTrigger className="w-full sm:w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Provider Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Providers</SelectItem>
                    <SelectItem value="bank">Banks</SelectItem>
                    <SelectItem value="nbfc">NBFCs</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-40">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interest">Highest Interest</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="minDeposit">Min Deposit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Institution</TableHead>
                    <TableHead className="text-right">Interest Rate</TableHead>
                    <TableHead className="text-right hidden sm:table-cell">Senior Rate</TableHead>
                    <TableHead className="text-right hidden md:table-cell">Min. Deposit</TableHead>
                    <TableHead className="text-right">Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item.id} className="cursor-pointer hover:bg-secondary/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-xs font-semibold text-foreground">
                            {item.logo}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{item.bank}</p>
                            <p className="text-xs text-muted-foreground">{item.type}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-semibold text-gain">{item.interestRate}%</span>
                          {item.specialRate && (
                            <Badge variant="outline" className="text-[10px] mt-1">
                              Special: {item.specialRate}%
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right hidden sm:table-cell">
                        <span className="font-medium text-foreground">{item.seniorRate}%</span>
                      </TableCell>
                      <TableCell className="text-right hidden md:table-cell">
                        <span className="text-muted-foreground">
                          {item.minDeposit.toLocaleString("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 })}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge 
                          variant="secondary"
                          className={
                            item.rating === "AAA" 
                              ? "bg-gain/10 text-gain" 
                              : item.rating === "Sovereign"
                              ? "bg-primary/10 text-primary"
                              : "bg-chart-3/10 text-chart-3"
                          }
                        >
                          {item.rating}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Calculator Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                FD Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Principal Amount */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Principal Amount</span>
                  <span className="font-medium text-foreground">
                    {principal.toLocaleString("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 })}
                  </span>
                </div>
                <Slider
                  value={[principal]}
                  onValueChange={(value) => setPrincipal(value[0])}
                  min={10000}
                  max={1000000}
                  step={10000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>10K</span>
                  <span>10L</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Interest Rate</span>
                  <span className="font-medium text-foreground">{rate}%</span>
                </div>
                <Slider
                  value={[rate]}
                  onValueChange={(value) => setRate(value[0])}
                  min={4}
                  max={10}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>4%</span>
                  <span>10%</span>
                </div>
              </div>

              {/* Tenure */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tenure</span>
                  <span className="font-medium text-foreground">{tenure} months</span>
                </div>
                <Slider
                  value={[tenure]}
                  onValueChange={(value) => setTenure(value[0])}
                  min={6}
                  max={120}
                  step={6}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>6 mo</span>
                  <span>10 yr</span>
                </div>
              </div>

              {/* Results */}
              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Interest Earned</span>
                  <span className="font-semibold text-gain">
                    {interest.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Maturity Amount</span>
                  <span className="font-bold text-lg text-foreground">
                    {maturityAmount.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">About FD Insurance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Deposits up to Rs. 5 lakhs are insured under the Deposit Insurance and Credit 
                Guarantee Corporation (DICGC). This covers both principal and interest.
              </p>
              <Button variant="link" className="px-0 mt-2 h-auto text-primary">
                Learn more about deposit safety
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
