/**
 * HeatShield Telemetry & Geospatial Data Service
 * Encapsulates backend communication, NASA POWER fallback, and local verified fixtures.
 */

import { getIndiaGeoJSON, INDIA_REGIONAL_GRID } from '../data/indiaGridData';
import { SOLAPUR_STATIONS } from '../data/solapurLocations';
import { MASTER_DATASET_METADATA, MONTHLY_TRENDS, ZONE_COMPARISON, SEASONAL_DATA, RECENT_TREND_SERIES } from '../data/dashboardData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Checks backend health
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { method: 'GET', signal: AbortSignal.timeout(2500) });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Backend offline; use local verified dataset
    return { status: 'offline', error: err.message };
  }
  return { status: 'offline' };
}

/**
 * Fetch dataset metadata
 */
export async function fetchDatasetMetadata() {
  try {
    const res = await fetch(`${API_BASE_URL}/heatmap/metadata`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) return await res.json();
  } catch (err) {
    // Return verified master dataset metadata
  }

  return {
    success: true,
    source: 'HeatShield Solapur Simulation & NASA POWER Reanalysis Grid',
    is_live_backend: false,
    ...MASTER_DATASET_METADATA,
    geographicCoverage: 'Solapur Urban Agglomeration (17.6120°N – 17.7220°N) & India National Grid',
    temperatureVariable: 'Daily Maximum 2-Metre Air Temp (T2M_MAX) & Land Surface Temp (LST)',
    temperatureUnit: '°C',
    spatialResolution: '0.5° × 0.5° (India Grid) / Station-Level In-Situ (Solapur 100 Sites)',
    historicalCoverage: '2021-01-01 to 2025-12-31 (150,000 Records)',
    websiteLastRefreshed: '2026-10-18T17:15:00+05:30'
  };
}

/**
 * Fetch available observation dates
 */
export async function fetchAvailableDates() {
  try {
    const res = await fetch(`${API_BASE_URL}/heatmap/dates`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) return await res.json();
  } catch (err) {
    // Return list of representative dates
  }

  return [
    '2024-05-24', // Peak pre-monsoon heat
    '2024-04-15', // Mid summer
    '2024-07-20', // Monsoon cooling
    '2024-10-15', // Post-monsoon transition
    '2024-01-15', // Winter baseline
    '2023-05-20',
    '2022-05-22',
    '2021-05-25'
  ];
}

/**
 * Fetch GeoJSON for Heat Map view.
 * Supports both India-wide view and Solapur focused station microclimate view.
 */
export async function fetchHeatmapGeoJSON(date = '2024-04-15', region = 'india') {
  try {
    const res = await fetch(`${API_BASE_URL}/heatmap?date=${date}&region=${region}`, { signal: AbortSignal.timeout(3500) });
    if (res.ok) {
      const data = await res.json();
      return { ...data, is_live_backend: true };
    }
  } catch (err) {
    // Offline fallback
  }

  if (region === 'solapur') {
    // Convert 100 Solapur stations to GeoJSON FeatureCollection
    return {
      type: 'FeatureCollection',
      is_live_backend: false,
      properties: {
        date,
        region: 'Solapur Urban Agglomeration',
        source: 'Solapur Microclimate Monitoring Grid (TF-141)',
        measurement_type: 'Ambient Air Temp & Land Surface Temp (LST)',
        spatial_resolution: '100 Stationary Microclimate Stations',
        station_count: SOLAPUR_STATIONS.length
      },
      features: SOLAPUR_STATIONS.map(s => ({
        type: 'Feature',
        id: s.location_id,
        geometry: {
          type: 'Point',
          coordinates: [s.lng, s.lat]
        },
        properties: {
          grid_id: s.location_id,
          location_name: s.name,
          zone: s.zone,
          latitude: s.lat,
          longitude: s.lng,
          elevation_m: s.elevation_m,
          population_density: s.population_density,
          cooling_infra: s.cooling_infra,
          infra_type: s.infra_type,
          temperature_c: s.mean_air_temp,
          land_surface_temp_c: s.mean_lst,
          ndvi: s.mean_ndvi,
          cooling_priority_score: s.cooling_priority_score,
          recommended_intervention: s.recommended_intervention,
          risk_category: s.risk_category,
          date,
          source: 'Solapur Station Grid (TF-141)',
          measurement_type: 'Ambient Air Temperature (T_air)',
          spatial_resolution: 'Point Observation'
        }
      }))
    };
  }

  // India-wide GeoJSON
  const geo = getIndiaGeoJSON(date);
  return { ...geo, is_live_backend: false };
}

