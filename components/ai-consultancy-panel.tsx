'use client'

import React, { useState } from 'react'
import { Brain, X, TrendingUp, AlertTriangle, Target, Lightbulb, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AIConsultancyPanelProps {
  isOpen: boolean
  onClose: () => void
}

const tooltips: Record<string, string> = {
  sharpe: 'Sharpe Ratio measures risk-adjusted returns. Higher is better (target >1.5).',
  concentration: 'Concentration risk measures portfolio exposure to single sectors.',
  diversification: 'A well-diversified portfolio reduces unsystematic risk significantly.',
  rebalancing: 'Periodic rebalancing helps maintain target allocation and manage risk.',
  volatility: 'Historical volatility measures price fluctuations. Use for risk assessment.',
}

export function AiConsultancyPanel({ isOpen, onClose }: AIConsultancyPanelProps) {
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null)

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={cn(
          'fixed right-0 top-0 h-screen w-96 bg-slate-900 border-l border-slate-700 shadow-2xl z-50 transition-transform duration-300 ease-out overflow-y-auto',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-slate-800/95 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-cyan-500" />
            <h2 className="font-semibold text-slate-100">AI Consultancy</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Portfolio Health Summary */}
          <section>
            <h3 className="flex items-center gap-2 font-semibold text-slate-100 mb-3">
              <TrendingUp className="w-4 h-4 text-green-500" />
              Portfolio Health
            </h3>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <p className="text-sm text-slate-300 leading-relaxed">
                Your portfolio is <span className="text-green-500 font-semibold">Healthy</span> with a Sharpe Ratio of 1.8. You have good risk-adjusted returns, but consider increasing diversification to reduce sector concentration risk in Technology stocks (42% allocation).
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Overall Score</span>
                  <span className="text-green-500 font-semibold">78/100</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
            </div>
          </section>

          {/* Risk Analysis */}
          <section>
            <h3 className="flex items-center gap-2 font-semibold text-slate-100 mb-3">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              Risk Analysis
            </h3>
            <div className="space-y-3">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-medium text-slate-100">Sector Concentration</p>
                  <span className="text-xs font-bold text-red-500">HIGH</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">Your portfolio has high concentration in Technology sector at 42%, increasing vulnerability to sector-specific downturns.</p>
                <div className="text-xs text-slate-500">Maximum acceptable: 30% | Your allocation: 42%</div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-medium text-slate-100">Value at Risk (VaR)</p>
                  <span className="text-xs font-bold text-orange-500">MODERATE</span>
                </div>
                <p className="text-xs text-slate-400">With 95% confidence, you could lose up to 3.2% in a normal trading day.</p>
              </div>
            </div>
          </section>

          {/* Diversification */}
          <section>
            <h3 className="flex items-center gap-2 font-semibold text-slate-100 mb-3">
              <Target className="w-4 h-4 text-blue-500" />
              Diversification Recommendations
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-slate-300">Add 5% to Gold ETF (defensive asset)</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-slate-300">Increase Healthcare allocation to 12% (currently 8%)</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span className="text-slate-300">Consider 3% allocation to International bonds</span>
              </div>
            </div>
          </section>

          {/* Rebalancing */}
          <section>
            <h3 className="flex items-center gap-2 font-semibold text-slate-100 mb-3">
              <Lightbulb className="w-4 h-4 text-cyan-500" />
              Rebalancing Recommendations
            </h3>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Technology (Current: 42%)</span>
                  <span className="text-red-500 font-semibold">-12%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Healthcare (Current: 8%)</span>
                  <span className="text-green-500 font-semibold">+4%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Financials (Current: 15%)</span>
                  <span className="text-green-500 font-semibold">+8%</span>
                </div>
              </div>
            </div>
          </section>

          {/* Scenario Analysis */}
          <section>
            <h3 className="flex items-center gap-2 font-semibold text-slate-100 mb-3">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              Scenario Analysis
            </h3>
            <div className="space-y-2 text-sm">
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <p className="font-medium text-slate-100 mb-1">Market Crash (-20%)</p>
                <p className="text-slate-400">Your portfolio would decline ~16% (better than market)</p>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <p className="font-medium text-slate-100 mb-1">Tech Sector Decline (-15%)</p>
                <p className="text-slate-400">Your portfolio would decline ~8% (high exposure risk)</p>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <p className="font-medium text-slate-100 mb-1">Interest Rate +1%</p>
                <p className="text-slate-400">Your portfolio would decline ~2% (low interest sensitivity)</p>
              </div>
            </div>
          </section>

          {/* Educational Section */}
          <section>
            <h3 className="flex items-center gap-2 font-semibold text-slate-100 mb-3">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              Key Metrics Explained
            </h3>
            <div className="space-y-2 text-xs">
              {Object.entries(tooltips).map(([key, tooltip]) => (
                <div
                  key={key}
                  className="p-2 bg-slate-800/50 rounded-lg border border-slate-700 cursor-help"
                  onMouseEnter={() => setHoveredTooltip(key)}
                  onMouseLeave={() => setHoveredTooltip(null)}
                >
                  <p className="text-slate-300 capitalize font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  {hoveredTooltip === key && (
                    <p className="text-slate-400 mt-1">{tooltip}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Action Button */}
          <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium">
            View Detailed Analytics
          </Button>
        </div>
      </div>
    </>
  )
}
