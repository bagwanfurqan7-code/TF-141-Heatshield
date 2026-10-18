import React from 'react';
import { DEFAULT_THRESHOLDS, MISSING_DATA_COLOR } from '../../utils/temperatureColors';

export default function HeatMapLegend({ activeRange, onSelectRange }) {
  return (
    <div className="bg-surface-container-low/95 backdrop-blur-md p-3 rounded-lg border border-outline-variant/40 shadow-lg text-xs max-w-xs">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-outline-variant/30">
        <span className="font-headline font-semibold text-on-surface uppercase text-[11px] tracking-wider">
          Temperature Range
        </span>
        <span className="font-mono text-[10px] text-outline">°C (2m Air / LST)</span>
      </div>

      <div className="flex flex-col gap-1.5">
        {DEFAULT_THRESHOLDS.map((tier) => (
          <div
            key={tier.label}
            className="flex items-center justify-between gap-2 py-0.5 px-1 rounded hover:bg-surface-container cursor-default transition-colors"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-sm shadow-sm shrink-0 border border-black/20"
                style={{ backgroundColor: tier.color }}
              />
              <span className="font-medium text-on-surface text-xs">
                {tier.label}
              </span>
            </div>
            <span className="text-[11px] text-on-surface-variant font-mono">
              {tier.name}
            </span>
          </div>
        ))}

        <div className="flex items-center justify-between gap-2 py-0.5 px-1 rounded hover:bg-surface-container cursor-default border-t border-outline-variant/20 pt-1.5 mt-0.5">
          <div className="flex items-center gap-2">
            <span
              className="w-3.5 h-3.5 rounded-sm shrink-0"
              style={{ backgroundColor: MISSING_DATA_COLOR }}
            />
            <span className="font-medium text-outline text-xs">
              No Data / Missing
            </span>
          </div>
          <span className="text-[10px] text-outline italic font-mono">
            Unrecorded
          </span>
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-outline-variant/30 text-[10px] text-outline leading-tight">
        Visual tiers for spatial comparison; not official municipal heat warnings.
      </div>
    </div>
  );
}
