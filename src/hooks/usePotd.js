import { useCallback, useEffect, useRef, useState } from 'react'

import { fetchDailyProblems } from '@/services/potd.js'

/**
 * Loads today's problems once on mount, with a manual refresh.
 * `fetchDailyProblems` never rejects, so there is no error branch to render —
 * a failed load simply arrives as `mode: 'snapshot'`.
 */
export function usePotd() {
  const [state, setState] = useState({ status: 'loading', items: [], mode: null, generatedAt: null })
  const mounted = useRef(true)

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, status: 'loading' }))
    const result = await fetchDailyProblems()
    if (!mounted.current) return
    setState({ status: 'ready', ...result })
  }, [])

  useEffect(() => {
    mounted.current = true
    load()
    return () => {
      mounted.current = false
    }
  }, [load])

  return { ...state, refresh: load }
}

export default usePotd
