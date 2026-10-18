import React from 'react';

export default function StatCard({
  title,
  value,
  unit = '',
  description,
  icon: Icon,
  trend,
  badgeText,
  badgeColor = 'text-primary bg-primary/10 border-primary/20',
  accentColor = 'text-primary'
}) {
  return (
    <div className="bg-surface-container rounded-xl p-space-md border border-outline-variant/30 flex flex-col justify-between gap-space-sm shadow-sm hover:border-outline-variant/60 transition-colors">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2">
        <span className="font-body text-xs font-semibold uppercase tracking-wider text-outline truncate">
          {title}
        </span>
        {Icon && (
          <div className="p-2 rounded-lg bg-surface-container-high border border-outline-variant/30 text-on-surface-variant shrink-0">
            <Icon size={16} className={accentColor} />
          </div>
        )}
      </div>

      {/* Main Metric Value */}
      <div className="flex items-baseline gap-1 mt-1">
        <span className="font-headline font-bold text-2xl lg:text-3xl text-on-surface tracking-tight">
          {value !== undefined && value !== null ? value : '—'}
        </span>
        {unit && (
          <span className="font-body text-sm font-medium text-on-surface-variant">
            {unit}
          </span>
        )}
      </div>

      {/* Footer / Description / Trend */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-outline-variant/20 mt-1">
        {description && (
          <span className="font-body text-xs text-on-surface-variant truncate">
            {description}
          </span>
        )}

        {badgeText && (
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${badgeColor} shrink-0`}>
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}
