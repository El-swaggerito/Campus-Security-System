export interface Incident {
  id: number
  type: "theft"
  date: string
  location: string
  recovered?: boolean
}

// Define all campus locations
const campusLocations = [
  "Library",
  "Student Center",
  "Parking Lot",
  "Mosque",
  "Gym",
  "Block of Offices",
  "International M Hostel",
  "International F Hostel",
  "Campus Square",
  "Sports Complex",
  "Lecture Hall",
  "Admin Building",
]

export const incidents: Incident[] = [
  // January - March 2024 Thefts
  ...Array(15)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      type: "theft" as const,
      date: `2024-0${Math.floor(index / 5) + 1}-${(index % 5) * 5 + 1}`.padEnd(10, "0"),
      location: campusLocations[index % campusLocations.length],
      recovered: index < 8,
    })),
  // August - December 2024 Thefts
  ...Array(5)
    .fill(null)
    .map((_, index) => ({
      id: index + 16,
      type: "theft" as const,
      date: `2024-${Math.floor(index / 2) + 8}-${(index % 2) * 15 + 1}`.padEnd(10, "0"),
      location: campusLocations[index % campusLocations.length],
    })),
  // Add some specific incidents at key locations
  {
    id: 21,
    type: "theft" as const,
    date: "2024-02-15",
    location: "Mosque",
    recovered: false,
  },
  {
    id: 22,
    type: "theft" as const,
    date: "2024-03-10",
    location: "Gym",
    recovered: true,
  },
  {
    id: 23,
    type: "theft" as const,
    date: "2024-01-25",
    location: "Block of Offices",
    recovered: false,
  },
  {
    id: 24,
    type: "theft" as const,
    date: "2024-02-05",
    location: "International M Hostel",
    recovered: true,
  },
  {
    id: 25,
    type: "theft" as const,
    date: "2024-03-20",
    location: "International F Hostel",
    recovered: false,
  },
  {
    id: 26,
    type: "theft" as const,
    date: "2024-09-05",
    location: "Campus Square",
    recovered: true,
  },
  {
    id: 27,
    type: "theft" as const,
    date: "2024-10-12",
    location: "Sports Complex",
    recovered: false,
  },
  {
    id: 28,
    type: "theft" as const,
    date: "2024-01-18",
    location: "Lecture Hall",
    recovered: true,
  },
  {
    id: 29,
    type: "theft" as const,
    date: "2024-02-22",
    location: "Admin Building",
    recovered: false,
  },
  {
    id: 30,
    type: "theft" as const,
    date: "2024-03-15",
    location: "Campus Square",
    recovered: true,
  },
]

export interface SecurityMeasure {
  id: number
  description: string
}

export const securityMeasures: SecurityMeasure[] = [
  { id: 1, description: "Increased awareness campaigns" },
  { id: 2, description: "Restricted entry of non-resident students into hostels" },
  { id: 3, description: "Enhanced security monitoring in the Mosque" },
  { id: 4, description: "Installed lockers in the Gym for secure storage" },
  { id: 5, description: "Implemented access control in the Block of Offices" },
  { id: 6, description: "Increased patrols around International Hostels" },
  { id: 7, description: "Added security cameras in Campus Square" },
  { id: 8, description: "Improved lighting in Parking Lot and walkways" },
]
