import ReferenceSection from '@/components/sections/ReferenceSection.jsx'
import { SECTIONS } from '@/data/sections.js'

/**
 * Landing page reference block: one compact section per nav destination,
 * each with a small arrow that opens the full page.
 */
export default function ReferenceSections() {
  return (
    <div className="container-page pb-6">
      {SECTIONS.map((section, index) => (
        <ReferenceSection key={section.id} section={section} reverse={index % 2 === 1} />
      ))}
    </div>
  )
}
