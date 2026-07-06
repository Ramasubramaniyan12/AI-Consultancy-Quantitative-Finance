"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {
  Star,
  Plus,
  Search,
  MoreHorizontal,
  Bell,
  Trash2,
  TrendingUp,
  TrendingDown,
  FolderPlus,
  Edit,
  ArrowRight,
  Briefcase,
  CreditCard,
  Landmark,
  Building2,
  GraduationCap,
  ShieldCheck,
  ReceiptText,
  FileText,
  Circle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { PortfolioChart } from "@/components/portfolio-chart"
import { PortfolioHealth } from "@/components/portfolio-health"
import { AISuggestions } from "@/components/ai-suggestions"
import { QuantitativeMetrics } from "@/components/quantitative-metrics"

interface WatchlistItem {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  type: "stock" | "mutualfund" | "etf" | "crypto"
  alertSet?: boolean
  alertPrice?: number
}

interface WatchlistGroup {
  id: string
  name: string
  items: WatchlistItem[]
}

const initialWatchlists: WatchlistGroup[] = [
  {
    id: "default",
    name: "My Watchlist",
    items: [
      { symbol: "RELIANCE", name: "Reliance Industries", price: 2847.50, change: 35.20, changePercent: 1.24, type: "stock", alertSet: true, alertPrice: 3000 },
      { symbol: "TCS", name: "Tata Consultancy Services", price: 4125.80, change: -23.40, changePercent: -0.56, type: "stock" },
      { symbol: "HDFCBANK", name: "HDFC Bank", price: 1678.25, change: 14.85, changePercent: 0.89, type: "stock", alertSet: true, alertPrice: 1700 },
      { symbol: "INFY", name: "Infosys", price: 1542.60, change: -17.45, changePercent: -1.12, type: "stock" },
      { symbol: "BHARTIARTL", name: "Bharti Airtel", price: 1425.30, change: 32.65, changePercent: 2.34, type: "stock" },
    ],
  },
  {
    id: "crypto",
    name: "Crypto Portfolio",
    items: [
      { symbol: "BTC", name: "Bitcoin", price: 5842500, change: 185420, changePercent: 3.28, type: "crypto" },
      { symbol: "ETH", name: "Ethereum", price: 312450, change: -4520, changePercent: -1.43, type: "crypto" },
      { symbol: "SOL", name: "Solana", price: 14850, change: 425, changePercent: 2.95, type: "crypto" },
    ],
  },
  {
    id: "funds",
    name: "Mutual Funds",
    items: [
      { symbol: "HDFC-FLEXI", name: "HDFC Flexi Cap Fund", price: 1425.60, change: 12.45, changePercent: 0.88, type: "mutualfund" },
      { symbol: "AXIS-BLUECHIP", name: "Axis Bluechip Fund", price: 52.85, change: 0.42, changePercent: 0.80, type: "mutualfund" },
    ],
  },
]

const searchResults: WatchlistItem[] = [
  { symbol: "ICICIBANK", name: "ICICI Bank Ltd", price: 1089.45, change: 8.75, changePercent: 0.81, type: "stock" },
  { symbol: "SBIN", name: "State Bank of India", price: 628.90, change: -4.20, changePercent: -0.66, type: "stock" },
  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", price: 1785.40, change: 18.90, changePercent: 1.07, type: "stock" },
  { symbol: "TATAMOTORS", name: "Tata Motors Ltd", price: 945.80, change: 50.65, changePercent: 5.67, type: "stock" },
]

const financeTabs = [
  { value: "credit-cards", label: "Credit Cards" },
  { value: "banking", label: "Banking" },
  { value: "mortgages", label: "Mortgages" },
  { value: "student-loans", label: "Student Loans" },
  { value: "personal-loans", label: "Personal Loans" },
  { value: "insurance", label: "Insurance" },
  { value: "taxes", label: "Taxes" },
]

