import { getDatabase } from "@/lib/mongodb"
import type { SecurityMeasureDocument, SecurityPersonnelDocument } from "@/lib/models/incident"
import { ObjectId } from "mongodb"

export class SecurityService {
  // Security Measures
  static async getSecurityMeasures(): Promise<SecurityMeasureDocument[]> {
    const db = await getDatabase()
    const collection = db.collection<SecurityMeasureDocument>("security_measures")
    return await collection.find({ status: "active" }).sort({ implementedDate: -1 }).toArray()
  }

  static async createSecurityMeasure(
    measureData: Omit<SecurityMeasureDocument, "_id" | "createdAt" | "updatedAt">,
  ): Promise<SecurityMeasureDocument> {
    const db = await getDatabase()
    const collection = db.collection<SecurityMeasureDocument>("security_measures")

    const measure: Omit<SecurityMeasureDocument, "_id"> = {
      ...measureData,
      implementedDate: new Date(measureData.implementedDate),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(measure)

    return {
      _id: result.insertedId,
      ...measure,
    }
  }

  // Security Personnel
  static async getSecurityPersonnel(): Promise<SecurityPersonnelDocument[]> {
    const db = await getDatabase()
    const collection = db.collection<SecurityPersonnelDocument>("security_personnel")
    return await collection.find({ status: "active" }).sort({ name: 1 }).toArray()
  }

  static async createSecurityPersonnel(
    personnelData: Omit<SecurityPersonnelDocument, "_id" | "createdAt" | "updatedAt">,
  ): Promise<SecurityPersonnelDocument> {
    const db = await getDatabase()
    const collection = db.collection<SecurityPersonnelDocument>("security_personnel")

    const personnel: Omit<SecurityPersonnelDocument, "_id"> = {
      ...personnelData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(personnel)

    return {
      _id: result.insertedId,
      ...personnel,
    }
  }

  static async updatePersonnelAssignment(id: string, assignedArea: string): Promise<SecurityPersonnelDocument | null> {
    const db = await getDatabase()
    const collection = db.collection<SecurityPersonnelDocument>("security_personnel")

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          assignedArea,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    )

    return result
  }
}
