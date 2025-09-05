import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataCard } from "@/components/DataCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { weatherStations, getHistoricalWeatherData } from "@/data/weatherData";
import { formatDate } from "@/lib/utils";
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
  Bar,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
  AreaChart,
  Area } from
"recharts";
import { Circle as BarChart2, Pi as PieChartIcon, Activity, Download, Calendar1 as Calendar } from "lucide-react";

export function DataVisualization() {
  const [selectedStation, setSelectedStation] = useState("station-1");
  const [timeRange, setTimeRange] = useState("7");

  const historicalData = getHistoricalWeatherData(selectedStation, parseInt(timeRange));

  const formatChartData = (data: any[]) => {
    return data.map((item) => ({
      ...item,
      date: formatDate(item.timestamp)
    }));
  };

  const chartData = formatChartData(historicalData);

  const COLORS = ['#29B6F6', '#03A9F4', '#01579B', '#81D4FA', '#4FC3F7'];

  const correlationData = chartData.map((item) => ({
    temperature: item.temperature,
    windSpeed: item.windSpeed,
    pressure: item.pressure,
    humidity: item.humidity,
    visibility: item.visibility,
    date: item.date
  }));

  const temperatureDistribution = [
  { name: 'Below -50°C', value: chartData.filter((d) => d.temperature < -50).length },
  { name: '-50°C to -40°C', value: chartData.filter((d) => d.temperature >= -50 && d.temperature < -40).length },
  { name: '-40°C to -30°C', value: chartData.filter((d) => d.temperature >= -40 && d.temperature < -30).length },
  { name: '-30°C to -20°C', value: chartData.filter((d) => d.temperature >= -30 && d.temperature < -20).length },
  { name: 'Above -20°C', value: chartData.filter((d) => d.temperature >= -20).length }];


  return (
    <div>
      <PageHeader
        title="Data Visualization"
        description="Advanced visualizations and analysis of weather and research data">

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
          
          <Select
            value={timeRange}
            onValueChange={setTimeRange}>

            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="14">Last 14 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 pb-16">
        <Tabs defaultValue="temperature">
          <TabsList className="mb-6">
            <TabsTrigger value="temperature">Temperature Analysis</TabsTrigger>
            <TabsTrigger value="wind">Wind Patterns</TabsTrigger>
            <TabsTrigger value="correlation">Data Correlation</TabsTrigger>
            <TabsTrigger value="distribution">Distribution Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="temperature" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <DataCard
                title="Temperature Trends"
                icon={<Activity className="h-5 w-5" />}>

                <div className="flex justify-end mb-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
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
              
              <DataCard
                title="Temperature Range"
                icon={<Activity className="h-5 w-5" />}>

                <div className="flex justify-end mb-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>

                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="temperature"
                        name="Temperature (°C)"
                        stroke="#29B6F6"
                        fill="#29B6F6"
                        fillOpacity={0.3} />

                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </DataCard>
            </div>
            
            <DataCard
              title="Temperature Statistics"
              icon={<Calendar className="h-5 w-5" />}>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border px-4 py-2 text-left">Statistic</th>
                      <th className="border border-border px-4 py-2 text-left">Value</th>
                      <th className="border border-border px-4 py-2 text-left">Date</th>
                      <th className="border border-border px-4 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border px-4 py-2 font-medium">Minimum Temperature</td>
                      <td className="border border-border px-4 py-2">
                        {Math.min(...chartData.map((d) => d.temperature)).toFixed(1)}°C
                      </td>
                      <td className="border border-border px-4 py-2">
                        {chartData.find((d) => d.temperature === Math.min(...chartData.map((d) => d.temperature)))?.date}
                      </td>
                      <td className="border border-border px-4 py-2">
                        {Math.min(...chartData.map((d) => d.temperature)) < -40 ?
                        "Critical low temperature" : "Normal range"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-2 font-medium">Maximum Temperature</td>
                      <td className="border border-border px-4 py-2">
                        {Math.max(...chartData.map((d) => d.temperature)).toFixed(1)}°C
                      </td>
                      <td className="border border-border px-4 py-2">
                        {chartData.find((d) => d.temperature === Math.max(...chartData.map((d) => d.temperature)))?.date}
                      </td>
                      <td className="border border-border px-4 py-2">
                        {Math.max(...chartData.map((d) => d.temperature)) > -10 ?
                        "Unusually warm" : "Normal range"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-2 font-medium">Average Temperature</td>
                      <td className="border border-border px-4 py-2">
                        {(chartData.reduce((sum, d) => sum + d.temperature, 0) / chartData.length).toFixed(1)}°C
                      </td>
                      <td className="border border-border px-4 py-2">Entire period</td>
                      <td className="border border-border px-4 py-2">
                        {chartData.reduce((sum, d) => sum + d.temperature, 0) / chartData.length < -30 ?
                        "Below seasonal average" : "Normal range"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-2 font-medium">Temperature Variance</td>
                      <td className="border border-border px-4 py-2">
                        {(Math.max(...chartData.map((d) => d.temperature)) -
                        Math.min(...chartData.map((d) => d.temperature))).toFixed(1)}°C
                      </td>
                      <td className="border border-border px-4 py-2">Entire period</td>
                      <td className="border border-border px-4 py-2">
                        {Math.max(...chartData.map((d) => d.temperature)) -
                        Math.min(...chartData.map((d) => d.temperature)) > 15 ?
                        "High variability" : "Stable conditions"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </DataCard>
          </TabsContent>
          
          <TabsContent value="wind" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DataCard
                title="Wind Speed Trends"
                icon={<Activity className="h-5 w-5" />}>

                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
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
              
              <DataCard
                title="Wind Speed Distribution"
                icon={<BarChart2 className="h-5 w-5" />}>

                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                      { range: '0-5 m/s', count: chartData.filter((d) => d.windSpeed >= 0 && d.windSpeed < 5).length },
                      { range: '5-10 m/s', count: chartData.filter((d) => d.windSpeed >= 5 && d.windSpeed < 10).length },
                      { range: '10-15 m/s', count: chartData.filter((d) => d.windSpeed >= 10 && d.windSpeed < 15).length },
                      { range: '15-20 m/s', count: chartData.filter((d) => d.windSpeed >= 15 && d.windSpeed < 20).length },
                      { range: '20-25 m/s', count: chartData.filter((d) => d.windSpeed >= 20 && d.windSpeed < 25).length },
                      { range: '25+ m/s', count: chartData.filter((d) => d.windSpeed >= 25).length }]
                      }
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>

                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Frequency" fill="#01579B" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DataCard>
            </div>
          </TabsContent>
          
          <TabsContent value="correlation" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DataCard
                title="Temperature vs. Wind Speed"
                icon={<Activity className="h-5 w-5" />}>

                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>

                      <CartesianGrid />
                      <XAxis
                        type="number"
                        dataKey="temperature"
                        name="Temperature"
                        unit="°C" />

                      <YAxis
                        type="number"
                        dataKey="windSpeed"
                        name="Wind Speed"
                        unit="m/s" />

                      <ZAxis range={[50, 50]} />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Legend />
                      <Scatter
                        name="Temperature vs. Wind Speed"
                        data={correlationData}
                        fill="#29B6F6" />

                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </DataCard>
              
              <DataCard
                title="Temperature vs. Pressure"
                icon={<Activity className="h-5 w-5" />}>

                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>

                      <CartesianGrid />
                      <XAxis
                        type="number"
                        dataKey="temperature"
                        name="Temperature"
                        unit="°C" />

                      <YAxis
                        type="number"
                        dataKey="pressure"
                        name="Pressure"
                        unit="hPa" />

                      <ZAxis range={[50, 50]} />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Legend />
                      <Scatter
                        name="Temperature vs. Pressure"
                        data={correlationData}
                        fill="#01579B" />

                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </DataCard>
            </div>
          </TabsContent>
          
          <TabsContent value="distribution" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DataCard
                title="Temperature Distribution"
                icon={<PieChartIcon className="h-5 w-5" />}>

                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={temperatureDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value">

                        {temperatureDistribution.map((entry, index) =>
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        )}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </DataCard>
              
              <DataCard
                title="Visibility Distribution"
                icon={<BarChart2 className="h-5 w-5" />}>

                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                      { range: '0-1 km', count: chartData.filter((d) => d.visibility >= 0 && d.visibility < 1).length },
                      { range: '1-5 km', count: chartData.filter((d) => d.visibility >= 1 && d.visibility < 5).length },
                      { range: '5-10 km', count: chartData.filter((d) => d.visibility >= 5 && d.visibility < 10).length },
                      { range: '10+ km', count: chartData.filter((d) => d.visibility >= 10).length }]
                      }
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>

                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Frequency" fill="#4FC3F7" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DataCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>);

}