const creditCards = [
  {
    id: "premium-card",
    name: "Premium Credit Card",
    issuer: "HDFC Bank",
    cardNumber: "•••• •••• •••• 5847",
    limit: 500000,
    used: 128450,
    available: 371550,
    status: "Active",
    interestRate: "0% for 45 days",
    annualFee: "₹2,500",
    rewardPoints: "15,420",
  },
  {
    id: "business-card",
    name: "Business Card",
    issuer: "ICICI Bank",
    cardNumber: "•••• •••• •••• 2341",
    limit: 1000000,
    used: 456780,
    available: 543220,
    status: "Active",
    interestRate: "0% for 60 days",
    annualFee: "₹5,000",
    rewardPoints: "42,150",
  },
  {
    id: "travel-card",
    name: "Travel Card",
    issuer: "Axis Bank",
    cardNumber: "•••• •••• •••• 7652",
    limit: 300000,
    used: 0,
    available: 300000,
    status: "Active",
    interestRate: "18% p.a.",
    annualFee: "₹1,500",
    rewardPoints: "8,320",
  },
]

const bankingAccounts = [
  {
    id: "hdfc-savings",
    bank: "HDFC Bank",
    accountType: "Savings",
    accountNumber: "•••• •••• •••• 2847",
    balance: 245680,
    status: "Active",
    interestRate: "4.5% p.a.",
    statementDate: "Jul 5, 2026",
    transactionCount: 12,
    lastTransaction: "₹5,000 Debit (Jul 4)",
  },
  {
    id: "icici-current",
    bank: "ICICI Bank",
    accountType: "Current",
    balance: 1875420,
    status: "Active",
    interestRate: "0% (Current)",
    statementDate: "Jul 3, 2026",
    transactionCount: 58,
    lastTransaction: "₹25,000 Credit (Jul 4)",
    accountNumber: "•••• •••• •••• 5421",
  },
  {
    id: "axis-savings",
    bank: "Axis Bank",
    accountType: "Savings",
    balance: 842150,
    status: "Active",
    interestRate: "5% p.a. (On balance >5L)",
    statementDate: "Jun 28, 2026",
    transactionCount: 8,
    lastTransaction: "₹10,000 Debit (Jul 2)",
    accountNumber: "•••• •••• •••• 9876",
  },
]

const mortgageDetails = {
  property: "Apartment, Mumbai",
  address: "101, Marine Drive, Mumbai - 400020",
  lender: "HDFC Bank",
  loanAmount: 5000000,
  originalAmount: 6000000,
  loanTerm: "20 years",
  remainingTerm: "15 years 4 months",
  interestRate: "7.2% p.a. (Fixed)",
  monthlyEmi: 42850,
  totalPaid: 2052000,
  remainingBalance: 3948000,
  progressPercent: 34,
  nextEmiDate: "August 5, 2026",
  propertyTax: "₹8,500 (Annual)",
  insurance: "₹12,000 (Annual)",
  status: "On-time",
}

const studentLoan = {
  course: "MBA, IIM Ahmedabad",
  duration: "2 years (completed)",
  provider: "ICICI Bank Education Loan",
  originalLoan: 1800000,
  disbursed: 1800000,
  interestRate: "8.5% p.a. (Fixed)",
  repaymentPeriod: "7 years",
  monthlyEmi: 28450,
  moratorium: "6 months (ended)",
  remainingTerm: "6 years 2 months",
  totalPaid: 342600,
  remainingBalance: 1457400,
  progressPercent: 19,
  nextEmiDate: "August 10, 2026",
  status: "Active",
  moratoriumAvailed: "Yes (6 months)",
}

const personalLoan = {
  purpose: "Home Renovation",
  provider: "Bajaj Finserv",
  originalLoan: 800000,
  interestRate: "12% p.a.",
  loanTerm: "5 years",
  monthlyEmi: 18350,
  totalPaid: 275250,
  remainingBalance: 524750,
  progressPercent: 34,
  nextEmiDate: "August 8, 2026",
  processingFee: "₹8,000 (paid)",
  emIsPaid: 15,
  remainingEmis: 45,
  status: "Good Standing",
  prepaymentPenalty: "None",
}

