import { NavLink } from 'react-router-dom'

import SearchBox from '@/components/layout/SearchBox.jsx'
import { cn } from '@/lib/cn.js'
import { NAV_ITEMS } from '@/data/navigation.js'

/**
 * Slide-down mobile navigation panel: search field first, then the full nav
 * list. Kept mounted so open/close animates, hidden from assistive tech while
 * collapsed. Opaque background — a translucent panel over the blurred navbar
 * lets page content bleed through.
 */
export default function MobileNav({ open, onNavigate, id }) {
  return (
    <div
      id={id}
      aria-hidden={!open}
      className={cn(
        'absolute inset-x-0 top-full origin-top border-b border-white/[0.07] bg-ink-950 shadow-[0_28px_60px_-34px_rgba(0,0,0,1)] transition-all duration-300 ease-premium lg:hidden',
        open
          ? 'pointer-events-auto visible translate-y-0 opacity-100'
          : 'pointer-events-none invisible -translate-y-2 opacity-0',
      )}
    >
      <div className="container-page flex flex-col gap-3 py-4">
        <SearchBox id="cq-search-mobile" />

        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item, index) => (
            <li
              key={item.id}
              className={cn(
                'transition-[opacity,transform] duration-500 ease-premium',
                open ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
              )}
              style={{ transitionDelay: open ? `${60 + index * 45}ms` : '0ms' }}
            >
              <NavLink
                to={item.to}
                end={item.end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-colors duration-300',
                    isActive
                      ? 'border-white/[0.1] bg-white/[0.05] text-slate-25'
                      : 'border-transparent text-slate-400 active:bg-white/[0.04]',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="text-[0.9375rem] font-medium">{item.label}</span>
                    <span className="flex items-center gap-3">
                      {item.hint ? (
                        <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-slate-500">
                          {item.hint}
                        </span>
                      ) : null}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'h-1.5 w-1.5 rounded-full bg-gradient-to-br from-signal-cyan to-signal-magenta transition-opacity duration-300',
                          isActive ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
