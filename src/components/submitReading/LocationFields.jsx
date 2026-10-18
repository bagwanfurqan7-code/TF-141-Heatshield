import React, { useState } from 'react';
import { MapPin, Navigation, RotateCcw, Info } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import FormField from './FormField';
import { inputClass, selectClass } from '../../pages/SubmitReading';

// Fix Leaflet default icon missing in Vite builds
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// India states + UTs (complete list)
const INDIA_STATES = [
  '', // placeholder
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  // Union Territories
  'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi (NCT)',
  'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

// Marker click handler inside MapContainer
function ClickHandler({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(
        parseFloat(e.latlng.lat.toFixed(6)),
        parseFloat(e.latlng.lng.toFixed(6))
      );
    },
  });
  return null;
}

const INDIA_CENTER = [22.5, 79.0];
const INDIA_ZOOM = 4;

export default function LocationFields({ form, onChange, onBlur, errors }) {
  const [showMap, setShowMap] = useState(false);

  const hasCoords =
    form.latitude.trim() !== '' && form.longitude.trim() !== '';
  const lat = parseFloat(form.latitude);
  const lon = parseFloat(form.longitude);
  const validCoords = !isNaN(lat) && !isNaN(lon) &&
    lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;

  function handleMapSelect(lat, lon) {
    onChange('latitude', String(lat));
    onChange('longitude', String(lon));
  }

  function resetLocation() {
    onChange('latitude', '');
    onChange('longitude', '');
  }

  return (
    <div className="flex flex-col gap-4">

      {/* State */}
      <FormField
        id="field-state"
        label="State / Region"
        required
        error={errors.state}
        hint="Select the Indian state or union territory where the reading was observed."
      >
        <select
          id="field-state"
          value={form.state}
          onChange={e => onChange('state', e.target.value)}
          onBlur={() => onBlur('state')}
          className={selectClass(errors.state)}
        >
          <option value="">— Select state or UT —</option>
          {INDIA_STATES.filter(s => s !== '').map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </FormField>

      {/* City */}
      <FormField
        id="field-city"
        label="City / Locality"
        required
        error={errors.city}
        hint="Free text — enter any locality name, e.g. Solapur, Pune, Nagpur."
      >
        <div className="relative">
          <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
          <input
            id="field-city"
            type="text"
            placeholder="e.g. Solapur"
            value={form.city}
            onChange={e => onChange('city', e.target.value)}
            onBlur={() => onBlur('city')}
            className={`${inputClass(errors.city)} pl-8`}
          />
        </div>
      </FormField>

      {/* Location description */}
      <FormField
        id="field-locationDesc"
        label="Location Description"
        optional
        hint="Additional context, e.g. 'Near SMC building, road corridor, open rooftop'."
      >
        <input
          id="field-locationDesc"
          type="text"
          placeholder="e.g. Open terrace, east-facing, no shade"
          value={form.locationDesc}
          onChange={e => onChange('locationDesc', e.target.value)}
          className={inputClass(undefined)}
        />
      </FormField>

      {/* Coordinates */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            Coordinates <span className="text-outline font-normal normal-case text-[10px] ml-1">(optional)</span>
          </span>
          <button
            type="button"
            onClick={() => setShowMap(v => !v)}
            className="inline-flex items-center gap-1.5 text-[11px] text-primary hover:text-primary/80 font-semibold transition-colors border border-primary/30 rounded px-2 py-0.5 hover:bg-primary/5"
          >
            <MapPin size={11} />
            {showMap ? 'Hide map' : 'Pick on map'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField id="field-latitude" label="Latitude" error={errors.latitude}>
            <div className="relative">
              <Navigation size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
              <input
                id="field-latitude"
                type="number"
                step="0.000001"
                placeholder="e.g. 17.6599"
                value={form.latitude}
                onChange={e => onChange('latitude', e.target.value)}
                onBlur={() => onBlur('latitude')}
                className={`${inputClass(errors.latitude)} pl-8`}
              />
            </div>
          </FormField>

          <FormField id="field-longitude" label="Longitude" error={errors.longitude}>
            <div className="relative">
              <Navigation size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-outline rotate-90 pointer-events-none" />
              <input
                id="field-longitude"
                type="number"
                step="0.000001"
                placeholder="e.g. 75.9064"
                value={form.longitude}
                onChange={e => onChange('longitude', e.target.value)}
                onBlur={() => onBlur('longitude')}
                className={`${inputClass(errors.longitude)} pl-8`}
              />
            </div>
          </FormField>
        </div>

        {hasCoords && (
          <button
            type="button"
            onClick={resetLocation}
            className="self-start inline-flex items-center gap-1.5 text-[11px] text-outline hover:text-on-surface transition-colors"
          >
            <RotateCcw size={11} />
            Reset coordinates
          </button>
        )}

        {/* Map disclaimer */}
        {showMap && (
          <div className="flex items-start gap-1.5 text-[10px] text-outline bg-surface-container-low border border-outline-variant/20 rounded px-2.5 py-1.5 mt-1">
            <Info size={11} className="shrink-0 mt-0.5 text-amber-400" />
            <span>
              Click on the map to set approximate coordinates. Manually selected points are not verified as exact observation locations. You can also type coordinates directly in the fields above.
            </span>
          </div>
        )}
      </div>

      {/* Leaflet map */}
      {showMap && (
        <div className="w-full rounded-xl overflow-hidden border border-outline-variant/30 shadow-md" style={{ height: '280px' }}>
          <MapContainer
            center={validCoords ? [lat, lon] : INDIA_CENTER}
            zoom={validCoords ? 10 : INDIA_ZOOM}
            style={{ height: '100%', width: '100%' }}
            zoomControl
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickHandler onSelect={handleMapSelect} />
            {validCoords && <Marker position={[lat, lon]} />}
          </MapContainer>
        </div>
      )}
    </div>
  );
}
