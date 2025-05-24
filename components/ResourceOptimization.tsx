import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface OptimizedPersonnel {
  id: number;
  name: string;
  shift: 'day' | 'night';
  area: string;
}

interface ResourceOptimizationProps {
  optimizedPersonnel: OptimizedPersonnel[];
}

export function ResourceOptimization({ optimizedPersonnel }: ResourceOptimizationProps) {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-gray-900">Optimized Resource Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Shift</TableHead>
              <TableHead>Assigned Area</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {optimizedPersonnel.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.shift}</TableCell>
                <TableCell>{person.area}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </>
  )
}
