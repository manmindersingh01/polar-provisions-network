import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { WeatherCard } from "@/components/WeatherCard";
import { DataCard } from "@/components/DataCard";
import { AlertBanner } from "@/components/AlertBanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IceCrystalLoader } from "@/components/IceCrystalLoader";
import {
  getCurrentWeatherData,
  weatherStations,
  weatherAlerts,
  getHistoricalWeatherData,
  WeatherStation,
  WeatherData } from
"@/data/weatherData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar } from
"recharts";
import { Thermometer, Wind, Droplet, Gauge, Eye, Snowflake, Sun, RefreshCw, Calendar1 as Calendar } from









"lucide-react";
import { formatDate, formatTime } from "@/lib/utils";

export function WeatherDashboard() {
  const [selectedStation, setSelectedStation] = useState<string>("station-1");
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [historicalData, setHistoricalData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      const data = getCurrentWeatherData();
      setWeatherData(data);
      setHistoricalData(getHistoricalWeatherData(selectedStation, 7));
      setLoading(false);
    }, 1000);
  }, [selectedStation]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      const data = getCurrentWeatherData();
      setWeatherData(data);
      setHistoricalData(getHistoricalWeatherData(selectedStation, 7));
      setRefreshing(false);
    }, 1000);
  };

  const currentStationData = weatherData.find((data) => data.stationId === selectedStation);
  const currentStation = weatherStations.find((station) => station.id === selectedStation);

  const formatHistoricalData = (data: WeatherData[]) => {
    return data.map((item) => ({
      ...item,
      date: formatDate(item.timestamp),
      time: formatTime(item.timestamp)
    }));
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <IceCrystalLoader size="lg" className="mb-4" />
          <p className="text-lg font-medium">Loading weather data...</p>
        </div>
      </div>);

  }

  return (
    <div>
      <PageHeader
        title="Weather Dashboard"
        description="Real-time and historical weather data from all research stations">

        <div className="flex items-center gap-4">
          <Select
            value={selectedStation}
            onValueChange={setSelectedStation}>

            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select station" />
            </SelectTrigger>
            <SelectContent>
              {weatherStations.map((station) =>
              <SelectItem key={station.id} value={station.id}>
                  {station.name}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          <Button
            onClick={handleRefresh}
            variant="outline"
            disabled={refreshing}
            className="flex items-center gap-2">

            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 pb-16">
        {/* Alerts */}
        {weatherAlerts.length > 0 &&
        <div className="mb-8 space-y-3">
            {weatherAlerts.
          filter((alert) =>
          alert.affectedStations.includes(selectedStation) ||
          alert.affectedStations.length === 0
          ).
          map((alert) =>
          <AlertBanner
            key={alert.id}
            type={alert.type as "warning" | "error" | "info" | "success"}
            message={`${alert.title}: ${alert.message}`} />

          )}
          </div>
        }

        {/* Station Info */}
        {currentStation &&
        <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between bg-card rounded-lg border border-border p-4">
              <div>
                <h2 className="text-xl font-bold">{currentStation.name}</h2>
                <p className="text-muted-foreground">{currentStation.location}</p>
                <p className="text-sm mt-1">
                  Coordinates: {currentStation.coordinates.lat.toFixed(2)}, {currentStation.coordinates.lng.toFixed(2)}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center">
                  <span className={`inline-flex h-3 w-3 rounded-full mr-2 ${
                currentStation.status === "online" ?
                "bg-success" :
                currentStation.status === "maintenance" ?
                "bg-warning" :
                "bg-error"}`
                }></span>
                  <span className="capitalize">{currentStation.status}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Last update: {formatTime(currentStation.lastUpdate)}
                </p>
              </div>
            </div>
          </div>
        }

        {/* Current Weather */}
        {currentStationData &&
        <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Current Conditions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <WeatherCard
              title="Temperature"
              value={currentStationData.temperature.toFixed(1)}
              unit="°C"
              icon={<Thermometer className="h-5 w-5" />}
              critical={currentStationData.temperature < -40} />

              <WeatherCard
              title="Wind Speed"
              value={currentStationData.windSpeed.toFixed(1)}
              unit="m/s"
              icon={<Wind className="h-5 w-5" />}
              critical={currentStationData.windSpeed > 30} />

              <WeatherCard
              title="Humidity"
              value={currentStationData.humidity.toFixed(0)}
              unit="%"
              icon={<Droplet className="h-5 w-5" />} />

              <WeatherCard
              title="Pressure"
              value={currentStationData.pressure.toFixed(0)}
              unit="hPa"
              icon={<Gauge className="h-5 w-5" />}
              critical={currentStationData.pressure < 980} />

              <WeatherCard
              title="Visibility"
              value={currentStationData.visibility.toFixed(1)}
              unit="km"
              icon={<Eye className="h-5 w-5" />}
              critical={currentStationData.visibility < 1} />

              <WeatherCard
              title="Snow Depth"
              value={currentStationData.snowDepth.toFixed(0)}
              unit="cm"
              icon={<Snowflake className="h-5 w-5" />} />

              <WeatherCard
              title="UV Index"
              value={currentStationData.uvIndex}
              icon={<Sun className="h-5 w-5" />}
              critical={currentStationData.uvIndex > 6} />

              <WeatherCard
              title="Wind Direction"
              value={currentStationData.windDirection}
              unit="°"
              icon={<Wind className="h-5 w-5" />} />

            </div>
          </div>
        }

        {/* Historical Data */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Historical Data</h3>
          <Tabs defaultValue="temperature">
            <TabsList className="mb-4">
              <TabsTrigger value="temperature">Temperature</TabsTrigger>
              <TabsTrigger value="wind">Wind Speed</TabsTrigger>
              <TabsTrigger value="pressure">Pressure</TabsTrigger>
              <TabsTrigger value="visibility">Visibility</TabsTrigger>
            </TabsList>
            
            <TabsContent value="temperature" className="mt-0">
              <DataCard
                title="Temperature History (7 Days)"
                icon={<Calendar className="h-5 w-5" />}>

                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={formatHistoricalData(historicalData)}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>

                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="temperature"
                        name="Temperature (°C)"
                        stroke="#29B6F6"
                        activeDot={{ r: 8 }} />

                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </DataCard>
            </TabsContent>
            
            <TabsContent value="wind" className="mt-0">
              <DataCard
                title="Wind Speed History (7 Days)"
                icon={<Calendar className="h-5 w-5" />}>

                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={formatHistoricalData(historicalData)}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>

                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="windSpeed"
                        name="Wind Speed (m/s)"
                        stroke="#01579B"
                        activeDot={{ r: 8 }} />

                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </DataCard>
            </TabsContent>
            
            <TabsContent value="pressure" className="mt-0">
              <DataCard
                title="Pressure History (7 Days)"
                icon={<Calendar className="h-5 w-5" />}>

                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={formatHistoricalData(historicalData)}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>

                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="pressure"
                        name="Pressure (hPa)"
                        stroke="#4FC3F7"
                        activeDot={{ r: 8 }} />

                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </DataCard>
            </TabsContent>
            
            <TabsContent value="visibility" className="mt-0">
              <DataCard
                title="Visibility History (7 Days)"
                icon={<Calendar className="h-5 w-5" />}>

                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={formatHistoricalData(historicalData)}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>

                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="visibility"
                        name="Visibility (km)"
                        fill="#29B6F6" />

                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DataCard>
            </TabsContent>
          </Tabs>
        </div>

        {/* All Stations Overview */}
        <div>
          <h3 className="text-lg font-medium mb-4">All Stations Overview</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-2 text-left">Station</th>
                  <th className="border border-border px-4 py-2 text-left">Location</th>
                  <th className="border border-border px-4 py-2 text-left">Status</th>
                  <th className="border border-border px-4 py-2 text-left">Temperature</th>
                  <th className="border border-border px-4 py-2 text-left">Wind Speed</th>
                  <th className="border border-border px-4 py-2 text-left">Visibility</th>
                </tr>
              </thead>
              <tbody>
                {weatherStations.map((station) => {
                  const stationData = weatherData.find((data) => data.stationId === station.id);
                  return (
                    <tr key={station.id} className="hover:bg-muted/50">
                      <td className="border border-border px-4 py-2">
                        <Button
                          variant="link"
                          className="p-0 h-auto font-medium"
                          onClick={() => setSelectedStation(station.id)}>

                          {station.name}
                        </Button>
                      </td>
                      <td className="border border-border px-4 py-2">{station.location}</td>
                      <td className="border border-border px-4 py-2">
                        <div className="flex items-center">
                          <span className={`inline-flex h-2 w-2 rounded-full mr-2 ${
                          station.status === "online" ?
                          "bg-success" :
                          station.status === "maintenance" ?
                          "bg-warning" :
                          "bg-error"}`
                          }></span>
                          <span className="capitalize">{station.status}</span>
                        </div>
                      </td>
                      <td className="border border-border px-4 py-2">
                        {stationData ?
                        <span className={stationData.temperature < -40 ? "text-accent-700" : ""}>
                            {stationData.temperature.toFixed(1)}°C
                          </span> :
                        "N/A"}
                      </td>
                      <td className="border border-border px-4 py-2">
                        {stationData ?
                        <span className={stationData.windSpeed > 30 ? "text-accent-700" : ""}>
                            {stationData.windSpeed.toFixed(1)} m/s
                          </span> :
                        "N/A"}
                      </td>
                      <td className="border border-border px-4 py-2">
                        {stationData ?
                        <span className={stationData.visibility < 1 ? "text-accent-700" : ""}>
                            {stationData.visibility.toFixed(1)} km
                          </span> :
                        "N/A"}
                      </td>
                    </tr>);

                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>);

}