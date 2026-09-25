import PagePlaceholder from '@/components/common/PagePlaceholder.jsx'
import { APP } from '@/lib/constants.js'
import { useDocumentTitle } from '@/hooks/useDocumentTitle.js'

/** Route reserved for a later stage — timed, ranked contests. */
export default function Contests() {
  useDocumentTitle(`Contests — ${APP.name}`)

  return (
    <PagePlaceholder
      eyebrow="Reserved"
      title="Contests"
      description="Timed, ranked rounds with live leaderboards and post-contest editorials. The route and brand shell are in place; the contest engine is built in a later stage."
    />
  )
}
