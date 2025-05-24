import Layout from "@/components/layout"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedCard } from "@/components/AnimatedCard"

export default function Recommendations() {
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Security Recommendations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatedCard delay={0.1}>
          <CardHeader>
            <CardTitle>General Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Continue awareness campaigns on personal property security</li>
              <li>Maintain restricted entry of non-resident students into hostels</li>
              <li>Install additional security cameras in high-risk areas</li>
              <li>Implement a campus-wide emergency notification system</li>
            </ul>
          </CardContent>
        </AnimatedCard>
        <AnimatedCard delay={0.2}>
          <CardHeader>
            <CardTitle>International Hostels Security</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Install biometric access control for all hostels</li>
              <li>Provide secure lockers in each room</li>
              <li>Increase security personnel during high-risk hours</li>
              <li>Multilingual security notices and awareness materials</li>
            </ul>
          </CardContent>
        </AnimatedCard>
        <AnimatedCard delay={0.3}>
          <CardHeader>
            <CardTitle>Mosque & Gym Security</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Install CCTV cameras at the Mosque entrance and prayer areas</li>
              <li>Provide secure storage shelves for shoes and belongings at the Mosque</li>
              <li>Expand locker facilities in the Gym</li>
              <li>Implement bag check policy at Gym entrance</li>
            </ul>
          </CardContent>
        </AnimatedCard>
        <AnimatedCard delay={0.4}>
          <CardHeader>
            <CardTitle>Campus Square & Academic Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Strengthen security presence in Campus Square during peak hours</li>
              <li>Install motion-sensor lighting in all walkways</li>
              <li>Provide secure storage in the Library for student belongings</li>
              <li>Regular security sweeps of Lecture Halls after classes</li>
            </ul>
          </CardContent>
        </AnimatedCard>
      </div>
    </Layout>
  )
}
