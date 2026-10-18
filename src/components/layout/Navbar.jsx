import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, Bell, MapPin, Sparkles } from 'lucide-react';
import IndianFlag from '../branding/IndianFlag';

const PAGE_NAMES = {
  '/': 'Overview',
  '/dashboard': 'Dashboard',
  '/submit-reading': 'Submit a Reading',
  '/heat-map': 'India Heat Map',
  '/explore-data': 'Explore Data',
  '/methodology': 'Methodology & About',
};

export default function Navbar({ onOpenSidebar }) {
  const location = useLocation();
  const currentTitle = PAGE_NAMES[location.pathname] || 'Telemetry Node';

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur border-b border-outline-variant/30 z-40 px-space-md lg:px-space-lg flex items-center justify-between">
      {/* Left: Mobile Toggle & Breadcrumb */}
      <div className="flex items-center gap-space-md">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-space-xs font-medium text-xs lg:text-sm text-on-surface-variant">
          <Link
            to="/"
            className="hover:text-primary transition-colors hidden sm:inline font-semibold"
          >
            HeatShield
          </Link>
          <span className="text-outline hidden sm:inline">/</span>
          <span className="text-on-surface font-semibold truncate">
            {currentTitle}
          </span>
        </div>

        <div className="h-4 w-px bg-outline-variant/40 hidden md:block" />

        {/* Study Area Badge */}
        <div className="hidden md:flex items-center gap-1.5 bg-surface-container px-space-sm py-1 rounded border border-outline-variant/40 text-xs">
          <MapPin size={13} className="text-secondary" />
          <span className="text-on-surface font-medium truncate">
            Study Area: Solapur (SMC) & India Grid
          </span>
        </div>
      </div>

      {/* Right: Sensor Sync, Badge & Profile */}
      <div className="flex items-center gap-space-sm lg:gap-space-md">
        {/* Sensor Sync Badge */}
        <div className="hidden xl:flex items-center gap-1.5 bg-surface-container-low px-space-sm py-1 rounded border border-outline-variant/30 text-xs text-on-surface-variant">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span>Telemetry Ingest: Active (AWS-04)</span>
        </div>

        {/* Indian Flag with "Made For Indians" tooltip */}
        <div
          className="hidden sm:flex items-center gap-1.5 bg-surface-container-high/60 px-2.5 py-1 rounded border border-outline-variant/30 text-[10px] font-mono text-primary cursor-default"
          title="Made For Indians - Made By Indians"
        >
          <IndianFlag size="sm" />
          <span className="hidden md:inline font-semibold">Made For Indians</span>
        </div>

        {/* Academic / Data Type Pill */}
        <div 
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-tertiary-container/15 border border-tertiary-container/40 text-[11px] font-medium text-tertiary"
          title="HeatShield uses a calibrated academic simulation dataset & NASA POWER reanalysis"
        >
          <Sparkles size={12} />
          <span className="hidden sm:inline">Academic Prototype</span>
        </div>

        {/* Notification Bell */}
        <button 
          aria-label="System Notifications" 
          className="p-1.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors relative"
          type="button"
        >
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </button>

        <div className="h-5 w-px bg-outline-variant/40 hidden sm:block" />

        {/* User / Student Identity Card */}
        <div className="flex items-center gap-2 pl-1 cursor-default">
          <div className="w-7 h-7 rounded-full bg-surface-container-highest border border-primary/40 flex items-center justify-center font-bold text-xs text-primary shadow-sm">
            FB
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-on-surface leading-none">
              Furqan Bagwan
            </span>
            <span className="text-[10px] text-outline mt-0.5 leading-none">
              Frontend Lead (TF-141)
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
