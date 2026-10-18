import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function ErrorState({ 
  title = 'Telemetry Ingest Error',
  message = 'An error occurred while communicating with the data source.',
  onRetry
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 w-full bg-error-container/10 rounded-xl border border-error/30 text-center">
      <div className="w-12 h-12 rounded-full bg-error/15 border border-error/40 flex items-center justify-center text-error mb-3">
        <AlertTriangle size={24} />
      </div>
      <h3 className="font-headline text-base font-semibold text-error">
        {title}
      </h3>
      <p className="font-body text-xs text-on-surface-variant max-w-md mt-1 mb-4 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-xs font-medium text-on-surface border border-outline-variant/40 transition-colors"
        >
          <RotateCcw size={14} />
          <span>Retry Operation</span>
        </button>
      )}
    </div>
  );
}
