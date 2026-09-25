import { Link } from 'react-router-dom'

import { cn } from '@/lib/cn.js'

const BASE =
  'group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-xl font-medium ' +
  'transition-[transform,background-color,border-color,box-shadow,color] duration-300 ease-premium ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-cyan/70 ' +
  'disabled:pointer-events-none disabled:opacity-50'

const VARIANTS = {
  // Accent action — restrained cyan, matching the brand mark.
  primary:
    'bg-gradient-to-b from-signal-cyan to-signal-cyan-deep text-ink-950 shadow-[0_10px_30px_-12px_rgba(34,211,238,0.55)] ' +
    'hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-14px_rgba(34,211,238,0.6)] active:translate-y-0',
  // Light filled action — the hero's primary call to action.
  pale:
    'bg-accent-pale text-ink-950 hover:-translate-y-0.5 hover:bg-accent-pale-hover ' +
    'shadow-[0_10px_30px_-16px_rgba(219,227,247,0.5)]',
  // Neutral surface action.
  secondary:
    'border border-white/[0.09] bg-white/[0.035] text-slate-25 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]',
  ghost: 'text-slate-300 hover:bg-white/[0.05] hover:text-slate-25',
}

const SIZES = {
  sm: 'h-9 px-3.5 text-[0.8125rem]',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[0.9375rem]',
}

/**
 * Polymorphic button: renders a router <Link> when `to` is given,
 * an <a> when `href` is given, otherwise a <button>.
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  className,
  children,
  ...rest
}) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className)

  const inner = (
    <>
      {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
      {IconRight && (
        <IconRight
          className="h-4 w-4 shrink-0 transition-transform duration-300 ease-premium group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
      {/* Sheen on hover — subtle, motion-safe. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-premium group-hover:translate-x-full motion-reduce:hidden"
      />
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {inner}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {inner}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {inner}
    </button>
  )
}
