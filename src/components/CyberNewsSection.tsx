import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Newspaper, Clock, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CyberNewsSection = () => {
  const newsArticles = [
    {
      id: 1,
      title: "Major AI Security Breach Exposes 50M User Records",
      summary: "A sophisticated attack on a leading AI platform has compromised sensitive user data, highlighting new vulnerabilities in machine learning systems.",
      timestamp: "2 hours ago",
      severity: "High",
      category: "Data Breach"
    },
    {
      id: 2,
      title: "New Ransomware Strain Targets Cloud Infrastructure",
      summary: "Cybersecurity researchers have identified a novel ransomware variant specifically designed to exploit cloud storage vulnerabilities.",
      timestamp: "4 hours ago",
      severity: "Critical",
      category: "Ransomware"
    },
    {
      id: 3,
      title: "Quantum Computing Threats to Current Encryption",
      summary: "Security experts warn that advances in quantum computing could render current encryption methods obsolete within the next decade.",
      timestamp: "6 hours ago",
      severity: "Medium",
      category: "Encryption"
    },
    {
      id: 4,
      title: "Social Engineering Attacks Rise 300% in 2025",
      summary: "New report reveals a dramatic increase in sophisticated social engineering tactics targeting remote workers and executives.",
      timestamp: "8 hours ago",
      severity: "High",
      category: "Social Engineering"
    },
    {
      id: 5,
      title: "Zero-Day Vulnerability in Popular IoT Devices",
      summary: "Security researchers discover critical flaw affecting millions of smart home devices, prompting urgent security updates.",
      timestamp: "12 hours ago",
      severity: "Critical",
      category: "IoT Security"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "destructive";
      case "High": return "warning";
      case "Medium": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="px-6 py-16 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Newspaper className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Latest Cyber News</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Stay informed with the latest cybersecurity threats, breaches, and security updates from around the world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {newsArticles.slice(0, 3).map((article) => (
          <Card key={article.id} className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 hover:scale-105 group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge variant={getSeverityColor(article.severity) as any} className="text-xs">
                  {article.severity}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {article.timestamp}
                </div>
              </div>
              <CardTitle className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors">
                {article.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                {article.summary}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {article.category}
                </Badge>
                <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Articles - Mobile Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {newsArticles.slice(3, 5).map((article) => (
          <Card key={article.id} className="bg-card/30 border-border/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 group">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={getSeverityColor(article.severity) as any} className="text-xs">
                      {article.severity}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {article.timestamp}
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold leading-tight mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {article.summary}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All News Button */}
      <div className="text-center">
        <Link to="/news">
          <Button variant="outline" className="hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all">
            <Newspaper className="mr-2 h-4 w-4" />
            View All Cyber News
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CyberNewsSection;