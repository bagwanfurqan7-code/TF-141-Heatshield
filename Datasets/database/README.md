# HeatShield Relational Database Schemas & Migrations

**Course Track**: Database Management Systems (DBMS)  
**Academic Institution**: MIT Vishwaprayag University (MIT-VPU), Solapur  
**Project**: HeatShield — Urban Heat Exposure Analysis & Cooling Prioritization  
**Target Architecture**: 3NF Normalized Relational Model (6 Tables, 12 Analytical Queries)

---

## 1. Schema Files Overview

This directory provides dialect-specific and unified DDL scripts for deploying the HeatShield relational database:

| File Name | Target Database Engine | Description & Dialect Specifics |
|---|---|---|
| [`heatshield_schema_postgres.sql`](file:///S:/Datasets%20Imporvements/HeatShield_Updated_Files/database/heatshield_schema_postgres.sql) | **PostgreSQL 14+ / Supabase** | Strict PostgreSQL DDL using `TIMESTAMPTZ`, `NUMERIC`, check constraints, B-tree indexes, and PostgreSQL-native `MODE() WITHIN GROUP (ORDER BY ...)` statistical aggregations. Compatible with Supabase SQL Editor. |
| [`heatshield_schema_mysql.sql`](file:///S:/Datasets%20Imporvements/HeatShield_Updated_Files/database/heatshield_schema_mysql.sql) | **MySQL 8.0+ / MariaDB** | MySQL 8.0+ DDL using backticks, `DATETIME`, `DECIMAL`, B-tree indexing, and standard CTEs/subqueries for statistical modes. Fully compatible with MySQL Workbench and phpMyAdmin. |
| [`Heat Shield Database Schema.sql`](file:///S:/Datasets%20Imporvements/HeatShield_Updated_Files/database/Heat%20Shield%20Database%20Schema.sql) | **Unified Academic Reference** | Unified script containing complete DDL, index definitions, ETL transformation logic, and all 12 analytical queries with corrected syntax (`GROUP BY l.zone_type`) and resolved table joins (`JOIN land_cover`). |

---

## 2. 3NF Relational Table Architecture

The HeatShield relational model normalizes the 57-column master simulation into 6 entities:

1. **`locations`** (Spatial Dimension — 100 rows): Stationary microclimate monitoring sites across 9 urban zones in Solapur. Primary Key: `location_id`.
2. **`land_cover`** (Morphological Baseline — 100 rows): Fixed biophysical characteristics (vegetation cover %, impervious surface %, tree canopy %, albedo). Primary Key: `location_id` (Foreign Key to `locations`).
3. **`weather_observations`** (Meteorological Fact — 150,000 rows): Atmospheric time series (air temperature, humidity, solar radiation, wind). Primary Key: `record_id`, Composite Unique: `(location_id, observation_datetime)`.
4. **`surface_observations`** (Remote Sensing Fact — 150,000 rows): Radiative skin temperature (LST) and spectral indices (NDVI, NDBI, NDWI). Primary Key: `record_id`.
5. **`heat_assessments`** (Thermal Risk Fact — 150,000 rows): Urban Heat Island intensity, Heat Exposure Index, and public health risk tiers. Primary Key: `record_id`.
6. **`interventions`** (Cooling Decision Fact — 150,000 rows): Shade gap index, green cover deficit %, Multi-Criteria Decision Making (MCDM) Cooling Priority Score, and recommended mitigation actions. Primary Key: `record_id`.

---

## 3. Deployment Instructions

### A. Deploying to PostgreSQL / Supabase
1. Connect via `psql` or open the Supabase SQL Editor.
2. Execute the migration script:
   ```bash
   psql -U postgres -d heatshield_db -f heatshield_schema_postgres.sql
   ```
3. Load the master dataset into the staging table:
   ```sql
   \copy heatshield_master FROM '../datasets/Heat Shield Master Dataset.csv' WITH (FORMAT csv, HEADER true);
   ```
4. Execute the normalized INSERT statements defined in Section 3 of the script to populate the 6 tables.

### B. Deploying to MySQL 8.0+
1. Connect via MySQL CLI:
   ```bash
   mysql -u root -p
   ```
2. Create and select the database:
   ```sql
   CREATE DATABASE heatshield_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   USE heatshield_db;
   SOURCE heatshield_schema_mysql.sql;
   ```
3. Load the master dataset into the staging table:
   ```sql
   LOAD DATA LOCAL INFILE '../datasets/Heat Shield Master Dataset.csv'
   INTO TABLE heatshield_master
   FIELDS TERMINATED BY ','
   ENCLOSED BY '"'
   LINES TERMINATED BY '\n'
   IGNORE 1 ROWS;
   ```

---

## 4. Analytical Queries & Benchmark Verification
All 12 analytical queries (spatial hotspot ranking, seasonal trajectory comparison, zone resource allocation, etc.) have been verified and tested against the 150,000-row dataset with zero execution errors.
