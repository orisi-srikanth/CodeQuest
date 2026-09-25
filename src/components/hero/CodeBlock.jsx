import { cn } from '@/lib/cn.js'

/** Token types → editor theme. Cyan/magenta come from the brand mark. */
const TOKEN_CLASS = {
  comment: 'text-slate-500 italic',
  kw: 'text-signal-magenta-soft',
  fn: 'text-accent-blue',
  var: 'text-slate-200',
  num: 'text-signal-amber',
  str: 'text-signal-amber',
  punc: 'text-slate-400',
}

/**
 * Code listing with a *moving* execution highlight.
 *
 * `focusKey` names the line that is currently executing — the highlight block
 * fades out and back in on the new line each step, so the trace reads like a
 * debugger stepping through the program.
 */
export default function CodeBlock({ lines, focusKey }) {
  const focusIndex = lines.findIndex((line) => line.key === focusKey)

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/[0.06] bg-ink-950/70">
      <div className="overflow-x-auto px-3 py-3 sm:px-4">
        <pre className="font-mono text-[0.6875rem] leading-[1.85] sm:text-xs">
          <code>
            {lines.map((line, index) => {
              const isFocus = index === focusIndex

              return (
                <span
                  key={line.key}
                  className={cn(
                    'flex rounded-sm transition-colors duration-500',
                    isFocus ? 'bg-accent-mint/[0.12]' : 'bg-transparent',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'w-[2px] shrink-0 rounded-full transition-colors duration-500',
                      isFocus ? 'bg-accent-mint' : 'bg-transparent',
                    )}
                  />
                  <span className="w-7 shrink-0 select-none pl-2 pr-2 text-right text-slate-600">
                    {index + 1}
                  </span>
                  {/* soft-wraps on phones, preserves alignment from sm up */}
                  <span
                    className="whitespace-pre-wrap break-words pr-2 sm:whitespace-pre sm:pr-4"
                    style={{ paddingLeft: `${line.indent * 1.1}rem` }}
                  >
                    {line.tokens.map((token, tokenIndex) => (
                      <span
                        key={tokenIndex}
                        className={cn(
                          TOKEN_CLASS[token.t] ?? 'text-slate-200',
                          isFocus && token.t !== 'comment' && 'brightness-125',
                        )}
                      >
                        {token.v}
                      </span>
                    ))}
                  </span>
                </span>
              )
            })}
          </code>
        </pre>
      </div>

      {/* right-edge fade for narrow screens */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-ink-950/90 to-transparent"
      />
    </div>
  )
}
