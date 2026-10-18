import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getTemperatureColor } from '../../utils/temperatureColors';
import HeatMapLegend from './HeatMapLegend';
import TemperaturePopup from './TemperaturePopup';
import { Maximize2, Minimize2, RotateCcw, Layers, Compass, Focus } from 'lucide-react';

// Controller component to smoothly pan/zoom map on state change
function MapViewController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.2,
      easeLinearity: 0.25
    });
  }, [center, zoom, map]);

  // Handle Leaflet container resize
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [map]);

  return null;
}

export default function HeatMap({
  geoData,
  region = 'india',
  onRegionChange,
  activeDate,
  selectedLayer = 'air_temp',
  onLayerChange,
  isLoading = false
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [internalLayer, setInternalLayer] = useState(selectedLayer);

  const isSolapur = region === 'solapur';
  const defaultCenter = isSolapur ? [17.6599, 75.9064] : [22.5, 79.0];
  const defaultZoom = isSolapur ? 13 : 5;

  const currentLayer = onLayerChange ? selectedLayer : internalLayer;
  const handleLayerSelect = (layer) => {
    if (onLayerChange) onLayerChange(layer);
    else setInternalLayer(layer);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleRecenter = () => {
    // Triggers view controller
    if (onRegionChange) {
      onRegionChange(region);
    }
  };

  return (
    <div 
      className={`relative w-full rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container-lowest transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none h-screen' : 'h-[580px] lg:h-[680px]'
      }`}
    >
      {/* Top Map Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left: Region Focus Switcher */}
        <div className="pointer-events-auto flex items-center bg-surface-container-low/95 backdrop-blur-md p-1 rounded-lg border border-outline-variant/40 shadow-md">
          <button
            type="button"
            onClick={() => onRegionChange && onRegionChange('india')}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              !isSolapur
                ? 'bg-primary-container text-on-primary-container shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <Compass size={14} />
            <span>India National Grid</span>
          </button>

          <button
            type="button"
            onClick={() => onRegionChange && onRegionChange('solapur')}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isSolapur
                ? 'bg-primary-container text-on-primary-container shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <Focus size={14} />
            <span>Solapur High-Res Pilot (100 Sites)</span>
          </button>
        </div>

        {/* Right: Layer Selector & Map Tools */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Layer Selector */}
          <div className="hidden sm:flex items-center bg-surface-container-low/95 backdrop-blur-md p-1 rounded-lg border border-outline-variant/40 shadow-md">
            <button
              type="button"
              onClick={() => handleLayerSelect('air_temp')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                currentLayer === 'air_temp'
                  ? 'bg-surface-container-high text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Air Temp (T2M)
            </button>
            <button
              type="button"
              onClick={() => handleLayerSelect('surface_lst')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                currentLayer === 'surface_lst'
                  ? 'bg-surface-container-high text-tertiary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Surface LST
            </button>
            {isSolapur && (
              <button
                type="button"
                onClick={() => handleLayerSelect('cooling_score')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  currentLayer === 'cooling_score'
                    ? 'bg-surface-container-high text-secondary font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Cooling Priority
              </button>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center bg-surface-container-low/95 backdrop-blur-md p-1 rounded-lg border border-outline-variant/40 shadow-md">
            <button
              type="button"
              onClick={handleRecenter}
              title="Reset View"
              className="p-1.5 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
            >
              <RotateCcw size={16} />
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              className="p-1.5 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Leaflet Map Stage */}
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        zoomControl={false}
        className="w-full h-full z-0"
      >
        <MapViewController center={defaultCenter} zoom={defaultZoom} />

        {/* CartoDB Dark Matter Basemap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />

        {/* Render Observation Markers */}
        {geoData?.features?.map((feature) => {
          const coords = feature.geometry.coordinates; // [lng, lat]
          const props = feature.properties;

          // Determine temperature to color-code
          let valueToColor = props.temperature_c;
          if (currentLayer === 'surface_lst' && props.land_surface_temp_c !== undefined) {
            valueToColor = props.land_surface_temp_c;
          } else if (currentLayer === 'cooling_score' && props.cooling_priority_score !== undefined) {
            // Map cooling score to temperature-like scale for visualization
            valueToColor = props.cooling_priority_score > 65 ? 38 : props.cooling_priority_score > 45 ? 31 : 24;
          }

          const markerColor = getTemperatureColor(valueToColor);
          const isHotspot = props.risk_category === 'Very High' || valueToColor >= 40;

          return (
            <CircleMarker
              key={feature.id || `${coords[1]}-${coords[0]}`}
              center={[coords[1], coords[0]]}
              radius={isSolapur ? (isHotspot ? 9 : 7) : 10}
              pathOptions={{
                fillColor: markerColor,
                fillOpacity: 0.85,
                color: isHotspot ? '#ffffff' : markerColor,
                weight: isHotspot ? 2 : 1,
                opacity: 0.95
              }}
            >
              <Popup className="heatshield-dark-popup">
                <TemperaturePopup properties={props} />
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Floating Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] pointer-events-auto">
        <HeatMapLegend />
      </div>

      {/* Floating Spatial Attribution pill in bottom-right */}
      <div className="absolute bottom-4 right-4 z-[1000] hidden md:flex items-center gap-2 bg-surface-container-low/90 backdrop-blur px-3 py-1.5 rounded-lg border border-outline-variant/30 text-[11px] text-on-surface-variant pointer-events-auto shadow-md">
        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
        <span className="font-medium text-on-surface">
          {isSolapur ? 'Solapur 100 Stationary Sites (TF-141)' : 'NASA POWER / 0.5° Grid Reanalysis'}
        </span>
        <span className="text-outline font-mono">
          {activeDate || '2024-04-15'}
        </span>
      </div>
    </div>
  );
}
