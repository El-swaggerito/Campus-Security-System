import { NextResponse } from "next/server"
import { testSupabaseConnection, checkTableStructure } from "@/lib/test-connection"

export async function GET() {
  try {
    console.log("🔍 Testing Supabase connection and database setup...")

    const connectionTest = await testSupabaseConnection()
    const tableStructure = await checkTableStructure()

    return NextResponse.json({
      success: connectionTest.success,
      connection: connectionTest,
      tables: tableStructure,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Connection test API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to test connection",
        details: String(error),
      },
      { status: 500 },
    )
  }
}
