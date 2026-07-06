'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ArrowRight,
  Banknote,
  Building2,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  FileText,
  GraduationCap,
  Landmark,
  ReceiptText,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'

const tabs = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'credit-cards', label: 'Credit Cards' },
  { value: 'banking', label: 'Banking' },
  { value: 'mortgages', label: 'Mortgages' },
  { value: 'student-loans', label: 'Student Loans' },
  { value: 'personal-loans', label: 'Personal Loans' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'taxes', label: 'Taxes' },
]

const summaryCards = [
  {
    title: 'Total Assets',
    value: '₹30,63,250',
    subtitle: 'Bank Accounts',
    icon: CircleDollarSign,
    accent: 'var(--icon-green-text)',
    tab: 'banking',
  },
  {
    title: 'Total Liabilities',
    value: '₹59,30,150',
    subtitle: 'All Loans & Mortgages',
    icon: Landmark,
    accent: 'var(--icon-amber-text)',
    tab: 'mortgages',
  },
  {
    title: 'Insurance Coverage',
    value: '₹65,00,000',
    subtitle: 'Active Policies',
    icon: ShieldCheck,
    accent: 'var(--icon-blue-text)',
    tab: 'insurance',
  },
  {
    title: 'Tax Status',
    value: 'Due July 31',
    subtitle: 'ITR Filing Status',
    icon: TrendingUp,
    accent: 'var(--icon-red-text)',
    tab: 'taxes',
  },
]

const creditCards = [
  {
    id: 'hdfc-premium',
    name: 'Premium Credit Card',
    issuer: 'HDFC Bank',
    last4: '5847',
    limit: 500000,
    used: 128450,
    rate: '0% (45 days)',
    rewardPoints: '15,420',
    annualFee: '₹2,500',
    nextPayment: 'Aug 5, 2026',
    status: 'Active',
  },
  {
    id: 'icici-business',
    name: 'Business Card',
    issuer: 'ICICI Bank',
    last4: '2341',
    limit: 1000000,
    used: 456780,
    rate: '0% (60 days)',
    rewardPoints: '42,150',
    annualFee: '₹5,000',
    nextPayment: 'Aug 8, 2026',
    status: 'Active',
  },
  {
    id: 'axis-travel',
    name: 'Travel Card',
    issuer: 'Axis Bank',
    last4: '7652',
    limit: 300000,
    used: 0,
    rate: '18% p.a.',
    rewardPoints: '8,320',
    annualFee: '₹1,500',
    nextPayment: 'Aug 12, 2026',
    status: 'Active',
  },
]

const bankingAccounts = [
  {
    bank: 'HDFC Bank',
    type: 'Savings',
    holder: 'Your Name',
    accountNumber: '•••• •••• •••• 2847',
    balance: 245680,
    rate: '4.5% p.a.',
    lastUpdated: 'Today, 3:45 PM',
    fee: '₹0',
    status: 'Active',
    activity: [
      { date: 'Jul 4', kind: 'Debit', amount: '₹5,000', note: 'Salary' },
      { date: 'Jul 2', kind: 'Credit', amount: '₹25,000', note: 'Transfer' },
      { date: 'Jul 1', kind: 'Debit', amount: '₹2,150', note: 'Groceries' },
    ],
  },
  {
    bank: 'ICICI Bank',
    type: 'Current',
    holder: 'Your Name',
    accountNumber: '•••• •••• •••• 5421',
    balance: 1875420,
    rate: '0%',
    lastUpdated: 'Today, 11:20 AM',
    fee: '₹0',
    status: 'Active',
    activity: [
      { date: 'Jul 4', kind: 'Credit', amount: '₹18,000', note: 'Client payment' },
      { date: 'Jul 3', kind: 'Debit', amount: '₹6,500', note: 'Utilities' },
      { date: 'Jul 2', kind: 'Credit', amount: '₹12,500', note: 'Transfer' },
    ],
  },
  {
    bank: 'Axis Bank',
    type: 'Savings',
    holder: 'Your Name',
    accountNumber: '•••• •••• •••• 9876',
    balance: 842150,
    rate: '5% p.a.',
    lastUpdated: '2 hours ago',
    fee: '₹0',
    status: 'Active',
    activity: [
      { date: 'Jul 4', kind: 'Debit', amount: '₹4,200', note: 'Shopping' },
      { date: 'Jul 3', kind: 'Credit', amount: '₹8,000', note: 'Refund' },
      { date: 'Jul 2', kind: 'Debit', amount: '₹950', note: 'Fuel' },
    ],
  },
]

