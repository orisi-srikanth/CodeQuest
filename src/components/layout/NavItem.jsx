import { NavLink } from 'react-router-dom'

import { cn } from '@/lib/cn.js'

/**
 * Desktop nav pill. The active page gets a filled pill; everything else is
 * plain text that lifts on hover. Deliberately quiet — the pill is the only
 * active indicator.
 */
export default function NavItem({ item, className, onNavigate }) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      title={item.hint || item.label}
      className={({ isActive }) =>
        cn(
          'inline-flex items-center rounded-lg border px-3 py-1.5 text-[0.8125rem] font-medium transition-colors duration-300',
          isActive
            ? 'border-white/[0.1] bg-white/[0.07] text-slate-25'
            : 'border-transparent text-slate-400 hover:bg-white/[0.04] hover:text-slate-100',
          className,
        )
      }
    >
      {item.label}
    </NavLink>
  )
}
