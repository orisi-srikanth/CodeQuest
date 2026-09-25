/**
 * Indian national holidays — fixed-date, so they are correct for every year in
 * the calendar's range.
 *
 * Religious and lunar festivals (Diwali, Holi, Eid, …) shift every year and are
 * declared by the government annually; rather than hard-code approximations,
 * they are left out. Add them here as `{ month, day, name, years? }` — the
 * calendar picks them up automatically.
 */

export const NATIONAL_HOLIDAYS = [
  { month: 1, day: 26, name: 'Republic Day' },
  { month: 8, day: 15, name: 'Independence Day' },
  { month: 10, day: 2, name: 'Gandhi Jayanti' },
]

/** Calendar range supported by the India calendar view. */
export const CALENDAR_MIN_YEAR = 2023
export const CALENDAR_MAX_YEAR = 2040

/**
 * Holiday for a given date, if any.
 * `years`, when present, restricts the holiday to specific years.
 */
export function holidayFor(month, day, year) {
  return NATIONAL_HOLIDAYS.find(
    (holiday) =>
      holiday.month === month &&
      holiday.day === day &&
      (!holiday.years || holiday.years.includes(year)),
  )
}

export default NATIONAL_HOLIDAYS
