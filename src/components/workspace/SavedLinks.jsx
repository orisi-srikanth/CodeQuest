import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Link2, Plus, X } from 'lucide-react'

import { cn } from '@/lib/cn.js'
import { useSavedLinks } from '@/hooks/useSavedLinks.js'

/** Two-letter monogram for a site, so each card is identifiable at a glance. */
function monogram(host = '') {
  const core = host.split('.').slice(-2, -1)[0] || host.split('.')[0] || '?'
  return core.slice(0, 2).toUpperCase()
}

/**
 * The workspace link shelf.
 *
 * Click **+** to open an input, paste a URL, then **Add** (or press Enter). The
 * link lands as a card with an arrow button that opens it. The **+** tile stays
 * at the end of the grid so adding another is always one click away.
 *
 * Links open in a new tab so the workspace — and whatever you were mid-way
 * through — stays exactly where it was.
 */
export default function SavedLinks({ className }) {
  const { links, add, remove, clearAll } = useSavedLinks()
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  // The input only exists while adding — focus it the moment it appears.
  useEffect(() => {
    if (adding) inputRef.current?.focus()
  }, [adding])

  const closeInput = () => {
    setAdding(false)
    setDraft('')
    setError('')
  }

  const submit = (event) => {
    event.preventDefault()
    const result = add(draft)
    if (result.error) {
      setError(result.error)
      return
    }
    // Stay open so several links can be added in a row; "+" or Escape closes.
    setDraft('')
    setError('')
    inputRef.current?.focus()
  }

  const onKeyDown = (event) => {
    if (event.key === 'Escape') closeInput()
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <div
            key={link.id}
            className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.022] py-2.5 pl-3 pr-2 transition-colors duration-300 hover:border-white/[0.16] hover:bg-white/[0.045]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent-blue/25 bg-accent-blue/[0.08] font-mono text-[0.625rem] font-medium tracking-wide text-accent-blue">
              {monogram(link.host)}
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate font-mono text-[0.75rem] text-slate-200">
                {link.host}
              </span>
              <span className="block truncate font-mono text-[0.625rem] text-slate-600">
                {link.url.replace(/^https?:\/\//, '')}
              </span>
            </span>

            {/* arrow — opens the saved page */}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${link.host} in a new tab`}
              title={`Open ${link.url}`}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent-mint/35 bg-accent-mint/10 text-accent-mint transition-all duration-300 ease-premium hover:scale-105 hover:bg-accent-mint/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-cyan/70"
            >
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => remove(link.id)}
              aria-label={`Remove ${link.host}`}
              title="Remove"
              className="flex h-8 w-7 shrink-0 items-center justify-center rounded-lg text-slate-600 opacity-0 transition-all duration-300 hover:bg-white/[0.06] hover:text-slate-300 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-cyan/70 group-hover:opacity-100"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        ))}

        {/* ------------------------------------------------ add tile / input */}
        {adding ? (
          <form
            onSubmit={submit}
            className="flex flex-col gap-2 rounded-xl border border-accent-blue/30 bg-accent-blue/[0.05] p-2.5 sm:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.09] bg-white/[0.04]">
                <Link2 className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" />
              </span>
              <input
                ref={inputRef}
                type="text"
                value={draft}
                onChange={(e) => {
                  setDraft(e.target.value)
                  if (error) setError('')
                }}
                onKeyDown={onKeyDown}
                placeholder="leetcode.com/problemset"
                aria-label="Link to save"
                aria-invalid={Boolean(error)}
                autoComplete="off"
                spellCheck="false"
                className="min-w-0 flex-1 rounded-lg border border-white/[0.09] bg-ink-950/60 px-2.5 py-1.5 font-mono text-[0.75rem] text-slate-100 placeholder:text-slate-600 focus:border-accent-blue/50 focus:outline-none focus:ring-1 focus:ring-accent-blue/30"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="submit"
                className="h-7 rounded-lg border border-accent-mint/40 bg-accent-mint/12 px-2.5 font-mono text-[0.6875rem] text-accent-mint transition-colors duration-300 hover:bg-accent-mint/22"
              >
                Add
              </button>
              <button
                type="button"
                onClick={closeInput}
                className="h-7 rounded-lg border border-white/[0.09] bg-white/[0.03] px-2.5 font-mono text-[0.6875rem] text-slate-400 transition-colors duration-300 hover:border-white/20 hover:text-slate-100"
              >
                Cancel
              </button>
              <span className="ml-auto font-mono text-[0.5625rem] text-slate-600">Enter to add</span>
            </div>

            {error && (
              <p role="alert" className="font-mono text-[0.625rem] text-signal-magenta-soft">
                {error}
              </p>
            )}
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="flex min-h-[3.75rem] items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.14] bg-white/[0.012] px-3 py-2.5 font-mono text-[0.6875rem] text-slate-500 transition-colors duration-300 hover:border-accent-mint/45 hover:bg-accent-mint/[0.05] hover:text-accent-mint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-cyan/70"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            {links.length === 0 ? 'Add your first link' : 'Add another'}
          </button>
        )}
      </div>

      {links.length > 0 && (
        <div className="mt-3 flex items-center gap-3 border-t border-white/[0.06] pt-3">
          <span className="font-mono text-[0.625rem] text-slate-500">
            {links.length} {links.length === 1 ? 'link' : 'links'} saved in this browser
          </span>
          <button
            type="button"
            onClick={clearAll}
            className="font-mono text-[0.625rem] text-slate-600 underline decoration-dotted underline-offset-4 transition-colors duration-300 hover:text-slate-300"
          >
            clear all
          </button>
        </div>
      )}
    </div>
  )
}
