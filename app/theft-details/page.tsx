import Layout from "@/components/layout"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedCard } from "@/components/AnimatedCard"

export default function TheftDetails() {
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Theft Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatedCard delay={0.1}>
          <CardHeader>
            <CardTitle>Theft Incidents (Jan - Mar 2024)</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total reported thefts: 15</p>
            <p>Phones tracked and recovered: 8</p>
            <p>Police could not identify students involved</p>
          </CardContent>
        </AnimatedCard>
        <AnimatedCard delay={0.2}>
          <CardHeader>
            <CardTitle>Theft Incidents (Aug - Dec 2024)</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total reported thefts: 5</p>
            <p>Significant reduction due to awareness campaigns</p>
          </CardContent>
        </AnimatedCard>
        <AnimatedCard delay={0.3}>
          <CardHeader>
            <CardTitle>High-Risk Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Campus Square</li>
              <li>Student Center</li>
              <li>Sports Complex</li>
              <li>Lecture Hall</li>
              <li>International M Hostel</li>
              <li>International F Hostel</li>
              <li>Mosque</li>
              <li>Gym</li>
              <li>Block of Offices</li>
            </ul>
          </CardContent>
        </AnimatedCard>
        <AnimatedCard delay={0.4}>
          <CardHeader>
            <CardTitle>Theft Prevention Measures</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Enhanced security monitoring in the Mosque</li>
              <li>Installed lockers in the Gym for secure storage</li>
              <li>Implemented access control in the Block of Offices</li>
              <li>Increased patrols around International Hostels</li>
              <li>Added security cameras in Campus Square</li>
              <li>Regular security checks in high-risk areas</li>
            </ul>
          </CardContent>
        </AnimatedCard>
      </div>
    </Layout>
  )
}
