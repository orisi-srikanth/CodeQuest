/**
 * Binary Search — step trace for the hero panel.
 *
 * The whole panel is driven by this file:
 *   ARRAY   the sorted input
 *   TARGET  the value being searched for
 *   LANGUAGES  code listings; every listing tags its lines with the same
 *              `key`s, so a trace step can highlight "the line that runs"
 *              regardless of which language is selected
 *   TRACE   one entry per animation step — a full snapshot of the algorithm's
 *           state plus the code line that is executing.
 *
 * Numbers are real: for nums = [-1, 0, 3, 5, 9, 12, 16], target = 9 the classic
 * halving runs mid 3 → 5 → 4 and terminates on index 4.
 */

export const ARRAY = [-1, 0, 3, 5, 9, 12, 16]
export const TARGET = 9
export const FOUND_INDEX = 4

/** Token types → editor theme (defined once in CodeBlock). */
const t = {
  comment: (v) => ({ t: 'comment', v }),
  kw: (v) => ({ t: 'kw', v }),
  fn: (v) => ({ t: 'fn', v }),
  v: (v) => ({ t: 'var', v }),
  n: (v) => ({ t: 'num', v }),
  p: (v) => ({ t: 'punc', v }),
}

export const LANGUAGES = [
  {
    id: 'python',
    label: 'Python',
    ext: 'py',
    lines: [
      { key: 'meta', indent: 0, tokens: [t.comment('# Time: O(log n)  |  Space: O(1) in-place')] },
      {
        key: 'def',
        indent: 0,
        tokens: [
          t.kw('def'), t.fn(' search'), t.p('('), t.v('self'), t.p(', '),
          t.v('nums'), t.p(': List['), t.kw('int'), t.p('], '), t.v('target'),
          t.p(': '), t.kw('int'), t.p(') -> '), t.kw('int'), t.p(':'),
        ],
      },
      {
        key: 'init',
        indent: 1,
        tokens: [
          t.v('left'), t.p(', '), t.v('right'), t.p(' = '), t.n('0'), t.p(', '),
          t.fn('len'), t.p('('), t.v('nums'), t.p(') - '), t.n('1'),
        ],
      },
      {
        key: 'while',
        indent: 1,
        tokens: [t.kw('while'), t.p(' '), t.v('left'), t.p(' <= '), t.v('right'), t.p(':')],
      },
      {
        key: 'mid',
        indent: 2,
        tokens: [
          t.v('mid'), t.p(' = '), t.v('left'), t.p(' + ('), t.v('right'), t.p(' - '),
          t.v('left'), t.p(') // '), t.n('2'),
        ],
      },
      {
        key: 'check',
        indent: 2,
        tokens: [
          t.kw('if'), t.p(' '), t.v('nums'), t.p('['), t.v('mid'), t.p('] == '),
          t.v('target'), t.p(':'),
        ],
      },
      {
        key: 'found',
        indent: 3,
        tokens: [t.kw('return'), t.p(' '), t.v('mid'), t.comment('  # target detected')],
      },
      {
        key: 'less',
        indent: 2,
        tokens: [
          t.kw('elif'), t.p(' '), t.v('nums'), t.p('['), t.v('mid'), t.p('] < '),
          t.v('target'), t.p(':'),
        ],
      },
      {
        key: 'less-body',
        indent: 3,
        tokens: [t.v('left'), t.p(' = '), t.v('mid'), t.p(' + '), t.n('1')],
      },
      { key: 'greater', indent: 2, tokens: [t.kw('else'), t.p(':')] },
      {
        key: 'greater-body',
        indent: 3,
        tokens: [t.v('right'), t.p(' = '), t.v('mid'), t.p(' - '), t.n('1')],
      },
      { key: 'fail', indent: 1, tokens: [t.kw('return'), t.p(' -'), t.n('1')] },
    ],
  },
  {
    id: 'java',
    label: 'Java',
    ext: 'java',
    lines: [
      { key: 'meta', indent: 0, tokens: [t.comment('// Time: O(log n)  |  Space: O(1) in-place')] },
      {
        key: 'def',
        indent: 0,
        tokens: [
          t.kw('public'), t.kw(' int'), t.fn(' search'), t.p('('), t.kw('int'), t.p('[] '),
          t.v('nums'), t.p(', '), t.kw('int'), t.v(' target'), t.p(') {'),
        ],
      },
      {
        key: 'init',
        indent: 1,
        tokens: [
          t.kw('int'), t.v(' left'), t.p(' = '), t.n('0'), t.p(', '), t.v('right'),
          t.p(' = '), t.v('nums'), t.p('.length - '), t.n('1'), t.p(';'),
        ],
      },
      {
        key: 'while',
        indent: 1,
        tokens: [
          t.kw('while'), t.p(' ('), t.v('left'), t.p(' <= '), t.v('right'), t.p(') {'),
        ],
      },
      {
        key: 'mid',
        indent: 2,
        tokens: [
          t.kw('int'), t.v(' mid'), t.p(' = '), t.v('left'), t.p(' + ('), t.v('right'),
          t.p(' - '), t.v('left'), t.p(') / '), t.n('2'), t.p(';'),
        ],
      },
      {
        key: 'check',
        indent: 2,
        tokens: [
          t.kw('if'), t.p(' ('), t.v('nums'), t.p('['), t.v('mid'), t.p('] == '),
          t.v('target'), t.p(') {'),
        ],
      },
      {
        key: 'found',
        indent: 3,
        tokens: [t.kw('return'), t.v(' mid'), t.p(';'), t.comment('  // target detected')],
      },
      {
        key: 'less',
        indent: 2,
        tokens: [
          t.p('} '), t.kw('else'), t.kw(' if'), t.p(' ('), t.v('nums'), t.p('['),
          t.v('mid'), t.p('] < '), t.v('target'), t.p(') {'),
        ],
      },
      {
        key: 'less-body',
        indent: 3,
        tokens: [t.v('left'), t.p(' = '), t.v('mid'), t.p(' + '), t.n('1'), t.p(';')],
      },
      { key: 'greater', indent: 2, tokens: [t.p('} '), t.kw('else'), t.p(' {')] },
      {
        key: 'greater-body',
        indent: 3,
        tokens: [t.v('right'), t.p(' = '), t.v('mid'), t.p(' - '), t.n('1'), t.p(';')],
      },
      { key: 'fail', indent: 1, tokens: [t.kw('return'), t.p(' -'), t.n('1'), t.p(';')] },
    ],
  },
  {
    id: 'cpp',
    label: 'C++20',
    ext: 'cpp',
    lines: [
      { key: 'meta', indent: 0, tokens: [t.comment('// Time: O(log n)  |  Space: O(1) in-place')] },
      {
        key: 'def',
        indent: 0,
        tokens: [
          t.kw('int'), t.fn(' search'), t.p('('), t.kw('const'), t.p(' vector<'), t.kw('int'),
          t.p('>& '), t.v('nums'), t.p(', '), t.kw('int'), t.v(' target'), t.p(') {'),
        ],
      },
      {
        key: 'init',
        indent: 1,
        tokens: [
          t.kw('int'), t.v(' left'), t.p(' = '), t.n('0'), t.p(', '), t.v('right'),
          t.p(' = ('), t.kw('int'), t.p(')'), t.v('nums'), t.p('.size() - '), t.n('1'), t.p(';'),
        ],
      },
      {
        key: 'while',
        indent: 1,
        tokens: [
          t.kw('while'), t.p(' ('), t.v('left'), t.p(' <= '), t.v('right'), t.p(') {'),
        ],
      },
      {
        key: 'mid',
        indent: 2,
        tokens: [
          t.kw('int'), t.v(' mid'), t.p(' = '), t.v('left'), t.p(' + ('), t.v('right'),
          t.p(' - '), t.v('left'), t.p(') / '), t.n('2'), t.p(';'),
        ],
      },
      {
        key: 'check',
        indent: 2,
        tokens: [
          t.kw('if'), t.p(' ('), t.v('nums'), t.p('['), t.v('mid'), t.p('] == '),
          t.v('target'), t.p(') {'),
        ],
      },
      {
        key: 'found',
        indent: 3,
        tokens: [t.kw('return'), t.v(' mid'), t.p(';'), t.comment('  // target detected')],
      },
      {
        key: 'less',
        indent: 2,
        tokens: [
          t.p('} '), t.kw('else'), t.kw(' if'), t.p(' ('), t.v('nums'), t.p('['),
          t.v('mid'), t.p('] < '), t.v('target'), t.p(') {'),
        ],
      },
      {
        key: 'less-body',
        indent: 3,
        tokens: [t.v('left'), t.p(' = '), t.v('mid'), t.p(' + '), t.n('1'), t.p(';')],
      },
      { key: 'greater', indent: 2, tokens: [t.p('} '), t.kw('else'), t.p(' {')] },
      {
        key: 'greater-body',
        indent: 3,
        tokens: [t.v('right'), t.p(' = '), t.v('mid'), t.p(' - '), t.n('1'), t.p(';')],
      },
      { key: 'fail', indent: 1, tokens: [t.kw('return'), t.p(' -'), t.n('1'), t.p(';')] },
    ],
  },
]

