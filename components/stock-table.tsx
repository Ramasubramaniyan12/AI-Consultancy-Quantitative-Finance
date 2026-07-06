"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  TrendingUp, 
  TrendingDown, 
  Star, 
  MoreHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  marketCap: string
  pe: number
  return1Y: number
  return3Y: number
  volume: string
  sector: string
  tags?: string[]
}

interface StockTableProps {
  stocks: Stock[]
  onSort?: (column: string) => void
  sortColumn?: string
  sortDirection?: "asc" | "desc"
}

export function StockTable({ stocks, onSort, sortColumn, sortDirection }: StockTableProps) {
  const [watchlist, setWatchlist] = React.useState<string[]>(["RELIANCE", "TCS", "HDFCBANK"])
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(stocks.length / itemsPerPage)

  const paginatedStocks = stocks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const toggleWatchlist = (symbol: string) => {
    setWatchlist((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol]
    )
  }

  const SortableHeader = ({ column, children }: { column: string; children: React.ReactNode }) => (
    <button
      className="flex items-center gap-1 hover:text-foreground transition-colors"
      onClick={() => onSort?.(column)}
    >
      {children}
      <ArrowUpDown className={cn(
        "h-3 w-3",
        sortColumn === column && "text-primary"
      )} />
    </button>
  )

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50 hover:bg-secondary/50">
              <TableHead className="w-10"></TableHead>
              <TableHead>
                <SortableHeader column="name">Company</SortableHeader>
              </TableHead>
              <TableHead className="text-right">
                <SortableHeader column="price">Price</SortableHeader>
              </TableHead>
              <TableHead className="text-right">
                <SortableHeader column="change">Change</SortableHeader>
              </TableHead>
              <TableHead className="text-right hidden md:table-cell">
                <SortableHeader column="marketCap">Market Cap</SortableHeader>
              </TableHead>
              <TableHead className="text-right hidden lg:table-cell">
                <SortableHeader column="pe">P/E</SortableHeader>
              </TableHead>
              <TableHead className="text-right hidden lg:table-cell">
                <SortableHeader column="return1Y">1Y Return</SortableHeader>
              </TableHead>
              <TableHead className="text-right hidden xl:table-cell">
                <SortableHeader column="return3Y">3Y Return</SortableHeader>
              </TableHead>
              <TableHead className="text-right hidden md:table-cell">Volume</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStocks.map((stock) => {
              const isPositive = stock.change >= 0
              const isInWatchlist = watchlist.includes(stock.symbol)
              
              return (
                <TableRow key={stock.symbol} className="hover:bg-secondary/30">
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => toggleWatchlist(stock.symbol)}
                    >
                      <Star className={cn(
                        "h-4 w-4",
                        isInWatchlist && "fill-yellow-500 text-yellow-500"
                      )} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Link href={`/stocks/${stock.symbol.toLowerCase()}`} className="block">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold">{stock.symbol.slice(0, 2)}</span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{stock.symbol}</span>
                            {stock.tags?.map((tag) => (
                              <Badge 
                                key={tag} 
                                variant="secondary" 
                                className={cn(
                                  "text-[10px] px-1.5 py-0",
                                  tag === "Top Gainer" && "bg-gain/10 text-gain",
                                  tag === "Top Loser" && "bg-loss/10 text-loss",
                                  tag === "High Volume" && "bg-chart-3/10 text-chart-3",
                                  tag === "Undervalued" && "bg-chart-4/10 text-chart-4"
                                )}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]">{stock.name}</p>
                        </div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {"₹"}{stock.price.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className={cn(
                      "flex items-center justify-end gap-1 font-medium",
                      isPositive ? "text-gain" : "text-loss"
                    )}>
                      {isPositive ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span>{isPositive ? "+" : ""}{stock.changePercent.toFixed(2)}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell text-muted-foreground">
                    {stock.marketCap}
                  </TableCell>
                  <TableCell className="text-right hidden lg:table-cell text-muted-foreground">
                    {stock.pe.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right hidden lg:table-cell">
                    <span className={cn(
                      "font-medium",
                      stock.return1Y >= 0 ? "text-gain" : "text-loss"
                    )}>
                      {stock.return1Y >= 0 ? "+" : ""}{stock.return1Y.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right hidden xl:table-cell">
                    <span className={cn(
                      "font-medium",
                      stock.return3Y >= 0 ? "text-gain" : "text-loss"
                    )}>
                      {stock.return3Y >= 0 ? "+" : ""}{stock.return3Y.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell text-muted-foreground">
                    {stock.volume}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/stocks/${stock.symbol.toLowerCase()}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/compare?assets=${stock.symbol}`}>Compare</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Set Alert</DropdownMenuItem>
                        <DropdownMenuItem>Buy</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, stocks.length)} of {stocks.length} results
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
