import { useState, useEffect } from "react"
import { Newspaper, ExternalLink, Calendar, Loader2, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BackButton } from "./BackButton"

interface NewsArticle {
  title: string
  description: string
  url: string
  urlToImage: string | null
  publishedAt: string
  source: {
    name: string
  }
}

const mockNewsData: NewsArticle[] = [
  {
    title: "New Zero-Day Vulnerability Discovered in Popular Web Framework",
    description: "Security researchers have identified a critical zero-day vulnerability affecting millions of websites worldwide. The flaw allows remote code execution and has been assigned CVE-2024-1234.",
    url: "#",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: { name: "CyberSecurity News" }
  },
  {
    title: "Major Cloud Provider Enhances Security Protocols",
    description: "Leading cloud infrastructure provider announces new security measures including enhanced encryption and improved access controls to protect customer data.",
    url: "#",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: { name: "Tech Security Today" }
  },
  {
    title: "Ransomware Group Targets Healthcare Systems",
    description: "A sophisticated ransomware campaign has been targeting healthcare institutions globally, exploiting vulnerabilities in medical device networks.",
    url: "#",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: { name: "Healthcare Security Alert" }
  },
  {
    title: "AI-Powered Phishing Attacks on the Rise",
    description: "Cybercriminals are increasingly using artificial intelligence to create more convincing phishing emails and deepfake content to deceive victims.",
    url: "#",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    source: { name: "AI Security Watch" }
  },
  {
    title: "New Cybersecurity Framework Released for Small Businesses",
    description: "Government agency releases comprehensive cybersecurity guidelines specifically designed to help small and medium-sized businesses protect against cyber threats.",
    url: "#",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "Business Security Guide" }
  }
]

export default function CyberNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    setLoading(true)
    setError("")
    
    try {
      // Note: NewsAPI requires an API key and has CORS restrictions
      // For this demo, we'll use mock data. In production, you'd need:
      // 1. A proxy server to handle the API calls
      // 2. A valid NewsAPI key
      // 3. Or use a different news source
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Use mock data for demonstration
      setArticles(mockNewsData)
      
      /* Real API call would look like this:
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=cybersecurity&sortBy=publishedAt&apiKey=YOUR_API_KEY`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch news')
      }
      
      const data = await response.json()
      setArticles(data.articles.slice(0, 10))
      */
      
    } catch (err) {
      setError("Unable to fetch news at this time. Please try again later.")
      setArticles(mockNewsData) // Fallback to mock data
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffHours < 1) return "Just now"
    if (diffHours < 24) return `${diffHours}h ago`
    return date.toLocaleDateString()
  }

  const getUrgencyLevel = (title: string, description: string) => {
    const urgentKeywords = ["zero-day", "critical", "emergency", "ransomware", "breach"]
    const content = (title + " " + description).toLowerCase()
    
    if (urgentKeywords.some(keyword => content.includes(keyword))) {
      return "high"
    }
    return "normal"
  }

  return (
    <div className="space-y-6">
      <BackButton />
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Newspaper className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
            Cybersecurity News
          </h1>
        </div>
        <Button 
          onClick={fetchNews} 
          disabled={loading}
          variant="outline"
          size="sm"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Refresh"
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="bg-gradient-card border-border/50">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article, index) => {
            const urgency = getUrgencyLevel(article.title, article.description)
            
            return (
              <Card key={index} className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-semibold text-lg leading-tight hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      {urgency === "high" && (
                        <Badge variant="destructive" className="flex-shrink-0">
                          Critical
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {article.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(article.publishedAt)}
                        </div>
                        <span>•</span>
                        <span>{article.source.name}</span>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => window.open(article.url, '_blank')}
                        className="h-auto p-1 hover:text-primary"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      <div className="text-center mt-8">
        <p className="text-xs text-muted-foreground">
          News data is for demonstration purposes. In production, this would connect to NewsAPI.org or similar service.
        </p>
      </div>
    </div>
  )
}