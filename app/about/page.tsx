import { AboutHero } from '@/components/about/about-hero'
import { WhoWeAre } from '@/components/about/who-we-are'
import { WhatWeDo } from '@/components/about/what-we-do'
import { Approach } from '@/components/about/approach'
import { Vision } from '@/components/about/vision'
import { FounderNote } from '@/components/about/founder-note'
import { CTASection } from '@/components/about/cta-section'

export const metadata = {
  title: 'About Chronos Quant - Quantitative Finance & AI Consultancy',
  description:
    'Learn about Chronos Quant, a quantitative finance and AI consultancy combining advanced research, machine learning, and explainable AI for wealth management, personal finance, and BFSI.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
      <AboutHero />
      <WhoWeAre />
      <WhatWeDo />
      <Approach />
      <Vision />
      <FounderNote />
      <CTASection />
    </div>
  )
}
