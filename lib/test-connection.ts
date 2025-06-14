import { supabase } from "@/lib/supabase"

export async function testSupabaseConnection() {
  try {
    console.log("Testing Supabase connection...")

    // Test basic connection
    const { data, error } = await supabase.from("incidents").select("count", { count: "exact", head: true })

    if (error) {
      console.error("Connection test failed:", error)
      return { success: false, error: error.message }
    }

    console.log("✅ Supabase connection successful!")
    console.log(`📊 Found ${data} incidents in database`)

    return { success: true, count: data }
  } catch (error) {
    console.error("Connection test error:", error)
    return { success: false, error: String(error) }
  }
}

export async function checkTableStructure() {
  try {
    console.log("Checking table structure...")

    // Check if tables exist by trying to query them
    const tables = ["incidents", "security_measures", "security_personnel"]
    const results = []

    for (const table of tables) {
      try {
        const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true })

        if (error) {
          results.push({ table, exists: false, error: error.message })
        } else {
          results.push({ table, exists: true, count })
        }
      } catch (err) {
        results.push({ table, exists: false, error: String(err) })
      }
    }

    return results
  } catch (error) {
    console.error("Table structure check error:", error)
    return []
  }
}
