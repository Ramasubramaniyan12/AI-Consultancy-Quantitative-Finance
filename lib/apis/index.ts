import { searchYahoo } from '@/lib/apis/yahoo'
import { searchFinnhub } from '@/lib/apis/finnhub'
import { searchCrypto } from '@/lib/apis/coingecko'
import { searchFunds } from '@/lib/apis/mfapi'
import { searchNews } from '@/lib/apis/newsapi'

export type AssetType =
  | 'stock'
  | 'crypto'
  | 'mutualfund'
  | 'bond'
  | 'index'
  | 'commodity'
  | 'news'
  | 'economic'

export type SearchResult = {
  symbol: string
  name: string
  exchange?: string
  quoteType?: string
  source: 'yahoo' | 'finnhub' | 'coingecko' | 'mfapi'
}

export type UniversalSearchResults = {
  stocks: SearchResult[]
  crypto: Array<{ id: string; symbol: string; name: string; thumb: string }>
  funds: Array<{ schemeCode: string; schemeName: string }>
  news: Array<{ title: string; description: string; url: string; urlToImage?: string; publishedAt: string; source: { name: string } }>
}

export async function searchStocks(query: string): Promise<SearchResult[]> {
  const [yahooResult, finnhubResult] = await Promise.allSettled([
    searchYahoo(query),
    searchFinnhub(query),
  ])

  const stocks: SearchResult[] = []
  const seen = new Set<string>()

  if (yahooResult.status === 'fulfilled') {
    yahooResult.value.forEach((item) => {
      if (!item.symbol || seen.has(item.symbol)) return
      seen.add(item.symbol)
      stocks.push({
        symbol: item.symbol,
        name: item.shortname,
        exchange: item.exchange,
        quoteType: item.quoteType,
        source: item.source,
      })
    })
  }

  if (finnhubResult.status === 'fulfilled') {
    finnhubResult.value.forEach((item) => {
      if (!item.symbol || seen.has(item.symbol)) return
      seen.add(item.symbol)
      stocks.push({
        symbol: item.symbol,
        name: item.description,
        exchange: 'US',
        quoteType: 'EQUITY',
        source: item.source,
      })
    })
  }

  return stocks.slice(0, 15)
}

export async function universalSearch(query: string) {
  const [stocks, crypto, funds, news] = await Promise.allSettled([
    searchStocks(query),
    searchCrypto(query),
    searchFunds(query),
    searchNews(query),
  ])

  return {
    stocks: stocks.status === 'fulfilled' ? stocks.value : [],
    crypto: crypto.status === 'fulfilled' ? crypto.value : [],
    funds: funds.status === 'fulfilled' ? funds.value : [],
    news: news.status === 'fulfilled' ? news.value : [],
  }
}
