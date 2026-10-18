import React from 'react';
import FormField from './FormField';
import { selectClass, inputClass } from '../../pages/SubmitReading';

const SOURCE_OPTIONS = [
  { value: '', label: '— Select source —' },
  { value: 'personal_thermometer', label: 'Personal thermometer or local sensor' },
  { value: 'weather_station', label: 'Weather station' },
  { value: 'nasa_power', label: 'NASA POWER or another documented climate-data source' },
  { value: 'official_met', label: 'Official meteorological source (IMD, WMO, etc.)' },
  { value: 'other_documented', label: 'Other documented source' },
];

// Sources that optionally benefit from a clarification field
const CLARIFICATION_SOURCES = new Set(['personal_thermometer', 'weather_station']);

export default function SourceSelector({
  value,
  otherValue,
  onChange,
  onOtherChange,
  onBlur,
  onOtherBlur,
  error,
  otherError,
}) {
  const needsOther = value === 'other_documented';
  const showClarification = CLARIFICATION_SOURCES.has(value);

  return (
    <div className="flex flex-col gap-3">
      <FormField
        id="field-source"
        label="Source of Reading"
        required
        error={error}
        hint="Identify where the temperature value came from. Source labels do not independently verify the reading."
      >
        <select
          id="field-source"
          value={value}
          onChange={e => onChange(e.target.value)}
          onBlur={onBlur}
          className={selectClass(error)}
        >
          {SOURCE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </FormField>

      {/* Conditional: Other source specification (required) */}
      {needsOther && (
        <FormField
          id="field-sourceOther"
          label="Specify Source"
          required
          error={otherError}
          hint="Enter the source name, URL, or reference (e.g. 'AccuWeather station ID: XYZ', 'IMD Pune station daily bulletin')."
        >
          <input
            id="field-sourceOther"
            type="text"
            placeholder="e.g. IMD Solapur daily bulletin, AccuWeather report 2024-04-15"
            value={otherValue}
            onChange={e => onOtherChange(e.target.value)}
            onBlur={onOtherBlur}
            className={inputClass(otherError)}
          />
        </FormField>
      )}

      {/* Optional clarification for station / sensor sources */}
      {showClarification && (
        <FormField
          id="field-sourceClarify"
          label="Source Description"
          optional
          hint="Optional: instrument model, station name, or additional source detail."
        >
          <input
            id="field-sourceClarify"
            type="text"
            placeholder="e.g. Stevenson screen thermometer, AWS-04 station Solapur"
            value={otherValue}
            onChange={e => onOtherChange(e.target.value)}
            className={inputClass(undefined)}
          />
        </FormField>
      )}
    </div>
  );
}
