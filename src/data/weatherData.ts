import { getRandomFloat, getRandomInt } from "@/lib/utils";

export interface WeatherStation {
  id: string;
  name: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: "online" | "offline" | "maintenance";
  lastUpdate: Date;
}

export interface WeatherData {
  stationId: string;
  timestamp: Date;
  temperature: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  humidity: number;
  visibility: number;
  snowDepth: number;
  uvIndex: number;
  isCritical: boolean;
}

export const weatherStations: WeatherStation[] = [
  {
    id: "station-1",
    name: "Alpha Base",
    location: "Ross Ice Shelf",
    coordinates: { lat: -78.5, lng: 166.75 },
    status: "online",
    lastUpdate: new Date(),
  },
  {
    id: "station-2",
    name: "Bravo Outpost",
    location: "Antarctic Peninsula",
    coordinates: { lat: -64.8, lng: -62.6 },
    status: "online",
    lastUpdate: new Date(),
  },
  {
    id: "station-3",
    name: "Charlie Point",
    location: "South Pole",
    coordinates: { lat: -90.0, lng: 0.0 },
    status: "maintenance",
    lastUpdate: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: "station-4",
    name: "Delta Ridge",
    location: "Transantarctic Mountains",
    coordinates: { lat: -84.2, lng: 160.7 },
    status: "offline",
    lastUpdate: new Date(Date.now() - 172800000), // 2 days ago
  },
  {
    id: "station-5",
    name: "Echo Valley",
    location: "Marie Byrd Land",
    coordinates: { lat: -80.1, lng: -115.0 },
    status: "online",
    lastUpdate: new Date(),
  },
];

export function generateWeatherData(stationId: string): WeatherData {
  // Generate more extreme values for South Pole station
  const isSouthPole = stationId === "station-3";
  
  // Generate random weather data with appropriate ranges for Antarctic conditions
  const temperature = getRandomFloat(
    isSouthPole ? -70 : -40, 
    isSouthPole ? -40 : -5
  );
  
  const windSpeed = getRandomFloat(
    isSouthPole ? 15 : 5, 
    isSouthPole ? 45 : 30
  );
  
  const pressure = getRandomFloat(970, 1020);
  const humidity = getRandomFloat(30, 90);
  const visibility = getRandomFloat(0.1, 15);
  const snowDepth = getRandomFloat(0, 200);
  const uvIndex = getRandomInt(0, 8);
  
  // Determine if conditions are critical
  const isCritical = 
    temperature < -50 || 
    windSpeed > 35 || 
    visibility < 0.5;
  
  return {
    stationId,
    timestamp: new Date(),
    temperature,
    windSpeed,
    windDirection: getRandomInt(0, 359),
    pressure,
    humidity,
    visibility,
    snowDepth,
    uvIndex,
    isCritical,
  };
}

export function getCurrentWeatherData(): WeatherData[] {
  return weatherStations.map(station => generateWeatherData(station.id));
}

export function getHistoricalWeatherData(
  stationId: string, 
  days: number
): WeatherData[] {
  const data: WeatherData[] = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const timestamp = new Date(now);
    timestamp.setDate(now.getDate() - i);
    
    const baseData = generateWeatherData(stationId);
    data.push({
      ...baseData,
      timestamp,
      // Add some variation but keep the trend
      temperature: baseData.temperature + getRandomFloat(-5, 5),
      windSpeed: baseData.windSpeed + getRandomFloat(-5, 5),
    });
  }
  
  return data;
}

export const weatherAlerts = [
  {
    id: "alert-1",
    type: "warning",
    title: "Blizzard Warning",
    message: "Blizzard conditions expected at Alpha Base within 24 hours. Wind speeds exceeding 40 knots with visibility below 100 meters.",
    timestamp: new Date(Date.now() + 3600000), // 1 hour from now
    affectedStations: ["station-1"],
  },
  {
    id: "alert-2",
    type: "error",
    title: "Extreme Cold",
    message: "Dangerous temperature drop at Charlie Point. Expected to reach -72°C within 12 hours. All outdoor activities suspended.",
    timestamp: new Date(Date.now() + 7200000), // 2 hours from now
    affectedStations: ["station-3"],
  },
  {
    id: "alert-3",
    type: "info",
    title: "Maintenance Complete",
    message: "Scheduled maintenance on Delta Ridge weather station completed. Systems back online and calibrated.",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    affectedStations: ["station-4"],
  },
];