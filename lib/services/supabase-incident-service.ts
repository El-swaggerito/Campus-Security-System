import { supabase } from "@/lib/supabase"
import type { Database, Incident } from "@/lib/supabase"

type IncidentInsert = Database["public"]["Tables"]["incidents"]["Insert"]
type IncidentUpdate = Database["public"]["Tables"]["incidents"]["Update"]

export class SupabaseIncidentService {
  // Create a new incident
  static async createIncident(incidentData: IncidentInsert): Promise<Incident | null> {
    const { data, error } = await supabase.from("incidents").insert(incidentData).select().single()

    if (error) {
      console.error("Error creating incident:", error)
      throw new Error(error.message)
    }

    return data
  }

  // Get all incidents
  static async getAllIncidents(): Promise<Incident[]> {
    const { data, error } = await supabase.from("incidents").select("*").order("date", { ascending: false })

    if (error) {
      console.error("Error fetching incidents:", error)
      throw new Error(error.message)
    }

    return data || []
  }

  // Get incidents by date range
  static async getIncidentsByDateRange(startDate: string, endDate: string): Promise<Incident[]> {
    const { data, error } = await supabase
      .from("incidents")
      .select("*")
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date", { ascending: false })

    if (error) {
      console.error("Error fetching incidents by date range:", error)
      throw new Error(error.message)
    }

    return data || []
  }

  // Get incidents by location
  static async getIncidentsByLocation(location: string): Promise<Incident[]> {
    const { data, error } = await supabase
      .from("incidents")
      .select("*")
      .eq("location", location)
      .order("date", { ascending: false })

    if (error) {
      console.error("Error fetching incidents by location:", error)
      throw new Error(error.message)
    }

    return data || []
  }

  // Get incidents by type
  static async getIncidentsByType(type: string): Promise<Incident[]> {
    const { data, error } = await supabase
      .from("incidents")
      .select("*")
      .eq("type", type)
      .order("date", { ascending: false })

    if (error) {
      console.error("Error fetching incidents by type:", error)
      throw new Error(error.message)
    }

    return data || []
  }

  // Update incident
  static async updateIncident(id: number, updateData: IncidentUpdate): Promise<Incident | null> {
    const { data, error } = await supabase.from("incidents").update(updateData).eq("id", id).select().single()

    if (error) {
      console.error("Error updating incident:", error)
      throw new Error(error.message)
    }

    return data
  }

  // Delete incident
  static async deleteIncident(id: number): Promise<boolean> {
    const { error } = await supabase.from("incidents").delete().eq("id", id)

    if (error) {
      console.error("Error deleting incident:", error)
      throw new Error(error.message)
    }

    return true
  }

  // Get incident statistics
  static async getIncidentStats() {
    // Get total count
    const { count: totalCount } = await supabase.from("incidents").select("*", { count: "exact", head: true })

    // Get incidents by type
    const { data: allIncidents } = await supabase.from("incidents").select("type, location, date")

    if (!allIncidents) {
      throw new Error("Failed to fetch incident data for statistics")
    }

    // Process statistics
    const typeStats = allIncidents.reduce(
      (acc, incident) => {
        acc[incident.type] = (acc[incident.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const locationStats = allIncidents.reduce(
      (acc, incident) => {
        acc[incident.location] = (acc[incident.location] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // Monthly trends
    const monthlyStats = allIncidents.reduce(
      (acc, incident) => {
        const date = new Date(incident.date)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

        if (!acc[monthKey]) {
          acc[monthKey] = {}
        }
        acc[monthKey][incident.type] = (acc[monthKey][incident.type] || 0) + 1

        return acc
      },
      {} as Record<string, Record<string, number>>,
    )

    return {
      total: totalCount || 0,
      byType: Object.entries(typeStats).map(([type, count]) => ({ _id: type, count })),
      byLocation: Object.entries(locationStats)
        .map(([location, count]) => ({ _id: location, count }))
        .sort((a, b) => b.count - a.count),
      monthly: Object.entries(monthlyStats).map(([month, types]) => ({
        _id: { month, year: Number.parseInt(month.split("-")[0]) },
        ...types,
      })),
    }
  }

  // Bulk insert incidents (for CSV import)
  static async bulkCreateIncidents(incidents: IncidentInsert[]): Promise<number> {
    const { data, error } = await supabase.from("incidents").insert(incidents).select()

    if (error) {
      console.error("Error bulk creating incidents:", error)
      throw new Error(error.message)
    }

    return data?.length || 0
  }
}
