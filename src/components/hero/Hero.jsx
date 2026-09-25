import { ArrowRight, CalendarDays } from 'lucide-react'

import BinarySearchPanel from '@/components/hero/BinarySearchPanel.jsx'
import HeroBackdrop from '@/components/hero/HeroBackdrop.jsx'
import Button from '@/components/ui/Button.jsx'
import { HERO } from '@/data/hero.js'
import { ROUTES } from '@/lib/constants.js'

/**
 * Landing hero — "Learn. Solve. Improve."
 *
 * Vertical composition: system line → headline → copy → actions → stat strip →
 * target line → the live algorithm console. Layout and tone follow the CodeQuest
 * console design: quiet surfaces, mono metadata, one accent colour.
 */
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-heading">
      <HeroBackdrop />

      <div className="container-page relative pb-16 pt-10 sm:pt-12 lg:pb-24">
        {/* ------------------------------------------------- system status */}
        <p className="flex animate-fade-rise flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em]">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inset-0 animate-ping-soft rounded-full bg-accent-mint motion-reduce:hidden" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-accent-mint" />
          </span>
          <span className="text-accent-mint">▸ {HERO.systemLine}</span>
          {HERO.systemTrail.map((trail) => (
            <span key={trail} className="text-slate-600">
              {trail}
            </span>
          ))}
        </p>

        {/* ------------------------------------------------------ headline */}
        <p
          className="mt-7 flex animate-fade-rise items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-slate-500"
          style={{ animationDelay: '80ms' }}
        >
          {HERO.cycleLabel}
          <span
            aria-hidden="true"
            className="h-px w-16 origin-left animate-dash-draw bg-white/15 sm:w-28"
          />
        </p>

        <h1
          id="hero-heading"
          className="mt-3 max-w-4xl text-display-lg font-semibold tracking-[-0.035em]"
        >
          {HERO.headline.map((line, index) => (
            <span key={line.id} className="reveal-line">
              <span
                className={line.accent ? 'relative inline-block' : undefined}
                style={{ animationDelay: `${160 + index * 120}ms` }}
              >
                <span className={line.accent ? 'relative z-10 text-accent-blue' : 'text-slate-25'}>
                  {line.text}
                </span>
                {line.accent && (
                  <span
                    aria-hidden="true"
                    className="absolute -inset-x-8 -inset-y-4 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(56,132,255,0.22),transparent_75%)] blur-2xl"
                  />
                )}
              </span>
            </span>
          ))}
        </h1>

        {/* ---------------------------------------------------------- copy */}
        <p
          className="mt-6 max-w-2xl animate-fade-rise text-[0.9375rem] leading-relaxed text-slate-400 sm:text-base"
          style={{ animationDelay: '520ms' }}
        >
          {HERO.subhead}
        </p>

        <div
          className="mt-8 flex animate-fade-rise flex-col gap-3 sm:flex-row sm:items-center"
          style={{ animationDelay: '620ms' }}
        >
          <Button to={ROUTES.tasks} variant="pale" size="lg" iconRight={ArrowRight}>
            {HERO.primaryCta.label}
          </Button>
          <Button to={ROUTES.potd} size="lg" variant="secondary" icon={CalendarDays}>
            {HERO.secondaryCta.label}
          </Button>
        </div>

        {/* --------------------------------------------------------- stats */}
        <dl
          className="mt-10 grid animate-fade-rise grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.05] sm:grid-cols-3"
          style={{ animationDelay: '700ms' }}
        >
          {HERO.stats.map((stat) => (
            <div key={stat.id} className="bg-ink-900/80 px-5 py-4">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-mono text-lg text-slate-100 sm:text-xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-[0.75rem] text-slate-500">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        {/* -------------------------------------------------------- target */}
        <p
          className="mt-4 animate-fade-rise font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slate-500"
          style={{ animationDelay: '760ms' }}
        >
          <span className="text-slate-600">▸ </span>
          {HERO.target}
        </p>

        {/* --------------------------------------------------- live console */}
        <div className="mt-8 animate-fade-rise" style={{ animationDelay: '820ms' }}>
          <BinarySearchPanel />
        </div>
      </div>
    </section>
  )
}
