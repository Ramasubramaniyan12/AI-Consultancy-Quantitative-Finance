import { getCached, setCached } from '@/lib/cache'

const BASE_URL = 'https://api.mfapi.in'
const LIST_TTL = 86_400_000
const NAV_TTL = 3_600_000

export type MfSearchResult = {
  schemeCode: string
  schemeName: string
  fundHouse?: string
  schemeCategory?: string
  source: 'mfapi'
}

export async function fetchFundList(): Promise<Array<{ schemeCode: string; schemeName: string }>> {
  const cacheKey = 'mfapi:fund-list'
  const cached = getCached<Array<{ schemeCode: string; schemeName: string }>>(cacheKey)
  if (cached) return cached

  const response = await fetch(`${BASE_URL}/mf`)
  if (!response.ok) return []

  const json = await response.json()
  const funds = Array.isArray(json) ? json : []
  setCached(cacheKey, funds, LIST_TTL)
  return funds
}

export async function searchFunds(query: string): Promise<MfSearchResult[]> {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return []

  const funds = await fetchFundList()
  const matches = funds
    .filter((item) => item.schemeName.toLowerCase().includes(trimmed))
    .slice(0, 10)
    .map((item) => ({
      schemeCode: item.schemeCode,
      schemeName: item.schemeName,
      source: 'mfapi' as const,
    }))

  return matches
}

export async function getFundNav(schemeCode: string): Promise<any | null> {
  const cacheKey = `mfapi:nav:${schemeCode}`
  const cached = getCached<any>(cacheKey)
  if (cached) return cached

  const response = await fetch(`${BASE_URL}/mf/${encodeURIComponent(schemeCode)}`)
  if (!response.ok) return null

  const json = await response.json()
  setCached(cacheKey, json, NAV_TTL)
  return json
}
