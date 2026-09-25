import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

import ArrayPointerInspector from '@/components/hero/ArrayPointerInspector.jsx'
import CodeBlock from '@/components/hero/CodeBlock.jsx'
import DryRunControls from '@/components/hero/DryRunControls.jsx'
import StepBar from '@/components/hero/StepBar.jsx'
import Tag from '@/components/ui/Tag.jsx'
import { cn } from '@/lib/cn.js'
import { LANGUAGES, PROBLEM, TRACE } from '@/data/algorithm.js'
import { useStepMachine } from '@/hooks/useStepMachine.js'

/**
 * Hero centrepiece: a live dry-run console for binary search.
 *
 * The machine walks the trace forward automatically, and the reader can drive
 * it by hand — play/pause, step back and forward, restart, or jump to a step.
 * Each step highlights the code line that runs, glides the L/R/MID pointers,
 * and states the comparison that justifies the branch.
 *
 * Arrow keys work while a control has focus; Space toggles play.
 */
export default function BinarySearchPanel({ className }) {
  const [languageId, setLanguageId] = useState(LANGUAGES[0].id)
  const language = LANGUAGES.find((item) => item.id === languageId) ?? LANGUAGES[0]

  const machine = useStepMachine(TRACE)
  const { step, index, total, playing, isAtEnd, play, pause, prev, next, restart, goTo } = machine

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      next()
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      prev()
    } else if (event.key === ' ') {
      event.preventDefault()
      playing ? pause() : play()
    }
  }

  return (
    <section
      aria-label="Binary search dry run"
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/[0.09] bg-ink-850/80 shadow-card',
        className,
      )}
    >
      {/* ---------------------------------------------------------- header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3 sm:px-5">
        <h2 className="flex items-center gap-2 text-[0.9375rem] font-medium text-slate-100">
          {PROBLEM.title}
          <span className="font-mono text-[0.75rem] font-normal text-slate-500">
            {PROBLEM.tags}
          </span>
          <span className="font-mono text-[0.75rem] font-normal text-accent-blue">
            {PROBLEM.complexity}
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <Tag tone="amber">{PROBLEM.difficulty.label}</Tag>
          <span className="rounded border border-white/[0.09] bg-white/[0.04] px-2 py-[3px] font-mono text-[0.6875rem] leading-none text-slate-400">
            {PROBLEM.number}_BinarySearch.{language.ext}
          </span>
        </div>
      </div>

      {/* --------------------------------------------------------- toolbar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.06] bg-white/[0.012] px-4 py-2.5 sm:px-5">
        <span className="flex items-center gap-[6px]" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/12" />
          <span className="h-2 w-2 rounded-full bg-white/12" />
          <span className="h-2 w-2 rounded-full bg-white/12" />
        </span>
        <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Language">
          {LANGUAGES.map((item) => {
            const isActive = item.id === language.id
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setLanguageId(item.id)}
                className={cn(
                  'rounded-md px-2.5 py-1 font-mono text-[0.6875rem] transition-colors duration-300',
                  isActive
                    ? 'bg-white/[0.09] text-slate-100'
                    : 'text-slate-500 hover:bg-white/[0.04] hover:text-slate-300',
                )}
              >
                {item.label}
              </button>
            )
          })}
        </div>
        <p className="ml-auto hidden font-mono text-[0.6875rem] text-slate-500 sm:block">
          {PROBLEM.complexity} · in-place
        </p>
      </div>

      {/* -------------------------------------------------------- body */}
      <div className="space-y-3 px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-[0.6875rem] text-slate-500">
            Problem: <span className="text-slate-300">{PROBLEM.signature}</span>
          </p>
          <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-accent-mint">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping-soft rounded-full bg-accent-mint motion-reduce:hidden" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-accent-mint" />
            </span>
            Live Visualizer Ready
          </span>
        </div>

        <ArrayPointerInspector step={step} />

        {/* transport + step trail, keyboard driven */}
        <div role="group" aria-label="Dry run controls" onKeyDown={onKeyDown}>
          <DryRunControls
            index={index}
            total={total}
            playing={playing}
            isAtEnd={isAtEnd}
            stepLabel={step.label}
            onPlay={play}
            onPause={pause}
            onPrev={prev}
            onNext={next}
            onRestart={restart}
            onGoTo={goTo}
          />
        </div>

        <StepBar step={step} index={index} total={total} />
        <CodeBlock lines={language.lines} focusKey={step.lineKey} />
      </div>

      {/* --------------------------------------------------------- footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] bg-white/[0.015] px-4 py-3 sm:px-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-accent-mint">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            Test Passed {PROBLEM.runtime.cases} Cases
          </span>
          <span className="font-mono text-[0.6875rem] text-slate-500">
            Runtime: {PROBLEM.runtime.ms}{' '}
            <span className="text-slate-400">(Beats {PROBLEM.runtime.beats})</span>
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[0.6875rem] text-slate-500">
            Mem: {PROBLEM.runtime.mem} <span className="text-accent-mint">Verified</span>
          </span>
          <span className="rounded border border-white/[0.09] bg-white/[0.04] px-2 py-[3px] font-mono text-[0.6875rem] leading-none text-slate-400">
            {PROBLEM.space.label}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" aria-hidden="true" />
            {PROBLEM.space.aux}
          </span>
        </div>
      </div>
    </section>
  )
}
