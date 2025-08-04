import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Shield, Lock, Eye, Wifi, Mail } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SecurityTip {
  id: string
  icon: any
  title: string
  description: string
  color: string
}

const securityTips: SecurityTip[] = [
  {
    id: "1",
    icon: Lock,
    title: "Enable Two-Factor Authentication",
    description: "Add an extra layer of security to all your important accounts",
    color: "text-primary"
  },
  {
    id: "2", 
    icon: Eye,
    title: "Avoid Clicking Unknown Links",
    description: "Always verify the sender before clicking links in emails or messages",
    color: "text-warning"
  },
  {
    id: "3",
    icon: Shield,
    title: "Use Strong, Unique Passwords",
    description: "Create complex passwords and use different ones for each account",
    color: "text-success"
  },
  {
    id: "4",
    icon: Wifi,
    title: "Be Cautious on Public Wi-Fi",
    description: "Avoid accessing sensitive information on unsecured networks",
    color: "text-destructive"
  },
  {
    id: "5",
    icon: Mail,
    title: "Verify Email Senders",
    description: "Check sender authenticity before downloading attachments",
    color: "text-accent"
  }
]

export default function SecurityTipsBanner() {
  const [currentTip, setCurrentTip] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % securityTips.length)
    }, 5000) // Change tip every 5 seconds

    return () => clearInterval(interval)
  }, [isPlaying])

  const nextTip = () => {
    setCurrentTip(prev => (prev + 1) % securityTips.length)
  }

  const prevTip = () => {
    setCurrentTip(prev => (prev - 1 + securityTips.length) % securityTips.length)
  }

  const goToTip = (index: number) => {
    setCurrentTip(index)
  }

  const tip = securityTips[currentTip]

  return (
    <Card className="bg-gradient-cyber border-primary/20 relative overflow-hidden group">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-pulse"></div>
      </div>

      <div 
        className="flex items-center justify-between p-4 relative z-10 cursor-pointer"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        {/* Left Arrow - Hidden on mobile */}
        <Button
          variant="ghost"
          size="sm"
          onClick={prevTip}
          className="h-8 w-8 p-0 text-primary-foreground hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Tip Content */}
        <div className="flex-1 flex items-center gap-4 px-4">
          <div className="flex-shrink-0">
            <tip.icon className={`h-6 w-6 ${tip.color}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-primary-foreground text-sm sm:text-base truncate">
                💡 Security Tip: {tip.title}
              </h3>
            </div>
            <p className="text-primary-foreground/80 text-xs sm:text-sm leading-relaxed">
              {tip.description}
            </p>
          </div>
        </div>

        {/* Right Arrow - Hidden on mobile */}
        <Button
          variant="ghost"
          size="sm"
          onClick={nextTip}
          className="h-8 w-8 p-0 text-primary-foreground hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
        {securityTips.map((_, index) => (
          <button
            key={index}
            onClick={() => goToTip(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentTip
                ? 'bg-primary-foreground scale-125'
                : 'bg-primary-foreground/40 hover:bg-primary-foreground/60'
            }`}
          />
        ))}
      </div>

      {/* Play/Pause Indicator */}
      <div className="absolute top-2 right-2">
        <div className={`w-2 h-2 rounded-full ${
          isPlaying ? 'bg-success animate-pulse' : 'bg-muted-foreground'
        }`} />
      </div>
    </Card>
  )
}