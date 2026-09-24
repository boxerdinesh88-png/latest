import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const listeners = new Set<() => void>()

// The <html> class is the single source of truth. index.html sets it from
// localStorage before first paint (light is the default).
function getTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function setTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#050816' : '#F6F7FB')
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Storage can be blocked (private mode); the theme still applies for this visit
  }
  listeners.forEach((notify) => notify())
}

function subscribe(notify: () => void) {
  listeners.add(notify)
  return () => listeners.delete(notify)
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme)
  const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark')
  return { theme, toggle }
}
