type CacheEntry = { data: unknown; expires: number }
const cache = new Map<string, CacheEntry>()

export function getCached<T>(key: string): T | null {
  const hit = cache.get(key)
  if (!hit) return null
  if (hit.expires <= Date.now()) {
    cache.delete(key)
    return null
  }
  return hit.data as T
}

export function setCached<T>(key: string, data: T, ttlMs: number) {
  cache.set(key, { data, expires: Date.now() + ttlMs })
}
