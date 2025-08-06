import { useState } from "react"
import { CheckSquare, Square, Shield, Lock, Globe, Smartphone, Eye, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "./BackButton"

interface ChecklistItem {
  id: string
  title: string
  description: string
  category: string
  icon: any
  priority: "high" | "medium" | "low"
}

const securityItems: ChecklistItem[] = [
  {
    id: "2fa",
    title: "Enable Two-Factor Authentication",
    description: "Add an extra layer of security to your important accounts",
    category: "Authentication",
    icon: Lock,
    priority: "high"
  },
  {
    id: "strong-passwords",
    title: "Use Strong, Unique Passwords",
    description: "Create complex passwords and use different ones for each account",
    category: "Passwords",
    icon: Shield,
    priority: "high"
  },
  {
    id: "password-manager",
    title: "Install a Password Manager",
    description: "Use tools like Bitwarden, 1Password, or LastPass to manage passwords",
    category: "Passwords",
    icon: Lock,
    priority: "high"
  },
  {
    id: "software-updates",
    title: "Keep Software Updated",
    description: "Regularly update your operating system, browsers, and apps",
    category: "System Security",
    icon: Smartphone,
    priority: "high"
  },
  {
    id: "secure-wifi",
    title: "Use Secure Wi-Fi Networks",
    description: "Avoid public Wi-Fi for sensitive activities, use VPN when necessary",
    category: "Network Security",
    icon: Globe,
    priority: "medium"
  },
  {
    id: "email-verification",
    title: "Verify Email Senders",
    description: "Check sender authenticity before clicking links or downloading attachments",
    category: "Email Security",
    icon: Eye,
    priority: "high"
  },
  {
    id: "backup-data",
    title: "Regular Data Backups",
    description: "Backup important files to secure cloud storage or external drives",
    category: "Data Protection",
    icon: Shield,
    priority: "medium"
  },
  {
    id: "privacy-settings",
    title: "Review Privacy Settings",
    description: "Check and update privacy settings on social media and online accounts",
    category: "Privacy",
    icon: Users,
    priority: "medium"
  },
  {
    id: "antivirus",
    title: "Use Antivirus Software",
    description: "Install reputable antivirus software and keep it updated",
    category: "System Security",
    icon: Shield,
    priority: "medium"
  },
  {
    id: "secure-browsing",
    title: "Practice Secure Browsing",
    description: "Look for HTTPS, avoid suspicious websites, use secure browsers",
    category: "Web Security",
    icon: Globe,
    priority: "medium"
  }
]

const categories = Array.from(new Set(securityItems.map(item => item.category)))

export default function SecurityChecklist() {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set())

  const toggleItem = (itemId: string) => {
    const newCompleted = new Set(completedItems)
    if (newCompleted.has(itemId)) {
      newCompleted.delete(itemId)
    } else {
      newCompleted.add(itemId)
    }
    setCompletedItems(newCompleted)
  }

  const completionPercentage = (completedItems.size / securityItems.length) * 100

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive"
      case "medium": return "warning"
      case "low": return "secondary"
      default: return "secondary"
    }
  }

  const getPriorityIcon = (category: string) => {
    const item = securityItems.find(item => item.category === category)
    return item?.icon || Shield
  }

  return (
    <div className="space-y-8 p-4">
      <BackButton />
      
      <div className="flex items-center gap-3 pt-6 pb-4 px-2">
        <CheckSquare className="h-6 w-6 text-primary flex-shrink-0" />
        <h1 className="text-2xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
          Security Checklist
        </h1>
      </div>

      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Security Progress</CardTitle>
          <CardDescription>
            Complete these security practices to improve your digital safety
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Completion Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedItems.size} of {securityItems.length} completed
              </span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
            <div className="text-center pt-2">
              <Badge variant={completionPercentage === 100 ? "default" : "secondary"}>
                {completionPercentage.toFixed(0)}% Secure
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {categories.map((category) => {
        const categoryItems = securityItems.filter(item => item.category === category)
        const CategoryIcon = getPriorityIcon(category)
        
        return (
          <Card key={category} className="bg-gradient-card border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CategoryIcon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{category}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-4 p-4 rounded-lg border transition-all cursor-pointer hover:bg-muted/50 ${
                      completedItems.has(item.id)
                        ? "bg-success/10 border-success/20"
                        : "bg-card border-border/50"
                    }`}
                    onClick={() => toggleItem(item.id)}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto hover:bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleItem(item.id)
                      }}
                    >
                      {completedItems.has(item.id) ? (
                        <CheckSquare className="h-5 w-5 text-success" />
                      ) : (
                        <Square className="h-5 w-5 text-muted-foreground" />
                      )}
                    </Button>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-medium ${
                          completedItems.has(item.id) ? "line-through text-muted-foreground" : ""
                        }`}>
                          {item.title}
                        </h4>
                        <Badge variant={getPriorityColor(item.priority) as any} className="text-xs">
                          {item.priority}
                        </Badge>
                      </div>
                      <p className={`text-sm ${
                        completedItems.has(item.id) ? "text-muted-foreground" : "text-foreground/80"
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}

      {completionPercentage === 100 && (
        <Card className="bg-success/10 border-success/20">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-success mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-success mb-2">
              Excellent Security Posture!
            </h3>
            <p className="text-sm text-success/80">
              You've completed all security best practices. Keep up the great work and stay vigilant!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}