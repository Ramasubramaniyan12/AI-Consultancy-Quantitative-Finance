import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { SectionHeading } from './section-heading'

export function FounderNote() {
  return (
    <section className="py-12 md:py-20 border-t border-border">
      <SectionHeading eyebrow="From Our Team" title="Founder Note" className="mb-8" />

      <Card className="bg-card border border-border">
        <CardContent className="pt-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <Avatar className="w-16 h-16 flex-shrink-0">
              <AvatarFallback className="bg-accent text-accent-foreground font-semibold text-lg">
                CQ
              </AvatarFallback>
            </Avatar>

            {/* Quote & Attribution */}
            <div className="space-y-4 flex-1">
              <p className="text-base md:text-lg text-foreground italic leading-relaxed">
                "We started Chronos Quant because we saw a gap in the market: powerful AI tools that
                refused to explain themselves. Financial decisions are too important for guesswork. That's
                why every model we build comes with reasoning, every recommendation with context, and every
                insight with confidence."
              </p>

              <div className="pt-4">
                <p className="font-semibold text-foreground">Founder &amp; CEO</p>
                <p className="text-sm text-muted-foreground">Chronos Quant</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
