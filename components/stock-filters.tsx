"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, X, RotateCcw } from "lucide-react"

const sectors = [
  "All Sectors",
  "Technology",
  "Banking",
  "Energy",
  "Healthcare",
  "Consumer Goods",
  "Automobile",
  "Telecom",
  "Infrastructure",
  "Pharmaceuticals",
]

const marketCapFilters = [
  { value: "all", label: "All" },
  { value: "large", label: "Large Cap (>₹20,000 Cr)" },
  { value: "mid", label: "Mid Cap (₹5,000-20,000 Cr)" },
  { value: "small", label: "Small Cap (<₹5,000 Cr)" },
]

interface StockFiltersProps {
  onSearchChange?: (value: string) => void
  onSectorChange?: (value: string) => void
  onMarketCapChange?: (value: string) => void
  onPeRangeChange?: (value: number[]) => void
  onReturnsChange?: (value: string) => void
}

export function StockFilters({
  onSearchChange,
  onSectorChange,
  onMarketCapChange,
  onPeRangeChange,
  onReturnsChange,
}: StockFiltersProps) {
  const [search, setSearch] = React.useState("")
  const [sector, setSector] = React.useState("All Sectors")
  const [marketCap, setMarketCap] = React.useState("all")
  const [peRange, setPeRange] = React.useState([0, 100])
  const [returns, setReturns] = React.useState("all")
  const [isOpen, setIsOpen] = React.useState(false)

  const activeFilters = [
    sector !== "All Sectors" && { key: "sector", label: sector },
    marketCap !== "all" && { key: "marketCap", label: marketCapFilters.find(m => m.value === marketCap)?.label },
    (peRange[0] > 0 || peRange[1] < 100) && { key: "pe", label: `P/E: ${peRange[0]}-${peRange[1]}` },
    returns !== "all" && { key: "returns", label: `Returns: ${returns}` },
  ].filter(Boolean) as { key: string; label: string }[]

  const clearFilter = (key: string) => {
    switch (key) {
      case "sector":
        setSector("All Sectors")
        onSectorChange?.("All Sectors")
        break
      case "marketCap":
        setMarketCap("all")
        onMarketCapChange?.("all")
        break
      case "pe":
        setPeRange([0, 100])
        onPeRangeChange?.([0, 100])
        break
      case "returns":
        setReturns("all")
        onReturnsChange?.("all")
        break
    }
  }

  const clearAllFilters = () => {
    setSearch("")
    setSector("All Sectors")
    setMarketCap("all")
    setPeRange([0, 100])
    setReturns("all")
    onSearchChange?.("")
    onSectorChange?.("All Sectors")
    onMarketCapChange?.("all")
    onPeRangeChange?.([0, 100])
    onReturnsChange?.("all")
  }

  return (
    <div className="space-y-4">
      {/* Search and Quick Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or symbol..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              onSearchChange?.(e.target.value)
            }}
            className="pl-10"
          />
        </div>

        {/* Sector Select */}
        <Select
          value={sector}
          onValueChange={(value) => {
            setSector(value)
            onSectorChange?.(value)
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sector" />
          </SelectTrigger>
          <SelectContent>
            {sectors.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Market Cap Select */}
        <Select
          value={marketCap}
          onValueChange={(value) => {
            setMarketCap(value)
            onMarketCapChange?.(value)
          }}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Market Cap" />
          </SelectTrigger>
          <SelectContent>
            {marketCapFilters.map((m) => (
              <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Advanced Filters Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">More Filters</span>
              {activeFilters.length > 0 && (
                <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Advanced Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              {/* P/E Ratio */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>P/E Ratio</Label>
                  <span className="text-sm text-muted-foreground">
                    {peRange[0]} - {peRange[1]}
                  </span>
                </div>
                <Slider
                  value={peRange}
                  onValueChange={(value) => {
                    setPeRange(value)
                    onPeRangeChange?.(value)
                  }}
                  max={100}
                  min={0}
                  step={1}
                />
              </div>

              {/* Returns Filter */}
              <div className="space-y-3">
                <Label>1Y Returns</Label>
                <Select
                  value={returns}
                  onValueChange={(value) => {
                    setReturns(value)
                    onReturnsChange?.(value)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="positive">Positive (&gt;0%)</SelectItem>
                    <SelectItem value="above10">Above 10%</SelectItem>
                    <SelectItem value="above25">Above 25%</SelectItem>
                    <SelectItem value="above50">Above 50%</SelectItem>
                    <SelectItem value="negative">Negative (&lt;0%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={clearAllFilters}
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset All
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => setIsOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <Button
              key={filter.key}
              variant="secondary"
              size="sm"
              className="h-7 gap-1 text-xs"
              onClick={() => clearFilter(filter.key)}
            >
              {filter.label}
              <X className="h-3 w-3" />
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-muted-foreground"
            onClick={clearAllFilters}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
