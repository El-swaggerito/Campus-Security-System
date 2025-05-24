"use client"

import { useEffect, useState } from "react"
import Layout from "@/components/layout"
import { IncidentChart } from "@/components/IncidentChart"
import { AnimatedCard } from "@/components/AnimatedCard"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OverviewData {
  incidents: any[]
  trends: { theftTrend: number }
  hotspots: { location: string; incidentCount: number; riskScore: number }[]
  securityMeasures: { id: number; description: string }[]
  optimizedAllocation: {
    id: number
    name: string
    shift: "day" | "night"
    assignedArea: string
  }[]
}

export default function Overview() {
  const [data, setData] = useState<OverviewData | null>(null)

  useEffect(() => {
    fetch("/api/incidents")
      .then((response) => response.json())
      .then(setData)
  }, [])

  if (!data) return <div>Loading...</div>

  const chartData = [
    { month: "Jan-Mar", thefts: 15 },
    { month: "Apr-Jul", thefts: 0 },
    { month: "Aug-Dec", thefts: 5 },
  ]

  // Hotspots including all requested locations
  const hotspots = [
    { location: "Campus Square", riskScore: 6.0 },
    { location: "Student Center", riskScore: 5.0 },
    { location: "Sports Complex", riskScore: 4.0 },
    { location: "Lecture Hall", riskScore: 4.0 },
    { location: "International M Hostel", riskScore: 3.5 },
    { location: "International F Hostel", riskScore: 3.5 },
    { location: "Mosque", riskScore: 3.2 },
    { location: "Gym", riskScore: 3.1 },
    { location: "Block of Offices", riskScore: 3.0 },
    { location: "Parking Lot", riskScore: 3.0 },
    { location: "Admin Building", riskScore: 3.0 },
    { location: "Library", riskScore: 2.0 },
  ]

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Campus Security Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatedCard delay={0.1}>
          <IncidentChart data={chartData} />
        </AnimatedCard>
        <AnimatedCard delay={0.2}>
          <CardHeader>
            <CardTitle className="text-gray-900">Predicted Hotspots</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-y-auto">
            <ul className="space-y-2">
              {hotspots.map((hotspot, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0 last:pb-0"
                >
                  <span className="text-gray-700">{hotspot.location}</span>
                  <span className="text-sm text-gray-500">
                    Risk Score: <span className="font-medium text-blue-600">{hotspot.riskScore.toFixed(2)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </AnimatedCard>
        <AnimatedCard delay={0.3}>
          <CardHeader>
            <CardTitle className="text-gray-900">Incident Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Theft Trend: <span className="font-medium text-green-600">-20.00%</span>
            </p>
          </CardContent>
        </AnimatedCard>
        <AnimatedCard delay={0.4}>
          <CardHeader>
            <CardTitle className="text-gray-900">Security Measures</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {data.securityMeasures.map((measure) => (
                <li key={measure.id} className="text-gray-700">
                  {measure.description}
                </li>
              ))}
            </ul>
          </CardContent>
        </AnimatedCard>
      </div>
    </Layout>
  )
}
