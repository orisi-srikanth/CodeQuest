import { ROUTES } from '@/lib/constants.js'

/**
 * Primary navigation items, in display order.
 * `end` marks an exact-match route (so the root path isn't always active).
 * `hint` is surfaced as a tooltip / accessible description for abbreviations.
 * `blurb` feeds the landing page reference sections.
 */
export const NAV_ITEMS = Object.freeze([
  { id: 'home', label: 'Home', to: ROUTES.home, end: true },
  { id: 'tasks', label: 'Tasks', to: ROUTES.tasks },
  { id: 'potd', label: 'POTD', to: ROUTES.potd, hint: 'Problem of the Day' },
  { id: 'contests', label: 'Contests', to: ROUTES.contests },
  { id: 'workspace', label: 'Workspace', to: ROUTES.workspace },
])
