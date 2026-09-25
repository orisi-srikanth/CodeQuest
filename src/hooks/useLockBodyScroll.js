import { useEffect } from 'react'

/**
 * Freezes background scrolling while an overlay (e.g. the mobile nav) is open.
 * Compensates for the scrollbar width so the layout doesn't shift.
 */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked || typeof document === 'undefined') return

    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
    }
  }, [locked])
}

export default useLockBodyScroll
