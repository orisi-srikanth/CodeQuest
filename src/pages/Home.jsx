import Hero from '@/components/hero/Hero.jsx'
import ReferenceSections from '@/components/sections/ReferenceSections.jsx'
import { APP } from '@/lib/constants.js'
import { useDocumentTitle } from '@/hooks/useDocumentTitle.js'

/**
 * Landing page: hero, then one compact reference section per nav destination.
 * Each reference section links out to its full page, built in a later stage.
 */
export default function Home() {
  useDocumentTitle(`${APP.name} — ${APP.tagline}`)

  return (
    <>
      <Hero />
      <ReferenceSections />
    </>
  )
}
