'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PortfolioAnalysis } from '@/components/portfolio-analysis'
import { PortfolioGauge } from '@/components/portfolio-gauge'
import { QuantMetricsPanel } from '@/components/quant-metrics-panel'
import { RiskManagement } from '@/components/risk-management'
import { StrategyBuilder } from '@/components/strategy-builder'
import { MarketDataModule } from '@/components/market-data-module'

export default function AnalyticsPage() {
  return (
    <div className="w-full px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analytics & Insights</h1>
        <p className="text-muted-foreground mt-2">Comprehensive portfolio analysis, risk management, and strategy building</p>
      </div>

      <Tabs defaultValue="portfolio" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
        </TabsList>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio" className="space-y-6">
          <PortfolioAnalysis />
        </TabsContent>

        {/* Metrics Tab */}
        <TabsContent value="metrics" className="space-y-6">
          <QuantMetricsPanel />
        </TabsContent>

        {/* Risk Management Tab */}
        <TabsContent value="risk" className="space-y-6">
          <RiskManagement />
        </TabsContent>

        {/* Strategy Builder Tab */}
        <TabsContent value="strategy" className="space-y-6">
          <StrategyBuilder />
        </TabsContent>

        {/* Market Data Tab */}
        <TabsContent value="market" className="space-y-6">
          <MarketDataModule />
        </TabsContent>

        {/* Health Gauge Tab */}
        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <PortfolioGauge score={72} />
            </div>
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="p-6 border rounded-lg">
                  <h3 className="font-bold text-lg mb-4">Health Score Breakdown</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <p>Diversification</p>
                        <p className="font-bold">78/100</p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }} /></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <p>Risk Management</p>
                        <p className="font-bold">65/100</p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }} /></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <p>Performance</p>
                        <p className="font-bold">72/100</p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }} /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
