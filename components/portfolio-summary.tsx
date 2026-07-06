"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Wallet, PiggyBank, LineChart } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const portfolioData = [
  { date: "Jan", value: 850000 },
  { date: "Feb", value: 920000 },
  { date: "Mar", value: 880000 },
  { date: "Apr", value: 950000 },
  { date: "May", value: 1020000 },
  { date: "Jun", value: 1100000 },
  { date: "Jul", value: 1080000 },
  { date: "Aug", value: 1150000 },
  { date: "Sep", value: 1200000 },
  { date: "Oct", value: 1180000 },
  { date: "Nov", value: 1250000 },
  { date: "Dec", value: 1324500 },
]

export function PortfolioSummary() {
  const totalValue = 1324500
  const dailyChange = 12450
  const dailyChangePercent = 0.95
  const totalReturns = 324500
  const totalReturnsPercent = 32.45
  const isPositiveDaily = dailyChange >= 0
  const isPositiveTotal = totalReturns >= 0

  return (
    <Card className="bg-[var(--bg-card)] border-[var(--border-color)] shadow-[var(--card-shadow)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-[var(--text-primary)]">
          <Wallet className="h-5 w-5" />
          Portfolio Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Value */}
          <div className="space-y-1">
            <p className="text-sm text-[var(--text-muted)]">Total Value</p>
            <p className="text-3xl font-bold text-[var(--text-primary)]">
              {"₹"}{totalValue.toLocaleString("en-IN")}
            </p>
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              isPositiveDaily ? "text-[var(--icon-green-text)]" : "text-[var(--icon-red-text)]"
            )}>
              {isPositiveDaily ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>
                {isPositiveDaily ? "+" : ""}{"₹"}{Math.abs(dailyChange).toLocaleString("en-IN")} ({dailyChangePercent.toFixed(2)}%) today
              </span>
            </div>
          </div>

          {/* Total Returns */}
          <div className="space-y-1">
            <p className="text-sm text-[var(--text-muted)] flex items-center gap-1">
              <PiggyBank className="h-4 w-4" />
              Total Returns
            </p>
            <p className={cn(
              "text-2xl font-bold",
              isPositiveTotal ? "text-[var(--icon-green-text)]" : "text-[var(--icon-red-text)]"
            )}>
              {isPositiveTotal ? "+" : ""}{"₹"}{Math.abs(totalReturns).toLocaleString("en-IN")}
            </p>
            <p className={cn(
              "text-sm font-medium",
              isPositiveTotal ? "text-[var(--icon-green-text)]" : "text-[var(--icon-red-text)]"
            )}>
              {isPositiveTotal ? "+" : ""}{totalReturnsPercent.toFixed(2)}% all time
            </p>
          </div>

          {/* Invested Amount */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <LineChart className="h-4 w-4" />
              Invested Amount
            </p>
            <p className="text-2xl font-bold">
              {"₹"}{(1000000).toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-muted-foreground">
              Since Jan 2024
            </p>
          </div>
        </div>

        {/* Portfolio Chart */}
        <div className="mt-6 h-48 w-full">
          <ResponsiveContainer width="100%" height={192} minWidth={0}>
            <AreaChart data={portfolioData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.55 0.18 145)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.55 0.18 145)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'oklch(0.45 0 0)' }}
              />
              <YAxis 
                hide
                domain={['dataMin - 50000', 'dataMax + 50000']}
              />
              <Tooltip 
                formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Value"]}
                contentStyle={{
                  backgroundColor: 'oklch(1 0 0)',
                  border: '1px solid oklch(0.9 0 0)',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="oklch(0.55 0.18 145)"
                strokeWidth={2}
                fill="url(#portfolioGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
