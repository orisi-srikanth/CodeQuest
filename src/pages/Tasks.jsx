import PagePlaceholder from '@/components/common/PagePlaceholder.jsx'
import { APP } from '@/lib/constants.js'
import { useDocumentTitle } from '@/hooks/useDocumentTitle.js'

/** Route reserved for stage 2 — the practice problem library. */
export default function Tasks() {
  useDocumentTitle(`Tasks — ${APP.name}`)

  return (
    <PagePlaceholder
      eyebrow="Stage 2"
      title="Tasks"
      description="The problem library — filters, difficulty tracks and the submission flow — is intentionally out of scope for this stage. The route and brand shell are in place so it can be built without restructuring."
    />
  )
}
