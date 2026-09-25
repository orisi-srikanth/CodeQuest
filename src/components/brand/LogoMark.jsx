import { useId } from 'react'

import { cn } from '@/lib/cn.js'

/**
 * CodeQuest mark — vector U/UI element (not a bitmap hero image).
 *
 * A paired `< >` bracket set in the brand's cyan → magenta gradient with a
 * small ascending chevron at its centre (the "quest" — progress over time).
 *
 * `variant="badge"` renders the rounded tile used in the navbar / favicon.
 * `variant="bare"` renders only the glyph for decorative placements.
 */
export default function LogoMark({
  size = 34,
  variant = 'badge',
  className,
  title,
  ...rest
}) {
  const gradientId = useId().replace(/:/g, '')
  const cyanId = `cq-cyan-${gradientId}`
  const magentaId = `cq-magenta-${gradientId}`
  const tileId = `cq-tile-${gradientId}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn('shrink-0', className)}
      {...rest}
    >
      <defs>
        <linearGradient id={cyanId} x1="14" y1="46" x2="30" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0891b2" />
          <stop offset="0.55" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#67e8f9" />
        </linearGradient>
        <linearGradient id={magentaId} x1="34" y1="46" x2="50" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#be185d" />
          <stop offset="0.5" stopColor="#ec4899" />
          <stop offset="1" stopColor="#f472b6" />
        </linearGradient>
        <linearGradient id={tileId} x1="4" y1="2" x2="60" y2="62" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0c1220" />
          <stop offset="1" stopColor="#05070d" />
        </linearGradient>
      </defs>

      {variant === 'badge' && (
        <>
          <rect
            x="1.25"
            y="1.25"
            width="61.5"
            height="61.5"
            rx="15"
            fill={`url(#${tileId})`}
          />
          <rect
            x="1.25"
            y="1.25"
            width="61.5"
            height="61.5"
            rx="15"
            stroke="rgba(148,163,184,0.16)"
            strokeWidth="1.5"
          />
        </>
      )}

      {/* opening bracket */}
      <path
        d="M25.5 19.5 13 32l12.5 12.5"
        stroke={`url(#${cyanId})`}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* closing bracket */}
      <path
        d="M38.5 19.5 51 32 38.5 44.5"
        stroke={`url(#${magentaId})`}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* ascending chevron */}
      <path
        d="M26.5 34.5 32 28.5l5.5 6"
        stroke="#22d3ee"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
  )
}
