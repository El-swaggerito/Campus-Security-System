"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface IncidentChartProps {
  data: { month: string; thefts: number }[]
}

export function IncidentChart({ data }: IncidentChartProps) {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-gray-900">Theft Incidents Over Time</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" stroke="#4B5563" />
            <YAxis stroke="#4B5563" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "none",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
              labelStyle={{ color: "#111827" }}
            />
            <Legend />
            <Bar dataKey="thefts" fill="#3B82F6" name="Thefts" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </>
  )
}
