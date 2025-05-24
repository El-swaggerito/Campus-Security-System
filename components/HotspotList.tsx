import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Hotspot {
  location: string
  incidentCount: number
  riskScore: number
}

interface HotspotListProps {
  hotspots: Hotspot[]
}

export function HotspotList({ hotspots }: HotspotListProps) {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-gray-900">Incident Hotspots</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {hotspots.map((hotspot, index) => (
            <li key={index} className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0 last:pb-0">
              <span className="text-gray-700">{hotspot.location}</span>
              <div className="text-sm text-gray-500">
                <span>Incidents: <span className="font-medium text-blue-600">{hotspot.incidentCount}</span></span>
                <span className="ml-2">Risk Score: <span className="font-medium text-red-600">{hotspot.riskScore.toFixed(2)}</span></span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </>
  )
}
