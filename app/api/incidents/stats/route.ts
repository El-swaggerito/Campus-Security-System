import { NextResponse } from "next/server"
import { IncidentService } from "@/lib/services/incident-service"

export async function GET() {
  try {
    const stats = await IncidentService.getIncidentStats()

    return NextResponse.json({
      success: true,
      stats,
    })
  } catch (error) {
    console.error("Error fetching incident stats:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}
