---
name: Urban Thermal Intelligence
colors:
  surface: '#051423'
  surface-dim: '#051423'
  surface-bright: '#2c3a4b'
  surface-container-lowest: '#010f1e'
  surface-container-low: '#0d1d2c'
  surface-container: '#122130'
  surface-container-high: '#1d2b3b'
  surface-container-highest: '#273646'
  on-surface: '#d5e4f9'
  on-surface-variant: '#bdc8d1'
  inverse-surface: '#d5e4f9'
  inverse-on-surface: '#233242'
  outline: '#87929a'
  outline-variant: '#3e484f'
  surface-tint: '#7bd0ff'
  primary: '#8ed5ff'
  on-primary: '#00354a'
  primary-container: '#38bdf8'
  on-primary-container: '#004965'
  inverse-primary: '#00668a'
  secondary: '#44e2cd'
  on-secondary: '#003731'
  secondary-container: '#03c6b2'
  on-secondary-container: '#004d44'
  tertiary: '#ffc174'
  on-tertiary: '#472a00'
  tertiary-container: '#f59e0b'
  on-tertiary-container: '#613b00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c4e7ff'
  primary-fixed-dim: '#7bd0ff'
  on-primary-fixed: '#001e2c'
  on-primary-fixed-variant: '#004c69'
  secondary-fixed: '#62fae3'
  secondary-fixed-dim: '#3cddc7'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005047'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#051423'
  on-background: '#d5e4f9'
  surface-variant: '#273646'
typography:
  headline-xl:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Manrope
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  data-metric:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  data-table:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.25rem
  margin: 1rem
  margin-desktop: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes an academic, scientific, and mission-critical telemetry interface for analyzing urban thermal exposure, microclimatic heat islands, and computational cooling interventions. Developed for rigorous institutional and municipal research environments, the visual tone avoids decorative distraction in favor of scientific clarity, empirical authority, and analytical precision.

### Design Movement: Technical Modernism & Tonal Precision
The aesthetic draws from advanced geospatial consoles, technical telemetry stations, and high-density academic dashboards. 
- **Restraint Over Spectacle:** Explicitly eliminates blurred glassmorphism, decorative ambient glow, skeuomorphic gradients, and non-functional flourishes. 
- **Data-First Hierarchy:** Dense, high-legibility telemetry layouts allow researchers to parse spatial isotherms, land surface temperature (LST) indices, and heat-vulnerability matrices at a glance.
- **Calm, High-Contrast Readability:** Anchored in a deep astronomical navy foundation that prevents eye fatigue across prolonged research shifts, paired with high-contrast text and strictly semantic thermal alerts.

## Colors

The color system operates on an empirical dark-field canvas. Colors are not decorative; they convey exact environmental metrics, heat thresholds, system statuses, and interaction targets.

### Surface Hierarchy
- **Canvas / Root Background (`#0B1220`):** Base coordinate canvas and layout shell.
- **Secondary Surface (`#111C2E`):** Navigation bars, persistent toolbars, panel backdrops, and rail headers.
- **Card Surface / Container (`#162238`):** Analytical tiles, telemetry pods, modal bodies, and inspector modules.
- **Hover / Active Surface (`#1C2A44`):** Interactive feedback state for list rows, table cells, and clickable analytical cards.
- **Dividers & Structural Borders (`#28364B`):** Crisp 1px boundaries dividing coordinate planes, charts, and telemetry pods.

### Typography & Content Tokens
- **Primary Text (`#F1F5F9`):** 94% contrast off-white for data points, values, critical labels, and primary headlines.
- **Secondary / Muted Text (`#9AA9BD`):** Neutral slate for metadata, secondary legends, measurement units, and structural captions.
- **Disabled Text (`#475569`):** Subdued inactive data fields and unselected states.

