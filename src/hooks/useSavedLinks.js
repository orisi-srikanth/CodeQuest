import { useCallback } from 'react'

import { useLocalStorage } from '@/hooks/useLocalStorage.js'

const STORAGE_KEY = 'codequest.workspace.links'

const makeId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `link-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

/**
 * Turn whatever the user typed into a usable absolute URL.
 *
 * People type `leetcode.com/problemset` far more often than the full
 * `https://…`, so a missing scheme gets `https://` rather than being rejected.
 * Only http(s) is allowed — pasting `javascript:` should never produce a
 * clickable arrow.
 *
 * @returns `{ url, label }` on success, or `{ error }` with a short reason.
 */
export function normalizeUrl(raw) {
  const trimmed = String(raw ?? '').trim()
  if (!trimmed) return { error: 'Enter a link first' }

  // `host:3000` looks exactly like a `scheme:` at first glance, so check the
  // remainder: a port is digits only (optionally with a path after it).
  const schemeMatch = trimmed.match(/^([a-z][a-z0-9+.-]*):(.*)$/i)
  const looksLikePort = schemeMatch && /^\d+(\/|$)/.test(schemeMatch[2])
  if (schemeMatch && !looksLikePort && !/^https?$/i.test(schemeMatch[1])) {
    return { error: 'Only http and https links are supported' }
  }

  const hadScheme = /^https?:\/\//i.test(trimmed)
  const withScheme = hadScheme ? trimmed : `https://${trimmed}`

  let parsed
  try {
    parsed = new URL(withScheme)
  } catch {
    return { error: "That doesn't look like a web address" }
  }

  // A bare word like `leetcode` becomes `https://leetcode`, which parses fine
  // but isn't a real address — so a dotless host is only allowed when the user
  // typed the scheme themselves (which is how `http://localhost:3000` works).
  if (!hadScheme && !parsed.hostname.includes('.')) {
    return { error: "That doesn't look like a web address" }
  }

  const label = `${parsed.hostname.replace(/^www\./i, '')}${parsed.pathname.replace(/\/$/, '')}`
  return { url: parsed.href, label, host: parsed.hostname.replace(/^www\./i, '') }
}

/**
 * The workspace's own link shelf, persisted in this browser.
 *
 * Kept to add / remove / reorder-free simplicity: the point is a place to park
 * the sites you practise on and jump to them, not a bookmark manager.
 */
export function useSavedLinks() {
  const [links, setLinks] = useLocalStorage(STORAGE_KEY, [])

  const list = Array.isArray(links) ? links : []

  const add = useCallback(
    (raw) => {
      const result = normalizeUrl(raw)
      if (result.error) return result

      const entry = { id: makeId(), url: result.url, label: result.label, host: result.host }
      // Newest first, so a freshly added link is never below the fold.
      setLinks((prev) => [entry, ...(Array.isArray(prev) ? prev : [])])
      return { entry }
    },
    [setLinks],
  )

  const remove = useCallback(
    (id) => setLinks((prev) => (Array.isArray(prev) ? prev.filter((l) => l.id !== id) : [])),
    [setLinks],
  )

  const clearAll = useCallback(() => setLinks([]), [setLinks])

  const has = useCallback((url) => list.some((l) => l.url === url), [list])

  return { links: list, add, remove, clearAll, has }
}

export default useSavedLinks
