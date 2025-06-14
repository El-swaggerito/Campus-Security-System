import { NextResponse } from "next/server"
import { SupabaseIncidentService } from "@/lib/services/supabase-incident-service"

export async function POST(request: Request) {
  try {
    const { csvData } = await request.json()

    if (!csvData || typeof csvData !== "string") {
      return NextResponse.json({ error: "Invalid CSV data" }, { status: 400 })
    }

    // Parse CSV data
    const lines = csvData.trim().split("\n")
    if (lines.length < 2) {
      return NextResponse.json({ error: "CSV must have header and at least one data row" }, { status: 400 })
    }

    const headers = lines[0].split(",").map((h: string) => h.trim().toLowerCase())
    const requiredHeaders = ["type", "date", "location"]

    // Validate headers
    const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header))
    if (missingHeaders.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required headers: ${missingHeaders.join(", ")}`,
        },
        { status: 400 },
      )
    }

    const incidents = []
    const errors = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v: string) => v.trim())

      if (values.length < headers.length) {
        errors.push(`Row ${i + 1}: Insufficient columns`)
        continue
      }

      const rowData: any = {}
      headers.forEach((header, index) => {
        rowData[header] = values[index]
      })

      // Validate and convert data
      try {
        const validTypes = ["theft", "vandalism", "fighting", "other"]
        if (!validTypes.includes(rowData.type)) {
          errors.push(`Row ${i + 1}: Invalid incident type '${rowData.type}'`)
          continue
        }

        const date = new Date(rowData.date)
        if (isNaN(date.getTime())) {
          errors.push(`Row ${i + 1}: Invalid date '${rowData.date}'`)
          continue
        }

        const severity = Number.parseInt(rowData.severity) || 1
        if (severity < 1 || severity > 5) {
          errors.push(`Row ${i + 1}: Invalid severity '${rowData.severity}'`)
          continue
        }

        incidents.push({
          type: rowData.type,
          date: rowData.date,
          location: rowData.location,
          description: rowData.description || null,
          severity,
          recovered: rowData.recovered === "true" || rowData.recovered === "1",
          reported_by: rowData.reportedby || "CSV Import",
          status: "open" as const,
        })
      } catch (error) {
        errors.push(`Row ${i + 1}: ${error}`)
      }
    }

    if (incidents.length === 0) {
      return NextResponse.json(
        {
          error: "No valid incidents to import",
          errors,
        },
        { status: 400 },
      )
    }

    // Bulk insert incidents
    const insertedCount = await SupabaseIncidentService.bulkCreateIncidents(incidents)

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${insertedCount} incidents`,
      insertedCount,
      errors: errors.length > 0 ? errors : undefined,
    })
  } catch (error) {
    console.error("Error processing bulk import:", error)
    return NextResponse.json({ error: "Failed to process bulk import" }, { status: 500 })
  }
}
