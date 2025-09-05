import { PageHeader } from "@/components/PageHeader";
import { DataCard } from "@/components/DataCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertBanner } from "@/components/AlertBanner";
import { Badge } from "@/components/ui/badge";
import { survivalGuides } from "@/data/guideData";
import { weatherAlerts } from "@/data/weatherData";
import { Link } from "react-router-dom";
import { Triangle as AlertTriangle, Phone, Radio, SatelliteDish as Satellite, Compass, Snowflake, Wind, Thermometer, ArrowRight, MapPin, Users } from











"lucide-react";

export function EmergencyProtocols() {
  // Get critical guides
  const criticalGuides = survivalGuides.filter((guide) => guide.priority === "critical");

  return (
    <div>
      <PageHeader
        title="Emergency Protocols"
        description="Critical emergency procedures and contact information">

        <Button className="bg-accent hover:bg-accent-700 text-white">
          <AlertTriangle className="mr-2 h-4 w-4" />
          Report Emergency
        </Button>
      </PageHeader>

      <div className="container mx-auto px-4 pb-16">
        {/* Active Alerts */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Active Alerts</h2>
          {weatherAlerts.length > 0 ?
          <div className="space-y-3">
              {weatherAlerts.map((alert) =>
            <AlertBanner
              key={alert.id}
              type={alert.type as "warning" | "error" | "info" | "success"}
              message={`${alert.title}: ${alert.message}`}
              dismissible={false} />

            )}
            </div> :

          <AlertBanner
            type="info"
            message="No active emergency alerts at this time."
            dismissible={false} />

          }
        </div>
        
        {/* Emergency Contacts */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Emergency Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-accent/10 dark:bg-accent/5 border-accent">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="bg-accent/20 p-2 rounded-full mr-3">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-medium">Satellite Phone</h3>
                </div>
                <p className="font-mono text-lg mb-1">+870-773-110-911</p>
                <p className="text-sm text-muted-foreground">
                  Available 24/7 for emergency communications
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-accent/10 dark:bg-accent/5 border-accent">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="bg-accent/20 p-2 rounded-full mr-3">
                    <Radio className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-medium">Emergency Radio</h3>
                </div>
                <p className="font-mono text-lg mb-1">Channel 16 (156.8 MHz)</p>
                <p className="text-sm text-muted-foreground">
                  International distress frequency, monitored continuously
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-accent/10 dark:bg-accent/5 border-accent">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="bg-accent/20 p-2 rounded-full mr-3">
                    <Satellite className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-medium">Emergency Beacon</h3>
                </div>
                <p className="font-mono text-lg mb-1">EPIRB/PLB Activation</p>
                <p className="text-sm text-muted-foreground">
                  Located in emergency cabinets at all stations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Critical Protocols */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Critical Protocols</h2>
            <Link to="/guides" className="text-primary hover:text-primary-700 flex items-center">
              View all guides
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {criticalGuides.map((guide) =>
            <Link key={guide.id} to={`/guides?guide=${guide.id}`}>
                <DataCard
                title={guide.title}
                icon={<AlertTriangle className="h-5 w-5 text-accent" />}
                className="hover:border-accent transition-colors">

                  <Badge className="bg-accent text-accent-foreground mb-3">
                    Critical Protocol
                  </Badge>
                  <p className="text-sm mb-4">{guide.summary}</p>
                  <Button className="w-full bg-accent hover:bg-accent-700 text-white">
                    View Protocol
                  </Button>
                </DataCard>
              </Link>
            )}
          </div>
        </div>
        
        {/* Emergency Scenarios */}
        <div>
          <h2 className="text-xl font-bold mb-4">Emergency Scenarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/20 p-2 rounded-full mr-3">
                    <Snowflake className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">Extreme Cold</h3>
                </div>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Seek immediate shelter
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Use emergency heating supplies
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Monitor for frostbite symptoms
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Report temperature conditions
                  </li>
                </ul>
                <Link to="/guides">
                  <Button variant="outline" className="w-full">
                    View Cold Weather Protocols
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/20 p-2 rounded-full mr-3">
                    <Wind className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">Blizzard</h3>
                </div>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Secure all equipment and structures
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Establish communication schedule
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Prepare emergency power systems
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Monitor station integrity
                  </li>
                </ul>
                <Link to="/guides">
                  <Button variant="outline" className="w-full">
                    View Blizzard Protocols
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/20 p-2 rounded-full mr-3">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">Lost Personnel</h3>
                </div>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Activate search and rescue team
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Establish last known position
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Deploy emergency locator system
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Coordinate with nearest stations
                  </li>
                </ul>
                <Link to="/guides">
                  <Button variant="outline" className="w-full">
                    View Search Protocols
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>);

}