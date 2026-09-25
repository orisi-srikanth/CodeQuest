import { ROUTES } from '@/lib/constants.js'

/**
 * Landing page reference sections — one per nav item.
 *
 * Each entry renders a compact console-style block with a short description,
 * a few mono details and a small arrow that opens the full page.
 * `preview` selects the miniature component in SectionPreviews.jsx.
 */
export const SECTIONS = [
  {
    id: 'tasks',
    eyebrow: 'TASKS',
    title: 'Practice library',
    description:
      'Curated problems grouped by pattern and ordered by difficulty, with an editorial solution attached to every entry.',
    bullets: [
      '450+ problems across 14 patterns',
      'Filter by topic, difficulty and status',
      'Editorial + reference solution attached',
    ],
    cta: 'Open Tasks',
    to: ROUTES.tasks,
    preview: 'tasks',
  },
  {
    id: 'potd',
    eyebrow: 'POTD',
    title: 'Problem of the Day',
    description:
      'One problem unlocks every day — short enough to finish in a sitting, sharp enough to move your thinking forward.',
    bullets: [
      'Resets daily at 00:00 IST',
      'Streak and accuracy tracking',
      'Discussion thread opens after you solve',
    ],
    cta: 'Open POTD',
    to: ROUTES.potd,
    preview: 'potd',
  },
  {
    id: 'contests',
    eyebrow: 'CONTESTS',
    title: 'Timed contests',
    description:
      'Ranked rounds that compress the interview clock into an hour, so performance under pressure stops being a surprise.',
    bullets: [
      'Weekly and monthly rounds',
      'Live leaderboard and rating deltas',
      'Post-contest editorial walkthrough',
    ],
    cta: 'Open Contests',
    to: ROUTES.contests,
    preview: 'contests',
  },
  {
    id: 'workspace',
    eyebrow: 'WORKSPACE',
    title: 'Your workspace',
    description:
      'Keep the habit visible: a live IST clock, an India calendar for 2023–2040, and a practice heatmap you mark day by day.',
    bullets: [
      'Live IST clock with sweeping second hand',
      'India calendar · 2023–2040 · national holidays',
      'Practice heatmap — today through December 2028',
    ],
    cta: 'Open Workspace',
    to: ROUTES.workspace,
    preview: 'workspace',
  },
]
