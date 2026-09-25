import PagePlaceholder from '@/components/common/PagePlaceholder.jsx'
import { APP } from '@/lib/constants.js'
import { useDocumentTitle } from '@/hooks/useDocumentTitle.js'

export default function NotFound() {
  useDocumentTitle(`Page not found — ${APP.name}`)

  return (
    <PagePlaceholder
      eyebrow="404"
      title="This route doesn't exist yet"
      description="The page you were looking for isn't part of the current build. Head back to the landing page and pick up from there."
    />
  )
}
