import { useCallback, useMemo } from 'react'

import { useLocalStorage } from '@/hooks/useLocalStorage.js'
import { istToday } from '@/lib/date.js'

const STORAGE_KEY = 'codequest.potd.submissions'

/**
 * Submission log for the daily problems.
 *
 * Keys are `platform:date`, so a submission is scoped to that day's problem —
 * when the problem rolls over, the stamp clears automatically instead of
 * carrying over to a different question.
 *
 * Held in localStorage: there is no authentication yet, so this is this
 * browser's own record, not a server-verified one. Swapping in an API call
 * later only means changing this hook.
 */
export function useSubmissions() {
  const [log, setLog] = useLocalStorage(STORAGE_KEY, {})

  const today = istToday()

  const keyFor = useCallback((platformId, date = today) => `${platformId}:${date}`, [today])

  const submittedToday = useMemo(() => {
    const map = {}
    Object.keys(log ?? {}).forEach((key) => {
      if (log[key]) map[key] = true
    })
    return map
  }, [log])

  const isSubmitted = useCallback(
    (platformId) => Boolean(log?.[keyFor(platformId)]),
    [log, keyFor],
  )

  const markSubmitted = useCallback(
    (platformId) => setLog((prev) => ({ ...(prev ?? {}), [keyFor(platformId)]: true })),
    [keyFor, setLog],
  )

  const markUnsubmitted = useCallback(
    (platformId) =>
      setLog((prev) => {
        const next = { ...(prev ?? {}) }
        delete next[keyFor(platformId)]
        return next
      }),
    [keyFor, setLog],
  )

  const toggleSubmitted = useCallback(
    (platformId) => (isSubmitted(platformId) ? markUnsubmitted(platformId) : markSubmitted(platformId)),
    [isSubmitted, markSubmitted, markUnsubmitted],
  )

  const clearAll = useCallback(() => setLog({}), [setLog])

  const countToday = useMemo(
    () => Object.keys(submittedToday).filter((key) => key.endsWith(`:${today}`)).length,
    [submittedToday, today],
  )

  return {
    isSubmitted,
    markSubmitted,
    markUnsubmitted,
    toggleSubmitted,
    clearAll,
    countToday,
    today,
  }
}

export default useSubmissions
