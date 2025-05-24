import { NextResponse } from "next/server"
import { incidents, securityMeasures } from "@/lib/data"
import { analyzeTrends, identifyHotspots, optimizeResourceAllocation } from "@/lib/ml-model"

const securityPersonnel = [
  { id: 1, name: "John Doe", shift: "day" as const },
  { id: 2, name: "Jane Smith", shift: "night" as const },
  { id: 3, name: "Mike Johnson", shift: "day" as const },
  { id: 4, name: "Emily Brown", shift: "night" as const },
]

export async function GET() {
  const trends = analyzeTrends(incidents)
  const hotspots = identifyHotspots(incidents)
  const optimizedAllocation = optimizeResourceAllocation(hotspots, securityPersonnel)

  return NextResponse.json({ incidents, trends, hotspots, securityMeasures, optimizedAllocation })
}
