import { getCached, setCached } from '@/lib/cache'

const BASE_URL = 'https://api.coingecko.com/api/v3'
const SEARCH_TTL = 300_000

export type CoinGeckoSearchResult = {
  id: string
  symbol: string
  name: string
  thumb: string
  source: 'coingecko'
}

export type CoinGeckoPrice = Record<string, { inr?: number; usd?: number; inr_24h_change?: number }>

export async function searchCrypto(query: string): Promise<CoinGeckoSearchResult[]> {
  const trimmed = query.trim()
  if (!trimmed) return []

  const cacheKey = `coingecko:search:${trimmed.toLowerCase()}`
  const cached = getCached<CoinGeckoSearchResult[]>(cacheKey)
  if (cached) return cached

  const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(trimmed)}`)
  if (!response.ok) return []

  const json = await response.json()
  const coins = Array.isArray(json?.coins) ? json.coins : []
  const results = coins.slice(0, 10).map((item: any) => ({
    id: item.id ?? '',
    symbol: item.symbol ?? '',
    name: item.name ?? '',
    thumb: item.thumb ?? '',
    source: 'coingecko' as const,
  }))

  setCached(cacheKey, results, SEARCH_TTL)
  return results
}

export async function getMarketData(): Promise<any[] | null> {
  const cacheKey = 'coingecko:markets:inr'
  const cached = getCached<any[]>(cacheKey)
  if (cached) return cached

  const response = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=12&page=1&sparkline=false&price_change_percentage=24h,7d`
  )
  if (!response.ok) return null

  const json = await response.json()
  if (!Array.isArray(json)) return null

  setCached(cacheKey, json, SEARCH_TTL)
  return json
}

export async function getCoinDetail(id: string): Promise<any | null> {
  const response = await fetch(
    `${BASE_URL}/coins/${encodeURIComponent(id)}?localization=false&tickers=false&market_data=true&community_data=false`
  )
  if (!response.ok) return null
  return response.json()
}

export async function getSimplePrice(ids: string[]): Promise<CoinGeckoPrice | null> {
  if (ids.length === 0) return null
  const response = await fetch(
    `${BASE_URL}/simple/price?ids=${encodeURIComponent(ids.join(','))}&vs_currencies=inr,usd&include_24hr_change=true`
  )
  if (!response.ok) return null
  return response.json()
}