### Thermal & Analytical Semantics
- **Cooler Baseline / Optimal Range (`#2DD4BF` - Teal):** Reflects vegetative mitigation, optimal microclimate buffers, and controlled thermal baselines.
- **Thermal Caution / Moderate Heat (`#F59E0B` - Amber):** Warning state for microclimates crossing acceptable thresholds, requiring localized interventions.
- **Critical Heat / Extreme Hazard (`#EF4444` - Hot Red):** High-priority alerts indicating dangerous wet-bulb globes, high LST, and acute vulnerability hotspots.
- **Interactive Focus / Primary Action (`#38BDF8` - Sky Blue):** Precision targeting for active tools, selection states, focus rings, toggles, and scalar controls.

## Typography

Typography prioritizes technical legibility, geometric balance, and strict alignment across visual telemetry. 

- **Display & Section Headers (Manrope):** Geometric, precise sans-serif with subtle technological cues for module titles, analytical views, and major panel anchors.
- **Scientific Body & Analytical UI (Inter):** Highly legible, neutral workhorse engineered for dense informational layouts, parameter lists, metadata, and form inputs.
- **Tabular Numerics Rule:** All measurement readouts, telemetry figures, coordinates, temperature outputs (°C), and tabular cells must enforce OpenType tabular figures (`font-feature-settings: 'tnum' 1, 'cv05' 1`). This eliminates horizontal jitter during real-time data streaming and aligns decimal points reliably.
- **Micro-Labels & Data Indicators:** Tracked uppercase styling (`label-sm`) is reserved strictly for operational state indicators (e.g., `BASELINE`, `CALIBRATING`, `ELEVATED`), sensor designations, and axis bounds.

## Layout & Spacing

Layouts follow a structured modular grid system calibrated for multi-pane analytical dashboards, GIS map viewports, and temporal chart views.

### Screen Adaptability & Breakpoints
- **Desktop & Workstations (≥ 1280px):** 12-column persistent multi-pane shell. Sidebar navigation (fixed 64px collapsed / 240px expanded), central interactive map/visualization stage (fluid), and contextual telemetry side-inspector (fixed 360px or 400px).
- **Tablet (768px – 1279px):** 8-column layout with collapsable inspector panes sliding over the visualization canvas as sheets or bottom trays.
- **Mobile Handheld (< 768px):** 4-column stacked flow. Data maps lock to a 16:9 or 1:1 tactile frame with analytical cards and thermal metrics stacking beneath in linear chronological cards.

### Spacing Discipline
To maintain professional academic density:
- Internal component paddings rely primarily on `space-sm` (8px) and `space-md` (12px), avoiding ballooning whitespace that pushes critical data off-screen.
- Data containers and cards standardize on `space-lg` (20px) internal clearance.
- Vertical gap rhythms between stacked data rows strictly utilize `space-xs` (4px) and `space-sm` (8px).

## Elevation & Depth

This design system avoids soft, floating consumer shadows and glassy refractions. It achieves visual depth through **Tonal Stratification and Low-Contrast Technical Borders**.

### Depth Layers
1. **Base Layer (L0 - `#0B1220`):** Global canvas background, base map container, and full-viewport GIS canvas.
2. **Sub-Surface Tier (L1 - `#111C2E`):** Navigation rails, top command bars, fixed data docks. Border: 1px solid `#28364B`.
3. **Card & Module Tier (L2 - `#162238`):** Analytical widgets, metric pods, chart boxes, and tabular panels. Border: 1px solid `#28364B`.
4. **Elevated Overlays & Flyouts (L3 - `#1C2A44`):** Contextual tooltips, coordinate popovers, dropdown lists, and filter menus. Border: 1px solid `#38BDF8` at 40% opacity or `#28364B`. Shadow: `0 4px 12px rgba(0, 0, 0, 0.45)`—sharp, technical drop shadow without glow diffusion.
5. **Modal System Layer (L4 - `#162238`):** System dialogs and export manifests. Backdrop: `#0B1220` with 80% opacity and no blur. Shadow: `0 12px 32px rgba(0, 0, 0, 0.65)`.

### Border Integrity
Every structural card, module edge, and panel seam uses crisp 1px borders in `#28364B`. When a module enters an active or inspected state, its border transitions directly to `#38BDF8` (Sky Blue) without scaling or ambient halo effects.

