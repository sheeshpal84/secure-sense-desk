import { Shield, Key, Mail, Globe, CheckSquare, Newspaper, TrendingUp, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Link } from "react-router-dom"
import { GlobalBreachMap } from './GlobalBreachMap'
import SecurityAssistant from './SecurityAssistant'
import SecurityTipsBanner from './SecurityTipsBanner'
import SecurityScore from './SecurityScore'
import MiniAnalytics from './MiniAnalytics'

const securityMetrics = [
  {
    title: "Password Strength",
    value: "Not Tested",
    description: "Check your password security",
    icon: Key,
    link: "/password",
    status: "warning"
  },
  {
    title: "Email Security",
    value: "Not Checked",
    description: "Scan for data breaches",
    icon: Mail,
    link: "/email",
    status: "warning"
  },
  {
    title: "URL Safety",
    value: "Ready",
    description: "Analyze suspicious links",
    icon: Globe,
    link: "/phishing",
    status: "success"
  },
  {
    title: "Security Checklist",
    value: "0/10 Complete",
    description: "Follow best practices",
    icon: CheckSquare,
    link: "/checklist",
    status: "info"
  }
]

const recentThreats = [
  {
    type: "Phishing Campaign",
    severity: "High",
    description: "New email-based attacks targeting financial institutions",
    time: "2 hours ago"
  },
  {
    type: "Malware Detection",
    severity: "Medium",
    description: "Browser extension found to contain suspicious code",
    time: "5 hours ago"
  },
  {
    type: "Data Breach",
    severity: "High",
    description: "Major retailer exposes customer payment information",
    time: "1 day ago"
  }
]

export default function Dashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-success"
      case "warning": return "text-warning"
      case "error": return "text-destructive"
      default: return "text-primary"
    }
  }

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case "High": return "destructive"
      case "Medium": return "warning"
      case "Low": return "secondary"
      default: return "secondary"
    }
  }

  return (
    <div className="relative w-full">
      {/* Cyber Background Animation */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(202,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(202,0,0,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
        </div>
        
        {/* Floating Security Icons */}
        <div className="absolute inset-0">
          <div className="absolute top-[10%] left-[5%] w-3 h-3 bg-primary/10 rounded-full animate-ping" style={{animationDelay: '0s', animationDuration: '4s'}}></div>
          <div className="absolute top-[30%] right-[10%] w-2 h-2 bg-primary/20 rounded-full animate-pulse" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
          <div className="absolute bottom-[20%] left-[15%] w-4 h-4 bg-primary/15 rounded-full animate-ping" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
          <div className="absolute top-[60%] right-[20%] w-3 h-3 bg-primary/10 rounded-full animate-pulse" style={{animationDelay: '0.5s', animationDuration: '6s'}}></div>
          <div className="absolute bottom-[40%] right-[5%] w-2 h-2 bg-primary/25 rounded-full animate-ping" style={{animationDelay: '3s', animationDuration: '4s'}}></div>
        </div>
        
        {/* Scanning Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" style={{animationDelay: '1s', animationDuration: '8s'}}></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent animate-pulse" style={{animationDelay: '4s', animationDuration: '6s'}}></div>
        </div>
      </div>

      {/* Main Content - Higher z-index */}
      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-8">
        {/* Security Tips Banner */}
        <SecurityTipsBanner />

        {/* Header */}
        <div className="flex items-center gap-3 pt-6 pb-2">
          <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-cyber bg-clip-text text-transparent truncate">
            CyberShield Dashboard
          </h1>
        </div>

        {/* Welcome Section */}
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-foreground">Welcome back, stay secure!</h2>
                <p className="text-muted-foreground">
                  Your comprehensive cybersecurity analysis platform. Stay protected with real-time security tools.
                </p>
              </div>
              <Shield className="h-16 w-16 text-primary/30 hidden sm:block" />
            </div>
          </CardContent>
        </Card>

        {/* Security Tools Grid */}
        <div className="space-y-6">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">Security Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {securityMetrics.map((metric) => (
              <Link key={metric.title} to={metric.link} className="block">
                <Card className="bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary group cursor-pointer h-full">
                  <CardHeader className="p-4 sm:p-6 pb-3">
                    <div className="flex items-center justify-between">
                      <metric.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${getStatusColor(metric.status)} group-hover:text-primary transition-colors flex-shrink-0`} />
                      <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm sm:text-base group-hover:text-primary transition-colors">
                        {metric.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {metric.description}
                      </p>
                      <p className={`text-xs sm:text-sm font-medium ${getStatusColor(metric.status)}`}>
                        {metric.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Security Score and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SecurityScore />
          <MiniAnalytics />
        </div>

        {/* Recent Threats & News */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border/50">
          <CardHeader className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0" />
                  Recent Threats
                </CardTitle>
                <CardDescription>Latest cybersecurity alerts</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/news">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="space-y-4">
              {recentThreats.map((threat, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg border border-border/30">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{threat.type}</h4>
                      <Badge variant={getSeverityVariant(threat.severity) as any} className="text-xs">
                        {threat.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{threat.description}</p>
                    <p className="text-xs text-muted-foreground">{threat.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-primary flex-shrink-0" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Common security tasks</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start p-4 h-auto" asChild>
                <Link to="/password">
                  <Key className="mr-3 h-4 w-4 flex-shrink-0" />
                  Test Password Strength
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start p-4 h-auto" asChild>
                <Link to="/email">
                  <Mail className="mr-3 h-4 w-4 flex-shrink-0" />
                  Check Email Breaches
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start p-4 h-auto" asChild>
                <Link to="/phishing">
                  <Globe className="mr-3 h-4 w-4 flex-shrink-0" />
                  Analyze Suspicious URL
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start p-4 h-auto" asChild>
                <Link to="/checklist">
                  <CheckSquare className="mr-3 h-4 w-4 flex-shrink-0" />
                  Security Best Practices
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

        {/* Global Data Breach Map */}
        <GlobalBreachMap />

        {/* Security Score Overview */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Security Posture Overview</CardTitle>
            <CardDescription>
              Your overall security status based on completed security practices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-muted/50 rounded-lg border border-border/30 space-y-2">
                  <h3 className="text-2xl font-bold text-primary">0%</h3>
                  <p className="text-sm text-muted-foreground">Security Checklist</p>
                </div>
                <div className="text-center p-6 bg-muted/50 rounded-lg border border-border/30 space-y-2">
                  <h3 className="text-2xl font-bold text-warning">-</h3>
                  <p className="text-sm text-muted-foreground">Password Tested</p>
                </div>
                <div className="text-center p-6 bg-muted/50 rounded-lg border border-border/30 space-y-2">
                  <h3 className="text-2xl font-bold text-warning">-</h3>
                  <p className="text-sm text-muted-foreground">Email Checked</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Overall Security Score</span>
                  <span>0%</span>
                </div>
                <Progress value={0} className="h-2" />
                <p className="text-xs text-muted-foreground leading-relaxed pt-2">
                  Complete security tools and checklist items to improve your score
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Security Assistant */}
      <SecurityAssistant />
    </div>
  )
}