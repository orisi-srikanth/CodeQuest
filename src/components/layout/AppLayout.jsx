import { Outlet } from 'react-router-dom'

import Footer from '@/components/layout/Footer.jsx'
import Navbar from '@/components/layout/Navbar.jsx'
import ScrollToTop from '@/components/layout/ScrollToTop.jsx'

/**
 * Application shell: fixed navbar, routed page content, footer.
 * Global background wash lives here so every future page inherits it.
 */
export default function AppLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-ink-950">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:border focus:border-white/20 focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:text-slate-100"
      >
        Skip to content
      </a>

      <ScrollToTop />
      <Navbar />

      <main id="main" className="flex-1 pt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