export const PROBLEM = {
  title: 'Binary Search',
  tags: '[Two Pointers]',
  complexity: 'O(log n)',
  difficulty: { label: 'EASY', tone: 'amber' },
  number: '#704',
  signature: 'search(nums: List[int], target: int) → int',
  runtime: { cases: '48/48', ms: '39ms', beats: '98.4%', mem: '16.2 MB' },
  space: { label: '[Binary Search]', aux: 'Mem: O(1) Auxiliary' },
}

/**
 * Trace steps. `hold` is the dwell time in ms; the machine loops back to the
 * first step after the last one. `lineKey` must exist in every language.
 */
export const TRACE = [
  {
    id: 'probe-1',
    label: 'PROBE',
    left: 0,
    right: 6,
    mid: 3,
    lineKey: 'mid',
    note: 'mid = (0 + 6) // 2 = 3  →  nums[3] = 5',
    hold: 2200,
  },
  {
    id: 'decide-1',
    label: 'BRANCH',
    left: 0,
    right: 6,
    mid: 3,
    lineKey: 'less-body',
    note: 'nums[3] = 5 < target 9  →  left = mid + 1 = 4',
    cmp: { lhs: 'nums[3] = 5', op: '<', rhs: 'target 9', verdict: 'left = mid + 1' },
    hold: 2400,
  },
  {
    id: 'probe-2',
    label: 'PROBE',
    left: 4,
    right: 6,
    mid: 5,
    lineKey: 'mid',
    note: 'mid = (4 + 6) // 2 = 5  →  nums[5] = 12',
    hold: 2200,
  },
  {
    id: 'decide-2',
    label: 'BRANCH',
    left: 4,
    right: 6,
    mid: 5,
    lineKey: 'greater-body',
    note: 'nums[5] = 12 > target 9  →  right = mid - 1 = 4',
    cmp: { lhs: 'nums[5] = 12', op: '>', rhs: 'target 9', verdict: 'right = mid - 1' },
    hold: 2400,
  },
  {
    id: 'probe-3',
    label: 'PROBE',
    left: 4,
    right: 4,
    mid: 4,
    lineKey: 'mid',
    note: 'mid = (4 + 4) // 2 = 4  →  nums[4] = 9',
    hold: 2200,
  },
  {
    id: 'found',
    label: 'HIT',
    left: 4,
    right: 4,
    mid: 4,
    lineKey: 'found',
    note: 'Match Found at mid = (4 + 4) // 2 = 4',
    cmp: { lhs: 'nums[4] = 9', op: '==', rhs: 'target 9', verdict: 'return mid' },
    hold: 4200,
    found: true,
  },
]
