import { CalendarDays, RefreshCw } from 'lucide-react'

import PotdCard from '@/components/potd/PotdCard.jsx'
import SubNav from '@/components/layout/SubNav.jsx'
import Button from '@/components/ui/Button.jsx'
import { cn } from '@/lib/cn.js'
import { POTD_PLATFORMS } from '@/data/potdPlatforms.js'
import { APP } from '@/lib/constants.js'
import { useDocumentTitle } from '@/hooks/useDocumentTitle.js'
import { usePotd } from '@/hooks/usePotd.js'
import { useSubmissions } from '@/hooks/useSubmissions.js'

const MODE_COPY = {
  live: { text: 'All sources live', tone: 'text-accent-mint' },
  partial: { text: 'Some sources unavailable — showing snapshot', tone: 'text-signal-amber' },
  snapshot: { text: 'Offline snapshot (API unreachable)', tone: 'text-slate-500' },
}

/**
 * Problem of the Day — one card per platform, each with the current problem,
 * its difficulty/acceptance/tags, a live reset countdown, and a Submit button
 * that opens the problem on the source site.
 *
 * Data comes from the CodeQuest API, which fetches from LeetCode,
 * GeeksforGeeks and takeUforward. If that API is unreachable the page falls
 * back to a bundled snapshot that still rotates daily.
 */
export default function Potd() {
  useDocumentTitle(`POTD — ${APP.name}`)

  const { status, items, mode, generatedAt, refresh } = usePotd()
  const { isSubmitted, markSubmitted, markUnsubmitted, countToday, clearAll } = useSubmissions()
  const loading = status === 'loading'

  const byId = new Map(items.map((item) => [item.id, item]))
  const modeCopy = mode ? MODE_COPY[mode] : null
  const liveCount = items.filter((item) => item.source === 'live').length

  return (
    <>
      <SubNav current="Problem of the Day">
        {modeCopy ? (
          <span className={cn('font-mono text-[0.6875rem]', modeCopy.tone)}>{modeCopy.text}</span>
        ) : (
          <span className="font-mono text-[0.6875rem] text-slate-500">Checking sources…</span>
        )}
        <button
          type="button"
          onClick={refresh}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[0.75rem] text-slate-400 transition-colors duration-300 hover:border-white/20 hover:text-slate-100 disabled:opacity-40"
        >
          <RefreshCw className={cn('h-3.5 w-3.5', loading && 'animate-spin')} aria-hidden="true" />
          Refresh
        </button>
      </SubNav>

      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_60%_at_50%_0%,#0c1322_0%,#05070d_70%)]"
        />

        <div className="container-page py-10 lg:py-14">
          {/* -------------------------------------------------- page head */}
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-slate-500">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              Problem of the Day
            </p>
            <h1 className="mt-3 text-display-sm font-semibold tracking-[-0.02em] text-slate-25">
              Three platforms, one problem each
            </h1>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-slate-400">
              Today&rsquo;s picks from LeetCode, GeeksforGeeks and takeUforward — pulled fresh,
              with each platform&rsquo;s reset clock so you know exactly how long is left.
            </p>
          </div>

          {/* ------------------------------------------------------ cards */}
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {POTD_PLATFORMS.map((platform) => (
              <PotdCard
                key={platform.id}
                platform={platform}
                problem={byId.get(platform.id) ?? null}
                generatedAt={generatedAt}
                submitted={isSubmitted(platform.id)}
                onSubmit={() => markSubmitted(platform.id)}
                onUnsubmit={() => markUnsubmitted(platform.id)}
              />
            ))}
          </div>

          {/* ---------------------------------------------------- footnote */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-6">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.6875rem] text-slate-600">
              <span>
                {liveCount}/{POTD_PLATFORMS.length} sources live
                {generatedAt
                  ? ` · last checked ${generatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                  : ''}
              </span>
              <span className="text-accent-mint">
                {countToday}/{POTD_PLATFORMS.length} submitted today
              </span>
              {countToday > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-slate-500 underline decoration-dotted underline-offset-4 transition-colors duration-300 hover:text-slate-300"
                >
                  clear marks
                </button>
              )}
            </p>
            <Button to="/tasks" variant="secondary" size="sm">
              Browse the practice library
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
