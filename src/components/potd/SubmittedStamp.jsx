import { cn } from '@/lib/cn.js'

/**
 * Green "SUBMITTED" ink stamp, pressed over the card once a problem has been
 * submitted. Doubled border + slight rotation read as a rubber stamp rather
 * than a UI badge.
 *
 * It is a button so the mark is reversible — clicking clears the stamp.
 */
export default function SubmittedStamp({ onClear, className }) {
  return (
    <button
      type="button"
      onClick={onClear}
      title="Submitted — click to clear this mark"
      aria-label="Submitted. Click to clear this mark"
      className={cn(
        'group/stamp absolute right-3 top-[3.4rem] z-10 -rotate-[13deg] transition-transform duration-300 ease-premium hover:-rotate-[9deg] hover:scale-[1.03]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-mint/70',
        className,
      )}
    >
      <span
        className={cn(
          'block rounded-md border-2 border-accent-mint/55 px-2.5 py-1',
          'font-mono text-[0.6875rem] font-semibold uppercase leading-none tracking-[0.18em] text-accent-mint',
          'shadow-[inset_0_0_0_2px_rgba(52,211,153,0.12)]',
        )}
      >
        Submitted
      </span>
      <span
        aria-hidden="true"
        className="mt-[3px] block text-center font-mono text-[0.5rem] uppercase tracking-[0.22em] text-accent-mint/60"
      >
        ✓ recorded
      </span>
    </button>
  )
}
