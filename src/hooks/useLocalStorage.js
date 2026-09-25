import { useCallback, useEffect, useState } from 'react'

/**
 * JSON-backed localStorage state.
 *
 * Guards against corrupt values, unavailable storage (private mode, sandboxed
 * iframes) and cross-tab drift. Reads are lazy so nothing is parsed until the
 * first render that needs it.
 */
export function useLocalStorage(key, initialValue) {
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') return initialValue

    try {
      const raw = window.localStorage.getItem(key)
      if (raw === null) return initialValue
      return JSON.parse(raw)
    } catch {
      return initialValue
    }
  }, [key, initialValue])

  const [value, setValue] = useState(readValue)

  // Persist on change. If storage is unavailable we keep the in-memory value so
  // the UI still works for the session rather than silently doing nothing.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage unavailable — in-memory only */
    }
  }, [key, value])

  // Keep multiple tabs in sync.
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key !== key || event.newValue === null) return
      try {
        setValue(JSON.parse(event.newValue))
      } catch {
        /* ignore malformed payloads from other tabs */
      }
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key])

  return [value, setValue]
}

/**
 * A set of string keys held in localStorage, exposed with set-like helpers.
 * Used for the practice heatmap and the POTD submission log.
 */
export function useLocalStorageSet(key) {
  const [items, setItems] = useLocalStorage(key, [])

  const asSet = new Set(Array.isArray(items) ? items : [])

  const add = useCallback((item) => setItems((prev) => [...new Set([...(prev ?? []), item])]), [setItems])
  const remove = useCallback(
    (item) => setItems((prev) => (prev ?? []).filter((entry) => entry !== item)),
    [setItems],
  )
  const toggle = useCallback(
    (item) =>
      setItems((prev) => {
        const list = prev ?? []
        return list.includes(item) ? list.filter((entry) => entry !== item) : [...list, item]
      }),
    [setItems],
  )
  const clear = useCallback(() => setItems([]), [setItems])

  return { set: asSet, list: [...asSet].sort(), add, remove, toggle, clear, has: (item) => asSet.has(item) }
}

export default useLocalStorage
