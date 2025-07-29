import { useState } from "react"
import { Eye, EyeOff, Key } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "./BackButton"
import zxcvbn from "zxcvbn"

const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"]
const strengthColors = ["destructive", "warning", "warning", "primary", "success"] as const

export default function PasswordChecker() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [result, setResult] = useState<any>(null)

  const checkPassword = () => {
    if (password) {
      const analysis = zxcvbn(password)
      setResult(analysis)
    }
  }

  const getStrengthColor = (score: number) => {
    return strengthColors[score] || "destructive"
  }

  return (
    <div className="space-y-6">
      <BackButton />
      
      <div className="flex items-center gap-2 mb-6">
        <Key className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
          Password Strength Checker
        </h1>
      </div>

      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Test Your Password</CardTitle>
          <CardDescription>
            Enter a password to analyze its strength and get security recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Button 
            onClick={checkPassword} 
            disabled={!password} 
            className="w-full bg-gradient-cyber hover:opacity-80"
          >
            Check Password Strength
          </Button>

          {result && (
            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Strength Score</span>
                  <Badge variant={getStrengthColor(result.score) as any}>
                    {strengthLabels[result.score]}
                  </Badge>
                </div>
                <Progress value={(result.score + 1) * 20} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Time to Crack</h4>
                  <p className="text-sm text-muted-foreground">
                    {result.crack_times_display.offline_slow_hashing_1e4_per_second}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Guesses</h4>
                  <p className="text-sm text-muted-foreground">
                    {result.guesses.toLocaleString()}
                  </p>
                </div>
              </div>

              {result.feedback.suggestions.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Suggestions</h4>
                  <ul className="space-y-1">
                    {result.feedback.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-warning">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.feedback.warning && (
                <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <p className="text-sm text-warning font-medium">
                    {result.feedback.warning}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}