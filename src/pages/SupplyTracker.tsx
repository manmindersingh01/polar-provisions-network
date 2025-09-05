import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataCard } from "@/components/DataCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supplyDrops, inventoryLevels, SupplyDrop } from "@/data/supplyData";
import { weatherStations } from "@/data/weatherData";
import { formatDateTime } from "@/lib/utils";
import { Package, Calendar1 as Calendar, Clock, MapPin, Triangle as AlertTriangle, Check as CheckCircle, Truck, Loader as Loader2, ShoppingCart, Fuel, Stethoscope, Wrench, Search } from













"lucide-react";

export function SupplyTracker() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-success text-success-foreground";
      case "in-transit":
        return "bg-info text-info-foreground";
      case "scheduled":
        return "bg-secondary text-secondary-foreground";
      case "delayed":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "emergency":
        return "bg-accent text-accent-foreground";
      case "urgent":
        return "bg-warning text-warning-foreground";
      case "routine":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-5 w-5" />;
      case "in-transit":
        return <Truck className="h-5 w-5" />;
      case "scheduled":
        return <Calendar className="h-5 w-5" />;
      case "delayed":
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Loader2 className="h-5 w-5" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "food":
        return <ShoppingCart className="h-4 w-4" />;
      case "fuel":
        return <Fuel className="h-4 w-4" />;
      case "medical":
        return <Stethoscope className="h-4 w-4" />;
      case "equipment":
      case "research":
        return <Wrench className="h-4 w-4" />;
      case "communications":
        return <Search className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const filteredDrops = supplyDrops.filter((drop) =>
  drop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  drop.contents.some((item) =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )
  );

  const sortedDrops = [...filteredDrops].sort((a, b) => {
    // Sort by status priority: in-transit, scheduled, delayed, delivered
    const statusOrder: Record<string, number> = {
      "in-transit": 0,
      "scheduled": 1,
      "delayed": 2,
      "delivered": 3
    };

    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }

    // Then by priority: emergency, urgent, routine
    const priorityOrder: Record<string, number> = {
      "emergency": 0,
      "urgent": 1,
      "routine": 2
    };

    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    // Then by date
    const aDate = a.estimatedArrival || a.scheduledDate;
    const bDate = b.estimatedArrival || b.scheduledDate;
    return aDate.getTime() - bDate.getTime();
  });

  const renderSupplyDropDetails = (drop: SupplyDrop) => {
    const station = weatherStations.find((s) =>
    s.coordinates.lat === drop.coordinates.lat &&
    s.coordinates.lng === drop.coordinates.lng
    );

    return (
      <div key={drop.id} className="mb-6 bg-card rounded-lg border border-border overflow-hidden">
        <div className="p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">{drop.name}</h3>
                <Badge className={getStatusColor(drop.status)}>
                  <span className="flex items-center gap-1">
                    {getStatusIcon(drop.status)}
                    <span className="capitalize">{drop.status}</span>
                  </span>
                </Badge>
                <Badge className={getPriorityColor(drop.priority)}>
                  <span className="capitalize">{drop.priority}</span>
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Destination: {station?.name || "Unknown Location"}
              </p>
            </div>
            <div className="mt-2 md:mt-0 flex flex-col items-start md:items-end">
              <div className="flex items-center gap-1 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Scheduled: {formatDateTime(drop.scheduledDate)}</span>
              </div>
              {drop.estimatedArrival &&
              <div className="flex items-center gap-1 text-sm mt-1">
                  <Clock className="h-4 w-4" />
                  <span>ETA: {formatDateTime(drop.estimatedArrival)}</span>
                </div>
              }
              {drop.actualArrival &&
              <div className="flex items-center gap-1 text-sm mt-1">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Delivered: {formatDateTime(drop.actualArrival)}</span>
                </div>
              }
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-sm mb-4">
            <MapPin className="h-4 w-4" />
            <span>
              Coordinates: {drop.coordinates.lat.toFixed(2)}, {drop.coordinates.lng.toFixed(2)}
            </span>
          </div>
          
          <h4 className="font-medium mb-2">Contents:</h4>
          <div className="space-y-2">
            {drop.contents.map((item) =>
            <div
              key={item.id}
              className={`flex items-center justify-between p-2 rounded-md ${
              item.critical ? "bg-accent/10 dark:bg-accent/5" : "bg-muted/50"}`
              }>

                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded-full ${
                item.critical ? "bg-accent/20" : "bg-primary/20"}`
                }>
                    {getCategoryIcon(item.category)}
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {item.category}
                      {item.critical &&
                    <span className="ml-2 text-accent-700 dark:text-accent-500">
                          • Critical
                        </span>
                    }
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono font-medium">
                    {item.quantity} {item.unit}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>);

  };

  return (
    <div>
      <PageHeader
        title="Supply Tracker"
        description="Track supply drops and inventory levels across all stations">

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search supplies..."
            className="pl-9 h-10 w-[250px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />

        </div>
      </PageHeader>

      <div className="container mx-auto px-4 pb-16">
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming Drops</TabsTrigger>
            <TabsTrigger value="past">Past Deliveries</TabsTrigger>
            <TabsTrigger value="inventory">Inventory Levels</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-0">
            <div>
              {sortedDrops.
              filter((drop) => drop.status !== "delivered").
              map(renderSupplyDropDetails)}
              
              {sortedDrops.filter((drop) => drop.status !== "delivered").length === 0 &&
              <div className="text-center py-12">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-1">No Upcoming Supply Drops</h3>
                  <p className="text-muted-foreground">
                    All scheduled supply drops have been delivered.
                  </p>
                </div>
              }
            </div>
          </TabsContent>
          
          <TabsContent value="past" className="mt-0">
            <div>
              {sortedDrops.
              filter((drop) => drop.status === "delivered").
              map(renderSupplyDropDetails)}
              
              {sortedDrops.filter((drop) => drop.status === "delivered").length === 0 &&
              <div className="text-center py-12">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-1">No Past Deliveries</h3>
                  <p className="text-muted-foreground">
                    No supply drops have been delivered yet.
                  </p>
                </div>
              }
            </div>
          </TabsContent>
          
          <TabsContent value="inventory" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(inventoryLevels).map(([stationId, levels]) => {
                const station = weatherStations.find((s) => s.id === stationId);
                if (!station) return null;

                return (
                  <DataCard
                    key={stationId}
                    title={station.name}
                    icon={<MapPin className="h-5 w-5" />}>

                    <div className="space-y-4 mt-2">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium flex items-center gap-1">
                            <ShoppingCart className="h-4 w-4" /> Food
                          </span>
                          <span className="text-sm">
                            {levels.food.current}/{levels.food.target} {levels.food.unit}
                          </span>
                        </div>
                        <Progress
                          value={levels.food.current / levels.food.target * 100}
                          className={levels.food.current < levels.food.target * 0.25 ? "bg-accent/20" : ""} />

                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium flex items-center gap-1">
                            <Fuel className="h-4 w-4" /> Fuel
                          </span>
                          <span className="text-sm">
                            {levels.fuel.current}/{levels.fuel.target} {levels.fuel.unit}
                          </span>
                        </div>
                        <Progress
                          value={levels.fuel.current / levels.fuel.target * 100}
                          className={levels.fuel.current < levels.fuel.target * 0.25 ? "bg-accent/20" : ""} />

                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium flex items-center gap-1">
                            <Stethoscope className="h-4 w-4" /> Medical
                          </span>
                          <span className="text-sm">
                            {levels.medical.current}/{levels.medical.target} {levels.medical.unit}
                          </span>
                        </div>
                        <Progress
                          value={levels.medical.current / levels.medical.target * 100}
                          className={levels.medical.current < levels.medical.target * 0.25 ? "bg-accent/20" : ""} />

                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium flex items-center gap-1">
                            <Wrench className="h-4 w-4" /> Equipment
                          </span>
                          <span className="text-sm">
                            {levels.equipment.current}/{levels.equipment.target} {levels.equipment.unit}
                          </span>
                        </div>
                        <Progress
                          value={levels.equipment.current / levels.equipment.target * 100}
                          className={levels.equipment.current < levels.equipment.target * 0.25 ? "bg-accent/20" : ""} />

                      </div>
                    </div>
                    
                    {(levels.food.current < levels.food.target * 0.25 ||
                    levels.fuel.current < levels.fuel.target * 0.25 ||
                    levels.medical.current < levels.medical.target * 0.25) &&
                    <div className="mt-4">
                        <div className="alert-warning">
                          <div className="flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            <span className="text-sm font-medium">
                              Critical inventory levels detected
                            </span>
                          </div>
                        </div>
                      </div>
                    }
                  </DataCard>);

              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>);

}