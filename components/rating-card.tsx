"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { TrendingUp, AlertCircle, Target } from "lucide-react"

interface RatingCardProps {
  symbol: string
  name: string
  buyRating: number
  holdRating: number
  sellRating: number
  riskRating: "Low" | "Medium" | "High"
  qualityRating: number
  valuationRating: number
  aiConfidence: number
  targetPrice?: string
  currentPrice: string
  recommendation: "Buy" | "Hold" | "Sell"
}

export function RatingCard({
  symbol,
  name,
  buyRating,
  holdRating,
  sellRating,
  riskRating,
  qualityRating,
  valuationRating,
  aiConfidence,
  targetPrice,
  currentPrice,
  recommendation,
}: RatingCardProps) {
  const totalAnalysts = buyRating + holdRating + sellRating
  const buyPercent = (buyRating / totalAnalysts) * 100
  const holdPercent = (holdRating / totalAnalysts) * 100

  const recommendationColor = {
    Buy: "text-green-500 bg-green-500/10",
    Hold: "text-yellow-500 bg-yellow-500/10",
    Sell: "text-red-500 bg-red-500/10",
  }

  const riskColor = {
    Low: "text-green-500",
    Medium: "text-yellow-500",
    High: "text-red-500",
  }

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardContent className="pt-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{name}</p>
              <p className="text-lg font-bold">{symbol}</p>
            </div>
            <Badge className={cn("text-xs font-bold", recommendationColor[recommendation])}>
              {recommendation}
            </Badge>
          </div>

          {/* Price Info */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Current</p>
              <p className="font-semibold">{currentPrice}</p>
            </div>
            {targetPrice && (
              <div>
                <p className="text-muted-foreground">Target</p>
                <p className="font-semibold text-green-500">{targetPrice}</p>
              </div>
            )}
          </div>

          {/* Analyst Breakdown */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">ANALYST RATINGS</p>
            <div className="flex gap-1 h-6">
              {buyRating > 0 && (
                <div
                  className="bg-green-500 rounded-sm"
                  style={{ width: `${buyPercent}%` }}
                  title={`${buyRating} Buy`}
                />
              )}
              {holdRating > 0 && (
                <div
                  className="bg-yellow-500 rounded-sm"
                  style={{ width: `${holdPercent}%` }}
                  title={`${holdRating} Hold`}
                />
              )}
              {sellRating > 0 && (
                <div
                  className="bg-red-500 rounded-sm"
                  style={{ width: `${100 - buyPercent - holdPercent}%` }}
                  title={`${sellRating} Sell`}
                />
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {buyRating} Buy | {holdRating} Hold | {sellRating} Sell
            </div>
          </div>

          {/* Rating Metrics */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-slate-800/50 p-2 rounded">
              <p className="text-muted-foreground">Quality</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-500">★</span>
                <span className="font-bold">{qualityRating}/5</span>
              </div>
            </div>
            <div className="bg-slate-800/50 p-2 rounded">
              <p className="text-muted-foreground">Valuation</p>
              <div className="flex items-center gap-1 mt-1">
                <span className={riskColor[riskRating === "Low" ? "Low" : riskRating === "Medium" ? "Medium" : "High"]}>
                  {valuationRating > 5 ? "▲" : valuationRating < 5 ? "▼" : "→"}
                </span>
                <span className="font-bold">{valuationRating}/10</span>
              </div>
            </div>
            <div className="bg-slate-800/50 p-2 rounded">
              <p className="text-muted-foreground">AI Score</p>
              <p className="font-bold mt-1">{aiConfidence}%</p>
            </div>
          </div>

          {/* Risk Rating */}
          <div className="flex items-center gap-2 text-xs bg-slate-800/30 p-2 rounded">
            <AlertCircle className="h-4 w-4" />
            <span className="text-muted-foreground">Risk Rating:</span>
            <span className={cn("font-bold", riskColor[riskRating])}>{riskRating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
