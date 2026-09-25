import { cn } from '@/lib/cn.js'
import { formatIndiaDate, to12Hour } from '@/lib/date.js'
import { useIndiaClock } from '@/hooks/useIndiaClock.js'

const pad2 = (n) => String(n).padStart(2, '0')

const SIZE = 190
const CENTER = SIZE / 2
const RADIUS = 79

/** Point on the dial for a given angle, measured clockwise from 12 o'clock. */
function point(angleDeg, distance, origin = CENTER) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: origin + Math.cos(rad) * distance,
    y: origin + Math.sin(rad) * distance,
  }
}

/**
 * Analog clock locked to India Standard Time, on a 12-hour face.
 *
 * Hand angles follow the real clock rules:
 *   hour   = (h % 12) * 30 + m * 0.5   (creeps between hours)
 *   minute = m * 6 + s * 0.1           (creeps between minutes)
 *   second = s * 6
 * The second hand steps once per tick; hour and minute sweep continuously.
 */
export default function IstClock({ className }) {
  const time = useIndiaClock()
  const { hours, minutes, seconds, isoDate } = time

  // 12-hour read-out — the dial is the same either way, only the label changes.
  const { hour12, suffix } = to12Hour(hours)
  const digital = `${pad2(hour12)}:${pad2(minutes)}:${pad2(seconds)}`
  const digitalLabel = `${digital} ${suffix}`

  const hourAngle = (hours % 12) * 30 + minutes * 0.5
  const minuteAngle = minutes * 6 + seconds * 0.1
  const secondAngle = seconds * 6

  const hand = (angle, length, width, color, opacity = 1) => {
    const tip = point(angle, length)
    const tail = point(angle + 180, length * 0.16)
    return (
      <line
        x1={tail.x}
        y1={tail.y}
        x2={tip.x}
        y2={tip.y}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        opacity={opacity}
      />
    )
  }

  return (
    <div className={cn('flex items-center gap-4 sm:gap-5', className)}>
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={`India Standard Time: ${digitalLabel}, ${formatIndiaDate(isoDate, { withWeekday: true })}`}
        className="shrink-0"
      >
        <defs>
          <radialGradient id="ist-face" cx="50%" cy="35%" r="75%">
            <stop offset="0" stopColor="#111827" />
            <stop offset="1" stopColor="#080b14" />
          </radialGradient>
        </defs>

        {/* dial */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS + 10} fill="url(#ist-face)" />
        <circle cx={CENTER} cy={CENTER} r={RADIUS + 10} stroke="rgba(255,255,255,0.09)" strokeWidth="1" fill="none" />
        <circle cx={CENTER} cy={CENTER} r={RADIUS - 5} stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />

        {/* minute ticks */}
        {Array.from({ length: 60 }, (_, i) => {
          const isHour = i % 5 === 0
          const outer = point(i * 6, RADIUS)
          const inner = point(i * 6, RADIUS - (isHour ? 7 : 3.5))
          return (
            <line
              key={i}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke={isHour ? 'rgba(148,163,184,0.55)' : 'rgba(148,163,184,0.18)'}
              strokeWidth={isHour ? 1.6 : 0.9}
              strokeLinecap="round"
            />
          )
        })}

        {/* hour numerals */}
        {Array.from({ length: 12 }, (_, i) => {
          const { x, y } = point(i * 30, RADIUS - 21)
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-slate-400 font-mono"
              fontSize="11"
            >
              {i === 0 ? 12 : i}
            </text>
          )
        })}

        {/* hands */}
        <g>
          <g
            style={{
              transform: `rotate(${hourAngle}deg)`,
              transformOrigin: `${CENTER}px ${CENTER}px`,
              transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {hand(0, RADIUS * 0.52, 4.6, '#e2e8f0')}
          </g>
          <g
            style={{
              transform: `rotate(${minuteAngle}deg)`,
              transformOrigin: `${CENTER}px ${CENTER}px`,
              transition: 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {hand(0, RADIUS * 0.74, 2.8, '#cbd5e1')}
          </g>
          <g
            style={{
              transform: `rotate(${secondAngle}deg)`,
              transformOrigin: `${CENTER}px ${CENTER}px`,
              transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {hand(0, RADIUS * 0.82, 1.3, '#34d399')}
          </g>
          <circle cx={CENTER} cy={CENTER} r="3.6" fill="#34d399" />
          <circle cx={CENTER} cy={CENTER} r="6.8" fill="none" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
        </g>
      </svg>

      {/* digital read-out */}
      <div className="min-w-0">
        <p className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-slate-500">
          India Standard Time
        </p>
        <p className="mt-1.5 flex items-baseline gap-1.5">
          <span className="font-mono text-[1.375rem] tabular-nums text-slate-100 sm:text-[1.625rem]">
            {digital}
          </span>
          <span className="font-mono text-[0.6875rem] font-medium tracking-[0.1em] text-accent-mint">
            {suffix}
          </span>
        </p>
        <p className="mt-1.5 text-[0.8125rem] text-slate-400">
          {formatIndiaDate(isoDate, { withWeekday: true })}
        </p>
        <p className="mt-0.5 font-mono text-[0.625rem] text-slate-600">
          UTC +05:30 · Asia/Kolkata
        </p>
      </div>
    </div>
  )
}
