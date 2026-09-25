import { Search } from 'lucide-react'

import { cn } from '@/lib/cn.js'

/**
 * Navbar search field.
 *
 * Presentation only in this stage — the input is `readOnly`, so it takes
 * focus, communicates the shortcut, and does nothing surprising. Wiring it to
 * a real index is part of the search feature (a later stage).
 */
export default function SearchBox({ className, id = 'cq-search' }) {
  return (
    <div className={cn('group relative', className)}>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-slate-500 transition-colors duration-300 group-focus-within:text-slate-300"
        aria-hidden="true"
      />
      <input
        id={id}
        type="search"
        readOnly
        placeholder="Search algorithms..."
        aria-label="Search algorithms (not available yet)"
        title="Search arrives in a later stage"
        className="h-9 w-full cursor-text rounded-lg border border-white/[0.09] bg-white/[0.03] pl-9 pr-14 text-[0.8125rem] text-slate-200 outline-none transition-colors duration-300 placeholder:text-slate-500 hover:border-white/[0.16] focus:border-signal-cyan/40 focus:bg-white/[0.05]"
      />
      <kbd
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-white/[0.09] bg-white/[0.04] px-1.5 py-[2px] font-mono text-[0.625rem] text-slate-500"
      >
        ⌘K
      </kbd>
    </div>
  )
}
