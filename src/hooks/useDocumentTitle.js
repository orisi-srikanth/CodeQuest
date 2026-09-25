import { useEffect } from 'react'

/** Keeps the document title in sync per route. */
export function useDocumentTitle(title) {
  useEffect(() => {
    if (!title) return
    const previous = document.title
    document.title = title
    return () => {
      document.title = previous
    }
  }, [title])
}

export default useDocumentTitle
