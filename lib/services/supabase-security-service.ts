import { supabase } from "@/lib/supabase"
import type { Database, SecurityMeasure, SecurityPersonnel } from "@/lib/supabase"

type SecurityMeasureInsert = Database["public"]["Tables"]["security_measures"]["Insert"]
type SecurityPersonnelInsert = Database["public"]["Tables"]["security_personnel"]["Insert"]
type SecurityPersonnelUpdate = Database["public"]["Tables"]["security_personnel"]["Update"]

export class SupabaseSecurityService {
  // Security Measures
  static async getSecurityMeasures(): Promise<SecurityMeasure[]> {
    const { data, error } = await supabase
      .from("security_measures")
      .select("*")
      .eq("status", "active")
      .order("implemented_date", { ascending: false })

    if (error) {
      console.error("Error fetching security measures:", error)
      throw new Error(error.message)
    }

    return data || []
  }

  static async createSecurityMeasure(measureData: SecurityMeasureInsert): Promise<SecurityMeasure | null> {
    const { data, error } = await supabase.from("security_measures").insert(measureData).select().single()

    if (error) {
      console.error("Error creating security measure:", error)
      throw new Error(error.message)
    }

    return data
  }

  // Security Personnel
  static async getSecurityPersonnel(): Promise<SecurityPersonnel[]> {
    const { data, error } = await supabase
      .from("security_personnel")
      .select("*")
      .eq("status", "active")
      .order("name", { ascending: true })

    if (error) {
      console.error("Error fetching security personnel:", error)
      throw new Error(error.message)
    }

    return data || []
  }

  static async createSecurityPersonnel(personnelData: SecurityPersonnelInsert): Promise<SecurityPersonnel | null> {
    const { data, error } = await supabase.from("security_personnel").insert(personnelData).select().single()

    if (error) {
      console.error("Error creating security personnel:", error)
      throw new Error(error.message)
    }

    return data
  }

  static async updatePersonnelAssignment(id: number, assignedArea: string): Promise<SecurityPersonnel | null> {
    const { data, error } = await supabase
      .from("security_personnel")
      .update({ assigned_area: assignedArea })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating personnel assignment:", error)
      throw new Error(error.message)
    }

    return data
  }
}
