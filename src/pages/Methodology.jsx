import React from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  Layers, 
  Database, 
  Thermometer, 
  ShieldAlert, 
  CheckCircle2, 
  Info,
  Scale,
  Sparkles
} from 'lucide-react';
import { DEFAULT_THRESHOLDS } from '../utils/temperatureColors';

export default function Methodology() {
  return (
    <div className="flex flex-col gap-8 pb-12 max-w-5xl mx-auto">
      {/* 1. Header */}
      <div className="flex flex-col gap-2 border-b border-outline-variant/30 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
            Scientific Documentation & Data Provenance
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container text-outline text-[11px] font-mono border border-outline-variant/30">
            Version 1.2
          </span>
        </div>
        <h1 className="font-headline font-extrabold text-3xl sm:text-4xl text-on-surface tracking-tight">
          Methodology & System Architecture
        </h1>
        <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-3xl">
          Complete scientific disclosures, computational formulations, thermodynamic boundaries, and data-governance standards underlying the TF-141 HeatShield platform.
        </p>
      </div>

      {/* 2. Mandatory Scope Notice */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 flex items-start gap-3 shadow-sm">
        <ShieldAlert size={20} className="text-amber-400 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1 text-xs text-on-surface-variant leading-relaxed">
          <span className="font-headline font-bold text-amber-300 text-sm">
            Academic Scope & Public Health Boundary Disclaimer
          </span>
          <p>
            HeatShield is an academic research and decision-support prototype developed at MIT Vishwaprayag University (MIT-VPU), Solapur. The platform computationally models microclimatic dynamics and multi-criteria cooling interventions. It is <strong>not</strong> an official municipal emergency-alert system, certified meteorological station network, or a substitute for professional clinical medical advice regarding heat stroke or occupational heat exposure.
          </p>
        </div>
      </div>

      {/* 3. Primary Data Sources & Citations */}
      <section className="flex flex-col gap-4">
        <h2 className="font-headline font-bold text-xl text-on-surface flex items-center gap-2">
          <Database size={18} className="text-primary" />
          <span>Primary Data Sources & Citations</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface-container p-5 rounded-xl border border-outline-variant/30 flex flex-col justify-between gap-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-primary font-semibold">National Grid Data</span>
                <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded font-mono">
                  0.5° × 0.5° Grid
                </span>
              </div>
              <h3 className="font-headline font-bold text-base text-on-surface">
                NASA POWER (Prediction of Worldwide Energy Resources)
              </h3>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Utilized for regional daily maximum air temperature (parameter <code>T2M_MAX</code>, 2-metre air temperature). Sourced via the NASA Langley Research Center (LaRC) POWER Daily API. Reanalysis integrates satellite radiometer telemetry and numerical assimilation models.
              </p>
            </div>
            <a
              href="https://power.larc.nasa.gov/docs/services/api/temporal/daily/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium pt-2 border-t border-outline-variant/20"
            >
              <span>Official NASA POWER Documentation</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <div className="bg-surface-container p-5 rounded-xl border border-outline-variant/30 flex flex-col justify-between gap-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-secondary font-semibold">High-Res Solapur Model</span>
                <span className="text-[10px] bg-secondary/10 text-secondary border border-secondary/20 px-1.5 py-0.5 rounded font-mono">
                  100 Stationary Sites
                </span>
              </div>
              <h3 className="font-headline font-bold text-base text-on-surface">
                TF-141 Solapur Microclimate Simulation (2021–2025)
              </h3>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Calibrated longitudinal simulation representing the Solapur Urban Agglomeration (17.6120°N–17.7220°N, 75.8360°E–75.9620°E). Contains 150,000 observations across 9 morphological zones, 57 features, strict thermodynamic rules, and multi-criteria cooling interventions.
              </p>
            </div>
            <div className="text-xs text-outline font-mono pt-2 border-t border-outline-variant/20">
              Verified 12-Section Mathematical QA Passed
            </div>
          </div>
        </div>
      </section>

      {/* 4. Measurement Distinctions: Air Temp vs Land Surface Temp */}
      <section className="bg-surface-container rounded-xl p-6 border border-outline-variant/30 flex flex-col gap-4">
        <h2 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
          <Thermometer size={18} className="text-secondary" />
          <span>Physical Measurement Definitions: Air vs. Land Surface Temperature</span>
        </h2>

        <p className="font-body text-xs text-on-surface-variant leading-relaxed">
          A common pitfall in environmental data communication is treating Air Temperature (T_air) and Land Surface Temperature (LST) interchangeably. In HeatShield, these are rigorously separated:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/30 flex flex-col gap-2">
            <span className="font-mono text-primary font-bold uppercase text-[11px]">
              Ambient Air Temperature (T_air / T2M_MAX)
            </span>
            <p className="text-on-surface-variant leading-relaxed">
              Measured at standard meteorological shelter height (typically 1.5 to 2.0 metres above ground level). Represents the kinetic thermal energy of ambient air molecules shaded from direct solar radiation. In Solapur, T_air averages 34.28°C with peak summer values reaching 46.81°C.
            </p>
          </div>

          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/30 flex flex-col gap-2">
            <span className="font-mono text-tertiary font-bold uppercase text-[11px]">
              Land Surface Temperature ($LST$ / Skin Temperature)
            </span>
            <p className="text-on-surface-variant leading-relaxed">
              Measured via satellite thermal infrared radiometry or surface pyrometers. Represents the radiative temperature of the physical surface (asphalt, concrete, rooftops, vegetation canopy). $LST$ exhibits much wider diurnal swings, peaking at 55.35°C in unshaded industrial concrete envelopes.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Cooling Priority Score Formulation */}
      <section className="bg-surface-container rounded-xl p-6 border border-outline-variant/30 flex flex-col gap-4">
        <h2 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
          <Scale size={18} className="text-tertiary" />
          <span>Multi-Criteria Decision Making (MCDM) Cooling Formulation</span>
        </h2>

        <p className="font-body text-xs text-on-surface-variant leading-relaxed">
          To provide actionable guidance to municipal authorities, HeatShield algorithmically derives the <strong>Cooling Priority Score</strong> (0 to 100) using a multi-factor formula combining thermal exposure, morphological deficits, and human vulnerability:
        </p>

        <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/20 font-mono text-xs text-primary leading-relaxed">
          Cooling Priority Score = 0.30 × (LST Norm) + 0.25 × (Shade Gap Index) + 0.20 × (Green Deficit %) + 0.15 × (Pop Density Norm) + 0.10 × (Vulnerability Index)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-on-surface-variant">
          <div className="p-3 rounded bg-surface-container-low border border-outline-variant/20">
            <strong className="text-on-surface block mb-1">Shade Gap Index</strong>
            Derived by subtracting available canopy and structural shade from total pedestrian transit exposure.
          </div>
          <div className="p-3 rounded bg-surface-container-low border border-outline-variant/20">
            <strong className="text-on-surface block mb-1">Green Cover Deficit</strong>
            Distance from the target 30% urban vegetative threshold per municipal master plans.
          </div>
          <div className="p-3 rounded bg-surface-container-low border border-outline-variant/20">
            <strong className="text-on-surface block mb-1">Estimated Cooling Potential</strong>
            Model-derived estimate (0.35°C to 4.05°C) expected from targeted green interventions.
          </div>
        </div>
      </section>

      {/* 6. Color Scale Thresholds Table */}
      <section className="flex flex-col gap-3">
        <h2 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
          <Layers size={18} className="text-primary" />
          <span>Cartographic Color Scale Reference</span>
        </h2>

        <div className="bg-surface-container rounded-xl border border-outline-variant/30 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30 text-outline uppercase font-mono text-[10px]">
                <th className="py-2.5 px-4">Color Swatch</th>
                <th className="py-2.5 px-4">Threshold Interval</th>
                <th className="py-2.5 px-4">Classification Label</th>
                <th className="py-2.5 px-4">Cartographic Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-mono text-xs">
              {DEFAULT_THRESHOLDS.map((t) => (
                <tr key={t.label} className="hover:bg-surface-container-high/40">
                  <td className="py-2.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-sm border border-black/30 shadow-sm" style={{ backgroundColor: t.color }} />
                      <span className="text-outline text-[11px]">{t.color}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-4 font-bold text-on-surface">{t.label}</td>
                  <td className="py-2.5 px-4 text-on-surface-variant font-sans">{t.name}</td>
                  <td className="py-2.5 px-4 text-outline font-sans text-[11px]">
                    {t.name === 'Cool / Mild' && 'Sub-15°C baseline during winter mornings and high-altitude stations.'}
                    {t.name === 'Moderate' && 'Standard thermal comfort baseline under seasonal moderation.'}
                    {t.name === 'Warm' && 'Typical transitional day temperature with elevated solar radiance.'}
                    {t.name === 'Elevated Heat' && 'Approaching diurnal threshold where shade gap becomes critical.'}
                    {t.name === 'Severe Heat' && 'Intense pre-monsoon heat threshold requiring microclimate cooling.'}
                  </td>
                </tr>
              ))}
              <tr className="hover:bg-surface-container-high/40">
                <td className="py-2.5 px-4">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-sm bg-slate-500 border border-black/30" />
                    <span className="text-outline text-[11px]">#64748b</span>
                  </div>
                </td>
                <td className="py-2.5 px-4 font-bold text-outline">Null / Missing</td>
                <td className="py-2.5 px-4 text-outline font-sans">Unrecorded / Off-Grid</td>
                <td className="py-2.5 px-4 text-outline font-sans text-[11px]">
                  Preserves data integrity: missing data is never represented as zero.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Academic Research Team Credits */}
      <section className="bg-surface-container rounded-xl p-6 border border-outline-variant/30 flex flex-col gap-4">
        <h2 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
          <Sparkles size={18} className="text-primary" />
          <span>Academic Team & Institutional Governance</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/30 flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase text-primary font-bold">Frontend Engineering</span>
            <span className="font-headline font-bold text-sm text-on-surface">Furqan Bagwan</span>
            <span className="font-mono text-outline text-[11px]">ID: SCFU425004</span>
            <p className="text-on-surface-variant text-[11px] mt-1">
              UI/UX design system, telemetry console, interactive cartography, data filters, and React architecture.
            </p>
          </div>

          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/30 flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase text-secondary font-bold">EDADV Module</span>
            <span className="font-headline font-bold text-sm text-on-surface">Aman Shaikh</span>
            <span className="font-mono text-outline text-[11px]">ID: SCFU425013</span>
            <p className="text-on-surface-variant text-[11px] mt-1">
              Data cleaning, statistical profiling, correlation matrices, QA validation, and analytical chart synthesis.
            </p>
          </div>

          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/30 flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase text-tertiary font-bold">Backend & DBMS</span>
            <span className="font-headline font-bold text-sm text-on-surface">Bhavin Shankur</span>
            <span className="font-mono text-outline text-[11px]">ID: SCFU425014</span>
            <p className="text-on-surface-variant text-[11px] mt-1">
              3NF relational schema, PostgreSQL & MySQL DDL migrations, ETL pipelines, and benchmark query optimization.
            </p>
          </div>
        </div>

        <div className="text-center text-xs text-outline pt-2 border-t border-outline-variant/20">
          MIT Vishwaprayag University (MIT-VPU), Solapur — Department of Computer Science & Engineering.
        </div>
      </section>
    </div>
  );
}
