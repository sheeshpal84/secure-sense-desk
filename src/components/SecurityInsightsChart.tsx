import React, { useState, useEffect } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Shield } from 'lucide-react';

const SecurityInsightsChart = () => {
  const [animationData, setAnimationData] = useState<any[]>([]);
  
  const fullData = [
    { month: 'Jan', threats: 1240, breaches: 45 },
    { month: 'Feb', threats: 1580, breaches: 38 },
    { month: 'Mar', threats: 1920, breaches: 52 },
    { month: 'Apr', threats: 1650, breaches: 41 },
    { month: 'May', threats: 2100, breaches: 47 },
    { month: 'Jun', threats: 1890, breaches: 35 },
    { month: 'Jul', threats: 2340, breaches: 58 },
    { month: 'Aug', threats: 2150, breaches: 44 },
    { month: 'Sep', threats: 2480, breaches: 61 },
    { month: 'Oct', threats: 2720, breaches: 52 },
    { month: 'Nov', threats: 2580, breaches: 49 },
    { month: 'Dec', threats: 2890, breaches: 67 }
  ];

  useEffect(() => {
    // Animate data loading
    const timer = setTimeout(() => {
      setAnimationData(fullData);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 border border-red-500/20 rounded-lg p-3 shadow-lg backdrop-blur-sm">
          <p className="text-red-400 font-medium">{`${label} 2024`}</p>
          <p className="text-white">
            <span className="text-red-300">Threats Detected: </span>
            {payload[0].value.toLocaleString()}
          </p>
          <p className="text-white">
            <span className="text-red-300">Data Breaches: </span>
            {payload[1].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="h-5 w-5 text-primary" />
              Security Insights 2024
            </CardTitle>
            <CardDescription>
              Real-time threat detection and breach monitoring
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-primary" />
            Live Monitoring
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={animationData}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 10,
              }}
            >
              <defs>
                <linearGradient id="threatsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="breachesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                yAxisId="left"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                yAxisId="right"
                orientation="right"
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="threats"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#threatsGradient)"
                animationDuration={2000}
                animationBegin={0}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="breaches"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#breachesGradient)"
                animationDuration={2000}
                animationBegin={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">2.89M</div>
            <div className="text-sm text-muted-foreground">Threats Blocked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">67</div>
            <div className="text-sm text-muted-foreground">Breaches Detected</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityInsightsChart;