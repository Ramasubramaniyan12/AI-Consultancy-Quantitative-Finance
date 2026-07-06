'use client'

import { useState } from 'react'
import { RatingSummaryCards } from '@/components/rating-summary-cards'
import { RatingBadge } from '@/components/rating-badge'
import { RatingsDisclaimer } from '@/components/ratings-disclaimer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Star, TrendingUp, TrendingDown, Eye, TrendingUpIcon } from 'lucide-react'

type RatingType = 'strong-buy' | 'buy' | 'hold' | 'sell' | 'strong-sell'

function getRatingType(score: number): RatingType {
  if (score >= 8.0) return 'strong-buy'
  if (score >= 6.0) return 'buy'
  if (score >= 4.0) return 'hold'
  if (score >= 2.0) return 'sell'
  return 'strong-sell'
}

function StarRating({ score }: { score: number }) {
  const fullStars = Math.floor(score / 2)
  const hasHalf = (score % 2) >= 1
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <div key={i}>
            {i < fullStars ? (
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ) : i === fullStars && hasHalf ? (
              <div className="relative w-4 h-4">
                <Star className="h-4 w-4 text-gray-300" />
                <div className="absolute inset-0 overflow-hidden w-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            ) : (
              <Star className="h-4 w-4 text-gray-300" />
            )}
          </div>
        ))}
      </div>
      <span className="text-sm font-medium text-[var(--text-primary)]">{score.toFixed(1)}/10</span>
    </div>
  )
}

// Sample data
const stocksData = [
  { company: 'RELIANCE', cqScore: 8.5, analysts: '32 Buy / 5 Hold / 1 Sell', aiScore: 8.2, aiConfidence: 'High', sector: 'Energy', marketCap: '₹19.2L Cr' },
  { company: 'TCS', cqScore: 7.8, analysts: '28 Buy / 8 Hold / 2 Sell', aiScore: 7.5, aiConfidence: 'High', sector: 'IT', marketCap: '₹15.1L Cr' },
  { company: 'HDFCBANK', cqScore: 8.1, analysts: '35 Buy / 3 Hold / 0 Sell', aiScore: 7.9, aiConfidence: 'High', sector: 'Banking', marketCap: '₹12.8L Cr' },
  { company: 'INFY', cqScore: 6.9, analysts: '22 Buy / 10 Hold / 5 Sell', aiScore: 6.5, aiConfidence: 'Medium', sector: 'IT', marketCap: '₹8.5L Cr' },
  { company: 'BHARTIARTL', cqScore: 7.5, analysts: '30 Buy / 4 Hold / 1 Sell', aiScore: 7.8, aiConfidence: 'High', sector: 'Telecom', marketCap: '₹5.2L Cr' },
  { company: 'TATAMOTORS', cqScore: 5.2, analysts: '15 Buy / 18 Hold / 8 Sell', aiScore: 5.0, aiConfidence: 'Medium', sector: 'Auto', marketCap: '₹3.1L Cr' },
]

const etfsData = [
  { name: 'NIFTY 50 ETF', cqScore: 8.8, category: 'Large Cap Index', expenseRatio: '0.04%', aiScore: 8.5, aiConfidence: 'High', return1y: '+18.5%' },
  { name: 'NIFTY NEXT 50 ETF', cqScore: 7.9, category: 'Large & Mid Cap', expenseRatio: '0.10%', aiScore: 7.6, aiConfidence: 'High', return1y: '+22.3%' },
  { name: 'NIFTY BANK ETF', cqScore: 6.8, category: 'Sectoral - Banking', expenseRatio: '0.12%', aiScore: 6.5, aiConfidence: 'Medium', return1y: '+12.1%' },
]

const bondsData = [
  { name: 'TATA CAPITAL 8.25% 2027', issuer: 'Tata Capital', cqScore: 8.2, creditRating: 'AA+', aiScore: 8.0, aiConfidence: 'High', yield: '8.35%', maturity: 'Apr 2027' },
  { name: 'LIC HOUSING 8.10% 2028', issuer: 'LIC Housing', cqScore: 8.5, creditRating: 'AAA', aiScore: 8.3, aiConfidence: 'High', yield: '8.18%', maturity: 'Nov 2028' },
]

