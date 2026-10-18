import React from 'react';
import { Database, FilterX } from 'lucide-react';

export default function EmptyState({
  title = 'No Telemetry Records Found',
  message = 'No observations match the selected filters or date window.',
  onReset
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 w-full bg-surface-container/30 rounded-xl border border-outline-variant/30 text-center">
      <div className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-outline mb-3">
        <FilterX size={22} />
      </div>
      <h3 className="font-headline text-base font-semibold text-on-surface">
        {title}
      </h3>
      <p className="font-body text-xs text-on-surface-variant max-w-md mt-1 mb-4 leading-relaxed">
        {message}
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-xs font-medium text-primary border border-primary/30 transition-colors"
        >
          <span>Reset All Filters</span>
        </button>
      )}
    </div>
  );
}
