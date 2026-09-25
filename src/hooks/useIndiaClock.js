import { useEffect, useState } from 'react'

import { istNow } from '@/lib/date.js'

/**
 * Ticking India Standard Time clock.
 *
 * Re-reads the IST wall clock once a second (aligned to the next second
 * boundary so the hand sweep stays smooth), independent of the visitor's own
 * timezone. Pauses when the tab is hidden to avoid pointless timers.
 */
export function useIndiaClock() {
  const [time, setTime] = useState(() => istNow())

  useEffect(() => {
    let timer

    const schedule = () => {
      const now = new Date()
      const delay = 1000 - now.getMilliseconds()
      timer = window.setTimeout(() => {
        setTime(istNow())
        schedule()
      }, delay)
    }

    const onVisibility = () => {
      window.clearTimeout(timer)
      if (!document.hidden) {
        setTime(istNow())
        schedule()
      }
    }

    schedule()
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return time
}

export default useIndiaClock
