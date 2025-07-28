import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Shield, ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [errors, setErrors] = useState<{email?: string}>({})
  
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: {email?: string} = {}
    
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    setIsEmailSent(true)
    
    toast({
      title: "Reset link sent!",
      description: "Check your email for password reset instructions.",
    })
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <Shield className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
              CyberShield
            </h1>
          </div>

          <Card className="bg-gradient-card border-border/50 shadow-glow-primary">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl">Check Your Email</CardTitle>
              <CardDescription>
                We've sent a password reset link to {email}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              
              <div className="space-y-2">
                <Button
                  onClick={() => {
                    setIsEmailSent(false)
                    setEmail('')
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Try Different Email
                </Button>
                
                <Button asChild variant="outline" className="w-full">
                  <Link to="/signin">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Sign In
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Shield className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-2xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
            CyberShield
          </h1>
        </div>

        <Card className="bg-gradient-card border-border/50 shadow-glow-primary">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              Enter your email address and we'll send you a reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-cyber hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending reset link...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/signin"
                className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center"
              >
                <ArrowLeft className="mr-1 h-3 w-3" />
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}