import { POTD_PLATFORMS } from '@/data/potdPlatforms.js'
import { fallbackProblem } from '@/data/potdFallback.js'

/**
 * Problem of the Day data access.
 *
 * Talks to the CodeQuest API (`/api/v1/potd` → FastAPI → the three platforms),
 * and falls back to the bundled rotational snapshot when that API is not
 * reachable — so the page is never empty, and never claims to be live when it
 * is not. Every returned item carries `source: 'live' | 'snapshot'`.
 */

const ENDPOINT = '/api/v1/potd'
const REQUEST_TIMEOUT_MS = 9000

/** Midnight UTC tomorrow — LeetCode's rollover. */
function nextUtcMidnight(from = new Date()) {
  return new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate() + 1))
}

/** Midnight IST tomorrow (18:30 UTC today) — GfG / takeUforward rollover. */
function nextIstMidnight(from = new Date()) {
  const istNow = new Date(from.getTime() + 5.5 * 3600 * 1000)
  const istMidnight = Date.UTC(
    istNow.getUTCFullYear(),
    istNow.getUTCMonth(),
    istNow.getUTCDate() + 1,
  )
  return new Date(istMidnight - 5.5 * 3600 * 1000)
}

const RESET_RULE = {
  leetcode: nextUtcMidnight,
  geeksforgeeks: nextIstMidnight,
  takeuforward: nextIstMidnight,
}

/** Normalises an API entry; `null` when the platform reported no problem. */
function fromApi(item, platform) {
  if (!item || item.status !== 'live' || !item.title) return null

  return {
    id: platform.id,
    title: item.title,
    url: item.url || platform.home,
    difficulty: item.difficulty ?? null,
    accuracy: typeof item.accuracy === 'number' ? item.accuracy : null,
    tags: Array.isArray(item.tags) ? item.tags.filter(Boolean).slice(0, 4) : [],
    resetAt: item.reset_at ? new Date(item.reset_at) : RESET_RULE[platform.id](),
    source: 'live',
  }
}

/** Deterministic offline entry so the grid always has something to show. */
function fromSnapshot(platform) {
  const problem = fallbackProblem(platform.id)
  if (!problem) return null

  return {
    id: platform.id,
    title: problem.title,
    url: problem.url || platform.home,
    difficulty: problem.difficulty ?? null,
    accuracy: problem.accuracy ?? null,
    tags: problem.tags ?? [],
    resetAt: RESET_RULE[platform.id](),
    source: 'snapshot',
  }
}

/**
 * Fetch today's problems. Never throws — on any failure it resolves with the
 * snapshot set and `mode: 'snapshot'`.
 */
export async function fetchDailyProblems({ signal } = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  signal?.addEventListener('abort', () => controller.abort(), { once: true })

  try {
    const response = await fetch(ENDPOINT, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) throw new Error(`API responded ${response.status}`)

    const payload = await response.json()
    const byId = new Map((payload.items ?? []).map((item) => [item.id, item]))

    let liveCount = 0
    const items = POTD_PLATFORMS.map((platform) => {
      const live = fromApi(byId.get(platform.id), platform)
      if (live) {
        liveCount += 1
        return live
      }
      return fromSnapshot(platform)
    }).filter(Boolean)

    return {
      items,
      mode: liveCount === POTD_PLATFORMS.length ? 'live' : liveCount > 0 ? 'partial' : 'snapshot',
      generatedAt: payload.generated_at ? new Date(payload.generated_at) : new Date(),
    }
  } catch {
    return {
      items: POTD_PLATFORMS.map(fromSnapshot).filter(Boolean),
      mode: 'snapshot',
      generatedAt: new Date(),
    }
  } finally {
    clearTimeout(timeout)
  }
}

export default fetchDailyProblems
