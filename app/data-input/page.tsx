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
import { Plus, Upload, Database, CheckCircle, XCircle, AlertCircle, Info } from "lucide-react"

interface FormData {
  type: string
  date: string
  location: string
  description: string
  severity: string
  recovered: boolean
  reportedBy: string
}

interface UploadStatus {
  type: "success" | "error" | "info" | "warning"
  message: string
  details?: string[]
}

export default function DataInput() {
  const [formData, setFormData] = useState<FormData>({
    type: "",
    date: "",
    location: "",
    description: "",
    severity: "",
    recovered: false,
    reportedBy: "",
  })

  const [csvData, setCsvData] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null)

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

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.type || !formData.date || !formData.location || !formData.severity) {
      setUploadStatus({
        type: "error",
        message: "Please fill in all required fields (Type, Date, Location, Severity)",
      })
      return
    }

    setIsSubmitting(true)
    setUploadStatus(null)

    try {
      const response = await fetch("/api/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: formData.type,
          date: formData.date,
          location: formData.location,
          description: formData.description || null,
          severity: Number.parseInt(formData.severity),
          recovered: formData.recovered,
          reportedBy: formData.reportedBy || "Manual Entry",
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setUploadStatus({
          type: "success",
          message: `✅ Incident added successfully! ID: ${result.incident?.id}`,
        })

        // Trigger update in other tabs/windows
        localStorage.setItem("incident-updated", Date.now().toString())
        setTimeout(() => localStorage.removeItem("incident-updated"), 1000)

        // Reset form
        setFormData({
          type: "",
          date: "",
          location: "",
          description: "",
          severity: "",
          recovered: false,
          reportedBy: "",
        })
      } else {
        setUploadStatus({
          type: "error",
          message: `❌ Error: ${result.error || "Failed to add incident"}`,
        })
      }
    } catch (error) {
      console.error("Submit error:", error)
      setUploadStatus({
        type: "error",
        message: `❌ Network error: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCsvUpload = async () => {
    if (!csvData.trim()) {
      setUploadStatus({
        type: "error",
        message: "❌ Please enter CSV data before uploading",
      })
      return
    }

    setIsSubmitting(true)
    setUploadStatus(null)

    try {
      const response = await fetch("/api/incidents/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ csvData: csvData.trim() }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        const details = []
        if (result.warnings && result.warnings.length > 0) {
          details.push("Warnings:", ...result.warnings)
        }

        setUploadStatus({
          type: "success",
          message: `✅ ${result.message} (${result.insertedCount} incidents added)`,
          details: details.length > 0 ? details : undefined,
        })

        // Trigger update in other tabs/windows
        localStorage.setItem("incident-updated", Date.now().toString())
        setTimeout(() => localStorage.removeItem("incident-updated"), 1000)

        setCsvData("")
      } else {
        const details = []
        if (result.errors && result.errors.length > 0) {
          details.push("Errors:", ...result.errors.slice(0, 5)) // Show first 5 errors
          if (result.errors.length > 5) {
            details.push(`... and ${result.errors.length - 5} more errors`)
          }
        }

        setUploadStatus({
          type: "error",
          message: `❌ Error: ${result.error || "Failed to upload CSV data"}`,
          details: details.length > 0 ? details : undefined,
        })
      }
    } catch (error) {
      console.error("CSV upload error:", error)
      setUploadStatus({
        type: "error",
        message: `❌ Network error: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const StatusAlert = ({ status }: { status: UploadStatus }) => {
    const getIcon = () => {
      switch (status.type) {
        case "success":
          return <CheckCircle className="h-5 w-5" />
        case "error":
          return <XCircle className="h-5 w-5" />
        case "warning":
          return <AlertCircle className="h-5 w-5" />
        default:
          return <Info className="h-5 w-5" />
      }
    }

    const getBgColor = () => {
      switch (status.type) {
        case "success":
          return "bg-green-50 border-green-200"
        case "error":
          return "bg-red-50 border-red-200"
        case "warning":
          return "bg-yellow-50 border-yellow-200"
        default:
          return "bg-blue-50 border-blue-200"
      }
    }

    const getTextColor = () => {
      switch (status.type) {
        case "success":
          return "text-green-800"
        case "error":
          return "text-red-800"
        case "warning":
          return "text-yellow-800"
        default:
          return "text-blue-800"
      }
    }

    return (
      <div className={`p-4 rounded-lg border ${getBgColor()} mb-4`}>
        <div className="flex items-start space-x-2">
          {getIcon()}
          <div className="flex-1">
            <p className={`font-medium ${getTextColor()}`}>{status.message}</p>
            {status.details && status.details.length > 0 && (
              <div className="mt-2 text-sm">
                {status.details.map((detail, index) => (
                  <p key={index} className={`${getTextColor()} opacity-80`}>
                    {detail}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Data Input & Management</h1>

      {uploadStatus && <StatusAlert status={uploadStatus} />}

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
                <Label htmlFor="type">Incident Type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theft">Theft/Burglary</SelectItem>
                    <SelectItem value="vandalism">Vandalism/Damage</SelectItem>
                    <SelectItem value="fighting">Fighting/Assault</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
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
                <Label htmlFor="severity">Severity (1-5) *</Label>
                <Select value={formData.severity} onValueChange={(value) => handleInputChange("severity", value)}>
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
                <Label htmlFor="reportedBy">Reported By</Label>
                <Input
                  value={formData.reportedBy}
                  onChange={(e) => handleInputChange("reportedBy", e.target.value)}
                  placeholder="e.g., Student, Faculty, Staff"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Additional details about the incident..."
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="recovered"
                  checked={formData.recovered}
                  onChange={(e) => handleInputChange("recovered", e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="recovered">Item recovered (if applicable)</Label>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700">
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Adding...</span>
                  </div>
                ) : (
                  "Add Incident"
                )}
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
                  placeholder="Paste CSV data here...

Format: type,date,location,severity,description,recovered,reportedby
Example: theft,2024-01-15,Library,3,Phone stolen,false,Student"
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>

              <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded">
                <p className="font-medium mb-2">CSV Format & Supported Types:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="font-medium">Incident Types:</p>
                    <ul className="space-y-1">
                      <li>
                        • <strong>Theft:</strong> theft, burglary, robbery
                      </li>
                      <li>
                        • <strong>Fighting:</strong> assault, violence, attack
                      </li>
                      <li>
                        • <strong>Vandalism:</strong> damage, destruction
                      </li>
                      <li>
                        • <strong>Other:</strong> anything else
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Format:</p>
                    <ul className="space-y-1">
                      <li>
                        • <strong>Date:</strong> YYYY-MM-DD
                      </li>
                      <li>
                        • <strong>Severity:</strong> 1-5 (optional, defaults to 3)
                      </li>
                      <li>
                        • <strong>Recovered:</strong> true/false/yes/no
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCsvUpload}
                disabled={isSubmitting || !csvData.trim()}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Uploading...</span>
                  </div>
                ) : (
                  "Upload CSV Data"
                )}
              </Button>
            </div>
          </CardContent>
        </AnimatedCard>
      </div>

      {/* Sample CSV Data */}
      <div className="mt-8">
        <AnimatedCard delay={0.3} variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-purple-600" />
              <span>Sample CSV Data</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              Copy and paste this sample data to test the CSV upload functionality:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <code className="text-sm font-mono whitespace-pre-wrap">
                {`type,date,location,severity,description,recovered,reportedby
Theft,2024-01-10,Library,3,Laptop stolen from study area,false,Student
Burglary,2024-01-15,Gym,2,Water bottle missing from locker,true,Student
Vandalism,2024-01-20,Parking Lot,4,Car window broken,false,Staff
Assault,2024-01-25,Mosque,1,Minor altercation,false,Student
Fighting,2024-02-01,Class Area,3,Argument escalated to physical fight,false,Faculty`}
              </code>
            </div>
            <Button
              onClick={() =>
                setCsvData(`type,date,location,severity,description,recovered,reportedby
Theft,2024-01-10,Library,3,Laptop stolen from study area,false,Student
Burglary,2024-01-15,Gym,2,Water bottle missing from locker,true,Student
Vandalism,2024-01-20,Parking Lot,4,Car window broken,false,Staff
Assault,2024-01-25,Mosque,1,Minor altercation,false,Student
Fighting,2024-02-01,Class Area,3,Argument escalated to physical fight,false,Faculty`)
              }
              variant="outline"
              className="mt-3"
            >
              Copy Sample Data to Form
            </Button>
          </CardContent>
        </AnimatedCard>
      </div>
    </Layout>
  )
}
