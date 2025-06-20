"use client"

import { useEffect, useState, useCallback } from "react"
import Layout from "@/components/layout"
import { IncidentChart } from "@/components/IncidentChart"
import { OptimizedAllocation } from "@/components/OptimizedAllocation"
import { SecurityHeatmap } from "@/components/SecurityHeatmap"
import { AnimatedCard } from "@/components/AnimatedCard"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingDown, MapPin, Shield, Users, AlertTriangle, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

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
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("/api/incidents", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      const newData = await response.json()
      console.log("Fetched data:", newData) // Debug log
      setData(newData)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Failed to load data:", error)
    }
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchData()
    setIsRefreshing(false)
  }

  useEffect(() => {
    fetchData()

    // Set up polling for real-time updates every 30 seconds
    const interval = setInterval(fetchData, 30000)

    return () => clearInterval(interval)
  }, [fetchData])

  // Listen for storage events (when data is updated in other tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "incident-updated") {
        fetchData()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [fetchData])

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

  // Process chart data with better date handling
  const processChartData = () => {
    if (!data.incidents || data.incidents.length === 0) {
      return [
        { month: "Jan-Mar", thefts: 0 },
        { month: "Apr-Jul", thefts: 0 },
        { month: "Aug-Dec", thefts: 0 },
      ]
    }

    const currentYear = new Date().getFullYear()

    const q1Count = data.incidents.filter((incident) => {
      const date = new Date(incident.date)
      return date.getFullYear() === currentYear && date.getMonth() >= 0 && date.getMonth() <= 2
    }).length

    const q2q3Count = data.incidents.filter((incident) => {
      const date = new Date(incident.date)
      return date.getFullYear() === currentYear && date.getMonth() >= 3 && date.getMonth() <= 6
    }).length

    const q4Count = data.incidents.filter((incident) => {
      const date = new Date(incident.date)
      return date.getFullYear() === currentYear && date.getMonth() >= 7 && date.getMonth() <= 11
    }).length

    const chartData = [
      { month: "Jan-Mar", thefts: q1Count },
      { month: "Apr-Jul", thefts: q2q3Count },
      { month: "Aug-Dec", thefts: q4Count },
    ]

    console.log("Processed chart data:", chartData) // Debug log
    return chartData
  }

  const chartData = processChartData()
  const hotspots = data.hotspots?.slice(0, 10) || []

  const heatmapData = hotspots.map((hotspot) => ({
    location: hotspot.location.length > 12 ? hotspot.location.substring(0, 12) + "..." : hotspot.location,
    riskLevel:
      hotspot.riskScore >= 6
        ? ("critical" as const)
        : hotspot.riskScore >= 4
          ? ("high" as const)
          : hotspot.riskScore >= 2
            ? ("medium" as const)
            : ("low" as const),
    incidents: hotspot.incidentCount,
  }))

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
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
              Campus Security Overview
            </h1>
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant="outline"
              size="sm"
              className="ml-4 flex items-center space-x-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </Button>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Advanced predictive analytics and real-time monitoring for enhanced campus safety and security management
          </p>
          {lastUpdated && <p className="text-sm text-slate-500 mt-2">Last updated: {lastUpdated.toLocaleString()}</p>}
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <AnimatedCard delay={0.1} variant="gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Total Incidents</p>
                <p className="text-3xl font-bold text-slate-800">{data.incidents?.length || 0}</p>
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
                <p className="text-3xl font-bold text-green-600">
                  {Math.abs(Math.round((data.trends?.theftTrend || -0.67) * 100))}%
                </p>
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
                <p className="text-3xl font-bold text-slate-800">{hotspots.length}</p>
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
                <p className="text-3xl font-bold text-slate-800">{data.optimizedAllocation?.length || 0}</p>
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
              {hotspots.length > 0 ? (
                hotspots.map((hotspot, index) => (
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
                ))
              ) : (
                <p className="text-slate-500 text-center py-4">No hotspots identified yet</p>
              )}
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
                  <span className="font-bold text-green-600 text-xl">
                    {Math.round((data.trends?.theftTrend || -0.67) * 100)}%
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  {(data.trends?.theftTrend || -0.67) < 0
                    ? "Significant reduction in theft incidents due to implemented security measures"
                    : "Increase in theft incidents - additional measures may be needed"}
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
              {data.securityMeasures?.length > 0 ? (
                data.securityMeasures.map((measure) => (
                  <div
                    key={measure.id}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                  >
                    <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-700 leading-relaxed">{measure.description}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-center py-4">No security measures configured</p>
              )}
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard delay={1.0} variant="elevated">
          <OptimizedAllocation personnel={data.optimizedAllocation || []} />
        </AnimatedCard>
      </div>
    </Layout>
  )
}
