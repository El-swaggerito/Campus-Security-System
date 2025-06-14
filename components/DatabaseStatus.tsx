"use client"

import { useEffect, useState } from "react"
import { AnimatedCard } from "@/components/AnimatedCard"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, RefreshCw, Database, AlertTriangle } from "lucide-react"

interface ConnectionStatus {
  success: boolean
  connection: {
    success: boolean
    count?: number
    error?: string
  }
  tables: Array<{
    table: string
    exists: boolean
    count?: number
    error?: string
  }>
  timestamp: string
}

export function DatabaseStatus() {
  const [status, setStatus] = useState<ConnectionStatus | null>(null)
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/test-connection")
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error("Failed to test connection:", error)
      setStatus({
        success: false,
        connection: { success: false, error: "Failed to reach API" },
        tables: [],
        timestamp: new Date().toISOString(),
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <AnimatedCard variant="elevated">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-blue-600" />
            <span>Database Connection Status</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={testConnection}
            disabled={loading}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span>Test</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-slate-600">Testing connection...</span>
          </div>
        ) : status ? (
          <div className="space-y-4">
            {/* Overall Status */}
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
              {status.success ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <div>
                <p className="font-medium">{status.success ? "✅ Database Connected" : "❌ Connection Failed"}</p>
                <p className="text-sm text-slate-600">Last checked: {new Date(status.timestamp).toLocaleString()}</p>
              </div>
            </div>

            {/* Connection Details */}
            {status.connection.success && status.connection.count !== undefined && (
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-800 font-medium">📊 Found {status.connection.count} incidents in database</p>
              </div>
            )}

            {status.connection.error && (
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-800 font-medium">Connection Error:</p>
                <p className="text-red-700 text-sm mt-1">{status.connection.error}</p>
              </div>
            )}

            {/* Table Status */}
            <div className="space-y-2">
              <h4 className="font-medium text-slate-800">Database Tables:</h4>
              {status.tables.map((table) => (
                <div key={table.table} className="flex items-center justify-between p-2 rounded border">
                  <div className="flex items-center space-x-2">
                    {table.exists ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="font-mono text-sm">{table.table}</span>
                  </div>
                  <div className="text-sm text-slate-600">
                    {table.exists ? (
                      <span className="text-green-600">
                        {table.count !== undefined ? `${table.count} records` : "Ready"}
                      </span>
                    ) : (
                      <span className="text-red-600">Missing</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Setup Instructions */}
            {!status.success && (
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Setup Required</p>
                    <p className="text-yellow-700 text-sm mt-1">
                      Please run the SQL scripts in your Supabase dashboard:
                    </p>
                    <ol className="list-decimal list-inside text-sm text-yellow-700 mt-2 space-y-1">
                      <li>Go to your Supabase project → SQL Editor</li>
                      <li>Run the create-tables.sql script</li>
                      <li>Run the seed-data.sql script</li>
                      <li>Refresh this page to test again</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4 text-slate-600">Click "Test" to check database connection</div>
        )}
      </CardContent>
    </AnimatedCard>
  )
}
