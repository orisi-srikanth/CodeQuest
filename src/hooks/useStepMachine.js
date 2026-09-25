import { useCallback, useEffect, useRef, useState } from 'react'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion.js'

/**
 * Dry-run controller.
 *
 * Drives a timed walk through a list of steps, but leaves the reader in charge:
 * play/pause, step forward/back, restart, or jump to any step. Auto-advance only
 * happens while `playing` is true.
 *
 * - Under `prefers-reduced-motion` it settles on the final step and stays there,
 *   so the panel still reads as a finished dry run instead of an empty one.
 * - Stepping manually never auto-plays; pressing play resumes from wherever the
 *   reader left off.
 */
export function useStepMachine(steps, { loop = true, autoStart = true } = {}) {
  const prefersReduced = usePrefersReducedMotion()
  const total = steps.length

  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(autoStart)

  // Keep the latest steps without re-arming the timer on every render.
  const stepsRef = useRef(steps)
  stepsRef.current = steps

  useEffect(() => {
    if (prefersReduced) {
      setIndex(total - 1)
      setPlaying(false)
    }
  }, [prefersReduced, total])

  useEffect(() => {
    if (prefersReduced || !playing || total === 0) return

    const current = stepsRef.current[index] ?? stepsRef.current[0]
    const timer = window.setTimeout(() => {
      setIndex((value) => {
        if (value + 1 < stepsRef.current.length) return value + 1
        // Reached the end: loop for the landing page, otherwise stop.
        if (loop) return 0
        setPlaying(false)
        return value
      })
    }, current.hold ?? 2400)

    return () => window.clearTimeout(timer)
  }, [index, playing, prefersReduced, loop, total])

  const safeIndex = total === 0 ? 0 : Math.min(index, total - 1)

  const goTo = useCallback(
    (next) => {
      if (total === 0) return
      setIndex(Math.max(0, Math.min(next, total - 1)))
    },
    [total],
  )

  const next = useCallback(() => {
    setPlaying(false)
    setIndex((value) => Math.min(value + 1, total - 1))
  }, [total])

  const prev = useCallback(() => {
    setPlaying(false)
    setIndex((value) => Math.max(value - 1, 0))
  }, [])

  const restart = useCallback(() => {
    setIndex(0)
    setPlaying(true)
  }, [])

  const play = useCallback(() => {
    // Replaying a finished trace should start over rather than sit on the end.
    setIndex((value) => (value >= total - 1 ? 0 : value))
    setPlaying(true)
  }, [total])

  const pause = useCallback(() => setPlaying(false), [])
  const toggle = useCallback(() => (playing ? pause() : play()), [playing, pause, play])

  return {
    index: safeIndex,
    step: steps[safeIndex],
    total,
    playing: playing && !prefersReduced,
    isAtEnd: safeIndex >= total - 1,
    prefersReduced,
    play,
    pause,
    toggle,
    next,
    prev,
    restart,
    goTo,
  }
}

export default useStepMachine
