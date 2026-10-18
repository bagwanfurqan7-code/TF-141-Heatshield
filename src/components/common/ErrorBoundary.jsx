import React from 'react';
import { AlertOctagon, RotateCcw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('HeatShield ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-on-surface">
          <div className="bg-surface-container max-w-lg w-full p-6 sm:p-8 rounded-2xl border border-error/30 shadow-2xl flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-full bg-error/15 border border-error/40 flex items-center justify-center text-error">
              <AlertOctagon size={28} />
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="font-headline font-bold text-xl text-on-surface">
                Telemetry Module Interrupted
              </h2>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                An unexpected component error occurred while rendering this view.
              </p>
            </div>

            {this.state.error && (
              <div className="w-full bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/30 text-left font-mono text-xs text-error/90 overflow-x-auto max-h-36">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex items-center gap-3 pt-2 w-full sm:w-auto">
              <button
                onClick={this.handleReload}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container text-on-primary-container text-xs font-semibold hover:bg-primary transition-colors"
              >
                <RotateCcw size={14} />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface text-xs font-semibold border border-outline-variant/40 transition-colors"
              >
                <Home size={14} />
                <span>Go to Overview</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
