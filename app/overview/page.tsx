"use client"

import { useEffect, useState } from "react"
import Layout from "@/components/layout"
import { IncidentChart } from "@/components/IncidentChart"
import { OptimizedAllocation } from "@/components/OptimizedAllocation"
import { SecurityHeatmap } from "@/components/SecurityHeatmap"
import { AnimatedCard } from "@/components/AnimatedCard"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown, MapPin, Shield, Users, AlertTriangle, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { DatabaseStatus } from "@/components/DatabaseStatus"

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

  if (!data) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600 font-medium">Loading security analysis...</p>
          </div>
        </div>
      </Layout>
    )
  }

  const chartData = [
    { month: "Jan-Mar", thefts: 15 },
    { month: "Apr-Jul", thefts: 0 },
    { month: "Aug-Dec", thefts: 5 },
  ]

  const hotspots = [
    { location: "Class Area", riskScore: 6.0 },
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

  const heatmapData = [
    { location: "Class Area", riskLevel: "critical" as const, incidents: 8 },
    { location: "Lecture Hall", riskLevel: "high" as const, incidents: 6 },
    { location: "Int'l M Hostel", riskLevel: "high" as const, incidents: 5 },
    { location: "Int'l F Hostel", riskLevel: "high" as const, incidents: 5 },
    { location: "Mosque", riskLevel: "medium" as const, incidents: 4 },
    { location: "Gym", riskLevel: "medium" as const, incidents: 4 },
    { location: "Block of Offices", riskLevel: "medium" as const, incidents: 3 },
    { location: "Parking Lot", riskLevel: "medium" as const, incidents: 3 },
    { location: "Admin Building", riskLevel: "medium" as const, incidents: 3 },
    { location: "Library", riskLevel: "low" as const, incidents: 2 },
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-4">
            Campus Security Overview
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Advanced predictive analytics and real-time monitoring for enhanced campus safety and security management
          </p>
        </motion.div>
      </div>

      {/* Database Status */}
      <div className="mb-8">
        <DatabaseStatus />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <AnimatedCard delay={0.1} variant="gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Total Incidents</p>
                <p className="text-3xl font-bold text-slate-800">20</p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard delay={0.2} variant="gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Risk Reduction</p>
                <p className="text-3xl font-bold text-green-600">67%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <TrendingDown className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard delay={0.3} variant="gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Monitored Areas</p>
                <p className="text-3xl font-bold text-slate-800">10</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard delay={0.4} variant="gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Security Personnel</p>
                <p className="text-3xl font-bold text-slate-800">6</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </AnimatedCard>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <AnimatedCard delay={0.5} variant="elevated">
          <IncidentChart data={chartData} />
        </AnimatedCard>

        <AnimatedCard delay={0.6} variant="elevated">
          <SecurityHeatmap data={heatmapData} />
        </AnimatedCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <AnimatedCard delay={0.7} variant="elevated">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-slate-800">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span>Predicted Hotspots</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-y-auto">
            <div className="space-y-3">
              {hotspots.map((hotspot, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-200"
                >
                  <span className="font-medium text-slate-700">{hotspot.location}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-500">Risk Score:</span>
                    <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                      {hotspot.riskScore.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard delay={0.8} variant="elevated">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-slate-800">
              <TrendingDown className="h-5 w-5 text-green-600" />
              <span>Incident Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700">Theft Trend</span>
                  <span className="font-bold text-green-600 text-xl">-67%</span>
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  Significant reduction in theft incidents due to implemented security measures
                </p>
              </div>
            </div>
          </CardContent>
        </AnimatedCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatedCard delay={0.9} variant="elevated">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-slate-800">
              <Shield className="h-5 w-5 text-green-600" />
              <span>Security Measures</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.securityMeasures.map((measure) => (
                <div
                  key={measure.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                >
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 leading-relaxed">{measure.description}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard delay={1.0} variant="elevated">
          <OptimizedAllocation personnel={data.optimizedAllocation} />
        </AnimatedCard>
      </div>
    </Layout>
  )
}
