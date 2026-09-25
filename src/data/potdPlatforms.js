/**
 * Platform metadata for the Problem of the Day cards.
 *
 * `home` is the public landing page for the daily problem, used as the redirect
 * target when a platform has no live entry (the source is down, or the API is
 * unreachable and we are showing the bundled snapshot).
 */

export const POTD_PLATFORMS = [
  {
    id: 'leetcode',
    name: 'LeetCode',
    program: 'Daily Coding Challenge',
    blurb: 'One curated problem, free and premium tiers, resets at 00:00 UTC.',
    home: 'https://leetcode.com/problemset/',
    accent: {
      text: 'text-[#FFA116]',
      border: 'border-[#FFA116]/25',
      chip: 'border-[#FFA116]/30 bg-[#FFA116]/10 text-[#FFA116]',
      glow: 'rgba(255,161,22,0.16)',
    },
  },
  {
    id: 'geeksforgeeks',
    name: 'GeeksforGeeks',
    program: 'Problem of the Day',
    blurb: 'Daily DSA problem with editorial and company tags. Resets 23:59 IST.',
    home: 'https://www.geeksforgeeks.org/problem-of-the-day',
    accent: {
      text: 'text-[#43C463]',
      border: 'border-[#2F8D46]/25',
      chip: 'border-[#2F8D46]/35 bg-[#2F8D46]/12 text-[#5BD97C]',
      glow: 'rgba(47,141,70,0.18)',
    },
  },
  {
    id: 'takeuforward',
    name: 'takeUforward',
    program: 'POTD',
    blurb: 'Striver-curated daily pick with a guided solution track.',
    home: 'https://takeuforward.org/potd',
    accent: {
      text: 'text-[#FB923C]',
      border: 'border-[#F97316]/25',
      chip: 'border-[#F97316]/30 bg-[#F97316]/10 text-[#FDBA74]',
      glow: 'rgba(249,115,22,0.16)',
    },
  },
]

export const PLATFORM_BY_ID = Object.fromEntries(
  POTD_PLATFORMS.map((platform) => [platform.id, platform]),
)
