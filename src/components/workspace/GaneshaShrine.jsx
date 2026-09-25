import { cn } from '@/lib/cn.js'

/**
 * Bal Ganesha shrine — the blessing beside the clock.
 *
 * The photograph is used untouched; every effect is a separate layer around it:
 *
 *   - zoomed framing     a tight crop on the figure, so the artwork fills the
 *                        frame instead of floating in its own empty backdrop
 *   - drifting lamplight two warm radial washes that travel across the scene
 *   - incense smoke      three plumes rising and fading over the figure
 *   - diya flames        two clay lamps at the base, flames flickering
 *
 * All motion is slow and low-contrast, and switches off under
 * `prefers-reduced-motion`.
 */
export default function GaneshaShrine({ className }) {
  return (
    <div className={cn('relative w-[11.75rem] shrink-0', className)}>
      {/* ------------------------------------------------ ambience behind */}
      <div aria-hidden="true" className="pointer-events-none absolute -inset-8 -z-10">
        <span className="absolute left-1/2 top-[56%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-amber/[0.15] blur-3xl animate-halo-breathe motion-reduce:animate-none" />
        <span
          className="absolute left-[42%] top-[76%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fb923c]/[0.16] blur-2xl animate-glow-drift motion-reduce:animate-none"
          style={{ animationDelay: '-6s' }}
        />
      </div>

      {/* ------------------------------------------------ the artwork */}
      <figure className="relative isolate overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-950">
        {/* 4:5 window onto the portrait original — object-position holds the
            figure in frame while the crop drops the empty backdrop. */}
        <img
          src="/media/ganesha.jpg"
          alt="Bal Ganesha seated on a lotus beneath a leaf umbrella in the rain, with butterflies"
          width="720"
          height="1084"
          loading="lazy"
          decoding="async"
          className="block aspect-[4/5] w-full scale-[1.12] select-none object-cover object-[50%_63%]"
        />

        {/* moving lamplight, screened over the image */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 mix-blend-screen animate-glow-drift motion-reduce:animate-none"
          style={{
            background:
              'radial-gradient(50% 34% at 24% 84%, rgba(251,191,36,0.34) 0%, rgba(251,146,60,0.11) 44%, transparent 76%)',
          }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 mix-blend-screen animate-glow-drift motion-reduce:animate-none"
          style={{
            animationDelay: '-8.5s',
            background:
              'radial-gradient(46% 30% at 76% 80%, rgba(249,115,22,0.30) 0%, rgba(251,191,36,0.10) 46%, transparent 78%)',
          }}
        />

        {/* incense smoke rising past the figure */}
        <svg
          aria-hidden="true"
          viewBox="0 0 200 300"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 z-20 h-full w-full"
        >
          <defs>
            <linearGradient id="smoke-fade" x1="0" y1="1" x2="0.3" y2="0">
              <stop offset="0" stopColor="#e2e8f0" stopOpacity="0.5" />
              <stop offset="55%" stopColor="#cbd5e1" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0" />
            </linearGradient>
            <filter id="smoke-blur" x="-40%" y="-20%" width="180%" height="140%">
              <feGaussianBlur stdDeviation="4.5" />
            </filter>
          </defs>

          {[
            { d: 'M44 300 C 26 252, 60 224, 42 178 C 26 138, 54 112, 40 66', delay: '0s', dur: '15s' },
            { d: 'M104 300 C 92 246, 122 216, 104 166 C 90 124, 118 96, 106 44', delay: '-5s', dur: '18s' },
            { d: 'M158 300 C 146 254, 176 228, 158 182 C 144 142, 170 116, 158 74', delay: '-9.5s', dur: '16s' },
          ].map((plume, i) => (
            <g
              key={i}
              className="animate-smoke-rise motion-reduce:animate-none"
              style={{ animationDelay: plume.delay, animationDuration: plume.dur }}
              filter="url(#smoke-blur)"
            >
              <path
                d={plume.d}
                fill="none"
                stroke="url(#smoke-fade)"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </g>
          ))}
        </svg>

        {/* vignette — melts the photo's edges into the panel */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30"
          style={{
            background:
              'radial-gradient(96% 80% at 50% 48%, transparent 52%, rgba(5,7,13,0.32) 82%, rgba(5,7,13,0.76) 100%)',
          }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-16 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent"
        />

        <figcaption className="sr-only">
          Bal Ganesha seated on a lotus beneath a leaf umbrella, lit by lamplight
        </figcaption>
      </figure>

      {/* ------------------------------------------------ diyas at the base */}
      <div aria-hidden="true" className="pointer-events-none relative z-40 -mt-7 flex items-end justify-between px-1.5">
        <Diya delay="0s" />
        <Diya delay="-1.3s" flip />
      </div>
    </div>
  )
}

/** Clay lamp with a flickering flame and a soft halo. */
function Diya({ delay = '0s', flip = false, className }) {
  const key = flip ? 'r' : 'l'
  return (
    <div className={cn('relative w-[58px]', className)}>
      <span className="absolute -inset-3 rounded-full bg-signal-amber/25 blur-lg animate-halo-breathe motion-reduce:animate-none" />

      <svg viewBox="0 0 74 52" className="relative block w-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.7)]">
        <defs>
          <radialGradient id={`diya-glow-${key}`} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#fde68a" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#fbbf24" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`diya-bowl-${key}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8a5a34" />
            <stop offset="55%" stopColor="#5c3a22" />
            <stop offset="100%" stopColor="#2c1b10" />
          </linearGradient>
        </defs>

        <circle cx="37" cy="22" r="20" fill={`url(#diya-glow-${key})`} />

        <g
          className="animate-flame-flicker motion-reduce:animate-none"
          style={{ animationDelay: delay, transformOrigin: '37px 30px' }}
        >
          <path
            d="M37 6 C 42 15, 45.5 20, 37 29 C 28.5 20, 32 15, 37 6 Z"
            fill="#fbbf24"
            opacity="0.9"
          />
          <path d="M37 13 C 40 19, 41.5 22, 37 28 C 32.5 22, 34 19, 37 13 Z" fill="#fef3c7" />
        </g>

        <rect x="35.6" y="26" width="2.8" height="5" rx="1.4" fill="#3f2a18" />
        <path
          d="M8 31 Q37 47 66 31 Q62 40 37 43 Q12 40 8 31 Z"
          fill={`url(#diya-bowl-${key})`}
          stroke="rgba(251,191,36,0.22)"
          strokeWidth="1"
        />
        <path d="M8 31 Q37 40 66 31" fill="none" stroke="rgba(253,230,138,0.35)" strokeWidth="1.4" />
      </svg>
    </div>
  )
}
