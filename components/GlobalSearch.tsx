"use client"

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Search, TrendingUp, Bitcoin, BarChart3, Newspaper, Loader2 } from 'lucide-react'

const emptyResults = {
  stocks: [],
  crypto: [],
  funds: [],
  news: [],
}

type UniversalSearchResults = typeof emptyResults

type SearchResultItem = {
  symbol: string
  name: string
  exchange?: string
  source?: string
}

type CryptoResultItem = {
  id: string
  symbol: string
  name: string
  thumb: string
}

type FundResultItem = {
  schemeCode: string
  schemeName: string
}

type NewsResultItem = {
  title: string
  description: string
  url: string
  urlToImage?: string
  publishedAt: string
  source: { name: string }
}

export function GlobalSearch() {
  const router = useRouter()
  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState<UniversalSearchResults>(emptyResults)
  const [loading, setLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const delayRef = React.useRef<number | null>(null)
  const hideRef = React.useRef<number | null>(null)

  const hasResults =
    results.stocks.length > 0 ||
    results.crypto.length > 0 ||
    results.funds.length > 0 ||
    results.news.length > 0

  React.useEffect(() => {
    if (!query.trim()) {
      setResults(emptyResults)
      setLoading(false)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)
    if (delayRef.current) window.clearTimeout(delayRef.current)

    delayRef.current = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/proxy?source=universal&q=${encodeURIComponent(query.trim())}`, {
          cache: 'no-store',
        })
        if (!response.ok) {
          throw new Error('Search failed')
        }
        const json = await response.json()
        setResults({
          stocks: Array.isArray(json.stocks) ? json.stocks : [],
          crypto: Array.isArray(json.crypto) ? json.crypto : [],
          funds: Array.isArray(json.funds) ? json.funds : [],
          news: Array.isArray(json.news) ? json.news : [],
        })
      } catch (err) {
        setError('Unable to load search results. Please try again.')
        setResults(emptyResults)
      } finally {
        setLoading(false)
      }
    }, 400)

    return () => {
      if (delayRef.current) window.clearTimeout(delayRef.current)
    }
  }, [query])

  const handleSelectStock = (symbol: string) => {
    router.push(`/stocks/${encodeURIComponent(symbol)}`)
    setOpen(false)
  }

  const handleSelectCrypto = () => {
    router.push('/crypto')
    setOpen(false)
  }

  const handleSelectFund = () => {
    router.push('/mutual-funds')
    setOpen(false)
  }

  const handleSelectNews = (url: string) => {
    window.open(url, '_blank')
    setOpen(false)
  }

  const handleFocus = () => {
    if (hideRef.current) window.clearTimeout(hideRef.current)
    setOpen(true)
  }

  const handleBlur = () => {
    hideRef.current = window.setTimeout(() => setOpen(false), 150)
  }

  return (
    <div className="relative w-full" onBlur={handleBlur} onFocus={handleFocus}>
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="search"
          placeholder="Search stocks, crypto, funds, news..."
          className="pl-10 bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-500 focus:bg-slate-900 focus:border-cyan-500"
          aria-label="Global search"
          autoComplete="off"
        />
      </div>

      {open && (loading || error || query.trim()) ? (
        <div className="absolute left-0 right-0 mt-2 z-50 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/95 shadow-xl shadow-slate-950/30">
          <div className="p-4">
            {loading && (
              <div className="space-y-3">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="h-12 animate-pulse rounded-xl bg-slate-800" />
                ))}
              </div>
            )}

            {!loading && error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-200">
                {error}
              </div>
            )}

            {!loading && !error && !hasResults && query.trim() && (
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-400">
                No results found for “{query}”. Try another symbol or keyword.
              </div>
            )}

            {!loading && !error && hasResults && (
              <div className="space-y-4">
                {results.stocks.length > 0 && (
                  <section>
                    <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                      <TrendingUp className="h-4 w-4" />
                      Stocks
                    </div>
                    <div className="space-y-2">
                      {results.stocks.slice(0, 5).map((item: SearchResultItem) => (
                        <button
                          key={item.symbol}
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handleSelectStock(item.symbol)}
                          className="flex w-full items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-left transition hover:bg-slate-800"
                        >
                          <div>
                            <p className="text-sm font-medium text-slate-100">{item.name || item.symbol}</p>
                            <p className="text-xs text-slate-500">{item.symbol} • {item.exchange ?? 'Global'}</p>
                          </div>
                          <span className="text-xs text-slate-400">{item.source?.toUpperCase()}</span>
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {results.crypto.length > 0 && (
                  <section>
                    <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                      <Bitcoin className="h-4 w-4" />
                      Crypto
                    </div>
                    <div className="space-y-2">
                      {results.crypto.slice(0, 5).map((item: CryptoResultItem) => (
                        <button
                          key={item.id}
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={handleSelectCrypto}
                          className="flex w-full items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-left transition hover:bg-slate-800"
                        >
                          <div>
                            <p className="text-sm font-medium text-slate-100">{item.name}</p>
                            <p className="text-xs text-slate-500">{item.symbol.toUpperCase()}</p>
                          </div>
                          {item.thumb ? (
                            <img src={item.thumb} alt={item.name} className="h-8 w-8 rounded-full" />
                          ) : null}
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {results.funds.length > 0 && (
                  <section>
                    <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                      <BarChart3 className="h-4 w-4" />
                      Mutual Funds
                    </div>
                    <div className="space-y-2">
                      {results.funds.slice(0, 5).map((item: FundResultItem) => (
                        <button
                          key={item.schemeCode}
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={handleSelectFund}
                          className="flex w-full items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-left transition hover:bg-slate-800"
                        >
                          <div>
                            <p className="text-sm font-medium text-slate-100">{item.schemeName}</p>
                            <p className="text-xs text-slate-500">{item.schemeCode}</p>
                          </div>
                          <span className="text-xs text-slate-400">Fund</span>
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {results.news.length > 0 && (
                  <section>
                    <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                      <Newspaper className="h-4 w-4" />
                      News
                    </div>
                    <div className="space-y-2">
                      {results.news.slice(0, 4).map((item: NewsResultItem) => (
                        <button
                          key={item.url}
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handleSelectNews(item.url)}
                          className="group flex w-full items-start justify-between gap-4 rounded-xl bg-slate-900 px-4 py-3 text-left transition hover:bg-slate-800"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-100">{item.title}</p>
                            <p className="mt-1 text-xs leading-5 text-slate-500 line-clamp-2">{item.description}</p>
                          </div>
                          <span className="text-xs text-slate-400">{item.source.name}</span>
                        </button>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
