"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  Star,
} from "lucide-react"
import { AreaChart, Area } from "recharts"

// Sample commodity data
const commodities = {
  metals: [
    {
      id: 1,
      name: "Gold",
      symbol: "GOLD",
      price: 62450,
      change: 280,
      changePercent: 0.45,
      unit: "per 10g",
      high52w: 65200,
      low52w: 54800,
      chartData: Array.from({ length: 30 }, (_, i) => ({ value: 60000 + Math.random() * 3000 + i * 50 })),
    },
    {
      id: 2,
      name: "Silver",
      symbol: "SILVER",
      price: 74850,
      change: 1250,
      changePercent: 1.70,
      unit: "per kg",
      high52w: 78500,
      low52w: 58200,
      chartData: Array.from({ length: 30 }, (_, i) => ({ value: 70000 + Math.random() * 5000 + i * 100 })),
    },
    {
      id: 3,
      name: "Copper",
      symbol: "COPPER",
      price: 745.60,
      change: -8.25,
      changePercent: -1.10,
      unit: "per kg",
      high52w: 820,
      low52w: 680,
      chartData: Array.from({ length: 30 }, (_, i) => ({ value: 760 - Math.random() * 30 + i * 0.5 })),
    },
    {
      id: 4,
      name: "Aluminium",
      symbol: "ALUMINIUM",
      price: 205.45,
      change: 2.15,
      changePercent: 1.06,
      unit: "per kg",
      high52w: 235,
      low52w: 185,
      chartData: Array.from({ length: 30 }, (_, i) => ({ value: 200 + Math.random() * 10 + i * 0.2 })),
    },
    {
      id: 5,
      name: "Zinc",
      symbol: "ZINC",
      price: 258.30,
      change: -1.85,
      changePercent: -0.71,
      unit: "per kg",
      high52w: 295,
      low52w: 220,
      chartData: Array.from({ length: 30 }, (_, i) => ({ value: 260 - Math.random() * 8 })),
    },
    {
      id: 6,
      name: "Lead",
      symbol: "LEAD",
      price: 182.75,
      change: 1.45,
      changePercent: 0.80,
      unit: "per kg",
      high52w: 198,
      low52w: 165,
      chartData: Array.from({ length: 30 }, (_, i) => ({ value: 180 + Math.random() * 5 + i * 0.1 })),
    },
  ],
  energy: [
    {
      id: 1,
      name: "Crude Oil",
      symbol: "CRUDEOIL",
      price: 6845,
      change: 125,
      changePercent: 1.86,
      unit: "per barrel",
      high52w: 7500,
      low52w: 5200,
      chartData: Array.from({ length: 30 }, (_, i) => ({ value: 6500 + Math.random() * 400 + i * 10 })),
    },
    {
      id: 2,
      name: "Natural Gas",
      symbol: "NATURALGAS",
      price: 285.50,
      change: -8.75,
      changePercent: -2.97,
      unit: "per mmBtu",
      high52w: 450,
      low52w: 180,
      chartData: Array.from({ length: 30 }, (_, i) => ({ value: 300 - Math.random() * 20 })),
    },
  ],
  agriculture: [
    {
      id: 1,
      name: "Cotton",
      symbol: "COTTON",
      price: 28450,
      change: 350,
      changePercent: 1.25,
      unit: "per bale",
      high52w: 32000,
      low52w: 24500,
      chartData: Array.from({ length: 30 }, (_, i) => ({ value: 27500 + Math.random() * 1000 + i * 20 })),
    },
    {
      id: 2,
      name: "Soybean",
      symbol: "SOYBEAN",
      price: 4580,
      change: -45,
      changePercent: -0.97,
      unit: "per quintal",
      high52w: 5200,
      low52w: 4100,
      chartData: Array.from({ length: 30 }, (_, i) => ({ value: 4600 - Math.random() * 100 })),
    },
    {
      id: 3,
      name: "Mentha Oil",
      symbol: "MENTHAOIL",
      price: 1025,
      change: 18,
      changePercent: 1.79,
      unit: "per kg",
      high52w: 1150,
      low52w: 890,
      chartData: Array.from({ length: 30 }, (_, i) => ({ value: 1000 + Math.random() * 50 + i * 0.5 })),
    },
    {
      id: 4,
      name: "Turmeric",
      symbol: "TURMERIC",
      price: 15850,
      change: -125,
      changePercent: -0.78,
      unit: "per quintal",
      high52w: 18500,
      low52w: 12800,
      chartData: Array.from({ length: 30 }, (_, i) => ({ value: 16000 - Math.random() * 300 })),
    },
  ],
}

