import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Thermometer,
  MapPin,
  ChevronRight,
  AlertCircle,
  Info,
  CheckCircle2,
  ClipboardList,
  Plus,
  Trash2,
  Send,
  X,
} from 'lucide-react';

// ─── Sub-components ──────────────────────────────────────────────────────────

import TemperatureInput from '../components/submitReading/TemperatureInput';
import LocationFields from '../components/submitReading/LocationFields';
import SourceSelector from '../components/submitReading/SourceSelector';
import MeasurementTypeSelector from '../components/submitReading/MeasurementTypeSelector';
import ReadingPreview from '../components/submitReading/ReadingPreview';
import ReadingConfirmationDialog from '../components/submitReading/ReadingConfirmationDialog';
import SessionPreview from '../components/submitReading/SessionPreview';
import FormField from '../components/submitReading/FormField';

// ─── Constants ────────────────────────────────────────────────────────────────

const TODAY = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

const INITIAL_FORM = {
  // Temperature
  tempValue: '',
  tempUnit: 'C',           // 'C' | 'F'
  // Observation date/time
  obsDate: '',
  obsTime: '',
  timezone: 'Asia/Kolkata',
  // Location
  state: '',
  city: '',
  locationDesc: '',
  latitude: '',
  longitude: '',
  // Reading metadata
  source: '',
  sourceOther: '',
  measurementType: '',
  measurementOther: '',
  // Notes
  notes: '',
};

const INITIAL_TOUCHED = Object.fromEntries(Object.keys(INITIAL_FORM).map(k => [k, false]));

// ─── Validation ───────────────────────────────────────────────────────────────

const TEMP_MIN_C = -90;
const TEMP_MAX_C = 60;

function toCelsius(value, unit) {
  const n = parseFloat(value);
  if (isNaN(n)) return NaN;
  if (unit === 'F') return (n - 32) * 5 / 9;
  return n;
}

