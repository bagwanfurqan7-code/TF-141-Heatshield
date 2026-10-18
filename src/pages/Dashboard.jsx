import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  Calendar, 
  Filter, 
  Layers, 
  RotateCw, 
  TrendingUp, 
  Thermometer, 
  Building2, 
  SunMedium, 
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import StatCard from '../components/common/StatCard';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { fetchDashboardSummary, fetchAvailableDates } from '../services/heatmapService';
import { 
  MONTHLY_TRENDS, 
  ZONE_COMPARISON, 
  SEASONAL_DATA, 
  AIR_TEMP_DISTRIBUTION, 
  LST_DISTRIBUTION,
  RECENT_TREND_SERIES 
} from '../data/dashboardData';

const ZONES = [
  { value: 'all', label: 'All Urban Typologies (9 Zones)' },
  { value: 'residential', label: 'Residential (28 Sites)' },
  { value: 'commercial', label: 'Commercial Corridor (14 Sites)' },
  { value: 'industrial', label: 'Industrial Complex (12 Sites)' },
  { value: 'road', label: 'Road Corridor (14 Sites)' },
  { value: 'park', label: 'Parks & Green Cover (10 Sites)' },
  { value: 'educational', label: 'Educational Campuses (8 Sites)' },
  { value: 'transport', label: 'Transport Terminals (6 Sites)' },
  { value: 'waterbody', label: 'Waterbody Buffer (4 Sites)' },
  { value: 'open land', label: 'Open / Fallow Land (4 Sites)' },
];

