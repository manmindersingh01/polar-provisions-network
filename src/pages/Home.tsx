import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherCard } from "@/components/WeatherCard";
import { AlertBanner } from "@/components/AlertBanner";
import { weatherAlerts, getCurrentWeatherData, weatherStations } from "@/data/weatherData";
import { supplyDrops } from "@/data/supplyData";
import { researchProjects } from "@/data/researchData";
import { survivalGuides } from "@/data/guideData";
import { formatDateTime } from "@/lib/utils";
import { motion } from "framer-motion";
import { Thermometer, Wind, Droplet, Package, FileText, Triangle as AlertTriangle, ArrowRight, Microscope, BookOpen, Radio } from










"lucide-react";

export function Home() {
  // Get the most critical weather data
  const weatherData = getCurrentWeatherData();
  const criticalWeather = weatherData.find((data) => data.isCritical);
  const alphaBaseWeather = weatherData.find((data) => data.stationId === "station-1");

  // Get upcoming supply drops
  const upcomingDrops = supplyDrops.
  filter((drop) => drop.status === "scheduled" || drop.status === "in-transit").
  sort((a, b) => a.estimatedArrival?.getTime() ?? a.scheduledDate.getTime() - (
  b.estimatedArrival?.getTime() ?? b.scheduledDate.getTime()));

  // Get active research projects
  const activeProjects = researchProjects.filter((project) => project.status === "active");

  // Get critical guides
  const criticalGuides = survivalGuides.filter((guide) => guide.priority === "critical");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="bg-secondary py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-900 to-secondary-700 opacity-80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white mb-4 text-shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>

              Polar Provisions Network
            </motion.h1>
            <motion.p
              className="text-xl text-gray-100 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}>

              Supporting scientific research in extreme environments with real-time data, 
              supply management, and critical communication systems.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}>

              <Link to="/weather">
                <Button className="bg-primary hover:bg-primary-600 text-white">
                  Weather Dashboard
                </Button>
              </Link>
              <Link to="/supplies">
                <Button className="bg-primary-700 hover:bg-primary-800 text-white">
                  Supply Tracker
                </Button>
              </Link>
              <Link to="/emergency">
                <Button className="bg-accent hover:bg-accent-700 text-white">
                  Emergency Protocols
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Alerts Section */}
      {weatherAlerts.length > 0 &&
      <section className="py-4 bg-surface">
          <div className="container mx-auto px-4">
            <div className="space-y-3">
              {weatherAlerts.map((alert) =>
            <AlertBanner
              key={alert.id}
              type={alert.type as "warning" | "error" | "info" | "success"}
              message={`${alert.title}: ${alert.message}`} />

            )}
            </div>
          </div>
        </section>
      }

      {/* Weather Overview */}
      <section className="py-12 bg-surface">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Current Weather Conditions</h2>
              <p className="text-muted-foreground">
                Real-time data from {weatherStations.filter((s) => s.status === "online").length} active weather stations
              </p>
            </div>
            <Link to="/weather" className="mt-4 md:mt-0 flex items-center text-primary hover:text-primary-700 transition-colors">
              View full dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {alphaBaseWeather &&
            <>
                <WeatherCard
                title="Temperature"
                value={alphaBaseWeather.temperature.toFixed(1)}
                unit="°C"
                icon={<Thermometer className="h-5 w-5" />}
                critical={alphaBaseWeather.temperature < -40} />

                <WeatherCard
                title="Wind Speed"
                value={alphaBaseWeather.windSpeed.toFixed(1)}
                unit="m/s"
                icon={<Wind className="h-5 w-5" />}
                critical={alphaBaseWeather.windSpeed > 30} />

                <WeatherCard
                title="Humidity"
                value={alphaBaseWeather.humidity.toFixed(0)}
                unit="%"
                icon={<Droplet className="h-5 w-5" />} />

                <WeatherCard
                title="Visibility"
                value={alphaBaseWeather.visibility.toFixed(1)}
                unit="km"
                icon={<AlertTriangle className="h-5 w-5" />}
                critical={alphaBaseWeather.visibility < 1} />

              </>
            }
          </div>

          {criticalWeather &&
          <div className="mt-6">
              <AlertBanner
              type="warning"
              message={`Critical weather conditions at ${
              weatherStations.find((s) => s.id === criticalWeather.stationId)?.name}: Temperature ${
              criticalWeather.temperature.toFixed(1)}°C, Wind ${criticalWeather.windSpeed.toFixed(1)} m/s, Visibility ${criticalWeather.visibility.toFixed(1)} km`} />

            </div>
          }
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12 bg-surface-muted">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="show">

            {/* Supply Drops */}
            <motion.div variants={item}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="mr-2 h-5 w-5 text-primary" />
                    Upcoming Supply Drops
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingDrops.length > 0 ?
                  <div className="space-y-4">
                      {upcomingDrops.slice(0, 3).map((drop) =>
                    <div key={drop.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{drop.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {drop.status === "in-transit" ? "In Transit" : "Scheduled"}
                              </p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                        drop.priority === "emergency" ?
                        "bg-accent/20 text-accent-700" :
                        drop.priority === "urgent" ?
                        "bg-warning/20 text-warning" :
                        "bg-primary/20 text-primary-700"}`
                        }>
                              {drop.priority.charAt(0).toUpperCase() + drop.priority.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm mt-1">
                            <span className="font-medium">ETA:</span>{" "}
                            {drop.estimatedArrival ?
                        formatDateTime(drop.estimatedArrival) :
                        formatDateTime(drop.scheduledDate)}
                          </p>
                        </div>
                    )}
                    </div> :

                  <p className="text-muted-foreground">No upcoming supply drops scheduled.</p>
                  }
                  <div className="mt-4">
                    <Link to="/supplies" className="text-primary hover:text-primary-700 text-sm flex items-center">
                      View all supply drops
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Research Projects */}
            <motion.div variants={item}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Microscope className="mr-2 h-5 w-5 text-primary" />
                    Active Research Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {activeProjects.length > 0 ?
                  <div className="space-y-4">
                      {activeProjects.slice(0, 3).map((project) =>
                    <div key={project.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                          <h4 className="font-medium">{project.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Lead: {project.lead}
                          </p>
                          <p className="text-sm mt-1 line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                    )}
                    </div> :

                  <p className="text-muted-foreground">No active research projects.</p>
                  }
                  <div className="mt-4">
                    <Link to="/research" className="text-primary hover:text-primary-700 text-sm flex items-center">
                      View all research projects
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Critical Guides */}
            <motion.div variants={item}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-primary" />
                    Critical Survival Guides
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {criticalGuides.length > 0 ?
                  <div className="space-y-4">
                      {criticalGuides.slice(0, 3).map((guide) =>
                    <div key={guide.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                          <h4 className="font-medium">{guide.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Category: {guide.category.charAt(0).toUpperCase() + guide.category.slice(1)}
                          </p>
                          <p className="text-sm mt-1 line-clamp-2">
                            {guide.summary}
                          </p>
                        </div>
                    )}
                    </div> :

                  <p className="text-muted-foreground">No critical guides available.</p>
                  }
                  <div className="mt-4">
                    <Link to="/guides" className="text-primary hover:text-primary-700 text-sm flex items-center">
                      View all survival guides
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-12 bg-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/weather">
              <Card className="h-full hover:border-primary transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                      <Thermometer className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Weather Dashboard</h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time weather data from all stations
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/research">
              <Card className="h-full hover:border-primary transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                      <Microscope className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Research Portal</h3>
                    <p className="text-sm text-muted-foreground">
                      Access research projects and data
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/communication">
              <Card className="h-full hover:border-primary transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                      <Radio className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Communication Hub</h3>
                    <p className="text-sm text-muted-foreground">
                      Team messaging and announcements
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/emergency">
              <Card className="h-full hover:border-accent transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-accent/10 p-3 rounded-full mb-4">
                      <AlertTriangle className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Emergency Protocols</h3>
                    <p className="text-sm text-muted-foreground">
                      Critical emergency procedures and contacts
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>);

}