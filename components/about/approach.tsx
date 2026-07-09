import { SectionHeading } from './section-heading'
import { Database, Zap, Lightbulb, Rocket } from 'lucide-react'

const steps = [
  {
    number: '1',
    icon: Database,
    title: 'Data',
    description: 'Comprehensive market and fundamental data aggregation and validation.',
  },
  {
    number: '2',
    icon: Zap,
    title: 'AI Models',
    description: 'Proprietary machine learning algorithms that learn and adapt to market conditions.',
  },
  {
    number: '3',
    icon: Lightbulb,
    title: 'Insights',
    description: 'Transparent, explainable outputs with clear reasoning and confidence levels.',
  },
  {
    number: '4',
    icon: Rocket,
    title: 'Action',
    description: 'Actionable recommendations integrated seamlessly into your decision workflow.',
  },
]

export function Approach() {
  return (
    <section className="py-12 md:py-20 border-t border-border">
      <SectionHeading eyebrow="Our Process" title="Our Approach" className="mb-12" />

      <div className="relative">
        {/* Desktop connector line */}
        <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-border via-border to-border" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="flex flex-col items-start">
                {/* Step circle */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-full bg-card border-2 border-border flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <span className="hidden md:block font-mono text-xs font-semibold text-muted-foreground">
                    Step {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>

                {/* Mobile connector */}
                {index < steps.length - 1 && (
                  <div className="md:hidden w-0.5 h-8 bg-border my-4" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
