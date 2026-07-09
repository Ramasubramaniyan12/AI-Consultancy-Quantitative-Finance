import { SectionHeading } from './section-heading'

export function WhoWeAre() {
  return (
    <section className="py-12 md:py-20 border-t border-border">
      <SectionHeading eyebrow="About Us" title="Who We Are" className="mb-8" />

      <div className="space-y-6 max-w-3xl text-muted-foreground leading-relaxed">
        <p>
          Chronos Quant is a Quantitative Finance & AI Consultancy spanning Wealth Management, Personal
          Finance, and BFSI (Banking, Financial Services & Insurance). We bridge advanced quantitative
          research with modern machine learning to deliver investment solutions that institutions and
          individual investors can trust.
        </p>

        <p>
          Our core strength is <strong>explainable AI</strong>—every recommendation, every score, every
          insight comes with transparent reasoning. We believe that financial decisions require not just
          predictions, but understanding. Our models don't operate as black boxes; they show their work.
        </p>

        <p>
          Whether you&apos;re managing a portfolio for yourself, advising clients, or running a financial
          institution, we serve both sides of the market with research-backed strategies and actionable
          intelligence.
        </p>
      </div>
    </section>
  )
}
