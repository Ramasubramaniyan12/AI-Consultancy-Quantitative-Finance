import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Calendar } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-16 md:py-28 border-t border-border">
      <Card className="bg-gradient-to-br from-card to-card/60 border border-accent/20 hover:border-accent/40 transition-colors">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Ready to explore smarter insights?
          </CardTitle>
          <CardDescription className="text-base md:text-lg mt-4 max-w-2xl mx-auto">
            Let's discuss how Chronos Quant can support your financial goals and transform your decision-making.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col sm:flex-row gap-4 justify-center pb-12">
          <Link href="/contact">
            <Button size="lg" className="gap-2 px-8">
              <Calendar className="w-4 h-4" />
              Book a Consultation
            </Button>
          </Link>

          <a href="mailto:hello@chronosquant.com">
            <Button size="lg" variant="outline" className="gap-2 px-8">
              <Mail className="w-4 h-4" />
              Get in Touch
            </Button>
          </a>
        </CardContent>
      </Card>
    </section>
  )
}
