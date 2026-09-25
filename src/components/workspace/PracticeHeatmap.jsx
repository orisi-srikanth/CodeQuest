import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Flame, RotateCcw } from 'lucide-react'

import { cn } from '@/lib/cn.js'
import {
  MONTH_NAMES,
  WEEKDAY_SHORT,
  addDays,
  buildMonthMatrix,
  compareIso,
  diffDays,
  fromIso,
  istToday,
} from '@/lib/date.js'
import { useLocalStorage, useLocalStorageSet } from '@/hooks/useLocalStorage.js'

const RANGE_END = '2028-12-31'
const END_PARTS = fromIso(RANGE_END)
const STORAGE_KEY = 'codequest.practice.days'
const START_KEY = 'codequest.practice.start'

/** Longest run of consecutive marked days in a sorted ISO list. */
function longestStreak(sorted) {
  if (sorted.length === 0) return 0

  let best = 1
  let run = 1

  for (let i = 1; i < sorted.length; i += 1) {
    if (diffDays(sorted[i - 1], sorted[i]) === 1) {
      run += 1
      best = Math.max(best, run)
    } else if (sorted[i] !== sorted[i - 1]) {
      run = 1
    }
  }
  return best
}

/** Consecutive marked days ending today (or yesterday, so today is still open). */
function currentStreak(markedSet, todayIso) {
  let cursor = markedSet.has(todayIso) ? todayIso : addDays(todayIso, -1)
  let streak = 0

  while (markedSet.has(cursor)) {
    streak += 1
    cursor = addDays(cursor, -1)
  }
  return streak
}

const shiftMonth = ({ year, month }, delta) => {
  const total = year * 12 + (month - 1) + delta
  return { year: Math.floor(total / 12), month: (total % 12) + 1 }
}

const isBefore = (a, b) => a.year < b.year || (a.year === b.year && a.month < b.month)

/**
 * Practice heatmap — one month at a time.
 *
 * Showing a single month keeps every date legible and tappable instead of
 * shrinking three years into unreadable pixels. The month pager walks from the
 * first visit through December 2028, and a day turns green only when clicked.
 */
