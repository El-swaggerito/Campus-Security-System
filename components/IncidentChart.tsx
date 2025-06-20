"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface IncidentChartProps {
  data: { month: string; thefts: number }[]
}

export function IncidentChart({ data }: IncidentChartProps) {
  // Ensure we have valid data
  const chartData =
    data && data.length > 0
      ? data
      : [
          { month: "Jan-Mar", thefts: 0 },
          { month: "Apr-Jul", thefts: 0 },
          { month: "Aug-Dec", thefts: 0 },
        ]

  console.log("Chart data:", chartData) // Debug log

  return (
    <>
      <CardHeader>
        <CardTitle className="text-gray-900">Theft Incidents Over Time</CardTitle>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              labelStyle={{ color: "#1e293b", fontWeight: "600" }}
              cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
            />
            <Legend />
            <Bar dataKey="thefts" fill="#3b82f6" name="Theft Incidents" radius={[4, 4, 0, 0]} maxBarSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </>
  )
}
