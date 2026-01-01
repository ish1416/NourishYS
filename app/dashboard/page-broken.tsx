"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Shield,
  Activity,
  Users,
  AlertTriangle,
  TrendingUp,
  Bell,
  User,
  BarChart3,
  MapIcon,
  ChevronRight,
  MessageSquare,
  Utensils,
  Leaf,
  Clock,
  CheckCircle2,
  Send,
  Home,
  Target,
  Zap,
  Brain,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sidebar, SidebarHeader, SidebarContent, SidebarNavItem, SidebarFooter } from "@/components/ui/sidebar"
import { DashboardLayout, DashboardHeader } from "@/components/ui/dashboard-layout"
import { StatsCard } from "@/components/ui/stats-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Input } from "@/components/ui/input"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts'

export default function YellowsenseDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [chatMessage, setChatMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Animate dashboard entrance
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  // Chart data
  const riskData = [
    { name: 'Alpha-9', risk: 82, color: '#E94A7F' },
    { name: 'Beta-3', risk: 45, color: '#F6A23A' },
    { name: 'Gamma-1', risk: 23, color: '#6FBF44' },
    { name: 'Delta-7', risk: 67, color: '#E94A7F' },
    { name: 'Echo-2', risk: 34, color: '#F6A23A' }
  ]

  const trendData = [
    { month: 'Jan', risk: 45, interventions: 12 },
    { month: 'Feb', risk: 52, interventions: 15 },
    { month: 'Mar', risk: 48, interventions: 18 },
    { month: 'Apr', risk: 61, interventions: 22 },
    { month: 'May', risk: 64, interventions: 25 }
  ]

  const pieData = [
    { name: 'High Risk', value: 35, color: '#E94A7F' },
    { name: 'Medium Risk', value: 45, color: '#F6A23A' },
    { name: 'Low Risk', value: 20, color: '#6FBF44' }
  ]

  const sidebarContent = (
    <Sidebar>
      <SidebarHeader>
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-lg text-sidebar-foreground">Yellowsense</h2>
          <p className="text-xs text-sidebar-foreground/60">AI Nourishment Intelligence</p>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <div className="space-y-2">
          <SidebarNavItem
            icon={<Home />}
            label="Intelligence Pulse"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <SidebarNavItem
            icon={<Target />}
            label="Early Warning"
            active={false}
          />
          <SidebarNavItem
            icon={<Zap />}
            label="Interventions"
            active={false}
          />
          <SidebarNavItem
            icon={<Brain />}
            label="Beneficiary AI"
            active={activeTab === "beneficiary"}
            onClick={() => setActiveTab("beneficiary")}
          />
        </div>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2 text-sm"
            onClick={() => router.push('/')}
          >
            ← Back to Home
          </Button>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent/30">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Agency Portal</p>
              <p className="text-xs text-sidebar-foreground/60">Sub-Saharan Region</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )

  const dashboardContent = (
    <div className="space-y-8">
      <DashboardHeader
        title="Intelligence Pulse"
        subtitle="Real-time monitoring of under-nutrition risk clusters across prioritized regions."
        actions={
          <Badge variant="outline" className="px-4 py-2 bg-accent/50 text-accent-foreground border-accent rounded-full">
            Live Data: Sub-Saharan Region
          </Badge>
        }
      />

      {/* High Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Global Risk Index"
          value="64.2"
          icon={<Activity />}
          trend={{
            value: "+2.1%",
            direction: "up",
            icon: <TrendingUp className="h-3 w-3" />
          }}
          progress={64}
          progressColor="primary"
        />
        <StatsCard
          title="Pop. Monitored"
          value="1.2M"
          subtitle="Across 14 priority clusters"
          icon={<Users />}
          progress={88}
        />
        <StatsCard
          title="Early Warning Alerts"
          value="12"
          subtitle="4 Critical (Immediate action)"
          icon={<AlertTriangle />}
          progress={33}
          progressColor="destructive"
        />
        <StatsCard
          title="AI Interventions"
          value="8"
          subtitle="Optimized supply routes active"
          icon={<BarChart3 />}
          progress={75}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Risk Distribution by Cluster</CardTitle>
            <CardDescription>Current nutrition risk levels across monitored regions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0E8C8" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: '#6B6B6B' }}
                  axisLine={{ stroke: '#F0E8C8' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6B6B6B' }}
                  axisLine={{ stroke: '#F0E8C8' }}
                />
                <Bar 
                  dataKey="risk" 
                  radius={[8, 8, 0, 0]}
                  fill={(entry) => entry.color}
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Risk Trend Analysis</CardTitle>
            <CardDescription>5-month trend of risk levels and interventions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0E8C8" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: '#6B6B6B' }}
                  axisLine={{ stroke: '#F0E8C8' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6B6B6B' }}
                  axisLine={{ stroke: '#F0E8C8' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="risk" 
                  stroke="#E94A7F" 
                  fill="#E94A7F" 
                  fillOpacity={0.3}
                  strokeWidth={3}
                />
                <Line 
                  type="monotone" 
                  dataKey="interventions" 
                  stroke="#6FBF44" 
                  strokeWidth={3}
                  dot={{ fill: '#6FBF44', strokeWidth: 2, r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Risk Overview and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Overview Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Risk Overview</CardTitle>
            <CardDescription>Population distribution by risk level</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-xs text-muted-foreground">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        {/* Interactive Map */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Geographic Risk Mapping</CardTitle>
              <CardDescription>Real-time nutrition risk clusters across Sub-Saharan Africa</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <MapIcon className="h-4 w-4" /> Full Screen
            </Button>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent">
              <div className="relative w-full h-full opacity-60">
                <div className="absolute top-16 left-24 w-20 h-16 bg-destructive/30 rounded-full blur-lg animate-pulse" />
                <div className="absolute bottom-16 right-32 w-24 h-20 bg-orange/30 rounded-full blur-lg animate-pulse" />
                <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-primary/20 border-2 border-primary/30 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                </div>
                <div className="absolute top-20 right-20 w-16 h-12 bg-primary/30 rounded-full blur-md animate-pulse" />
              </div>
            </div>
            <div className="z-10 text-center">
              <div className="bg-card/95 backdrop-blur-md p-4 rounded-xl border border-border/50 shadow-lg">
                <h3 className="font-semibold text-foreground mb-3">Active Monitoring</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-destructive rounded-full mx-auto mb-1"></div>
                    <span className="text-destructive font-medium block">High Risk</span>
                    <p className="text-xs text-muted-foreground">4 Clusters</p>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-orange rounded-full mx-auto mb-1"></div>
                    <span className="text-orange font-medium block">Medium Risk</span>
                    <p className="text-xs text-muted-foreground">6 Clusters</p>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-1"></div>
                    <span className="text-primary font-medium block">Low Risk</span>
                    <p className="text-xs text-muted-foreground">4 Clusters</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )

  const rightPanelContent = (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary/5 pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Beneficiary AI Insight
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center shrink-0">
              <User className="h-4 w-4 text-accent-foreground" />
            </div>
            <div className="bg-muted p-3 rounded-2xl rounded-tl-none text-sm">
              Logged: Maize, legumes, water. Missing: Vitamin A sources.
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-none text-sm max-w-[80%]">
              AI Suggestion: Incorporate locally available orange-fleshed sweet potatoes.
            </div>
          </div>
          <div className="pt-4 border-t border-border/50">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Cluster Avg. Diversity Score</span>
              <span>3.2 / 10</span>
            </div>
            <Progress value={32} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-accent/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Supply Optimization</CardTitle>
          <CardDescription>AI-driven resource routing</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Redistributing 500 units from Beta to Gamma</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>ETA: 4.5 hours (Optimal weather window)</span>
            </li>
          </ul>
          <Button variant="link" className="p-0 h-auto text-primary mt-4 font-semibold text-sm">
            View full logistics report
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const beneficiaryContent = (
    <div className="max-w-6xl mx-auto">
      <DashboardHeader
        title="Beneficiary AI Assistant"
        subtitle="Personal nutrition guidance powered by AI intelligence."
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Chat Interface */}
        <Card className="flex flex-col h-[600px]">
          <CardHeader className="border-b bg-muted/30 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-base">Nourishment AI Helper</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span> Active Assistance
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-primary/5 rounded-full">
                Bengali / English
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-6 space-y-6 overflow-y-auto">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Leaf className="h-4 w-4 text-primary" />
              </div>
              <div className="bg-muted p-4 rounded-2xl rounded-tl-none text-sm max-w-[85%] border border-border/50 shadow-sm">
                Hello! I am your Yellowsense nutrition assistant. What have you eaten today? You can describe it or upload a photo.
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-tr-none text-sm max-w-[85%] shadow-md">
                I had some rice and dal for lunch. I also had some clean water.
              </div>
              <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                <User className="h-4 w-4 text-accent-foreground" />
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Leaf className="h-4 w-4 text-primary" />
              </div>
              <div className="bg-muted p-4 rounded-2xl rounded-tl-none text-sm max-w-[85%] border border-border/50 shadow-sm space-y-3">
                <p>That is a good start! Rice provides energy and dal provides protein. However, you are missing micronutrients today.</p>
                <div className="bg-card p-3 rounded-lg border border-primary/20">
                  <p className="font-semibold text-primary mb-1">AI Recommendation:</p>
                  <p className="text-xs text-muted-foreground">
                    Try adding some **dark leafy greens** or **carrots** to your next meal. These are currently available in your local cluster market.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <div className="p-4 border-t bg-muted/10">
            <div className="relative">
              <Input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Describe your meal..."
                className="pr-12"
                onKeyDown={(e) => e.key === "Enter" && setChatMessage("")}
              />
              <Button
                size="icon-sm"
                className="absolute right-2 top-2 h-8 w-8"
                onClick={() => setChatMessage("")}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-[10px] text-center text-muted-foreground mt-2 italic">
              Yellowsense AI is processing 42,000 logs in your region today.
            </p>
          </div>
        </Card>

        {/* Personal Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Utensils className="h-5 w-5 text-primary" />
                Today's Nourishment Index
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center py-4">
                <div className="relative h-32 w-32">
                  <svg className="h-full w-full" viewBox="0 0 36 36">
                    <path
                      className="stroke-muted"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="stroke-primary"
                      strokeWidth="3"
                      strokeDasharray="42, 100"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-bold">42%</span>
                    <span className="text-[10px] text-muted-foreground uppercase">Score</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <p className="text-[10px] uppercase text-muted-foreground mb-1">Diversity</p>
                  <p className="font-bold">2/10</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <p className="text-[10px] uppercase text-muted-foreground mb-1">Frequency</p>
                  <p className="font-bold">1 Meal</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-destructive/5 border-l-4 border-l-destructive">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                <CardTitle className="text-lg">Early Warning Alert</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Your current nourishment trend indicates a **High Risk** of micronutrient deficiency within the next 7 days if your dietary diversity doesn't improve.
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground bg-card/50 p-3 rounded-lg border border-destructive/10">
                <Clock className="h-4 w-4" />
                <span>Forecast: 14-day risk window active</span>
              </div>
              <Button variant="destructive" className="w-full h-10 shadow-sm">
                Request Nutrition Support
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-green-50/50 border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                <CardTitle className="text-lg">AI Impact Forecast</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                By adding **1 portion of green vegetables** daily, your risk score will improve from 42% to **68%** within 10 days.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  return (
    <div className={`min-h-screen transition-all duration-1000 ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {activeTab === "dashboard" ? (
        <DashboardLayout
          sidebar={sidebarContent}
          rightPanel={rightPanelContent}
        >
          {dashboardContent}
        </DashboardLayout>
      ) : (
        <DashboardLayout sidebar={sidebarContent}>
          {beneficiaryContent}
        </DashboardLayout>
      )}
      
      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm py-6">
        <div className="container px-4 text-center space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            © 2025 Yellowsense Technologies. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60">AI Nourishment Intelligence System | Version 4.2.0-Alpha</p>
        </div>
      </footer>
    </div>
  )
}