function CommodityCard({ commodity }: { commodity: typeof commodities.metals[0] }) {
  const isPositive = commodity.changePercent >= 0
  
  return (
    <Card className="hover:bg-secondary/30 transition-colors cursor-pointer">
      <CardContent className="pt-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{commodity.name}</h3>
              <Badge variant="outline" className="text-[10px]">{commodity.symbol}</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{commodity.unit}</p>
            
            <div className="mt-3">
              <p className="text-xl font-bold text-foreground">
                {commodity.price.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
              </p>
              <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-gain" : "text-loss"}`}>
                {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>{isPositive ? "+" : ""}{commodity.change.toLocaleString("en-IN")}</span>
                <span>({isPositive ? "+" : ""}{commodity.changePercent}%)</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Star className="h-4 w-4" />
            </Button>
            <AreaChart width={80} height={40} data={commodity.chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Area
                type="monotone"
                dataKey="value"
                stroke={isPositive ? "oklch(0.55 0.18 145)" : "oklch(0.55 0.22 25)"}
                strokeWidth={1.5}
                fill={isPositive ? "oklch(0.55 0.18 145 / 0.1)" : "oklch(0.55 0.22 25 / 0.1)"}
              />
            </AreaChart>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex justify-between text-xs">
            <div>
              <span className="text-muted-foreground">52W Low: </span>
              <span className="text-foreground font-medium">
                {commodity.low52w.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">52W High: </span>
              <span className="text-foreground font-medium">
                {commodity.high52w.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function CommoditiesPage() {
  // Calculate market summary
  const allCommodities = [...commodities.metals, ...commodities.energy, ...commodities.agriculture]
  const gainers = allCommodities.filter(c => c.changePercent > 0).length
  const losers = allCommodities.filter(c => c.changePercent < 0).length

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Commodities</h1>
        <p className="text-muted-foreground mt-1">
          Track metals, energy, and agricultural commodities
        </p>
      </div>

      {/* Market Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center text-xl">
                Au
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Gold (10g)</p>
                <p className="text-lg font-semibold text-foreground">62,450</p>
                <p className="text-xs text-gain">+0.45%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl">
                Ag
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Silver (1kg)</p>
                <p className="text-lg font-semibold text-foreground">74,850</p>
                <p className="text-xs text-gain">+1.70%</p>
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
                <p className="text-xs text-muted-foreground">Gainers</p>
                <p className="text-lg font-semibold text-gain">{gainers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-loss/10">
                <TrendingDown className="h-5 w-5 text-loss" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Losers</p>
                <p className="text-lg font-semibold text-loss">{losers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="metals" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="metals">Metals ({commodities.metals.length})</TabsTrigger>
          <TabsTrigger value="energy">Energy ({commodities.energy.length})</TabsTrigger>
          <TabsTrigger value="agriculture">Agriculture ({commodities.agriculture.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="metals">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {commodities.metals.map((commodity) => (
              <CommodityCard key={commodity.id} commodity={commodity} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="energy">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {commodities.energy.map((commodity) => (
              <CommodityCard key={commodity.id} commodity={commodity} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="agriculture">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {commodities.agriculture.map((commodity) => (
              <CommodityCard key={commodity.id} commodity={commodity} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
