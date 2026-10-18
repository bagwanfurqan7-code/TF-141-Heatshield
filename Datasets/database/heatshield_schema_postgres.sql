-- ============================================================================
-- HEATSHIELD: POSTGRESQL 14+ & SUPABASE PRODUCTION RELATIONAL SCHEMA
-- Target System: Solapur Urban Heat Island & Cooling Prioritization System
-- Dialect: PostgreSQL 14+ / Supabase Compatible
-- Observation Period: 2021-2025 | Master Dataset Size: 150,000 Rows
-- ============================================================================

-- Safe Transactional Execution
BEGIN;

-- ----------------------------------------------------------------------------
-- PART 1: MASTER STAGING TABLE
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS heatshield_master (
    record_id VARCHAR(30) PRIMARY KEY,
    location_id VARCHAR(20) NOT NULL,
    observation_datetime TIMESTAMPTZ NOT NULL,
    observation_date DATE NOT NULL,
    year SMALLINT NOT NULL,
    month SMALLINT NOT NULL,
    day SMALLINT NOT NULL,
    season VARCHAR(20) NOT NULL,
    data_source_type VARCHAR(50) NOT NULL DEFAULT 'Synthetic simulation',
    is_synthetic BOOLEAN NOT NULL DEFAULT TRUE,

    city VARCHAR(50) NOT NULL DEFAULT 'Solapur',
    state VARCHAR(50) NOT NULL DEFAULT 'Maharashtra',
    country VARCHAR(50) NOT NULL DEFAULT 'India',
    latitude DECIMAL(9, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL,
    location_name VARCHAR(120) NOT NULL,
    zone_type VARCHAR(30) NOT NULL,
    elevation_m SMALLINT NOT NULL,
    population_density_per_km2 INT NOT NULL,
    distance_to_green_space_m INT NOT NULL,

    air_temperature_c DECIMAL(5, 2) NOT NULL,
    max_air_temperature_c DECIMAL(5, 2) NOT NULL,
    min_air_temperature_c DECIMAL(5, 2) NOT NULL,
    relative_humidity_pct DECIMAL(4, 1) NOT NULL,
    wind_speed_mps DECIMAL(4, 2) NOT NULL,
    wind_direction_deg DECIMAL(4, 1) NOT NULL,
    solar_radiation_w_m2 DECIMAL(6, 1) NOT NULL,
    precipitation_mm DECIMAL(5, 1) NOT NULL,
    cloud_cover_pct DECIMAL(4, 1) NOT NULL,
    atmospheric_pressure_hpa DECIMAL(6, 1) NOT NULL,

    land_surface_temperature_c DECIMAL(5, 2) NOT NULL,
    surface_temperature_anomaly_c DECIMAL(5, 2) NOT NULL,
    ndvi DECIMAL(4, 3) NOT NULL,
    ndbi DECIMAL(4, 3) NOT NULL,
    ndwi DECIMAL(4, 3) NOT NULL,
    vegetation_cover_pct DECIMAL(4, 1) NOT NULL,
    impervious_surface_pct DECIMAL(4, 1) NOT NULL,
    building_density_index DECIMAL(3, 2) NOT NULL,
    road_density_km_per_km2 DECIMAL(4, 1) NOT NULL,
    tree_canopy_cover_pct DECIMAL(4, 1) NOT NULL,
    shade_availability_pct DECIMAL(4, 1) NOT NULL,
    surface_albedo DECIMAL(3, 2) NOT NULL,
    distance_to_water_m INT NOT NULL,

    pedestrian_activity_index DECIMAL(4, 1) NOT NULL,
    traffic_intensity_index DECIMAL(4, 1) NOT NULL,
    built_up_intensity_index DECIMAL(4, 1) NOT NULL,
    heat_exposure_index DECIMAL(4, 1) NOT NULL,
    vulnerable_population_index DECIMAL(4, 1) NOT NULL,
    cooling_infrastructure_present BOOLEAN NOT NULL,
    cooling_infrastructure_type VARCHAR(50) NOT NULL,

    urban_heat_island_intensity_c DECIMAL(4, 2) NOT NULL,
    heat_risk_category VARCHAR(20) NOT NULL,
    shade_gap_index DECIMAL(4, 1) NOT NULL,
    green_cover_deficit_pct DECIMAL(4, 1) NOT NULL,
    cooling_priority_score DECIMAL(4, 1) NOT NULL,
    recommended_intervention VARCHAR(120) NOT NULL,
    estimated_cooling_potential_c DECIMAL(4, 2) NOT NULL,

    CONSTRAINT chk_pg_master_rh CHECK (relative_humidity_pct BETWEEN 0 AND 100),
    CONSTRAINT chk_pg_master_cloud CHECK (cloud_cover_pct BETWEEN 0 AND 100),
    CONSTRAINT chk_pg_master_ndvi CHECK (ndvi BETWEEN -1.0 AND 1.0),
    CONSTRAINT chk_pg_master_ndbi CHECK (ndbi BETWEEN -1.0 AND 1.0),
    CONSTRAINT chk_pg_master_ndwi CHECK (ndwi BETWEEN -1.0 AND 1.0),
    CONSTRAINT chk_pg_master_veg CHECK (vegetation_cover_pct BETWEEN 0 AND 100),
    CONSTRAINT chk_pg_master_imp CHECK (impervious_surface_pct BETWEEN 0 AND 100),
    CONSTRAINT chk_pg_master_bldg CHECK (building_density_index BETWEEN 0.0 AND 1.0),
    CONSTRAINT chk_pg_master_albedo CHECK (surface_albedo BETWEEN 0.0 AND 1.0),
    CONSTRAINT chk_pg_master_cps CHECK (cooling_priority_score BETWEEN 0 AND 100),
    CONSTRAINT chk_pg_master_temp_hierarchy CHECK (min_air_temperature_c <= air_temperature_c AND air_temperature_c <= max_air_temperature_c)
);

CREATE INDEX IF NOT EXISTS idx_pg_master_loc ON heatshield_master (location_id);
CREATE INDEX IF NOT EXISTS idx_pg_master_dt ON heatshield_master (observation_datetime);
CREATE INDEX IF NOT EXISTS idx_pg_master_risk ON heatshield_master (heat_risk_category);

-- ----------------------------------------------------------------------------
-- PART 2: NORMALIZED 3NF RELATIONAL SCHEMA
-- ----------------------------------------------------------------------------

-- Table 1: locations (Geospatial Station Dimension)
CREATE TABLE IF NOT EXISTS locations (
    location_id VARCHAR(20) PRIMARY KEY,
    location_name VARCHAR(120) NOT NULL,
    zone_type VARCHAR(30) NOT NULL,
    city VARCHAR(50) NOT NULL DEFAULT 'Solapur',
    state VARCHAR(50) NOT NULL DEFAULT 'Maharashtra',
    country VARCHAR(50) NOT NULL DEFAULT 'India',
    latitude DECIMAL(9, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL,
    elevation_m SMALLINT NOT NULL,
    population_density_per_km2 INT NOT NULL,
    distance_to_green_space_m INT NOT NULL,
    distance_to_water_m INT NOT NULL,
    cooling_infrastructure_present BOOLEAN NOT NULL,
    cooling_infrastructure_type VARCHAR(50) NOT NULL,
    vulnerable_population_index DECIMAL(4, 1) NOT NULL,
    CONSTRAINT chk_pg_loc_lat CHECK (latitude BETWEEN 17.50 AND 17.85),
    CONSTRAINT chk_pg_loc_lon CHECK (longitude BETWEEN 75.75 AND 76.10)
);

CREATE INDEX IF NOT EXISTS idx_pg_locations_zone ON locations (zone_type);
CREATE INDEX IF NOT EXISTS idx_pg_locations_coords ON locations (latitude, longitude);

-- Table 2: land_cover (Morphological Baseline Dimension)
CREATE TABLE IF NOT EXISTS land_cover (
    location_id VARCHAR(20) PRIMARY KEY,
    zone_type VARCHAR(30) NOT NULL,
    base_vegetation_cover_pct DECIMAL(4, 1) NOT NULL,
    base_impervious_surface_pct DECIMAL(4, 1) NOT NULL,
    base_building_density_index DECIMAL(3, 2) NOT NULL,
    base_road_density_km_per_km2 DECIMAL(4, 1) NOT NULL,
    base_tree_canopy_cover_pct DECIMAL(4, 1) NOT NULL,
    surface_albedo DECIMAL(3, 2) NOT NULL,
    CONSTRAINT fk_pg_landcover_loc FOREIGN KEY (location_id) REFERENCES locations (location_id) ON DELETE CASCADE
);

-- Table 3: weather_observations (Meteorological Fact Table)
CREATE TABLE IF NOT EXISTS weather_observations (
    record_id VARCHAR(30) PRIMARY KEY,
    location_id VARCHAR(20) NOT NULL,
    observation_datetime TIMESTAMPTZ NOT NULL,
    observation_date DATE NOT NULL,
    year SMALLINT NOT NULL,
    month SMALLINT NOT NULL,
    day SMALLINT NOT NULL,
    season VARCHAR(20) NOT NULL,
    air_temperature_c DECIMAL(5, 2) NOT NULL,
    max_air_temperature_c DECIMAL(5, 2) NOT NULL,
    min_air_temperature_c DECIMAL(5, 2) NOT NULL,
    relative_humidity_pct DECIMAL(4, 1) NOT NULL,
    wind_speed_mps DECIMAL(4, 2) NOT NULL,
    wind_direction_deg DECIMAL(4, 1) NOT NULL,
    solar_radiation_w_m2 DECIMAL(6, 1) NOT NULL,
    precipitation_mm DECIMAL(5, 1) NOT NULL,
    cloud_cover_pct DECIMAL(4, 1) NOT NULL,
    atmospheric_pressure_hpa DECIMAL(6, 1) NOT NULL,
    CONSTRAINT fk_pg_weather_loc FOREIGN KEY (location_id) REFERENCES locations (location_id) ON DELETE CASCADE,
    CONSTRAINT chk_pg_weather_rh CHECK (relative_humidity_pct BETWEEN 0 AND 100),
    CONSTRAINT chk_pg_weather_temp CHECK (min_air_temperature_c <= air_temperature_c AND air_temperature_c <= max_air_temperature_c)
);

CREATE INDEX IF NOT EXISTS idx_pg_weather_loc_time ON weather_observations (location_id, observation_datetime);
CREATE INDEX IF NOT EXISTS idx_pg_weather_date ON weather_observations (observation_date);
CREATE INDEX IF NOT EXISTS idx_pg_weather_season ON weather_observations (season);

-- Table 4: surface_observations (Satellite & Spectral Fact Table)
CREATE TABLE IF NOT EXISTS surface_observations (
    record_id VARCHAR(30) PRIMARY KEY,
    location_id VARCHAR(20) NOT NULL,
    observation_datetime TIMESTAMPTZ NOT NULL,
    land_surface_temperature_c DECIMAL(5, 2) NOT NULL,
    surface_temperature_anomaly_c DECIMAL(5, 2) NOT NULL,
    ndvi DECIMAL(4, 3) NOT NULL,
    ndbi DECIMAL(4, 3) NOT NULL,
    ndwi DECIMAL(4, 3) NOT NULL,
    vegetation_cover_pct DECIMAL(4, 1) NOT NULL,
    impervious_surface_pct DECIMAL(4, 1) NOT NULL,
    building_density_index DECIMAL(3, 2) NOT NULL,
    road_density_km_per_km2 DECIMAL(4, 1) NOT NULL,
    tree_canopy_cover_pct DECIMAL(4, 1) NOT NULL,
    shade_availability_pct DECIMAL(4, 1) NOT NULL,
    surface_albedo DECIMAL(3, 2) NOT NULL,
    CONSTRAINT fk_pg_surface_loc FOREIGN KEY (location_id) REFERENCES locations (location_id) ON DELETE CASCADE,
    CONSTRAINT fk_pg_surface_rec FOREIGN KEY (record_id) REFERENCES weather_observations (record_id) ON DELETE CASCADE,
    CONSTRAINT chk_pg_surface_ndvi CHECK (ndvi BETWEEN -1.0 AND 1.0),
    CONSTRAINT chk_pg_surface_ndbi CHECK (ndbi BETWEEN -1.0 AND 1.0),
    CONSTRAINT chk_pg_surface_ndwi CHECK (ndwi BETWEEN -1.0 AND 1.0)
);

CREATE INDEX IF NOT EXISTS idx_pg_surface_loc_time ON surface_observations (location_id, observation_datetime);
CREATE INDEX IF NOT EXISTS idx_pg_surface_lst ON surface_observations (land_surface_temperature_c);

-- Table 5: heat_assessments (Public Health Exposure & Risk Evaluation)
CREATE TABLE IF NOT EXISTS heat_assessments (
    record_id VARCHAR(30) PRIMARY KEY,
    location_id VARCHAR(20) NOT NULL,
    observation_datetime TIMESTAMPTZ NOT NULL,
    urban_heat_island_intensity_c DECIMAL(4, 2) NOT NULL,
    pedestrian_activity_index DECIMAL(4, 1) NOT NULL,
    traffic_intensity_index DECIMAL(4, 1) NOT NULL,
    built_up_intensity_index DECIMAL(4, 1) NOT NULL,
    heat_exposure_index DECIMAL(4, 1) NOT NULL,
    vulnerable_population_index DECIMAL(4, 1) NOT NULL,
    heat_risk_category VARCHAR(20) NOT NULL,
    CONSTRAINT fk_pg_assess_loc FOREIGN KEY (location_id) REFERENCES locations (location_id) ON DELETE CASCADE,
    CONSTRAINT fk_pg_assess_rec FOREIGN KEY (record_id) REFERENCES weather_observations (record_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_pg_assess_risk ON heat_assessments (heat_risk_category);
CREATE INDEX IF NOT EXISTS idx_pg_assess_uhi ON heat_assessments (urban_heat_island_intensity_c);

-- Table 6: interventions (Cooling Intervention Decision-Making Table)
CREATE TABLE IF NOT EXISTS interventions (
    record_id VARCHAR(30) PRIMARY KEY,
    location_id VARCHAR(20) NOT NULL,
    observation_datetime TIMESTAMPTZ NOT NULL,
    shade_gap_index DECIMAL(4, 1) NOT NULL,
    green_cover_deficit_pct DECIMAL(4, 1) NOT NULL,
    cooling_priority_score DECIMAL(4, 1) NOT NULL,
    recommended_intervention VARCHAR(120) NOT NULL,
    estimated_cooling_potential_c DECIMAL(4, 2) NOT NULL,
    CONSTRAINT fk_pg_interv_loc FOREIGN KEY (location_id) REFERENCES locations (location_id) ON DELETE CASCADE,
    CONSTRAINT fk_pg_interv_rec FOREIGN KEY (record_id) REFERENCES weather_observations (record_id) ON DELETE CASCADE,
    CONSTRAINT chk_pg_interv_cps CHECK (cooling_priority_score BETWEEN 0 AND 100)
);

CREATE INDEX IF NOT EXISTS idx_pg_interv_score ON interventions (cooling_priority_score);
CREATE INDEX IF NOT EXISTS idx_pg_interv_type ON interventions (recommended_intervention);

-- ----------------------------------------------------------------------------
-- PART 3: REPRODUCIBLE ETL DATA LOAD (FROM MASTER STAGING TABLE)
-- ----------------------------------------------------------------------------

-- Populate locations
INSERT INTO locations (
    location_id, location_name, zone_type, city, state, country,
    latitude, longitude, elevation_m, population_density_per_km2,
    distance_to_green_space_m, distance_to_water_m,
    cooling_infrastructure_present, cooling_infrastructure_type,
    vulnerable_population_index
)
SELECT DISTINCT
    location_id, location_name, zone_type, city, state, country,
    latitude, longitude, elevation_m, population_density_per_km2,
    distance_to_green_space_m, distance_to_water_m,
    cooling_infrastructure_present, cooling_infrastructure_type,
    vulnerable_population_index
FROM heatshield_master
ON CONFLICT (location_id) DO NOTHING;

-- Populate land_cover
INSERT INTO land_cover (
    location_id, zone_type, base_vegetation_cover_pct, base_impervious_surface_pct,
    base_building_density_index, base_road_density_km_per_km2, base_tree_canopy_cover_pct, surface_albedo
)
SELECT 
    location_id, zone_type,
    ROUND(AVG(vegetation_cover_pct), 1),
    ROUND(AVG(impervious_surface_pct), 1),
    ROUND(AVG(building_density_index), 2),
    ROUND(AVG(road_density_km_per_km2), 1),
    ROUND(AVG(tree_canopy_cover_pct), 1),
    ROUND(AVG(surface_albedo), 2)
FROM heatshield_master
GROUP BY location_id, zone_type
ON CONFLICT (location_id) DO NOTHING;

-- Populate weather_observations
INSERT INTO weather_observations (
    record_id, location_id, observation_datetime, observation_date,
    year, month, day, season, air_temperature_c, max_air_temperature_c,
    min_air_temperature_c, relative_humidity_pct, wind_speed_mps,
    wind_direction_deg, solar_radiation_w_m2, precipitation_mm,
    cloud_cover_pct, atmospheric_pressure_hpa
)
SELECT
    record_id, location_id, observation_datetime, observation_date,
    year, month, day, season, air_temperature_c, max_air_temperature_c,
    min_air_temperature_c, relative_humidity_pct, wind_speed_mps,
    wind_direction_deg, solar_radiation_w_m2, precipitation_mm,
    cloud_cover_pct, atmospheric_pressure_hpa
FROM heatshield_master
ON CONFLICT (record_id) DO NOTHING;

-- Populate surface_observations
INSERT INTO surface_observations (
    record_id, location_id, observation_datetime, land_surface_temperature_c,
    surface_temperature_anomaly_c, ndvi, ndbi, ndwi,
    vegetation_cover_pct, impervious_surface_pct, building_density_index,
    road_density_km_per_km2, tree_canopy_cover_pct, shade_availability_pct,
    surface_albedo
)
SELECT
    record_id, location_id, observation_datetime, land_surface_temperature_c,
    surface_temperature_anomaly_c, ndvi, ndbi, ndwi,
    vegetation_cover_pct, impervious_surface_pct, building_density_index,
    road_density_km_per_km2, tree_canopy_cover_pct, shade_availability_pct,
    surface_albedo
FROM heatshield_master
ON CONFLICT (record_id) DO NOTHING;

-- Populate heat_assessments
INSERT INTO heat_assessments (
    record_id, location_id, observation_datetime, urban_heat_island_intensity_c,
    pedestrian_activity_index, traffic_intensity_index, built_up_intensity_index,
    heat_exposure_index, vulnerable_population_index, heat_risk_category
)
SELECT
    record_id, location_id, observation_datetime, urban_heat_island_intensity_c,
    pedestrian_activity_index, traffic_intensity_index, built_up_intensity_index,
    heat_exposure_index, vulnerable_population_index, heat_risk_category
FROM heatshield_master
ON CONFLICT (record_id) DO NOTHING;

-- Populate interventions
INSERT INTO interventions (
    record_id, location_id, observation_datetime, shade_gap_index,
    green_cover_deficit_pct, cooling_priority_score, recommended_intervention,
    estimated_cooling_potential_c
)
SELECT
    record_id, location_id, observation_datetime, shade_gap_index,
    green_cover_deficit_pct, cooling_priority_score, recommended_intervention,
    estimated_cooling_potential_c
FROM heatshield_master
ON CONFLICT (record_id) DO NOTHING;

COMMIT;

-- ----------------------------------------------------------------------------
-- PART 4: REPAIRED ANALYTICAL BENCHMARK QUERIES
-- ----------------------------------------------------------------------------

-- Query 1: Top 10 Priority Hotspots in Solapur (PostgreSQL Ordered-Set MODE())
SELECT 
    l.location_id,
    l.location_name,
    l.zone_type,
    ROUND(AVG(s.land_surface_temperature_c), 2) AS avg_surface_temp,
    ROUND(AVG(i.shade_gap_index), 1) AS avg_shade_gap,
    ROUND(AVG(i.cooling_priority_score), 1) AS avg_cooling_priority,
    MODE() WITHIN GROUP (ORDER BY i.recommended_intervention) AS primary_intervention
FROM locations l
JOIN surface_observations s ON l.location_id = s.location_id
JOIN interventions i ON s.record_id = i.record_id
GROUP BY l.location_id, l.location_name, l.zone_type
ORDER BY avg_cooling_priority DESC
LIMIT 10;

-- Query 2: Monthly Climatological Heat Dynamics
SELECT 
    w.year,
    w.month,
    w.season,
    ROUND(AVG(w.air_temperature_c), 2) AS mean_air_temp,
    ROUND(AVG(s.land_surface_temperature_c), 2) AS mean_surface_temp,
    ROUND(AVG(h.urban_heat_island_intensity_c), 2) AS mean_uhi_intensity,
    COUNT(CASE WHEN h.heat_risk_category = 'Very High' THEN 1 END) AS very_high_risk_count
FROM weather_observations w
JOIN surface_observations s ON w.record_id = s.record_id
JOIN heat_assessments h ON w.record_id = h.record_id
GROUP BY w.year, w.month, w.season
ORDER BY w.year, w.month;

-- Query 3: Repaired Zone-Wise Resource Allocation Plan
-- (Fixed: GROUP BY syntax error and replaced non-existent l.tree_canopy_cover_pct with lc.base_tree_canopy_cover_pct)
SELECT 
    l.zone_type,
    COUNT(DISTINCT l.location_id) AS total_locations,
    ROUND(AVG(lc.base_tree_canopy_cover_pct), 1) AS avg_existing_canopy_pct,
    ROUND(AVG(i.green_cover_deficit_pct), 1) AS avg_green_deficit_pct,
    ROUND(AVG(i.cooling_priority_score), 1) AS avg_priority_score,
    ROUND(AVG(i.estimated_cooling_potential_c), 2) AS expected_cooling_reduction_c
FROM locations l
JOIN land_cover lc ON l.location_id = lc.location_id
JOIN interventions i ON l.location_id = i.location_id
GROUP BY l.zone_type
ORDER BY avg_priority_score DESC;
