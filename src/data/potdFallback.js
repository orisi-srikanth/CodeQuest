/**
 * Offline snapshot of the three daily problems.
 *
 * Used only when the CodeQuest API is unreachable (for example a static preview
 * with no backend). Each platform's list is rotated by the day of the year, so
 * even the fallback still changes daily rather than freezing on one problem.
 *
 * The live API always takes precedence — see `src/services/potd.js`.
 */

const LEETCODE = [
  { title: 'Smallest Index With Digit Sum Equal to Index', url: 'https://leetcode.com/problems/smallest-index-with-digit-sum-equal-to-index/', difficulty: 'Easy', accuracy: 84.4, tags: ['Array', 'Math'] },
  { title: 'Maximum Number of Operations to Move Ones to the End', url: 'https://leetcode.com/problems/maximum-number-of-operations-to-move-ones-to-the-end/', difficulty: 'Medium', accuracy: 61.2, tags: ['String', 'Greedy'] },
  { title: 'Count Subarrays With Majority Element I', url: 'https://leetcode.com/problems/count-subarrays-with-majority-element-i/', difficulty: 'Medium', accuracy: 42.8, tags: ['Array', 'Hash Table'] },
  { title: 'Longest Balanced Substring After Operations', url: 'https://leetcode.com/problems/longest-balanced-substring-after-operations/', difficulty: 'Hard', accuracy: 28.5, tags: ['String', 'Stack'] },
  { title: 'Minimum Operations to Make Array Elements Zero', url: 'https://leetcode.com/problems/minimum-operations-to-make-array-elements-zero/', difficulty: 'Hard', accuracy: 33.1, tags: ['Array', 'Math'] },
  { title: 'Find the Largest Almost Missing Integer', url: 'https://leetcode.com/problems/find-the-largest-almost-missing-integer/', difficulty: 'Easy', accuracy: 71.9, tags: ['Array', 'Hash Table'] },
  { title: 'Maximum Subarray Sum With Length Divisible by K', url: 'https://leetcode.com/problems/maximum-subarray-sum-with-length-divisible-by-k/', difficulty: 'Medium', accuracy: 55.4, tags: ['Array', 'Prefix Sum'] },
]

const GEEKSFORGEEKS = [
  { title: 'Maximum Height Disc Stack', url: 'https://www.geeksforgeeks.org/problems/stacking-up-discs1315/1', difficulty: 'Hard', accuracy: 54.8, tags: ['Dynamic Programming', 'Sorting'] },
  { title: 'Count Distinct Elements in Every Window', url: 'https://www.geeksforgeeks.org/problems/count-distinct-elements-in-every-window/1', difficulty: 'Medium', accuracy: 38.2, tags: ['Hash', 'Sliding Window'] },
  { title: 'Kadane’s Algorithm', url: 'https://www.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1', difficulty: 'Medium', accuracy: 46.5, tags: ['Arrays', 'DP'] },
  { title: 'Detect Cycle in a Directed Graph', url: 'https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1', difficulty: 'Medium', accuracy: 41.7, tags: ['Graph', 'DFS'] },
  { title: 'Minimum Spanning Tree', url: 'https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1', difficulty: 'Medium', accuracy: 52.3, tags: ['Graph', 'Greedy'] },
  { title: 'Coin Change (Minimum Coins)', url: 'https://www.geeksforgeeks.org/problems/number-of-coins1824/1', difficulty: 'Medium', accuracy: 44.1, tags: ['Dynamic Programming'] },
  { title: 'Longest Common Subsequence', url: 'https://www.geeksforgeeks.org/problems/longest-common-subsequence-1587115620/1', difficulty: 'Medium', accuracy: 47.9, tags: ['Dynamic Programming', 'Strings'] },
]

const TAKEUFORWARD = [
  { title: 'Majority Element-I', url: 'https://takeuforward.org/practice/dsa/majority-element-i', difficulty: 'core', accuracy: 73.4, tags: ['Arrays'] },
  { title: 'Two Sum', url: 'https://takeuforward.org/practice/dsa/two-sum', difficulty: 'easy', accuracy: 68.9, tags: ['Arrays', 'Hashing'] },
  { title: 'Best Time to Buy and Sell Stock', url: 'https://takeuforward.org/practice/dsa/best-time-to-buy-and-sell-stock', difficulty: 'easy', accuracy: 71.2, tags: ['Arrays', 'Greedy'] },
  { title: 'Longest Consecutive Sequence', url: 'https://takeuforward.org/practice/dsa/longest-consecutive-sequence', difficulty: 'medium', accuracy: 59.4, tags: ['Arrays', 'Hashing'] },
  { title: 'Rotate Matrix by 90 Degrees', url: 'https://takeuforward.org/practice/dsa/rotate-matrix', difficulty: 'medium', accuracy: 63.7, tags: ['Matrix'] },
  { title: 'Maximum Subarray Sum', url: 'https://takeuforward.org/practice/dsa/kadane-algorithm', difficulty: 'medium', accuracy: 66.1, tags: ['Arrays', 'DP'] },
  { title: 'N-Queens', url: 'https://takeuforward.org/practice/dsa/n-queens', difficulty: 'hard', accuracy: 51.3, tags: ['Backtracking'] },
]

const SNAPSHOTS = {
  leetcode: LEETCODE,
  geeksforgeeks: GEEKSFORGEEKS,
  takeuforward: TAKEUFORWARD,
}

/** Day-of-year, so the fallback advances daily instead of standing still. */
export function dayOfYear(date = new Date()) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0)
  const now = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  return Math.floor((now - start) / 86_400_000)
}

export function fallbackProblem(platformId, date = new Date()) {
  const list = SNAPSHOTS[platformId]
  if (!list?.length) return null
  return list[dayOfYear(date) % list.length]
}

export default SNAPSHOTS
