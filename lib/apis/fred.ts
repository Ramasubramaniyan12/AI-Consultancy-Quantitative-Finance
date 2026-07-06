import { getCached, setCached } from '@/lib/cache'

const BASE_URL = 'https://api.stlouisfed.org/fred'
const API_KEY = process.env.FRED_API_KEY ?? ''
const TTL = 3_600_000

function buildUrl(path: string, params: Record<string, string>) {
  const url = new URL(`${BASE_URL}/${path}`)
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value)
  })
  url.searchParams.set('api_key', API_KEY)
  url.searchParams.set('file_type', 'json')
  return url.toString()
}

export type FredObservation = {
  seriesId: string
  date: string
  value: string
}

export async function getFredLatest(seriesId: string): Promise<FredObservation | null> {
  if (!API_KEY) return null

  const cacheKey = `fred:latest:${seriesId}`
  const cached = getCached<FredObservation>(cacheKey)
  if (cached) return cached

  const response = await fetch(
    buildUrl('series/observations', {
      series_id: seriesId,
      sort_order: 'desc',
      limit: '1',
    })
  )
  if (!response.ok) return null

  const json = await response.json()
  const observation = Array.isArray(json?.observations) ? json.observations[0] : null
  if (!observation) return null

  const result: FredObservation = {
    seriesId,
    date: observation.date,
    value: observation.value,
  }

  setCached(cacheKey, result, TTL)
  return result
}

export async function searchFred(query: string): Promise<Array<{ id: string; title: string }>> {
  if (!API_KEY) return []
  const trimmed = query.trim()
  if (!trimmed) return []

  const cacheKey = `fred:search:${trimmed.toLowerCase()}`
  const cached = getCached<Array<{ id: string; title: string }>>(cacheKey)
  if (cached) return cached

  const response = await fetch(
    buildUrl('series/search', {
      search_text: trimmed,
      limit: '10',
    })
  )
  if (!response.ok) return []

  const json = await response.json()
  const series = Array.isArray(json?.seriess) ? json.seriess : []
  const result = series.map((item: any) => ({
    id: item.id ?? '',
    title: item.title ?? '',
  }))

  setCached(cacheKey, result, TTL)
  return result
}
