import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState({ message = 'Synchronizing microclimatic telemetry...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 w-full min-h-[220px] bg-surface-container/40 rounded-xl border border-outline-variant/30 text-center">
      <div className="relative flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <span className="w-2 h-2 rounded-full bg-secondary absolute animate-ping" />
      </div>
      <p className="font-body text-sm text-on-surface font-medium mt-4">
        {message}
      </p>
      <span className="text-xs text-outline mt-1 font-mono">
        Querying database facts & geospatial tiles
      </span>
    </div>
  );
}
