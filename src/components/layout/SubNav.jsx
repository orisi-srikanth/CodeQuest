import { ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/cn.js'
import { ROUTES } from '@/lib/constants.js'

/**
 * Breadcrumb bar that sits directly beneath the fixed navbar on every subpage.
 *
 * It carries the "back to home" affordance the landing page used to bolt onto
 * page content, plus the right-hand summary slot each page fills with its own
 * status text (e.g. how many of today's sources are live).
 */
export default function SubNav({ current, summary, children, className }) {
  return (
    <div
      className={cn(
        'border-b border-white/[0.06] bg-ink-950/60 backdrop-blur-sm',
        className,
      )}
    >
      <div className="container-page flex min-h-12 flex-wrap items-center gap-x-3 gap-y-1 py-2">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
          <Link
            to={ROUTES.home}
            className="group inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[0.8125rem] text-slate-400 transition-colors duration-300 hover:bg-white/[0.05] hover:text-slate-100"
          >
            <Home className="h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover:-translate-x-[1px]" aria-hidden="true" />
            Home
          </Link>

          <ChevronRight className="h-3.5 w-3.5 text-slate-700" aria-hidden="true" />

          <span aria-current="page" className="px-1 text-[0.8125rem] font-medium text-slate-200">
            {current}
          </span>
        </nav>

        {children ? (
          <div className="ml-auto flex max-w-full flex-wrap items-center justify-end gap-3">{children}</div>
        ) : summary ? (
          <p className="ml-auto font-mono text-[0.6875rem] text-slate-500">{summary}</p>
        ) : null}
      </div>
    </div>
  )
}
