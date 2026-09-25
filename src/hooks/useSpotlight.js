import { useCallback, useRef } from 'react'

/**
 * Pointer-tracked spotlight. Writes CSS custom properties (`--mx` / `--my`)
 * on the element so `.spotlight::before` can follow the cursor without React
 * re-rendering on every mouse move.
 */
export function useSpotlight() {
  const ref = useRef(null)

  const onPointerMove = useCallback((event) => {
    const element = ref.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    element.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    element.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }, [])

  return { ref, onPointerMove }
}

export default useSpotlight