## Shapes

The interface embraces a **Soft Technical (`1`)** shape logic. High-radii pills and bubbly curves are eliminated in favor of clean, compact contours that maximize usable canvas area and maintain an instrument-grade appearance.

### Corner Radii
- **Micro Radii (`0.125rem` / 2px):** Checkbox indicators, range track thumbs, mini sparkline markers.
- **Default Base (`0.25rem` / 4px):** Form fields, action buttons, telemetry value chips, table selection markers, status indicators.
- **Module Cards (`0.5rem` / 8px):** Primary analytical cards, map overlays, modal dialogue shells, inspector side-panels (`rounded-lg`).
- **Interactive Focus Indicator:** Rectangular with sharp 2px exterior offset (`outline: 2px solid #38BDF8; outline-offset: 2px;`).

## Components

### Buttons
- **Primary Technical Action:** Background `#38BDF8`, Text `#0B1220`, Font Weight `600`, Border radius `4px`, Height `36px`, Padding `0 14px`. Hover: `#7DD3FC`. Active: `#0284C7`. Focus: 2px offset ring `#38BDF8`.
- **Secondary / Metric Action:** Background `#162238`, Border `1px solid #28364B`, Text `#F1F5F9`. Hover: Background `#1C2A44`, Border `#38BDF8`.
- **Destructive / Override Action:** Background `transparent`, Border `1px solid #EF4444`, Text `#EF4444`. Hover: Background `#EF4444` at 10% opacity.

### Analytical Badges & Status Chips
- Badges feature a semi-subdued background with a high-contrast border and text, accompanied by a 6px solid status dot:
  - **Optimal / Cool:** Background `#2DD4BF1A`, Border `#2DD4BF4D`, Text `#2DD4BF`.
  - **Caution / Moderate:** Background `#F59E0B1A`, Border `#F59E0B4D`, Text `#F59E0B`.
  - **Critical Heat:** Background `#EF44441A`, Border `#EF44444D`, Text `#EF4444`.
- Padding: `2px 8px`, Height: `22px`, Font: `label-sm`, Border radius: `4px`.

### Telemetry Cards & Metric Pods
- Background: `#162238`, Border: `1px solid #28364B`, Radius: `8px`, Padding: `16px`.
- Structure:
  1. **Top Row:** Uppercase label (`label-sm`, color `#9AA9BD`) with an optional inline sensor status indicator.
  2. **Middle Value:** Large tabular figure (`data-metric`, color `#F1F5F9`), paired with a secondary unit label (`body-sm`, `#9AA9BD`, e.g., `°C`, `W/m²`, `%`).
  3. **Bottom Context:** Comparative micro-sparkline or localized variance index (e.g., `+2.4°C vs baseline` highlighted in Amber or Red).

### Data Tables & Sensor Feeds
- Header: Background `#111C2E`, Text `#9AA9BD`, Font `label-sm`, Border bottom `1px solid #28364B`, Height `36px`.
- Rows: Background alternating between `#162238` and `#111C2E` (or unified `#162238` with 1px dividers), Height `40px`, Text `#F1F5F9`, Font `data-table` with tabular numerals.
- Hover State: `#1C2A44` transitioning over 100ms.

### Form Inputs & Parameter Sliders
- Input fields: Background `#0B1220`, Border `1px solid #28364B`, Text `#F1F5F9`, Height `36px`, Radius `4px`, Padding `0 12px`.
- Focus state: Border `#38BDF8`, Outline none, Shadow none.
- Parameter range sliders: Track height `4px`, Background `#28364B`, Active filled track `#38BDF8`, Thumb `14px` square or circle `#F1F5F9` with `#38BDF8` border.

### Thermal Map Layer Controls
- Segmented toggle controls for raster heat maps, canopy indices, and wind corridors:
  - Container: Background `#0B1220`, Padding `2px`, Border `1px solid #28364B`, Radius `4px`.
  - Segment: Text `#9AA9BD`, Font `label-md`. When active: Background `#162238`, Text `#38BDF8`, Border `1px solid #28364B`.