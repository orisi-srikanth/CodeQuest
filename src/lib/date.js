/**
 * Date helpers anchored to India Standard Time (Asia/Kolkata, UTC+5:30).
 *
 * IST has no DST, so all arithmetic here works on plain `YYYY-MM-DD` strings
 * via UTC midnight — no timezone drift, no dependency on the visitor's own
 * clock or locale.
 */

export const IST_TIMEZONE = 'Asia/Kolkata'

export const WEEKDAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const istFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: IST_TIMEZONE,
  hourCycle: 'h23',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  weekday: 'short',
})

/**
 * The current wall-clock time **in India**, regardless of where the visitor is.
 * Returns numeric parts plus a preformatted digital string.
 */
export function istNow(date = new Date()) {
  const parts = Object.fromEntries(
    istFormatter.formatToParts(date).map((part) => [part.type, part.value]),
  )

  const hours = Number(parts.hour)
  const minutes = Number(parts.minute)
  const seconds = Number(parts.second)

  return {
    year: Number(parts.year),
    month: Number(parts.month), // 1-12
    day: Number(parts.day),
    hours,
    minutes,
    seconds,
    weekdayShort: parts.weekday,
    isoDate: `${parts.year}-${parts.month}-${parts.day}`,
    digital: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
  }
}

/** Today's date in India as `YYYY-MM-DD`. */
export function istToday(date = new Date()) {
  return istNow(date).isoDate
}

const pad = (value) => String(value).padStart(2, '0')

/** `{ year, month (1-12), day }` → `YYYY-MM-DD`. */
export function toIso({ year, month, day }) {
  return `${year}-${pad(month)}-${pad(day)}`
}

/** `YYYY-MM-DD` → `{ year, month, day }`. */
export function fromIso(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  return { year, month, day }
}

/** ISO string → UTC-midnight epoch ms (safe for day arithmetic). */
function toUtcMs(iso) {
  const { year, month, day } = fromIso(iso)
  return Date.UTC(year, month - 1, day)
}

/** Epoch ms → ISO date string. */
function fromUtcMs(ms) {
  const d = new Date(ms)
  return toIso({ year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() })
}

export function addDays(iso, days) {
  return fromUtcMs(toUtcMs(iso) + days * 86_400_000)
}

/** Whole days from `a` to `b` (negative when `b` precedes `a`). */
export function diffDays(a, b) {
  return Math.round((toUtcMs(b) - toUtcMs(a)) / 86_400_000)
}

export function compareIso(a, b) {
  return toUtcMs(a) - toUtcMs(b)
}

/** Day of week for an ISO date, 0 = Sunday (India's convention). */
export function weekdayIndex(iso) {
  return new Date(toUtcMs(iso)).getUTCDay()
}

/** The day an ISO date falls on, as a number. */
export function dayOfMonth(iso) {
  return fromIso(iso).day
}

export function daysInMonth(year, month /* 1-12 */) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate()
}

/** `2026-09-24` → `24 September 2026` (Indian reading order). */
export function formatIndiaDate(iso, { withWeekday = false } = {}) {
  const { year, month, day } = fromIso(iso)
  const base = `${pad(day)} ${MONTH_NAMES[month - 1]} ${year}`
  return withWeekday ? `${WEEKDAY_SHORT[weekdayIndex(iso)]}, ${base}` : base
}

/**
 * 24-hour hour → 12-hour parts.
 *
 * 00:xx → 12 AM, 12:xx → 12 PM (the two hours people get wrong), everything
 * else wraps with a plain modulo.
 */
export function to12Hour(hours) {
  const suffix = hours < 12 ? 'AM' : 'PM'
  const hour12 = hours % 12 === 0 ? 12 : hours % 12
  return { hour12, suffix }
}

/** `2026-09-24` → `24/09/2026`. */
export function formatIndiaShort(iso) {
  const { year, month, day } = fromIso(iso)
  return `${pad(day)}/${pad(month)}/${year}`
}

/**
 * Calendar matrix for a month: weeks (Sunday-first) of
 * `{ iso, day, inMonth }` cells.
 */
export function buildMonthMatrix(year, month /* 1-12 */) {
  const firstIso = toIso({ year, month, day: 1 })
  const leading = weekdayIndex(firstIso)
  const gridStart = addDays(firstIso, -leading)

  const total = daysInMonth(year, month)
  const cellCount = Math.ceil((leading + total) / 7) * 7

  const weeks = []
  for (let i = 0; i < cellCount; i += 7) {
    weeks.push(
      Array.from({ length: 7 }, (_, offset) => {
        const iso = addDays(gridStart, i + offset)
        const parts = fromIso(iso)
        return {
          iso,
          day: parts.day,
          inMonth: parts.year === year && parts.month === month,
        }
      }),
    )
  }
  return weeks
}
