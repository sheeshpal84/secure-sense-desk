import { useState, useEffect } from "react"
import { Shield, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface SecurityAction {
  id: string
  name: string
  completed: boolean
  points: number
  category: string
}

const securityActions: SecurityAction[] = [
  { id: "password", name: "Password Strength Check", completed: false, points: 20, category: "Authentication" },
  { id: "email", name: "Email Breach Check", completed: false, points: 15, category: "Data Security" },
  { id: "phishing", name: "Phishing Detection Test", completed: false, points: 15, category: "Awareness" },
  { id: "checklist", name: "Security Checklist", completed: false, points: 25, category: "Best Practices" },
  { id: "2fa", name: "Two-Factor Authentication", completed: false, points: 25, category: "Authentication" }
]

export default function SecurityScore() {
  const [actions, setActions] = useState<SecurityAction[]>(securityActions)
  const [animatedScore, setAnimatedScore] = useState(0)

  // Calculate score
  const totalPossiblePoints = actions.reduce((sum, action) => sum + action.points, 0)
  const completedPoints = actions.filter(action => action.completed).reduce((sum, action) => sum + action.points, 0)
  const scorePercentage = Math.round((completedPoints / totalPossiblePoints) * 100)

  // Animate score changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (animatedScore < scorePercentage) {
        setAnimatedScore(prev => Math.min(prev + 1, scorePercentage))
      } else if (animatedScore > scorePercentage) {
        setAnimatedScore(prev => Math.max(prev - 1, scorePercentage))
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [animatedScore, scorePercentage])

  // Get security level
  const getSecurityLevel = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "success", icon: CheckCircle }
    if (score >= 60) return { label: "Good", color: "primary", icon: Shield }
    if (score >= 40) return { label: "Fair", color: "warning", icon: AlertTriangle }
    if (score >= 20) return { label: "At Risk", color: "destructive", icon: AlertTriangle }
    return { label: "Vulnerable", color: "destructive", icon: AlertTriangle }
  }

  const securityLevel = getSecurityLevel(animatedScore)
  const SecurityIcon = securityLevel.icon

  // Simulate completing actions (for demo purposes)
  const simulateAction = (actionId: string) => {
    setActions(prev => 
      prev.map(action => 
        action.id === actionId ? { ...action, completed: !action.completed } : action
      )
    )
  }

  // Get score color based on percentage
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success"
    if (score >= 60) return "text-primary"
    if (score >= 40) return "text-warning"
    return "text-destructive"
  }

  return (
    <Card className="bg-gradient-card border-border/50 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl ${
          animatedScore >= 80 ? 'bg-success/30' : 
          animatedScore >= 60 ? 'bg-primary/30' : 
          animatedScore >= 40 ? 'bg-warning/30' : 'bg-destructive/30'
        }`} />
      </div>

      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security Score
          </CardTitle>
          <TrendingUp className={`h-4 w-4 ${
            animatedScore > 50 ? 'text-success' : 'text-muted-foreground'
          }`} />
        </div>
      </CardHeader>

      <CardContent className="space-y-6 relative z-10">
        {/* Score Display */}
        <div className="text-center space-y-4">
          <div className="relative">
            <div className={`text-4xl sm:text-5xl font-bold ${getScoreColor(animatedScore)} transition-colors duration-500`}>
              {animatedScore}%
            </div>
            <div className="flex items-center justify-center gap-2 mt-2">
              <SecurityIcon className={`h-5 w-5 text-${securityLevel.color}`} />
              <Badge variant={securityLevel.color as any} className="text-xs">
                {securityLevel.label}
              </Badge>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress 
              value={animatedScore} 
              className="h-3 bg-muted/50"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Vulnerable</span>
              <span>Excellent</span>
            </div>
          </div>
        </div>

        {/* Action Points */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center justify-between">
            Security Actions
            <span className="text-xs text-muted-foreground">
              {completedPoints}/{totalPossiblePoints} points
            </span>
          </h4>
          
          <div className="space-y-2">
            {actions.slice(0, 3).map((action) => (
              <div
                key={action.id}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer hover:bg-muted/50 ${
                  action.completed 
                    ? 'bg-success/10 border-success/20' 
                    : 'bg-card border-border/50'
                }`}
                onClick={() => simulateAction(action.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    action.completed ? 'bg-success' : 'bg-muted-foreground'
                  }`} />
                  <div>
                    <div className={`text-sm font-medium ${
                      action.completed ? 'line-through text-muted-foreground' : ''
                    }`}>
                      {action.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {action.category}
                    </div>
                  </div>
                </div>
                
                <Badge variant={action.completed ? "default" : "secondary"} className="text-xs">
                  +{action.points}
                </Badge>
              </div>
            ))}
          </div>

          {actions.length > 3 && (
            <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-primary">
              View All Actions ({actions.length - 3} more)
            </Button>
          )}
        </div>

        {/* Recommendation */}
        <div className="text-center">
          {animatedScore < 60 ? (
            <p className="text-xs text-muted-foreground leading-relaxed">
              💡 Complete more security actions to improve your score and protect your digital life
            </p>
          ) : (
            <p className="text-xs text-success leading-relaxed">
              🎉 Great security posture! Keep up the excellent work
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}