import { getDatabase } from "@/lib/mongodb"
import type { IncidentDocument } from "@/lib/models/incident"
import { ObjectId } from "mongodb"

export class IncidentService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<IncidentDocument>("incidents")
  }

  // Create a new incident
  static async createIncident(
    incidentData: Omit<IncidentDocument, "_id" | "createdAt" | "updatedAt">,
  ): Promise<IncidentDocument> {
    const collection = await this.getCollection()

    const incident: Omit<IncidentDocument, "_id"> = {
      ...incidentData,
      date: new Date(incidentData.date),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(incident)

    return {
      _id: result.insertedId,
      ...incident,
    }
  }

  // Get all incidents
  static async getAllIncidents(): Promise<IncidentDocument[]> {
    const collection = await this.getCollection()
    return await collection.find({}).sort({ date: -1 }).toArray()
  }

  // Get incidents by date range
  static async getIncidentsByDateRange(startDate: Date, endDate: Date): Promise<IncidentDocument[]> {
    const collection = await this.getCollection()
    return await collection
      .find({
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .sort({ date: -1 })
      .toArray()
  }

  // Get incidents by location
  static async getIncidentsByLocation(location: string): Promise<IncidentDocument[]> {
    const collection = await this.getCollection()
    return await collection.find({ location }).sort({ date: -1 }).toArray()
  }

  // Get incidents by type
  static async getIncidentsByType(type: IncidentDocument["type"]): Promise<IncidentDocument[]> {
    const collection = await this.getCollection()
    return await collection.find({ type }).sort({ date: -1 }).toArray()
  }

  // Update incident
  static async updateIncident(id: string, updateData: Partial<IncidentDocument>): Promise<IncidentDocument | null> {
    const collection = await this.getCollection()

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    )

    return result
  }

  // Delete incident
  static async deleteIncident(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount === 1
  }

  // Get incident statistics
  static async getIncidentStats() {
    const collection = await this.getCollection()

    const [totalCount, typeStats, locationStats, monthlyStats] = await Promise.all([
      // Total count
      collection.countDocuments(),

      // By type
      collection
        .aggregate([{ $group: { _id: "$type", count: { $sum: 1 } } }])
        .toArray(),

      // By location
      collection
        .aggregate([{ $group: { _id: "$location", count: { $sum: 1 } } }, { $sort: { count: -1 } }])
        .toArray(),

      // Monthly trends
      collection
        .aggregate([
          {
            $group: {
              _id: {
                year: { $year: "$date" },
                month: { $month: "$date" },
                type: "$type",
              },
              count: { $sum: 1 },
            },
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } },
        ])
        .toArray(),
    ])

    return {
      total: totalCount,
      byType: typeStats,
      byLocation: locationStats,
      monthly: monthlyStats,
    }
  }

  // Bulk insert incidents (for CSV import)
  static async bulkCreateIncidents(
    incidents: Omit<IncidentDocument, "_id" | "createdAt" | "updatedAt">[],
  ): Promise<number> {
    const collection = await this.getCollection()

    const incidentsWithTimestamps = incidents.map((incident) => ({
      ...incident,
      date: new Date(incident.date),
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    const result = await collection.insertMany(incidentsWithTimestamps)
    return result.insertedCount
  }
}
