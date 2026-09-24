import { useCallback } from 'react'
import { useLenis } from 'lenis/react'

// Height of the fixed navbar, so sections don't land underneath it
export const HEADER_OFFSET = 72

// Smooth-scrolls to '#id' (or to the top for '#hero' / '#top').
// Goes through Lenis because native scrollIntoView fights its smooth scrolling.
// Sections are lazy-loaded, so on a slow connection the target may not exist
// yet: retry briefly until it renders.
export function useSmoothScroll() {
  const lenis = useLenis()

  return useCallback(
    function scrollTo(href: string, attempt = 0) {
      const toTop = href === '#hero' || href === '#top'
      const target = toTop ? null : document.querySelector<HTMLElement>(href)
      if (!toTop && !target) {
        if (attempt < 20) setTimeout(() => scrollTo(href, attempt + 1), 100)
        return
      }
      if (lenis) {
        lenis.scrollTo(target ?? 0, { offset: target ? -HEADER_OFFSET : 0, duration: 1.2 })
      } else {
        const top = target ? target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET : 0
        window.scrollTo({ top, behavior: 'smooth' })
      }
      if (!toTop) history.replaceState(null, '', href)
    },
    [lenis],
  )
}
