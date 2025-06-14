import { NextResponse } from "next/server"
import { SupabaseIncidentService } from "@/lib/services/supabase-incident-service"
import { SupabaseSecurityService } from "@/lib/services/supabase-security-service"
import { analyzeTrends, identifyHotspots, optimizeResourceAllocation } from "@/lib/ml-model"

export async function GET() {
  try {
    const [incidents, securityMeasures, securityPersonnel] = await Promise.all([
      SupabaseIncidentService.getAllIncidents(),
      SupabaseSecurityService.getSecurityMeasures(),
      SupabaseSecurityService.getSecurityPersonnel(),
    ])

    // Convert Supabase data to the format expected by ML functions
    const incidentsForAnalysis = incidents.map((incident) => ({
      id: incident.id,
      type: incident.type as "theft",
      date: incident.date,
      location: incident.location,
      recovered: incident.recovered || false,
    }))

    const trends = analyzeTrends(incidentsForAnalysis)
    const hotspots = identifyHotspots(incidentsForAnalysis)

    // Convert personnel for optimization
    const personnelForOptimization = securityPersonnel.map((person) => ({
      id: person.id,
      name: person.name,
      shift: person.shift as "day" | "night",
      assignedArea: person.assigned_area,
    }))

    const optimizedAllocation = optimizeResourceAllocation(hotspots, personnelForOptimization)

    return NextResponse.json({
      incidents: incidentsForAnalysis,
      trends,
      hotspots,
      securityMeasures: securityMeasures.map((measure) => ({
        id: measure.id,
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
    const validTypes = ["theft", "vandalism", "fighting", "other"]
    if (!validTypes.includes(body.type)) {
      return NextResponse.json({ error: "Invalid incident type" }, { status: 400 })
    }

    // Validate severity
    const severity = Number.parseInt(body.severity) || 1
    if (severity < 1 || severity > 5) {
      return NextResponse.json({ error: "Invalid severity level" }, { status: 400 })
    }

    const incidentData = {
      type: body.type,
      date: body.date,
      location: body.location,
      description: body.description || null,
      severity,
      recovered: Boolean(body.recovered),
      reported_by: body.reportedBy || "System",
      status: "open" as const,
    }

    const incident = await SupabaseIncidentService.createIncident(incidentData)

    return NextResponse.json({
      success: true,
      incident,
    })
  } catch (error) {
    console.error("Error creating incident:", error)
    return NextResponse.json({ error: "Failed to create incident" }, { status: 500 })
  }
}