const insurancePolicies = [
  {
    id: "life-insurance",
    type: "Life Insurance",
    provider: "HDFC Life",
    policyNumber: "HDFC/2018/456789",
    plan: "Secure Plus",
    coverage: "₹50,00,000",
    premium: "₹2,500/month (₹30,000/year)",
    policyTerm: "25 years (end: 2043)",
    status: "Active",
    claimRatio: "98.5%",
    maturityAmount: "₹75,00,000",
    bonusAccrued: "₹2,34,500",
    nextPremiumDue: "August 10, 2026",
  },
  {
    id: "health-insurance",
    type: "Health Insurance",
    provider: "Aditya Birla Health",
    policyNumber: "AB/2021/123456",
    plan: "Comprehensive Plus",
    coverage: "₹15,00,000 (individual)",
    premium: "₹1,200/month (₹14,400/year)",
    policyTerm: "Active (annual renewal)",
    status: "Active",
    copay: "0%",
    networkHospitals: "8,500+",
    lastClaim: "March 2026 (₹45,000 approved)",
    renewalDate: "September 15, 2026",
  },
  {
    id: "auto-insurance",
    type: "Auto Insurance",
    provider: "National Insurance",
    policyNumber: "NI/2023/789012",
    plan: "Comprehensive",
    coverage: "Comprehensive",
    premium: "₹6,500/year",
    policyTerm: "Valid till Aug 15, 2026",
    status: "Active",
    claimBonus: "20% (No claims)",
    thirdPartyLiability: "₹1 Cr",
    cashlessNetwork: "5,000+ workshops",
    lastPremiumDate: "Aug 15, 2025",
  },
]

const taxSummary = {
  financialYear: "2025-26",
  totalIncome: "₹28,50,000",
  salary: "₹24,00,000",
  interestIncome: "₹2,10,000",
  dividendIncome: "₹1,40,000",
  otherIncome: "₹1,00,000",
  deductions: {
    c80: "₹1,50,000",
    d80: "₹14,400",
    tta80: "₹10,000",
    mortgageInterest: "₹2,50,000",
  },
  totalDeductions: "₹4,24,400",
  taxableIncome: "₹24,25,600",
  estimatedTaxLiability: "₹2,85,400",
  taxPaid: "₹2,40,000",
  refundExpected: "₹45,400",
  filingStatus: "Due - July 31, 2026",
  lastFiling: "Aug 10, 2025 (FY 2024-25)",
}

