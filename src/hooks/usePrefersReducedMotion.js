import { useEffect, useState } from 'react'

/**
 * Tracks the user's `prefers-reduced-motion` setting so JS-driven motion can
 * be opted out of (CSS motion is handled globally in index.css).
 */
export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(query.matches)

    const onChange = (event) => setPrefersReduced(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return prefersReduced
}

export default usePrefersReducedMotion
