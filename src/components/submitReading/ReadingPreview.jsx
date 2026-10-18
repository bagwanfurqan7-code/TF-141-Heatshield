import React from 'react';
import { Eye, Thermometer, MapPin, Clock, Database, BarChart3, StickyNote } from 'lucide-react';

const SOURCE_LABELS = {
  personal_thermometer: 'Personal thermometer / local sensor',
  weather_station: 'Weather station',
  nasa_power: 'NASA POWER / documented climate-data source',
  official_met: 'Official meteorological source',
  other_documented: 'Other documented source',
};

const MEASUREMENT_LABELS = {
  daily_max_air: 'Daily maximum air temperature',
  daily_min_air: 'Daily minimum air temperature',
  point_air: 'Air temperature at specific observation time',
  daily_mean_air: 'Daily mean air temperature',
  land_surface: 'Land-surface temperature (LST)',
  other: 'Other / unspecified',
};

const TZ_SHORT = {
  'Asia/Kolkata': 'IST (UTC+05:30)',
  'UTC': 'UTC (UTC+00:00)',
  'Asia/Dubai': 'GST (UTC+04:00)',
  'Asia/Singapore': 'SGT (UTC+08:00)',
  'Europe/London': 'GMT/BST',
  'America/New_York': 'EST/EDT',
};

export default function ReadingPreview({ form, displayCelsius }) {
  const isEmpty =
    !form.tempValue &&
    !form.obsDate &&
    !form.city &&
    !form.source &&
    !form.measurementType;

  // Build location string
  const locationParts = [form.city, form.state].filter(Boolean);
  const locationStr = locationParts.length ? locationParts.join(', ') : null;

  const hasCords =
    form.latitude.trim() !== '' && form.longitude.trim() !== '';

  return (
    <div className="bg-surface-container-low rounded-2xl border border-outline-variant/30 overflow-hidden shadow-md">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-outline-variant/20 bg-surface-container-lowest/60">
        <div className="w-6 h-6 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          <Eye size={13} />
        </div>
        <span className="font-headline font-bold text-sm text-on-surface">Reading Preview</span>
        <span className="ml-auto text-[10px] font-mono text-outline border border-outline-variant/30 rounded px-1.5 py-px">
          Live
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
            <div className="w-12 h-12 rounded-full bg-surface-container border border-outline-variant/30 flex items-center justify-center">
              <Eye size={20} className="text-outline" />
            </div>
            <p className="text-xs text-outline leading-relaxed max-w-[220px]">
              Your reading preview will appear here as you complete the form.
            </p>
          </div>
        ) : (
          <>
            {/* Temperature */}
            {(form.tempValue || displayCelsius !== null) && (
              <PreviewRow
                icon={Thermometer}
                iconColor="text-amber-400"
                label="Temperature"
                value={
                  form.tempValue
                    ? form.tempUnit === 'F' && displayCelsius !== null
                      ? `${form.tempValue}°F → ${displayCelsius}°C`
                      : `${form.tempValue}°${form.tempUnit}`
                    : '—'
                }
              />
            )}

            {/* Location */}
            {(locationStr || hasCords) && (
              <PreviewRow
                icon={MapPin}
                iconColor="text-secondary"
                label="Location"
                value={
                  <span className="flex flex-col gap-0.5">
                    {locationStr && <span>{locationStr}</span>}
                    {form.locationDesc && (
                      <span className="text-outline text-[11px]">{form.locationDesc}</span>
                    )}
                    {hasCords && (
                      <span className="text-outline text-[11px] font-mono">
                        {form.latitude}°N, {form.longitude}°E
                      </span>
                    )}
                  </span>
                }
              />
            )}

            {/* Date */}
            {form.obsDate && (
              <PreviewRow
                icon={Clock}
                iconColor="text-primary"
                label="Date"
                value={new Date(form.obsDate + 'T00:00:00').toLocaleDateString('en-IN', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              />
            )}

            {/* Time */}
            {form.obsTime && (
              <PreviewRow
                icon={Clock}
                iconColor="text-primary"
                label="Time"
                value={`${form.obsTime} — ${TZ_SHORT[form.timezone] || form.timezone}`}
              />
            )}

            {/* Measurement type */}
            {form.measurementType && (
              <PreviewRow
                icon={BarChart3}
                iconColor="text-tertiary"
                label="Measurement"
                value={
                  form.measurementType === 'other' && form.measurementOther
                    ? form.measurementOther
                    : MEASUREMENT_LABELS[form.measurementType] || '—'
                }
              />
            )}

            {/* Source */}
            {form.source && (
              <PreviewRow
                icon={Database}
                iconColor="text-outline"
                label="Source"
                value={
                  form.source === 'other_documented' && form.sourceOther
                    ? form.sourceOther
                    : SOURCE_LABELS[form.source] || '—'
                }
              />
            )}

            {/* Notes */}
            {form.notes.trim() && (
              <PreviewRow
                icon={StickyNote}
                iconColor="text-outline"
                label="Notes"
                value={
                  <span className="text-[11px] text-outline leading-relaxed line-clamp-4">
                    {form.notes}
                  </span>
                }
              />
            )}
          </>
        )}
      </div>

      {/* Footer disclaimer */}
      <div className="px-4 py-2.5 border-t border-outline-variant/20 bg-surface-container-lowest/40 text-[10px] text-outline font-mono leading-relaxed">
        Preview only. Source labels reflect user input and do not verify the reading.
      </div>
    </div>
  );
}

function PreviewRow({ icon: Icon, iconColor, label, value }) {
  return (
    <div className="flex items-start gap-2.5 text-xs">
      <div className="mt-0.5 shrink-0">
        <Icon size={13} className={iconColor} />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-outline">{label}</span>
        <span className="text-on-surface leading-snug break-words">{value}</span>
      </div>
    </div>
  );
}
