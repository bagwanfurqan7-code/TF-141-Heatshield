import React from 'react';

/**
 * ProjectBanner Component
 * Renders the official TF-141 HeatShield high-resolution banner.
 * Maintains the exact 16:9 aspect ratio and visual fidelity without stretching or accidental cropping.
 */
export default function ProjectBanner({ className = '', priority = false }) {
  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-outline-variant/40 shadow-2xl bg-surface-container-lowest transition-all ${className}`}
    >
      {/* Subtle glowing ambient gradient behind banner edge */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent z-10 pointer-events-none" />

      {/* Official HeatShield Banner Image */}
      <img
        src="/branding/heatshield-website-banner.png"
        alt="TF-141 HeatShield project banner"
        className="w-full h-auto object-contain block select-none"
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
}
