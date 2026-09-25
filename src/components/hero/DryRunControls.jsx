import { Pause, Play, RotateCcw, SkipBack, SkipForward } from 'lucide-react'

import { cn } from '@/lib/cn.js'

/** Small round transport control. */
function ControlButton({ label, onClick, disabled, primary = false, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-colors duration-300',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-cyan/70',
        'disabled:cursor-not-allowed disabled:opacity-35',
        primary
          ? 'border-accent-blue/40 bg-accent-blue/15 text-accent-blue hover:bg-accent-blue/25'
          : 'border-white/[0.09] bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-slate-200',
      )}
    >
      {children}
    </button>
  )
}

/**
 * Dry-run transport bar.
 *
 * Left: restart / prev / play-pause / next.
 * Right: a clickable step trail — completed steps fill in, the active step is
 * outlined, and any step can be jumped to directly.
 */
export default function DryRunControls({
  index,
  total,
  playing,
  isAtEnd,
  onPlay,
  onPause,
  onPrev,
  onNext,
  onRestart,
  onGoTo,
  stepLabel,
}) {
  const atStart = index === 0

  return (
    <div className="flex min-w-0 flex-col gap-3 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-slate-500">
          Dry run
        </span>
        <span aria-hidden="true" className="h-4 w-px bg-white/10" />

        <div className="flex items-center gap-1.5">
          <ControlButton label="Restart dry run" onClick={onRestart}>
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          </ControlButton>
          <ControlButton label="Previous step" onClick={onPrev} disabled={atStart}>
            <SkipBack className="h-3.5 w-3.5" aria-hidden="true" />
          </ControlButton>
          <ControlButton
            label={playing ? 'Pause dry run' : isAtEnd ? 'Replay dry run' : 'Play dry run'}
            onClick={playing ? onPause : onPlay}
            primary
          >
            {playing ? (
              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </ControlButton>
          <ControlButton label="Next step" onClick={onNext} disabled={isAtEnd}>
            <SkipForward className="h-3.5 w-3.5" aria-hidden="true" />
          </ControlButton>
        </div>

        <span className="min-w-0 font-mono text-[0.6875rem] text-slate-500">
          Step <span className="text-slate-200">{index + 1}</span>/{total}
          {stepLabel ? <span className="ml-2 inline-block max-w-[10rem] truncate align-bottom text-slate-600 sm:max-w-none">{stepLabel}</span> : null}
        </span>
      </div>

      {/* step trail — click to jump */}
      <ol className="flex flex-wrap items-center gap-1" aria-label="Dry run steps">
        {Array.from({ length: total }, (_, stepIndex) => {
          const done = stepIndex < index
          const active = stepIndex === index

          return (
            <li key={stepIndex}>
              <button
                type="button"
                onClick={() => onGoTo(stepIndex)}
                aria-label={`Go to step ${stepIndex + 1}`}
                aria-current={active ? 'step' : undefined}
                className={cn(
                  'h-5 min-w-[1.5rem] rounded px-1.5 font-mono text-[0.625rem] transition-colors duration-300',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-cyan/70',
                  active
                    ? 'bg-accent-blue/25 text-accent-blue ring-1 ring-accent-blue/50'
                    : done
                      ? 'bg-accent-mint/15 text-accent-mint hover:bg-accent-mint/25'
                      : 'bg-white/[0.05] text-slate-500 hover:bg-white/[0.09] hover:text-slate-300',
                )}
              >
                {stepIndex + 1}
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
