import { CalendarDays, Clock, Flame, Link2 } from 'lucide-react'

import SubNav from '@/components/layout/SubNav.jsx'
import GaneshaShrine from '@/components/workspace/GaneshaShrine.jsx'
import IndiaCalendar from '@/components/workspace/IndiaCalendar.jsx'
import IstClock from '@/components/workspace/IstClock.jsx'
import PracticeHeatmap from '@/components/workspace/PracticeHeatmap.jsx'
import SavedLinks from '@/components/workspace/SavedLinks.jsx'
import { APP } from '@/lib/constants.js'
import { formatIndiaDate, istToday } from '@/lib/date.js'
import { useDocumentTitle } from '@/hooks/useDocumentTitle.js'

/** Shared card shell for each workspace tool. */
function Panel({ id, eyebrow, title, description, icon: Icon, children, className }) {
  return (
    <section aria-labelledby={id} className={`surface min-w-0 flex flex-col p-5 sm:p-6 ${className ?? ''}`}>
      <header className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
          <Icon className="h-4 w-4 text-accent-blue" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-slate-500">
            {eyebrow}
          </p>
          <h2 id={id} className="mt-1 text-base font-semibold text-slate-25">
            {title}
          </h2>
          <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-slate-500">{description}</p>
        </div>
      </header>

      <div className="mt-5 flex flex-1 flex-col justify-center">{children}</div>
    </section>
  )
}

/**
 * Workspace — the practice-tracking side of CodeQuest: a 12-hour IST clock
 * sharing a panel with the shrine scene, a link shelf for the sites you
 * practise on, an India calendar for 2023–2040, and a month-by-month practice
 * heatmap running from today to the end of 2028.
 */
export default function Workspace() {
  useDocumentTitle(`Workspace — ${APP.name}`)

  const todayIso = istToday()

  return (
    <>
      <SubNav current="Workspace">
        <span className="font-mono text-[0.6875rem] text-slate-500">
          IST · {formatIndiaDate(todayIso)}
        </span>
      </SubNav>

      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_60%_at_50%_0%,#0c1322_0%,#05070d_70%)]"
        />

        <div className="container-page py-10 lg:py-14">
          {/* -------------------------------------------------- page head */}
          <div className="max-w-2xl">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-slate-500">
              Workspace
            </p>
            <h1 className="mt-3 text-display-sm font-semibold tracking-[-0.02em] text-slate-25">
              Track the habit, not just the answers
            </h1>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-slate-400">
              Keep an eye on India Standard Time, park the sites you practise on,
              plan around the Indian calendar, and mark every day you practise —
              one month at a time, through December 2028.
            </p>
          </div>

          {/* ------------------------------- clock + blessings in one panel */}
          <div className="mt-8">
            <Panel
              id="workspace-clock"
              eyebrow="Local time"
              title="IST clock"
              description="Live India Standard Time on a 12-hour dial, with sweeping hour, minute and second hands."
              icon={Clock}
            >
              <div className="flex min-w-0 flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                <IstClock />

                {/* divider — only once the two sit side by side */}
                <span
                  aria-hidden="true"
                  className="hidden h-[13rem] w-px shrink-0 self-center bg-gradient-to-b from-transparent via-white/[0.09] to-transparent lg:block"
                />

                <div className="flex min-w-0 items-center justify-between gap-5 sm:gap-6 lg:justify-start">
                  <div className="min-w-0">
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-signal-amber/80">
                      Blessings
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-slate-25">Shubh Aarambh</h3>
                    <p className="mt-1.5 max-w-[15rem] text-[0.8125rem] leading-relaxed text-slate-500">
                      An auspicious start to every session — a quiet corner, lit
                      and breathing.
                    </p>
                  </div>

                  <GaneshaShrine className="mx-auto shrink-0 sm:mx-0" />
                </div>
              </div>
            </Panel>
          </div>

          {/* ------------------------------------------------ link shelf */}
          <div className="mt-4">
            <Panel
              id="workspace-links"
              eyebrow="Shortcuts"
              title="Saved links"
              description="Park the sites you practise on — click the + tile, paste a link, then use the arrow to open it."
              icon={Link2}
            >
              <SavedLinks />
            </Panel>
          </div>

          {/* ------------------------------------- calendar beside the heatmap */}
          <div className="mt-4 grid gap-4 lg:grid-cols-12">
            <Panel
              id="workspace-calendar"
              eyebrow="Planning"
              title="India calendar"
              description="Sunday-first weeks across 2023–2040, with national holidays marked."
              icon={CalendarDays}
              className="lg:col-span-5"
            >
              <IndiaCalendar />
            </Panel>

            <Panel
              id="workspace-heatmap"
              eyebrow="Consistency"
              title="Practice heatmap"
              description="One month at a time, from today to 31 Dec 2028. Click a day to mark yourself present — marked days turn green."
              icon={Flame}
              className="lg:col-span-7"
            >
              <PracticeHeatmap />
            </Panel>
          </div>
        </div>
      </section>
    </>
  )
}
