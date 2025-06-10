import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    console.log("Testing MongoDB connection...")

    const db = await connectToDatabase()

    // Test the connection by listing collections
    const collections = await db.listCollections().toArray()

    return NextResponse.json({
      success: true,
      message: "MongoDB connection successful!",
      database: db.databaseName,
      collections: collections.map((col) => col.name),
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("MongoDB connection failed:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
