import { Link } from 'react-router-dom'

import LogoMark from '@/components/brand/LogoMark.jsx'
import { cn } from '@/lib/cn.js'
import { APP, ROUTES } from '@/lib/constants.js'

/**
 * Full CodeQuest lockup: mark + wordmark + version chip.
 * The wordmark is rendered as text (not an image) so it stays crisp at every
 * size and always matches the app typography.
 */
export default function Logo({
  to = ROUTES.home,
  size = 30,
  variant = 'badge',
  showText = true,
  showVersion = true,
  className,
  textClassName,
  onClick,
}) {
  const content = (
    <>
      <LogoMark
        size={size}
        variant={variant}
        className="transition-transform duration-500 ease-premium group-hover:scale-[1.06]"
      />
      {showText && (
        <span className="flex items-center gap-2">
          <span
            className={cn(
              'text-[1.0625rem] font-semibold leading-none tracking-[-0.01em] text-slate-25',
              textClassName,
            )}
          >
            CodeQuest
          </span>
          {showVersion && (
            <span className="rounded border border-white/[0.09] bg-white/[0.04] px-1.5 py-[3px] font-mono text-[0.625rem] leading-none text-slate-500">
              {APP.version}
            </span>
          )}
        </span>
      )}
    </>
  )

  const classes = cn(
    'group inline-flex items-center gap-2.5 rounded-xl outline-offset-4',
    className,
  )

  if (!to) {
    return (
      <span className={classes} aria-label={APP.name}>
        {content}
      </span>
    )
  }

  return (
    <Link to={to} onClick={onClick} aria-label={`${APP.name} — home`} className={classes}>
      {content}
    </Link>
  )
}
