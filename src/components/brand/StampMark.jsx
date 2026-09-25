import { useId } from 'react'

import { cn } from '@/lib/cn.js'

/**
 * Circular "verified by Srikanth" stamp — vector, low opacity, gently rotated,
 * so it reads as an impression on the page rather than a badge.
 */
export default function StampMark({ size = 108, className, label = 'SRIKANTH' }) {
  const id = useId().replace(/:/g, '')
  const topPath = `stamp-top-${id}`
  const bottomPath = `stamp-bottom-${id}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      role="img"
      aria-label={`CodeQuest ${label} verified stamp`}
      className={cn('shrink-0', className)}
    >
      <defs>
        {/*
          Both arcs travel left → right so the glyphs sit upright: the top one
          over the rim (sweep 1), the bottom one under it (sweep 0). Reversing
          the bottom arc would render its text upside down.
        */}
        <path id={topPath} d="M 16,60 A 44,44 0 0 1 104,60" />
        <path id={bottomPath} d="M 16,60 A 44,44 0 0 0 104,60" />
      </defs>

      <circle cx="60" cy="60" r="56" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="50" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
      <circle cx="60" cy="60" r="34" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />

      <text className="fill-current font-mono" fontSize="8.75" letterSpacing="1.05">
        <textPath href={`#${topPath}`} startOffset="50%" textAnchor="middle">
          CODEQUEST · DSA
        </textPath>
      </text>
      <text className="fill-current font-mono" fontSize="8.75" letterSpacing="1.05">
        <textPath href={`#${bottomPath}`} startOffset="50%" textAnchor="middle">
          {label} · VERIFIED
        </textPath>
      </text>

      {/* centre check */}
      <path
        d="M50 61.5 57 68l13-15"
        stroke="#34d399"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M38 76h44" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
    </svg>
  )
}
