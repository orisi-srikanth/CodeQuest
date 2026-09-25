import { cn } from '@/lib/cn.js'

/**
 * Flourish stroke that sits under the signature — a single sweeping line with
 * a small return curl, the way a physical signature trails off.
 */
export default function SignatureFlourish({ className, width = 190 }) {
  return (
    <svg
      viewBox="0 0 200 24"
      width={width}
      height={Math.round((width / 200) * 24)}
      fill="none"
      aria-hidden="true"
      className={cn('w-auto', className)}
    >
      <path
        d="M4 15c14 6 36 8 60 6 26-2 48-8 70-13 12-3 22-4 30-2 6 1 8 5 5 8-2 2-6 3-9 1-3-3-1-7 4-9 9-3 20-2 32 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  )
}
