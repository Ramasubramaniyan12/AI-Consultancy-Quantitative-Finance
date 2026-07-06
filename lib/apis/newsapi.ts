import { getCached, setCached } from '@/lib/cache'

const BASE_URL = 'https://newsapi.org/v2'
const API_KEY = process.env.NEWS_API_KEY ?? ''
const TTL = 900_000

export type NewsArticle = {
  title: string
  description: string
  url: string
  urlToImage?: string
  publishedAt: string
  source: {
    name: string
  }
}

function buildUrl(path: string, params: Record<string, string>) {
  const url = new URL(`${BASE_URL}/${path}`)
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value)
  })
  url.searchParams.set('apiKey', API_KEY)
  return url.toString()
}

export async function searchNews(query: string): Promise<NewsArticle[]> {
  if (!API_KEY) return []
  const trimmed = query.trim()
  if (!trimmed) return []

  const cacheKey = `newsapi:search:${trimmed.toLowerCase()}`
  const cached = getCached<NewsArticle[]>(cacheKey)
  if (cached) return cached

  const response = await fetch(
    buildUrl('everything', {
      q: `${trimmed} stock OR market`,
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: '10',
    })
  )
  if (!response.ok) return []

  const json = await response.json()
  const articles = Array.isArray(json?.articles) ? json.articles : []
  const result = articles.map((item: any) => ({
    title: item.title ?? '',
    description: item.description ?? '',
    url: item.url ?? '',
    urlToImage: item.urlToImage ?? undefined,
    publishedAt: item.publishedAt ?? '',
    source: { name: item.source?.name ?? 'Unknown' },
  }))

  setCached(cacheKey, result, TTL)
  return result
}

export async function topBusinessHeadlines(country = 'in'): Promise<NewsArticle[]> {
  if (!API_KEY) return []
  const cacheKey = `newsapi:top-headlines:${country}`
  const cached = getCached<NewsArticle[]>(cacheKey)
  if (cached) return cached

  const response = await fetch(
    buildUrl('top-headlines', {
      category: 'business',
      country,
      pageSize: '10',
    })
  )
  if (!response.ok) return []

  const json = await response.json()
  const articles = Array.isArray(json?.articles) ? json.articles : []
  const result = articles.map((item: any) => ({
    title: item.title ?? '',
    description: item.description ?? '',
    url: item.url ?? '',
    urlToImage: item.urlToImage ?? undefined,
    publishedAt: item.publishedAt ?? '',
    source: { name: item.source?.name ?? 'Unknown' },
  }))

  setCached(cacheKey, result, TTL)
  return result
}
