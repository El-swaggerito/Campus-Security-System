import { NextResponse } from "next/server"
import { SupabaseIncidentService } from "@/lib/services/supabase-incident-service"

export async function GET() {
  try {
    const stats = await SupabaseIncidentService.getIncidentStats()

    return NextResponse.json({
      success: true,
      stats,
    })
  } catch (error) {
    console.error("Error fetching incident stats:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}
