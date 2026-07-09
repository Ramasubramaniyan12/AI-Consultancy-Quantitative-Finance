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
    <section className="py-16 md:py-24 border-t border-border">
      <SectionHeading eyebrow="Our Process" title="Our Approach" className="mb-16" />

      <div className="relative">
        {/* Desktop connector line */}
        <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="flex flex-col items-center md:items-start text-center md:text-left">
                {/* Step circle */}
                <div className="flex justify-center md:justify-start w-full mb-6">
                  <div className="w-20 h-20 rounded-full bg-card border-2 border-accent/20 flex items-center justify-center flex-shrink-0 group hover:border-accent/50 hover:bg-card/60 transition-all duration-300">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                </div>

                {/* Step number */}
                <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest mb-3">
                  Step {step.number}
                </span>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>

                {/* Mobile connector */}
                {index < steps.length - 1 && (
                  <div className="md:hidden w-0.5 h-8 bg-border/50 my-6" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
