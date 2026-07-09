import { SectionHeading } from './section-heading'
import { Card, CardContent } from '@/components/ui/card'

export function WhoWeAre() {
  return (
    <section className="py-16 md:py-24 border-t border-border">
      <SectionHeading eyebrow="About Us" title="Who We Are" className="mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="border border-border bg-card hover:bg-card/60 transition-colors">
          <CardContent className="pt-8">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Chronos Quant is a Quantitative Finance & AI Consultancy spanning Wealth Management, Personal
              Finance, and BFSI (Banking, Financial Services & Insurance). We bridge advanced quantitative
              research with modern machine learning to deliver investment solutions that institutions and
              individual investors can trust.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card hover:bg-card/60 transition-colors">
          <CardContent className="pt-8">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Our core strength is <strong className="text-accent">explainable AI</strong>—every recommendation, every score, every
              insight comes with transparent reasoning. We believe that financial decisions require not just
              predictions, but understanding. Our models don&apos;t operate as black boxes; they show their work.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border bg-card">
        <CardContent className="pt-8">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Whether you&apos;re managing a portfolio for yourself, advising clients, or running a financial
            institution, we serve both sides of the market with research-backed strategies and actionable
            intelligence.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
