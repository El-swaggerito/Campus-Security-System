import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, BarChart3, MapPin, Users, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center text-center">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>

          <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-6 leading-tight">
            Al-Hikmah Campus Security
            <br />
            <span className="text-5xl">Analysis System</span>
          </h1>

          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Advanced predictive analytics and machine learning algorithms ensuring a safer environment for our campus
            community through data-driven security insights.
          </p>

          <Link href="/overview">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              View Security Dashboard
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-3 bg-blue-100 rounded-xl w-fit mb-4">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Predictive Analytics</h3>
            <p className="text-slate-600">
              Machine learning algorithms analyze patterns to predict security hotspots and prevent incidents.
            </p>
          </div>

          <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-3 bg-green-100 rounded-xl w-fit mb-4">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Real-time Monitoring</h3>
            <p className="text-slate-600">
              Live tracking of campus security status with interactive heatmaps and location-based insights.
            </p>
          </div>

          <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-3 bg-purple-100 rounded-xl w-fit mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Resource Optimization</h3>
            <p className="text-slate-600">
              Intelligent allocation of security personnel based on risk assessment and incident patterns.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
