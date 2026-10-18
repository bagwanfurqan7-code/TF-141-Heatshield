import React from 'react';
import { ClipboardList, Trash2, AlertTriangle } from 'lucide-react';

const SOURCE_SHORT = {
  personal_thermometer: 'Personal sensor',
  weather_station: 'Weather station',
  nasa_power: 'NASA POWER',
  official_met: 'Official met.',
  other_documented: 'Other source',
};

const MTYPE_SHORT = {
  daily_max_air: 'T_air max',
  daily_min_air: 'T_air min',
  point_air: 'T_air (point)',
  daily_mean_air: 'T_air mean',
  land_surface: 'LST',
  other: 'Other',
};

export default function SessionPreview({ readings, onClear }) {
  return (
    <section className="flex flex-col gap-3">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardList size={16} className="text-secondary shrink-0" />
          <span className="font-headline font-bold text-base text-on-surface">
            Session Preview
          </span>
          <span className="text-[10px] font-mono text-outline border border-outline-variant/30 rounded px-1.5 py-px">
            Not Permanently Saved
          </span>
        </div>
        <button
          onClick={onClear}
          className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors border border-red-500/30 rounded px-2 py-1 hover:bg-red-500/5"
        >
          <Trash2 size={12} />
          <span>Clear all</span>
        </button>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 text-[11px] text-outline bg-amber-400/5 border border-amber-400/20 rounded-lg px-3 py-2">
        <AlertTriangle size={12} className="text-amber-400 shrink-0 mt-0.5" />
        <span>
          These readings are stored only in in-memory component state for this browser session. They are lost on page reload and are never sent to a server or database.
        </span>
      </div>

      {/* Table */}
      <div className="bg-surface-container rounded-xl border border-outline-variant/30 overflow-x-auto">
        <table className="w-full text-xs text-left min-w-[640px]">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant/30 text-[10px] font-mono text-outline uppercase">
              <th className="px-4 py-2.5">#</th>
              <th className="px-4 py-2.5">Temperature</th>
              <th className="px-4 py-2.5">Date & Time</th>
              <th className="px-4 py-2.5">Location</th>
              <th className="px-4 py-2.5">Source</th>
              <th className="px-4 py-2.5">Measurement</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/15 font-mono">
            {readings.map((r, idx) => (
              <tr key={r.id} className="hover:bg-surface-container-high/30 transition-colors">
                <td className="px-4 py-2.5 text-outline">{readings.length - idx}</td>
                <td className="px-4 py-2.5 font-bold text-primary">{r.tempDisplay}</td>
                <td className="px-4 py-2.5 text-on-surface-variant">
                  {r.obsDate} {r.obsTime}
                  <br />
                  <span className="text-outline text-[10px]">{r.timezone}</span>
                </td>
                <td className="px-4 py-2.5 text-on-surface">
                  {[r.city, r.state].filter(Boolean).join(', ') || '—'}
                  {r.latitude && r.longitude && (
                    <div className="text-[10px] text-outline">{r.latitude}°N, {r.longitude}°E</div>
                  )}
                </td>
                <td className="px-4 py-2.5 text-on-surface-variant">
                  {r.source === 'other_documented' && r.sourceOther
                    ? r.sourceOther
                    : SOURCE_SHORT[r.source] || r.source}
                </td>
                <td className="px-4 py-2.5 text-on-surface-variant">
                  {r.measurementType === 'other' && r.measurementOther
                    ? r.measurementOther
                    : MTYPE_SHORT[r.measurementType] || r.measurementType}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
