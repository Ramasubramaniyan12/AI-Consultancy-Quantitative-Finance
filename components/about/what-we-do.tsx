import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeading } from './section-heading'
import {
  Brain,
  TrendingUp,
  Briefcase,
  BarChart3,
  Wallet,
  Building2,
} from 'lucide-react'

const services = [
  {
    icon: Brain,
    title: 'AI-Powered Financial Research',
    description: 'Machine learning models that uncover market patterns, signals, and emerging opportunities.',
  },
  {
    icon: TrendingUp,
    title: 'Quantitative Investment Strategies',
    description: 'Systematic, research-backed strategies with backtesting and stress-testing capabilities.',
  },
  {
    icon: Briefcase,
    title: 'Portfolio Management & Optimization',
    description: 'Data-driven portfolio construction and rebalancing aligned with your objectives.',
  },
  {
    icon: BarChart3,
    title: 'Market Intelligence & Risk Analytics',
    description: 'Real-time market surveillance, risk metrics, and scenario analysis for informed decisions.',
  },
  {
    icon: Wallet,
    title: 'Wealth & Personal Finance Advisory',
    description: 'Personalized financial planning and wealth optimization tailored to individual goals.',
  },
  {
    icon: Building2,
    title: 'BFSI Consulting Solutions',
    description: 'Institutional advisory, platform strategy, and fintech consulting for financial organizations.',
  },
]

export function WhatWeDo() {
  return (
    <section className="py-16 md:py-24 border-t border-border" id="what-we-do">
      <SectionHeading eyebrow="Our Services" title="What We Do" className="mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <Card key={service.title} className="border border-border bg-card hover:shadow-md hover:bg-card/70 transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4 mb-2">
                  <div className="p-2.5 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-5 h-5 text-accent flex-shrink-0" />
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
