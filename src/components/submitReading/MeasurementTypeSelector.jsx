import React from 'react';
import FormField from './FormField';
import { selectClass, inputClass } from '../../pages/SubmitReading';

const MEASUREMENT_OPTIONS = [
  { value: '', label: '— Select measurement type —' },
  { value: 'daily_max_air', label: 'Daily maximum air temperature' },
  { value: 'daily_min_air', label: 'Daily minimum air temperature' },
  { value: 'point_air', label: 'Air temperature at a specific observation time' },
  { value: 'daily_mean_air', label: 'Daily mean air temperature' },
  { value: 'land_surface', label: 'Land-surface temperature (LST / skin temperature)' },
  { value: 'other', label: 'Other / unspecified' },
];

const LST_WARNING = 'Land-surface temperature (LST) is measured via satellite thermal infrared or surface pyrometers. It is fundamentally different from air temperature — LST is not interchangeable with T_air.';

export default function MeasurementTypeSelector({
  value,
  otherValue,
  onChange,
  onOtherChange,
  onBlur,
  error,
}) {
  const isLST = value === 'land_surface';
  const isOther = value === 'other';

  return (
    <div className="flex flex-col gap-3">
      <FormField
        id="field-measurementType"
        label="Measurement Type"
        required
        error={error}
        hint="Air temperature and land-surface temperature are different measurements and must not be treated as interchangeable."
      >
        <select
          id="field-measurementType"
          value={value}
          onChange={e => onChange(e.target.value)}
          onBlur={onBlur}
          className={selectClass(error)}
        >
          {MEASUREMENT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </FormField>

      {/* LST clarification notice */}
      {isLST && (
        <div className="text-[11px] text-amber-300 bg-amber-400/5 border border-amber-400/20 rounded-lg px-3 py-2 leading-relaxed">
          {LST_WARNING}
        </div>
      )}

      {/* Other description */}
      {isOther && (
        <FormField
          id="field-measurementOther"
          label="Describe Measurement"
          optional
          hint="Optional: briefly describe the measurement type."
        >
          <input
            id="field-measurementOther"
            type="text"
            placeholder="e.g. Wet-bulb temperature at 10 m height"
            value={otherValue}
            onChange={e => onOtherChange(e.target.value)}
            className={inputClass(undefined)}
          />
        </FormField>
      )}
    </div>
  );
}
