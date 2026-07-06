import { NextResponse } from 'next/server'
import { universalSearch, searchStocks } from '@/lib/apis/index'
import { searchYahoo, getQuote, getHistory } from '@/lib/apis/yahoo'
import { searchFinnhub, companyNews, marketNews, earningsCalendar } from '@/lib/apis/finnhub'
import { searchCrypto, getMarketData } from '@/lib/apis/coingecko'
import { searchFunds, getFundNav } from '@/lib/apis/mfapi'
import { searchNews, topBusinessHeadlines } from '@/lib/apis/newsapi'
import { getFredLatest, searchFred } from '@/lib/apis/fred'

const headers = {
  'Cache-Control': 'max-age=60',
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const source = url.searchParams.get('source') ?? 'universal'
  const q = url.searchParams.get('q') ?? ''
  const symbol = url.searchParams.get('symbol') ?? ''
  const range = url.searchParams.get('range') ?? '1mo'
  const endpoint = url.searchParams.get('endpoint') ?? ''
  const category = url.searchParams.get('category') ?? 'general'
  const schemeCode = url.searchParams.get('schemeCode') ?? ''
  const seriesId = url.searchParams.get('series_id') ?? ''
  const from = url.searchParams.get('from') ?? ''
  const to = url.searchParams.get('to') ?? ''
  const country = url.searchParams.get('country') ?? 'in'

  try {
    switch (source) {
      case 'universal': {
        const result = await universalSearch(q)
        return NextResponse.json(result, { headers })
      }
      case 'stocks': {
        const stocks = await searchStocks(q)
        return NextResponse.json({ stocks }, { headers })
      }
      case 'yahoo': {
        if (symbol) {
          if (url.searchParams.has('range')) {
            const history = await getHistory(symbol, range)
            return NextResponse.json({ history }, { headers })
          }
          const quote = await getQuote(symbol)
          return NextResponse.json({ quote }, { headers })
        }
        const results = await searchYahoo(q)
        return NextResponse.json({ quotes: results }, { headers })
      }
      case 'finnhub': {
        if (endpoint === 'company-news' && symbol && from && to) {
          const news = await companyNews(symbol, from, to)
          return NextResponse.json({ news }, { headers })
        }
        if (endpoint === 'market-news') {
          const news = await marketNews(category)
          return NextResponse.json({ news }, { headers })
        }
        if (endpoint === 'earnings-calendar' && from && to) {
          const calendar = await earningsCalendar(from, to)
          return NextResponse.json({ calendar }, { headers })
        }
        const results = await searchFinnhub(q)
        return NextResponse.json({ results }, { headers })
      }
      case 'coingecko': {
        if (!q) {
          const results = await getMarketData()
          return NextResponse.json({ results: results ?? [] }, { headers })
        }
        const results = await searchCrypto(q)
        return NextResponse.json({ results }, { headers })
      }
      case 'mfapi': {
        if (schemeCode) {
          const nav = await getFundNav(schemeCode)
          return NextResponse.json({ nav }, { headers })
        }
        const results = await searchFunds(q)
        return NextResponse.json({ results }, { headers })
      }
      case 'news': {
        if (!q) {
          const headlines = await topBusinessHeadlines(country)
          return NextResponse.json({ articles: headlines }, { headers })
        }
        const results = await searchNews(q)
        return NextResponse.json({ articles: results }, { headers })
      }
      case 'fred': {
        if (seriesId) {
          const latest = await getFredLatest(seriesId)
          return NextResponse.json({ latest }, { headers })
        }
        const results = await searchFred(q)
        return NextResponse.json({ results }, { headers })
      }
      default:
        return NextResponse.json({ error: 'Unsupported source' }, { status: 400, headers })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Proxy fetch failed' }, { status: 502, headers })
  }
}