// Dark theme tooltip for Recharts
function CustomTooltip({ active, payload, label, unit = '°C' }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/40 shadow-xl text-xs font-mono">
        <span className="font-semibold text-on-surface block mb-1.5 border-b border-outline-variant/20 pb-1">
          {label}
        </span>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4 py-0.5">
            <span className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span>{entry.name}:</span>
            </span>
            <span className="font-bold text-on-surface">
              {entry.value} {unit}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState('2024-05-24');
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedVariable, setSelectedVariable] = useState('both');
  const [availableDates, setAvailableDates] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const dates = await fetchAvailableDates();
      setAvailableDates(dates);
      const summ = await fetchDashboardSummary(selectedDate, selectedZone);
      setSummary(summ);
    } catch (err) {
      setError(err.message || 'Failed to load telemetry summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedDate, selectedZone]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* 1. Dashboard Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
              Microclimatic Telemetry Node // Solapur & Regional Grid
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-tertiary-container/15 text-tertiary text-[11px] font-medium border border-tertiary-container/30">
              <Sparkles size={11} />
              <span>150,000 Fact Ingest</span>
            </span>
          </div>
          <h1 className="font-headline font-extrabold text-2xl lg:text-3xl text-on-surface tracking-tight mt-1">
            Heat Analytics Dashboard
          </h1>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant max-w-4xl mt-0.5">
            Quantitative analysis of diurnal ambient air temperature (T_air), radiative land surface skin (LST), and morphological cooling intervention models.
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
          <button
            onClick={loadData}
            className="inline-flex items-center gap-2 bg-surface-container hover:bg-surface-container-high text-on-surface px-3 py-2 rounded-lg text-xs font-medium border border-outline-variant/30 transition-colors"
          >
            <RotateCw size={14} className={loading ? 'animate-spin text-primary' : 'text-outline'} />
            <span>Sync Buffer</span>
          </button>
        </div>
      </div>

      {/* 2. Filter & Control Toolbar */}
      <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
          {/* Date Selector */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-mono uppercase tracking-wider text-outline flex items-center gap-1">
              <Calendar size={12} className="text-primary" />
              <span>Observation Date</span>
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-surface-container text-on-surface text-xs rounded-lg px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary font-mono cursor-pointer"
            >
              {availableDates.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Zone Typology Filter */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-mono uppercase tracking-wider text-outline flex items-center gap-1">
              <Building2 size={12} className="text-secondary" />
              <span>Morphological Zone</span>
            </label>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="bg-surface-container text-on-surface text-xs rounded-lg px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-secondary cursor-pointer"
            >
              {ZONES.map(z => (
                <option key={z.value} value={z.value}>{z.label}</option>
              ))}
            </select>
          </div>

          {/* Variable Filter */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-mono uppercase tracking-wider text-outline flex items-center gap-1">
              <Thermometer size={12} className="text-tertiary" />
              <span>Thermal Metric</span>
            </label>
            <select
              value={selectedVariable}
              onChange={(e) => setSelectedVariable(e.target.value)}
              className="bg-surface-container text-on-surface text-xs rounded-lg px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-tertiary cursor-pointer"
            >
              <option value="both">Both Air Temp (T_air) & Surface LST</option>
              <option value="air">Ambient Air Temp (2m)</option>
              <option value="surface">Radiative Surface Skin (LST)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. KPI Summary Cards */}
      {loading ? (
        <LoadingState message="Aggregating microclimatic indicators..." />
      ) : error ? (
        <ErrorState message={error} onRetry={loadData} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Mean Ambient Air Temp"
            value={summary?.meanAirTemp}
            unit="°C"
            description="2-Metre Elevation Sensor Average"
            icon={Thermometer}
            badgeText={`Min: ${summary?.minAirTemp}°C`}
            badgeColor="text-primary bg-primary/10 border-primary/30"
          />
          <StatCard
            title="Peak Ambient Air Temp"
            value={summary?.maxAirTemp}
            unit="°C"
            description="Highest Recorded Air Reading"
            icon={SunMedium}
            badgeText="Pre-Monsoon Peak"
            badgeColor="text-amber-400 bg-amber-400/10 border-amber-400/30"
          />
          <StatCard
            title="Mean Surface Skin (LST)"
            value={summary?.meanLST}
            unit="°C"
            description="Thermal Infrared Radiative Skin"
            icon={TrendingUp}
            badgeText={`Max: ${summary?.peakLST}°C`}
            badgeColor="text-tertiary bg-tertiary/10 border-tertiary/30"
          />
          <StatCard
            title="UHI Thermal Anomaly"
            value={summary?.uhiAnomalyMean > 0 ? `+${summary?.uhiAnomalyMean}` : summary?.uhiAnomalyMean}
            unit="°C"
            description="Surface Excess (LST - Air Temp)"
            icon={ShieldCheck}
            badgeText="Urban Micro-Heat"
            badgeColor="text-secondary bg-secondary/10 border-secondary/30"
          />
        </div>
      )}

      {/* 4. Main Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Longitudinal Temperature Trend (2024 Time Series) */}
        <div className="bg-surface-container rounded-xl p-5 border border-outline-variant/30 flex flex-col gap-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/20 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
                Figure 01 // Time Series
              </span>
              <h3 className="font-headline font-bold text-base text-on-surface">
                Longitudinal Temperature Progression (2024)
              </h3>
            </div>
            <span className="text-xs text-outline font-mono">
              Daily Aggregate Series (°C)
            </span>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={RECENT_TREND_SERIES} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAir" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8ed5ff" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#8ed5ff" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorLST" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffc174" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#ffc174" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1d2b3b" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#87929a" 
                  tick={{ fontSize: 11, fill: '#87929a' }} 
                  tickFormatter={(val) => (typeof val === 'string' ? val.slice(5) : val)} 
                />
                <YAxis 
                  stroke="#87929a" 
                  domain={[15, 50]} 
                  tick={{ fontSize: 11, fill: '#87929a' }} 
                  unit="°C"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                />
                {(selectedVariable === 'both' || selectedVariable === 'air') && (
                  <Area
                    type="monotone"
                    dataKey="air_temp"
                    name="Mean Air Temp (T_air)"
                    stroke="#8ed5ff"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorAir)"
                  />
                )}
                {(selectedVariable === 'both' || selectedVariable === 'surface') && (
                  <Area
                    type="monotone"
                    dataKey="surface_temp"
                    name="Land Surface Temp (LST)"
                    stroke="#ffc174"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorLST)"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <span className="text-[11px] text-outline leading-tight">
            Thermal relief is evident during monsoon onset in June–July, contrasted against pre-monsoon peaks exceeding 42°C in April–May.
          </span>
        </div>

        {/* Chart 2: Regional / Morphological Zone Comparison */}
        <div className="bg-surface-container rounded-xl p-5 border border-outline-variant/30 flex flex-col gap-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/20 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-secondary font-semibold">
                Figure 02 // Zone Morphologies
              </span>
              <h3 className="font-headline font-bold text-base text-on-surface">
                Thermal Exposure Across 9 Urban Zones
              </h3>
            </div>
            <span className="text-xs text-outline font-mono">
              Mean Observed LST (°C)
            </span>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ZONE_COMPARISON} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1d2b3b" vertical={false} />
                <XAxis 
                  dataKey="zone" 
                  stroke="#87929a" 
                  tick={{ fontSize: 10, fill: '#87929a' }} 
                  angle={-30} 
                  textAnchor="end"
                  interval={0}
                />
                <YAxis 
                  stroke="#87929a" 
                  domain={[25, 45]} 
                  tick={{ fontSize: 11, fill: '#87929a' }} 
                  unit="°C"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }} />
                <Bar dataKey="land_surface_temp" name="Land Surface Temp (LST)" fill="#f97316" radius={[4, 4, 0, 0]} />
                <Bar dataKey="air_temperature" name="Ambient Air Temp (T_air)" fill="#8ed5ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <span className="text-[11px] text-outline leading-tight">
            Industrial and Commercial sectors experience the highest thermal skin retention due to high impervious surface coverage.
          </span>
        </div>

        {/* Chart 3: Temperature Frequency Distribution (Histogram) */}
        <div className="bg-surface-container rounded-xl p-5 border border-outline-variant/30 flex flex-col gap-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/20 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-tertiary font-semibold">
                Figure 03 // Statistical Histogram
              </span>
              <h3 className="font-headline font-bold text-base text-on-surface">
                Temperature Frequency Distribution (150k Facts)
              </h3>
            </div>
            <span className="text-xs text-outline font-mono">
              Observation Counts
            </span>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={LST_DISTRIBUTION} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1d2b3b" vertical={false} />
                <XAxis 
                  dataKey="range" 
                  stroke="#87929a" 
                  tick={{ fontSize: 11, fill: '#87929a' }} 
                />
                <YAxis 
                  stroke="#87929a" 
                  tick={{ fontSize: 11, fill: '#87929a' }} 
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip unit=" records" />} />
                <Bar dataKey="count" name="Surface LST Frequency" fill="#44e2cd" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <span className="text-[11px] text-outline leading-tight">
            Normal distribution peaking between 30°C and 40°C, with a heavy right tail extending past 50°C in unshaded industrial concrete envelopes.
          </span>
        </div>

        {/* Chart 4: Monthly & Seasonal Thermal Trajectories */}
        <div className="bg-surface-container rounded-xl p-5 border border-outline-variant/30 flex flex-col gap-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/20 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
                Figure 04 // Seasonal Progression
              </span>
              <h3 className="font-headline font-bold text-base text-on-surface">
                12-Month Diurnal Progression (Solapur)
              </h3>
            </div>
            <span className="text-xs text-outline font-mono">
              Mean Monthly Value (°C)
            </span>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_TRENDS} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1d2b3b" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#87929a" 
                  tick={{ fontSize: 11, fill: '#87929a' }} 
                />
                <YAxis 
                  stroke="#87929a" 
                  domain={[20, 48]} 
                  tick={{ fontSize: 11, fill: '#87929a' }} 
                  unit="°C"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line 
                  type="monotone" 
                  dataKey="max_temperature" 
                  name="Max Air Temp (T_max)" 
                  stroke="#ef4444" 
                  strokeWidth={2} 
                  dot={{ r: 3 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="land_surface_temp" 
                  name="Land Surface Temp (LST)" 
                  stroke="#ffc174" 
                  strokeWidth={2} 
                  dot={{ r: 3 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="air_temperature" 
                  name="Mean Air Temp (T_air)" 
                  stroke="#8ed5ff" 
                  strokeWidth={2} 
                  dot={{ r: 3 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <span className="text-[11px] text-outline leading-tight">
            Solapur's classic semi-arid thermal curve: sharp April–May surge followed by steep monsoon attenuation in July–August.
          </span>
        </div>
      </div>
    </div>
  );
}
