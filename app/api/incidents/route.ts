import { NextResponse } from "next/server"
import { SupabaseIncidentService } from "@/lib/services/supabase-incident-service"
import { SupabaseSecurityService } from "@/lib/services/supabase-security-service"
import { analyzeTrends, identifyHotspots, optimizeResourceAllocation } from "@/lib/ml-model"

// Helper function to normalize incident types
function normalizeIncidentType(type: string): string {
  const normalized = type.toLowerCase().trim()

  const typeMapping: Record<string, string> = {
    theft: "theft",
    steal: "theft",
    stealing: "theft",
    burglary: "theft",
    robbery: "theft",
    vandalism: "vandalism",
    damage: "vandalism",
    destruction: "vandalism",
    graffiti: "vandalism",
    fighting: "fighting",
    fight: "fighting",
    assault: "fighting",
    violence: "fighting",
    attack: "fighting",
    other: "other",
    misc: "other",
    miscellaneous: "other",
  }

  return typeMapping[normalized] || "other"
}

export async function GET() {
  try {
    console.log("🔍 Fetching data from Supabase...")

    const [incidents, securityMeasures, securityPersonnel] = await Promise.all([
      SupabaseIncidentService.getAllIncidents(),
      SupabaseSecurityService.getSecurityMeasures(),
      SupabaseSecurityService.getSecurityPersonnel(),
    ])

    console.log(
      `📊 Loaded ${incidents.length} incidents, ${securityMeasures.length} measures, ${securityPersonnel.length} personnel`,
    )

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
    console.error("❌ Error fetching data:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch data",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    console.log("📝 Creating new incident...")

    const body = await request.json()
    console.log("📋 Received data:", body)

    // Validate required fields
    if (!body.type || !body.date || !body.location) {
      console.log("❌ Missing required fields")
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: type, date, and location are required",
        },
        { status: 400 },
      )
    }

    // Normalize incident type
    const normalizedType = normalizeIncidentType(body.type)

    // Validate severity
    const severity = Number.parseInt(body.severity) || 3
    const validSeverity = Math.max(1, Math.min(5, severity))

    // Validate date format
    const date = new Date(body.date)
    if (isNaN(date.getTime())) {
      console.log("❌ Invalid date:", body.date)
      return NextResponse.json(
        {
          success: false,
          error: `Invalid date format '${body.date}'. Use YYYY-MM-DD format`,
        },
        { status: 400 },
      )
    }

    const incidentData = {
      type: normalizedType,
      date: body.date,
      location: body.location,
      description: body.description || null,
      severity: validSeverity,
      recovered: Boolean(body.recovered),
      reported_by: body.reportedBy || "Manual Entry",
      status: "open" as const,
    }

    console.log("💾 Saving to database:", incidentData)
    const incident = await SupabaseIncidentService.createIncident(incidentData)

    console.log("✅ Incident created successfully:", incident?.id)

    return NextResponse.json({
      success: true,
      incident,
      message: "Incident created successfully",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Error creating incident:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create incident",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