const mortgageData = {
  property: 'Apartment, Mumbai',
  address: '101, Marine Drive, Mumbai - 400020',
  provider: 'HDFC Bank',
  loanType: 'Home Loan',
  originalAmount: 6000000,
  remainingBalance: 3948000,
  interestRate: '7.2% p.a. (Fixed)',
  monthlyEmi: 42850,
  completed: '5 years (25%)',
  term: '20 years',
  progressPercent: 34,
  nextEmi: 'Aug 5, 2026',
  propertyTax: '₹8,500 (Due Dec 31, 2026)',
  insurance: 'Annual ₹12,000',
  status: 'On-time',
}

const studentLoanData = {
  course: 'MBA, IIM Ahmedabad',
  provider: 'ICICI Bank Education Loan',
  completion: 'Completed (2024)',
  originalLoan: 1800000,
  disbursedAmount: 1800000,
  interestRate: '8.5% p.a. (Fixed)',
  monthlyEmi: 28450,
  loanTerm: '7 years',
  remainingTerm: '6 years 2 months',
  repaidAmount: 342600,
  remainingBalance: 1457400,
  progressPercent: 19,
  moratorium: 'Availed: Yes (6 months, ended)',
  nextEmi: 'Aug 10, 2026',
  status: 'Active',
}

const personalLoanData = {
  purpose: 'Home Renovation',
  provider: 'Bajaj Finserv',
  loanType: 'Unsecured Personal Loan',
  originalAmount: 800000,
  remainingBalance: 524750,
  interestRate: '12% p.a.',
  monthlyEmi: 18350,
  loanTerm: '5 years',
  remainingTerm: '3 years 9 months',
  emisPaid: '15/60 (25%)',
  processingFee: '₹8,000 (paid)',
  prepaymentPenalty: 'None',
  progressPercent: 34,
  nextEmi: 'Aug 8, 2026',
  status: 'Good Standing',
}

const insurancePolicies = [
  {
    type: 'Life Insurance',
    provider: 'HDFC Life',
    policyNumber: 'HDFC/2018/456789',
    coverage: '₹50,00,000',
    plan: 'Secure Plus',
    premium: '₹30,000',
    term: '25 years',
    remainingTerm: '17 years',
    maturityAmount: '₹75,00,000',
    bonusAccrued: '₹2,34,500',
    nextPremium: 'Aug 10, 2026',
    claimRatio: '98.5%',
    status: 'Active',
  },
  {
    type: 'Health Insurance',
    provider: 'Aditya Birla Health',
    policyNumber: 'AB/2021/123456',
    coverage: '₹15,00,000',
    plan: 'Comprehensive Plus',
    premium: '₹14,400',
    term: 'Annual Renewal',
    remainingTerm: 'Active',
    maturityAmount: 'N/A',
    bonusAccrued: 'N/A',
    nextPremium: 'Sep 15, 2026',
    claimRatio: '85%',
    status: 'Active',
  },
  {
    type: 'Auto Insurance',
    provider: 'National Insurance',
    policyNumber: 'NI/2023/789012',
    coverage: 'Comprehensive',
    plan: 'Comprehensive',
    premium: '₹6,500',
    term: 'Valid till Aug 15, 2026',
    remainingTerm: '1 month',
    maturityAmount: 'N/A',
    bonusAccrued: '20% no-claims bonus',
    nextPremium: 'Aug 15, 2026',
    claimRatio: 'N/A',
    status: 'Active',
  },
]

