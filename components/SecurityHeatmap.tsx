"use client"

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface HeatmapData {
  location: string
  riskLevel: "low" | "medium" | "high" | "critical"
  incidents: number
}

interface SecurityHeatmapProps {
  data: HeatmapData[]
}

export function SecurityHeatmap({ data }: SecurityHeatmapProps) {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "critical":
        return "bg-red-600"
      case "high":
        return "bg-red-400"
      case "medium":
        return "bg-yellow-400"
      case "low":
        return "bg-green-400"
      default:
        return "bg-gray-300"
    }
  }

  const getRiskTextColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "critical":
      case "high":
        return "text-white"
      default:
        return "text-gray-900"
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-gray-900">Security Risk Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {data.map((item, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg text-center transition-all duration-200 hover:scale-105 ${getRiskColor(item.riskLevel)} ${getRiskTextColor(item.riskLevel)}`}
            >
              <div className="font-semibold text-sm mb-1">{item.location}</div>
              <div className="text-xs opacity-90">{item.incidents} incidents</div>
              <div className="text-xs font-medium mt-1 capitalize">{item.riskLevel} Risk</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-400 rounded"></div>
            <span>Low</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-400 rounded"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-400 rounded"></div>
            <span>High</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-600 rounded"></div>
            <span>Critical</span>
          </div>
        </div>
      </CardContent>
    </>
  )
}
