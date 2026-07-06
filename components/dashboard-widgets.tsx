"use client"

import * as React from 'react'
import Link from 'next/link'
import { useFetch } from '@/hooks/useFetch'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { ArrowRight, TrendingUp, TrendingDown, Globe, BarChart3, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const sectionCard = 'w-full rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-sm'
const headerText = 'flex items-center justify-between gap-2 mb-4'
const sectionTitle = 'text-sm font-semibold tracking-[0.12em] uppercase text-slate-900 dark:text-slate-200'
const sectionLink = 'text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
const positiveClass = 'text-emerald-500'
const negativeClass = 'text-rose-500'

type QuoteRow = {
  symbol: string
  name: string
  price: string
  changePercent: number
  change: number
  exchange?: string
}

type CryptoRow = QuoteRow & {
  marketCap: string
  volume: string
  year52Change: string
}

const trendingFeatured = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
]

const trendingSymbols = [
  { symbol: 'AAPL', name: 'Apple' },
  { symbol: 'TSLA', name: 'Tesla' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'NVDA', name: 'NVIDIA' },
  { symbol: 'GOOGL', name: 'Alphabet' },
  { symbol: 'AMZN', name: 'Amazon' },
  { symbol: 'META', name: 'Meta' },
  { symbol: 'RELIANCE.NS', name: 'Reliance' },
  { symbol: 'TCS.NS', name: 'TCS' },
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank' },
]

const commoditySymbols = [
  { symbol: 'GC=F', name: 'Gold' },
  { symbol: 'SI=F', name: 'Silver' },
  { symbol: 'HG=F', name: 'Copper' },
  { symbol: 'CL=F', name: 'Crude Oil' },
  { symbol: 'NG=F', name: 'Natural Gas' },
]

const currencySymbols = [
  { symbol: 'USDJPY=X', name: 'USD/JPY' },
  { symbol: 'EURUSD=X', name: 'EUR/USD' },
  { symbol: 'GBPUSD=X', name: 'GBP/USD' },
]

const treasurySymbols = [
  { symbol: '^IRX', name: '13-Week Treasury' },
  { symbol: '^FVX', name: '5-Year Treasury' },
  { symbol: '^TNX', name: '10-Year Treasury' },
  { symbol: '^TYX', name: '30-Year Treasury' },
]

const etfTabs = {
  gainers: [
    { symbol: 'SPY', name: 'SPDR S&P 500 ETF' },
    { symbol: 'QQQ', name: 'Invesco QQQ' },
    { symbol: 'IWM', name: 'iShares Russell 2000' },
    { symbol: 'GLD', name: 'SPDR Gold Shares' },
    { symbol: 'EEM', name: 'iShares MSCI Emerging Markets' },
  ],
  active: [
    { symbol: 'SPY', name: 'SPDR S&P 500 ETF' },
    { symbol: 'QQQ', name: 'Invesco QQQ' },
    { symbol: 'EEM', name: 'iShares MSCI Emerging Markets' },
    { symbol: 'DIA', name: 'SPDR Dow Jones Industrial' },
    { symbol: 'VTI', name: 'Vanguard Total Stock Market' },
  ],
  losers: [
    { symbol: 'XLK', name: 'Technology Select Sector' },
    { symbol: 'XLF', name: 'Financial Select Sector' },
    { symbol: 'XLE', name: 'Energy Select Sector' },
    { symbol: 'XLY', name: 'Consumer Discretionary' },
    { symbol: 'IYR', name: 'iShares US Real Estate' },
  ],
}

const mutualFundTabs = {
  gainers: [
    { symbol: 'SBI', name: 'SBI Bluechip Fund' },
    { symbol: 'HDFC', name: 'HDFC Top 100 Fund' },
    { symbol: 'ICICI', name: 'ICICI Prudential Growth' },
    { symbol: 'AXIS', name: 'Axis Bluechip Fund' },
    { symbol: 'MIRA', name: 'Mirae Asset Large Cap' },
  ],
  losers: [
    { symbol: 'UTI', name: 'UTI Mid Cap Fund' },
    { symbol: 'PNB', name: 'PNB Prudence Fund' },
    { symbol: 'MFS', name: 'Mirae Asset Focused Fund' },
    { symbol: 'KOTAK', name: 'Kotak Standard Multicap' },
    { symbol: 'NIP', name: 'Nippon India Small Cap' },
  ],
  performing: [
    { symbol: 'PARAG', name: 'Parag Parikh Flexi Cap' },
    { symbol: 'SBI', name: 'SBI Small Cap Fund' },
    { symbol: 'HDFCB', name: 'HDFC Mid-Cap Opp Fund' },
    { symbol: 'ICICI', name: 'ICICI Prudential Value' },
    { symbol: 'AXISB', name: 'Axis Long Term Equity' },
  ],
}

