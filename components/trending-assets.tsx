"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Flame, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

const trendingAssets = [
  { 
    symbol: "TATAMOTORS", 
    name: "Tata Motors", 
    price: 945.80, 
    change: 5.67, 
    volume: "12.5M",
    tag: "Top Gainer",
    type: "stock"
  },
  { 
    symbol: "BTC", 
    name: "Bitcoin", 
    price: 5842500, 
    change: 3.24, 
    volume: "₹2.1T",
    tag: "High Volume",
    type: "crypto"
  },
  { 
    symbol: "GOLD", 
    name: "Gold (MCX)", 
    price: 72450, 
    change: 0.89, 
    volume: "8.2K",
    tag: "Safe Haven",
    type: "commodity"
  },
  { 
    symbol: "NIFTYBEES", 
    name: "Nippon Nifty ETF", 
    price: 265.50, 
    change: 1.12, 
    volume: "5.6M",
    tag: "Popular",
    type: "etf"
  },
]

export function TrendingAssets() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Trending Today
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {trendingAssets.map((asset) => {
            const isPositive = asset.change >= 0
            return (
              <Link
                key={asset.symbol}
                href={`/${asset.type === "stock" ? "stocks" : asset.type}/${asset.symbol.toLowerCase()}`}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/20 hover:bg-secondary/30 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold">{asset.symbol.slice(0, 2)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{asset.symbol}</span>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      {asset.tag}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{asset.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{"₹"}{asset.price.toLocaleString("en-IN")}</p>
                  <div className={cn(
                    "flex items-center justify-end gap-0.5 text-xs font-medium",
                    isPositive ? "text-gain" : "text-loss"
                  )}>
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>{isPositive ? "+" : ""}{asset.change.toFixed(2)}%</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
