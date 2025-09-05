import { formatDateTime } from "@/lib/utils";

export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  lead: string;
  team: string[];
  status: "planning" | "active" | "completed" | "on-hold";
  startDate: Date;
  endDate: Date | null;
  location: string;
  tags: string[];
}

export interface ResearchUpdate {
  id: string;
  projectId: string;
  author: string;
  timestamp: Date;
  content: string;
  attachments?: {
    name: string;
    type: string;
    url: string;
  }[];
}

export const researchProjects: ResearchProject[] = [
  {
    id: "project-1",
    title: "Ice Core Analysis: Climate History",
    description: "Extracting and analyzing ice cores to study historical climate patterns over the past 10,000 years.",
    lead: "Dr. Sarah Chen",
    team: ["Dr. Sarah Chen", "Dr. Michael Rodriguez", "Dr. Emma Wilson", "James Peterson"],
    status: "active",
    startDate: new Date(2023, 5, 15),
    endDate: new Date(2024, 8, 30),
    location: "Alpha Base",
    tags: ["climate", "ice cores", "paleoclimatology"],
  },
  {
    id: "project-2",
    title: "Microbiome of Antarctic Lakes",
    description: "Studying microbial communities in subglacial lakes to understand extremophile adaptations.",
    lead: "Dr. Michael Rodriguez",
    team: ["Dr. Michael Rodriguez", "Dr. Lisa Kumar", "Alex Thompson"],
    status: "active",
    startDate: new Date(2023, 8, 1),
    endDate: new Date(2024, 7, 31),
    location: "Bravo Outpost",
    tags: ["microbiology", "extremophiles", "subglacial lakes"],
  },
  {
    id: "project-3",
    title: "Atmospheric Ozone Monitoring",
    description: "Continuous monitoring of the ozone layer above Antarctica to track recovery patterns.",
    lead: "Dr. Emma Wilson",
    team: ["Dr. Emma Wilson", "Dr. Thomas Lee", "Sophia Martinez"],
    status: "active",
    startDate: new Date(2023, 2, 10),
    endDate: null,
    location: "Charlie Point",
    tags: ["ozone", "atmosphere", "climate change"],
  },
  {
    id: "project-4",
    title: "Penguin Population Dynamics",
    description: "Tracking Adélie penguin populations to understand impacts of changing sea ice conditions.",
    lead: "Dr. Thomas Lee",
    team: ["Dr. Thomas Lee", "Dr. Sarah Chen", "James Peterson"],
    status: "on-hold",
    startDate: new Date(2023, 10, 5),
    endDate: null,
    location: "Delta Ridge",
    tags: ["wildlife", "penguins", "population ecology"],
  },
  {
    id: "project-5",
    title: "Glacial Movement Patterns",
    description: "Using satellite imagery and ground sensors to measure glacial movement rates and predict future changes.",
    lead: "Dr. Lisa Kumar",
    team: ["Dr. Lisa Kumar", "Alex Thompson", "Sophia Martinez"],
    status: "planning",
    startDate: new Date(2024, 1, 1),
    endDate: new Date(2025, 0, 31),
    location: "Echo Valley",
    tags: ["glaciology", "remote sensing", "climate change"],
  },
];

export const researchUpdates: ResearchUpdate[] = [
  {
    id: "update-1",
    projectId: "project-1",
    author: "Dr. Sarah Chen",
    timestamp: new Date(2023, 11, 15, 9, 30),
    content: "Successfully extracted a 200m ice core from site Alpha-3. Initial visual inspection shows excellent preservation with clear annual layers. Core sections have been photographed, logged, and stored in the cold room for processing.",
    attachments: [
      {
        name: "ice_core_extraction.jpg",
        type: "image/jpeg",
        url: "#",
      },
      {
        name: "core_log_dec15.pdf",
        type: "application/pdf",
        url: "#",
      },
    ],
  },
  {
    id: "update-2",
    projectId: "project-1",
    author: "Dr. Michael Rodriguez",
    timestamp: new Date(2023, 11, 18, 14, 45),
    content: "Completed initial isotope analysis on sections 15-20 of the Alpha-3 core. Results show interesting fluctuations around the 5,000-year mark that may correlate with previously identified climate anomalies. Will need to run additional tests to confirm.",
  },
  {
    id: "update-3",
    projectId: "project-2",
    author: "Dr. Lisa Kumar",
    timestamp: new Date(2023, 11, 10, 11, 15),
    content: "Water samples collected from Lake Vostok access point show promising microbial diversity. Initial PCR results indicate at least 15 distinct bacterial species, including 3 that don't match our reference database. Preparing samples for metagenomic sequencing.",
    attachments: [
      {
        name: "pcr_results_dec10.xlsx",
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        url: "#",
      },
    ],
  },
  {
    id: "update-4",
    projectId: "project-3",
    author: "Dr. Emma Wilson",
    timestamp: new Date(2023, 11, 20, 8, 0),
    content: "Monthly ozone measurements complete. Data shows continued improvement in ozone levels compared to same period last year (+3.2%). However, we observed unusual fluctuations during the Nov 28-Dec 5 period that correlate with stratospheric temperature anomalies.",
    attachments: [
      {
        name: "ozone_dec2023.csv",
        type: "text/csv",
        url: "#",
      },
      {
        name: "stratospheric_temp_anomaly.png",
        type: "image/png",
        url: "#",
      },
    ],
  },
  {
    id: "update-5",
    projectId: "project-4",
    author: "Dr. Thomas Lee",
    timestamp: new Date(2023, 11, 5, 16, 20),
    content: "Project temporarily on hold due to equipment failure. The automated camera system at colony site D-7 has malfunctioned due to extreme cold conditions. Replacement parts have been requested in the next supply drop. Manual observations will continue on a limited schedule.",
  },
];

export function getFormattedResearchUpdates() {
  return researchUpdates.map(update => ({
    ...update,
    formattedDate: formatDateTime(update.timestamp),
    project: researchProjects.find(p => p.id === update.projectId)?.title || "Unknown Project",
  }));
}

export function getProjectById(id: string) {
  return researchProjects.find(project => project.id === id);
}

export function getUpdatesByProjectId(projectId: string) {
  return researchUpdates
    .filter(update => update.projectId === projectId)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}