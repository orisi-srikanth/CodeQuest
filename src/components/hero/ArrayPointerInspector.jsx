import { cn } from '@/lib/cn.js'
import { ARRAY, TARGET } from '@/data/algorithm.js'

/**
 * "Array Pointer Inspector" — the visual half of the trace.
 *
 * Bars outside the current `[left, right]` window dim as the search narrows;
 * `mid` is filled with the accent; the pointers below glide to their new
 * indices via CSS transitions on `left`.
 */
export default function ArrayPointerInspector({ step }) {
  const { left, right, mid, found } = step

  const markers = buildMarkers({ left, right, mid, found })

  return (
    <div className="rounded-xl border border-white/[0.07] bg-ink-900/60 px-4 py-4 sm:px-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-slate-400">
          Array Pointer Inspector
          <span className="ml-2 normal-case tracking-normal text-slate-600">[nums = sorted]</span>
        </p>
        <p className="font-mono text-[0.6875rem] text-slate-500">
          Target: <span className="text-accent-blue">{TARGET}</span>
        </p>
      </div>

      {/* index rail */}
      <div className="mt-4 flex items-end">
        {ARRAY.map((_, index) => (
          <div key={index} className="min-w-0 flex-1 text-center">
            <span
              className={cn(
                'font-mono text-[0.625rem] transition-colors duration-500',
                index >= left && index <= right ? 'text-slate-500' : 'text-slate-700',
              )}
            >
              <span className="hidden sm:inline">idx:</span>{index}
            </span>
          </div>
        ))}
      </div>

      {/* bars */}
      <div className="mt-1.5 flex gap-1.5 sm:gap-2">
        {ARRAY.map((value, index) => {
          const inWindow = index >= left && index <= right
          const isMid = index === mid
          const isHit = isMid && found

          return (
            <div
              key={index}
              className={cn(
                'flex h-9 min-w-0 flex-1 items-center justify-center rounded-md border font-mono text-[0.8125rem] transition-all duration-500 ease-premium sm:h-10 sm:text-sm',
                isHit
                  ? 'border-accent-mint/70 bg-accent-mint/25 text-accent-mint shadow-[0_0_0_1px_rgba(52,211,153,0.35)]'
                  : isMid
                    ? 'border-accent-blue/50 bg-accent-blue-dim/60 text-accent-blue'
                    : inWindow
                      ? 'border-white/[0.12] bg-white/[0.07] text-slate-200'
                      : 'border-white/[0.04] bg-white/[0.015] text-slate-600',
              )}
            >
              {value}
            </div>
          )
        })}
      </div>

      {/* pointers — two rows max, so converging pointers never overlap */}
      <div className="relative mt-3 h-11">
        {markers.map((marker) => (
          <div
            key={marker.key}
            className="absolute flex -translate-x-1/2 flex-col items-center transition-[left,top] duration-500 ease-premium"
            style={{
              left: `${((marker.index + 0.5) / ARRAY.length) * 100}%`,
              top: `${marker.row * 20}px`,
            }}
          >
            <span
              className={cn(
                'font-mono text-[0.625rem] leading-none tracking-wider transition-colors duration-500',
                marker.tone === 'mint'
                  ? 'text-accent-mint'
                  : marker.tone === 'blue'
                    ? 'text-accent-blue'
                    : 'text-slate-400',
              )}
            >
              {marker.label}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                'text-[0.625rem] leading-none',
                marker.tone === 'mint'
                  ? 'text-accent-mint'
                  : marker.tone === 'blue'
                    ? 'text-accent-blue'
                    : 'text-slate-500',
              )}
            >
              ↑
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Builds the pointer set for a step.
 *
 * Two fixed rows: bounds (L / R) on top, MID anchored on the row below. Because
 * the two roles never share a row, pointers can converge without overlapping —
 * when left meets right they simply merge into a single `L · R` marker.
 */
function buildMarkers({ left, right, mid, found }) {
  const markers = []

  if (left === right) {
    markers.push({ key: 'lr', label: 'L · R', index: left, row: 0, tone: 'neutral' })
  } else {
    markers.push({ key: 'l', label: 'L', index: left, row: 0, tone: 'neutral' })
    markers.push({ key: 'r', label: 'R', index: right, row: 0, tone: 'neutral' })
  }

  markers.push({
    key: 'mid',
    label: found ? 'MID · HIT' : 'MID',
    index: mid,
    row: 1,
    tone: found ? 'mint' : 'blue',
  })

  return markers
}