function validate(form) {
  const errors = {};

  // Temperature
  if (!form.tempValue.trim()) {
    errors.tempValue = 'Temperature is required.';
  } else if (isNaN(parseFloat(form.tempValue))) {
    errors.tempValue = 'Temperature must be a number.';
  } else {
    const celsius = toCelsius(form.tempValue, form.tempUnit);
    if (celsius < TEMP_MIN_C || celsius > TEMP_MAX_C) {
      errors.tempValue = `Converted value ${celsius.toFixed(1)}°C is outside the physical plausibility range (${TEMP_MIN_C}°C to ${TEMP_MAX_C}°C). This is a basic data-entry check, not an official climate classification.`;
    }
  }

  // Date
  if (!form.obsDate) {
    errors.obsDate = 'Observation date is required.';
  } else if (form.obsDate > TODAY) {
    errors.obsDate = 'Future dates are not accepted — this form records readings that have already occurred.';
  }

  // Time
  if (!form.obsTime) {
    errors.obsTime = 'Observation time is required.';
  }

  // Timezone (always set by default, but guard anyway)
  if (!form.timezone) {
    errors.timezone = 'Timezone is required.';
  }

  // State & city
  if (!form.state) {
    errors.state = 'State / region is required.';
  }
  if (!form.city.trim()) {
    errors.city = 'City / locality is required.';
  }

  // Coordinates (optional but must be valid pairs if provided)
  const latProvided = form.latitude.trim() !== '';
  const lonProvided = form.longitude.trim() !== '';
  if (latProvided || lonProvided) {
    if (!latProvided) {
      errors.latitude = 'Latitude is required when longitude is provided.';
    } else {
      const lat = parseFloat(form.latitude);
      if (isNaN(lat) || lat < -90 || lat > 90) {
        errors.latitude = 'Latitude must be a number between −90 and 90.';
      }
    }
    if (!lonProvided) {
      errors.longitude = 'Longitude is required when latitude is provided.';
    } else {
      const lon = parseFloat(form.longitude);
      if (isNaN(lon) || lon < -180 || lon > 180) {
        errors.longitude = 'Longitude must be a number between −180 and 180.';
      }
    }
  }

  // Source
  if (!form.source) {
    errors.source = 'Source of reading is required.';
  }
  if (form.source === 'other_documented' && !form.sourceOther.trim()) {
    errors.sourceOther = 'Please specify the source when "Other documented source" is selected.';
  }

  // Measurement type
  if (!form.measurementType) {
    errors.measurementType = 'Measurement type is required.';
  }

  // Notes max length
  if (form.notes.length > 500) {
    errors.notes = 'Additional notes must not exceed 500 characters.';
  }

  return errors;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SubmitReading() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [touched, setTouched] = useState(INITIAL_TOUCHED);
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [sessionReadings, setSessionReadings] = useState([]);
  const [successMsg, setSuccessMsg] = useState(null);

  // Compute live errors only for touched fields
  const liveErrors = useCallback(() => {
    const allErrors = validate(form);
    const filtered = {};
    Object.keys(allErrors).forEach(k => {
      if (touched[k]) filtered[k] = allErrors[k];
    });
    return filtered;
  }, [form, touched]);

  const currentErrors = liveErrors();

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
    setSuccessMsg(null);
  }

  function handleBlur(field) {
    setTouched(prev => ({ ...prev, [field]: true }));
  }

  function touchAll() {
    setTouched(Object.fromEntries(Object.keys(INITIAL_FORM).map(k => [k, true])));
  }

  function handleSubmitClick() {
    touchAll();
    const allErrors = validate(form);
    setErrors(allErrors);
    if (Object.keys(allErrors).length === 0) {
      setShowConfirm(true);
    } else {
      // Focus first error field
      const firstKey = Object.keys(allErrors)[0];
      const el = document.getElementById(`field-${firstKey}`);
      if (el) el.focus();
    }
  }

  function handleConfirm() {
    const celsius = toCelsius(form.tempValue, form.tempUnit);
    const reading = {
      id: Date.now(),
      tempCelsius: parseFloat(celsius.toFixed(2)),
      tempDisplay: `${form.tempValue}°${form.tempUnit}${form.tempUnit === 'F' ? ` (${celsius.toFixed(1)}°C)` : ''}`,
      obsDate: form.obsDate,
      obsTime: form.obsTime,
      timezone: form.timezone,
      state: form.state,
      city: form.city,
      locationDesc: form.locationDesc,
      latitude: form.latitude,
      longitude: form.longitude,
      source: form.source,
      sourceOther: form.sourceOther,
      measurementType: form.measurementType,
      measurementOther: form.measurementOther,
      notes: form.notes,
    };
    setSessionReadings(prev => [reading, ...prev]);
    setShowConfirm(false);
    setSuccessMsg('Reading validated successfully in this demo. No data was sent to a server or permanently saved.');
    // Reset form
    setForm(INITIAL_FORM);
    setTouched(INITIAL_TOUCHED);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleClearSession() {
    setSessionReadings([]);
  }

  const allErrors = validate(form);
  const isFormValid = Object.keys(allErrors).length === 0;
  const celsius = toCelsius(form.tempValue, form.tempUnit);
  const displayCelsius = !isNaN(celsius) ? parseFloat(celsius.toFixed(2)) : null;

  return (
    <div className="flex flex-col gap-6 pb-16">

      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 border-b border-outline-variant/30 pb-5">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-outline font-mono" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-on-surface-variant font-semibold">Submit a Reading</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary font-semibold">
              <Thermometer size={14} />
              <span>Field Observation Entry — TF-141</span>
            </div>
            <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
              Submit a Temperature Reading
            </h1>
            <p className="font-body text-sm text-on-surface-variant max-w-2xl leading-relaxed">
              Contribute a temperature reading to support HeatShield's exploration of temperature patterns across India.
            </p>
          </div>

          {/* Demo-only badge */}
          <div className="inline-flex items-center gap-1.5 self-start sm:self-auto px-2.5 py-1 rounded bg-tertiary-container/15 border border-tertiary-container/40 text-[11px] font-mono text-tertiary shrink-0">
            <Info size={12} />
            <span>Frontend Demo — No server calls</span>
          </div>
        </div>
      </div>

      {/* ── Info Banner ─────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-xs text-on-surface-variant leading-relaxed">
        <Info size={16} className="text-primary shrink-0 mt-0.5" />
        <p>
          Enter the temperature, observation date and time, location, and source.{' '}
          <strong className="text-on-surface">Submitted readings in this frontend demonstration are not sent to a server or permanently stored.</strong>
        </p>
      </div>

      {/* ── Success Banner ──────────────────────────────────────────────────── */}
      {successMsg && (
        <div className="flex items-center gap-3 bg-secondary/10 border border-secondary/30 rounded-xl px-4 py-3 text-sm font-semibold text-secondary">
          <CheckCircle2 size={18} className="shrink-0" />
          <span className="flex-1">{successMsg}</span>
          <button
            onClick={() => setSuccessMsg(null)}
            aria-label="Dismiss"
            className="p-0.5 rounded hover:bg-secondary/20 text-secondary transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* ── Two-column layout ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

        {/* ── LEFT: Form ──────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-5">

          {/* Source Transparency notice */}
          <div className="flex items-start gap-2 text-[11px] text-outline bg-surface-container-low border border-outline-variant/20 rounded-lg px-3 py-2">
            <AlertCircle size={13} className="text-amber-400 shrink-0 mt-0.5" />
            <span>
              Source labels describe the information supplied by the user. They do not independently verify the reading.
            </span>
          </div>

          {/* ── Section A: Temperature ─────────────────────────────────────── */}
          <section className="bg-surface-container rounded-2xl p-5 border border-outline-variant/30 flex flex-col gap-4">
            <SectionHeader icon={Thermometer} label="01" title="Temperature" />

            <TemperatureInput
              value={form.tempValue}
              unit={form.tempUnit}
              onChange={(value) => handleChange('tempValue', value)}
              onUnitChange={(unit) => handleChange('tempUnit', unit)}
              onBlur={() => handleBlur('tempValue')}
              error={currentErrors.tempValue}
              displayCelsius={displayCelsius}
            />
          </section>

          {/* ── Section B: Date & Time ─────────────────────────────────────── */}
          <section className="bg-surface-container rounded-2xl p-5 border border-outline-variant/30 flex flex-col gap-4">
            <SectionHeader icon={ClipboardList} label="02" title="Observation Date & Time" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                id="field-obsDate"
                label="Observation Date"
                required
                error={currentErrors.obsDate}
                hint="Historical readings only; future dates are not accepted."
              >
                <input
                  id="field-obsDate"
                  type="date"
                  max={TODAY}
                  value={form.obsDate}
                  onChange={e => handleChange('obsDate', e.target.value)}
                  onBlur={() => handleBlur('obsDate')}
                  className={inputClass(currentErrors.obsDate)}
                />
              </FormField>

              <FormField
                id="field-obsTime"
                label="Observation Time"
                required
                error={currentErrors.obsTime}
                hint="24-hour format (HH:MM)."
              >
                <input
                  id="field-obsTime"
                  type="time"
                  value={form.obsTime}
                  onChange={e => handleChange('obsTime', e.target.value)}
                  onBlur={() => handleBlur('obsTime')}
                  className={inputClass(currentErrors.obsTime)}
                />
              </FormField>
            </div>

            <FormField
              id="field-timezone"
              label="Timezone"
              required
              error={currentErrors.timezone}
              hint="Default: Asia/Kolkata (IST, UTC+05:30), matching the India-focused workflow."
            >
              <select
                id="field-timezone"
                value={form.timezone}
                onChange={e => handleChange('timezone', e.target.value)}
                onBlur={() => handleBlur('timezone')}
                className={selectClass(currentErrors.timezone)}
              >
                <option value="Asia/Kolkata">Asia/Kolkata — IST (UTC+05:30)</option>
                <option value="UTC">UTC (UTC+00:00)</option>
                <option value="Asia/Dubai">Asia/Dubai — GST (UTC+04:00)</option>
                <option value="Asia/Singapore">Asia/Singapore — SGT (UTC+08:00)</option>
                <option value="Europe/London">Europe/London — GMT/BST</option>
                <option value="America/New_York">America/New_York — EST/EDT</option>
              </select>
            </FormField>
          </section>

          {/* ── Section C: Location ───────────────────────────────────────── */}
          <section className="bg-surface-container rounded-2xl p-5 border border-outline-variant/30 flex flex-col gap-4">
            <SectionHeader icon={MapPin} label="03" title="Geographic Location" />
            <LocationFields
              form={form}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={currentErrors}
            />
          </section>

          {/* ── Section D: Source & Measurement ─────────────────────────── */}
          <section className="bg-surface-container rounded-2xl p-5 border border-outline-variant/30 flex flex-col gap-4">
            <SectionHeader icon={ClipboardList} label="04" title="Source & Measurement Type" />

            <SourceSelector
              value={form.source}
              otherValue={form.sourceOther}
              onChange={(v) => handleChange('source', v)}
              onOtherChange={(v) => handleChange('sourceOther', v)}
              onBlur={() => handleBlur('source')}
              onOtherBlur={() => handleBlur('sourceOther')}
              error={currentErrors.source}
              otherError={currentErrors.sourceOther}
            />

            <MeasurementTypeSelector
              value={form.measurementType}
              otherValue={form.measurementOther}
              onChange={(v) => handleChange('measurementType', v)}
              onOtherChange={(v) => handleChange('measurementOther', v)}
              onBlur={() => handleBlur('measurementType')}
              error={currentErrors.measurementType}
            />
          </section>

          {/* ── Section E: Notes ──────────────────────────────────────────── */}
          <section className="bg-surface-container rounded-2xl p-5 border border-outline-variant/30 flex flex-col gap-4">
            <SectionHeader icon={ClipboardList} label="05" title="Additional Notes" optional />

            <FormField
              id="field-notes"
              label="Additional Notes"
              optional
              error={currentErrors.notes}
              hint="Instrument type, measurement conditions, weather, data-quality notes. Max 500 characters."
            >
              <div className="relative">
                <textarea
                  id="field-notes"
                  rows={4}
                  maxLength={600}
                  placeholder="e.g. Observed using a Stevenson screen thermometer at 2 m height. Clear sky, no shade. Wind speed approx. 12 km/h…"
                  value={form.notes}
                  onChange={e => handleChange('notes', e.target.value)}
                  onBlur={() => handleBlur('notes')}
                  className={`${inputClass(currentErrors.notes)} resize-none font-body text-sm`}
                />
                <span className={`absolute bottom-2 right-3 text-[10px] font-mono ${form.notes.length > 500 ? 'text-red-400' : 'text-outline'}`}>
                  {form.notes.length} / 500
                </span>
              </div>
            </FormField>
          </section>

          {/* ── Submit Button ─────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleSubmitClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-headline font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-primary transition-all shadow-lg group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} className="group-hover:translate-x-0.5 transition-transform" />
              <span>Submit Reading</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setForm(INITIAL_FORM);
                setTouched(INITIAL_TOUCHED);
                setErrors({});
                setSuccessMsg(null);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface-container-high hover:bg-surface-bright text-on-surface-variant font-semibold text-sm px-5 py-3.5 rounded-xl border border-outline-variant/40 transition-colors"
            >
              <Trash2 size={14} />
              <span>Reset Form</span>
            </button>

            {Object.keys(validate(form)).length > 0 && Object.values(touched).some(Boolean) && (
              <span className="text-xs text-red-400 font-mono">
                {Object.keys(validate(form)).length} field{Object.keys(validate(form)).length > 1 ? 's' : ''} need attention
              </span>
            )}
          </div>
        </div>

        {/* ── RIGHT: Preview Panel ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-20">
          <ReadingPreview form={form} displayCelsius={displayCelsius} />
        </div>
      </div>

      {/* ── Session Preview ──────────────────────────────────────────────────── */}
      {sessionReadings.length > 0 && (
        <SessionPreview readings={sessionReadings} onClear={handleClearSession} />
      )}

      {/* ── Confirmation Dialog ──────────────────────────────────────────────── */}
      {showConfirm && (
        <ReadingConfirmationDialog
          form={form}
          displayCelsius={displayCelsius}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function inputClass(error) {
  return `w-full bg-surface-container-low border rounded-lg px-3 py-2.5 text-sm text-on-surface placeholder-outline focus:outline-none focus:ring-2 transition-colors ${
    error
      ? 'border-red-500/60 focus:ring-red-500/30'
      : 'border-outline-variant/40 focus:ring-primary/30 focus:border-primary/50'
  }`;
}

export function selectClass(error) {
  return `w-full bg-surface-container-low border rounded-lg px-3 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 transition-colors appearance-none cursor-pointer ${
    error
      ? 'border-red-500/60 focus:ring-red-500/30'
      : 'border-outline-variant/40 focus:ring-primary/30 focus:border-primary/50'
  }`;
}

function SectionHeader({ icon: Icon, label, title, optional }) {
  return (
    <div className="flex items-center gap-2 pb-1 border-b border-outline-variant/20">
      <div className="w-6 h-6 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
        {label}
      </div>
      <Icon size={15} className="text-primary shrink-0" />
      <span className="font-headline font-bold text-sm text-on-surface">{title}</span>
      {optional && (
        <span className="text-[10px] text-outline border border-outline-variant/30 rounded px-1.5 py-0.5 font-mono ml-auto">
          Optional
        </span>
      )}
    </div>
  );
}
