import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onRetry?: () => void
  showError?: boolean
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.showError) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-[#070A13] text-white px-4">
            <div className="text-center max-w-md">
              <h1 className="text-2xl font-bold text-red-400 mb-4">Component Error</h1>
              <p className="text-sm text-slate-300 mb-4 font-mono break-all">{this.state.error?.message || 'Unknown error'}</p>
              <pre className="text-xs text-slate-500 mb-6 font-mono text-left max-h-40 overflow-auto">{this.state.error?.stack || ''}</pre>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null })
                  if (this.props.onRetry) this.props.onRetry()
                  else window.location.reload()
                }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:scale-105 transition-transform"
              >
                Reload Page
              </button>
            </div>
          </div>
        )
      }
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-[#070A13] text-white px-4">
          <div className="text-center max-w-md">
            <h1 className="text-6xl font-bold text-green-500 mb-4">500</h1>
            <p className="text-xl text-slate-300 mb-6">Something went wrong</p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null })
                if (this.props.onRetry) this.props.onRetry()
                else window.location.reload()
              }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:scale-105 transition-transform"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
