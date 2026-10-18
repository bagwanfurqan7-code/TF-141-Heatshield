import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * FormField — generic label/error/hint wrapper for any form control.
 */
export default function FormField({ id, label, required, optional, error, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant uppercase tracking-wider"
      >
        <span>{label}</span>
        {required && (
          <span className="text-red-400 font-bold" aria-label="required">*</span>
        )}
        {optional && (
          <span className="text-outline font-normal normal-case tracking-normal text-[10px] border border-outline-variant/30 rounded px-1 py-px ml-1">
            optional
          </span>
        )}
      </label>

      {children}

      {error && (
        <div className="flex items-start gap-1.5 text-xs text-red-400 font-mono" role="alert">
          <AlertCircle size={12} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {hint && !error && (
        <p className="text-[11px] text-outline leading-relaxed">{hint}</p>
      )}
    </div>
  );
}
