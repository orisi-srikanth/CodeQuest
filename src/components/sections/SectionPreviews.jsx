import { cn } from '@/lib/cn.js'

/**
 * Miniature, non-interactive previews for the landing reference sections.
 * Each one hints at the shape of its page without implementing any of it.
 */

function Shell({ title, meta, children }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-ink-900/70">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-3.5 py-2.5">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slate-500">
          {title}
        </span>
        <span className="font-mono text-[0.6875rem] text-slate-600">{meta}</span>
      </div>
      <div className="px-3.5 py-3">{children}</div>
    </div>
  )
}

const DIFFICULTY_TONE = {
  Easy: 'text-accent-mint',
  Medium: 'text-signal-amber',
  Hard: 'text-signal-magenta-soft',
}

function MiniTasks() {
  const rows = [
    { n: '#704', title: 'Binary Search', d: 'Easy', acc: '72.4%' },
    { n: '#121', title: 'Best Time to Buy and Sell Stock', d: 'Easy', acc: '54.1%' },
    { n: '#200', title: 'Number of Islands', d: 'Medium', acc: '58.7%' },
  ]

  return (
    <Shell title="Problem library" meta="450+">
      <ul className="divide-y divide-white/[0.05]">
        {rows.map((row) => (
          <li key={row.n} className="flex items-center gap-3 py-2 first:pt-0 last:pb-0">
            <span className="font-mono text-[0.6875rem] text-slate-600">{row.n}</span>
            <span className="truncate text-[0.8125rem] text-slate-300">{row.title}</span>
            <span
              className={cn(
                'ml-auto shrink-0 font-mono text-[0.6875rem]',
                DIFFICULTY_TONE[row.d],
              )}
            >
              {row.d}
            </span>
            <span className="hidden shrink-0 font-mono text-[0.6875rem] text-slate-600 sm:block">
              {row.acc}
            </span>
          </li>
        ))}
      </ul>
    </Shell>
  )
}

function MiniPotd() {
  return (
    <Shell title="Today" meta="POTD">
      <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[0.6875rem] text-slate-500">#121_BestTime</span>
          <span className="font-mono text-[0.6875rem] text-accent-mint">Easy</span>
        </div>
        <p className="mt-2 text-[0.875rem] text-slate-200">Best Time to Buy and Sell Stock</p>
        <div className="mt-3 flex items-center gap-3 font-mono text-[0.6875rem] text-slate-500">
          <span className="rounded border border-white/[0.09] bg-white/[0.04] px-1.5 py-[3px]">
            🔥 Streak 12
          </span>
          <span>Resets in 06:41:22</span>
        </div>
      </div>
    </Shell>
  )
}

function MiniContests() {
  const rows = [
    { name: 'Weekly Round 34', when: 'Sun · 20:00 IST', state: 'Upcoming' },
    { name: 'Binary Search Sprint', when: 'Closed', state: 'Ranked 148' },
  ]

  return (
    <Shell title="Schedule" meta="2 rounds">
      <ul className="space-y-2">
        {rows.map((row) => (
          <li
            key={row.name}
            className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2"
          >
            <span className="truncate text-[0.8125rem] text-slate-300">{row.name}</span>
            <span className="ml-auto hidden shrink-0 font-mono text-[0.6875rem] text-slate-600 sm:block">
              {row.when}
            </span>
            <span className="shrink-0 rounded border border-white/[0.09] bg-white/[0.04] px-1.5 py-[3px] font-mono text-[0.625rem] text-slate-400">
              {row.state}
            </span>
          </li>
        ))}
      </ul>
    </Shell>
  )
}

function MiniWorkspace() {
  // A compact month of small, rounded cells — the same clickable squares the
  // real heatmap uses, scaled right down so the preview stays cute, not heavy.
  const marked = new Set([1, 2, 4, 5, 6, 9, 11, 12, 13, 16, 18, 19, 20, 23, 25, 26, 27, 30])

  return (
    <Shell title="Practice heatmap" meta="Sept 2026">
      <div className="flex flex-wrap items-center justify-center gap-x-3">
        <span className="font-mono text-[0.625rem] text-slate-500">
          <span className="text-accent-mint">18</span> marked · streak{' '}
          <span className="text-accent-mint">4d</span>
        </span>
      </div>

      {/* small grid, sized so the whole month stays about 200px wide */}
      <div className="mx-auto mt-1 w-full max-w-[13.5rem]">
        <div className="grid grid-cols-7 gap-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <span key={i} className="text-center font-mono text-[0.5rem] text-slate-700">
              {d}
            </span>
          ))}

          {Array.from({ length: 2 }, (_, i) => (
            <span key={`lead-${i}`} />
          ))}

          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
            <span
              key={day}
              className={cn(
                'flex aspect-square items-center justify-center rounded-[7px] border font-mono text-[0.5625rem] tabular-nums transition-colors duration-300',
                marked.has(day)
                  ? 'border-accent-mint/35 bg-accent-mint/45 font-medium text-accent-mint shadow-[0_0_10px_-3px_rgba(52,211,153,0.55)]'
                  : 'border-white/[0.06] bg-white/[0.022] text-slate-600',
              )}
            >
              {day}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3.5 flex items-center gap-3 border-t border-white/[0.06] pt-2.5">
        <span className="font-mono text-[0.625rem] text-slate-600">IST</span>
        <span className="font-mono text-[0.6875rem] tabular-nums text-slate-300">
          08:41:07 <span className="text-accent-mint">PM</span>
        </span>
        <span className="ml-auto font-mono text-[0.625rem] text-slate-600">2023–2040</span>
      </div>
    </Shell>
  )
}

export const PREVIEWS = {
  tasks: MiniTasks,
  potd: MiniPotd,
  contests: MiniContests,
  workspace: MiniWorkspace,
}

export default PREVIEWS