const economicEvents = [
  { name: 'Imports - USD', date: 'Jul 5, 2026, 8:00 PM EDT', url: '#' },
  { name: 'Consumer Sentiment', date: 'Jul 6, 2026, 7:30 PM EDT', url: '#' },
  { name: 'Jobs Report', date: 'Jul 10, 2026, 8:30 PM EDT', url: '#' },
]

const sectorData = [
  { sector: 'Technology', weight: 24.6, ytd: 18.3 },
  { sector: 'Financial', weight: 18.2, ytd: 12.1 },
  { sector: 'Industrial', weight: 12.7, ytd: 9.4 },
  { sector: 'Consumer', weight: 11.3, ytd: 10.8 },
  { sector: 'Healthcare', weight: 10.1, ytd: 6.7 },
  { sector: 'Energy', weight: 6.2, ytd: 5.1 },
  { sector: 'Metals', weight: 5.1, ytd: 3.2 },
  { sector: 'Realty', weight: 4.5, ytd: 2.6 },
  { sector: 'Utilities', weight: 3.8, ytd: 1.9 },
]

const quoteLookupExample = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: '$173.82', change: 1.4 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: '$812.50', change: -0.8 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: '$392.20', change: 0.9 },
]

function toCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value)
}

async function fetchYahooQuotes(symbols: Array<{ symbol: string; name: string }>) {
  const results = await Promise.all(
    symbols.map(async (item) => {
      try {
        const response = await fetch(`/api/proxy?source=yahoo&symbol=${encodeURIComponent(item.symbol)}`, { cache: 'no-store' })
        if (!response.ok) throw new Error('fetch failed')
        const json = await response.json()
        const quote = json?.quote
        return {
          symbol: item.symbol,
          name: item.name,
          price: quote?.price ? toCurrency(quote.price) : '-',
          changePercent: quote?.changePercent ?? 0,
          change: quote?.price && quote?.changePercent ? quote.price * quote.changePercent / 100 : quote?.change ?? 0,
        }
      } catch {
        return {
          symbol: item.symbol,
          name: item.name,
          price: '-',
          changePercent: 0,
          change: 0,
        }
      }
    })
  )

  return results
}

async function fetchCryptoMarketData() {
  const response = await fetch('/api/proxy?source=coingecko', { cache: 'no-store' })
  if (!response.ok) return []
  const json = await response.json()
  if (!Array.isArray(json?.results)) return []

  return json.results.map((item: any) => ({
    symbol: (item.symbol ?? '').toUpperCase(),
    name: item.name ?? '',
    price: item.current_price ? toCurrency(item.current_price) : '-',
    changePercent: item.price_change_percentage_24h ?? 0,
    change: item.price_change_24h ?? 0,
    marketCap: item.market_cap ? new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(item.market_cap) : '-',
    volume: item.total_volume ? new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(item.total_volume) : '-',
    year52Change: item.price_change_percentage_52_weeks_in_currency ? `${item.price_change_percentage_52_weeks_in_currency.toFixed(1)}%` : '-',
  }))
}

