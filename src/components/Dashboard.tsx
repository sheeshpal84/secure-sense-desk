import { Shield, Key, Mail, Globe, CheckSquare, Newspaper, TrendingUp, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Link } from "react-router-dom"

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
    <div className="space-y-8 p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
          CyberShield Dashboard
        </h1>
      </div>

      {/* Welcome Section */}
      <Card className="bg-gradient-card border-border/50 mx-4 sm:mx-0">
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
      <div className="px-4 sm:px-0">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Security Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {securityMetrics.map((metric) => (
            <Link key={metric.title} to={metric.link} className="block">
              <Card className="bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary group cursor-pointer h-full p-4">
                <CardHeader className="pb-3 p-0">
                  <div className="flex items-center justify-between mb-4">
                    <metric.icon className={`h-6 w-6 ${getStatusColor(metric.status)} group-hover:text-primary transition-colors`} />
                    <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                      {metric.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {metric.description}
                    </p>
                    <p className={`text-sm font-medium ${getStatusColor(metric.status)} mt-4`}>
                      {metric.value}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Threats & News */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 sm:px-0">
        <Card className="bg-gradient-card border-border/50">
          <CardHeader className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
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
                <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border/30">
                  <div className="flex-1 space-y-2">
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
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Common security tasks</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start p-4 h-auto" asChild>
                <Link to="/password">
                  <Key className="mr-3 h-4 w-4" />
                  Test Password Strength
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start p-4 h-auto" asChild>
                <Link to="/email">
                  <Mail className="mr-3 h-4 w-4" />
                  Check Email Breaches
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start p-4 h-auto" asChild>
                <Link to="/phishing">
                  <Globe className="mr-3 h-4 w-4" />
                  Analyze Suspicious URL
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start p-4 h-auto" asChild>
                <Link to="/checklist">
                  <CheckSquare className="mr-3 h-4 w-4" />
                  Security Best Practices
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Score Overview */}
      <Card className="bg-gradient-card border-border/50 mx-4 sm:mx-0">
        <CardHeader className="p-6">
          <CardTitle>Security Posture Overview</CardTitle>
          <CardDescription>
            Your overall security status based on completed security practices
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-6 bg-muted/50 rounded-lg border border-border/30">
                <h3 className="text-2xl font-bold text-primary">0%</h3>
                <p className="text-sm text-muted-foreground mt-2">Security Checklist</p>
              </div>
              <div className="text-center p-6 bg-muted/50 rounded-lg border border-border/30">
                <h3 className="text-2xl font-bold text-warning">-</h3>
                <p className="text-sm text-muted-foreground mt-2">Password Tested</p>
              </div>
              <div className="text-center p-6 bg-muted/50 rounded-lg border border-border/30">
                <h3 className="text-2xl font-bold text-warning">-</h3>
                <p className="text-sm text-muted-foreground mt-2">Email Checked</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Overall Security Score</span>
                <span>0%</span>
              </div>
              <Progress value={0} className="h-2" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Complete security tools and checklist items to improve your score
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}