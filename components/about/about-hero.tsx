'use client'

import { Badge } from '@/components/ui/badge'

export function AboutHero() {
  return (
    <div className="py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Left: Text Content */}
        <div className="space-y-6">
          <Badge variant="secondary" className="w-fit">
            Quantitative Finance & AI Consultancy
          </Badge>

          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Chronos Quant
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              AI-driven insights for smarter financial decisions.
            </p>
          </div>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            We combine advanced quantitative research, machine learning, and domain expertise to deliver
            explainable AI solutions for wealth management, personal finance, and institutional
            advisory. Every insight includes clear reasoning—not just scores.
          </p>
        </div>

        {/* Right: Signal Readout Card */}
        <div className="flex items-start justify-end">
          <div className="w-full md:w-80 bg-card border border-border rounded-lg p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm font-semibold text-foreground">Live Model Metrics</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-xs text-muted-foreground">Live</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
              <div>
                <p className="font-mono text-xs text-muted-foreground mb-1">Sharpe Ratio</p>
                <p className="font-mono text-lg font-semibold text-foreground">2.14</p>
              </div>
              <div>
                <p className="font-mono text-xs text-muted-foreground mb-1">Alpha</p>
                <p className="font-mono text-lg font-semibold text-foreground">+8.3%</p>
              </div>
              <div>
                <p className="font-mono text-xs text-muted-foreground mb-1">VaR (95%)</p>
                <p className="font-mono text-lg font-semibold text-foreground">-3.2%</p>
              </div>
              <div>
                <p className="font-mono text-xs text-muted-foreground mb-1">Max Drawdown</p>
                <p className="font-mono text-lg font-semibold text-foreground">-8.7%</p>
              </div>
            </div>

            <p className="font-mono text-xs text-muted-foreground text-center pt-2 border-t border-border">
              Updated 30 mins ago
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
