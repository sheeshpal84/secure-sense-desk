import { useState } from "react"
import { Mail, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface BreachData {
  Name: string
  Title: string
  Domain: string
  BreachDate: string
  AddedDate: string
  ModifiedDate: string
  PwnCount: number
  Description: string
  LogoPath: string
  DataClasses: string[]
  IsVerified: boolean
  IsFabricated: boolean
  IsSensitive: boolean
  IsRetired: boolean
  IsSpamList: boolean
}

export default function EmailLeakChecker() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [breaches, setBreaches] = useState<BreachData[]>([])
  const [error, setError] = useState("")
  const [checked, setChecked] = useState(false)

  const checkEmail = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    setLoading(true)
    setError("")
    setBreaches([])
    setChecked(false)

    try {
      const response = await fetch(
        `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}`,
        {
          headers: {
            'User-Agent': 'CyberShield-Dashboard'
          }
        }
      )

      if (response.status === 404) {
        setBreaches([])
        setChecked(true)
      } else if (response.status === 200) {
        const data = await response.json()
        setBreaches(data)
        setChecked(true)
      } else {
        throw new Error(`API returned status ${response.status}`)
      }
    } catch (err) {
      setError("Unable to check email. The service might be temporarily unavailable.")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Mail className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
          Email Leak Checker
        </h1>
      </div>

      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Check Data Breaches</CardTitle>
          <CardDescription>
            Enter your email to check if it has been exposed in any known data breaches
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
            />
          </div>

          <Button 
            onClick={checkEmail} 
            disabled={!email || loading} 
            className="w-full bg-gradient-cyber hover:opacity-80"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              "Check for Breaches"
            )}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {checked && !loading && (
            <>
              {breaches.length === 0 ? (
                <Alert className="border-success/20 bg-success/10">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <AlertDescription className="text-success">
                    Good news! This email address was not found in any known data breaches.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    This email was found in {breaches.length} data breach{breaches.length > 1 ? 'es' : ''}.
                  </AlertDescription>
                </Alert>
              )}

              {breaches.length > 0 && (
                <div className="space-y-4 mt-4">
                  <h4 className="font-semibold">Affected Breaches:</h4>
                  {breaches.map((breach) => (
                    <Card key={breach.Name} className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-semibold">{breach.Title}</h5>
                          <Badge variant="destructive" className="text-xs">
                            {breach.PwnCount.toLocaleString()} accounts
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Breach date: {formatDate(breach.BreachDate)}
                        </p>
                        <p className="text-sm mb-3 line-clamp-3">
                          {breach.Description.replace(/<[^>]*>/g, '')}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {breach.DataClasses.map((dataClass) => (
                            <Badge key={dataClass} variant="outline" className="text-xs">
                              {dataClass}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}