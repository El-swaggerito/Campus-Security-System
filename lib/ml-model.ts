import type { Incident } from "./data"

interface Trend {
  theftTrend: number
}

export function analyzeTrends(incidents: Incident[]): Trend {
  const earlyYear = incidents.filter((i) => new Date(i.date) < new Date("2024-06-01"))
  const lateYear = incidents.filter((i) => new Date(i.date) >= new Date("2024-06-01"))

  const earlyThefts = earlyYear.length
  const lateThefts = lateYear.length

  const theftTrend = (lateThefts - earlyThefts) / (earlyThefts || 1)

  return { theftTrend }
}

interface Hotspot {
  location: string
  incidentCount: number
  riskScore: number
}

export function identifyHotspots(incidents: Incident[]): Hotspot[] {
  const locationCounts: { [key: string]: { count: number; recentCount: number } } = {}
  const currentDate = new Date()
  const threeMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate())

  incidents.forEach((incident) => {
    if (!locationCounts[incident.location]) {
      locationCounts[incident.location] = { count: 0, recentCount: 0 }
    }
    locationCounts[incident.location].count += 1
    if (new Date(incident.date) >= threeMonthsAgo) {
      locationCounts[incident.location].recentCount += 1
    }
  })

  return Object.entries(locationCounts)
    .map(([location, { count, recentCount }]) => ({
      location,
      incidentCount: count,
      riskScore: calculateRiskScore(count, recentCount),
    }))
    .sort((a, b) => b.riskScore - a.riskScore)
}

function calculateRiskScore(totalIncidents: number, recentIncidents: number): number {
  // Risk score formula: (Recent incidents * 2) + Total incidents
  return recentIncidents * 2 + totalIncidents
}

interface SecurityPersonnel {
  id: number
  name: string
  shift: "day" | "night"
  assignedArea?: string
}

export function optimizeResourceAllocation(hotspots: Hotspot[], personnel: SecurityPersonnel[]): SecurityPersonnel[] {
  const sortedHotspots = [...hotspots].sort((a, b) => b.riskScore - a.riskScore)
  const optimizedPersonnel = [...personnel]

  sortedHotspots.forEach((hotspot, index) => {
    if (index < optimizedPersonnel.length) {
      optimizedPersonnel[index] = { ...optimizedPersonnel[index], assignedArea: hotspot.location }
    }
  })

  return optimizedPersonnel
}
