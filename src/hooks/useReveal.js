import { useEffect, useRef } from 'react'

/**
 * Scroll-triggered entrance reveal.
 *
 * Fail-open by design: content is visible by default and only gets hidden once
 * we have confirmed that (a) JS is running, (b) motion is allowed, and (c) the
 * element is genuinely below the fold. If IntersectionObserver is missing, if
 * motion is reduced, or if anything throws, the content simply stays visible.
 *
 * Pairs with the `.reveal` rules in index.css:
 *   no attribute      → visible (default / no-JS)
 *   [data-reveal=pending] → hidden + offset
 *   [data-reveal=visible] → animated in
 */
export function useReveal({ threshold = 0.2, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const supportsObserver = typeof IntersectionObserver !== 'undefined'
    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const rect = element.getBoundingClientRect()
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight
    const alreadyInView = rect.top <= viewportHeight * 0.92

    if (prefersReduced || !supportsObserver || alreadyInView) {
      element.dataset.reveal = 'visible'
      return
    }

    element.dataset.reveal = 'pending'

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.reveal = 'visible'
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}

export default useReveal
