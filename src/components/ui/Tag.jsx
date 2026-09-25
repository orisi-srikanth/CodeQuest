import { cn } from '@/lib/cn.js'

const TONES = {
  neutral: 'border-white/10 bg-white/[0.04] text-slate-300',
  cyan: 'border-signal-cyan/25 bg-signal-cyan/[0.08] text-signal-cyan-soft',
  magenta: 'border-signal-magenta/25 bg-signal-magenta/[0.08] text-signal-magenta-soft',
  amber: 'border-signal-amber/25 bg-signal-amber/[0.08] text-signal-amber',
}

/** Small mono label — used for difficulty, status and metadata chips. */
export default function Tag({ tone = 'neutral', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-[3px] font-mono text-[0.6875rem] font-medium leading-none tracking-wide',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
