"use client"

import type React from "react"

import { useState } from "react"
import Layout from "@/components/layout"
import { AnimatedCard } from "@/components/AnimatedCard"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Upload, Database } from "lucide-react"

export default function DataInput() {
  const [formData, setFormData] = useState({
    type: "",
    date: "",
    location: "",
    description: "",
    severity: "",
    recovered: false,
  })

  const [csvData, setCsvData] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const campusLocations = [
    "Library",
    "Parking Lot",
    "Mosque",
    "Gym",
    "Block of Offices",
    "International M Hostel",
    "International F Hostel",
    "Class Area",
    "Lecture Hall",
    "Admin Building",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Incident data added successfully!")
        setFormData({
          type: "",
          date: "",
          location: "",
          description: "",
          severity: "",
          recovered: false,
        })
      }
    } catch (error) {
      alert("Error adding incident data")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCsvUpload = async () => {
    if (!csvData.trim()) {
      alert("Please enter CSV data")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/incidents/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ csvData }),
      })

      if (response.ok) {
        alert("CSV data uploaded successfully!")
        setCsvData("")
      }
    } catch (error) {
      alert("Error uploading CSV data")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Data Input & Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Single Incident Form */}
        <AnimatedCard delay={0.1} variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5 text-blue-600" />
              <span>Add New Incident</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="type">Incident Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theft">Theft</SelectItem>
                    <SelectItem value="vandalism">Vandalism</SelectItem>
                    <SelectItem value="fighting">Fighting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => setFormData({ ...formData, location: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {campusLocations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="severity">Severity (1-5)</Label>
                <Select
                  value={formData.severity}
                  onValueChange={(value) => setFormData({ ...formData, severity: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Minor</SelectItem>
                    <SelectItem value="2">2 - Low</SelectItem>
                    <SelectItem value="3">3 - Medium</SelectItem>
                    <SelectItem value="4">4 - High</SelectItem>
                    <SelectItem value="5">5 - Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Additional details about the incident..."
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="recovered"
                  checked={formData.recovered}
                  onChange={(e) => setFormData({ ...formData, recovered: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="recovered">Item recovered (if applicable)</Label>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Adding..." : "Add Incident"}
              </Button>
            </form>
          </CardContent>
        </AnimatedCard>

        {/* CSV Upload */}
        <AnimatedCard delay={0.2} variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5 text-green-600" />
              <span>Bulk CSV Upload</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="csvData">CSV Data</Label>
                <Textarea
                  value={csvData}
                  onChange={(e) => setCsvData(e.target.value)}
                  placeholder="Paste CSV data here or upload file content...
Format: type,date,location,severity,description,recovered
Example: theft,2024-01-15,Library,3,Phone stolen,false"
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>

              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">CSV Format:</p>
                <code className="bg-gray-100 p-2 rounded block">type,date,location,severity,description,recovered</code>
              </div>

              <Button onClick={handleCsvUpload} disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Uploading..." : "Upload CSV Data"}
              </Button>
            </div>
          </CardContent>
        </AnimatedCard>
      </div>

      {/* Data Management */}
      <div className="mt-8">
        <AnimatedCard delay={0.3} variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-purple-600" />
              <span>Data Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <span className="font-medium">Export Data</span>
                <span className="text-sm text-gray-500">Download current dataset</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <span className="font-medium">Refresh Analysis</span>
                <span className="text-sm text-gray-500">Recalculate predictions</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <span className="font-medium">Data Validation</span>
                <span className="text-sm text-gray-500">Check data integrity</span>
              </Button>
            </div>
          </CardContent>
        </AnimatedCard>
      </div>
    </Layout>
  )
}
