import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface OptimizedPersonnel {
  id: number
  name: string
  shift: "day" | "night"
  assignedArea: string
}

interface OptimizedAllocationProps {
  personnel: OptimizedPersonnel[]
}

export function OptimizedAllocation({ personnel }: OptimizedAllocationProps) {
  // Ensure we have personnel assigned to all the key locations
  const optimizedPersonnel = [
    { id: 1, name: "Ahmed Hassan", shift: "day" as const, assignedArea: "Class Area" },
    { id: 2, name: "Fatima Al-Zahra", shift: "night" as const, assignedArea: "International M Hostel" },
    { id: 3, name: "Omar Abdullah", shift: "day" as const, assignedArea: "Mosque" },
    { id: 4, name: "Aisha Ibrahim", shift: "night" as const, assignedArea: "Gym" },
    { id: 5, name: "Yusuf Mahmoud", shift: "day" as const, assignedArea: "Block of Offices" },
    { id: 6, name: "Khadija Salim", shift: "night" as const, assignedArea: "International F Hostel" },
  ]

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
                <TableCell>{person.assignedArea}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </>
  )
}
