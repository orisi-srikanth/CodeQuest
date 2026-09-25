import { cn } from '@/lib/cn.js'

/**
 * Simplified vector marks for the third-party platforms we link out to.
 *
 * These are hand-built, recognisable-in-context approximations in each brand's
 * colours — not redistributed logo files — so no external assets are fetched
 * and the marks stay crisp at any size. Each is decorative; the platform name
 * is always rendered as text beside it.
 */

function Tile({ className, children, label }) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn(
        'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]',
        className,
      )}
    >
      {children}
    </span>
  )
}

/** LeetCode — the angular bracket monogram in brand orange. */
export function LeetCodeLogo({ className, size = 20 }) {
  return (
    <Tile className={className} label="LeetCode">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M13.6 3.2 6.9 9.9a3.4 3.4 0 0 0 0 4.8l6.5 6.5"
          stroke="#FFA116"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path d="M10.4 12h9.2" stroke="#FFA116" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="18.6" cy="18.2" r="1.9" fill="#FFA116" />
      </svg>
    </Tile>
  )
}

/** GeeksforGeeks — the circular "g" badge in brand green. */
export function GeeksforGeeksLogo({ className, size = 20 }) {
  return (
    <Tile className={className} label="GeeksforGeeks">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9.4" stroke="#2F8D46" strokeWidth="2.2" />
        <path
          d="M16 9.6a4.6 4.6 0 1 0 .5 3.9h-3.4"
          stroke="#43C463"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Tile>
  )
}

/** takeUforward — the TUF wordmark on its orange→magenta brand gradient. */
export function TakeUForwardLogo({ className }) {
  return (
    <Tile className={className} label="takeUforward">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="tuf-grad" x1="3" y1="18" x2="21" y2="6" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F97316" />
            <stop offset="1" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        <rect x="2.5" y="2.5" width="19" height="19" rx="6" fill="url(#tuf-grad)" opacity="0.16" />
        <rect
          x="2.5"
          y="2.5"
          width="19"
          height="19"
          rx="6"
          stroke="url(#tuf-grad)"
          strokeWidth="1.6"
        />
        <path
          d="M7.4 8.6h9.2M12 8.6v7.6"
          stroke="url(#tuf-grad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M16.6 8.6v3.1" stroke="url(#tuf-grad)" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </Tile>
  )
}

export const PLATFORM_LOGOS = {
  leetcode: LeetCodeLogo,
  geeksforgeeks: GeeksforGeeksLogo,
  takeuforward: TakeUForwardLogo,
}

export default PLATFORM_LOGOS
