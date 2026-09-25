import { ArrowUpRight, Check, Clock, ExternalLink, Loader2 } from 'lucide-react'

import { PLATFORM_LOGOS } from '@/components/brand/PlatformLogos.jsx'
import SubmittedStamp from '@/components/potd/SubmittedStamp.jsx'
import Tag from '@/components/ui/Tag.jsx'
import { cn } from '@/lib/cn.js'
import { useCountdown } from '@/hooks/useCountdown.js'

const DIFFICULTY_TONE = {
  easy: 'cyan',
  medium: 'amber',
  hard: 'magenta',
  core: 'cyan',
  basic: 'neutral',
}

/** Countdown chip — the "when does this refresh" read-out. */
function ResetCountdown({ resetAt }) {
  const { label, expired } = useCountdown(resetAt)

  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-slate-500"
      title={`Resets ${resetAt.toLocaleString()}`}
    >
      <Clock className="h-3 w-3 shrink-0" aria-hidden="true" />
      {expired ? (
        <span className="text-signal-amber">refreshing…</span>
      ) : (
        <>
          resets in <span className="text-slate-300 tabular-nums">{label}</span>
        </>
      )}
    </span>
  )
}

function Skeleton({ label }) {
  return (
    <span className="font-mono text-[0.8125rem] text-slate-600">
      {label ? 'Loading…' : <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
    </span>
  )
}

/**
 * One platform's Problem of the Day: mark, program name, the problem itself,
 * difficulty / accuracy / tags, the reset countdown, and a Solve button that
 * opens the problem on the source platform.
 */
export default function PotdCard({ platform, problem, generatedAt, submitted = false, onSubmit, onUnsubmit }) {
  const Logo = PLATFORM_LOGOS[platform.id]
  const { accent } = platform
  const isLoading = !problem

  const difficultyLabel = problem?.difficulty
    ? String(problem.difficulty).replace(/-/g, ' ')
    : null
  const difficultyTone = difficultyLabel
    ? DIFFICULTY_TONE[difficultyLabel.toLowerCase()] ?? 'neutral'
    : 'neutral'

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-ink-850/70 p-5 shadow-card transition-[transform,border-color] duration-500 ease-premium hover:-translate-y-1',
        accent.border,
        'hover:border-white/[0.16]',
      )}
    >
      {submitted && <SubmittedStamp onClear={onUnsubmit} />}

      {/* brand wash, tinted per platform */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(closest-side, ${accent.glow}, transparent)` }}
      />

      {/* --------------------------------------------------------- header */}
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Logo />
          <div className="min-w-0">
            <h3 className="truncate text-[0.9375rem] font-medium text-slate-100">
              {platform.name}
            </h3>
            <p className="truncate font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slate-500">
              {platform.program}
            </p>
          </div>
        </div>

        <span
          className={cn(
            'shrink-0 rounded border px-2 py-[3px] font-mono text-[0.625rem] uppercase leading-none',
            problem?.source === 'live'
              ? 'border-accent-mint/35 bg-accent-mint/10 text-accent-mint'
              : 'border-white/[0.1] bg-white/[0.04] text-slate-500',
          )}
          title={
            problem?.source === 'live'
              ? 'Fetched live from the platform'
              : 'Bundled snapshot — the CodeQuest API is not reachable'
          }
        >
          {problem?.source === 'live' ? 'Live' : 'Snapshot'}
        </span>
      </header>

      {/* -------------------------------------------------------- problem */}
      <div className="mt-4 flex-1">
        {isLoading ? (
          <div className="flex h-full min-h-[86px] items-center">
            <Skeleton label />
          </div>
        ) : (
          <>
            {/* pr reserves space so the stamp never sits over the title */}
            <p className={cn('text-[1.0625rem] font-medium leading-snug text-slate-25', submitted && 'pr-24')}>
              {problem.title}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {difficultyLabel && <Tag tone={difficultyTone}>{difficultyLabel}</Tag>}
              {problem.accuracy != null && (
                <span className="font-mono text-[0.6875rem] text-slate-500">
                  {problem.accuracy}% acceptance
                </span>
              )}
            </div>

            {problem.tags.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {problem.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded border border-white/[0.07] bg-white/[0.03] px-1.5 py-[3px] font-mono text-[0.625rem] text-slate-500"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      {/* --------------------------------------------------------- footer */}
      <footer className="mt-5 border-t border-white/[0.06] pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {problem ? (
            <ResetCountdown resetAt={problem.resetAt} />
          ) : (
            <span className="font-mono text-[0.6875rem] text-slate-600">—</span>
          )}

          <a
            href={problem?.url || platform.home}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onSubmit?.()}
            aria-label={`Submit today's ${platform.name} problem — opens the problem in a new tab and marks it submitted`}
            className={cn(
              'group/btn inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[0.8125rem] font-medium transition-colors duration-300',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-cyan/70',
              submitted
                ? 'border-accent-mint/45 bg-accent-mint/12 text-accent-mint'
                : cn(accent.chip, 'hover:brightness-125'),
            )}
          >
            {submitted ? (
              <>
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                Submitted
              </>
            ) : (
              <>
                Submit
                <ExternalLink
                  className="h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover/btn:translate-x-[1px] group-hover/btn:-translate-y-[1px]"
                  aria-hidden="true"
                />
              </>
            )}
          </a>
        </div>

        <p className="mt-3 flex items-center gap-1.5 font-mono text-[0.625rem] text-slate-600">
          <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden="true" />
          {platform.blurb}
        </p>

        {generatedAt ? (
          <p className="mt-1.5 font-mono text-[0.625rem] text-slate-700">
            checked {generatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        ) : null}
      </footer>
    </article>
  )
}
