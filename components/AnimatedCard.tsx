"use client"

import { motion } from "framer-motion"
import { Card, type CardProps } from "@/components/ui/card"

interface AnimatedCardProps extends CardProps {
  delay?: number
  variant?: "default" | "gradient" | "elevated"
}

export function AnimatedCard({ children, className, delay = 0, variant = "default", ...props }: AnimatedCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "gradient":
        return "bg-gradient-to-br from-white to-slate-50 border-slate-200/60 shadow-xl hover:shadow-2xl"
      case "elevated":
        return "bg-white border-slate-200/60 shadow-lg hover:shadow-xl hover:-translate-y-1"
      default:
        return "bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      <Card className={`${getVariantStyles()} transition-all duration-300 ${className}`} {...props}>
        {children}
      </Card>
    </motion.div>
  )
}
