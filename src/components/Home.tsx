import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Shield, Lock, Eye, CheckCircle, Globe, AlertTriangle } from 'lucide-react'
import SecurityAssistant from '@/components/SecurityAssistant'
import SecurityInsightsChart from '@/components/SecurityInsightsChart'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'

export default function Home() {
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  const features = [
    {
      icon: Lock,
      title: 'Password Security',
      description: 'Check password strength and get recommendations for stronger passwords'
    },
    {
      icon: Eye,
      title: 'Email Breach Detection',
      description: 'Scan if your email has been compromised in known data breaches'
    },
    {
      icon: AlertTriangle,
      title: 'Phishing Protection',
      description: 'Analyze URLs and emails to detect potential phishing attempts'
    },
    {
      icon: CheckCircle,
      title: 'Security Checklist',
      description: 'Follow our comprehensive cybersecurity best practices guide'
    },
    {
      icon: Globe,
      title: 'Global Threat Map',
      description: 'View real-time cybersecurity threats and breaches worldwide'
    },
    {
      icon: Shield,
      title: 'Security Score',
      description: 'Get a personalized security score based on your digital hygiene'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">CyberGuard</span>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setShowSignIn(true)}
          >
            Login
          </Button>
          <Button 
            variant="default"
            onClick={() => setShowSignUp(true)}
          >
            Sign Up
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="px-6 py-16 text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Protect Your
            <span className="text-primary block">Digital Life</span>
          </h1>
          <p className="text-2xl font-bold text-foreground mb-6">
            Protect your digital life
          </p>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Comprehensive cybersecurity tools to safeguard your online presence. 
            Check passwords, detect breaches, and stay ahead of cyber threats.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            size="lg" 
            className="w-full sm:w-auto"
            onClick={() => setShowSignUp(true)}
          >
            Get Started Free
          </Button>
          <Link to="/explore">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Explore Tools
            </Button>
          </Link>
        </div>

        {/* Security Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">12B+</div>
            <div className="text-muted-foreground">Breached Accounts Tracked</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-muted-foreground">Threat Detection Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Security Monitoring</div>
          </div>
        </div>
      </div>

      {/* Security Insights Chart */}
      <div className="px-6 py-16 max-w-4xl mx-auto">
        <SecurityInsightsChart />
      </div>

      {/* Features Grid */}
      <div className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">
          Comprehensive Security Suite
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-4 animate-pulse" />
                <CardTitle className="text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-16 text-center bg-card/20 border-t border-border/50">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Secure Your Digital Life?
          </h3>
          <p className="text-muted-foreground mb-8">
            Join thousands of users who trust CyberGuard to protect their online presence.
          </p>
          <Button 
            size="lg" 
            className="mb-4"
            onClick={() => setShowSignUp(true)}
          >
            Start Your Security Journey
          </Button>
          <div className="text-sm text-muted-foreground">
            Already have an account? 
            <button 
              onClick={() => setShowSignIn(true)}
              className="text-primary hover:underline ml-1"
            >
              Sign in here
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border/50 text-center text-muted-foreground">
        <p>&copy; 2024 CyberGuard. All rights reserved.</p>
      </footer>

      {/* Security Assistant */}
      <SecurityAssistant />

      {/* Sign In Modal */}
      <Dialog open={showSignIn} onOpenChange={setShowSignIn}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <SignIn />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => setShowSignIn(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sign Up Modal */}
      <Dialog open={showSignUp} onOpenChange={setShowSignUp}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <SignUp />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => setShowSignUp(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}