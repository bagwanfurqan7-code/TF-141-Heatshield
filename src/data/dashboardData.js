// Dashboard analytical data aggregated from 150,000 observations
export const MONTHLY_TRENDS = [
  {
    "month": "Jan",
    "air_temperature": 33.22,
    "land_surface_temp": 34.96,
    "max_temperature": 34.63
  },
  {
    "month": "Feb",
    "air_temperature": 35.42,
    "land_surface_temp": 37.22,
    "max_temperature": 36.62
  },
  {
    "month": "Mar",
    "air_temperature": 39.56,
    "land_surface_temp": 42.08,
    "max_temperature": 41.98
  },
  {
    "month": "Apr",
    "air_temperature": 40.69,
    "land_surface_temp": 43.31,
    "max_temperature": 42.39
  },
  {
    "month": "May",
    "air_temperature": 40.8,
    "land_surface_temp": 43.58,
    "max_temperature": 42.73
  },
  {
    "month": "Jun",
    "air_temperature": 39.26,
    "land_surface_temp": 39.92,
    "max_temperature": 40.46
  },
  {
    "month": "Jul",
    "air_temperature": 35.26,
    "land_surface_temp": 36.18,
    "max_temperature": 36.65
  },
  {
    "month": "Aug",
    "air_temperature": 33.05,
    "land_surface_temp": 33.67,
    "max_temperature": 34.6
  },
  {
    "month": "Sep",
    "air_temperature": 29.55,
    "land_surface_temp": 30.5,
    "max_temperature": 32.62
  },
  {
    "month": "Oct",
    "air_temperature": 26.86,
    "land_surface_temp": 28.12,
    "max_temperature": 31.95
  },
  {
    "month": "Nov",
    "air_temperature": 28.93,
    "land_surface_temp": 30.78,
    "max_temperature": 33.54
  },
  {
    "month": "Dec",
    "air_temperature": 28.97,
    "land_surface_temp": 30.52,
    "max_temperature": 30.8
  }
];

export const ZONE_COMPARISON = [
  {
    "zone": "Industrial",
    "air_temperature": 35.19,
    "land_surface_temp": 38.47,
    "ndvi": -0.05,
    "cooling_priority_score": 59.4,
    "observations": 18000
  },
  {
    "zone": "Road",
    "air_temperature": 34.88,
    "land_surface_temp": 38.22,
    "ndvi": -0.049,
    "cooling_priority_score": 56.9,
    "observations": 21000
  },
  {
    "zone": "Commercial",
    "air_temperature": 35.0,
    "land_surface_temp": 37.74,
    "ndvi": -0.038,
    "cooling_priority_score": 67.5,
    "observations": 21000
  },
  {
    "zone": "Transport",
    "air_temperature": 34.1,
    "land_surface_temp": 37.13,
    "ndvi": -0.04,
    "cooling_priority_score": 65.6,
    "observations": 9000
  },
  {
    "zone": "Residential",
    "air_temperature": 34.08,
    "land_surface_temp": 35.75,
    "ndvi": 0.091,
    "cooling_priority_score": 47.4,
    "observations": 42000
  },
  {
    "zone": "Educational",
    "air_temperature": 34.08,
    "land_surface_temp": 34.44,
    "ndvi": 0.275,
    "cooling_priority_score": 33.3,
    "observations": 12000
  },
  {
    "zone": "Open Land",
    "air_temperature": 34.31,
    "land_surface_temp": 34.44,
    "ndvi": 0.098,
    "cooling_priority_score": 35.7,
    "observations": 6000
  },
  {
    "zone": "Park",
    "air_temperature": 32.88,
    "land_surface_temp": 30.93,
    "ndvi": 0.597,
    "cooling_priority_score": 25.3,
    "observations": 15000
  },
  {
    "zone": "Waterbody",
    "air_temperature": 32.6,
    "land_surface_temp": 29.48,
    "ndvi": -0.08,
    "cooling_priority_score": 20.7,
    "observations": 6000
  }
];

