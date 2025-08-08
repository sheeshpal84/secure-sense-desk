import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Key, Shield, Globe } from 'lucide-react'

interface StatCardProps {
  title: string
  value: number
  icon: React.ComponentType<{ className?: string }>
  delay?: number
}

const AnimatedStatCard = ({ title, value, icon: Icon, delay = 0 }: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true)
      const duration = 2000 // 2 seconds
      const steps = 60
      const increment = value / steps
      let current = 0
      
      const interval = setInterval(() => {
        current += increment
        if (current >= value) {
          setDisplayValue(value)
          setIsAnimating(false)
          clearInterval(interval)
        } else {
          setDisplayValue(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <Card className="bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className={`text-2xl font-bold text-primary ${isAnimating ? 'animate-pulse' : ''}`}>
              {displayValue.toLocaleString()}
            </p>
          </div>
          <div className="flex-shrink-0">
            <Icon className="h-8 w-8 text-primary/30" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AnimatedStatsCards() {
  const stats = [
    {
      title: "Total Passwords Checked",
      value: 4532,
      icon: Key,
      delay: 200
    },
    {
      title: "Total Breaches Detected", 
      value: 1274,
      icon: Shield,
      delay: 400
    },
    {
      title: "Phishing URLs Analyzed",
      value: 362,
      icon: Globe,
      delay: 600
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <AnimatedStatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          delay={stat.delay}
        />
      ))}
    </div>
  )
}