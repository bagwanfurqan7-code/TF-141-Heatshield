import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  Database, 
  Building2, 
  ShieldAlert, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  RotateCw
} from 'lucide-react';
import { fetchExploreRecords } from '../services/heatmapService';
import { getHeatRiskBadge, getZoneBadge } from '../utils/temperatureColors';
import LoadingState from '../components/common/LoadingState';
import EmptyState from '../components/common/EmptyState';

const ZONES = [
  { value: 'all', label: 'All Zones' },
  { value: 'Residential', label: 'Residential' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Industrial', label: 'Industrial' },
  { value: 'Road', label: 'Road' },
  { value: 'Park', label: 'Park' },
  { value: 'Educational', label: 'Educational' },
  { value: 'Transport', label: 'Transport' },
  { value: 'Waterbody', label: 'Waterbody' },
  { value: 'Open Land', label: 'Open Land' },
];

const RISKS = [
  { value: 'all', label: 'All Risk Tiers' },
  { value: 'Low', label: 'Low Risk' },
  { value: 'Moderate', label: 'Moderate Risk' },
  { value: 'High', label: 'High Risk' },
  { value: 'Very High', label: 'Very High Risk' },
];

export default function ExploreData() {
  const [search, setSearch] = useState('');
  const [zone, setZone] = useState('all');
  const [risk, setRisk] = useState('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [sortCol, setSortCol] = useState('location_id');
  const [sortDir, setSortDir] = useState('asc');

  const [data, setData] = useState({ records: [], totalCount: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  const loadRecords = async () => {
    setLoading(true);
    try {
      const res = await fetchExploreRecords({
        search,
        zone,
        risk,
        page,
        pageSize,
        sortCol,
        sortDir
      });
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, [search, zone, risk, page, pageSize, sortCol, sortDir]);

  const handleSort = (col) => {
    if (sortCol === col) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
  };

  // CSV Export
  const exportToCSV = () => {
    if (!data.records || !data.records.length) return;

    const headers = [
      'Station ID',
      'Location Name',
      'Zone Type',
      'Latitude',
      'Longitude',
      'Elevation (m)',
      'Population Density',
      'Mean Air Temp (°C)',
      'Mean LST (°C)',
      'Mean NDVI',
      'Cooling Priority Score',
      'Risk Category',
      'Recommended Intervention'
    ];

    const rows = data.records.map(r => [
      `"${r.location_id}"`,
      `"${r.name}"`,
      `"${r.zone}"`,
      r.lat,
      r.lng,
      r.elevation_m,
      r.population_density,
      r.mean_air_temp,
      r.mean_lst,
      r.mean_ndvi,
      r.cooling_priority_score,
      `"${r.risk_category}"`,
      `"${r.recommended_intervention}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `heatshield_telemetry_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderSortIcon = (col) => {
    if (sortCol !== col) return <ArrowUpDown size={12} className="opacity-40" />;
    return sortDir === 'asc' ? (
      <ArrowUp size={12} className="text-primary" />
    ) : (
      <ArrowDown size={12} className="text-primary" />
    );
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
              Relational Telemetry Fact Ingest
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container text-outline text-[11px] font-mono border border-outline-variant/30">
              <Database size={11} className="text-secondary" />
              <span>3NF Tables: locations, weather, surface, interventions</span>
            </span>
          </div>
          <h1 className="font-headline font-extrabold text-2xl lg:text-3xl text-on-surface tracking-tight mt-0.5">
            Explore Microclimatic Data
          </h1>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant max-w-3xl mt-0.5">
            Filter, inspect, and export in-situ observation facts across Solapur's stationary monitoring network and regional reanalysis.
          </p>
        </div>

        {/* Export CSV Button */}
        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <button
            onClick={exportToCSV}
            disabled={!data.records.length}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-xs font-semibold text-primary border border-primary/30 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={15} />
            <span>Export Clean CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-sm">
        <div className="flex flex-1 items-center gap-2 bg-surface-container px-3 py-2 rounded-lg border border-outline-variant/40">
          <Search size={16} className="text-outline shrink-0" />
          <input
            type="text"
            placeholder="Search by station ID, location name, or recommended intervention..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="bg-transparent text-on-surface text-xs w-full focus:outline-none placeholder:text-outline"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Zone Selector */}
          <select
            value={zone}
            onChange={(e) => {
              setZone(e.target.value);
              setPage(1);
            }}
            className="bg-surface-container text-on-surface text-xs rounded-lg px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-secondary cursor-pointer"
          >
            {ZONES.map(z => (
              <option key={z.value} value={z.value}>{z.label}</option>
            ))}
          </select>

          {/* Risk Selector */}
          <select
            value={risk}
            onChange={(e) => {
              setRisk(e.target.value);
              setPage(1);
            }}
            className="bg-surface-container text-on-surface text-xs rounded-lg px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary cursor-pointer"
          >
            {RISKS.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>

          {/* Rows per page */}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="bg-surface-container text-on-surface text-xs rounded-lg px-2.5 py-2 border border-outline-variant/40 focus:outline-none font-mono cursor-pointer"
          >
            <option value={10}>10 rows</option>
            <option value={15}>15 rows</option>
            <option value={25}>25 rows</option>
            <option value={50}>50 rows</option>
          </select>
        </div>
      </div>

      {/* 3. Table Stage */}
      {loading ? (
        <LoadingState message="Filtering observation records..." />
      ) : !data.records.length ? (
        <EmptyState
          title="No Matching Microclimate Records"
          message="No monitoring sites match your keyword or active zone/risk filters."
          onReset={() => {
            setSearch('');
            setZone('all');
            setRisk('all');
            setPage(1);
          }}
        />
      ) : (
        <div className="bg-surface-container rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant/30 text-outline uppercase font-mono text-[10px] tracking-wider select-none">
                  <th onClick={() => handleSort('location_id')} className="py-3 px-4 cursor-pointer hover:text-on-surface">
                    <div className="flex items-center gap-1.5">
                      <span>Station ID</span>
                      {renderSortIcon('location_id')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('name')} className="py-3 px-4 cursor-pointer hover:text-on-surface">
                    <div className="flex items-center gap-1.5">
                      <span>Location / Ward</span>
                      {renderSortIcon('name')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('zone')} className="py-3 px-4 cursor-pointer hover:text-on-surface">
                    <div className="flex items-center gap-1.5">
                      <span>Zone Typology</span>
                      {renderSortIcon('zone')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('mean_air_temp')} className="py-3 px-4 cursor-pointer hover:text-on-surface text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Air Temp (°C)</span>
                      {renderSortIcon('mean_air_temp')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('mean_lst')} className="py-3 px-4 cursor-pointer hover:text-on-surface text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Surface LST</span>
                      {renderSortIcon('mean_lst')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('mean_ndvi')} className="py-3 px-4 cursor-pointer hover:text-on-surface text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <span>NDVI</span>
                      {renderSortIcon('mean_ndvi')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('cooling_priority_score')} className="py-3 px-4 cursor-pointer hover:text-on-surface text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Cooling Priority</span>
                      {renderSortIcon('cooling_priority_score')}
                    </div>
                  </th>
                  <th className="py-3 px-4">Thermal Risk</th>
                  <th className="py-3 px-4">Actionable Intervention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 font-body">
                {data.records.map((r) => {
                  const riskBadge = getHeatRiskBadge(r.risk_category);
                  const zoneBadgeClass = getZoneBadge(r.zone);

                  return (
                    <tr 
                      key={r.location_id}
                      className="hover:bg-surface-container-high/60 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono font-semibold text-primary">
                        {r.location_id}
                      </td>
                      <td className="py-3 px-4 font-medium text-on-surface">
                        <div className="flex flex-col">
                          <span>{r.name}</span>
                          <span className="text-[10px] text-outline font-mono">
                            {r.lat.toFixed(4)}°N, {r.lng.toFixed(4)}°E · {r.elevation_m}m
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium border ${zoneBadgeClass}`}>
                          {r.zone}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-primary">
                        {r.mean_air_temp}°C
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-tertiary">
                        {r.mean_lst}°C
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-secondary">
                        {r.mean_ndvi}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-on-surface">
                        <span className={r.cooling_priority_score > 60 ? 'text-red-400' : 'text-on-surface'}>
                          {r.cooling_priority_score}
                        </span>
                        <span className="text-[10px] text-outline">/100</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border ${riskBadge.bg} ${riskBadge.text} ${riskBadge.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${riskBadge.dot}`} />
                          {r.risk_category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-on-surface-variant max-w-[200px] truncate" title={r.recommended_intervention}>
                        {r.recommended_intervention}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          <div className="bg-surface-container-low px-4 py-3 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-outline font-mono">
            <div>
              Showing {data.records.length ? (page - 1) * pageSize + 1 : 0} to {Math.min(page * pageSize, data.totalCount)} of {data.totalCount} sites
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>

              <span className="px-2 text-on-surface font-semibold">
                Page {page} of {data.totalPages}
              </span>

              <button
                onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                disabled={page >= data.totalPages}
                className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
