import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Layers, 
  MapPin, 
  Compass, 
  Focus, 
  Info, 
  RotateCw, 
  Thermometer, 
  Sun, 
  ShieldAlert,
  Search,
  ExternalLink
} from 'lucide-react';
import HeatMap from '../components/map/HeatMap';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { fetchHeatmapGeoJSON, fetchAvailableDates } from '../services/heatmapService';

export default function IndiaHeatMap() {
  const [region, setRegion] = useState('india'); // 'india' or 'solapur'
  const [selectedDate, setSelectedDate] = useState('2024-04-15');
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState('air_temp');
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const loadMapData = async () => {
    setLoading(true);
    setError(null);
    try {
      const dates = await fetchAvailableDates();
      setAvailableDates(dates);
      const data = await fetchHeatmapGeoJSON(selectedDate, region);
      setGeoData(data);
    } catch (err) {
      setError(err.message || 'Error fetching geospatial telemetry data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMapData();
  }, [selectedDate, region]);

  // Derive stats from active GeoJSON features
  const features = geoData?.features || [];
  const validTemps = features
    .map(f => selectedLayer === 'surface_lst' ? (f.properties.land_surface_temp_c || f.properties.temperature_c) : f.properties.temperature_c)
    .filter(t => t !== undefined && t !== null && !isNaN(t));

  const maxTemp = validTemps.length ? Math.max(...validTemps) : null;
  const minTemp = validTemps.length ? Math.min(...validTemps) : null;
  const avgTemp = validTemps.length ? (validTemps.reduce((a, b) => a + b, 0) / validTemps.length).toFixed(1) : null;

  return (
    <div className="flex flex-col gap-5 pb-12">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
              Geographic Cartography & Telemetry Net
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-secondary/10 text-secondary text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              CartoDB Dark Matter Base
            </span>
          </div>
          <h1 className="font-headline font-extrabold text-2xl lg:text-3xl text-on-surface tracking-tight mt-0.5">
            Spatial Heat Distribution & Sensor Network
          </h1>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={loadMapData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-medium text-on-surface border border-outline-variant/30 transition-colors"
          >
            <RotateCw size={14} className={loading ? 'animate-spin text-primary' : 'text-outline'} />
            <span>Sync Network</span>
          </button>
        </div>
      </div>

      {/* 2. Control Toolbar */}
      <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/30 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        {/* Date Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-mono text-outline flex items-center gap-1">
            <Calendar size={13} className="text-primary" />
            <span>Date:</span>
          </label>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-surface-container text-on-surface text-xs rounded-lg px-2.5 py-1.5 border border-outline-variant/40 focus:outline-none focus:border-primary font-mono cursor-pointer"
          >
            {availableDates.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* View Focus Selector */}
        <div className="flex items-center gap-1 bg-surface-container p-0.5 rounded-lg border border-outline-variant/40">
          <button
            type="button"
            onClick={() => setRegion('india')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              region === 'india'
                ? 'bg-primary-container text-on-primary-container shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Compass size={13} />
            <span>India National Grid (0.5°)</span>
          </button>

          <button
            type="button"
            onClick={() => setRegion('solapur')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              region === 'solapur'
                ? 'bg-primary-container text-on-primary-container shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Focus size={13} />
            <span>Solapur High-Res (100 Sites)</span>
          </button>
        </div>

        {/* Metric Layer Toggle */}
        <div className="flex items-center gap-1 bg-surface-container p-0.5 rounded-lg border border-outline-variant/40">
          <button
            type="button"
            onClick={() => setSelectedLayer('air_temp')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              selectedLayer === 'air_temp'
                ? 'bg-surface-container-high text-primary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Ambient Air (T2M)
          </button>
          <button
            type="button"
            onClick={() => setSelectedLayer('surface_lst')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              selectedLayer === 'surface_lst'
                ? 'bg-surface-container-high text-tertiary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Surface LST
          </button>
          {region === 'solapur' && (
            <button
              type="button"
              onClick={() => setSelectedLayer('cooling_score')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                selectedLayer === 'cooling_score'
                  ? 'bg-surface-container-high text-secondary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Cooling Priority
            </button>
          )}
        </div>
      </div>

      {/* 3. Quick Telemetry Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-surface-container px-3.5 py-2.5 rounded-lg border border-outline-variant/30 flex flex-col">
          <span className="text-[10px] font-mono uppercase text-outline">Observations in View</span>
          <span className="font-headline font-bold text-lg text-on-surface mt-0.5">
            {features.length} {region === 'solapur' ? 'Microclimate Sites' : 'Grid Nodes'}
          </span>
        </div>

        <div className="bg-surface-container px-3.5 py-2.5 rounded-lg border border-outline-variant/30 flex flex-col">
          <span className="text-[10px] font-mono uppercase text-outline">Mean Metric in View</span>
          <span className="font-headline font-bold text-lg text-primary mt-0.5">
            {avgTemp ? `${avgTemp}°C` : '—'}
          </span>
        </div>

        <div className="bg-surface-container px-3.5 py-2.5 rounded-lg border border-outline-variant/30 flex flex-col">
          <span className="text-[10px] font-mono uppercase text-outline">Peak Reading in View</span>
          <span className="font-headline font-bold text-lg text-red-400 mt-0.5">
            {maxTemp !== null ? `${maxTemp}°C` : '—'}
          </span>
        </div>

        <div className="bg-surface-container px-3.5 py-2.5 rounded-lg border border-outline-variant/30 flex flex-col">
          <span className="text-[10px] font-mono uppercase text-outline">Minimum Reading in View</span>
          <span className="font-headline font-bold text-lg text-secondary mt-0.5">
            {minTemp !== null ? `${minTemp}°C` : '—'}
          </span>
        </div>
      </div>

      {/* 4. Interactive Map Stage */}
      {loading ? (
        <LoadingState message="Rendering Leaflet geospatial layers & spatial coordinates..." />
      ) : error ? (
        <ErrorState message={error} onRetry={loadMapData} />
      ) : (
        <HeatMap
          geoData={geoData}
          region={region}
          onRegionChange={(newRegion) => setRegion(newRegion)}
          activeDate={selectedDate}
          selectedLayer={selectedLayer}
          onLayerChange={(newLayer) => setSelectedLayer(newLayer)}
        />
      )}

      {/* 5. Scientific Methodology Notice */}
      <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 flex items-start gap-3">
        <Info size={18} className="text-primary shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1 text-xs text-on-surface-variant leading-relaxed">
          <span className="font-semibold text-on-surface">
            NASA POWER & Solapur Microclimate Cartography Notes
          </span>
          <p>
            India-wide grid points are mapped from 0.5° × 0.5° reanalysis data conventions (NASA POWER parameter <code>T2M_MAX</code>). Solapur station coordinates represent 100 stationary microclimate sensors across 9 urban morphological zones. Click any circular marker to inspect local ambient air temperature, surface infrared skin ($LST$), vegetation index ($NDVI$), and algorithmic cooling interventions.
          </p>
        </div>
      </div>
    </div>
  );
}
