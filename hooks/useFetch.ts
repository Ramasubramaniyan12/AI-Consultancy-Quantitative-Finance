"use client"

import * as React from "react"

export interface UseFetchResult<T> {
  data?: T
  error?: string
  isLoading: boolean
}

export function useFetch<T>(fetcher: () => Promise<T>, deps: React.DependencyList = [], refreshIntervalMs = 60000): UseFetchResult<T> {
  const [data, setData] = React.useState<T | undefined>(undefined)
  const [error, setError] = React.useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = React.useState(true)
  const initialLoadRef = React.useRef(true)

  React.useEffect(() => {
    let mounted = true

    const load = async () => {
      const isInitialLoad = initialLoadRef.current
      if (isInitialLoad) {
        setIsLoading(true)
      }

      try {
        const result = await fetcher()
        if (!mounted) return
        setData(result)
        setError(undefined)
        setIsLoading(false)
        initialLoadRef.current = false
      } catch (err) {
        if (!mounted) return
        setError(err instanceof Error ? err.message : String(err))
        setIsLoading(false)
      }
    }

    load()
    const interval = window.setInterval(load, refreshIntervalMs)

    return () => {
      mounted = false
      window.clearInterval(interval)
    }
  }, [refreshIntervalMs, ...deps])

  return { data, error, isLoading }
}
