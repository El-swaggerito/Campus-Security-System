import { NextResponse } from "next/server"
import { IncidentService } from "@/lib/services/incident-service"
import { SecurityService } from "@/lib/services/security-service"
import { analyzeTrends, identifyHotspots, optimizeResourceAllocation } from "@/lib/ml-model"
import { isValidIncidentType, isValidSeverity } from "@/lib/models/incident"

export async function GET() {
  try {
    const [incidents, securityMeasures, securityPersonnel] = await Promise.all([
      IncidentService.getAllIncidents(),
      SecurityService.getSecurityMeasures(),
      SecurityService.getSecurityPersonnel(),
    ])

    // Convert MongoDB documents to the format expected by ML functions
    const incidentsForAnalysis = incidents.map((incident) => ({
      id: incident._id?.toString() || "",
      type: incident.type,
      date: incident.date.toISOString(),
      location: incident.location,
      recovered: incident.recovered || false,
    }))

    const trends = analyzeTrends(incidentsForAnalysis)
    const hotspots = identifyHotspots(incidentsForAnalysis)

    // Convert personnel for optimization
    const personnelForOptimization = securityPersonnel.map((person) => ({
      id: person._id?.toString() || "",
      name: person.name,
      shift: person.shift,
      assignedArea: person.assignedArea,
    }))

    const optimizedAllocation = optimizeResourceAllocation(hotspots, personnelForOptimization)

    return NextResponse.json({
      incidents: incidentsForAnalysis,
      trends,
      hotspots,
      securityMeasures: securityMeasures.map((measure) => ({
        id: measure._id?.toString() || "",
        description: measure.description,
      })),
      optimizedAllocation,
    })
  } catch (error) {
    console.error("Error fetching data:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.type || !body.date || !body.location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate incident type
    if (!isValidIncidentType(body.type)) {
      return NextResponse.json({ error: "Invalid incident type" }, { status: 400 })
    }

    // Validate severity
    const severity = Number.parseInt(body.severity) || 1
    if (!isValidSeverity(severity)) {
      return NextResponse.json({ error: "Invalid severity level" }, { status: 400 })
    }

    const incidentData = {
      type: body.type,
      date: new Date(body.date),
      location: body.location,
      description: body.description || "",
      severity,
      recovered: Boolean(body.recovered),
      reportedBy: body.reportedBy || "System",
      status: "open" as const,
    }

    const incident = await IncidentService.createIncident(incidentData)

    return NextResponse.json({
      success: true,
      incident: {
        id: incident._id?.toString(),
        ...incidentData,
        date: incident.date.toISOString(),
      },
    })
  } catch (error) {
    console.error("Error creating incident:", error)
    return NextResponse.json({ error: "Failed to create incident" }, { status: 500 })
  }
}
