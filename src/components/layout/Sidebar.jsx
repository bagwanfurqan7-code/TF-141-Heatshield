import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  Map, 
  Database, 
  BookOpen, 
  Send,
  X,
} from 'lucide-react';
import ProjectLogo from '../branding/ProjectLogo';
import IndianFlag from '../branding/IndianFlag';

const NAV_ITEMS = [
  { path: '/', label: 'Overview', icon: Home },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/submit-reading', label: 'Submit a Reading', icon: Send },
  { path: '/heat-map', label: 'India Heat Map', icon: Map },
  { path: '/explore-data', label: 'Explore Data', icon: Database },
  { path: '/methodology', label: 'Methodology & About', icon: BookOpen },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed left-0 top-0 h-full w-64 bg-surface-container-low border-r border-outline-variant/30 z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          {/* Logo & Brand Header */}
          <div className="h-16 px-space-md border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest/50">
            {/* Official Project Logo linked to Home */}
            <ProjectLogo variant="full" size="md" asLink showSubtext />

            {/* Mobile close button */}
            <button 
              onClick={onClose}
              className="lg:hidden p-1.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          </div>

          {/* Module Section Label */}
          <div className="px-space-md pt-space-md pb-space-xs">
            <span className="font-body text-[11px] font-semibold uppercase tracking-wider text-outline">
              Telemetry Modules
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 px-space-sm">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => onClose && onClose()}
                  className={({ isActive }) =>
                    `flex items-center gap-space-sm px-space-md py-2.5 rounded transition-all duration-150 font-medium text-sm ${
                      isActive
                        ? 'bg-surface-container-high text-primary border-l-2 border-primary shadow-sm font-semibold'
                        : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                    }`
                  }
                  end={item.path === '/'}
                >
                  <Icon size={18} className="shrink-0" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-space-md border-t border-outline-variant/30 bg-surface-container-lowest/60 flex flex-col gap-space-sm">
          {/* Indian Identity Watermark Badge */}
          <div className="flex items-center gap-2 text-xs text-outline font-mono py-1">
            <IndianFlag size="sm" />
            <span className="text-primary font-semibold tracking-wide text-[10px]">
              Made For Indians - Made By Indians
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-secondary/10 border border-secondary/30 text-xs font-medium text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              Solapur Urban Pilot v1.2
            </span>
          </div>
          <div className="text-outline text-xs leading-relaxed">
            <span className="text-on-surface-variant block font-medium">Academic Research Credits</span>
            Team TF-141: Furqan B., Aman S., Bhavin S.
          </div>
        </div>
      </aside>
    </>
  );
}
