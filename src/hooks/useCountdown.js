import { useEffect, useState } from 'react'

function diff(target) {
  const remaining = Math.max(0, target.getTime() - Date.now())
  const totalSeconds = Math.floor(remaining / 1000)

  return {
    totalSeconds,
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    expired: remaining <= 0,
  }
}

const pad = (value) => String(value).padStart(2, '0')

/**
 * Ticking countdown to a target date.
 * Returns `{ hours, minutes, seconds, label, expired }`, updating once a second.
 */
export function useCountdown(target) {
  const [state, setState] = useState(() => diff(target))

  useEffect(() => {
    setState(diff(target))
    const timer = window.setInterval(() => setState(diff(target)), 1000)
    return () => window.clearInterval(timer)
  }, [target])

  const label = `${pad(state.hours)}:${pad(state.minutes)}:${pad(state.seconds)}`

  return { ...state, label }
}

export default useCountdown
