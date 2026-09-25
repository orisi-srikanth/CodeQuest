import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { PREVIEWS } from '@/components/sections/SectionPreviews.jsx'
import { cn } from '@/lib/cn.js'
import { useReveal } from '@/hooks/useReveal.js'

/**
 * A compact "reference" block for one nav destination:
 * eyebrow, one-line summary, mono details, a small preview and a round arrow
 * that opens the full page. Blocks alternate which side the preview sits on.
 */
export default function ReferenceSection({ section, reverse = false }) {
  const ref = useReveal({ threshold: 0.15 })
  const Preview = PREVIEWS[section.preview]

  return (
    <section
      ref={ref}
      className="reveal border-t border-white/[0.06] py-10 lg:py-12"
      aria-labelledby={`section-${section.id}`}
    >
      <div
        className={cn(
          'grid items-center gap-8 lg:grid-cols-2 lg:gap-14',
          reverse && 'lg:[&>*:first-child]:order-2',
        )}
      >
        {/* ------------------------------------------------------ summary */}
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-slate-500">
              <span className="text-slate-600">▸ </span>
              {section.eyebrow}
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-white/[0.07]" />

            {/* small arrow → opens the full page */}
            <Link
              to={section.to}
              aria-label={`${section.cta} — opens the full page`}
              className="group/arrow inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.03] text-slate-400 transition-colors duration-300 hover:border-accent-blue/40 hover:bg-accent-blue/10 hover:text-accent-blue"
            >
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover/arrow:translate-x-[1px] group-hover/arrow:-translate-y-[1px]"
                aria-hidden="true"
              />
            </Link>
          </div>

          <h2
            id={`section-${section.id}`}
            className="mt-4 text-xl font-semibold tracking-[-0.015em] text-slate-25 sm:text-2xl"
          >
            {section.title}
          </h2>
          <p className="mt-2.5 max-w-lg text-[0.875rem] leading-relaxed text-slate-400">
            {section.description}
          </p>

          <ul className="mt-4 space-y-1.5">
            {section.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2 font-mono text-[0.6875rem] text-slate-500"
              >
                <span aria-hidden="true" className="text-slate-600">
                  ▸
                </span>
                {bullet}
              </li>
            ))}
          </ul>

          <Link
            to={section.to}
            className="group/link mt-5 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slate-400 transition-colors duration-300 hover:text-accent-blue"
          >
            {section.cta}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-premium group-hover/link:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        {/* ------------------------------------------------------ preview */}
        <div className="min-w-0">{Preview ? <Preview /> : null}</div>
      </div>
    </section>
  )
}
