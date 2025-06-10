import type { ObjectId } from "mongodb"

export interface IncidentDocument {
  _id?: ObjectId
  type: "theft" | "vandalism" | "fighting" | "other"
  date: Date
  location: string
  description?: string
  severity: number // 1-5 scale
  recovered?: boolean
  reportedBy?: string
  status: "open" | "investigating" | "resolved" | "closed"
  createdAt: Date
  updatedAt: Date
}

export interface SecurityMeasureDocument {
  _id?: ObjectId
  description: string
  implementedDate: Date
  location?: string
  effectiveness?: number // 1-5 scale
  status: "active" | "inactive" | "planned"
  createdAt: Date
  updatedAt: Date
}

export interface SecurityPersonnelDocument {
  _id?: ObjectId
  name: string
  shift: "day" | "night"
  assignedArea?: string
  contactInfo?: {
    phone?: string
    email?: string
  }
  status: "active" | "inactive"
  createdAt: Date
  updatedAt: Date
}

// Type guards
export function isValidIncidentType(type: string): type is IncidentDocument["type"] {
  return ["theft", "vandalism", "fighting", "other"].includes(type)
}

export function isValidSeverity(severity: number): boolean {
  return severity >= 1 && severity <= 5 && Number.isInteger(severity)
}
