import SubNav from '@/components/layout/SubNav.jsx'
import { cn } from '@/lib/cn.js'

/**
 * Honest "not built yet" shell for routes that exist in the nav but are
 * scheduled for a later stage.
 *
 * Navigation back is handled by the breadcrumb bar under the navbar rather than
 * a button inside the page body, so every subpage carries the same affordance.
 */
export default function PagePlaceholder({ eyebrow, title, description, className }) {
  return (
    <>
      <SubNav current={title} />

      <section className={cn('relative isolate overflow-hidden', className)}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_70%_at_50%_0%,#0c1322_0%,#05070d_70%)]"
        >
          <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_10%,#000,transparent_75%)]">
            <div className="absolute -inset-24 animate-drift bg-grid-faint bg-grid" />
          </div>
        </div>

        <div className="container-page flex min-h-[56vh] flex-col justify-center py-20">
          <div className="max-w-xl">
            <span className="eyebrow animate-fade-rise">{eyebrow}</span>
            <h1
              className="mt-4 animate-fade-rise text-display-sm font-semibold tracking-[-0.02em] text-slate-25"
              style={{ animationDelay: '80ms' }}
            >
              {title}
            </h1>
            <p
              className="mt-4 animate-fade-rise text-[0.9375rem] leading-relaxed text-slate-400"
              style={{ animationDelay: '160ms' }}
            >
              {description}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
