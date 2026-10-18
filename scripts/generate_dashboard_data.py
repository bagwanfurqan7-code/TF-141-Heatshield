import csv
import json
import os

os.makedirs('src/data', exist_ok=True)

months_stat = {m: {'month': m, 'name': ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m-1], 'air_temp_sum': 0.0, 'lst_sum': 0.0, 'max_temp_sum': 0.0, 'count': 0} for m in range(1, 13)}

zones_stat = {}
seasons_stat = {}
dist_buckets_air = {k: 0 for k in ['15-20°C', '20-25°C', '25-30°C', '30-35°C', '35-40°C', '40-45°C', '45-50°C']}
dist_buckets_lst = {k: 0 for k in ['15-20°C', '20-25°C', '25-30°C', '30-35°C', '35-40°C', '40-45°C', '45-50°C', '50-55°C']}

trend_series = []
date_seen = {}

with open('Datasets/datasets/Heat Shield Master Dataset.csv', mode='r', encoding='utf-8') as f:
    for row in csv.DictReader(f):
        m = int(row['month'])
        t_air = float(row['air_temperature_c'])
        t_max = float(row['max_air_temperature_c'])
        t_lst = float(row['land_surface_temperature_c'])
        score = float(row['cooling_priority_score'])
        ndvi = float(row['ndvi'])
        zone = row['zone_type']
        season = row['season']
        dt = row['observation_date']

        # Months
        months_stat[m]['air_temp_sum'] += t_air
        months_stat[m]['lst_sum'] += t_lst
        months_stat[m]['max_temp_sum'] += t_max
        months_stat[m]['count'] += 1

        # Zones
        if zone not in zones_stat:
            zones_stat[zone] = {'zone': zone, 'air_sum': 0.0, 'lst_sum': 0.0, 'ndvi_sum': 0.0, 'score_sum': 0.0, 'count': 0}
        zs = zones_stat[zone]
        zs['air_sum'] += t_air
        zs['lst_sum'] += t_lst
        zs['ndvi_sum'] += ndvi
        zs['score_sum'] += score
        zs['count'] += 1

        # Seasons
        if season not in seasons_stat:
            seasons_stat[season] = {'season': season, 'air_sum': 0.0, 'lst_sum': 0.0, 'count': 0}
        seasons_stat[season]['air_sum'] += t_air
        seasons_stat[season]['lst_sum'] += t_lst
        seasons_stat[season]['count'] += 1

        # Dist air
        if t_air < 20: dist_buckets_air['15-20°C'] += 1
        elif t_air < 25: dist_buckets_air['20-25°C'] += 1
        elif t_air < 30: dist_buckets_air['25-30°C'] += 1
        elif t_air < 35: dist_buckets_air['30-35°C'] += 1
        elif t_air < 40: dist_buckets_air['35-40°C'] += 1
        elif t_air < 45: dist_buckets_air['40-45°C'] += 1
        else: dist_buckets_air['45-50°C'] += 1

        # Dist lst
        if t_lst < 20: dist_buckets_lst['15-20°C'] += 1
        elif t_lst < 25: dist_buckets_lst['20-25°C'] += 1
        elif t_lst < 30: dist_buckets_lst['25-30°C'] += 1
        elif t_lst < 35: dist_buckets_lst['30-35°C'] += 1
        elif t_lst < 40: dist_buckets_lst['35-40°C'] += 1
        elif t_lst < 45: dist_buckets_lst['40-45°C'] += 1
        elif t_lst < 50: dist_buckets_lst['45-50°C'] += 1
        else: dist_buckets_lst['50-55°C'] += 1

        # Sample for 2024 trend (one per date)
        if row['year'] == '2024':
            if dt not in date_seen:
                date_seen[dt] = {'date': dt, 'air_sum': 0.0, 'lst_sum': 0.0, 'max_sum': 0.0, 'count': 0}
            ds = date_seen[dt]
            ds['air_sum'] += t_air
            ds['lst_sum'] += t_lst
            ds['max_sum'] += t_max
            ds['count'] += 1

# Format months
monthly_data = []
for m in range(1, 13):
    d = months_stat[m]
    c = d['count']
    monthly_data.append({
        'month': d['name'],
        'air_temperature': round(d['air_temp_sum'] / c, 2),
        'land_surface_temp': round(d['lst_sum'] / c, 2),
        'max_temperature': round(d['max_temp_sum'] / c, 2)
    })

# Format zones
zone_data = []
for z, d in zones_stat.items():
    c = d['count']
    zone_data.append({
        'zone': z,
        'air_temperature': round(d['air_sum'] / c, 2),
        'land_surface_temp': round(d['lst_sum'] / c, 2),
        'ndvi': round(d['ndvi_sum'] / c, 3),
        'cooling_priority_score': round(d['score_sum'] / c, 1),
        'observations': c
    })
zone_data.sort(key=lambda x: x['land_surface_temp'], reverse=True)

# Format seasons
season_data = []
for s, d in seasons_stat.items():
    c = d['count']
    season_data.append({
        'season': s,
        'air_temperature': round(d['air_sum'] / c, 2),
        'land_surface_temp': round(d['lst_sum'] / c, 2),
        'count': c
    })

# Format dist
air_dist = [{'range': k, 'count': v} for k, v in dist_buckets_air.items()]
lst_dist = [{'range': k, 'count': v} for k, v in dist_buckets_lst.items()]

# Format 2024 dates (sampled every 7 days for clean chart rendering)
sorted_dates = sorted(date_seen.keys())
sampled_trend = []
for idx, d in enumerate(sorted_dates):
    if idx % 7 == 0 or idx == len(sorted_dates) - 1:
        entry = date_seen[d]
        c = entry['count']
        sampled_trend.append({
            'date': d,
            'air_temp': round(entry['air_sum'] / c, 2),
            'max_temp': round(entry['max_sum'] / c, 2),
            'surface_temp': round(entry['lst_sum'] / c, 2)
        })

output_content = f'''// Dashboard analytical data aggregated from 150,000 observations
export const MONTHLY_TRENDS = {json.dumps(monthly_data, indent=2)};

export const ZONE_COMPARISON = {json.dumps(zone_data, indent=2)};

export const SEASONAL_DATA = {json.dumps(season_data, indent=2)};

export const AIR_TEMP_DISTRIBUTION = {json.dumps(air_dist, indent=2)};

export const LST_DISTRIBUTION = {json.dumps(lst_dist, indent=2)};

export const RECENT_TREND_SERIES = {json.dumps(sampled_trend, indent=2)};

export const MASTER_DATASET_METADATA = {{
  totalRecords: 150000,
  uniqueStations: 100,
  yearsCovered: "2021 - 2025",
  startDate: "2021-01-01",
  endDate: "2025-12-31",
  overallMeanAirTemp: 34.28,
  overallMaxAirTemp: 46.81,
  overallMinAirTemp: 19.35,
  overallMeanLST: 35.89,
  overallPeakLST: 55.35,
  meanNDVI: 0.187,
  meanCoolingScore: 48.6,
  spatialResolution: "Microclimate Station Grid (100 in-situ simulated locations)",
  dataSource: "Solapur Urban Agglomeration Simulation (TF-141 Model)",
  lastUpdated: "2026-10-18T17:15:00+05:30",
  zonesCount: 9
}};
'''

with open('src/data/dashboardData.js', 'w', encoding='utf-8') as out:
    out.write(output_content)

print('Successfully generated src/data/dashboardData.js')
