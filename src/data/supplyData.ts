import { getRandomInt } from "@/lib/utils";

export interface SupplyDrop {
  id: string;
  name: string;
  status: "scheduled" | "in-transit" | "delivered" | "delayed";
  priority: "routine" | "urgent" | "emergency";
  scheduledDate: Date;
  estimatedArrival: Date | null;
  actualArrival: Date | null;
  coordinates: {
    lat: number;
    lng: number;
  };
  contents: SupplyItem[];
}

export interface SupplyItem {
  id: string;
  name: string;
  category: SupplyCategory;
  quantity: number;
  unit: string;
  critical: boolean;
}

export type SupplyCategory = 
  | "food" 
  | "fuel" 
  | "medical" 
  | "equipment" 
  | "research" 
  | "communications";

export const supplyDrops: SupplyDrop[] = [
  {
    id: "drop-1",
    name: "Monthly Resupply Alpha",
    status: "delivered",
    priority: "routine",
    scheduledDate: new Date(Date.now() - 7 * 86400000), // 7 days ago
    estimatedArrival: new Date(Date.now() - 2 * 86400000), // 2 days ago
    actualArrival: new Date(Date.now() - 2 * 86400000 + 3600000), // 2 days ago + 1 hour
    coordinates: { lat: -78.5, lng: 166.75 },
    contents: [
      {
        id: "item-1",
        name: "Freeze-dried meals",
        category: "food",
        quantity: 500,
        unit: "packs",
        critical: false,
      },
      {
        id: "item-2",
        name: "Diesel fuel",
        category: "fuel",
        quantity: 2000,
        unit: "liters",
        critical: true,
      },
      {
        id: "item-3",
        name: "Medical supplies",
        category: "medical",
        quantity: 10,
        unit: "boxes",
        critical: true,
      },
    ],
  },
  {
    id: "drop-2",
    name: "Research Equipment Bravo",
    status: "in-transit",
    priority: "urgent",
    scheduledDate: new Date(Date.now() - 2 * 86400000), // 2 days ago
    estimatedArrival: new Date(Date.now() + 12 * 3600000), // 12 hours from now
    actualArrival: null,
    coordinates: { lat: -64.8, lng: -62.6 },
    contents: [
      {
        id: "item-4",
        name: "Ice core drills",
        category: "research",
        quantity: 2,
        unit: "units",
        critical: false,
      },
      {
        id: "item-5",
        name: "Spectrometer",
        category: "research",
        quantity: 1,
        unit: "unit",
        critical: false,
      },
      {
        id: "item-6",
        name: "Sample containers",
        category: "research",
        quantity: 200,
        unit: "units",
        critical: false,
      },
    ],
  },
  {
    id: "drop-3",
    name: "Emergency Medical Charlie",
    status: "scheduled",
    priority: "emergency",
    scheduledDate: new Date(Date.now() + 1 * 86400000), // Tomorrow
    estimatedArrival: new Date(Date.now() + 2 * 86400000), // 2 days from now
    actualArrival: null,
    coordinates: { lat: -90.0, lng: 0.0 },
    contents: [
      {
        id: "item-7",
        name: "Antibiotics",
        category: "medical",
        quantity: 50,
        unit: "packs",
        critical: true,
      },
      {
        id: "item-8",
        name: "Surgical equipment",
        category: "medical",
        quantity: 1,
        unit: "kit",
        critical: true,
      },
    ],
  },
  {
    id: "drop-4",
    name: "Communications Upgrade Delta",
    status: "delayed",
    priority: "urgent",
    scheduledDate: new Date(Date.now() - 3 * 86400000), // 3 days ago
    estimatedArrival: new Date(Date.now() + 4 * 86400000), // 4 days from now
    actualArrival: null,
    coordinates: { lat: -84.2, lng: 160.7 },
    contents: [
      {
        id: "item-9",
        name: "Satellite phone",
        category: "communications",
        quantity: 5,
        unit: "units",
        critical: true,
      },
      {
        id: "item-10",
        name: "Radio equipment",
        category: "communications",
        quantity: 3,
        unit: "sets",
        critical: true,
      },
      {
        id: "item-11",
        name: "Antenna parts",
        category: "communications",
        quantity: 15,
        unit: "units",
        critical: false,
      },
    ],
  },
  {
    id: "drop-5",
    name: "Quarterly Resupply Echo",
    status: "scheduled",
    priority: "routine",
    scheduledDate: new Date(Date.now() + 10 * 86400000), // 10 days from now
    estimatedArrival: new Date(Date.now() + 12 * 86400000), // 12 days from now
    actualArrival: null,
    coordinates: { lat: -80.1, lng: -115.0 },
    contents: [
      {
        id: "item-12",
        name: "Food supplies",
        category: "food",
        quantity: 1000,
        unit: "kg",
        critical: true,
      },
      {
        id: "item-13",
        name: "Heating fuel",
        category: "fuel",
        quantity: 5000,
        unit: "liters",
        critical: true,
      },
      {
        id: "item-14",
        name: "Winter clothing",
        category: "equipment",
        quantity: 20,
        unit: "sets",
        critical: false,
      },
      {
        id: "item-15",
        name: "Spare parts",
        category: "equipment",
        quantity: 50,
        unit: "boxes",
        critical: false,
      },
    ],
  },
];

export const inventoryLevels = {
  "station-1": {
    food: { current: 75, target: 100, unit: "days" },
    fuel: { current: 60, target: 90, unit: "days" },
    medical: { current: 85, target: 100, unit: "%" },
    equipment: { current: 90, target: 100, unit: "%" },
  },
  "station-2": {
    food: { current: 45, target: 100, unit: "days" },
    fuel: { current: 30, target: 90, unit: "days" },
    medical: { current: 70, target: 100, unit: "%" },
    equipment: { current: 85, target: 100, unit: "%" },
  },
  "station-3": {
    food: { current: 90, target: 100, unit: "days" },
    fuel: { current: 85, target: 90, unit: "days" },
    medical: { current: 40, target: 100, unit: "%" },
    equipment: { current: 95, target: 100, unit: "%" },
  },
  "station-4": {
    food: { current: 20, target: 100, unit: "days" },
    fuel: { current: 15, target: 90, unit: "days" },
    medical: { current: 60, target: 100, unit: "%" },
    equipment: { current: 70, target: 100, unit: "%" },
  },
  "station-5": {
    food: { current: 65, target: 100, unit: "days" },
    fuel: { current: 50, target: 90, unit: "days" },
    medical: { current: 80, target: 100, unit: "%" },
    equipment: { current: 85, target: 100, unit: "%" },
  },
};

export function getSupplyStatus(stationId: string) {
  const station = inventoryLevels[stationId as keyof typeof inventoryLevels];
  if (!station) return null;
  
  return {
    ...station,
    overall: getRandomInt(
      Math.min(station.food.current, station.fuel.current, station.medical.current, station.equipment.current),
      Math.max(station.food.current, station.fuel.current, station.medical.current, station.equipment.current)
    ),
  };
}