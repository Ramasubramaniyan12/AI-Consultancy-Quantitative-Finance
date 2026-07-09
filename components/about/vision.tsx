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
    <section className="py-12 md:py-20 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left: Heading & Mission */}
        <div className="space-y-6">
          <SectionHeading eyebrow="Our Vision" title="Why Us" />

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            We believe financial markets are complex, but financial decision-making should be clear. Our
            mission is to empower investors, advisors, and institutions with AI that explains itself,
            backed by rigorous research and proven methodologies.
          </p>
        </div>

        {/* Right: Credibility Points */}
        <div className="space-y-4">
          {points.map((point) => (
            <div key={point.title} className="flex gap-4 pb-4 border-b border-border last:border-b-0">
              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">{point.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
