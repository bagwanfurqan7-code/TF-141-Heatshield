import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ProjectLogo Component
 * Renders the official TF-141 HeatShield project logo.
 * Supports icon-only and full wordmark modes, ensuring high contrast against the dark environmental analytics theme.
 */
export default function ProjectLogo({
  variant = 'full', // 'icon' | 'full' | 'compact'
  size = 'md',     // 'sm' | 'md' | 'lg'
  asLink = true,
  className = '',
  showSubtext = true,
}) {
  const iconSizes = {
    sm: 'h-7 w-auto',
    md: 'h-8 w-auto',
    lg: 'h-10 w-auto',
  };

  const logoContent = (
    <div className={`flex items-center gap-2.5 min-w-0 ${className}`}>
      {/* Official HeatShield Shield Icon */}
      <img
        src="/branding/heatshield-icon.svg"
        alt="TF-141 HeatShield logo"
        className={`${iconSizes[size] || iconSizes.md} object-contain shrink-0 transition-transform duration-200 group-hover:scale-105`}
      />

      {variant !== 'icon' && (
        <div className="flex flex-col min-w-0 justify-center">
          <div className="flex items-center gap-1 leading-none">
            <span className="font-headline font-extrabold text-base lg:text-lg text-primary tracking-tight">
              Heat<span className="text-on-surface">Shield</span>
            </span>
          </div>
          {showSubtext && (
            <span className="font-mono text-[10px] text-outline truncate mt-0.5 tracking-wider uppercase font-semibold">
              TF-141 Platform
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link
        to="/"
        className="group inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg transition-opacity hover:opacity-95"
        title="TF-141 HeatShield — Return to Home"
        aria-label="TF-141 HeatShield Home"
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
