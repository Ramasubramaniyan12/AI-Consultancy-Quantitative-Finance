"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  IndianRupee,
  ArrowRight,
} from "lucide-react"

// Sample IPO data
const upcomingIPOs = [
  {
    id: 1,
    name: "TechVision India Ltd",
    sector: "Technology",
    priceRange: "450-475",
    issueSize: 2500,
    lotSize: 30,
    openDate: "Apr 15, 2026",
    closeDate: "Apr 18, 2026",
    listingDate: "Apr 23, 2026",
    gmp: 85,
    status: "Upcoming",
  },
  {
    id: 2,
    name: "GreenEnergy Solutions",
    sector: "Renewable Energy",
    priceRange: "320-340",
    issueSize: 1800,
    lotSize: 44,
    openDate: "Apr 20, 2026",
    closeDate: "Apr 23, 2026",
    listingDate: "Apr 28, 2026",
    gmp: 45,
    status: "Upcoming",
  },
  {
    id: 3,
    name: "FinServe Digital",
    sector: "Fintech",
    priceRange: "280-295",
    issueSize: 1200,
    lotSize: 50,
    openDate: "Apr 25, 2026",
    closeDate: "Apr 28, 2026",
    listingDate: "May 3, 2026",
    gmp: 62,
    status: "Upcoming",
  },
]

const openIPOs = [
  {
    id: 1,
    name: "MediCare Pharma Ltd",
    sector: "Pharmaceuticals",
    priceRange: "185-195",
    issueSize: 950,
    lotSize: 76,
    openDate: "Apr 5, 2026",
    closeDate: "Apr 8, 2026",
    listingDate: "Apr 13, 2026",
    gmp: 28,
    status: "Open",
    subscriptionRetail: 4.25,
    subscriptionHNI: 8.72,
    subscriptionQIB: 12.45,
    subscriptionTotal: 8.14,
    daysLeft: 2,
  },
  {
    id: 2,
    name: "BuildRight Infrastructure",
    sector: "Infrastructure",
    priceRange: "520-545",
    issueSize: 3200,
    lotSize: 27,
    openDate: "Apr 6, 2026",
    closeDate: "Apr 9, 2026",
    listingDate: "Apr 14, 2026",
    gmp: 72,
    status: "Open",
    subscriptionRetail: 2.85,
    subscriptionHNI: 5.32,
    subscriptionQIB: 7.89,
    subscriptionTotal: 5.35,
    daysLeft: 3,
  },
]

const recentListings = [
  {
    id: 1,
    name: "CloudNet Services",
    sector: "Cloud Computing",
    issuePrice: 380,
    listingPrice: 456,
    currentPrice: 478,
    listingGain: 20.0,
    currentGain: 25.8,
    listingDate: "Apr 2, 2026",
  },
  {
    id: 2,
    name: "AgriTech Innovations",
    sector: "AgriTech",
    issuePrice: 165,
    listingPrice: 198,
    currentPrice: 185,
    listingGain: 20.0,
    currentGain: 12.1,
    listingDate: "Mar 28, 2026",
  },
  {
    id: 3,
    name: "Urban Mobility Corp",
    sector: "Transportation",
    issuePrice: 245,
    listingPrice: 215,
    currentPrice: 228,
    listingGain: -12.2,
    currentGain: -6.9,
    listingDate: "Mar 25, 2026",
  },
  {
    id: 4,
    name: "Digital Payments Ltd",
    sector: "Fintech",
    issuePrice: 420,
    listingPrice: 525,
    currentPrice: 545,
    listingGain: 25.0,
    currentGain: 29.8,
    listingDate: "Mar 20, 2026",
  },
]