export function DashboardWidgets() {
  const { data: trendingData = [], isLoading: trendingLoading } = useFetch(
    async () => fetchYahooQuotes(trendingSymbols),
    [],
    5000
  )

  const { data: assetData = [], isLoading: assetLoading } = useFetch(
    async () => fetchYahooQuotes([...commoditySymbols, ...currencySymbols, ...treasurySymbols]),
    [],
    5000
  )

  const { data: cryptoData = [], isLoading: cryptoLoading } = useFetch(
    async () => fetchCryptoMarketData(),
    [],
    5000
  )

  const featured = trendingData.slice(0, 2)
  const scrollItems = trendingData.slice(0, 10)

  const commodityRows = assetData.slice(0, commoditySymbols.length)
  const currencyRows = assetData.slice(commoditySymbols.length, commoditySymbols.length + currencySymbols.length)
  const treasuryRows = assetData.slice(commoditySymbols.length + currencySymbols.length)

  const cryptoTabRows = {
    all: cryptoData.slice(0, 10),
    active: [...cryptoData].sort((a, b) => {
      const aVol = Number(a.volume.replace(/[^0-9.-]+/g, ''))
      const bVol = Number(b.volume.replace(/[^0-9.-]+/g, ''))
      return bVol - aVol
    }).slice(0, 10),
    gainers: [...cryptoData].sort((a, b) => b.changePercent - a.changePercent).slice(0, 10),
    losers: [...cryptoData].sort((a, b) => a.changePercent - b.changePercent).slice(0, 10),
  }

  const [assetTab, setAssetTab] = React.useState('commodities')
  const [cryptoTab, setCryptoTab] = React.useState('all')
  const [etfTab, setEtfTab] = React.useState<'gainers' | 'active' | 'losers'>('gainers')
  const [mfTab, setMfTab] = React.useState<'gainers' | 'losers' | 'performing'>('gainers')
  const [worldTab, setWorldTab] = React.useState('sectors')

  const worldQuoteLookup = React.useMemo(
    () => quoteLookupExample,
    []
  )

  return (
    <div className="space-y-5">
      {/* Widget 1: Stocks Trending */}
      <section className={`${sectionCard} p-5`}>
        <div className={headerText}>
          <div>
            <p className={sectionTitle}>Stocks &gt; Trending Now</p>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Featured movers and live market momentum</h2>
          </div>
          <Link href="/stocks" className={sectionLink}>
            See More <ArrowRight className="inline-block h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {featured.map((item) => {
            const positive = item.changePercent >= 0
            return (
              <Link
                key={item.symbol}
                href={`/stocks/${encodeURIComponent(item.symbol)}`}
                className="block rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-5 transition hover:border-cyan-400/40"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Featured stock</p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{item.name}</p>
                  </div>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{item.price}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.symbol}</p>
                  </div>
                  <div className={cn('rounded-2xl px-3 py-2 text-sm font-semibold', positive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500')}>
                    {positive ? '+' : ''}{item.changePercent.toFixed(2)}%
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-950">
              <tr>
                <th className="px-4 py-3">Symbol</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Change%</th>
              </tr>
            </thead>
            <tbody>
              {trendingLoading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse bg-slate-100 dark:bg-slate-900">
                    <td className="px-4 py-4 h-12" colSpan={4} />
                  </tr>
                ))
              ) : (
                scrollItems.map((item, idx) => {
                  const positive = item.changePercent >= 0
                  return (
                    <tr key={item.symbol} className={idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}>
                      <td className="px-4 py-4 font-semibold text-slate-900 dark:text-slate-100">{item.symbol}</td>
                      <td className="px-4 py-4 text-slate-500 dark:text-slate-400">{item.name}</td>
                      <td className="px-4 py-4">{item.price}</td>
                      <td className={cn('px-4 py-4 font-semibold', positive ? positiveClass : negativeClass)}>
                        {positive ? '+' : ''}{item.changePercent.toFixed(2)}%
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Widget 2: Assets */}
      <section className={`${sectionCard} p-5`}>
        <div className={headerText}>
          <div>
            <p className={sectionTitle}>Assets &gt; Commodities, Currencies & Bonds</p>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Live asset classes across global markets</h2>
          </div>
          <Link href="/markets" className={sectionLink}>
            See More <ArrowRight className="inline-block h-4 w-4" />
          </Link>
        </div>

        <Tabs value={assetTab} onValueChange={setAssetTab} className="space-y-4">
          <TabsList className="rounded-3xl bg-slate-100 p-1 dark:bg-slate-950">
            <TabsTrigger value="commodities">Commodities</TabsTrigger>
            <TabsTrigger value="currencies">Currencies</TabsTrigger>
            <TabsTrigger value="treasury">US Treasury Bonds</TabsTrigger>
          </TabsList>

          <TabsContent value="commodities">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-950">
                  <tr>
                    <th className="px-4 py-3">Symbol</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Change%</th>
                  </tr>
                </thead>
                <tbody>
                  {assetLoading ? (
                    Array.from({ length: 5 }).map((_, idx) => (
                      <tr key={idx} className="animate-pulse bg-slate-100 dark:bg-slate-900"><td className="px-4 py-4 h-12" colSpan={3} /></tr>
                    ))
                  ) : (
                    commodityRows.map((item, idx) => {
                      const positive = item.changePercent >= 0
                      return (
                        <tr key={item.symbol} className={idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}>
                          <td className="px-4 py-4 font-semibold text-slate-900 dark:text-slate-100">{item.symbol}</td>
                          <td className="px-4 py-4">{item.price}</td>
                          <td className={cn('px-4 py-4 font-semibold', positive ? positiveClass : negativeClass)}>{positive ? '+' : ''}{item.changePercent.toFixed(2)}%</td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="currencies">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-950">
                  <tr>
                    <th className="px-4 py-3">Symbol</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Change%</th>
                  </tr>
                </thead>
                <tbody>
                  {assetLoading ? (
                    Array.from({ length: 3 }).map((_, idx) => (
                      <tr key={idx} className="animate-pulse bg-slate-100 dark:bg-slate-900"><td className="px-4 py-4 h-12" colSpan={3} /></tr>
                    ))
                  ) : (
                    currencyRows.map((item, idx) => {
                      const positive = item.changePercent >= 0
                      return (
                        <tr key={item.symbol} className={idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}>
                          <td className="px-4 py-4 font-semibold text-slate-900 dark:text-slate-100">{item.symbol}</td>
                          <td className="px-4 py-4">{item.price}</td>
                          <td className={cn('px-4 py-4 font-semibold', positive ? positiveClass : negativeClass)}>{positive ? '+' : ''}{item.changePercent.toFixed(2)}%</td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="treasury">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-950">
                  <tr>
                    <th className="px-4 py-3">Symbol</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Change%</th>
                  </tr>
                </thead>
                <tbody>
                  {assetLoading ? (
                    Array.from({ length: 4 }).map((_, idx) => (
                      <tr key={idx} className="animate-pulse bg-slate-100 dark:bg-slate-900"><td className="px-4 py-4 h-12" colSpan={3} /></tr>
                    ))
                  ) : (
                    treasuryRows.map((item, idx) => {
                      const positive = item.changePercent >= 0
                      return (
                        <tr key={item.symbol} className={idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}>
                          <td className="px-4 py-4 font-semibold text-slate-900 dark:text-slate-100">{item.symbol}</td>
                          <td className="px-4 py-4">{item.price}</td>
                          <td className={cn('px-4 py-4 font-semibold', positive ? positiveClass : negativeClass)}>{positive ? '+' : ''}{item.changePercent.toFixed(2)}%</td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Widget 3: Cryptocurrencies */}
      <section className={`${sectionCard} p-5`}>
        <div className={headerText}>
          <div>
            <p className={sectionTitle}>Cryptocurrencies</p>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Market movers across digital assets</h2>
          </div>
          <Link href="/crypto" className={sectionLink}>
            See More <ArrowRight className="inline-block h-4 w-4" />
          </Link>
        </div>

        <Tabs value={cryptoTab} onValueChange={setCryptoTab} className="space-y-4">
          <TabsList className="rounded-3xl bg-slate-100 p-1 dark:bg-slate-950">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Most Active</TabsTrigger>
            <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
            <TabsTrigger value="losers">Top Losers</TabsTrigger>
          </TabsList>

          <TabsContent value={cryptoTab}>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-950">
                  <tr>
                    <th className="px-4 py-3">Symbol</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Change%</th>
                    <th className="px-4 py-3">Market Cap</th>
                    <th className="px-4 py-3">Volume</th>
                    <th className="px-4 py-3">52Wk%</th>
                  </tr>
                </thead>
                <tbody>
                  {cryptoLoading ? (
                    Array.from({ length: 8 }).map((_, idx) => (
                      <tr key={idx} className="animate-pulse bg-slate-100 dark:bg-slate-900"><td className="px-4 py-4 h-12" colSpan={6} /></tr>
                    ))
                  ) : (
                    cryptoTabRows[cryptoTab as keyof typeof cryptoTabRows].map((item, idx) => {
                      const positive = item.changePercent >= 0
                      return (
                        <tr key={item.symbol} className={idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}>
                          <td className="px-4 py-4 font-semibold text-slate-900 dark:text-slate-100">{item.symbol}</td>
                          <td className="px-4 py-4">{item.price}</td>
                          <td className={cn('px-4 py-4 font-semibold', positive ? positiveClass : negativeClass)}>{positive ? '+' : ''}{item.changePercent.toFixed(2)}%</td>
                          <td className="px-4 py-4">{item.marketCap}</td>
                          <td className="px-4 py-4">{item.volume}</td>
                          <td className="px-4 py-4">{item.year52Change}</td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Widget 4: ETFs + Mutual Funds */}
      <section className={`${sectionCard} p-5`}>
        <div className={headerText}>
          <div>
            <p className={sectionTitle}>ETFs + Mutual Funds</p>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Track major funds and tomorrow’s economic catalysts</h2>
          </div>
          <Link href="/mutual-funds" className={sectionLink}>
            See More <ArrowRight className="inline-block h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6 mb-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">ETFs</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Top movers in exchange traded funds</p>
              </div>
            </div>
            <Tabs value={etfTab} onValueChange={setEtfTab} className="space-y-4">
              <TabsList className="rounded-full bg-slate-100 p-1 dark:bg-slate-900">
                <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
                <TabsTrigger value="active">Most Active</TabsTrigger>
                <TabsTrigger value="losers">Top Losers</TabsTrigger>
              </TabsList>
              <TabsContent value={etfTab}>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm text-slate-700 dark:text-slate-300">
                    <thead className="bg-white dark:bg-slate-950">
                      <tr>
                        <th className="px-4 py-3">Symbol</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Change%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {etfTabs[etfTab].map((item, idx) => {
                        const changeValue = etfTab === 'losers' ? -1.2 + idx * 0.15 : 1.4 - idx * 0.12
                        const positive = changeValue >= 0
                        return (
                          <tr key={item.symbol} className={idx % 2 === 0 ? 'bg-slate-50 dark:bg-slate-950' : 'bg-white dark:bg-slate-900'}>
                            <td className="px-4 py-4 font-semibold text-slate-900 dark:text-slate-100">{item.symbol}</td>
                            <td className="px-4 py-4 text-slate-500 dark:text-slate-400 truncate max-w-[160px]">{item.name}</td>
                            <td className="px-4 py-4">{toCurrency(100 + idx * 7.5)}</td>
                            <td className={cn('px-4 py-4 font-semibold', positive ? positiveClass : negativeClass)}>{positive ? '+' : ''}{changeValue.toFixed(2)}%</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Mutual Funds</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Top performing schemes by category</p>
              </div>
            </div>
            <Tabs value={mfTab} onValueChange={setMfTab} className="space-y-4">
              <TabsList className="rounded-full bg-slate-100 p-1 dark:bg-slate-900">
                <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
                <TabsTrigger value="losers">Top Losers</TabsTrigger>
                <TabsTrigger value="performing">Top Performing</TabsTrigger>
              </TabsList>
              <TabsContent value={mfTab}>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm text-slate-700 dark:text-slate-300">
                    <thead className="bg-white dark:bg-slate-950">
                      <tr>
                        <th className="px-4 py-3">Symbol</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Change%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mutualFundTabs[mfTab].map((item, idx) => {
                        const changeValue = mfTab === 'losers' ? -0.9 + idx * 0.12 : 1.9 - idx * 0.18
                        const positive = changeValue >= 0
                        return (
                          <tr key={item.symbol} className={idx % 2 === 0 ? 'bg-slate-50 dark:bg-slate-950' : 'bg-white dark:bg-slate-900'}>
                            <td className="px-4 py-4 font-semibold text-slate-900 dark:text-slate-100">{item.symbol}</td>
                            <td className="px-4 py-4 text-slate-500 dark:text-slate-400 truncate max-w-[160px]">{item.name}</td>
                            <td className="px-4 py-4">{toCurrency(45 + idx * 5.2)}</td>
                            <td className={cn('px-4 py-4 font-semibold', positive ? positiveClass : negativeClass)}>{positive ? '+' : ''}{changeValue.toFixed(2)}%</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Top Economic Events</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Upcoming releases that can move markets</p>
            </div>
          </div>
          <div className="space-y-3">
            {economicEvents.map((event) => (
              <Link key={event.name} href={event.url} className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 transition hover:bg-slate-50 dark:hover:bg-slate-800">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{event.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{event.date}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Widget 5: World Overview */}
      <section className={`${sectionCard} p-5`}>
        <div className={headerText}>
          <div>
            <p className={sectionTitle}>World Overview</p>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Global markets, sectors and daily momentum</h2>
          </div>
          <Link href="/markets" className={sectionLink}>
            See More <ArrowRight className="inline-block h-4 w-4" />
          </Link>
        </div>

        <Tabs value={worldTab} onValueChange={setWorldTab} className="space-y-4">
          <TabsList className="rounded-3xl bg-slate-100 p-1 dark:bg-slate-950">
            <TabsTrigger value="world">World Indices</TabsTrigger>
            <TabsTrigger value="futures">Futures</TabsTrigger>
            <TabsTrigger value="currencies">Currencies</TabsTrigger>
            <TabsTrigger value="options">Options</TabsTrigger>
            <TabsTrigger value="sectors">Sectors</TabsTrigger>
          </TabsList>

          <TabsContent value="sectors">
            <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
              <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-4">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  <BarChart3 className="h-5 w-5" />
                  Sector Breakdown
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm text-slate-700 dark:text-slate-300">
                    <thead className="bg-white dark:bg-slate-950">
                      <tr>
                        <th className="px-4 py-3">Sector</th>
                        <th className="px-4 py-3">Weight</th>
                        <th className="px-4 py-3">YTD Return</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sectorData.map((item, idx) => (
                        <tr key={item.sector} className={idx % 2 === 0 ? 'bg-slate-50 dark:bg-slate-950' : 'bg-white dark:bg-slate-900'}>
                          <td className="px-4 py-4 font-semibold text-slate-900 dark:text-slate-100">{item.sector}</td>
                          <td className="px-4 py-4">
                            <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-800">
                              <div className="h-2.5 rounded-full bg-cyan-500" style={{ width: `${item.weight}%` }} />
                            </div>
                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{item.weight}%</p>
                          </td>
                          <td className={cn('px-4 py-4 font-semibold', item.ytd >= 0 ? positiveClass : negativeClass)}>{item.ytd >= 0 ? '+' : ''}{item.ytd.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-4">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  <Search className="h-5 w-5" />
                  Quote Lookup
                </div>
                <Input placeholder="Search symbol or index" className="mb-4 bg-slate-900/5 text-slate-900 dark:bg-slate-900 dark:text-slate-100" />
                <div className="grid gap-3">
                  <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Top Gainers</p>
                    {quoteLookupExample.map((item) => (
                      <div key={item.symbol} className="mt-3 flex items-center justify-between gap-3 text-sm text-slate-700 dark:text-slate-300">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">{item.symbol}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{item.name}</p>
                        </div>
                        <div className="font-semibold text-emerald-500">+1.2%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="world">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-4">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">World Indices snapshot</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {quoteLookupExample.slice(0, 3).map((item) => (
                  <div key={item.symbol} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.symbol}</p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{item.price}</p>
                    <p className={cn('text-sm font-medium', item.change >= 0 ? positiveClass : negativeClass)}>{item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="futures">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-4">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Futures overview</p>
              <div className="grid gap-3 mt-4">
                {quoteLookupExample.slice(0, 3).map((item) => (
                  <div key={item.symbol} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                      <span>{item.symbol}</span>
                      <span className={cn(item.change >= 0 ? positiveClass : negativeClass)}>{item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%</span>
                    </div>
                    <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="currencies">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-4">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Currency pairs</p>
              <div className="grid gap-3 mt-4">
                {currencySymbols.map((item) => (
                  <div key={item.symbol} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-slate-700 dark:text-slate-300">
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      <span className="font-semibold text-emerald-500">+0.32%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="options">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-4">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Options flow</p>
              <div className="grid gap-3 mt-4">
                {quoteLookupExample.slice(0, 3).map((item) => (
                  <div key={item.symbol} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-slate-700 dark:text-slate-300">
                    <div className="flex items-center justify-between">
                      <span>{item.symbol}</span>
                      <span className="font-semibold text-slate-500">{item.price}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">Options volume trending</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
