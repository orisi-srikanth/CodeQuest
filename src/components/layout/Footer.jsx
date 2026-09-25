import { Link } from 'react-router-dom'

import Logo from '@/components/brand/Logo.jsx'
import StampMark from '@/components/brand/StampMark.jsx'
import Signature from '@/components/layout/Signature.jsx'
import { APP } from '@/lib/constants.js'
import { FOOTER } from '@/data/footer.js'
import { NAV_ITEMS } from '@/data/navigation.js'

/**
 * Site footer: a motivational block, the authorship mark (signature + stamp),
 * then navigation and the colophon.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-950">
      <div className="container-page">
        {/* ------------------------------------------------ motivation */}
        <div className="grid gap-10 border-b border-white/[0.06] py-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-slate-500">
              <span className="text-slate-600">▸ </span>
              {FOOTER.motivation.eyebrow}
            </p>
            <p className="mt-4 max-w-2xl text-xl font-medium leading-snug tracking-[-0.015em] text-slate-100 sm:text-2xl">
              {FOOTER.motivation.headline}
            </p>
            <ul className="mt-5 space-y-2">
              {FOOTER.motivation.lines.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-[0.875rem] text-slate-400">
                  <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent-blue/70" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {/* ------------------------------------- signature + stamp */}
          <div className="relative flex min-w-0 flex-wrap items-center justify-between gap-4 lg:justify-end lg:gap-6">
            <Signature className="text-slate-300" />

            <StampMark
              size={104}
              label="SRIKANTH"
              className="-rotate-[9deg] text-slate-400 opacity-80"
            />
          </div>
        </div>

        {/* --------------------------------------------------- links */}
        <div className="flex flex-col items-start gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Logo size={28} />
            <span className="hidden h-5 w-px bg-white/10 sm:block" aria-hidden="true" />
            <p className="text-[0.8125rem] text-slate-500">
              <span className="text-slate-400">{APP.tagline}</span>
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                className="rounded-lg px-3 py-2 text-[0.8125rem] text-slate-500 transition-colors duration-300 hover:text-slate-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="pb-8">
          <div className="hairline" />
          <div className="flex flex-col gap-2 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-slate-600">
              © {year} {APP.name} — Stage 1 preview
            </p>
            <p className="font-mono text-[0.6875rem] text-slate-600">
              {FOOTER.signature.note}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
