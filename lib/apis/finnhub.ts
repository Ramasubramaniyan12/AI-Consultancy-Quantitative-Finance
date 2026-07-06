import { getCached, setCached } from '@/lib/cache'

const BASE_URL = 'https://finnhub.io/api/v1'
const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_KEY ?? ''
const QUOTE_TTL = 60_000
const NEWS_TTL = 900_000
const EARNINGS_TTL = 900_000

function buildUrl(path: string, params: Record<string, string>) {
  const url = new URL(`${BASE_URL}/${path}`)
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value)
  })
  url.searchParams.set('token', API_KEY)
  return url.toString()
}

function buildCacheKey(prefix: string, identifier: string) {
  return `finnhub:${prefix}:${identifier}`
}

export type FinnhubSearchResult = {
  symbol: string
  description: string
  source: 'finnhub'
}

export type FinnhubQuote = {
  symbol: string
  current: number
  change: number
  changePercent: number
  high: number
  low: number
  open: number
  prevClose: number
}

export type FinnhubCompanyNews = {
  category: string
  datetime: number
  headline: string
  id: number
  image: string
  related: string
  source: string
  summary: string
  url: string
}

export async function searchFinnhub(query: string): Promise<FinnhubSearchResult[]> {
  const trimmed = query.trim()
  if (!trimmed || !API_KEY) return []

  const cacheKey = buildCacheKey('search', trimmed.toLowerCase())
  const cached = getCached<FinnhubSearchResult[]>(cacheKey)
  if (cached) return cached

  const response = await fetch(buildUrl('search', { q: trimmed }))
  if (!response.ok) return []

  const json = await response.json()
  const result = Array.isArray(json?.result) ? json.result : []
  const parsed = result.slice(0, 10).map((item: any) => ({
    symbol: item.symbol ?? '',
    description: item.description ?? '',
    source: 'finnhub' as const,
  }))

  setCached(cacheKey, parsed, QUOTE_TTL)
  return parsed
}

export async function getQuote(symbol: string): Promise<FinnhubQuote | null> {
  if (!API_KEY) return null
  const cacheKey = buildCacheKey('quote', symbol)
  const cached = getCached<FinnhubQuote>(cacheKey)
  if (cached) return cached

  const response = await fetch(buildUrl('quote', { symbol }))
  if (!response.ok) return null

  const json = await response.json()
  const quote: FinnhubQuote = {
    symbol,
    current: json?.c ?? 0,
    change: json?.d ?? 0,
    changePercent: json?.dp ?? 0,
    high: json?.h ?? 0,
    low: json?.l ?? 0,
    open: json?.o ?? 0,
    prevClose: json?.pc ?? 0,
  }

  setCached(cacheKey, quote, QUOTE_TTL)
  return quote
}

export async function companyProfile(symbol: string): Promise<any | null> {
  if (!API_KEY) return null
  const response = await fetch(buildUrl('stock/profile2', { symbol }))
  if (!response.ok) return null
  return response.json()
}

export async function companyNews(symbol: string, from: string, to: string): Promise<FinnhubCompanyNews[]> {
  if (!API_KEY) return []
  const cacheKey = buildCacheKey('company-news', `${symbol}:${from}:${to}`)
  const cached = getCached<FinnhubCompanyNews[]>(cacheKey)
  if (cached) return cached

  const response = await fetch(buildUrl('company-news', { symbol, from, to }))
  if (!response.ok) return []

  const json = await response.json()
  const result = Array.isArray(json) ? json : []
  setCached(cacheKey, result, NEWS_TTL)
  return result
}

export async function marketNews(category = 'general'): Promise<any[]> {
  if (!API_KEY) return []
  const cacheKey = buildCacheKey('market-news', category)
  const cached = getCached<any[]>(cacheKey)
  if (cached) return cached

  const response = await fetch(buildUrl('news', { category }))
  if (!response.ok) return []

  const json = await response.json()
  const result = Array.isArray(json) ? json : []
  setCached(cacheKey, result, NEWS_TTL)
  return result
}

export async function earningsCalendar(from: string, to: string): Promise<any[]> {
  if (!API_KEY) return []
  const cacheKey = buildCacheKey('earnings', `${from}:${to}`)
  const cached = getCached<any[]>(cacheKey)
  if (cached) return cached

  const response = await fetch(buildUrl('calendar/earnings', { from, to }))
  if (!response.ok) return []

  const json = await response.json()
  const result = Array.isArray(json?.earningsCalendar) ? json.earningsCalendar : []
  setCached(cacheKey, result, EARNINGS_TTL)
  return result
}
