import React, { useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MapPin, Filter } from 'lucide-react'

// World map topology URL (public domain)
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@3/countries-110m.json'

interface Breach {
  id: string
  city: string
  country: string
  coordinates: [number, number]
  type: string
  severity: 'High' | 'Medium' | 'Low'
  recordsAffected: number
  timeAgo: string
}

const mockBreaches: Breach[] = [
  {
    id: '1',
    city: 'New York',
    country: 'United States',
    coordinates: [-74.006, 40.7128],
    type: 'Financial Data Breach',
    severity: 'High',
    recordsAffected: 50000,
    timeAgo: '2 hours ago'
  },
  {
    id: '2',
    city: 'London',
    country: 'United Kingdom',
    coordinates: [-0.1276, 51.5074],
    type: 'Healthcare Records',
    severity: 'High',
    recordsAffected: 75000,
    timeAgo: '4 hours ago'
  },
  {
    id: '3',
    city: 'Tokyo',
    country: 'Japan',
    coordinates: [139.6917, 35.6895],
    type: 'Social Media Platform',
    severity: 'Medium',
    recordsAffected: 20000,
    timeAgo: '6 hours ago'
  },
  {
    id: '4',
    city: 'Berlin',
    country: 'Germany',
    coordinates: [13.405, 52.52],
    type: 'E-commerce',
    severity: 'Medium',
    recordsAffected: 15000,
    timeAgo: '8 hours ago'
  },
  {
    id: '5',
    city: 'Sydney',
    country: 'Australia',
    coordinates: [151.2093, -33.8688],
    type: 'Government Database',
    severity: 'High',
    recordsAffected: 100000,
    timeAgo: '12 hours ago'
  },
  {
    id: '6',
    city: 'São Paulo',
    country: 'Brazil',
    coordinates: [-46.6333, -23.5505],
    type: 'Banking System',
    severity: 'High',
    recordsAffected: 80000,
    timeAgo: '1 day ago'
  },
  {
    id: '7',
    city: 'Mumbai',
    country: 'India',
    coordinates: [72.8777, 19.0760],
    type: 'Telecom Provider',
    severity: 'Medium',
    recordsAffected: 30000,
    timeAgo: '1 day ago'
  },
  {
    id: '8',
    city: 'Moscow',
    country: 'Russia',
    coordinates: [37.6173, 55.7558],
    type: 'Energy Sector',
    severity: 'Low',
    recordsAffected: 5000,
    timeAgo: '2 days ago'
  }
]

const breachTypes = ['All Types', 'Financial Data Breach', 'Healthcare Records', 'Social Media Platform', 'E-commerce', 'Government Database', 'Banking System', 'Telecom Provider', 'Energy Sector']

export function GlobalBreachMap() {
  const [selectedBreach, setSelectedBreach] = useState<Breach | null>(null)
  const [filterType, setFilterType] = useState('All Types')

  const filteredBreaches = mockBreaches.filter(breach => 
    filterType === 'All Types' || breach.type === filterType
  )

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return '#dc2626'
      case 'Medium': return '#f59e0b' 
      case 'Low': return '#10b981'
      default: return '#ca0000'
    }
  }

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'High': return 'destructive'
      case 'Medium': return 'warning'
      case 'Low': return 'secondary'
      default: return 'destructive'
    }
  }

  return (
    <Card className="bg-gradient-card border-border/50">
      <CardHeader className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Global Data Breach Map
            </CardTitle>
            <CardDescription>Real-time breach activity across the globe</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48 bg-muted/50">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                {breachTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="relative">
          {/* Map Container */}
          <div className="h-[400px] bg-card rounded-lg border border-border/30 overflow-hidden">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 120,
                center: [0, 20]
              }}
              style={{
                width: '100%',
                height: '100%'
              }}
            >
              <ZoomableGroup>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="hsl(var(--muted))"
                        stroke="hsl(var(--border))"
                        strokeWidth={0.5}
                        style={{
                          default: {
                            outline: 'none',
                            fill: 'hsl(var(--muted))',
                          },
                          hover: {
                            outline: 'none',
                            fill: 'hsl(var(--muted-foreground) / 0.1)',
                          },
                          pressed: {
                            outline: 'none',
                          },
                        }}
                      />
                    ))
                  }
                </Geographies>
                {filteredBreaches.map((breach) => (
                  <Marker
                    key={breach.id}
                    coordinates={breach.coordinates}
                    onClick={() => setSelectedBreach(breach)}
                    style={{ cursor: 'pointer' }}
                  >
                    <g>
                      {/* Pulse animation ring */}
                      <circle
                        cx={0}
                        cy={0}
                        r={8}
                        fill={getSeverityColor(breach.severity)}
                        opacity={0.3}
                        className="animate-ping"
                      />
                      {/* Main breach marker */}
                      <circle
                        cx={0}
                        cy={0}
                        r={4}
                        fill={getSeverityColor(breach.severity)}
                        stroke="white"
                        strokeWidth={1}
                        style={{
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                        }}
                      />
                    </g>
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>
          </div>

          {/* Breach Details Tooltip */}
          {selectedBreach && (
            <div className="absolute top-4 right-4 w-80 bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{selectedBreach.city}, {selectedBreach.country}</h4>
                  <Badge variant={getSeverityVariant(selectedBreach.severity) as any} className="text-xs">
                    {selectedBreach.severity}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Type:</span> {selectedBreach.type}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Records Affected:</span> {selectedBreach.recordsAffected.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Time:</span> {selectedBreach.timeAgo}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBreach(null)}
                  className="text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  Close details
                </button>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg p-3">
            <h5 className="text-xs font-medium mb-2 text-foreground">Breach Severity</h5>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <span className="text-xs text-muted-foreground">High Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <span className="text-xs text-muted-foreground">Medium Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="text-xs text-muted-foreground">Low Risk</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg p-3">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Active Breaches</p>
              <p className="text-lg font-bold text-primary">{filteredBreaches.length}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}