export const SEASONAL_DATA = [
  {
    "season": "Winter",
    "air_temperature": 32.45,
    "land_surface_temp": 34.15,
    "count": 37100
  },
  {
    "season": "Summer",
    "air_temperature": 40.35,
    "land_surface_temp": 42.99,
    "count": 37800
  },
  {
    "season": "Monsoon",
    "air_temperature": 34.26,
    "land_surface_temp": 35.05,
    "count": 50100
  },
  {
    "season": "Post-Monsoon",
    "air_temperature": 27.88,
    "land_surface_temp": 29.44,
    "count": 25000
  }
];

export const AIR_TEMP_DISTRIBUTION = [
  {
    "range": "15-20\u00b0C",
    "count": 48
  },
  {
    "range": "20-25\u00b0C",
    "count": 6549
  },
  {
    "range": "25-30\u00b0C",
    "count": 31621
  },
  {
    "range": "30-35\u00b0C",
    "count": 43769
  },
  {
    "range": "35-40\u00b0C",
    "count": 39221
  },
  {
    "range": "40-45\u00b0C",
    "count": 26944
  },
  {
    "range": "45-50\u00b0C",
    "count": 1848
  }
];

export const LST_DISTRIBUTION = [
  {
    "range": "15-20\u00b0C",
    "count": 179
  },
  {
    "range": "20-25\u00b0C",
    "count": 8079
  },
  {
    "range": "25-30\u00b0C",
    "count": 22930
  },
  {
    "range": "30-35\u00b0C",
    "count": 38972
  },
  {
    "range": "35-40\u00b0C",
    "count": 39585
  },
  {
    "range": "40-45\u00b0C",
    "count": 23480
  },
  {
    "range": "45-50\u00b0C",
    "count": 12431
  },
  {
    "range": "50-55\u00b0C",
    "count": 4344
  }
];

