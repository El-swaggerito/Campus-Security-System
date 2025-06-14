"use client"
import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { Menu, X, Shield, BarChart3, AlertTriangle, FileText, Database } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

const menuItems = [
  { href: "/", label: "Overview", icon: BarChart3 },
  { href: "/theft-details", label: "Theft Analysis", icon: AlertTriangle },
  { href: "/recommendations", label: "Recommendations", icon: FileText },
  { href: "/data-input", label: "Data Input", icon: Database },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <Link href="/" className="flex items-center">
                  <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Al-Hikmah Campus Security
                  </span>
                </Link>
                <span className="text-sm text-slate-500 font-medium">Prediction & Analysis System</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-all duration-200 font-medium"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 bg-white/95 backdrop-blur-xl shadow-xl border-b border-slate-200 md:hidden"
          >
            <div className="container mx-auto px-4 py-6">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 py-3 text-slate-700 hover:text-slate-900 transition-colors duration-200"
                    onClick={toggleMenu}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-slate-600" />
              <span className="text-slate-600 font-medium">Al-Hikmah University</span>
            </div>
            <div className="text-sm text-slate-500">Campus Security Analysis System © 2024</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
