"use client"

import { motion } from 'framer-motion'
import { Card, CardProps } from '@/components/ui/card'

interface AnimatedCardProps extends CardProps {
  delay?: number
}

export function AnimatedCard({ children, className, delay = 0, ...props }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className={`bg-white/90 shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`} {...props}>
        {children}
      </Card>
    </motion.div>
  )
}