const sectorsData = [
  { name: 'INFORMATION TECHNOLOGY', cqScore: 7.8, outlook: 'Bullish', topPick: 'TCS', ytd: '+28.4%', stocks: 45 },
  { name: 'BANKING & FINANCE', cqScore: 7.5, outlook: 'Bullish', topPick: 'HDFCBANK', ytd: '+12.1%', stocks: 38 },
  { name: 'HEALTHCARE & PHARMA', cqScore: 7.2, outlook: 'Bullish', topPick: 'SUNPHARMA', ytd: '+22.5%', stocks: 32 },
  { name: 'ENERGY & OIL', cqScore: 6.5, outlook: 'Neutral', topPick: 'RELIANCE', ytd: '+8.5%', stocks: 18 },
  { name: 'FMCG & CONSUMER', cqScore: 5.8, outlook: 'Neutral', topPick: 'HINDUNILVR', ytd: '+5.2%', stocks: 28 },
  { name: 'AUTO & EV', cqScore: 6.2, outlook: 'Neutral', topPick: 'MARUTI', ytd: '+15.8%', stocks: 22 },
  { name: 'REAL ESTATE', cqScore: 7.0, outlook: 'Bullish', topPick: 'DLF', ytd: '+35.6%', stocks: 15 },
  { name: 'METALS & MINING', cqScore: 5.5, outlook: 'Neutral', topPick: 'TATASTEEL', ytd: '+8.9%', stocks: 20 },
  { name: 'TELECOM', cqScore: 6.8, outlook: 'Bullish', topPick: 'BHARTIARTL', ytd: '+42.5%', stocks: 8 },
]

const commoditiesData = [
  { commodity: 'GOLD', cqScore: 8.0, category: 'Precious Metals', aiScore: 8.2, aiConfidence: 'High', ytd: '+15.8%', trend: 'Bullish' },
  { commodity: 'SILVER', cqScore: 7.2, category: 'Precious Metals', aiScore: 7.0, aiConfidence: 'Medium', ytd: '+18.2%', trend: 'Bullish' },
  { commodity: 'CRUDE OIL', cqScore: 5.5, category: 'Energy', aiScore: 5.2, aiConfidence: 'Medium', ytd: '-2.4%', trend: 'Neutral' },
  { commodity: 'NATURAL GAS', cqScore: 4.2, category: 'Energy', aiScore: 4.0, aiConfidence: 'Low', ytd: '-8.5%', trend: 'Bearish' },
  { commodity: 'COPPER', cqScore: 6.8, category: 'Base Metals', aiScore: 6.5, aiConfidence: 'Medium', ytd: '+8.2%', trend: 'Bullish' },
  { commodity: 'ALUMINIUM', cqScore: 5.8, category: 'Base Metals', aiScore: 5.5, aiConfidence: 'Medium', ytd: '+3.1%', trend: 'Neutral' },
]

const globalIndicesData = [
  { index: 'S&P 500', country: 'USA', flag: '🇺🇸', cqScore: 7.5, aiScore: 7.2, aiConfidence: 'High', ytd: '+24.2%', extRating: 'A+' },
  { index: 'NASDAQ 100', country: 'USA', flag: '🇺🇸', cqScore: 7.8, aiScore: 7.5, aiConfidence: 'High', ytd: '+28.5%', extRating: 'A+' },
  { index: 'FTSE 100', country: 'UK', flag: '🇬🇧', cqScore: 6.2, aiScore: 6.0, aiConfidence: 'Medium', ytd: '+8.2%', extRating: 'A' },
  { index: 'DAX', country: 'Germany', flag: '🇩🇪', cqScore: 6.8, aiScore: 6.5, aiConfidence: 'Medium', ytd: '+12.4%', extRating: 'A' },
  { index: 'NIKKEI 225', country: 'Japan', flag: '🇯🇵', cqScore: 7.0, aiScore: 6.8, aiConfidence: 'High', ytd: '+18.9%', extRating: 'A' },
  { index: 'HANG SENG', country: 'Hong Kong', flag: '🇭🇰', cqScore: 4.5, aiScore: 4.2, aiConfidence: 'Low', ytd: '-5.2%', extRating: 'BBB' },
  { index: 'SHANGHAI', country: 'China', flag: '🇨🇳', cqScore: 4.8, aiScore: 4.5, aiConfidence: 'Low', ytd: '+2.1%', extRating: 'BBB+' },
]

