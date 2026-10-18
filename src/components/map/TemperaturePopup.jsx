import React from 'react';
import { getHeatRiskBadge, getZoneBadge } from '../../utils/temperatureColors';
import { Thermometer, Wind, ShieldAlert, Sparkles, MapPin } from 'lucide-react';

export default function TemperaturePopup({ properties }) {
  if (!properties) return null;

  const {
    location_name,
    grid_id,
    zone,
    state,
    temperature_c,
    land_surface_temp_c,
    ndvi,
    cooling_priority_score,
    recommended_intervention,
    risk_category,
    date,
    source,
    measurement_type,
    spatial_resolution,
    latitude,
    longitude,
    elevation_m
  } = properties;

  const riskBadge = getHeatRiskBadge(risk_category);
  const zoneBadgeClass = getZoneBadge(zone);

  return (
    <div className="p-3.5 flex flex-col gap-2.5 max-w-[280px] text-xs">
      {/* Header */}
      <div className="flex flex-col border-b border-outline-variant/30 pb-2">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] text-primary uppercase tracking-wider font-semibold">
            {grid_id || 'STATION'}
          </span>
          {risk_category && (
            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold border ${riskBadge.bg} ${riskBadge.text} ${riskBadge.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${riskBadge.dot}`} />
              {risk_category} Risk
            </span>
          )}
        </div>
        <h4 className="font-headline font-bold text-sm text-on-surface mt-0.5 leading-snug">
          {location_name || 'Monitoring Station'}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          {zone && (
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${zoneBadgeClass}`}>
              {zone} Zone
            </span>
          )}
          {state && (
            <span className="text-[11px] text-outline font-medium">
              {state}
            </span>
          )}
        </div>
      </div>

      {/* Temperature Metrics Display */}
      <div className="grid grid-cols-2 gap-2 bg-surface-container-lowest/80 p-2 rounded-lg border border-outline-variant/20">
        <div className="flex flex-col">
          <span className="text-[10px] text-outline uppercase font-mono">Air Temp</span>
          <div className="flex items-baseline gap-0.5 mt-0.5">
            <span className="font-headline font-bold text-lg text-primary">
              {temperature_c !== undefined && temperature_c !== null ? `${temperature_c}°` : 'N/A'}
            </span>
            <span className="text-[10px] text-on-surface-variant">C</span>
          </div>
        </div>

        {land_surface_temp_c !== undefined && (
          <div className="flex flex-col">
            <span className="text-[10px] text-outline uppercase font-mono">Surface LST</span>
            <div className="flex items-baseline gap-0.5 mt-0.5">
              <span className="font-headline font-bold text-lg text-tertiary">
                {`${land_surface_temp_c}°`}
              </span>
              <span className="text-[10px] text-on-surface-variant">C</span>
            </div>
          </div>
        )}
      </div>

      {/* Environmental & Intervention details */}
      {(cooling_priority_score || recommended_intervention) && (
        <div className="flex flex-col gap-1 bg-surface-container/60 p-2 rounded border border-outline-variant/20">
          {cooling_priority_score && (
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-outline">Cooling Priority:</span>
              <span className="font-bold text-secondary font-mono">
                {cooling_priority_score} / 100
              </span>
            </div>
          )}
          {recommended_intervention && (
            <div className="text-[10px] text-on-surface leading-tight mt-0.5">
              <span className="text-outline font-medium">Intervention: </span>
              {recommended_intervention}
            </div>
          )}
        </div>
      )}

      {/* Metadata & Geo Coordinates */}
      <div className="flex flex-col gap-1 text-[10px] text-outline pt-1 border-t border-outline-variant/20 font-mono">
        {latitude !== undefined && longitude !== undefined && (
          <div className="flex items-center gap-1">
            <MapPin size={10} className="text-secondary shrink-0" />
            <span>{latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E</span>
            {elevation_m && <span> · {elevation_m}m MSL</span>}
          </div>
        )}
        <div className="flex items-center justify-between text-[9px] text-outline/80 mt-0.5">
          <span>{source || 'NASA POWER'}</span>
          <span>{date || '2024-04-15'}</span>
        </div>
      </div>
    </div>
  );
}
