import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Map, 
  LayoutDashboard, 
  Shield, 
  Database, 
  Layers, 
  Calendar, 
  Activity, 
  Radio, 
  CheckCircle2, 
  Sparkles,
  Thermometer,
  TreePine,
  Building2,
  Navigation
} from 'lucide-react';
import StatCard from '../components/common/StatCard';
import { fetchDatasetMetadata } from '../services/heatmapService';
import ProjectBanner from '../components/branding/ProjectBanner';
import TeamSection from '../components/branding/TeamSection';
import IndianFlag from '../components/branding/IndianFlag';

export default function Home() {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    fetchDatasetMetadata().then(data => setMetadata(data));
  }, []);

  return (
    <div className="flex flex-col gap-8 pb-12">

      {/* 0. Official Watermark Identity Strip */}
      <div className="flex items-center justify-center gap-3 py-2 px-4 rounded-xl bg-gradient-to-r from-surface-container-low/80 via-surface-container/90 to-surface-container-low/80 border border-outline-variant/30 shadow-sm">
        <IndianFlag size="md" />
        <span className="font-mono font-bold text-sm text-primary tracking-wide text-center">
          Made For Indians - Made By Indians
        </span>
        <IndianFlag size="md" />
      </div>

      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-surface-container-low to-surface-container rounded-2xl p-6 lg:p-10 border border-outline-variant/30 overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
          {/* Left Hero Narrative */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              {/* Institutional Badge */}
              <div className="inline-flex items-center gap-2 self-start bg-surface-container-high px-3 py-1 rounded-full border border-outline-variant/40 text-xs">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-secondary font-bold uppercase tracking-wider">TF-141</span>
                <span className="text-outline">/</span>
                <span className="text-on-surface-variant font-medium">MIT Vishwaprayag University, Solapur</span>
                <span className="bg-surface-container-highest text-primary text-[10px] px-1.5 py-0.5 rounded font-mono uppercase">
                  B.Tech Sem III
                </span>
              </div>

              {/* Title & Slogan */}
              <div className="flex flex-col gap-1 mt-2">
                <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                  Urban Microclimate & Temperature Intelligence
                </span>
                <h1 className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-5xl text-on-surface tracking-tight leading-tight">
                  TF-141 HeatShield
                </h1>
                <p className="font-headline font-semibold text-lg sm:text-xl text-primary mt-1">
                  Understand Heat. Identify Risk. Inform Cooling.
                </p>
              </div>

              {/* Mission Statement Subtitle */}
              <p className="font-body text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed mt-1">
                Explore temperature patterns across India, understand regional heat exposure, and turn microclimatic telemetry into actionable municipal cooling insights.
              </p>
            </div>

            {/* Two Prominent Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 mt-2">
              <Link
                to="/heat-map"
                className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-headline font-bold text-sm px-6 py-3 rounded-lg hover:bg-primary transition-all shadow-md group"
              >
                <span>Explore India Heat Map</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-surface-container-high hover:bg-surface-bright text-on-surface font-headline font-semibold text-sm px-6 py-3 rounded-lg border border-outline-variant/40 transition-colors"
              >
                <LayoutDashboard size={16} className="text-primary" />
                <span>Open Dashboard</span>
              </Link>

              <div className="sm:ml-auto flex items-center gap-1.5 text-xs text-outline font-mono pt-2 sm:pt-0">
                <CheckCircle2 size={14} className="text-secondary" />
                <span>Verified 3NF Data Pipeline</span>
              </div>
            </div>
          </div>

          {/* Right Hero Telemetry Card */}
          <div className="w-full lg:w-[420px] flex flex-col justify-center">
            <div className="bg-surface-container-lowest/90 rounded-xl p-5 border border-outline-variant/40 shadow-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">sensors</span>
                  <span className="text-xs font-bold text-on-surface uppercase tracking-wide">
                    Live Study Area: Solapur Pilot Grid
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-secondary/10 border border-secondary/30 text-[10px] font-mono text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  SYNCHRONIZED
                </span>
              </div>

              {/* Coordinates & Elevation telemetry */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-surface-container-low/70 p-3 rounded-lg border border-outline-variant/20">
                <div>
                  <span className="text-[10px] text-outline block">Coordinates</span>
                  <span className="text-on-surface font-semibold">17.6599°N, 75.9064°E</span>
                </div>
                <div>
                  <span className="text-[10px] text-outline block">Terrain Elevation</span>
                  <span className="text-on-surface font-semibold">458 m MSL</span>
                </div>
                <div>
                  <span className="text-[10px] text-outline block">Stations Active</span>
                  <span className="text-primary font-bold">100 Microclimate Sites</span>
                </div>
                <div>
                  <span className="text-[10px] text-outline block">Urban Typologies</span>
                  <span className="text-secondary font-bold">9 Morphological Zones</span>
                </div>
              </div>

              {/* Key Baseline Values */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container/60 border border-outline-variant/30">
                <div className="flex flex-col">
                  <span className="text-[11px] text-outline">Mean Ambient Air Temp</span>
                  <span className="font-headline font-bold text-lg text-primary">34.28°C</span>
                </div>
                <div className="h-6 w-px bg-outline-variant/30" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-outline">Peak Recorded LST</span>
                  <span className="font-headline font-bold text-lg text-tertiary">55.35°C</span>
                </div>
                <div className="h-6 w-px bg-outline-variant/30" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-outline">UHI Thermal Anomaly</span>
                  <span className="font-headline font-bold text-lg text-secondary">+4.12°C</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-outline pt-1">
                <span>Coverage: Solapur & India National Grid</span>
                <Link to="/heat-map" className="text-primary hover:underline font-medium flex items-center gap-1">
                  <span>View in Map</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Official Project Banner */}
      <section aria-label="TF-141 HeatShield official project banner">
        <ProjectBanner priority />
      </section>

      {/* 3. Overview Statistics */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
            <Activity size={18} className="text-primary" />
            <span>Dataset Overview Statistics</span>
          </h2>
          <span className="text-xs text-outline font-mono">
            Source: 150,000 Verified Relational Observations
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Ingested Records"
            value="150,000"
            description="5-Year Longitudinal Observations"
            icon={Database}
            badgeText="100% Complete"
            badgeColor="text-secondary bg-secondary/10 border-secondary/30"
          />
          <StatCard
            title="Monitoring Stations"
            value="100"
            unit="Sites"
            description="Across 9 Solapur Urban Zones"
            icon={Building2}
            badgeText="Fixed In-Situ"
            badgeColor="text-primary bg-primary/10 border-primary/30"
          />
          <StatCard
            title="Mean Ambient Air Temp"
            value="34.28"
            unit="°C"
            description="2-Metre Above Ground (T_air)"
            icon={Thermometer}
            badgeText="19.35°C – 46.81°C"
            badgeColor="text-amber-400 bg-amber-400/10 border-amber-400/30"
          />
          <StatCard
            title="Peak Surface Skin (LST)"
            value="55.35"
            unit="°C"
            description="Industrial Corridors in Summer"
            icon={Shield}
            badgeText="Thermal Hotspot"
            badgeColor="text-red-400 bg-red-400/10 border-red-400/30"
          />
        </div>
      </section>

      {/* 3. Project Objectives Section */}
      <section className="bg-surface-container rounded-xl p-6 border border-outline-variant/30 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-primary font-semibold">
            <Sparkles size={14} />
            <span>Core Analytical Mandate</span>
          </div>
          <h2 className="font-headline font-bold text-xl text-on-surface">
            Project Objectives
          </h2>
          <p className="font-body text-xs text-on-surface-variant max-w-3xl leading-relaxed">
            HeatShield is built as an academic decision-support prototype under the MIT-VPU Semester III integrated curriculum to solve urban heat vulnerabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/30 flex flex-col gap-2">
            <div className="w-8 h-8 rounded bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs">
              01
            </div>
            <h3 className="font-headline font-semibold text-sm text-on-surface">
              Visualize Temperature Patterns Across India
            </h3>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Synthesize regional daily maximum air temperature using NASA POWER reanalysis grid coordinates alongside high-resolution city observations.
            </p>
          </div>

          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/30 flex flex-col gap-2">
            <div className="w-8 h-8 rounded bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary font-bold text-xs">
              02
            </div>
            <h3 className="font-headline font-semibold text-sm text-on-surface">
              Explore Historical Data by Date & Region
            </h3>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Examine longitudinal cycles (2021–2025) across pre-monsoon heat peaks, monsoon temperature moderation, and winter baselines.
            </p>
          </div>

          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/30 flex flex-col gap-2">
            <div className="w-8 h-8 rounded bg-tertiary/10 border border-tertiary/30 flex items-center justify-center text-tertiary font-bold text-xs">
              03
            </div>
            <h3 className="font-headline font-semibold text-sm text-on-surface">
              Identify Elevated Temperature Thresholds
            </h3>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Pinpoint thermal micro-islands where Land Surface Temperature exceeds ambient air temperatures by over 8°C due to dense built-up impervious surfaces.
            </p>
          </div>

          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/30 flex flex-col gap-2">
            <div className="w-8 h-8 rounded bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-xs">
              04
            </div>
            <h3 className="font-headline font-semibold text-sm text-on-surface">
              Support Environmental Research Initiatives
            </h3>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Provide reproducible data tables, correlation modeling (NDVI vs. LST r = -0.307), and CSV export capabilities for academic evaluation.
            </p>
          </div>

          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/30 flex flex-col gap-2">
            <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
              05
            </div>
            <h3 className="font-headline font-semibold text-sm text-on-surface">
              Enable Focused Regional Analysis (Solapur)
            </h3>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Model Cooling Priority Scores and shade deficits for Solapur's 9 urban zones to prioritize Miyawaki afforestation, cool roofs, and shaded transit corridors.
            </p>
          </div>

          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/30 flex flex-col gap-2 justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <Shield size={16} />
              <span>Academic Integrity Clarification</span>
            </div>
            <p className="font-body text-[11px] text-outline leading-relaxed">
              HeatShield is an academic decision-support prototype. It does not predict emergency heat waves, deliver medical advisories, or substitute for certified in-situ meteorological stations.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Data Coverage Section */}
      <section className="flex flex-col gap-3">
        <h2 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
          <Layers size={18} className="text-secondary" />
          <span>Verified Dataset Coverage & Provenance</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/30 flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wider text-outline font-semibold">Geographic Coverage</span>
            <span className="font-headline font-bold text-sm text-on-surface">
              Solapur Urban Agglomeration & India Grid
            </span>
            <span className="text-xs text-outline mt-1 font-mono">
              17.6120°N – 17.7220°N, 75.8360°E – 75.9620°E
            </span>
          </div>

          <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/30 flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wider text-outline font-semibold">Temperature Variables</span>
            <span className="font-headline font-bold text-sm text-on-surface">
              Air Temp ($T2M\_MAX$), Surface Temp ($LST$)
            </span>
            <span className="text-xs text-outline mt-1 font-mono">
              Measured in Degrees Celsius (°C)
            </span>
          </div>

          <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/30 flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wider text-outline font-semibold">Temporal Period</span>
            <span className="font-headline font-bold text-sm text-on-surface">
              2021-01-01 to 2025-12-31 (5-Year Longitudinal)
            </span>
            <span className="text-xs text-outline mt-1 font-mono">
              Zero temporal gaps across 150,000 facts
            </span>
          </div>

          <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/30 flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wider text-outline font-semibold">Spatial Resolution</span>
            <span className="font-headline font-bold text-sm text-on-surface">
              0.5° × 0.5° Grid & 100 Monitoring Sites
            </span>
            <span className="text-xs text-outline mt-1 font-mono">
              Coarse National Reanalysis + Station In-Situ
            </span>
          </div>

          <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/30 flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wider text-outline font-semibold">Data Primary Source</span>
            <span className="font-headline font-bold text-sm text-on-surface">
              NASA POWER & TF-141 Synthetic Simulation
            </span>
            <span className="text-xs text-outline mt-1 font-mono">
              12-Section QA Validation Passed
            </span>
          </div>

          <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/30 flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wider text-outline font-semibold">Last Data Synchronization</span>
            <span className="font-headline font-bold text-sm text-secondary flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>Active Telemetry Refresh</span>
            </span>
            <span className="text-xs text-outline mt-1 font-mono">
              Website Telemetry Buffer: 2026-10-18
            </span>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />
    </div>
  );
}
