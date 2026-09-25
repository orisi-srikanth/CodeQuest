import { useEffect, useState } from 'react'

/**
 * Returns true once the page has scrolled past `threshold` pixels.
 * Used to condense the navbar after the hero starts moving.
 */
export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame = 0

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold)
        frame = 0
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [threshold])

  return scrolled
}

export default useScrolled
