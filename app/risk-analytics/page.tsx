'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { AlertCircle, TrendingDown, Shield, PieChart } from 'lucide-react'

const portfolioRisks = [
  {
    name: 'Portfolio Volatility',
    value: '18.5%',
    benchmark: '15.2%',
    status: 'warning',
    description: 'Your portfolio volatility is 3.3% higher than market average.',
  },
  {
    name: 'Concentration Risk',
    value: '42%',
    benchmark: '30%',
    status: 'warning',
    description: '42% allocated to top 3 holdings. Consider diversification.',
  },
  {
    name: 'Downside Risk (VaR)',
    value: '-₹8,450',
    benchmark: '-₹6,200',
    status: 'warning',
    description: 'Potential maximum loss at 95% confidence level.',
  },
  {
    name: 'Sharpe Ratio',
    value: '1.45',
    benchmark: '1.62',
    status: 'info',
    description: 'Risk-adjusted returns slightly below market average.',
  },
]

const riskMetrics = [
  { name: 'Beta', value: 1.28, description: 'Market sensitivity' },
  { name: 'Correlation', value: 0.72, description: 'Asset correlation' },
  { name: 'Skewness', value: -0.45, description: 'Return distribution' },
  { name: 'Kurtosis', value: 2.85, description: 'Tail risk indicator' },
]

export default function RiskAnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Risk Management & Portfolio Health</h1>
        <p className="text-muted-foreground">
          Comprehensive risk analysis and portfolio optimization tools.
        </p>
      </div>

      {/* Risk Alerts */}
      <Card className="border-yellow-600/50 bg-yellow-50/5 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-600">
            <AlertCircle className="h-5 w-5" />
            Risk Assessment Alert
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Your portfolio shows elevated concentration risk. We recommend rebalancing to improve diversification.
          </p>
          <Button className="mt-4" size="sm">
            View Recommendations
          </Button>
        </CardContent>
      </Card>

      {/* Key Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {portfolioRisks.map((risk) => (
          <Card key={risk.name} className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-sm">{risk.name}</CardTitle>
              <CardDescription className="text-xs">{risk.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold">{risk.value}</span>
                  <Badge variant={risk.status === 'warning' ? 'destructive' : 'secondary'}>
                    {risk.status === 'warning' ? 'High' : 'Normal'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Benchmark: {risk.benchmark}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Advanced Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Risk Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              Statistical Risk Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {riskMetrics.map((metric) => (
              <div key={metric.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{metric.name}</span>
                  <span className="text-sm font-bold">{metric.value}</span>
                </div>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Asset Allocation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Asset Allocation Risk
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: 'Equities', value: 65, risk: 'High' },
              { name: 'Fixed Income', value: 20, risk: 'Low' },
              { name: 'Alternatives', value: 10, risk: 'Medium' },
              { name: 'Cash', value: 5, risk: 'Very Low' },
            ].map((asset) => (
              <div key={asset.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{asset.name}</span>
                  <span className="text-sm">{asset.value}%</span>
                </div>
                <Progress value={asset.value} />
                <p className="text-xs text-muted-foreground mt-1">Risk: {asset.risk}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Health Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Portfolio Health Score
          </CardTitle>
          <CardDescription>Overall assessment of your portfolio risk profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Overall Health</span>
                <span className="text-2xl font-bold">7.2/10</span>
              </div>
              <Progress value={72} className="h-3" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Diversification', score: 8 },
                { label: 'Risk-Return', score: 6 },
                { label: 'Liquidity', score: 8 },
                { label: 'Volatility', score: 6 },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-2xl font-bold">{item.score}/10</p>
                </div>
              ))}
            </div>
            <Button className="w-full">Get Personalized Recommendations</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
