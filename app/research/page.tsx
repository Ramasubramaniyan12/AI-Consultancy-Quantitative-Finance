'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LineChart, TrendingUp, BookOpen, Calendar } from 'lucide-react'

const researchItems = [
  {
    id: 1,
    title: 'Market Analysis: Q1 2026 Performance Review',
    category: 'Market Analysis',
    date: 'March 15, 2026',
    author: 'Quantitative Research Team',
    excerpt: 'In-depth analysis of Indian stock market performance in Q1 2026 with sector-wise breakdown.',
    readTime: '8 min',
  },
  {
    id: 2,
    title: 'Emerging Opportunities in Mid-Cap Stocks',
    category: 'Equity Research',
    date: 'March 10, 2026',
    author: 'Fundamental Analysis Team',
    excerpt: 'Identifying undervalued mid-cap stocks with strong growth potential and technical setup.',
    readTime: '6 min',
  },
  {
    id: 3,
    title: 'Cryptocurrency Market Trends & Risk Assessment',
    category: 'Crypto Analysis',
    date: 'March 8, 2026',
    author: 'Digital Assets Team',
    excerpt: 'Comprehensive analysis of crypto market movements and risk management strategies.',
    readTime: '10 min',
  },
  {
    id: 4,
    title: 'Bond Market Outlook: Rate Expectations',
    category: 'Fixed Income',
    date: 'March 5, 2026',
    author: 'Fixed Income Research',
    excerpt: 'Interest rate outlook and bond portfolio positioning for changing rate environment.',
    readTime: '7 min',
  },
]

const strategies = [
  { name: 'Momentum Strategy', returns: '+24.5%', riskLevel: 'High', lastUpdated: 'Mar 15' },
  { name: 'Value Investing', returns: '+18.3%', riskLevel: 'Medium', lastUpdated: 'Mar 14' },
  { name: 'Dividend Growth', returns: '+12.8%', riskLevel: 'Low', lastUpdated: 'Mar 15' },
  { name: 'Growth at Reasonable Price', returns: '+22.1%', riskLevel: 'Medium', lastUpdated: 'Mar 13' },
]

export default function ResearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Research & Investment Insights</h1>
        <p className="text-muted-foreground">
          Access comprehensive market analysis, investment strategies, and quantitative research.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList>
          <TabsTrigger value="reports">Research Reports</TabsTrigger>
          <TabsTrigger value="strategies">Quant Strategies</TabsTrigger>
          <TabsTrigger value="insights">Market Insights</TabsTrigger>
        </TabsList>

        {/* Research Reports */}
        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4">
            {researchItems.map((item) => (
              <Card key={item.id} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge>{item.category}</Badge>
                        <span className="text-xs text-muted-foreground">{item.readTime}</span>
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                    <Button variant="outline" size="sm">
                      Read
                    </Button>
                  </div>
                  <CardDescription>{item.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-x-4">
                  <span>{item.author}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Quantitative Strategies */}
        <TabsContent value="strategies" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategies.map((strategy) => (
              <Card key={strategy.name} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    {strategy.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">1-Year Return</p>
                      <p className="text-2xl font-bold text-green-500">{strategy.returns}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Risk Level</p>
                      <Badge variant={strategy.riskLevel === 'Low' ? 'secondary' : 'default'}>
                        {strategy.riskLevel}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Updated: {strategy.lastUpdated}</p>
                  <Button className="w-full">View Strategy</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Market Insights */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Sector Rotation Analysis', icon: TrendingUp },
              { title: 'Technical Indicators Update', icon: LineChart },
              { title: 'Macro Economic Overview', icon: BookOpen },
              { title: 'Earnings Calendar', icon: Calendar },
            ].map((insight, i) => {
              const Icon = insight.icon
              return (
                <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Icon className="h-5 w-5" />
                      {insight.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Latest insights and analysis for informed decision-making.
                    </p>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