export default function RatingsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [ratingFilter, setRatingFilter] = useState('all-ratings')
  const [globalSubTab, setGlobalSubTab] = useState('indices')

  return (
    <div className="w-full px-8 py-6 bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Ratings & Analysis</h1>
        <p className="text-[var(--text-label)] mt-2">
          Comprehensive ratings across asset classes from multiple sources
        </p>
      </div>

      {/* Summary Cards */}
      <RatingSummaryCards />

      {/* Filter Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {['All', 'Stocks', 'ETFs', 'Bonds', 'Commodities', 'Global', 'Sectors'].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab.toLowerCase() ? 'default' : 'outline'}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className="rounded-full"
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Secondary Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {[
          { label: 'All Ratings', value: 'all-ratings' },
          { label: 'Chronos Quant Rating', value: 'chronos-quant' },
          { label: 'External Agencies', value: 'external-agencies' },
          { label: 'AI Rating', value: 'ai-rating' },
        ].map((filter) => (
          <Button 
            key={filter.value}
            variant={ratingFilter === filter.value ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setRatingFilter(filter.value)}
            className={`border border-[var(--border-color)] ${ratingFilter === filter.value ? 'bg-[var(--text-primary)] text-[var(--bg-card)]' : ''}`}
          >
            {filter.label}
          </Button>
        ))}
        <div className="ml-auto">
          <select className="px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] text-sm">
            <option>Sort by: Highest Rated</option>
            <option>Lowest Rated</option>
            <option>Most Reviewed</option>
            <option>Recently Updated</option>
          </select>
        </div>
      </div>

      {/* Tabs Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        {/* ALL TAB - Aggregated data */}
        <TabsContent value="all" className="space-y-4">
          <Card className="bg-[var(--bg-card)] border-[var(--border-color)]">
            <CardHeader>
              <CardTitle>All Ratings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border-color)]">
                      <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Asset</th>
                      <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Type</th>
                      {ratingFilter === 'all-ratings' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">CQ Rating</th>}
                      {ratingFilter === 'all-ratings' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">AI Rating</th>}
                      {ratingFilter === 'chronos-quant' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">CQ Score</th>}
                      {ratingFilter === 'ai-rating' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">AI Score</th>}
                      {ratingFilter === 'external-agencies' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">External Rating</th>}
                      <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Performance</th>
                      <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ...stocksData.slice(0, 2).map(s => ({ ...s, type: 'Stock', asset: s.company })),
                      ...etfsData.slice(0, 2).map(e => ({ ...e, type: 'ETF', asset: e.name })),
                      ...bondsData.slice(0, 1).map(b => ({ ...b, type: 'Bond', asset: b.name })),
                      ...commoditiesData.slice(0, 1).map(c => ({ ...c, type: 'Commodity', asset: c.commodity })),
                    ].map((item, idx) => (
                      <tr key={idx} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-hover)]">
                        <td className="py-4 px-4 font-medium text-[var(--text-primary)]">{item.asset}</td>
                        <td className="py-4 px-4 text-[var(--text-muted)] text-xs">{item.type}</td>
                        {ratingFilter === 'all-ratings' && (
                          <>
                            <td className="py-4 px-4"><StarRating score={item.cqScore} /></td>
                            <td className="py-4 px-4">{item.aiScore}/10</td>
                          </>
                        )}
                        {ratingFilter === 'chronos-quant' && <td className="py-4 px-4"><StarRating score={item.cqScore} /></td>}
                        {ratingFilter === 'ai-rating' && <td className="py-4 px-4">{item.aiScore}/10</td>}
                        {ratingFilter === 'external-agencies' && <td className="py-4 px-4">—</td>}
                        <td className="py-4 px-4 text-[var(--icon-green-text)] font-medium">{'ytd' in item ? item.ytd : 'N/A'}</td>
                        <td className="py-4 px-4"><Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stocks" className="space-y-4">
          <Card className="bg-[var(--bg-card)] border-[var(--border-color)]">
            <CardHeader>
              <CardTitle>Stock Ratings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border-color)]">
                      <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Company</th>
                      {ratingFilter === 'all-ratings' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">CQ Rating</th>}
                      {ratingFilter === 'chronos-quant' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">CQ Rating</th>}
                      {(ratingFilter === 'all-ratings' || ratingFilter === 'external-agencies') && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Analyst Consensus</th>}
                      {ratingFilter === 'all-ratings' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">AI Rating</th>}
                      {ratingFilter === 'ai-rating' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">AI Rating</th>}
                      <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Sector</th>
                      <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocksData.map((stock) => (
                      <tr key={stock.company} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-hover)] transition-colors">
                        <td className="py-4 px-4 font-medium text-[var(--text-primary)]">{stock.company}</td>
                        {(ratingFilter === 'all-ratings' || ratingFilter === 'chronos-quant') && (
                          <td className="py-4 px-4">
                            <div className="space-y-1">
                              <StarRating score={stock.cqScore} />
                              <RatingBadge rating={getRatingType(stock.cqScore)} size="sm" />
                            </div>
                          </td>
                        )}
                        {(ratingFilter === 'all-ratings' || ratingFilter === 'external-agencies') && <td className="py-4 px-4 text-[var(--text-primary)]">{stock.analysts}</td>}
                        {(ratingFilter === 'all-ratings' || ratingFilter === 'ai-rating') && (
                          <td className="py-4 px-4">
                            <div>
                              <p className="text-[var(--text-primary)]">{stock.aiScore}/10</p>
                              <p className="text-xs text-[var(--text-muted)]">{stock.aiConfidence} Confidence</p>
                            </div>
                          </td>
                        )}
                        <td className="py-4 px-4 text-[var(--text-primary)]">{stock.sector}</td>
                        <td className="py-4 px-4">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-[var(--text-muted)]">Showing 1-6 of 150 results</p>
                <div className="flex gap-2">
                  <Button variant="outline">← Prev</Button>
                  <Button variant="outline">1</Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <Button variant="outline">Next →</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="etfs" className="space-y-4">
          <Card className="bg-[var(--bg-card)] border-[var(--border-color)]">
            <CardHeader>
              <CardTitle>ETF Ratings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border-color)]">
                      <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">ETF Name</th>
                      {ratingFilter === 'all-ratings' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">CQ Rating</th>}
                      {ratingFilter === 'chronos-quant' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">CQ Rating</th>}
                      <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Category</th>
                      <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Expense Ratio</th>
                      {ratingFilter === 'all-ratings' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">AI Rating</th>}
                      {ratingFilter === 'ai-rating' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">AI Rating</th>}
                      <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">1Y Return</th>
                      <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {etfsData.map((etf) => (
                      <tr key={etf.name} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-hover)] transition-colors">
                        <td className="py-4 px-4 font-medium text-[var(--text-primary)]">{etf.name}</td>
                        {(ratingFilter === 'all-ratings' || ratingFilter === 'chronos-quant') && (
                          <td className="py-4 px-4">
                            <div className="space-y-1">
                              <StarRating score={etf.cqScore} />
                              <RatingBadge rating={getRatingType(etf.cqScore)} size="sm" />
                            </div>
                          </td>
                        )}
                        <td className="py-4 px-4 text-[var(--text-primary)]">{etf.category}</td>
                        <td className="py-4 px-4 text-[var(--text-primary)]">{etf.expenseRatio}</td>
                        {(ratingFilter === 'all-ratings' || ratingFilter === 'ai-rating') && (
                          <td className="py-4 px-4">
                            <div>
                              <p className="text-[var(--text-primary)]">{etf.aiScore}/10</p>
                              <p className="text-xs text-[var(--text-muted)]">{etf.aiConfidence} Confidence</p>
                            </div>
                          </td>
                        )}
                        <td className="py-4 px-4 text-[var(--text-primary)] font-medium">{etf.return1y}</td>
                        <td className="py-4 px-4">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bonds" className="space-y-4">
          <Card className="bg-[var(--bg-card)] border-[var(--border-color)]">
            <CardHeader>
              <CardTitle>Bond Ratings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border-color)]">
                      <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Bond Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Issuer</th>
                      {(ratingFilter === 'all-ratings' || ratingFilter === 'chronos-quant') && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">CQ Rating</th>}
                      {(ratingFilter === 'all-ratings' || ratingFilter === 'external-agencies') && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Credit Rating</th>}
                      {(ratingFilter === 'all-ratings' || ratingFilter === 'ai-rating') && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">AI Rating</th>}
                      <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Yield</th>
                      <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Maturity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bondsData.map((bond) => (
                      <tr key={bond.name} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-hover)] transition-colors">
                        <td className="py-4 px-4 font-medium text-[var(--text-primary)]">{bond.name}</td>
                        <td className="py-4 px-4 text-[var(--text-primary)]">{bond.issuer}</td>
                        {(ratingFilter === 'all-ratings' || ratingFilter === 'chronos-quant') && (
                          <td className="py-4 px-4">
                            <StarRating score={bond.cqScore} />
                          </td>
                        )}
                        {(ratingFilter === 'all-ratings' || ratingFilter === 'external-agencies') && (
                          <td className="py-4 px-4">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {bond.creditRating}
                            </span>
                          </td>
                        )}
                        {(ratingFilter === 'all-ratings' || ratingFilter === 'ai-rating') && <td className="py-4 px-4 text-[var(--text-primary)]">{bond.aiScore}/10</td>}
                        <td className="py-4 px-4 text-[var(--text-primary)]">{bond.yield}</td>
                        <td className="py-4 px-4 text-[var(--text-primary)]">{bond.maturity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sectors" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sectorsData.map((sector) => (
              <Card key={sector.name} className="bg-[var(--bg-card)] border-[var(--border-color)] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-[var(--text-primary)]">{sector.name}</h3>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <StarRating score={sector.cqScore} />
                      </div>
                      <RatingBadge rating={getRatingType(sector.cqScore)} size="sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-[var(--text-muted)]">AI Outlook</p>
                        <p className="text-[var(--text-primary)] font-medium">
                          {sector.outlook === 'Bullish' ? '🟢' : '🟡'} {sector.outlook}
                        </p>
                      </div>
                      <div>
                        <p className="text-[var(--text-muted)]">Top Pick</p>
                        <p className="text-[var(--text-primary)] font-medium">{sector.topPick}</p>
                      </div>
                      <div>
                        <p className="text-[var(--text-muted)]">YTD Performance</p>
                        <p className="text-[var(--text-primary)] font-medium text-[var(--icon-green-text)]">{sector.ytd}</p>
                      </div>
                      <div>
                        <p className="text-[var(--text-muted)]">Stocks Rated</p>
                        <p className="text-[var(--text-primary)] font-medium">{sector.stocks}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* COMMODITIES TAB */}
        <TabsContent value="commodities" className="space-y-4">
          <Card className="bg-[var(--bg-card)] border-[var(--border-color)]">
            <CardHeader>
              <CardTitle>Commodity Ratings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border-color)]">
                      <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Commodity</th>
                      {ratingFilter === 'all-ratings' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">CQ Rating</th>}
                      <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Category</th>
                      {ratingFilter === 'all-ratings' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">AI Rating</th>}
                      {ratingFilter === 'chronos-quant' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">CQ Score</th>}
                      {ratingFilter === 'ai-rating' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">AI Score</th>}
                      <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">YTD Return</th>
                      <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Trend</th>
                      <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commoditiesData.map((item) => (
                      <tr key={item.commodity} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-hover)]">
                        <td className="py-4 px-4 font-medium text-[var(--text-primary)]">{item.commodity}</td>
                        {ratingFilter === 'all-ratings' && <td className="py-4 px-4"><RatingBadge rating={getRatingType(item.cqScore)} size="sm" /></td>}
                        <td className="py-4 px-4 text-[var(--text-primary)]">{item.category}</td>
                        {ratingFilter === 'all-ratings' && <td className="py-4 px-4">{item.aiScore}/10 {item.aiConfidence}</td>}
                        {ratingFilter === 'chronos-quant' && <td className="py-4 px-4"><StarRating score={item.cqScore} /></td>}
                        {ratingFilter === 'ai-rating' && <td className="py-4 px-4">{item.aiScore}/10</td>}
                        <td className={`py-4 px-4 font-medium ${item.ytd.startsWith('+') ? 'text-[var(--icon-green-text)]' : 'text-[var(--icon-red-text)]'}`}>{item.ytd}</td>
                        <td className="py-4 px-4"><span className="text-xs">{item.trend === 'Bullish' ? '📈' : item.trend === 'Bearish' ? '📉' : '➡️'} {item.trend}</span></td>
                        <td className="py-4 px-4"><Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* GLOBAL TAB with sub-tabs */}
        <TabsContent value="global" className="space-y-4">
          <div className="flex gap-2 mb-4">
            {['indices', 'stocks', 'etfs', 'bonds'].map((subTab) => (
              <Button
                key={subTab}
                variant={globalSubTab === subTab ? 'default' : 'outline'}
                size="sm"
                onClick={() => setGlobalSubTab(subTab)}
                className="capitalize"
              >
                {subTab.charAt(0).toUpperCase() + subTab.slice(1)}
              </Button>
            ))}
          </div>

          {globalSubTab === 'indices' && (
            <Card className="bg-[var(--bg-card)] border-[var(--border-color)]">
              <CardHeader>
                <CardTitle>Global Indices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border-color)]">
                        <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Index</th>
                        <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Country</th>
                        {ratingFilter === 'all-ratings' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">CQ Rating</th>}
                        {ratingFilter === 'all-ratings' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">AI Rating</th>}
                        {ratingFilter === 'chronos-quant' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">CQ Score</th>}
                        {ratingFilter === 'ai-rating' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">AI Score</th>}
                        {ratingFilter === 'external-agencies' && <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">S&P Rating</th>}
                        <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">YTD Return</th>
                        <th className="text-left py-3 px-4 font-semibold text-[var(--text-label)]">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {globalIndicesData.map((item) => (
                        <tr key={item.index} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-hover)]">
                          <td className="py-4 px-4 font-medium text-[var(--text-primary)]">{item.index}</td>
                          <td className="py-4 px-4">{item.flag} {item.country}</td>
                          {ratingFilter === 'all-ratings' && (
                            <>
                              <td className="py-4 px-4"><RatingBadge rating={getRatingType(item.cqScore)} size="sm" /></td>
                              <td className="py-4 px-4">{item.aiScore}/10</td>
                            </>
                          )}
                          {ratingFilter === 'chronos-quant' && <td className="py-4 px-4"><StarRating score={item.cqScore} /></td>}
                          {ratingFilter === 'ai-rating' && <td className="py-4 px-4">{item.aiScore}/10</td>}
                          {ratingFilter === 'external-agencies' && <td className="py-4 px-4"><span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{item.extRating}</span></td>}
                          <td className="py-4 px-4 font-medium text-[var(--icon-green-text)]">{item.ytd}</td>
                          <td className="py-4 px-4"><Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {globalSubTab === 'stocks' && (
            <Card className="bg-[var(--bg-card)] border-[var(--border-color)]">
              <CardContent className="pt-6">
                <p className="text-[var(--text-muted)]">Global stocks data coming soon...</p>
              </CardContent>
            </Card>
          )}

          {globalSubTab === 'etfs' && (
            <Card className="bg-[var(--bg-card)] border-[var(--border-color)]">
              <CardContent className="pt-6">
                <p className="text-[var(--text-muted)]">Global ETFs data coming soon...</p>
              </CardContent>
            </Card>
          )}

          {globalSubTab === 'bonds' && (
            <Card className="bg-[var(--bg-card)] border-[var(--border-color)]">
              <CardContent className="pt-6">
                <p className="text-[var(--text-muted)]">Global bonds data coming soon...</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Disclaimer */}
      <div className="mt-16">
        <RatingsDisclaimer />
      </div>
    </div>
  )
}
