import React from 'react';
import IndianFlag from './IndianFlag';

/**
 * Watermark Component
 * Displays the exact project watermark: "Made For Indians - Made By Indians".
 * This wording is strictly preserved without alterations.
 */
export default function Watermark({
  mode = 'badge', // 'badge' | 'background' | 'inline'
  className = '',
}) {
  const EXACT_WATERMARK_TEXT = 'Made For Indians - Made By Indians';

  if (mode === 'background') {
    return (
      <div
        className={`pointer-events-none select-none absolute inset-0 overflow-hidden flex items-center justify-center opacity-[0.03] dark:opacity-[0.04] z-0 ${className}`}
        aria-hidden="true"
      >
        <span className="font-headline font-black text-4xl sm:text-6xl lg:text-7xl tracking-widest uppercase text-center leading-tight">
          {EXACT_WATERMARK_TEXT}
        </span>
      </div>
    );
  }

  if (mode === 'inline') {
    return (
      <span
        className={`inline-flex items-center gap-2 font-mono text-xs text-outline ${className}`}
      >
        <IndianFlag size="xs" />
        <span>{EXACT_WATERMARK_TEXT}</span>
      </span>
    );
  }

  // Default: Elegant badge mode with Indian flag accents
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high/70 border border-outline-variant/40 text-xs font-mono text-on-surface-variant shadow-sm backdrop-blur-xs select-none ${className}`}
    >
      <IndianFlag size="xs" />
      <span className="font-semibold tracking-wide text-primary">
        {EXACT_WATERMARK_TEXT}
      </span>
      <IndianFlag size="xs" />
    </div>
  );
}
