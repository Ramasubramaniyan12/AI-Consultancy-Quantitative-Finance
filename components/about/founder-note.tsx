import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { SectionHeading } from './section-heading'

export function FounderNote() {
  return (
    <section className="py-16 md:py-24 border-t border-border">
      <SectionHeading eyebrow="From Our Team" title="Founder Note" className="mb-12" />

      <Card className="bg-card border border-border/70 hover:border-border transition-colors">
        <CardContent className="pt-10 md:pt-12">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Avatar */}
            <Avatar className="w-20 h-20 flex-shrink-0 ring-2 ring-accent/20">
              <AvatarFallback className="bg-accent/20 text-accent font-bold text-xl">
                CQ
              </AvatarFallback>
            </Avatar>

            {/* Quote & Attribution */}
            <div className="space-y-6 flex-1">
              <p className="text-lg md:text-xl text-foreground italic leading-relaxed font-light">
                "We started Chronos Quant because we saw a gap in the market: powerful AI tools that
                refused to explain themselves. Financial decisions are too important for guesswork. That's
                why every model we build comes with reasoning, every recommendation with context, and every
                insight with confidence."
              </p>

              <div className="space-y-1 pt-2">
                <p className="font-bold text-foreground">Founder &amp; CEO</p>
                <p className="text-sm text-muted-foreground">Chronos Quant</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
