import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Calendar } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-12 md:py-20 border-t border-border">
      <Card className="bg-card border border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl">Ready to explore smarter insights?</CardTitle>
          <CardDescription className="text-base">
            Let's discuss how Chronos Quant can support your financial goals.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button size="lg" className="gap-2">
              <Calendar className="w-4 h-4" />
              Book a Consultation
            </Button>
          </Link>

          <a href="mailto:hello@chronosquant.com">
            <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
              <Mail className="w-4 h-4" />
              Get in Touch
            </Button>
          </a>
        </CardContent>
      </Card>
    </section>
  )
}
