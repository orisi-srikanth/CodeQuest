import { cn } from '@/lib/cn.js'
import { TARGET } from '@/data/algorithm.js'

/**
 * Execution status strip:
 *   - which move just ran (`PROBE 1/6`, `BRANCH 2/6`, …)
 *   - the dry-run comparison for this step, i.e. *why* the branch was taken
 *   - a live watch of left / right / mid
 *
 * The note is announced politely so the dry run is followable by screen reader.
 */
export default function StepBar({ step, index, total }) {
  const { left, right, mid, note, label, found, cmp } = step

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
        <span
          className={cn(
            'inline-flex shrink-0 items-center gap-1.5 rounded border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-wider transition-colors duration-500',
            found
              ? 'border-accent-mint/40 bg-accent-mint/10 text-accent-mint'
              : 'border-accent-blue/30 bg-accent-blue-dim/40 text-accent-blue',
          )}
        >
          <span aria-hidden="true">▸</span>
          {label} {index + 1}/{total}
        </span>

        <p
          className={cn(
            'font-mono text-[0.6875rem] transition-colors duration-500 sm:text-xs',
            found ? 'text-accent-mint' : 'text-slate-300',
          )}
          aria-live="polite"
          aria-atomic="true"
          title={note}
        >
          {note}
        </p>

        {/* the comparison that justifies this step */}
        {cmp && (
          <span className="inline-flex items-center gap-2 rounded border border-white/[0.08] bg-ink-950/60 px-2 py-1 font-mono text-[0.6875rem]">
            <span className="text-slate-300">{cmp.lhs}</span>
            <span
              className={cn(
                'font-semibold',
                cmp.op === '==' ? 'text-accent-mint' : 'text-signal-amber',
              )}
            >
              {cmp.op}
            </span>
            <span className="text-slate-400">{cmp.rhs}</span>
            <span aria-hidden="true" className="text-slate-600">
              →
            </span>
            <span className={found ? 'text-accent-mint' : 'text-slate-300'}>{cmp.verdict}</span>
          </span>
        )}
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-3 font-mono text-[0.6875rem] text-slate-500 sm:gap-4">
        <span>
          left = <span className="text-slate-300">{left}</span>
        </span>
        <span>
          right = <span className="text-slate-300">{right}</span>
        </span>
        <span>
          mid = <span className="text-slate-300">{mid}</span>
        </span>
        {found && (
          <span className="text-accent-mint">
            target == nums[{mid}] ✓ {TARGET}
          </span>
        )}
      </div>
    </div>
  )
}
