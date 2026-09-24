// Prefixes a root-relative public path ('/projects/x.webp') with the build's base
// URL, so assets also resolve when the site is served from a sub-path
// (GitHub Pages builds with VITE_BASE=/latest/). External and protocol-relative
// URLs are returned unchanged.
export function asset(path: string): string
export function asset(path: string | undefined): string | undefined
export function asset(path: string | undefined) {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path
  return import.meta.env.BASE_URL + path.slice(1)
}

// Applies asset() to every root-relative string inside the portfolio data
export function withAssetPaths<T>(value: T): T {
  if (typeof value === 'string') return asset(value) as T
  if (Array.isArray(value)) return value.map(withAssetPaths) as T
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, withAssetPaths(v)]),
    ) as T
  }
  return value
}
