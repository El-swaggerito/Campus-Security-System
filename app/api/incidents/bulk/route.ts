import { NextResponse } from "next/server"
import { SupabaseIncidentService } from "@/lib/services/supabase-incident-service"

// Helper function to normalize incident types
function normalizeIncidentType(type: string): string {
  const normalized = type.toLowerCase().trim()

  // Map various incident types to our standard types
  const typeMapping: Record<string, string> = {
    theft: "theft",
    steal: "theft",
    stealing: "theft",
    burglary: "theft",
    robbery: "theft",
    vandalism: "vandalism",
    damage: "vandalism",
    destruction: "vandalism",
    graffiti: "vandalism",
    fighting: "fighting",
    fight: "fighting",
    assault: "fighting",
    violence: "fighting",
    attack: "fighting",
    other: "other",
    misc: "other",
    miscellaneous: "other",
  }

  return typeMapping[normalized] || "other"
}

export async function POST(request: Request) {
  try {
    console.log("📤 Processing bulk CSV upload...")

    const { csvData } = await request.json()

    if (!csvData || typeof csvData !== "string") {
      console.log("❌ Invalid CSV data")
      return NextResponse.json(
        {
          success: false,
          error: "Invalid CSV data provided",
        },
        { status: 400 },
      )
    }

    // Parse CSV data
    const lines = csvData.trim().split("\n")
    if (lines.length < 2) {
      console.log("❌ CSV too short")
      return NextResponse.json(
        {
          success: false,
          error: "CSV must have header and at least one data row",
        },
        { status: 400 },
      )
    }

    const headers = lines[0].split(",").map((h: string) => h.trim().toLowerCase())
    const requiredHeaders = ["type", "date", "location"]

    console.log("📋 CSV headers:", headers)

    // Validate headers (only require essential ones)
    const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header))
    if (missingHeaders.length > 0) {
      console.log("❌ Missing headers:", missingHeaders)
      return NextResponse.json(
        {
          success: false,
          error: `Missing required headers: ${missingHeaders.join(", ")}. Required: ${requiredHeaders.join(", ")}`,
        },
        { status: 400 },
      )
    }

    const incidents = []
    const errors = []
    const warnings = []

    console.log(`📊 Processing ${lines.length - 1} data rows...`)

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v: string) => v.trim())

      if (values.length < headers.length) {
        errors.push(`Row ${i + 1}: Insufficient columns (expected ${headers.length}, got ${values.length})`)
        continue
      }

      const rowData: any = {}
      headers.forEach((header, index) => {
        rowData[header] = values[index] || ""
      })

      // Skip empty rows
      if (!rowData.type && !rowData.date && !rowData.location) {
        continue
      }

      // Validate and convert data
      try {
        // Normalize incident type
        const originalType = rowData.type
        const normalizedType = normalizeIncidentType(rowData.type)

        if (originalType.toLowerCase() !== normalizedType) {
          warnings.push(`Row ${i + 1}: Converted '${originalType}' to '${normalizedType}'`)
        }

        // Validate date
        const date = new Date(rowData.date)
        if (isNaN(date.getTime())) {
          errors.push(`Row ${i + 1}: Invalid date '${rowData.date}'. Use YYYY-MM-DD format`)
          continue
        }

        // Handle severity - default to 3 if not provided or invalid
        let severity = 3
        if (rowData.severity) {
          const parsedSeverity = Number.parseInt(rowData.severity)
          if (!isNaN(parsedSeverity) && parsedSeverity >= 1 && parsedSeverity <= 5) {
            severity = parsedSeverity
          } else {
            warnings.push(`Row ${i + 1}: Invalid severity '${rowData.severity}', defaulting to 3`)
          }
        } else {
          warnings.push(`Row ${i + 1}: No severity provided, defaulting to 3`)
        }

        // Handle recovered field
        let recovered = false
        if (rowData.recovered) {
          recovered = ["true", "1", "yes", "y"].includes(rowData.recovered.toLowerCase())
        }

        incidents.push({
          type: normalizedType,
          date: rowData.date,
          location: rowData.location,
          description: rowData.description || null,
          severity,
          recovered,
          reported_by: rowData.reportedby || rowData.reported_by || "CSV Import",
          status: "open" as const,
        })
      } catch (error) {
        errors.push(`Row ${i + 1}: ${error}`)
      }
    }

    console.log(`✅ Processed ${incidents.length} valid incidents`)
    if (errors.length > 0) {
      console.log(`⚠️ Found ${errors.length} errors:`, errors)
    }
    if (warnings.length > 0) {
      console.log(`ℹ️ Found ${warnings.length} warnings:`, warnings)
    }

    if (incidents.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No valid incidents to import",
          errors,
          warnings,
        },
        { status: 400 },
      )
    }

    // Bulk insert incidents
    console.log("💾 Inserting incidents into database...")
    const insertedCount = await SupabaseIncidentService.bulkCreateIncidents(incidents)

    console.log(`🎉 Successfully inserted ${insertedCount} incidents`)

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${insertedCount} incidents`,
      insertedCount,
      errors: errors.length > 0 ? errors : undefined,
      warnings: warnings.length > 0 ? warnings : undefined,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Error processing bulk import:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process bulk import",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