export default function IPOPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">IPO Center</h1>
        <p className="text-muted-foreground mt-1">
          Track upcoming, open, and recently listed IPOs
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Open IPOs</p>
                <p className="text-lg font-semibold text-foreground">{openIPOs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-3/10">
                <Calendar className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Upcoming</p>
                <p className="text-lg font-semibold text-foreground">{upcomingIPOs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gain/10">
                <TrendingUp className="h-5 w-5 text-gain" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Listing Gain</p>
                <p className="text-lg font-semibold text-gain">+18.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-4/10">
                <IndianRupee className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Issue Size</p>
                <p className="text-lg font-semibold text-foreground">8,650 Cr</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="open" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="open">Open IPOs ({openIPOs.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcomingIPOs.length})</TabsTrigger>
          <TabsTrigger value="listed">Recently Listed</TabsTrigger>
        </TabsList>

        {/* Open IPOs */}
        <TabsContent value="open" className="space-y-4">
          {openIPOs.map((ipo) => (
            <Card key={ipo.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Left Section */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{ipo.name}</h3>
                        <p className="text-sm text-muted-foreground">{ipo.sector}</p>
                      </div>
                      <Badge className="bg-gain/10 text-gain">
                        <Clock className="h-3 w-3 mr-1" />
                        {ipo.daysLeft} days left
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Price Band</p>
                        <p className="font-medium text-foreground">{ipo.priceRange}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Issue Size</p>
                        <p className="font-medium text-foreground">{ipo.issueSize} Cr</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Lot Size</p>
                        <p className="font-medium text-foreground">{ipo.lotSize} Shares</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">GMP</p>
                        <p className="font-medium text-gain">+{ipo.gmp}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Subscription */}
                  <div className="lg:w-72 space-y-3">
                    <p className="text-sm font-medium text-foreground">Subscription Status</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Retail</span>
                        <span className="font-medium text-foreground">{ipo.subscriptionRetail}x</span>
                      </div>
                      <Progress value={Math.min(ipo.subscriptionRetail * 10, 100)} className="h-1.5" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">HNI</span>
                        <span className="font-medium text-foreground">{ipo.subscriptionHNI}x</span>
                      </div>
                      <Progress value={Math.min(ipo.subscriptionHNI * 10, 100)} className="h-1.5" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">QIB</span>
                        <span className="font-medium text-foreground">{ipo.subscriptionQIB}x</span>
                      </div>
                      <Progress value={Math.min(ipo.subscriptionQIB * 10, 100)} className="h-1.5" />
                    </div>
                    <div className="pt-2 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">Total</span>
                        <span className="text-lg font-bold text-primary">{ipo.subscriptionTotal}x</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Opens: {ipo.openDate}</span>
                    <span>Closes: {ipo.closeDate}</span>
                    <span>Lists: {ipo.listingDate}</span>
                  </div>
                  <Button>
                    Apply Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Upcoming IPOs */}
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingIPOs.map((ipo) => (
            <Card key={ipo.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{ipo.name}</h3>
                    <p className="text-sm text-muted-foreground">{ipo.sector}</p>
                  </div>
                  <Badge variant="secondary">Upcoming</Badge>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Price Band</p>
                    <p className="font-medium text-foreground">{ipo.priceRange}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Issue Size</p>
                    <p className="font-medium text-foreground">{ipo.issueSize} Cr</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Lot Size</p>
                    <p className="font-medium text-foreground">{ipo.lotSize} Shares</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Expected GMP</p>
                    <p className="font-medium text-gain">+{ipo.gmp}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Opens On</p>
                    <p className="font-medium text-foreground">{ipo.openDate}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Closes: {ipo.closeDate}</span>
                    <span>Lists: {ipo.listingDate}</span>
                  </div>
                  <Button variant="outline">
                    Set Reminder
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Recently Listed */}
        <TabsContent value="listed">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Company</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">Issue Price</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">Listing Price</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">Listing Gain</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">Current Price</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">Current Gain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentListings.map((ipo) => (
                      <tr key={ipo.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                        <td className="p-4">
                          <p className="font-medium text-foreground">{ipo.name}</p>
                          <p className="text-xs text-muted-foreground">{ipo.listingDate}</p>
                        </td>
                        <td className="p-4 text-right text-foreground">
                          {ipo.issuePrice.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                        </td>
                        <td className="p-4 text-right text-foreground">
                          {ipo.listingPrice.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                        </td>
                        <td className={`p-4 text-right font-medium ${ipo.listingGain >= 0 ? "text-gain" : "text-loss"}`}>
                          <span className="flex items-center justify-end gap-1">
                            {ipo.listingGain >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {ipo.listingGain >= 0 ? "+" : ""}{ipo.listingGain}%
                          </span>
                        </td>
                        <td className="p-4 text-right text-foreground">
                          {ipo.currentPrice.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                        </td>
                        <td className={`p-4 text-right font-medium ${ipo.currentGain >= 0 ? "text-gain" : "text-loss"}`}>
                          <span className="flex items-center justify-end gap-1">
                            {ipo.currentGain >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {ipo.currentGain >= 0 ? "+" : ""}{ipo.currentGain}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
