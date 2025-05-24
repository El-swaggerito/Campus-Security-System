import Layout from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function FightIncidents() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Fight Incidents</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Fight Incidents (Jan - Mar 2024)</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total reported fights: 2</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fight Incidents (Aug - Dec 2024)</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total reported fights: 0</p>
            <p>Fighting incidents were completely eliminated</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