export default function PracticeHeatmap({ className }) {
  const todayIso = istToday()
  const todayParts = fromIso(todayIso)

  // Frozen on first visit: the range grows forward but never forgets the past.
  const [startIso, setStartIso] = useLocalStorage(START_KEY, todayIso)
  const effectiveStart = compareIso(startIso, todayIso) > 0 ? todayIso : startIso
  const startParts = useMemo(() => fromIso(effectiveStart), [effectiveStart])

  const { set: markedSet, list: markedList, toggle, clear } = useLocalStorageSet(STORAGE_KEY)

  const [cursor, setCursor] = useState(() => ({
    year: todayParts.year,
    month: todayParts.month,
  }))

  // If the range start moves past the cursor (after a reset), snap back.
  useEffect(() => {
    setCursor((c) => (isBefore(c, startParts) ? { ...startParts } : c))
  }, [startParts])

  const weeks = useMemo(() => buildMonthMatrix(cursor.year, cursor.month), [cursor])

  const stats = useMemo(() => {
    const totalDays = diffDays(effectiveStart, RANGE_END) + 1
    const marked = markedList.length
    return {
      totalDays,
      marked,
      remaining: totalDays - marked,
      percent: totalDays === 0 ? 0 : Math.round((marked / totalDays) * 100),
      current: currentStreak(markedSet, todayIso),
      longest: longestStreak(markedList),
    }
  }, [effectiveStart, markedList, markedSet, todayIso])

  const monthStats = useMemo(() => {
    const prefix = `${cursor.year}-${String(cursor.month).padStart(2, '0')}`
    const marked = markedList.filter((iso) => iso.startsWith(prefix)).length
    const daysInMonth = buildMonthMatrix(cursor.year, cursor.month).flat().filter((c) => c.inMonth).length
    return { marked, daysInMonth }
  }, [cursor, markedList])

  const canPrev = !isBefore(cursor, shiftMonth(startParts, 0)) && !(cursor.year === startParts.year && cursor.month === startParts.month)
  const canNext = !(cursor.year === END_PARTS.year && cursor.month === END_PARTS.month)

  const isCurrentMonth = cursor.year === todayParts.year && cursor.month === todayParts.month

  const markToday = () => {
    if (!markedSet.has(todayIso)) toggle(todayIso)
  }

  const reset = () => {
    clear()
    setStartIso(todayIso)
    setCursor({ year: todayParts.year, month: todayParts.month })
  }

  const goToToday = () => setCursor({ year: todayParts.year, month: todayParts.month })

  return (
    <div className={cn('grid min-w-0 gap-6 lg:grid-cols-[minmax(0,19.5rem)_minmax(0,1fr)] lg:items-start', className)}>
      {/* ------------------------------------------------ month grid (left) */}
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <p className="text-[0.9375rem] font-medium text-slate-100">
              {MONTH_NAMES[cursor.month - 1]}
            </p>
            <p className="font-mono text-[0.75rem] text-slate-500">{cursor.year}</p>
          </div>

          <div className="flex items-center gap-1.5">
            {!isCurrentMonth && (
              <button
                type="button"
                onClick={goToToday}
                className="h-7 rounded-lg border border-white/[0.09] bg-white/[0.03] px-2 font-mono text-[0.625rem] text-slate-400 transition-colors duration-300 hover:border-white/20 hover:text-slate-100"
              >
                Today
              </button>
            )}
            <PagerButton
              label="Previous month"
              disabled={!canPrev}
              onClick={() => setCursor((c) => shiftMonth(c, -1))}
            >
              <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
            </PagerButton>
            <PagerButton
              label="Next month"
              disabled={!canNext}
              onClick={() => setCursor((c) => shiftMonth(c, 1))}
            >
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </PagerButton>
          </div>
        </div>

        {isCurrentMonth && (
          <span className="mt-2 inline-block rounded-full border border-accent-blue/30 bg-accent-blue/[0.08] px-2 py-px font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-accent-blue">
            this month
          </span>
        )}

        <div
          role="group"
          aria-label={`Practice days for ${MONTH_NAMES[cursor.month - 1]} ${cursor.year}`}
          className="mt-3 rounded-2xl border border-white/[0.05] bg-white/[0.012] p-3"
        >
          <div className="grid grid-cols-7 gap-1.5">
            {WEEKDAY_SHORT.map((day) => (
              <span
                key={day}
                aria-hidden="true"
                className="pb-1.5 text-center font-mono text-[0.625rem] uppercase tracking-[0.06em] text-slate-600"
              >
                {day.slice(0, 1)}
              </span>
            ))}

            {weeks.flat().map((cell) => {
              const inRange =
                cell.inMonth &&
                compareIso(cell.iso, effectiveStart) >= 0 &&
                compareIso(cell.iso, RANGE_END) <= 0

              if (!inRange) {
                // Outside the tracked range: shown faintly so the month still
                // reads as a full calendar, but not clickable.
                return (
                  <span
                    key={cell.iso}
                    aria-hidden="true"
                    className="flex aspect-square items-center justify-center rounded-lg font-mono text-[0.75rem] tabular-nums text-slate-800"
                  >
                    {cell.inMonth ? cell.day : ''}
                  </span>
                )
              }

              const marked = markedSet.has(cell.iso)
              const isToday = cell.iso === todayIso

              return (
                <button
                  key={cell.iso}
                  type="button"
                  onClick={() => toggle(cell.iso)}
                  aria-pressed={marked}
                  aria-label={`${cell.iso}${marked ? ' — marked present' : ' — not marked'}`}
                  title={`${cell.iso}${marked ? ' · present' : ' · click to mark present'}`}
                  className={cn(
                    'flex aspect-square items-center justify-center rounded-xl border font-mono text-[0.8125rem] tabular-nums',
                    'transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-premium',
                    'hover:scale-[1.09] active:scale-95',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-cyan/70',
                    marked
                      ? 'border-accent-mint/60 bg-gradient-to-br from-accent-mint/90 to-accent-mint-deep/90 font-semibold text-ink-950 shadow-[0_5px_14px_-6px_rgba(52,211,153,0.85)] hover:brightness-110'
                      : 'border-white/[0.07] bg-white/[0.028] text-slate-500 hover:border-accent-mint/45 hover:bg-accent-mint/[0.08] hover:text-slate-100',
                    isToday && 'ring-2 ring-accent-blue/60 ring-offset-2 ring-offset-ink-950',
                  )}
                >
                  {cell.day}
                </button>
              )
            })}
          </div>
        </div>

        <p className="mt-2.5 font-mono text-[0.625rem] text-slate-500">
          <span className="text-accent-mint">{monthStats.marked}</span> of{' '}
          {monthStats.daysInMonth} days marked
        </p>
      </div>

      {/* --------------------------------------------- stats + actions (right) */}
      <div className="flex flex-col gap-4 sm:border-l sm:border-white/[0.06] sm:pl-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <Stat label="Marked" value={stats.marked} tone="mint" />
          <Stat label="Streak" value={`${stats.current}d`} tone="mint" icon={Flame} />
          <Stat label="Best" value={`${stats.longest}d`} />
          <Stat label="Left" value={stats.remaining} />
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate-500">
              Progress
            </span>
            <span className="font-mono text-[0.625rem] text-slate-500">
              {stats.percent}% of {stats.totalDays} days
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-mint-deep to-accent-mint transition-[width] duration-500 ease-premium"
              style={{ width: `${stats.percent}%` }}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={markToday}
            disabled={markedSet.has(todayIso)}
            className="h-8 rounded-lg border border-accent-mint/35 bg-accent-mint/10 px-2.5 font-mono text-[0.6875rem] text-accent-mint transition-colors duration-300 hover:bg-accent-mint/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {markedSet.has(todayIso) ? 'Today marked ✓' : 'Mark today present'}
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={stats.marked === 0}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.09] bg-white/[0.03] px-2.5 font-mono text-[0.6875rem] text-slate-400 transition-colors duration-300 hover:border-white/20 hover:text-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            Reset
          </button>
        </div>

        <ul className="mt-auto flex flex-col gap-1.5 border-t border-white/[0.06] pt-3">
          <li className="flex items-center gap-2 font-mono text-[0.625rem] text-slate-500">
            <span className="h-3 w-3 rounded-md border border-accent-mint/60 bg-gradient-to-br from-accent-mint/90 to-accent-mint-deep/90" />
            Present — you clicked it
          </li>
          <li className="flex items-center gap-2 font-mono text-[0.625rem] text-slate-500">
            <span className="h-3 w-3 rounded-md border border-white/[0.12] bg-white/[0.028]" />
            Not marked — click to mark
          </li>
          <li className="flex items-center gap-2 font-mono text-[0.625rem] text-slate-500">
            <span className="h-3 w-3 rounded-md ring-2 ring-accent-blue/60" />
            Today (IST)
          </li>
          <li className="pt-1 font-mono text-[0.625rem] text-slate-600">
            {effectiveStart} → {RANGE_END}
          </li>
        </ul>
      </div>
    </div>
  )
}

function PagerButton({ label, disabled, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.09] bg-white/[0.03] text-slate-400 transition-colors duration-300 hover:border-white/25 hover:text-slate-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/[0.09] disabled:hover:text-slate-400"
    >
      {children}
    </button>
  )
}

function Stat({ label, value, tone = 'default', icon: Icon }) {
  return (
    <div>
      <p className="flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate-500">
        {Icon ? <Icon className="h-3 w-3" aria-hidden="true" /> : null}
        {label}
      </p>
      <p
        className={cn(
          'mt-0.5 font-mono text-lg tabular-nums',
          tone === 'mint' ? 'text-accent-mint' : 'text-slate-100',
        )}
      >
        {value}
      </p>
    </div>
  )
}
