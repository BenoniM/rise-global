import { useEffect } from 'react'

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | Rise Global GmbH` : 'Rise Global GmbH'
  }, [title])
}
