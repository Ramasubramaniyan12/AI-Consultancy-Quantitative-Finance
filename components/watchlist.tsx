"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Star, TrendingUp, TrendingDown, Plus, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

const watchlistItems = [
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2847.50, change: 1.24, sector: "Energy" },
  { symbol: "TCS", name: "Tata Consultancy", price: 4125.80, change: -0.56, sector: "IT" },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1678.25, change: 0.89, sector: "Banking" },
  { symbol: "INFY", name: "Infosys", price: 1542.60, change: -1.12, sector: "IT" },
  { symbol: "BHARTIARTL", name: "Bharti Airtel", price: 1425.30, change: 2.34, sector: "Telecom" },
]

export function Watchlist() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Star className="h-5 w-5 fill-current text-yellow-500" />
          Watchlist
        </CardTitle>
        <Button variant="ghost" size="sm" className="gap-1 text-xs">
          <Plus className="h-3 w-3" />
          Add
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {watchlistItems.map((item) => {
            const isPositive = item.change >= 0
            return (
              <Link
                key={item.symbol}
                href={`/stocks/${item.symbol.toLowerCase()}`}
                className="flex items-center justify-between px-6 py-3 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{item.symbol}</span>
                    <span className="text-xs text-muted-foreground px-1.5 py-0.5 bg-secondary rounded">
                      {item.sector}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{item.name}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-sm">{"₹"}{item.price.toLocaleString("en-IN")}</p>
                    <div className={cn(
                      "flex items-center justify-end gap-0.5 text-xs font-medium",
                      isPositive ? "text-gain" : "text-loss"
                    )}>
                      {isPositive ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span>{isPositive ? "+" : ""}{item.change.toFixed(2)}%</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Set Alert</DropdownMenuItem>
                      <DropdownMenuItem className="text-loss">Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
