/**
 * Ambient hero background: a soft blue wash behind the headline, a very faint
 * engineering grid and a vignette. No bright glows, no floating objects — the
 * interface itself carries the visual interest.
 */
export default function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#0c111c_0%,#080b12_45%,#06080e_100%)]" />

      {/* soft blue bloom behind the headline block */}
      <div className="absolute -left-24 top-16 h-[34rem] w-[46rem] max-w-[85vw] animate-pulse-soft rounded-full bg-[radial-gradient(closest-side,rgba(56,132,255,0.16),transparent_72%)] blur-[60px]" />

      {/* faint grid, masked to the centre so edges stay clean */}
      <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_55%_at_50%_30%,#000_5%,transparent_75%)]">
        <div className="absolute -inset-24 animate-drift bg-grid-faint bg-grid" />
      </div>

      {/* section fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink-950" />
    </div>
  )
}
