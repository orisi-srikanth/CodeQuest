import { useEffect, useId, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useLocation } from 'react-router-dom'

import Logo from '@/components/brand/Logo.jsx'
import MobileNav from '@/components/layout/MobileNav.jsx'
import NavItem from '@/components/layout/NavItem.jsx'
import SearchBox from '@/components/layout/SearchBox.jsx'
import { cn } from '@/lib/cn.js'
import { NAV_ITEMS } from '@/data/navigation.js'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll.js'
import { useScrolled } from '@/hooks/useScrolled.js'

/**
 * Fixed application navbar.
 *
 * Layout: logo + version (left), nav pills beside it, search pinned to the
 * right. No account entry point — authentication is out of scope. Below `lg`
 * the pills collapse into the mobile panel (which carries its own search).
 */
export default function Navbar() {
  const scrolled = useScrolled(10)
  const [menuOpen, setMenuOpen] = useState(false)
  const panelId = useId()
  const { pathname } = useLocation()

  // Close the mobile panel on navigation and lock scroll while it's open.
  useEffect(() => setMenuOpen(false), [pathname])
  useLockBodyScroll(menuOpen)

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-16 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-premium',
        scrolled || menuOpen
          ? 'border-white/[0.07] bg-ink-950/90 shadow-[0_18px_40px_-30px_rgba(0,0,0,1)] backdrop-blur-xl'
          : 'border-transparent bg-ink-950/50 backdrop-blur-sm',
      )}
    >
      <nav
        aria-label="Primary"
        className="container-page flex h-16 items-center gap-3"
      >
        <Logo size={30} />

        {/* primary links — left cluster, next to the brand */}
        <ul className="ml-4 hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <NavItem item={item} />
            </li>
          ))}
        </ul>

        {/* search — pinned right */}
        <SearchBox className="ml-auto hidden w-56 lg:block xl:w-64" />

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls={panelId}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-300 transition-colors duration-300 hover:border-white/20 hover:text-slate-25 lg:hidden"
        >
          <span className="relative block h-4 w-4">
            <Menu
              className={cn(
                'absolute inset-0 h-4 w-4 transition-all duration-300 ease-premium',
                menuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100',
              )}
              aria-hidden="true"
            />
            <X
              className={cn(
                'absolute inset-0 h-4 w-4 transition-all duration-300 ease-premium',
                menuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0',
              )}
              aria-hidden="true"
            />
          </span>
        </button>
      </nav>

      <MobileNav id={panelId} open={menuOpen} onNavigate={() => setMenuOpen(false)} />
    </header>
  )
}
