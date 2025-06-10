import { IncidentService } from "@/lib/services/incident-service"
import { SecurityService } from "@/lib/services/security-service"

async function seedDatabase() {
  try {
    console.log("🚀 Starting database seeding...")

    // Sample incidents data
    const sampleIncidents = [
      {
        type: "theft" as const,
        date: new Date("2024-01-15"),
        location: "Library",
        description: "Phone stolen from study table",
        severity: 3,
        recovered: true,
        reportedBy: "Student",
        status: "resolved" as const,
      },
      {
        type: "theft" as const,
        date: new Date("2024-02-10"),
        location: "Gym",
        description: "Wallet missing from locker",
        severity: 2,
        recovered: false,
        reportedBy: "Student",
        status: "investigating" as const,
      },
      {
        type: "theft" as const,
        date: new Date("2024-03-05"),
        location: "Mosque",
        description: "Shoes stolen during prayer time",
        severity: 1,
        recovered: false,
        reportedBy: "Student",
        status: "open" as const,
      },
      {
        type: "theft" as const,
        date: new Date("2024-01-25"),
        location: "International M Hostel",
        description: "Laptop stolen from room",
        severity: 4,
        recovered: false,
        reportedBy: "Student",
        status: "investigating" as const,
      },
      {
        type: "theft" as const,
        date: new Date("2024-02-20"),
        location: "Class Area",
        description: "Backpack stolen during class",
        severity: 3,
        recovered: true,
        reportedBy: "Faculty",
        status: "resolved" as const,
      },
      {
        type: "theft" as const,
        date: new Date("2024-03-12"),
        location: "International F Hostel",
        description: "Money stolen from room",
        severity: 3,
        recovered: false,
        reportedBy: "Student",
        status: "open" as const,
      },
      {
        type: "theft" as const,
        date: new Date("2024-08-15"),
        location: "Block of Offices",
        description: "Office supplies missing",
        severity: 2,
        recovered: false,
        reportedBy: "Staff",
        status: "investigating" as const,
      },
      {
        type: "theft" as const,
        date: new Date("2024-09-10"),
        location: "Parking Lot",
        description: "Car accessories stolen",
        severity: 2,
        recovered: true,
        reportedBy: "Student",
        status: "resolved" as const,
      },
    ]

    // Sample security measures
    const sampleMeasures = [
      {
        description: "Increased awareness campaigns",
        implementedDate: new Date("2024-01-01"),
        location: "Campus-wide",
        effectiveness: 4,
        status: "active" as const,
      },
      {
        description: "Restricted entry of non-resident students into hostels",
        implementedDate: new Date("2024-01-15"),
        location: "International Hostels",
        effectiveness: 5,
        status: "active" as const,
      },
      {
        description: "Enhanced security monitoring in the Mosque",
        implementedDate: new Date("2024-02-01"),
        location: "Mosque",
        effectiveness: 5,
        status: "active" as const,
      },
      {
        description: "Installed lockers in the Gym for secure storage",
        implementedDate: new Date("2024-02-15"),
        location: "Gym",
        effectiveness: 4,
        status: "active" as const,
      },
      {
        description: "Implemented access control in the Block of Offices",
        implementedDate: new Date("2024-03-01"),
        location: "Block of Offices",
        effectiveness: 4,
        status: "active" as const,
      },
      {
        description: "Increased patrols around International Hostels",
        implementedDate: new Date("2024-03-10"),
        location: "International Hostels",
        effectiveness: 4,
        status: "active" as const,
      },
      {
        description: "Added security cameras in Campus Square",
        implementedDate: new Date("2024-04-01"),
        location: "Campus Square",
        effectiveness: 5,
        status: "active" as const,
      },
      {
        description: "Improved lighting in Parking Lot and walkways",
        implementedDate: new Date("2024-04-15"),
        location: "Parking Lot",
        effectiveness: 3,
        status: "active" as const,
      },
    ]

    // Sample security personnel
    const samplePersonnel = [
      {
        name: "Ahmed Hassan",
        shift: "day" as const,
        assignedArea: "Class Area",
        contactInfo: { phone: "+1234567890", email: "ahmed@alhikmah.edu" },
        status: "active" as const,
      },
      {
        name: "Fatima Al-Zahra",
        shift: "night" as const,
        assignedArea: "International M Hostel",
        contactInfo: { phone: "+1234567891", email: "fatima@alhikmah.edu" },
        status: "active" as const,
      },
      {
        name: "Omar Abdullah",
        shift: "day" as const,
        assignedArea: "Mosque",
        contactInfo: { phone: "+1234567892", email: "omar@alhikmah.edu" },
        status: "active" as const,
      },
      {
        name: "Aisha Ibrahim",
        shift: "night" as const,
        assignedArea: "Gym",
        contactInfo: { phone: "+1234567893", email: "aisha@alhikmah.edu" },
        status: "active" as const,
      },
      {
        name: "Yusuf Mahmoud",
        shift: "day" as const,
        assignedArea: "Block of Offices",
        contactInfo: { phone: "+1234567894", email: "yusuf@alhikmah.edu" },
        status: "active" as const,
      },
      {
        name: "Khadija Salim",
        shift: "night" as const,
        assignedArea: "International F Hostel",
        contactInfo: { phone: "+1234567895", email: "khadija@alhikmah.edu" },
        status: "active" as const,
      },
    ]

    // Insert sample data
    console.log("📊 Inserting incidents...")
    let incidentCount = 0
    for (const incident of sampleIncidents) {
      await IncidentService.createIncident(incident)
      incidentCount++
      console.log(`  ✅ Incident ${incidentCount}/${sampleIncidents.length} created`)
    }

    console.log("🛡️ Inserting security measures...")
    let measureCount = 0
    for (const measure of sampleMeasures) {
      await SecurityService.createSecurityMeasure(measure)
      measureCount++
      console.log(`  ✅ Security measure ${measureCount}/${sampleMeasures.length} created`)
    }

    console.log("👮 Inserting security personnel...")
    let personnelCount = 0
    for (const personnel of samplePersonnel) {
      await SecurityService.createSecurityPersonnel(personnel)
      personnelCount++
      console.log(`  ✅ Personnel ${personnelCount}/${samplePersonnel.length} created`)
    }

    console.log("\n🎉 Database seeding completed successfully!")
    console.log(`📈 Summary:`)
    console.log(`   - ${incidentCount} incidents created`)
    console.log(`   - ${measureCount} security measures created`)
    console.log(`   - ${personnelCount} security personnel created`)

    // Test the connection by fetching some data
    console.log("\n🔍 Testing database connection...")
    const stats = await IncidentService.getIncidentStats()
    console.log(`   - Total incidents in database: ${stats.total}`)
    console.log(`   - Database connection: ✅ Working`)
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    if (error instanceof Error) {
      console.error("Error details:", error.message)
    }
  }
}

// Run the seeding function
seedDatabase()
