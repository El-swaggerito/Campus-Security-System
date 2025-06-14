import type { Incident } from "./data"

// Data validation functions
export function validateIncident(incident: any): boolean {
  const requiredFields = ["type", "date", "location"]
  return requiredFields.every((field) => incident[field] && incident[field].trim() !== "")
}

export function sanitizeIncident(incident: any): Incident {
  return {
    id: incident.id || Date.now(),
    type: incident.type.toLowerCase(),
    date: incident.date,
    location: incident.location,
    recovered: Boolean(incident.recovered),
    severity: Math.max(1, Math.min(5, Number.parseInt(incident.severity) || 1)),
  }
}

// CSV export function
export function exportToCsv(incidents: Incident[]): string {
  const headers = ["id", "type", "date", "location", "severity", "recovered"]
  const csvContent = [
    headers.join(","),
    ...incidents.map((incident) => headers.map((header) => incident[header as keyof Incident]).join(",")),
  ].join("\n")

  return csvContent
}

// Data analysis helpers
export function getIncidentStats(incidents: Incident[]) {
  const total = incidents.length
  const byType = incidents.reduce(
    (acc, incident) => {
      acc[incident.type] = (acc[incident.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const byLocation = incidents.reduce(
    (acc, incident) => {
      acc[incident.location] = (acc[incident.location] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return { total, byType, byLocation }
}
