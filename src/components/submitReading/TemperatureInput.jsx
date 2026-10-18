import React from 'react';
import { Thermometer, ArrowRight } from 'lucide-react';
import FormField from './FormField';

const TEMP_MIN_C = -90;
const TEMP_MAX_C = 60;

export default function TemperatureInput({
  value,
  unit,
  onChange,
  onUnitChange,
  onBlur,
  error,
  displayCelsius,
}) {
  return (
    <div className="flex flex-col gap-3">
      <FormField
        id="field-tempValue"
        label="Temperature"
        required
        error={error}
        hint={
          !error
            ? `Valid physical range: ${TEMP_MIN_C}°C to ${TEMP_MAX_C}°C (basic data-entry check, not an official climate classification).`
            : undefined
        }
      >
        <div className="flex gap-2">
          {/* Numeric input */}
          <div className="relative flex-1">
            <Thermometer size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
            <input
              id="field-tempValue"
              type="number"
              inputMode="decimal"
              step="0.1"
              placeholder={unit === 'C' ? 'e.g. 32.5' : 'e.g. 90.5'}
              value={value}
              onChange={e => onChange(e.target.value)}
              onBlur={onBlur}
              aria-label="Temperature value"
              className={`w-full bg-surface-container-low border rounded-lg pl-9 pr-14 py-2.5 text-sm text-on-surface placeholder-outline focus:outline-none focus:ring-2 transition-colors ${
                error
                  ? 'border-red-500/60 focus:ring-red-500/30'
                  : 'border-outline-variant/40 focus:ring-primary/30 focus:border-primary/50'
              }`}
            />
            {/* Unit suffix */}
            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-primary text-sm pointer-events-none">
              °{unit}
            </span>
          </div>

          {/* C / F toggle */}
          <div className="flex rounded-lg border border-outline-variant/40 overflow-hidden shrink-0">
            {['C', 'F'].map(u => (
              <button
                key={u}
                type="button"
                onClick={() => onUnitChange(u)}
                aria-pressed={unit === u}
                className={`px-3 py-2 text-xs font-bold transition-colors ${
                  unit === u
                    ? 'bg-primary-container text-on-primary-container'
                    : 'bg-surface-container-low text-outline hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                °{u}
              </button>
            ))}
          </div>
        </div>
      </FormField>

      {/* Celsius conversion display */}
      {unit === 'F' && displayCelsius !== null && (
        <div className="flex items-center gap-2 text-xs bg-surface-container-low/60 border border-outline-variant/20 rounded-lg px-3 py-2 font-mono text-on-surface-variant">
          <span>{value}°F</span>
          <ArrowRight size={12} className="text-outline" />
          <span className="font-bold text-primary">{displayCelsius}°C</span>
          <span className="text-outline ml-auto">Normalized to Celsius for validation</span>
        </div>
      )}

      {/* Entered value annotation */}
      {displayCelsius !== null && (
        <p className="text-[11px] text-outline leading-relaxed">
          {unit === 'F'
            ? `You selected °F. The converted value (${displayCelsius}°C) is used for validation. The submission will record your original °F value and the converted °C value.`
            : 'You are entering in °C. Entered directly as degrees Celsius.'}
        </p>
      )}
    </div>
  );
}
