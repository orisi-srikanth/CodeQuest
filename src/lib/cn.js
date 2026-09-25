/**
 * Tiny class-name joiner — keeps JSX readable without pulling in a dependency.
 * Usage: cn('base', isActive && 'active', className)
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default cn
