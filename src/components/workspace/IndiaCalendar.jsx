import { useMemo, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/cn.js'
import {
  MONTH_NAMES,
  WEEKDAY_SHORT,
  buildMonthMatrix,
  formatIndiaDate,
  fromIso,
  istToday,
} from '@/lib/date.js'
import { CALENDAR_MAX_YEAR, CALENDAR_MIN_YEAR, holidayFor } from '@/data/indiaHolidays.js'

const YEARS = Array.from(
  { length: CALENDAR_MAX_YEAR - CALENDAR_MIN_YEAR + 1 },
  (_, i) => CALENDAR_MIN_YEAR + i,
)

/** Step a `{ year, month }` cursor by whole months, clamped to the range. */
function shiftMonth({ year, month }, delta) {
  const zeroBased = year * 12 + (month - 1) + delta
  const nextYear = Math.floor(zeroBased / 12)
  const nextMonth = (zeroBased % 12) + 1

  if (nextYear < CALENDAR_MIN_YEAR) return { year: CALENDAR_MIN_YEAR, month: 1 }
  if (nextYear > CALENDAR_MAX_YEAR) return { year: CALENDAR_MAX_YEAR, month: 12 }
  return { year: nextYear, month: nextMonth }
}

/**
 * India calendar — Sunday-first weeks, IST-anchored "today", and Indian
 * national holidays marked. Navigable across 2023–2040 with year and month
 * selectors plus prev/next arrows.
 */
export default function IndiaCalendar({ className }) {
  const todayIso = istToday()
  const todayParts = fromIso(todayIso)

  const [cursor, setCursor] = useState({ year: todayParts.year, month: todayParts.month })
  const [selected, setSelected] = useState(todayIso)

  const weeks = useMemo(() => buildMonthMatrix(cursor.year, cursor.month), [cursor])

  const selectedParts = fromIso(selected)
  const selectedHoliday = holidayFor(selectedParts.month, selectedParts.day, selectedParts.year)

  const atMin = cursor.year === CALENDAR_MIN_YEAR && cursor.month === 1
  const atMax = cursor.year === CALENDAR_MAX_YEAR && cursor.month === 12

  const navButton = (direction) => {
    const delta = direction === 'prev' ? -1 : 1
    const disabled = direction === 'prev' ? atMin : atMax
    const Icon = direction === 'prev' ? ChevronLeft : ChevronRight

    return (
      <button
        type="button"
        onClick={() => setCursor((prev) => shiftMonth(prev, delta))}
        disabled={disabled}
        aria-label={direction === 'prev' ? 'Previous month' : 'Next month'}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.09] bg-white/[0.03] text-slate-400 transition-colors duration-300 hover:border-white/20 hover:text-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </button>
    )
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {/* ------------------------------------------------------ controls */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5">
          <select
            value={cursor.month}
            onChange={(event) =>
              setCursor((prev) => ({ ...prev, month: Number(event.target.value) }))
            }
            aria-label="Month"
            className="h-8 rounded-lg border border-white/[0.09] bg-white/[0.03] px-2 font-mono text-[0.75rem] text-slate-300 outline-none transition-colors duration-300 hover:border-white/20 focus:border-signal-cyan/40"
          >
            {MONTH_NAMES.map((name, index) => (
              <option key={name} value={index + 1} className="bg-ink-900">
                {name}
              </option>
            ))}
          </select>

          <select
            value={cursor.year}
            onChange={(event) =>
              setCursor((prev) => ({ ...prev, year: Number(event.target.value) }))
            }
            aria-label="Year"
            className="h-8 rounded-lg border border-white/[0.09] bg-white/[0.03] px-2 font-mono text-[0.75rem] text-slate-300 outline-none transition-colors duration-300 hover:border-white/20 focus:border-signal-cyan/40"
          >
            {YEARS.map((year) => (
              <option key={year} value={year} className="bg-ink-900">
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              setCursor({ year: todayParts.year, month: todayParts.month })
              setSelected(todayIso)
            }}
            className="h-8 rounded-lg border border-white/[0.09] bg-white/[0.03] px-2.5 font-mono text-[0.6875rem] text-slate-400 transition-colors duration-300 hover:border-white/20 hover:text-slate-100"
          >
            Today
          </button>
          {navButton('prev')}
          {navButton('next')}
        </div>
      </div>

      {/* --------------------------------------------------------- grid */}
      <div className="mt-4">
        <div className="grid grid-cols-7 gap-1">
          {WEEKDAY_SHORT.map((day) => (
            <span
              key={day}
              className="pb-1 text-center font-mono text-[0.625rem] uppercase tracking-wider text-slate-600"
            >
              {day.slice(0, 1)}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {weeks.flat().map((cell) => {
            const parts = fromIso(cell.iso)
            const holiday = holidayFor(parts.month, parts.day, parts.year)
            const isToday = cell.iso === todayIso
            const isSelected = cell.iso === selected

            return (
              <button
                key={cell.iso}
                type="button"
                onClick={() => setSelected(cell.iso)}
                aria-label={formatIndiaDate(cell.iso, { withWeekday: true })}
                aria-current={isToday ? 'date' : undefined}
                title={holiday ? `${formatIndiaDate(cell.iso)} — ${holiday.name}` : formatIndiaDate(cell.iso)}
                className={cn(
                  'relative flex h-9 items-center justify-center rounded-lg border font-mono text-[0.75rem] transition-colors duration-200',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-cyan/70',
                  !cell.inMonth && 'opacity-30',
                  isSelected
                    ? 'border-accent-blue/50 bg-accent-blue/15 text-accent-blue'
                    : holiday
                      ? 'border-signal-amber/30 bg-signal-amber/[0.07] text-signal-amber hover:border-signal-amber/50'
                      : 'border-white/[0.06] bg-white/[0.02] text-slate-300 hover:border-white/[0.18] hover:bg-white/[0.05]',
                  isToday && !isSelected && 'ring-1 ring-accent-blue/40',
                )}
              >
                {cell.day}
                {holiday && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-1 h-1 w-1 rounded-full bg-signal-amber"
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ------------------------------------------------------ selection */}
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/[0.06] pt-3">
        <CalendarDays className="h-3.5 w-3.5 shrink-0 text-slate-600" aria-hidden="true" />
        <span className="font-mono text-[0.6875rem] text-slate-400">
          {formatIndiaDate(selected, { withWeekday: true })}
        </span>
        {selectedHoliday && (
          <span className="rounded border border-signal-amber/30 bg-signal-amber/[0.07] px-1.5 py-[2px] font-mono text-[0.625rem] text-signal-amber">
            {selectedHoliday.name}
          </span>
        )}
        <span className="ml-auto font-mono text-[0.625rem] text-slate-600">
          {CALENDAR_MIN_YEAR}–{CALENDAR_MAX_YEAR} · IST
        </span>
      </div>

      {/* --------------------------------------------------------- legend */}
      <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        <li className="flex items-center gap-1.5 font-mono text-[0.625rem] text-slate-500">
          <span className="h-2.5 w-2.5 rounded border border-signal-amber/40 bg-signal-amber/20" />
          National holiday
        </li>
        <li className="flex items-center gap-1.5 font-mono text-[0.625rem] text-slate-500">
          <span className="h-2.5 w-2.5 rounded border border-accent-blue/50 bg-accent-blue/20" />
          Selected
        </li>
        <li className="flex items-center gap-1.5 font-mono text-[0.625rem] text-slate-500">
          <span className="h-2.5 w-2.5 rounded ring-1 ring-accent-blue/50" />
          Today (IST)
        </li>
      </ul>
    </div>
  )
}
