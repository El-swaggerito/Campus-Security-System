import { createClient } from "@supabase/supabase-js"

// Get environment variables with fallbacks for build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Only validate in runtime, not during build
let supabase: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!supabase) {
    if (!supabaseUrl) {
      throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
    }

    if (!supabaseAnonKey) {
      throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
    }

    supabase = createClient(supabaseUrl, supabaseAnonKey)
  }

  return supabase
}

// Export a getter function instead of direct client
export { getSupabaseClient as supabase }

// Database types
export interface Database {
  public: {
    Tables: {
      incidents: {
        Row: {
          id: number
          type: "theft" | "vandalism" | "fighting" | "other"
          date: string
          location: string
          description: string | null
          severity: number
          recovered: boolean
          reported_by: string | null
          status: "open" | "investigating" | "resolved" | "closed"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          type: "theft" | "vandalism" | "fighting" | "other"
          date: string
          location: string
          description?: string | null
          severity: number
          recovered?: boolean
          reported_by?: string | null
          status?: "open" | "investigating" | "resolved" | "closed"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          type?: "theft" | "vandalism" | "fighting" | "other"
          date?: string
          location?: string
          description?: string | null
          severity?: number
          recovered?: boolean
          reported_by?: string | null
          status?: "open" | "investigating" | "resolved" | "closed"
          created_at?: string
          updated_at?: string
        }
      }
      security_measures: {
        Row: {
          id: number
          description: string
          implemented_date: string
          location: string | null
          effectiveness: number | null
          status: "active" | "inactive" | "planned"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          description: string
          implemented_date: string
          location?: string | null
          effectiveness?: number | null
          status?: "active" | "inactive" | "planned"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          description?: string
          implemented_date?: string
          location?: string | null
          effectiveness?: number | null
          status?: "active" | "inactive" | "planned"
          created_at?: string
          updated_at?: string
        }
      }
      security_personnel: {
        Row: {
          id: number
          name: string
          shift: "day" | "night"
          assigned_area: string | null
          contact_phone: string | null
          contact_email: string | null
          status: "active" | "inactive"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          shift: "day" | "night"
          assigned_area?: string | null
          contact_phone?: string | null
          contact_email?: string | null
          status?: "active" | "inactive"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          shift?: "day" | "night"
          assigned_area?: string | null
          contact_phone?: string | null
          contact_email?: string | null
          status?: "active" | "inactive"
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Incident = Database["public"]["Tables"]["incidents"]["Row"]
export type SecurityMeasure = Database["public"]["Tables"]["security_measures"]["Row"]
export type SecurityPersonnel = Database["public"]["Tables"]["security_personnel"]["Row"]
