"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, TrendingUp, PieChart, Activity } from "lucide-react"

export function PortfolioHealth() {
  const healthScore = 78
  const riskScore = 42
  const diversificationScore = 65

  return (
    <Card className="bg-[var(--bg-card)] border-[var(--border-color)] shadow-[var(--card-shadow)]">
      <CardHeader>
        <CardTitle className="text-lg text-[var(--text-primary)]">Portfolio Health Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Health Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div
                className="rounded-[10px] flex items-center justify-center p-2"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--icon-green-bg)'
                }}
              >
                <Activity className="h-5 w-5" style={{ color: 'var(--icon-green-text)' }} />
              </div>
              <span className="font-semibold text-[var(--text-primary)]">Portfolio Health Score</span>
            </div>
            <Badge className="bg-[var(--badge-health)] text-[var(--badge-health-text)]">{healthScore}/100</Badge>
          </div>
          <div className="w-full bg-[var(--progress-track)] rounded-full h-2 overflow-hidden">
            <div className="bg-[var(--progress-equities)] h-2 rounded-full" style={{ width: `${healthScore}%` }} />
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">Your portfolio is well-balanced and healthy</p>
        </div>

        {/* Risk Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div
                className="rounded-[10px] flex items-center justify-center p-2"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--icon-amber-bg)'
                }}
              >
                <AlertCircle className="h-5 w-5" style={{ color: 'var(--icon-amber-text)' }} />
              </div>
              <span className="font-semibold text-[var(--text-primary)]">Risk Score</span>
            </div>
            <Badge className="bg-[var(--badge-risk)] text-[var(--badge-risk-text)]">{riskScore}/100</Badge>
          </div>
          <div className="w-full bg-[var(--progress-track)] rounded-full h-2 overflow-hidden">
            <div className="bg-[var(--progress-mutual-funds)] h-2 rounded-full" style={{ width: `${riskScore}%` }} />
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">Moderate risk with adequate diversification</p>
        </div>

        {/* Diversification Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div
                className="rounded-[10px] flex items-center justify-center p-2"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--icon-blue-bg)'
                }}
              >
                <PieChart className="h-5 w-5" style={{ color: 'var(--icon-blue-text)' }} />
              </div>
              <span className="font-semibold text-[var(--text-primary)]">Diversification Score</span>
            </div>
            <Badge className="bg-[var(--badge-diversification)] text-[var(--badge-diversification-text)]">{diversificationScore}/100</Badge>
          </div>
          <div className="w-full bg-[var(--progress-track)] rounded-full h-2 overflow-hidden">
            <div className="bg-[var(--progress-fixed-income)] h-2 rounded-full" style={{ width: `${diversificationScore}%` }} />
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">Good spread across asset classes</p>
        </div>

        {/* Asset Allocation */}
        <div className="pt-4 border-t border-[var(--border-color)]">
          <p className="font-semibold mb-3 text-sm text-[var(--text-primary)]">Asset Allocation</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)]">Equities</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-[var(--progress-track)] rounded h-2 overflow-hidden">
                  <div className="bg-[var(--progress-equities)] rounded h-2 w-[45%]" />
                </div>
                <span className="font-semibold w-10 text-[var(--text-primary)]">45%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)]">Mutual Funds</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-[var(--progress-track)] rounded h-2 overflow-hidden">
                  <div className="bg-[var(--progress-mutual-funds)] rounded h-2 w-[25%]" />
                </div>
                <span className="font-semibold w-10 text-[var(--text-primary)]">25%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)]">Fixed Income</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-[var(--progress-track)] rounded h-2 overflow-hidden">
                  <div className="bg-[var(--progress-fixed-income)] rounded h-2 w-[15%]" />
                </div>
                <span className="font-semibold w-10 text-[var(--text-primary)]">15%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)]">Crypto</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-[var(--progress-track)] rounded h-2 overflow-hidden">
                  <div className="bg-[var(--progress-crypto)] rounded h-2 w-[10%]" />
                </div>
                <span className="font-semibold w-10 text-[var(--text-primary)]">10%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)]">Commodities</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-[var(--progress-track)] rounded h-2 overflow-hidden">
                  <div className="bg-[var(--progress-mutual-funds)] rounded h-2 w-[5%]" />
                </div>
                <span className="font-semibold w-10 text-[var(--text-primary)]">5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="pt-4 border-t border-[var(--border-color)] bg-[var(--bg-card-inner)] p-3 rounded">
          <p className="font-semibold text-sm mb-2 text-[var(--text-primary)]">AI Recommendations</p>
          <ul className="text-xs text-[var(--text-muted)] space-y-1">
            <li>✓ Consider increasing equity exposure from 45% to 50%</li>
            <li>✓ Rebalance mutual funds - some have overlapping holdings</li>
            <li>✓ Fixed Income allocation is optimal for your risk profile</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
