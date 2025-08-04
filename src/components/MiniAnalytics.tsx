import { useState } from "react"
import { TrendingUp, Globe, Shield, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts"

// Mock data for charts
const breachTrends = [
  { month: "Jan", breaches: 42, affected: 1200000 },
  { month: "Feb", breaches: 38, affected: 980000 },
  { month: "Mar", breaches: 51, affected: 1450000 },
  { month: "Apr", breaches: 47, affected: 1320000 },
  { month: "May", breaches: 55, affected: 1680000 },
  { month: "Jun", breaches: 49, affected: 1420000 }
]

const phishingReports = [
  { week: "W1", reports: 1247 },
  { week: "W2", reports: 1589 },
  { week: "W3", reports: 1823 },
  { week: "W4", reports: 1456 },
  { week: "W5", reports: 1678 },
  { week: "W6", reports: 1934 }
]

const affectedCountries = [
  { name: "USA", value: 32, color: "#dc2626" },
  { name: "China", value: 18, color: "#ea580c" },
  { name: "Russia", value: 15, color: "#d97706" },
  { name: "India", value: 12, color: "#ca8a04" },
  { name: "Others", value: 23, color: "#65a30d" }
]

const threatTypes = [
  { type: "Malware", count: 34, trend: "+12%" },
  { type: "Phishing", count: 28, trend: "+8%" },
  { type: "Ransomware", count: 19, trend: "-3%" },
  { type: "Data Breach", count: 15, trend: "+15%" }
]

export default function MiniAnalytics() {
  const [activeTab, setActiveTab] = useState("breaches")

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border/50 p-3 rounded-lg shadow-lg">
          <p className="font-medium text-sm">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <Card className="bg-gradient-card border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Security Analytics
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="breaches" className="text-xs">Breaches</TabsTrigger>
            <TabsTrigger value="phishing" className="text-xs">Phishing</TabsTrigger>
            <TabsTrigger value="regions" className="text-xs">Regions</TabsTrigger>
          </TabsList>

          <TabsContent value="breaches" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">Data Breach Trends</h4>
                <Badge variant="destructive" className="text-xs">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  +13% this month
                </Badge>
              </div>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={breachTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="breaches"
                      stroke="hsl(var(--destructive))"
                      fill="hsl(var(--destructive)/0.2)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {threatTypes.map((threat) => (
                  <div key={threat.type} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">{threat.type}</span>
                      <Badge variant={threat.trend.startsWith('+') ? "destructive" : "default"} className="text-xs">
                        {threat.trend}
                      </Badge>
                    </div>
                    <div className="text-lg font-bold text-primary">{threat.count}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="phishing" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">Phishing Reports</h4>
                <Badge variant="warning" className="text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Weekly Data
                </Badge>
              </div>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={phishingReports}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="week"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="reports"
                      fill="hsl(var(--warning))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold text-warning">1.9K</div>
                  <div className="text-xs text-muted-foreground">Avg/Week</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold text-destructive">73%</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold text-primary">+8%</div>
                  <div className="text-xs text-muted-foreground">Monthly</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="regions" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">Most Affected Regions</h4>
                <Badge variant="secondary" className="text-xs">
                  <Globe className="w-3 h-3 mr-1" />
                  Global Data
                </Badge>
              </div>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={affectedCountries}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {affectedCountries.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => [`${value}%`, 'Percentage']}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2">
                {affectedCountries.map((country, index) => (
                  <div key={country.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: country.color }}
                      />
                      <span className="text-sm">{country.name}</span>
                    </div>
                    <span className="text-sm font-medium">{country.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}