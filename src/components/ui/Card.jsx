import { useCallback } from 'react'

import { cn } from '@/lib/cn.js'
import { useSpotlight } from '@/hooks/useSpotlight.js'

/**
 * Base surface card.
 * - `interactive` adds a pointer-tracked highlight and hover elevation.
 * - `ref` is merged with the internal spotlight ref, so callers can attach
 *   their own ref (e.g. an IntersectionObserver) without losing the highlight.
 */
export default function Card({ interactive = false, className, children, ref, ...rest }) {
  const { ref: spotlightRef, onPointerMove } = useSpotlight()

  const setRef = useCallback(
    (node) => {
      spotlightRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    },
    [ref, spotlightRef],
  )

  return (
    <div
      ref={setRef}
      onPointerMove={interactive ? onPointerMove : undefined}
      className={cn(
        'surface group relative overflow-hidden p-5 sm:p-6',
        interactive &&
          'spotlight will-change-transform hover:-translate-y-1 hover:border-white/[0.14] hover:shadow-[0_28px_70px_-40px_rgba(0,0,0,1)]',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
