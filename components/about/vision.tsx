import { SectionHeading } from './section-heading'
import { CheckCircle2 } from 'lucide-react'

const points = [
  {
    title: 'Explainable by Default',
    description:
      'Every model output includes reasoning, confidence intervals, and edge cases. No black boxes.',
  },
  {
    title: 'Research-Backed',
    description:
      'Grounded in peer-reviewed quantitative finance, behavioral economics, and market microstructure.',
  },
  {
    title: 'Built for Both Sides',
    description:
      'From individual investors to institutional traders and advisors—our solutions scale across the spectrum.',
  },
]

export function Vision() {
  return (
    <section className="py-16 md:py-24 border-t border-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left: Heading & Mission */}
        <div className="space-y-8">
          <SectionHeading eyebrow="Our Vision" title="Why Us" />

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            We believe financial markets are complex, but financial decision-making should be clear. Our
            mission is to empower investors, advisors, and institutions with AI that explains itself,
            backed by rigorous research and proven methodologies.
          </p>
        </div>

        {/* Right: Credibility Points */}
        <div className="space-y-4">
          {points.map((point, index) => (
            <div 
              key={point.title} 
              className="flex gap-4 pb-6 border-b border-border/50 last:border-b-0 last:pb-0 hover:opacity-85 transition-opacity"
            >
              <div className="p-2 rounded-lg bg-accent/10 h-fit flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-accent" />
              </div>
              <div className="space-y-1 flex-1">
                <h3 className="font-bold text-foreground">{point.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