export default function WatchlistPage() {
  const [watchlists, setWatchlists] = React.useState<WatchlistGroup[]>(initialWatchlists)
  const [activeGroup, setActiveGroup] = React.useState("default")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showSearch, setShowSearch] = React.useState(false)
  const [newListName, setNewListName] = React.useState("")
  const [showNewListDialog, setShowNewListDialog] = React.useState(false)
  const [alertDialogOpen, setAlertDialogOpen] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState<WatchlistItem | null>(null)
  const [alertPrice, setAlertPrice] = React.useState("")
  const [activeFinanceTab, setActiveFinanceTab] = React.useState("credit-cards")
  const [expandedFinanceCard, setExpandedFinanceCard] = React.useState<string | null>(null)

  const currentWatchlist = watchlists.find((w) => w.id === activeGroup) || watchlists[0]

  const filteredSearchResults = searchResults.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addToWatchlist = (item: WatchlistItem) => {
    setWatchlists(
      watchlists.map((w) =>
        w.id === activeGroup
          ? { ...w, items: [...w.items, item] }
          : w
      )
    )
    setSearchQuery("")
    setShowSearch(false)
  }

  const removeFromWatchlist = (symbol: string) => {
    setWatchlists(
      watchlists.map((w) =>
        w.id === activeGroup
          ? { ...w, items: w.items.filter((i) => i.symbol !== symbol) }
          : w
      )
    )
  }

  const createNewList = () => {
    if (newListName.trim()) {
      const newList: WatchlistGroup = {
        id: newListName.toLowerCase().replace(/\s/g, "-"),
        name: newListName,
        items: [],
      }
      setWatchlists([...watchlists, newList])
      setActiveGroup(newList.id)
      setNewListName("")
      setShowNewListDialog(false)
    }
  }

  const setAlert = () => {
    if (selectedItem && alertPrice) {
      setWatchlists(
        watchlists.map((w) =>
          w.id === activeGroup
            ? {
                ...w,
                items: w.items.map((i) =>
                  i.symbol === selectedItem.symbol
                    ? { ...i, alertSet: true, alertPrice: Number(alertPrice) }
                    : i
                ),
              }
            : w
        )
      )
      setAlertDialogOpen(false)
      setSelectedItem(null)
      setAlertPrice("")
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Briefcase className="h-8 w-8" />
            My Portfolio
          </h1>
          <p className="mt-1" style={{ color: 'var(--text-label)' }}>
            Track your investments and view detailed portfolio analysis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setShowSearch(true)}
          >
            <Plus className="h-4 w-4" />
            Add Asset
          </Button>
          <Dialog open={showNewListDialog} onOpenChange={setShowNewListDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <FolderPlus className="h-4 w-4" />
                New List
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Watchlist</DialogTitle>
                <DialogDescription>
                  Create a new watchlist to organize your investments.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Label htmlFor="name">List Name</Label>
                <Input
                  id="name"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="e.g., Tech Stocks"
                  className="mt-2"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewListDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={createNewList}>Create List</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Portfolio Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column - Portfolio Summary Stats */}
        <div className="lg:col-span-2">
          <Card className="bg-[var(--bg-card)] border-[var(--border-color)] shadow-[var(--card-shadow)]">
            <CardHeader>
              <CardTitle className="text-lg text-[var(--text-primary)]">Portfolio Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[var(--bg-card-inner)] rounded-lg p-4">
                  <p className="text-sm text-[var(--text-label)]">Total Value</p>
                  <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">₹13,24,500</p>
                  <div className="flex items-center gap-1 mt-2 text-sm" style={{ color: 'var(--icon-green-text)' }}>
                    <TrendingUp className="h-4 w-4" />
                    <span>+₹12,450 (0.95%) today</span>
                  </div>
                </div>
                <div className="bg-[var(--bg-card-inner)] rounded-lg p-4">
                  <p className="text-sm text-[var(--text-label)]">Total Returns</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--icon-green-text)' }}>+₹3,24,500</p>
                  <p className="text-sm text-[var(--text-secondary)] mt-2">+32.45% all time</p>
                </div>
                <div className="bg-[var(--bg-card-inner)] rounded-lg p-4">
                  <p className="text-sm text-[var(--text-label)]">Invested Amount</p>
                  <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">₹10,00,000</p>
                  <p className="text-sm text-[var(--text-secondary)] mt-2">Since Jan 2024</p>
                </div>
              </div>

              {/* Chart */}
              <div className="mt-6">
                <PortfolioChart />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Portfolio Health */}
        <div>
          <PortfolioHealth />
        </div>
      </div>

      {/* AI Suggestions Section */}
      <div className="mb-8">
        <AISuggestions />
      </div>

      {/* Quantitative Metrics Section */}
      <div className="mb-8">
        <QuantitativeMetrics />
      </div>

      {/* Watchlist Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>My Watchlists</h2>
      </div>

      {/* Watchlist Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {watchlists.map((list) => (
          <Button
            key={list.id}
            variant={activeGroup === list.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveGroup(list.id)}
            className="shrink-0"
          >
            {list.name}
            <Badge
              variant="secondary"
              className={cn(
                "ml-2 text-[10px]",
                activeGroup === list.id && "bg-primary-foreground/20 text-primary-foreground"
              )}
            >
              {list.items.length}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Search Modal */}
      {showSearch && (
        <Card className="mb-6">
          <CardContent className="pt-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for stocks, ETFs, mutual funds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>
            {searchQuery && (
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {filteredSearchResults.map((item) => (
                  <button
                    key={item.symbol}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors text-left"
                    onClick={() => addToWatchlist(item)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center">
                        <span className="text-xs font-bold">{item.symbol.slice(0, 2)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.symbol}</p>
                        <p className="text-xs text-muted-foreground">{item.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-semibold text-sm">{"₹"}{item.price.toLocaleString("en-IN")}</p>
                        <div className={cn(
                          "text-xs font-medium",
                          item.changePercent >= 0 ? "text-gain" : "text-loss"
                        )}>
                          {item.changePercent >= 0 ? "+" : ""}{item.changePercent.toFixed(2)}%
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </button>
                ))}
              </div>
            )}
            <Button
              variant="ghost"
              className="w-full mt-2"
              onClick={() => {
                setShowSearch(false)
                setSearchQuery("")
              }}
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Watchlist Items */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{currentWatchlist.name}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Rename List
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-loss">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete List
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {currentWatchlist.items.length > 0 ? (
            <div className="divide-y divide-border">
              {currentWatchlist.items.map((item) => {
                const isPositive = item.changePercent >= 0
                return (
                  <div
                    key={item.symbol}
                    className="flex items-center justify-between px-6 py-4 hover:bg-secondary/30 transition-colors"
                  >
                    <Link
                      href={`/stocks/${item.symbol.toLowerCase()}`}
                      className="flex items-center gap-3 flex-1"
                    >
                      <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                        <span className="text-xs font-bold">{item.symbol.slice(0, 2)}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{item.symbol}</span>
                          {item.alertSet && (
                            <Badge variant="outline" className="text-[10px] gap-1">
                              <Bell className="h-3 w-3" />
                              {"₹"}{item.alertPrice?.toLocaleString("en-IN")}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{item.name}</p>
                      </div>
                    </Link>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">{"₹"}{item.price.toLocaleString("en-IN")}</p>
                        <div className={cn(
                          "flex items-center justify-end gap-0.5 text-sm font-medium",
                          isPositive ? "text-gain" : "text-loss"
                        )}>
                          {isPositive ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          <span>
                            {isPositive ? "+" : ""}{"₹"}{Math.abs(item.change).toLocaleString("en-IN")} ({item.changePercent.toFixed(2)}%)
                          </span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/stocks/${item.symbol.toLowerCase()}`}>
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/compare?assets=${item.symbol}`}>
                              Compare
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedItem(item)
                              setAlertPrice(item.alertPrice?.toString() || "")
                              setAlertDialogOpen(true)
                            }}
                          >
                            <Bell className="mr-2 h-4 w-4" />
                            Set Alert
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-loss"
                            onClick={() => removeFromWatchlist(item.symbol)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No items in this list</h3>
              <p className="text-muted-foreground mb-4">
                Start adding stocks, ETFs, or mutual funds to track them.
              </p>
              <Button onClick={() => setShowSearch(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Asset
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Personal Finance Manager */}
      <Card className="mb-8 bg-[var(--bg-card)] border-[var(--border-color)] shadow-[var(--card-shadow)]">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-lg text-[var(--text-primary)]">Personal Finance Manager</CardTitle>
              <p className="text-sm mt-1 text-[var(--text-label)]">Manage all your financial accounts</p>
            </div>
            <Badge variant="outline" className="w-fit text-[11px]">Sample data</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={activeFinanceTab} onValueChange={setActiveFinanceTab} className="space-y-4">
            <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-lg bg-[var(--bg-card-inner)] p-2">
              {financeTabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className="rounded-md px-3 py-2 text-sm">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="credit-cards" className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">+ Add New Card</Button>
                <Button variant="outline" size="sm">Consolidate</Button>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                {creditCards.map((card) => {
                  const percent = Math.round((card.used / card.limit) * 100)
                  const expanded = expandedFinanceCard === card.id
                  return (
                    <div key={card.id} className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4 shadow-sm">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-[var(--text-primary)]">{card.name}</p>
                          <p className="text-sm text-[var(--text-label)]">{card.issuer}</p>
                        </div>
                        <Badge variant="outline" className="text-[11px]">{card.status}</Badge>
                      </div>
                      <div className="mt-4 space-y-3 text-sm text-[var(--text-primary)]">
                        <div className="flex items-center justify-between">
                          <span className="text-[var(--text-label)]">Card Number</span>
                          <span>{card.cardNumber}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[var(--text-label)]">Limit</span>
                          <span>₹{card.limit.toLocaleString("en-IN")}</span>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-[var(--text-label)]">Used</span>
                            <span>₹{card.used.toLocaleString("en-IN")}</span>
                          </div>
                          <div className="h-2 rounded-full bg-[var(--bg-card)] overflow-hidden">
                            <div className="h-2 rounded-full bg-[var(--icon-green-text)]" style={{ width: `${percent}%` }} />
                          </div>
                          <p className="mt-2 text-xs text-[var(--text-label)]">Available: ₹{card.available.toLocaleString("en-IN")}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-[var(--text-label)]">
                          <div className="rounded-md bg-[var(--bg-card)] p-2">Interest: {card.interestRate}</div>
                          <div className="rounded-md bg-[var(--bg-card)] p-2">Annual Fee: {card.annualFee}</div>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">View Statements</Button>
                        <Button variant="outline" size="sm">Pay Now</Button>
                        <Button variant="ghost" size="sm" onClick={() => setExpandedFinanceCard(expanded ? null : card.id)}>
                          {expanded ? <ChevronUp className="mr-1 h-4 w-4" /> : <ChevronDown className="mr-1 h-4 w-4" />}
                          {expanded ? "Less" : "More"}
                        </Button>
                      </div>
                      {expanded && (
                        <div className="mt-3 rounded-md border border-[var(--border-color)] bg-[var(--bg-card)] p-3 text-sm text-[var(--text-label)]">
                          <p>Reward points: {card.rewardPoints}</p>
                          <p className="mt-1">Status: {card.status}</p>
                          <p className="mt-1">Sample actions are ready for live account sync.</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="banking" className="space-y-4">
              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-[var(--text-label)]">Total Balance</p>
                    <p className="text-lg font-semibold text-[var(--text-primary)]">₹30,63,250</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-label)]">Active Accounts</p>
                    <p className="text-lg font-semibold text-[var(--text-primary)]">3</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-label)]">Pending Transfers</p>
                    <p className="text-lg font-semibold text-[var(--text-primary)]">0</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-[var(--text-label)]">All accounts connected</p>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {bankingAccounts.map((account) => {
                  const expanded = expandedFinanceCard === account.id
                  return (
                    <div key={account.id} className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4 shadow-sm">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-[var(--text-primary)]">{account.bank}</p>
                          <p className="text-sm text-[var(--text-label)]">{account.accountType}</p>
                        </div>
                        <Badge variant="outline" className="text-[11px]">{account.status}</Badge>
                      </div>
                      <div className="mt-4 space-y-3 text-sm">
                        <div className="flex items-center justify-between text-[var(--text-primary)]">
                          <span className="text-[var(--text-label)]">Account Number</span>
                          <span>{account.accountNumber}</span>
                        </div>
                        <div className="flex items-center justify-between text-[var(--text-primary)]">
                          <span className="text-[var(--text-label)]">Balance</span>
                          <span className="font-semibold">₹{account.balance.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex items-center justify-between text-[var(--text-label)]">
                          <span>Interest Rate</span>
                          <span>{account.interestRate}</span>
                        </div>
                        <div className="flex items-center justify-between text-[var(--text-label)]">
                          <span>Last 30 days</span>
                          <span>{account.transactionCount} transactions</span>
                        </div>
                        <div className="rounded-md bg-[var(--bg-card)] p-3 text-xs text-[var(--text-label)]">
                          <p>Monthly statement: {account.statementDate}</p>
                          <p className="mt-1">Last transaction: {account.lastTransaction}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">View Statement</Button>
                        <Button variant="outline" size="sm">Manage</Button>
                        <Button variant="ghost" size="sm" onClick={() => setExpandedFinanceCard(expanded ? null : account.id)}>
                          {expanded ? <ChevronUp className="mr-1 h-4 w-4" /> : <ChevronDown className="mr-1 h-4 w-4" />}
                          {expanded ? "Less" : "More"}
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="mortgages" className="space-y-4">
              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">{mortgageDetails.property}</p>
                    <p className="text-sm text-[var(--text-label)]">{mortgageDetails.address}</p>
                  </div>
                  <Badge variant="outline" className="w-fit">{mortgageDetails.status}</Badge>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[var(--text-label)]">
                  <div className="rounded-md bg-[var(--bg-card)] p-3">Lender: {mortgageDetails.lender}</div>
                  <div className="rounded-md bg-[var(--bg-card)] p-3">Loan Amount: ₹{mortgageDetails.loanAmount.toLocaleString("en-IN")}</div>
                  <div className="rounded-md bg-[var(--bg-card)] p-3">Remaining Balance: ₹{mortgageDetails.remainingBalance.toLocaleString("en-IN")}</div>
                  <div className="rounded-md bg-[var(--bg-card)] p-3">Monthly EMI: ₹{mortgageDetails.monthlyEmi.toLocaleString("en-IN")}</div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-[var(--text-label)] mb-2">
                    <span>Paid</span>
                    <span>{mortgageDetails.progressPercent}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--bg-card)] overflow-hidden">
                    <div className="h-2 rounded-full bg-[var(--icon-green-text)]" style={{ width: `${mortgageDetails.progressPercent}%` }} />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">Pay EMI</Button>
                  <Button variant="outline" size="sm">Refinance</Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="rounded-md border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-3 text-[var(--text-label)]">Total Mortgage Debt: ₹{mortgageDetails.remainingBalance.toLocaleString("en-IN")}</div>
                <div className="rounded-md border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-3 text-[var(--text-label)]">Next Payment Due: {mortgageDetails.nextEmiDate}</div>
              </div>
            </TabsContent>

            <TabsContent value="student-loans" className="space-y-4">
              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">{studentLoan.course}</p>
                    <p className="text-sm text-[var(--text-label)]">{studentLoan.provider}</p>
                  </div>
                  <Badge variant="outline" className="w-fit">{studentLoan.status}</Badge>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[var(--text-label)]">
                  <div className="rounded-md bg-[var(--bg-card)] p-3">Original Loan: ₹{studentLoan.originalLoan.toLocaleString("en-IN")}</div>
                  <div className="rounded-md bg-[var(--bg-card)] p-3">Remaining Balance: ₹{studentLoan.remainingBalance.toLocaleString("en-IN")}</div>
                  <div className="rounded-md bg-[var(--bg-card)] p-3">Interest Rate: {studentLoan.interestRate}</div>
                  <div className="rounded-md bg-[var(--bg-card)] p-3">Monthly EMI: ₹{studentLoan.monthlyEmi.toLocaleString("en-IN")}</div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-[var(--text-label)] mb-2">
                    <span>Repaid</span>
                    <span>{studentLoan.progressPercent}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--bg-card)] overflow-hidden">
                    <div className="h-2 rounded-full bg-[var(--icon-green-text)]" style={{ width: `${studentLoan.progressPercent}%` }} />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">View Documents</Button>
                  <Button variant="outline" size="sm">Pay EMI</Button>
                  <Button variant="outline" size="sm">Defer</Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="rounded-md border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-3 text-[var(--text-label)]">Total Student Loans: ₹{studentLoan.remainingBalance.toLocaleString("en-IN")}</div>
                <div className="rounded-md border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-3 text-[var(--text-label)]">Next Payment Due: {studentLoan.nextEmiDate}</div>
              </div>
            </TabsContent>

            <TabsContent value="personal-loans" className="space-y-4">
              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">{personalLoan.purpose}</p>
                    <p className="text-sm text-[var(--text-label)]">{personalLoan.provider}</p>
                  </div>
                  <Badge variant="outline" className="w-fit">{personalLoan.status}</Badge>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[var(--text-label)]">
                  <div className="rounded-md bg-[var(--bg-card)] p-3">Original Loan: ₹{personalLoan.originalLoan.toLocaleString("en-IN")}</div>
                  <div className="rounded-md bg-[var(--bg-card)] p-3">Remaining Balance: ₹{personalLoan.remainingBalance.toLocaleString("en-IN")}</div>
                  <div className="rounded-md bg-[var(--bg-card)] p-3">Interest Rate: {personalLoan.interestRate}</div>
                  <div className="rounded-md bg-[var(--bg-card)] p-3">Monthly EMI: ₹{personalLoan.monthlyEmi.toLocaleString("en-IN")}</div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-[var(--text-label)] mb-2">
                    <span>Repaid</span>
                    <span>{personalLoan.progressPercent}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--bg-card)] overflow-hidden">
                    <div className="h-2 rounded-full bg-[var(--icon-green-text)]" style={{ width: `${personalLoan.progressPercent}%` }} />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">Pay EMI</Button>
                  <Button variant="outline" size="sm">Prepay</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="insurance" className="space-y-4">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                {insurancePolicies.map((policy) => {
                  const expanded = expandedFinanceCard === policy.id
                  return (
                    <div key={policy.id} className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4 shadow-sm">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-[var(--text-primary)]">{policy.type}</p>
                          <p className="text-sm text-[var(--text-label)]">{policy.provider}</p>
                        </div>
                        <Badge variant="outline" className="text-[11px]">{policy.status}</Badge>
                      </div>
                      <div className="mt-4 space-y-2 text-sm text-[var(--text-label)]">
                        <p>Plan: {policy.plan}</p>
                        <p>Coverage: {policy.coverage}</p>
                        <p>Premium: {policy.premium}</p>
                        <p>Policy Term: {policy.policyTerm}</p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">View Policy</Button>
                        <Button variant="outline" size="sm">Pay Premium</Button>
                        <Button variant="ghost" size="sm" onClick={() => setExpandedFinanceCard(expanded ? null : policy.id)}>
                          {expanded ? <ChevronUp className="mr-1 h-4 w-4" /> : <ChevronDown className="mr-1 h-4 w-4" />}
                          {expanded ? "Less" : "More"}
                        </Button>
                      </div>
                      {expanded && (
                        <div className="mt-3 rounded-md border border-[var(--border-color)] bg-[var(--bg-card)] p-3 text-sm text-[var(--text-label)]">
                          <p>Claim ratio: {policy.claimRatio || policy.copay || policy.claimBonus || "N/A"}</p>
                          <p className="mt-1">Next premium due: {policy.nextPremiumDue || policy.renewalDate || policy.lastPremiumDate}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4 text-sm text-[var(--text-label)]">
                <p>Total Coverage: ₹65,00,000</p>
                <p className="mt-1">Active Policies: 3</p>
                <p className="mt-1">Annual Premium: ₹44,400</p>
              </div>
            </TabsContent>

            <TabsContent value="taxes" className="space-y-4">
              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4 shadow-sm">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">Tax Summary</p>
                    <p className="text-sm text-[var(--text-label)]">Financial Year {taxSummary.financialYear}</p>
                  </div>
                  <Badge variant="outline">{taxSummary.filingStatus}</Badge>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[var(--text-label)]">
                  <div className="rounded-md bg-[var(--bg-card)] p-3">Total Income: {taxSummary.totalIncome}</div>
                  <div className="rounded-md bg-[var(--bg-card)] p-3">Taxable Income: {taxSummary.taxableIncome}</div>
                  <div className="rounded-md bg-[var(--bg-card)] p-3">Estimated Tax Liability: {taxSummary.estimatedTaxLiability}</div>
                  <div className="rounded-md bg-[var(--bg-card)] p-3">Refund Expected: {taxSummary.refundExpected}</div>
                </div>
                <div className="mt-4 rounded-md bg-[var(--bg-card)] p-3 text-sm text-[var(--text-label)]">
                  <p>Deductions: 80C {taxSummary.deductions.c80}, 80D {taxSummary.deductions.d80}, 80TTA {taxSummary.deductions.tta80}, Mortgage Interest {taxSummary.deductions.mortgageInterest}</p>
                  <p className="mt-1">Tax slabs: 0-2.5L Nil, 2.5L-5L 5%, 5L-10L 20%, 10L+ 30%</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Upload Documents</Button>
                  <Button variant="outline" size="sm">File ITR</Button>
                  <Button variant="outline" size="sm">Calculate</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Alert Dialog */}
      <Dialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Price Alert</DialogTitle>
            <DialogDescription>
              Get notified when {selectedItem?.symbol} reaches your target price.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="alertPrice">Target Price (₹)</Label>
            <Input
              id="alertPrice"
              type="number"
              value={alertPrice}
              onChange={(e) => setAlertPrice(e.target.value)}
              placeholder="Enter target price"
              className="mt-2"
            />
            {selectedItem && (
              <p className="text-xs text-muted-foreground mt-2">
                Current price: {"₹"}{selectedItem.price.toLocaleString("en-IN")}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAlertDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={setAlert}>Set Alert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