const taxSummary = {
  totalIncome: '₹28,50,000',
  deductions: '₹4,24,400',
  liability: '₹2,85,400',
  refund: '₹45,400',
  filingStatus: 'Due July 31, 2026',
  salary: '₹24,00,000',
  interestIncome: '₹2,10,000',
  dividendIncome: '₹1,40,000',
  otherIncome: '₹1,00,000',
  eightyC: '₹1,50,000',
  eightyD: '₹14,400',
  eightyTTA: '₹10,000',
  eightyEE: '₹2,50,000',
  taxableIncome: '₹24,25,600',
  tdsPaid: '₹2,40,000',
}

function formatCurrency(value: number) {
  return `₹${value.toLocaleString('en-IN')}`
}

export default function PersonalFinancePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')

  const tabParam = searchParams.get('tab') || 'dashboard'
  const [activeTab, setActiveTab] = useState(tabParam)

  useEffect(() => {
    setActiveTab(tabParam)
  }, [tabParam])

  const filteredCards = useMemo(() => {
    const term = searchTerm.toLowerCase()
    if (!term) return creditCards
    return creditCards.filter((card) => `${card.name} ${card.issuer} ${card.last4}`.toLowerCase().includes(term))
  }, [searchTerm])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    const nextPath = value === 'dashboard' ? '/personal-finance' : `/personal-finance?tab=${value}`
    router.push(nextPath)
  }

  return (
    <div className="space-y-6 p-6">
      <Card className="border-[var(--border-color)] bg-[var(--bg-card)] shadow-[var(--card-shadow)]">
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-xl text-[var(--text-primary)]">Personal Finance Manager</CardTitle>
            <p className="mt-1 text-sm text-[var(--text-label)]">Manage all your financial accounts & documents</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Dashboard', 'Settings', 'Export Documents', 'Connect Account', 'Help'].map((item) => (
              <Button key={item} variant="outline" size="sm">
                {item}
              </Button>
            ))}
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon
          return (
            <button
              key={card.title}
              onClick={() => handleTabChange(card.tab)}
              className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 text-left shadow-[var(--card-shadow)] transition-all hover:-translate-y-0.5 hover:bg-[var(--bg-hover)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg-card-inner)]">
                  <Icon className="h-5 w-5" style={{ color: card.accent }} />
                </div>
                <ArrowRight className="h-4 w-4 text-[var(--text-label)]" />
              </div>
              <p className="mt-4 text-sm text-[var(--text-label)]">{card.title}</p>
              <p className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">{card.value}</p>
              <p className="mt-1 text-sm text-[var(--text-label)]">{card.subtitle}</p>
            </button>
          )
        })}
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-lg bg-[var(--bg-card)] p-2">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="rounded-md px-3 py-2 text-sm">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <Card className="border-[var(--border-color)] bg-[var(--bg-card)] shadow-[var(--card-shadow)]">
            <CardHeader>
              <CardTitle className="text-lg text-[var(--text-primary)]">At a glance</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-[var(--text-primary)]">Upcoming obligations</p>
                  <Badge variant="outline">Sample</Badge>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-[var(--text-label)]">
                  <li>• Credit card due on Aug 5, 2026</li>
                  <li>• Mortgage EMI due on Aug 5, 2026</li>
                  <li>• Student loan EMI due on Aug 10, 2026</li>
                  <li>• Insurance premium due on Sep 15, 2026</li>
                </ul>
              </div>
              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-[var(--text-primary)]">Quick actions</p>
                  <Badge variant="outline">Mock data</Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">View Statements</Button>
                  <Button variant="outline" size="sm">Pay EMI</Button>
                  <Button variant="outline" size="sm">Upload Documents</Button>
                  <Button variant="outline" size="sm">Connect Account</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credit-cards" className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Credit Cards</h2>
              <p className="text-sm text-[var(--text-label)]">Track balances, interest and reward points</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">+ Add Card</Button>
              <Button variant="outline" size="sm">Consolidate</Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search cards by issuer or number"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="max-w-sm"
            />
            <Badge variant="outline">{filteredCards.length} cards</Badge>
          </div>
          <div className="grid gap-4 xl:grid-cols-3">
            {filteredCards.map((card) => {
              const usedPercent = Math.round((card.used / card.limit) * 100)
              return (
                <Card key={card.id} className="border-[var(--border-color)] bg-[var(--bg-card)] shadow-[var(--card-shadow)]">
                  <CardHeader className="rounded-t-lg bg-[var(--bg-card-inner)] p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[var(--text-primary)]">{card.issuer}</p>
                        <p className="text-sm text-[var(--text-label)]">{card.name}</p>
                      </div>
                      <Badge variant="outline">{card.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 p-4">
                    <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-[var(--text-label)]">Card Number</p>
                          <p className="font-semibold text-[var(--text-primary)]">•••• •••• •••• {card.last4}</p>
                        </div>
                        <CreditCard className="h-6 w-6 text-[var(--icon-blue-text)]" />
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border border-[var(--border-color)] p-3">
                        <p className="text-xs text-[var(--text-label)]">Credit Limit</p>
                        <p className="mt-1 font-semibold text-[var(--text-primary)]">{formatCurrency(card.limit)}</p>
                      </div>
                      <div className="rounded-lg border border-[var(--border-color)] p-3">
                        <p className="text-xs text-[var(--text-label)]">Used Amount</p>
                        <p className="mt-1 font-semibold text-[var(--text-primary)]">{formatCurrency(card.used)}</p>
                      </div>
                      <div className="rounded-lg border border-[var(--border-color)] p-3">
                        <p className="text-xs text-[var(--text-label)]">Available</p>
                        <p className="mt-1 font-semibold text-[var(--text-primary)]">{formatCurrency(card.limit - card.used)}</p>
                      </div>
                      <div className="rounded-lg border border-[var(--border-color)] p-3">
                        <p className="text-xs text-[var(--text-label)]">Interest</p>
                        <p className="mt-1 font-semibold text-[var(--text-primary)]">{card.rate}</p>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm text-[var(--text-label)]">
                        <span>Used</span>
                        <span>{usedPercent}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[var(--bg-card-inner)]">
                        <div className="h-2 rounded-full bg-[var(--icon-green-text)]" style={{ width: `${usedPercent}%` }} />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-[var(--text-label)]">
                      <span>Annual Fee: {card.annualFee}</span>
                      <span>Reward Points: {card.rewardPoints}</span>
                    </div>
                    <p className="text-sm text-[var(--text-label)]">Next payment: {card.nextPayment}</p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">View Full Details</Button>
                      <Button variant="outline" size="sm">Pay Now</Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            More <ChevronDown className="ml-1 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Statement</DropdownMenuItem>
                          <DropdownMenuItem>Upgrade Card</DropdownMenuItem>
                          <DropdownMenuItem>Block Card</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="banking" className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Bank Accounts</h2>
              <p className="text-sm text-[var(--text-label)]">Total Balance: ₹30,63,250 | 3 Accounts</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">+ Add Account</Button>
              <Button variant="outline" size="sm">Sync Now</Button>
            </div>
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            {bankingAccounts.map((account) => (
              <Card key={account.accountNumber} className="border-[var(--border-color)] bg-[var(--bg-card)] shadow-[var(--card-shadow)]">
                <CardHeader className="rounded-t-lg bg-[var(--bg-card-inner)] p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Banknote className="h-5 w-5 text-[var(--icon-blue-text)]" />
                      <div>
                        <p className="font-semibold text-[var(--text-primary)]">{account.bank}</p>
                        <p className="text-sm text-[var(--text-label)]">{account.type}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{account.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 p-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-[var(--border-color)] p-3">
                      <p className="text-xs text-[var(--text-label)]">Current Balance</p>
                      <p className="mt-1 font-semibold text-[var(--text-primary)]">{formatCurrency(account.balance)}</p>
                    </div>
                    <div className="rounded-lg border border-[var(--border-color)] p-3">
                      <p className="text-xs text-[var(--text-label)]">Interest Rate</p>
                      <p className="mt-1 font-semibold text-[var(--text-primary)]">{account.rate}</p>
                    </div>
                    <div className="rounded-lg border border-[var(--border-color)] p-3">
                      <p className="text-xs text-[var(--text-label)]">Last Updated</p>
                      <p className="mt-1 font-semibold text-[var(--text-primary)]">{account.lastUpdated}</p>
                    </div>
                    <div className="rounded-lg border border-[var(--border-color)] p-3">
                      <p className="text-xs text-[var(--text-label)]">Monthly Fee</p>
                      <p className="mt-1 font-semibold text-[var(--text-primary)]">{account.fee}</p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-3">
                    <p className="text-sm text-[var(--text-label)]">Account Holder: {account.holder}</p>
                    <p className="mt-1 text-sm text-[var(--text-label)]">Account Number: {account.accountNumber}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-semibold text-[var(--text-primary)]">Recent activity</p>
                    <div className="space-y-2">
                      {account.activity.map((item) => (
                        <div key={`${account.accountNumber}-${item.date}`} className="flex items-center justify-between rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">
                          <span>{item.date} · {item.kind}</span>
                          <span>{item.amount} · {item.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">View Statement</Button>
                    <Button variant="outline" size="sm">Manage Settings</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mortgages" className="space-y-4">
          <Card className="border-[var(--border-color)] bg-[var(--bg-card)] shadow-[var(--card-shadow)]">
            <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <CardTitle className="text-lg text-[var(--text-primary)]">Home Loans & Mortgages</CardTitle>
                <p className="mt-1 text-sm text-[var(--text-label)]">Total debt: {formatCurrency(mortgageData.remainingBalance)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">+ Add Mortgage</Button>
                <Button variant="outline" size="sm">Refinance</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">{mortgageData.property}</p>
                    <p className="text-sm text-[var(--text-label)]">{mortgageData.address}</p>
                    <p className="mt-2 text-sm text-[var(--text-label)]">Property Type: Residential</p>
                  </div>
                  <Badge variant="outline">{mortgageData.status}</Badge>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Provider: {mortgageData.provider}</div>
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Loan Type: {mortgageData.loanType}</div>
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Original Amount: {formatCurrency(mortgageData.originalAmount)}</div>
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Remaining Balance: {formatCurrency(mortgageData.remainingBalance)}</div>
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Interest Rate: {mortgageData.interestRate}</div>
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Monthly EMI: {formatCurrency(mortgageData.monthlyEmi)}</div>
                </div>
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-sm text-[var(--text-label)]">
                    <span>Repaid</span>
                    <span>{mortgageData.progressPercent}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[var(--bg-card)]">
                    <div className="h-2 rounded-full bg-[var(--icon-green-text)]" style={{ width: `${mortgageData.progressPercent}%` }} />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-sm text-[var(--text-label)]">
                  <span>Next EMI: {mortgageData.nextEmi}</span>
                  <span>Property Tax: {mortgageData.propertyTax}</span>
                  <span>Insurance: {mortgageData.insurance}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Pay EMI</Button>
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">Refinance</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="student-loans" className="space-y-4">
          <Card className="border-[var(--border-color)] bg-[var(--bg-card)] shadow-[var(--card-shadow)]">
            <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <CardTitle className="text-lg text-[var(--text-primary)]">Student Loans</CardTitle>
                <p className="mt-1 text-sm text-[var(--text-label)]">Total debt: {formatCurrency(studentLoanData.remainingBalance)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">+ Add Loan</Button>
                <Button variant="outline" size="sm">Defer Payment</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">{studentLoanData.course}</p>
                    <p className="text-sm text-[var(--text-label)]">{studentLoanData.provider}</p>
                    <p className="mt-2 text-sm text-[var(--text-label)]">Completion: {studentLoanData.completion}</p>
                  </div>
                  <Badge variant="outline">{studentLoanData.status}</Badge>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Original Loan: {formatCurrency(studentLoanData.originalLoan)}</div>
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Disbursed Amount: {formatCurrency(studentLoanData.disbursedAmount)}</div>
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Interest Rate: {studentLoanData.interestRate}</div>
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Monthly EMI: {formatCurrency(studentLoanData.monthlyEmi)}</div>
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Repaid: {formatCurrency(studentLoanData.repaidAmount)} ({studentLoanData.progressPercent}%)</div>
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Remaining Balance: {formatCurrency(studentLoanData.remainingBalance)}</div>
                </div>
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-sm text-[var(--text-label)]">
                    <span>Repaid</span>
                    <span>{studentLoanData.progressPercent}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[var(--bg-card)]">
                    <div className="h-2 rounded-full bg-[var(--icon-green-text)]" style={{ width: `${studentLoanData.progressPercent}%` }} />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-sm text-[var(--text-label)]">
                  <span>Moratorium: {studentLoanData.moratorium}</span>
                  <span>Next EMI: {studentLoanData.nextEmi}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Pay EMI</Button>
                  <Button variant="outline" size="sm">Defer</Button>
                  <Button variant="outline" size="sm">View Documents</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personal-loans" className="space-y-4">
          <Card className="border-[var(--border-color)] bg-[var(--bg-card)] shadow-[var(--card-shadow)]">
            <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <CardTitle className="text-lg text-[var(--text-primary)]">Personal Loans</CardTitle>
                <p className="mt-1 text-sm text-[var(--text-label)]">Total debt: {formatCurrency(personalLoanData.remainingBalance)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">+ Add Loan</Button>
                <Button variant="outline" size="sm">Prepay</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">{personalLoanData.purpose}</p>
                    <p className="text-sm text-[var(--text-label)]">{personalLoanData.provider}</p>
                    <p className="mt-2 text-sm text-[var(--text-label)]">Loan Type: {personalLoanData.loanType}</p>
                  </div>
                  <Badge variant="outline">{personalLoanData.status}</Badge>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Original Amount: {formatCurrency(personalLoanData.originalAmount)}</div>
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Remaining Balance: {formatCurrency(personalLoanData.remainingBalance)}</div>
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Interest Rate: {personalLoanData.interestRate}</div>
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Monthly EMI: {formatCurrency(personalLoanData.monthlyEmi)}</div>
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">EMIs Paid: {personalLoanData.emisPaid}</div>
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Processing Fee: {personalLoanData.processingFee}</div>
                </div>
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-sm text-[var(--text-label)]">
                    <span>Repaid</span>
                    <span>{personalLoanData.progressPercent}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[var(--bg-card)]">
                    <div className="h-2 rounded-full bg-[var(--icon-green-text)]" style={{ width: `${personalLoanData.progressPercent}%` }} />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-sm text-[var(--text-label)]">
                  <span>No prepayment penalty: Yes</span>
                  <span>Next EMI: {personalLoanData.nextEmi}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Pay EMI</Button>
                  <Button variant="outline" size="sm">Prepay</Button>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Insurance Policies</h2>
              <p className="text-sm text-[var(--text-label)]">Total Coverage: ₹65,00,000 · Annual Premium: ₹44,400</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">+ Add Policy</Button>
              <Button variant="outline" size="sm">File Claim</Button>
            </div>
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            {insurancePolicies.map((policy) => (
              <Card key={policy.policyNumber} className="border-[var(--border-color)] bg-[var(--bg-card)] shadow-[var(--card-shadow)]">
                <CardHeader className="rounded-t-lg bg-[var(--bg-card-inner)] p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-[var(--icon-blue-text)]" />
                      <div>
                        <p className="font-semibold text-[var(--text-primary)]">{policy.type}</p>
                        <p className="text-sm text-[var(--text-label)]">{policy.provider}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{policy.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 p-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Policy Number: {policy.policyNumber}</div>
                    <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Coverage Amount: {policy.coverage}</div>
                    <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Plan Name: {policy.plan}</div>
                    <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Premium (Annual): {policy.premium}</div>
                    <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Policy Term: {policy.term}</div>
                    <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Remaining Term: {policy.remainingTerm}</div>
                  </div>
                  <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-3 text-sm text-[var(--text-label)]">
                    <p>Maturity Amount: {policy.maturityAmount}</p>
                    <p className="mt-1">Bonus Accrued: {policy.bonusAccrued}</p>
                    <p className="mt-1">Next Premium: {policy.nextPremium}</p>
                    <p className="mt-1">Claim Ratio: {policy.claimRatio}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">View Policy</Button>
                    <Button variant="outline" size="sm">Pay Premium</Button>
                    <Button variant="outline" size="sm">File Claim</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="taxes" className="space-y-4">
          <Card className="border-[var(--border-color)] bg-[var(--bg-card)] shadow-[var(--card-shadow)]">
            <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <CardTitle className="text-lg text-[var(--text-primary)]">Tax Planning & Filing</CardTitle>
                <p className="mt-1 text-sm text-[var(--text-label)]">Current FY: 2025-26 · Filing Status: {taxSummary.filingStatus}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">Upload Documents</Button>
                <Button variant="outline" size="sm">File ITR</Button>
                <Button variant="outline" size="sm">Recalculate</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4">
                  <p className="text-sm text-[var(--text-label)]">Total Income</p>
                  <p className="mt-2 text-xl font-semibold text-[var(--text-primary)]">{taxSummary.totalIncome}</p>
                  <p className="mt-2 text-sm text-[var(--text-label)]">Salary + Interest + Dividends</p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4">
                  <p className="text-sm text-[var(--text-label)]">Tax Deductions</p>
                  <p className="mt-2 text-xl font-semibold text-[var(--text-primary)]">{taxSummary.deductions}</p>
                  <p className="mt-2 text-sm text-[var(--text-label)]">80C, 80D, 80TTA, 80EE</p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4">
                  <p className="text-sm text-[var(--text-label)]">Tax Liability</p>
                  <p className="mt-2 text-xl font-semibold text-[var(--text-primary)]">{taxSummary.liability}</p>
                  <p className="mt-2 text-sm text-[var(--text-label)]">Estimated after deductions</p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4">
                  <p className="text-sm text-[var(--text-label)]">Refund Status</p>
                  <p className="mt-2 text-xl font-semibold text-[var(--text-primary)]">{taxSummary.refund}</p>
                  <p className="mt-2 text-sm text-[var(--text-label)]">Expected · TDS paid exceeds liability</p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4">
                  <p className="font-semibold text-[var(--text-primary)]">Income breakdown</p>
                  <div className="mt-3 space-y-2 text-sm text-[var(--text-label)]">
                    <div className="flex items-center justify-between"><span>Salary</span><span>{taxSummary.salary}</span></div>
                    <div className="flex items-center justify-between"><span>Interest Income</span><span>{taxSummary.interestIncome}</span></div>
                    <div className="flex items-center justify-between"><span>Dividend Income</span><span>{taxSummary.dividendIncome}</span></div>
                    <div className="flex items-center justify-between"><span>Other Income</span><span>{taxSummary.otherIncome}</span></div>
                    <div className="flex items-center justify-between font-semibold text-[var(--text-primary)]"><span>Total</span><span>{taxSummary.totalIncome}</span></div>
                  </div>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4">
                  <p className="font-semibold text-[var(--text-primary)]">Deductions breakdown</p>
                  <div className="mt-3 space-y-2 text-sm text-[var(--text-label)]">
                    <div className="flex items-center justify-between"><span>80C (LIC/PPF)</span><span>{taxSummary.eightyC}</span></div>
                    <div className="flex items-center justify-between"><span>80D (Health)</span><span>{taxSummary.eightyD}</span></div>
                    <div className="flex items-center justify-between"><span>80TTA (Savings)</span><span>{taxSummary.eightyTTA}</span></div>
                    <div className="flex items-center justify-between"><span>80EE (Mortgage)</span><span>{taxSummary.eightyEE}</span></div>
                    <div className="flex items-center justify-between font-semibold text-[var(--text-primary)]"><span>Total</span><span>{taxSummary.deductions}</span></div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-inner)] p-4">
                <p className="font-semibold text-[var(--text-primary)]">Tax calculation</p>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Gross Income: {taxSummary.totalIncome}</div>
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Less Deductions: {taxSummary.deductions}</div>
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Taxable Income: {taxSummary.taxableIncome}</div>
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Tax Rate: 20% (slab)</div>
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">Tax Liability: {taxSummary.liability}</div>
                  <div className="rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">TDS Paid: {taxSummary.tdsPaid}</div>
                </div>
                <div className="mt-4 rounded-lg border border-[var(--border-color)] p-3 text-sm text-[var(--text-label)]">
                  Refund due: {taxSummary.refund}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">View Previous Returns</Button>
                  <Button variant="outline" size="sm">Get Help</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
