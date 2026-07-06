import { getCached, setCached } from '@/lib/cache'

const SEARCH_BASE = 'https://query1.finance.yahoo.com/v1/finance/search'
const CHART_BASE = 'https://query1.finance.yahoo.com/v8/finance/chart'
const SEARCH_TTL = 300_000
const QUOTE_TTL = 60_000
const HISTORY_TTL = 300_000

export type YahooSearchResult = {
  symbol: string
  shortname: string
  exchange: string
  quoteType: string
  source: 'yahoo'
}

export type YahooQuote = {
  symbol: string
  price: number
  changePercent: number
  volume?: number
  marketCap?: number
  fiftyTwoWeekHigh?: number
  fiftyTwoWeekLow?: number
}

export type YahooHistory = {
  symbol: string
  timestamps: number[]
  close: Array<number | null>
}

function buildCacheKey(prefix: string, identifier: string) {
  return `yahoo:${prefix}:${identifier}`
}

export async function searchYahoo(query: string): Promise<YahooSearchResult[]> {
  const trimmed = query.trim()
  if (!trimmed) return []

  const cacheKey = buildCacheKey('search', trimmed.toLowerCase())
  const cached = getCached<YahooSearchResult[]>(cacheKey)
  if (cached) return cached

  const response = await fetch(`${SEARCH_BASE}?q=${encodeURIComponent(trimmed)}&quotesCount=10&newsCount=0`)
  if (!response.ok) return []

  const json = await response.json()
  const quotes = Array.isArray(json?.quotes) ? json.quotes : []
  const results = quotes.map((item: any) => ({
    symbol: item.symbol ?? '',
    shortname: item.shortname ?? item.longname ?? item.exchange ?? '',
    exchange: item.exchange ?? 'N/A',
    quoteType: item.quoteType ?? 'unknown',
    source: 'yahoo' as const,
  }))

  setCached(cacheKey, results, SEARCH_TTL)
  return results
}

export async function getQuote(symbol: string): Promise<YahooQuote | null> {
  const cacheKey = buildCacheKey('quote', symbol)
  const cached = getCached<YahooQuote>(cacheKey)
  if (cached) return cached

  const response = await fetch(
    `${CHART_BASE}/${encodeURIComponent(symbol)}?interval=1d&range=1d`
  )
  if (!response.ok) return null

  const json = await response.json()
  const result = json?.chart?.result?.[0]
  const meta = result?.meta
  if (!meta) return null

  const quote: YahooQuote = {
    symbol,
    price: meta.regularMarketPrice ?? 0,
    changePercent: meta.regularMarketChangePercent ?? 0,
    volume: meta.regularMarketVolume,
    marketCap: meta.marketCap,
    fiftyTwoWeekHigh: meta.fiftyTwoWeekHigh,
    fiftyTwoWeekLow: meta.fiftyTwoWeekLow,
  }

  setCached(cacheKey, quote, QUOTE_TTL)
  return quote
}

export async function getHistory(symbol: string, range = '1mo'): Promise<YahooHistory | null> {
  const cacheKey = buildCacheKey('history', `${symbol}:${range}`)
  const cached = getCached<YahooHistory>(cacheKey)
  if (cached) return cached

  const response = await fetch(
    `${CHART_BASE}/${encodeURIComponent(symbol)}?interval=1d&range=${encodeURIComponent(range)}`
  )
  if (!response.ok) return null

  const json = await response.json()
  const result = json?.chart?.result?.[0]
  const timestamps: number[] = Array.isArray(result?.timestamp) ? result.timestamp : []
  const close = Array.isArray(result?.indicators?.quote?.[0]?.close)
    ? result.indicators.quote[0].close
    : []

  const history: YahooHistory = {
    symbol,
    timestamps,
    close,
  }

  setCached(cacheKey, history, HISTORY_TTL)
  return history
}

export async function getBatchQuotes(symbols: string[]): Promise<Array<YahooQuote | null>> {
  const tasks = symbols.map((symbol) => getQuote(symbol))
  return Promise.all(tasks)
}
