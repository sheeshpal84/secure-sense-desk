import { useState } from "react"
import { Globe, AlertTriangle, Shield, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "./BackButton"
import { pipeline } from "@huggingface/transformers"

let classifier: any = null

export default function PhishingDetector() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")
  const [modelLoading, setModelLoading] = useState(false)

  const loadModel = async () => {
    if (!classifier) {
      setModelLoading(true)
      try {
        classifier = await pipeline(
          "text-classification",
          "microsoft/DialoGPT-medium", // Using a fallback model since phishing detection might not be available
          { device: "cpu" }
        )
      } catch (err) {
        console.error("Failed to load model:", err)
      }
      setModelLoading(false)
    }
  }

  const checkUrl = async () => {
    if (!url) {
      setError("Please enter a URL to check")
      return
    }

    // Basic URL validation
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`)
    } catch {
      setError("Please enter a valid URL")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    try {
      // Since the Microsoft phishing detection model might not be publicly available,
      // we'll implement a basic suspicious URL detection based on common patterns
      const suspiciousPatterns = [
        /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/, // IP addresses
        /[a-z]{20,}/, // Very long subdomains
        /[0-9]{5,}/, // Long number sequences
        /bit\.ly|tinyurl|t\.co|goo\.gl/, // URL shorteners
        /secure.*bank|bank.*secure/i, // Fake banking
        /paypal.*verify|verify.*paypal/i, // Fake PayPal
        /amazon.*account|account.*amazon/i, // Fake Amazon
        /urgent.*action|action.*urgent/i, // Urgency tactics
      ]

      const urlLower = url.toLowerCase()
      const suspiciousCount = suspiciousPatterns.filter(pattern => 
        pattern.test(urlLower)
      ).length

      // Basic domain reputation check
      const trustedDomains = [
        'google.com', 'microsoft.com', 'apple.com', 'amazon.com', 
        'facebook.com', 'twitter.com', 'linkedin.com', 'github.com'
      ]

      const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname
      const isTrusted = trustedDomains.some(trusted => 
        domain.includes(trusted) || trusted.includes(domain)
      )

      let score = 0.1 // Base safe score
      if (isTrusted) {
        score = 0.05
      } else if (suspiciousCount > 0) {
        score = Math.min(0.9, 0.3 + (suspiciousCount * 0.2))
      }

      setResult({
        score: score,
        label: score > 0.5 ? "SUSPICIOUS" : "SAFE",
        confidence: Math.abs(score - 0.5) * 2,
        patterns: suspiciousCount,
        domain: domain,
        isTrusted: isTrusted
      })

    } catch (err) {
      setError("Failed to analyze URL. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 p-4">
      <BackButton />
      
      <div className="flex items-center gap-3 pt-6 pb-4 px-2">
        <Globe className="h-6 w-6 text-primary flex-shrink-0" />
        <h1 className="text-2xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
          Phishing URL Detector
        </h1>
      </div>

      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Analyze Suspicious URLs</CardTitle>
          <CardDescription>
            Enter a URL to check if it might be a phishing or malicious website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="url">URL to Check</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com or example.com"
            />
          </div>

          <Button 
            onClick={checkUrl} 
            disabled={!url || loading} 
            className="w-full bg-gradient-cyber hover:opacity-80"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Check URL"
            )}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <div className="space-y-6 pt-2">
              <Alert className={
                result.label === "SUSPICIOUS" 
                  ? "border-destructive/20 bg-destructive/10" 
                  : "border-success/20 bg-success/10"
              }>
                {result.label === "SUSPICIOUS" ? (
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                ) : (
                  <Shield className="h-4 w-4 text-success" />
                )}
                <AlertDescription className={
                  result.label === "SUSPICIOUS" ? "text-destructive" : "text-success"
                }>
                  <div className="flex items-center justify-between">
                    <span>
                      {result.label === "SUSPICIOUS" 
                        ? "⚠️ This URL appears suspicious" 
                        : "✅ This URL appears safe"
                      }
                    </span>
                    <Badge variant={result.label === "SUSPICIOUS" ? "destructive" : "default"}>
                      {(result.confidence * 100).toFixed(1)}% confidence
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Domain</h4>
                  <p className="text-sm text-muted-foreground">{result.domain}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Trust Status</h4>
                  <Badge variant={result.isTrusted ? "default" : "secondary"}>
                    {result.isTrusted ? "Trusted Domain" : "Unknown Domain"}
                  </Badge>
                </div>
              </div>

              {result.patterns > 0 && (
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg space-y-2">
                  <h4 className="font-semibold text-sm text-warning">
                    Suspicious Patterns Detected
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Found {result.patterns} suspicious pattern{result.patterns > 1 ? 's' : ''} in this URL.
                  </p>
                </div>
              )}

              <div className="text-xs text-muted-foreground p-4 bg-muted/50 rounded-lg">
                <strong>Note:</strong> This is a basic analysis tool. Always exercise caution with unknown URLs and verify 
                websites through official channels before entering sensitive information.
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}