export const RECENT_TREND_SERIES = [
  {
    "date": "2024-01-01",
    "air_temp": 29.8,
    "max_temp": 32.59,
    "surface_temp": 31.37
  },
  {
    "date": "2024-01-10",
    "air_temp": 33.62,
    "max_temp": 34.82,
    "surface_temp": 36.87
  },
  {
    "date": "2024-01-18",
    "air_temp": 33.08,
    "max_temp": 34.28,
    "surface_temp": 34.42
  },
  {
    "date": "2024-01-27",
    "air_temp": 32.28,
    "max_temp": 33.48,
    "surface_temp": 32.35
  },
  {
    "date": "2024-02-04",
    "air_temp": 33.76,
    "max_temp": 34.96,
    "surface_temp": 34.89
  },
  {
    "date": "2024-02-13",
    "air_temp": 29.63,
    "max_temp": 30.83,
    "surface_temp": 29.73
  },
  {
    "date": "2024-02-21",
    "air_temp": 36.08,
    "max_temp": 37.28,
    "surface_temp": 38.79
  },
  {
    "date": "2024-03-01",
    "air_temp": 41.41,
    "max_temp": 42.61,
    "surface_temp": 46.44
  },
  {
    "date": "2024-03-09",
    "air_temp": 43.11,
    "max_temp": 44.92,
    "surface_temp": 47.17
  },
  {
    "date": "2024-03-18",
    "air_temp": 43.15,
    "max_temp": 44.35,
    "surface_temp": 47.3
  },
  {
    "date": "2024-03-26",
    "air_temp": 38.4,
    "max_temp": 39.6,
    "surface_temp": 40.34
  },
  {
    "date": "2024-04-04",
    "air_temp": 41.65,
    "max_temp": 42.85,
    "surface_temp": 45.11
  },
  {
    "date": "2024-04-12",
    "air_temp": 40.84,
    "max_temp": 43.84,
    "surface_temp": 42.83
  },
  {
    "date": "2024-04-21",
    "air_temp": 38.46,
    "max_temp": 39.66,
    "surface_temp": 38.57
  },
  {
    "date": "2024-04-30",
    "air_temp": 40.02,
    "max_temp": 41.22,
    "surface_temp": 43.17
  },
  {
    "date": "2024-05-08",
    "air_temp": 34.49,
    "max_temp": 40.65,
    "surface_temp": 34.6
  },
  {
    "date": "2024-05-17",
    "air_temp": 39.86,
    "max_temp": 41.6,
    "surface_temp": 42.79
  },
  {
    "date": "2024-05-25",
    "air_temp": 44.81,
    "max_temp": 46.01,
    "surface_temp": 48.72
  },
  {
    "date": "2024-06-03",
    "air_temp": 43.2,
    "max_temp": 44.4,
    "surface_temp": 43.81
  },
  {
    "date": "2024-06-11",
    "air_temp": 42.48,
    "max_temp": 43.68,
    "surface_temp": 43.67
  },
  {
    "date": "2024-06-20",
    "air_temp": 38.6,
    "max_temp": 39.8,
    "surface_temp": 39.73
  },
  {
    "date": "2024-06-28",
    "air_temp": 38.62,
    "max_temp": 39.82,
    "surface_temp": 40.08
  },
  {
    "date": "2024-07-07",
    "air_temp": 39.29,
    "max_temp": 40.49,
    "surface_temp": 40.86
  },
  {
    "date": "2024-07-15",
    "air_temp": 32.83,
    "max_temp": 34.03,
    "surface_temp": 32.68
  },
  {
    "date": "2024-07-24",
    "air_temp": 33.52,
    "max_temp": 34.74,
    "surface_temp": 34.18
  },
  {
    "date": "2024-08-01",
    "air_temp": 27.65,
    "max_temp": 34.22,
    "surface_temp": 27.45
  },
  {
    "date": "2024-08-10",
    "air_temp": 32.77,
    "max_temp": 33.97,
    "surface_temp": 33.35
  },
  {
    "date": "2024-08-18",
    "air_temp": 37.01,
    "max_temp": 38.21,
    "surface_temp": 38.13
  },
  {
    "date": "2024-08-27",
    "air_temp": 33.88,
    "max_temp": 35.08,
    "surface_temp": 34.74
  },
  {
    "date": "2024-09-04",
    "air_temp": 32.56,
    "max_temp": 33.82,
    "surface_temp": 34.14
  },
  {
    "date": "2024-09-13",
    "air_temp": 29.02,
    "max_temp": 33.93,
    "surface_temp": 30.32
  },
  {
    "date": "2024-09-21",
    "air_temp": 29.71,
    "max_temp": 31.02,
    "surface_temp": 31.24
  },
  {
    "date": "2024-09-30",
    "air_temp": 30.91,
    "max_temp": 32.11,
    "surface_temp": 32.04
  },
  {
    "date": "2024-10-08",
    "air_temp": 26.16,
    "max_temp": 32.75,
    "surface_temp": 26.51
  },
  {
    "date": "2024-10-17",
    "air_temp": 26.15,
    "max_temp": 31.13,
    "surface_temp": 27.37
  },
  {
    "date": "2024-10-26",
    "air_temp": 21.76,
    "max_temp": 30.62,
    "surface_temp": 21.56
  },
  {
    "date": "2024-11-03",
    "air_temp": 27.94,
    "max_temp": 31.44,
    "surface_temp": 29.56
  },
  {
    "date": "2024-11-12",
    "air_temp": 33.03,
    "max_temp": 34.24,
    "surface_temp": 36.01
  },
  {
    "date": "2024-11-20",
    "air_temp": 29.95,
    "max_temp": 34.37,
    "surface_temp": 31.5
  },
  {
    "date": "2024-11-29",
    "air_temp": 29.32,
    "max_temp": 34.43,
    "surface_temp": 31.55
  },
  {
    "date": "2024-12-07",
    "air_temp": 28.13,
    "max_temp": 29.33,
    "surface_temp": 30.39
  },
  {
    "date": "2024-12-16",
    "air_temp": 24.44,
    "max_temp": 27.96,
    "surface_temp": 24.22
  },
  {
    "date": "2024-12-24",
    "air_temp": 33.44,
    "max_temp": 34.64,
    "surface_temp": 36.14
  },
  {
    "date": "2024-12-31",
    "air_temp": 31.37,
    "max_temp": 32.57,
    "surface_temp": 32.84
  }
];

export const MASTER_DATASET_METADATA = {
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
};
