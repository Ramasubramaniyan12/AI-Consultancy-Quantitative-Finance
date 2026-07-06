'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

const pricingPlans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for beginners',
    features: [
      'Basic market overview',
      'Stock screening (limited)',
      'Portfolio tracking (basic)',
      'Educational resources',
      'Community access',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '₹499',
    period: '/month',
    description: 'For active investors',
    features: [
      'All Starter features',
      'Advanced stock screener',
      'Real-time market data',
      'Technical analysis tools',
      'Risk analytics',
      'Portfolio rebalancing',
      'Research reports',
      'Email support',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Premium',
    price: '₹999',
    period: '/month',
    description: 'For serious traders & advisors',
    features: [
      'All Professional features',
      'AI Financial Advisor',
      'Quantitative analytics',
      'Backtesting engine',
      'API access',
      'Priority support',
      'Expert consultations',
      'Custom alerts & notifications',
      'Tax planning tools',
    ],
    cta: 'Start Free Trial',
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-2">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground mb-6">
          Choose the perfect plan for your investment journey
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm">Billed Monthly</span>
          <div className="relative inline-flex items-center bg-muted rounded-full p-1">
            <button className="px-4 py-1 rounded-full text-sm font-medium bg-primary text-primary-foreground">
              Monthly
            </button>
            <button className="px-4 py-1 rounded-full text-sm font-medium text-muted-foreground">
              Annual (Save 20%)
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col ${
              plan.highlighted
                ? 'border-primary/50 bg-gradient-to-b from-primary/5 to-transparent ring-1 ring-primary/20 md:scale-105'
                : ''
            }`}
          >
            {plan.highlighted && (
              <div className="px-4 pt-4">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
            )}

            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>

              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-6">
              <Button className="w-full" variant={plan.highlighted ? 'default' : 'outline'}>
                {plan.cta}
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {[
            {
              q: 'Can I upgrade or downgrade my plan anytime?',
              a: 'Yes, you can change your plan at any time. We\'ll prorate your charges accordingly.',
            },
            {
              q: 'Is there a free trial available?',
              a: 'Yes, all paid plans come with a 14-day free trial. No credit card required.',
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept credit cards, debit cards, and UPI payments. All transactions are secure and encrypted.',
            },
            {
              q: 'Do you offer student discounts?',
              a: 'Yes, students get 50% discount on all paid plans. Verify with your educational email.',
            },
            {
              q: 'Can I cancel my subscription?',
              a: 'Yes, you can cancel anytime. No cancellation fees. Your access continues until the billing period ends.',
            },
            {
              q: 'Do you offer team or institutional pricing?',
              a: 'Yes, we offer custom pricing for teams and institutions. Contact our sales team for details.',
            },
          ].map((faq, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-base">{faq.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 text-center">
        <Card className="bg-gradient-to-r from-primary/10 to-cyan-500/10 border-primary/20">
          <CardHeader>
            <CardTitle>Ready to get started?</CardTitle>
            <CardDescription>
              Join thousands of investors using Chronos Quant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg">Create Free Account</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