/**
 * Fetch dashboard summary for date
 */
export async function fetchDashboardSummary(date = '2024-04-15', zone = 'all') {
  try {
    const res = await fetch(`${API_BASE_URL}/dashboard/summary?date=${date}&zone=${zone}`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) return await res.json();
  } catch (err) {
    // Offline fallback calculation
  }

  let filtered = SOLAPUR_STATIONS;
  if (zone !== 'all') {
    filtered = SOLAPUR_STATIONS.filter(s => s.zone.toLowerCase() === zone.toLowerCase());
  }

  const validTemps = filtered.map(s => s.mean_air_temp).filter(t => t !== null && !isNaN(t));
  const validLSTs = filtered.map(s => s.mean_lst).filter(t => t !== null && !isNaN(t));

  const meanAir = validTemps.length ? (validTemps.reduce((a, b) => a + b, 0) / validTemps.length) : 34.28;
  const maxAir = validTemps.length ? Math.max(...validTemps) : 46.81;
  const minAir = validTemps.length ? Math.min(...validTemps) : 19.35;
  const meanLST = validLSTs.length ? (validLSTs.reduce((a, b) => a + b, 0) / validLSTs.length) : 35.89;
  const peakLST = validLSTs.length ? Math.max(...validLSTs) : 55.35;

  return {
    success: true,
    selectedDate: date,
    selectedZone: zone,
    meanAirTemp: Number(meanAir.toFixed(2)),
    maxAirTemp: Number(maxAir.toFixed(2)),
    minAirTemp: Number(minAir.toFixed(2)),
    meanLST: Number(meanLST.toFixed(2)),
    peakLST: Number(peakLST.toFixed(2)),
    validRecordsCount: filtered.length,
    activeSensors: filtered.length,
    uhiAnomalyMean: Number((meanLST - meanAir).toFixed(2)),
    measurementType: 'Ambient Air Temperature (2m) & Land Surface Temperature',
    source: 'Solapur Microclimate Pilot & 150k Fact Repository',
    is_live_backend: false
  };
}

/**
 * Fetch records for Explore Data page
 */
export async function fetchExploreRecords({ search = '', zone = 'all', risk = 'all', page = 1, pageSize = 20, sortCol = 'location_id', sortDir = 'asc' }) {
  let list = [...SOLAPUR_STATIONS];

  if (zone !== 'all') {
    list = list.filter(item => item.zone.toLowerCase() === zone.toLowerCase());
  }

  if (risk !== 'all') {
    list = list.filter(item => item.risk_category?.toLowerCase() === risk.toLowerCase());
  }

  if (search && search.trim() !== '') {
    const q = search.toLowerCase().trim();
    list = list.filter(item => 
      item.name.toLowerCase().includes(q) ||
      item.location_id.toLowerCase().includes(q) ||
      item.zone.toLowerCase().includes(q) ||
      item.recommended_intervention.toLowerCase().includes(q)
    );
  }

  // Sorting
  list.sort((a, b) => {
    let valA = a[sortCol];
    let valB = b[sortCol];

    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return sortDir === 'asc' ? -1 : 1;
    if (valA > valB) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const total = list.length;
  const startIdx = (page - 1) * pageSize;
  const paginated = list.slice(startIdx, startIdx + pageSize);

  return {
    records: paginated,
    totalCount: total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize) || 1
  };
}
