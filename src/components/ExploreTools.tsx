import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Lock, Eye, CheckCircle, Globe, AlertTriangle } from 'lucide-react'

export default function ExploreTools() {
  const tools = [
    {
      icon: Lock,
      title: 'Password Checker',
      description: 'Test password strength and get security recommendations',
      path: '/password',
      color: 'text-primary'
    },
    {
      icon: Eye,
      title: 'Email Breach Detection',
      description: 'Check if your email has been compromised in data breaches',
      path: '/email',
      color: 'text-orange-500'
    },
    {
      icon: AlertTriangle,
      title: 'Phishing Detector',
      description: 'Analyze URLs and emails for potential phishing threats',
      path: '/phishing',
      color: 'text-red-500'
    },
    {
      icon: Globe,
      title: 'Cyber News',
      description: 'Stay updated with latest cybersecurity news and threats',
      path: '/news',
      color: 'text-blue-500'
    },
    {
      icon: CheckCircle,
      title: 'Security Checklist',
      description: 'Follow comprehensive cybersecurity best practices',
      path: '/checklist',
      color: 'text-green-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border/50">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">CyberGuard</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/signin">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="default">
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div className="px-6 py-12 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Explore Security Tools
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Try our cybersecurity tools for free. No registration required to get started.
        </p>
        <div className="bg-card/20 border border-border/50 rounded-lg p-4 mb-8">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Tip:</strong> Sign in to save your results and access advanced features
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="px-6 pb-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Card key={index} className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <tool.icon className={`h-12 w-12 ${tool.color} mb-4`} />
                <CardTitle className="text-foreground">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{tool.description}</CardDescription>
                <Link to={tool.path}>
                  <Button className="w-full" variant="outline">
                    Try Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-16 text-center bg-card/20 border-t border-border/50">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Want to Save Your Results?
          </h3>
          <p className="text-muted-foreground mb-8">
            Create a free account to save your security analysis, get personalized recommendations, and access your dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Create Free Account
              </Button>
            </Link>
            <Link to="/signin">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}