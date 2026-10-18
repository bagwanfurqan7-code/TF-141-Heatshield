import React from 'react';
import IndianFlag from './IndianFlag';
import { Shield, Info } from 'lucide-react';

/**
 * ProjectFooter Component
 * Global footer rendering the official project branding, Indian flag,
 * exact required watermark: "Made For Indians - Made By Indians",
 * team credits, and academic disclaimer.
 */
export default function ProjectFooter({ className = '' }) {
  const EXACT_WATERMARK_LINE = 'TF-141 HeatShield | Made For Indians - Made By Indians';

  return (
    <footer
      className={`w-full bg-surface-container-lowest/90 border-t border-outline-variant/30 px-4 lg:px-6 py-6 text-xs text-on-surface-variant ${className}`}
    >
      <div className="max-w-[1720px] mx-auto flex flex-col gap-4">
        {/* Top Line: Brand, Indian Flag, Exact Watermark Attribution */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-3 border-b border-outline-variant/20">
          <div className="flex items-center gap-2.5 flex-wrap justify-center md:justify-start">
            <img
              src="/branding/heatshield-icon.svg"
              alt="TF-141 HeatShield logo"
              className="h-5 w-auto object-contain shrink-0"
            />
            <span className="font-headline font-bold text-on-surface tracking-tight">
              TF-141 HeatShield
            </span>
            <span className="text-outline">•</span>
            {/* Exact Watermark with Indian Flag */}
            <div className="inline-flex items-center gap-2 bg-surface-container-high/60 px-2.5 py-1 rounded border border-outline-variant/30 font-mono text-xs text-primary shadow-xs">
              <IndianFlag size="xs" />
              <span className="font-semibold tracking-wide">
                Made For Indians - Made By Indians
              </span>
              <IndianFlag size="xs" />
            </div>
          </div>

          {/* Academic Affiliation */}
          <div className="text-outline font-mono text-[11px] text-center md:text-right">
            MIT Vishwaprayag University (MIT-VPU), Solapur • B.Tech Integrated Project
          </div>
        </div>

        {/* Bottom Line: Verified Team Members & Prototype Disclaimer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-outline">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="text-on-surface font-semibold">Team HeatShield:</span>
            <span>
              Frontend: <strong className="text-on-surface-variant">Furqan Bagwan</strong>
            </span>
            <span>•</span>
            <span>
              EDADV: <strong className="text-on-surface-variant">Aman Shaikh</strong>
            </span>
            <span>•</span>
            <span>
              DBMS & Backend: <strong className="text-on-surface-variant">Bhavin Shankur</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-center md:text-right">
            <Info size={12} className="shrink-0 text-tertiary" />
            <span>
              Academic decision-support prototype. Not an operational disaster-warning system.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
