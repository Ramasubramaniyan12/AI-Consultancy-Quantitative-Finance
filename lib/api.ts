export const YAHOO_PROXY_BASE = "/api/proxy"
export const MUTUAL_FUND_LIST_URL = "https://api.mfapi.in/mf"

export function yahooChartProxyUrl(symbol: string, interval = "1d", range = "1d") {
  return `${YAHOO_PROXY_BASE}?symbol=${encodeURIComponent(symbol)}&interval=${encodeURIComponent(interval)}&range=${encodeURIComponent(range)}`
}

export function alphaVantageGlobalQuoteUrl(symbol: string) {
  const key = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY ?? ""
  return `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${encodeURIComponent(key)}`
}

export function alphaVantageTopGainersLosersUrl() {
  const key = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY ?? ""
  return `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${encodeURIComponent(key)}`
}

export function mutualFundNavUrl(schemeCode: string) {
  return `${MUTUAL_FUND_LIST_URL}/${encodeURIComponent(schemeCode)}`
}

export function coinGeckoMarketsUrl(perPage = 50, page = 1) {
  return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=${encodeURIComponent(
    String(perPage)
  )}&page=${encodeURIComponent(String(page))}&sparkline=true&price_change_percentage=24h%2C7d`
}

export function formatCurrencyInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumberCompact(value: number) {
  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(2)}T`
  }
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`
  }
  return value.toFixed(0)
}

export interface YahooIndexQuote {
  price: number
  change: number
  changePercent: number
}

export interface YahooQuoteMeta {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume?: number
  marketCap?: number
}

export function parseYahooIndexQuote(payload: any): YahooIndexQuote | null {
  const result = payload?.chart?.result?.[0]
  const meta = result?.meta
  if (!meta) return null

  const price = meta?.regularMarketPrice
  const changePercent = meta?.regularMarketChangePercent

  return {
    price: Number(price ?? meta.chartPreviousClose ?? 0),
    change: Number(meta.regularMarketChange ?? 0),
    changePercent: Number(changePercent ?? 0),
  }
}

export function parseYahooQuoteMeta(payload: any): YahooQuoteMeta | null {
  const result = payload?.chart?.result?.[0]
  const meta = result?.meta
  if (!meta) return null

  const price = meta?.regularMarketPrice
  const changePercent = meta?.regularMarketChangePercent

  return {
    symbol: String(meta.symbol ?? ""),
    price: Number(price ?? meta.chartPreviousClose ?? 0),
    change: Number(meta.regularMarketChange ?? 0),
    changePercent: Number(changePercent ?? 0),
    volume: Number(meta.regularMarketVolume ?? 0),
    marketCap: Number(meta.marketCap ?? 0),
  }
}

export interface GlobalQuoteResult {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: string
}

export function parseGlobalQuote(payload: any): GlobalQuoteResult | null {
  const quote = payload?.["Global Quote"] ?? payload?.["Global quote"]
  if (!quote) return null

  const symbol = quote["01. symbol"] || quote["01 Symbol"] || ""
  const price = Number(quote["05. price"] || quote["05 Price"] || 0)
  const change = Number(quote["09. change"] || quote["09 Change"] || 0)
  const changePercent = Number(
    String(quote["10. change percent"] || quote["10 Change Percent"] || "0").replace("%", "")
  )
  const volume = quote["06. volume"] || quote["06 Volume"] || ""

  if (!symbol) return null

  return {
    symbol,
    price,
    change,
    changePercent,
    volume,
  }
}

export interface TopGainersLosersResult {
  topGainers: Array<Record<string, any>>
  topLosers: Array<Record<string, any>>
}

export function parseTopGainersLosers(payload: any): TopGainersLosersResult {
  const topGainers = Array.isArray(payload?.topGainers)
    ? payload.topGainers
    : Array.isArray(payload?.top_gainers)
    ? payload.top_gainers
    : []

  const topLosers = Array.isArray(payload?.topLosers)
    ? payload.topLosers
    : Array.isArray(payload?.top_losers)
    ? payload.top_losers
    : []

  return {
    topGainers,
    topLosers,
  }
}
