import React from 'react';

/**
 * IndianFlag Component
 * Renders the official Indian national flag asset from the project branding repository.
 * Preserves the exact original aspect ratio (3:2) and appearance without distortion or recoloring.
 */
export default function IndianFlag({ size = 'md', className = '' }) {
  // Sizing presets maintaining proportional height and width
  const sizeClasses = {
    xs: 'h-3 w-[18px]',
    sm: 'h-3.5 w-[21px]',
    md: 'h-4 w-6',
    lg: 'h-5 w-[30px]',
    xl: 'h-6 w-9',
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <img
      src="/branding/indias-flag.png"
      alt="Indian national flag"
      className={`inline-block object-contain rounded-[2px] shadow-sm border border-white/10 shrink-0 ${selectedSize} ${className}`}
      loading="lazy"
    />
  );
}
