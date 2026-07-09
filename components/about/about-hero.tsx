'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function AboutHero() {
  return (
    <div className="py-16 md:py-28 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Text Content */}
        <div className="space-y-8 max-w-2xl">
          <div className="space-y-1">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
              Quantitative Finance & AI
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Chronos<br/>Quant
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
            AI-driven insights for smarter financial decisions.
          </p>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            We combine advanced quantitative research, machine learning, and domain expertise to deliver
            explainable AI solutions for wealth management, personal finance, and institutional
            advisory. Every insight includes clear reasoning—not just scores.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto">
                Start a Conversation
              </Button>
            </Link>
            <Link href="#what-we-do">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Right: Signal Readout Card */}
        <div className="flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-sm bg-card border border-border rounded-xl p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm font-semibold text-foreground">Live Model Metrics</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-xs text-muted-foreground">Active</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border">
              <div className="space-y-2">
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-wide">Sharpe Ratio</p>
                <p className="font-mono text-2xl font-bold text-foreground">2.14</p>
              </div>
              <div className="space-y-2">
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-wide">Alpha</p>
                <p className="font-mono text-2xl font-bold text-accent">+8.3%</p>
              </div>
              <div className="space-y-2">
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-wide">VaR (95%)</p>
                <p className="font-mono text-2xl font-bold text-foreground">-3.2%</p>
              </div>
              <div className="space-y-2">
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-wide">Max DD</p>
                <p className="font-mono text-2xl font-bold text-foreground">-8.7%</p>
              </div>
            </div>

            <p className="font-mono text-xs text-muted-foreground text-center pt-4 border-t border-border">
              Updated 30 mins ago
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
