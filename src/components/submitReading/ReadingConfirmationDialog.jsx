import React, { useEffect } from 'react';
import { X, CheckCircle2, Send, Thermometer, MapPin, Clock, Database, BarChart3, AlertTriangle } from 'lucide-react';

const SOURCE_LABELS = {
  personal_thermometer: 'Personal thermometer / local sensor',
  weather_station: 'Weather station',
  nasa_power: 'NASA POWER / climate-data source',
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

export default function ReadingConfirmationDialog({ form, displayCelsius, onConfirm, onCancel }) {
  // Trap focus and allow Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onCancel();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onCancel]);

  const locationParts = [form.city, form.state].filter(Boolean);
  const locationStr = locationParts.join(', ') || '—';
  const hasCords = form.latitude.trim() !== '' && form.longitude.trim() !== '';

  const tempDisplay = form.tempUnit === 'F' && displayCelsius !== null
    ? `${form.tempValue}°F → ${displayCelsius}°C`
    : `${form.tempValue}°${form.tempUnit}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      <div className="bg-surface-container max-w-lg w-full rounded-2xl border border-outline-variant/40 shadow-2xl overflow-hidden animate-in fade-in duration-200">
        {/* Dialog Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/20 bg-surface-container-lowest/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Send size={15} className="text-primary" />
            </div>
            <div>
              <h2 id="confirm-dialog-title" className="font-headline font-bold text-base text-on-surface">
                Review Your Reading
              </h2>
              <p className="text-[11px] text-outline">Confirm your entered values before submitting.</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            aria-label="Close dialog"
            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Values */}
        <div className="px-5 py-4 flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
          <ConfirmRow icon={Thermometer} iconColor="text-amber-400" label="Temperature" value={tempDisplay} />

          <ConfirmRow icon={MapPin} iconColor="text-secondary" label="Location" value={
            <span className="flex flex-col gap-0.5">
              <span>{locationStr}</span>
              {form.locationDesc && <span className="text-outline text-[11px]">{form.locationDesc}</span>}
              {hasCords && (
                <span className="text-outline text-[11px] font-mono">{form.latitude}°N, {form.longitude}°E</span>
              )}
            </span>
          } />

          <ConfirmRow icon={Clock} iconColor="text-primary" label="Date & Time" value={
            <span>
              {form.obsDate} at {form.obsTime} — {TZ_SHORT[form.timezone] || form.timezone}
            </span>
          } />

          <ConfirmRow icon={BarChart3} iconColor="text-tertiary" label="Measurement" value={
            form.measurementType === 'other' && form.measurementOther
              ? form.measurementOther
              : MEASUREMENT_LABELS[form.measurementType] || '—'
          } />

          <ConfirmRow icon={Database} iconColor="text-outline" label="Source" value={
            form.source === 'other_documented' && form.sourceOther
              ? form.sourceOther
              : SOURCE_LABELS[form.source] || '—'
          } />

          {form.notes.trim() && (
            <ConfirmRow icon={Database} iconColor="text-outline" label="Notes" value={
              <span className="text-[11px] text-outline leading-relaxed">{form.notes}</span>
            } />
          )}

          {/* Demo disclaimer */}
          <div className="flex items-start gap-2 bg-amber-400/5 border border-amber-400/20 rounded-lg px-3 py-2.5 text-xs text-amber-300 mt-2">
            <AlertTriangle size={14} className="shrink-0 mt-0.5" />
            <p>
              This is a <strong>frontend-only demo</strong>. Confirming will <strong>not</strong> send any data to a server, database, or external API. The reading will be stored temporarily in this page's session state only.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 px-5 py-4 border-t border-outline-variant/20 bg-surface-container-lowest/50">
          <button
            onClick={onConfirm}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-headline font-bold text-sm px-5 py-3 rounded-xl hover:bg-primary transition-all shadow-md group"
          >
            <CheckCircle2 size={16} />
            <span>Confirm Demo Submission</span>
          </button>
          <button
            onClick={onCancel}
            className="inline-flex items-center justify-center gap-2 bg-surface-container-high hover:bg-surface-bright text-on-surface-variant font-semibold text-sm px-4 py-3 rounded-xl border border-outline-variant/40 transition-colors"
          >
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmRow({ icon: Icon, iconColor, label, value }) {
  return (
    <div className="flex items-start gap-3 text-sm border-b border-outline-variant/10 pb-2 last:border-0">
      <Icon size={14} className={`${iconColor} shrink-0 mt-0.5`} />
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-[10px] text-outline uppercase tracking-wider font-semibold">{label}</span>
        <span className="text-on-surface break-words">{value}</span>
      </div>
    </div>
  );
}
