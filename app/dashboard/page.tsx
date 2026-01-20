"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Shield,
  Activity,
  Users,
  AlertTriangle,
  TrendingUp,
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
  Mic,
  MicOff,
  ChevronDown,
  Globe,
  Calculator,
  Calendar,
  School,
  Apple,
  Bell,
  X,
  MapPin
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sidebar, SidebarHeader, SidebarContent, SidebarNavItem, SidebarFooter } from "@/components/ui/sidebar"
import { DashboardLayout, DashboardHeader } from "@/components/ui/dashboard-layout"
import { StatsCard } from "@/components/ui/stats-card"
import { Input } from "@/components/ui/input"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'

export default function YellowsenseDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [chatMessage, setChatMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [notifications, setNotifications] = useState([
    { id: 1, type: "critical", message: "High risk alert: Rajasthan cluster needs immediate intervention", time: "2 min ago" },
    { id: 2, type: "warning", message: "Medium risk detected in Bihar - monitoring required", time: "5 min ago" }
  ])
  const [expandedBeneficiary, setExpandedBeneficiary] = useState<string | null>(null)
  const [expandedState, setExpandedState] = useState(null)
  const [expandedCluster, setExpandedCluster] = useState(null)
  const [expandedRoute, setExpandedRoute] = useState(null)
  const [riskFormData, setRiskFormData] = useState({
    age: 25,
    mealFrequency: 2,
    proteinIntake: "medium",
    schoolAttendance: true
  })
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  const languages = [
    "English", "Hindi", "Bengali", "Tamil", "Telugu", "Marathi", 
    "Gujarati", "Kannada", "Malayalam", "Punjabi", "Odia", "Assamese", "Urdu"
  ]

  const indianStates = [
    { name: "Rajasthan", risk: 89, population: "280K", status: "critical" },
    { name: "Bihar", risk: 76, population: "320K", status: "high" },
    { name: "Uttar Pradesh", risk: 71, population: "450K", status: "high" },
    { name: "Madhya Pradesh", risk: 68, population: "210K", status: "medium" },
    { name: "Odisha", risk: 64, population: "180K", status: "medium" },
    { name: "Jharkhand", risk: 61, population: "150K", status: "medium" },
    { name: "West Bengal", risk: 45, population: "380K", status: "low" },
    { name: "Tamil Nadu", risk: 38, population: "290K", status: "low" },
    { name: "Kerala", risk: 32, population: "120K", status: "low" },
    { name: "Punjab", risk: 28, population: "95K", status: "low" }
  ]

  const indianFoods = [
    { name: "Roti", icon: "🫓", category: "Grains" },
    { name: "Dal", icon: "🍲", category: "Protein" },
    { name: "Rice", icon: "🍚", category: "Grains" },
    { name: "Sabzi", icon: "🥬", category: "Vegetables" },
    { name: "Curd", icon: "🥛", category: "Dairy" },
    { name: "Chapati", icon: "🫓", category: "Grains" }
  ]

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
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#6FBF44] via-[#F6A23A] to-[#E94A7F] flex items-center justify-center shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
          <Apple className="h-7 w-7 text-white drop-shadow-sm" />
        </div>
        <div>
          <h2 className="font-bold text-xl bg-gradient-to-r from-[#6FBF44] via-[#F6A23A] to-[#E94A7F] bg-clip-text text-transparent">Nourishment AI</h2>
          <p className="text-xs text-sidebar-foreground/60 font-medium">Intelligence System</p>
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
            active={activeTab === "warning"}
            onClick={() => setActiveTab("warning")}
          />
          <SidebarNavItem
            icon={<Calculator />}
            label="Risk Checker"
            active={activeTab === "riskchecker"}
            onClick={() => setActiveTab("riskchecker")}
          />
          <SidebarNavItem
            icon={<Zap />}
            label="Interventions"
            active={activeTab === "interventions"}
            onClick={() => setActiveTab("interventions")}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatsCard
          title="AI Accuracy"
          value="91%"
          subtitle="Prediction accuracy (NFHS5 data)"
          icon={<Brain />}
          progress={91}
          progressColor="primary"
        />
        <StatsCard
          title="Beneficiaries"
          value="5,000"
          subtitle="Across 20 Indian states"
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
          title="Prediction Window"
          value="14-30"
          subtitle="Days ahead forecasting"
          icon={<Clock />}
          progress={75}
        />
        <StatsCard
          title="AI Interventions"
          value="8"
          subtitle="Optimized supply routes active"
          icon={<BarChart3 />}
          progress={75}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <Bar dataKey="risk" radius={[8, 8, 0, 0]}>
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

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
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">India Risk Mapping</CardTitle>
              <CardDescription>Real-time nutrition risk clusters across 20 Indian states</CardDescription>
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
                <h3 className="font-semibold text-foreground mb-3">Active Monitoring - India</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-destructive rounded-full mx-auto mb-1"></div>
                    <span className="text-destructive font-medium block">High Risk</span>
                    <p className="text-xs text-muted-foreground">6 States</p>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-orange rounded-full mx-auto mb-1"></div>
                    <span className="text-orange font-medium block">Medium Risk</span>
                    <p className="text-xs text-muted-foreground">8 States</p>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-1"></div>
                    <span className="text-primary font-medium block">Low Risk</span>
                    <p className="text-xs text-muted-foreground">6 States</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-l-4 border-l-destructive shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-destructive/5 to-destructive/10">
          <div>
            <CardTitle className="text-xl text-destructive flex items-center gap-2">
              <AlertTriangle className="h-6 w-6" />
              High Risk Beneficiaries
            </CardTitle>
            <CardDescription>Individuals requiring immediate nutrition intervention</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="destructive" className="px-3 py-1 font-semibold">
              23 Critical
            </Badge>
            <Button variant="outline" size="sm" className="border-destructive/30 text-destructive hover:bg-destructive/10">
              Export List
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {[
              { 
                id: 'BEN-001', 
                name: 'Amara Kone', 
                age: 34, 
                location: 'Alpha-9', 
                risk: 94, 
                lastMeal: '18 hours ago', 
                deficiency: 'Protein, Iron',
                bmi: 16.2,
                status: 'Critical',
                contact: '+91 98765 43210',
                intervention: 'Emergency food packet dispatched'
              },
              { 
                id: 'BEN-002', 
                name: 'Ibrahim Diallo', 
                age: 28, 
                location: 'Delta-7', 
                risk: 89, 
                lastMeal: '12 hours ago', 
                deficiency: 'Vitamin A, Zinc',
                bmi: 17.1,
                status: 'High Risk',
                contact: '+91 98765 43211',
                intervention: 'Nutrition counseling scheduled'
              },
              { 
                id: 'BEN-003', 
                name: 'Fatou Traore', 
                age: 42, 
                location: 'Echo-5', 
                risk: 87, 
                lastMeal: '24 hours ago', 
                deficiency: 'Calories, B12',
                bmi: 15.8,
                status: 'Critical',
                contact: '+91 98765 43212',
                intervention: 'Medical referral pending'
              },
              { 
                id: 'BEN-004', 
                name: 'Moussa Camara', 
                age: 19, 
                location: 'Alpha-9', 
                risk: 85, 
                lastMeal: '15 hours ago', 
                deficiency: 'Iron, Folate',
                bmi: 16.9,
                status: 'High Risk',
                contact: '+91 98765 43213',
                intervention: 'Follow-up visit due'
              }
            ].map((beneficiary, index) => {
              const isExpanded = expandedBeneficiary === beneficiary.id
              return (
              <div key={beneficiary.id} className={`border-b border-destructive/10 hover:bg-destructive/5 cursor-pointer transition-all duration-200 ${index === 0 ? 'bg-destructive/5' : ''}`}
                   onClick={() => setExpandedBeneficiary(isExpanded ? null : beneficiary.id)}>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center shadow-md ${
                          beneficiary.status === 'Critical' ? 'bg-destructive/20 border-2 border-destructive/30' : 'bg-orange/20 border-2 border-orange/30'
                        }`}>
                          <User className={`h-5 w-5 ${
                            beneficiary.status === 'Critical' ? 'text-destructive' : 'text-orange'
                          }`} />
                        </div>
                        <div className={`absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                          beneficiary.status === 'Critical' ? 'bg-destructive animate-pulse' : 'bg-orange'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{beneficiary.name}</h4>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{beneficiary.age}y</span>
                          <span>{beneficiary.location}</span>
                          <span>{beneficiary.lastMeal}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${
                          beneficiary.status === 'Critical' ? 'text-destructive' : 'text-orange'
                        }`}>
                          {beneficiary.risk}%
                        </div>
                        <Badge variant={beneficiary.status === 'Critical' ? 'destructive' : 'secondary'} className="text-xs">
                          {beneficiary.status}
                        </Badge>
                      </div>
                      <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                        isExpanded ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-4 border-t border-destructive/10 bg-destructive/5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="bg-card/50 p-3 rounded-lg border border-border/50">
                        <p className="text-xs text-muted-foreground mb-1">Deficiencies</p>
                        <p className="font-medium text-sm">{beneficiary.deficiency}</p>
                      </div>
                      <div className="bg-card/50 p-3 rounded-lg border border-border/50">
                        <p className="text-xs text-muted-foreground mb-1">BMI Status</p>
                        <p className={`font-medium text-sm ${
                          beneficiary.bmi < 16 ? 'text-destructive' : beneficiary.bmi < 18.5 ? 'text-orange' : 'text-primary'
                        }`}>
                          {beneficiary.bmi} {beneficiary.bmi < 16 ? '(Severe)' : beneficiary.bmi < 18.5 ? '(Underweight)' : '(Normal)'}
                        </p>
                      </div>
                      <div className="bg-card/50 p-3 rounded-lg border border-border/50">
                        <p className="text-xs text-muted-foreground mb-1">Contact</p>
                        <p className="font-medium text-sm">{beneficiary.contact}</p>
                      </div>
                    </div>
                    
                    <div className={`p-3 rounded-lg border-l-4 ${
                      beneficiary.status === 'Critical' 
                        ? 'bg-destructive/5 border-l-destructive' 
                        : 'bg-orange/5 border-l-orange'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Current Intervention:</p>
                          <p className="text-xs text-muted-foreground">{beneficiary.intervention}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
                            Call
                          </Button>
                          <Button size="sm" className="h-8 px-3 text-xs">
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )})}
          </div>
          <div className="p-6 bg-gradient-to-r from-destructive/5 to-destructive/10 border-t border-destructive/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                  <span>4 Critical cases need immediate attention</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-orange" />
                  <span>19 High risk cases monitored</span>
                </div>
              </div>
              <Button variant="destructive" className="shadow-md">
                View All High Risk Beneficiaries (23)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            State-wise Risk Analytics
          </CardTitle>
          <CardDescription>Nutrition risk assessment across 20 Indian states</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {indianStates.slice(0, 6).map((state, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all ${
                  state.status === 'critical' ? 'bg-destructive/5 border-destructive/20' :
                  state.status === 'high' ? 'bg-destructive/5 border-destructive/20' :
                  state.status === 'medium' ? 'bg-orange/5 border-orange/20' :
                  'bg-primary/5 border-primary/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{state.name}</h4>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      state.status === 'critical' || state.status === 'high' ? 'border-destructive/20 text-destructive' :
                      state.status === 'medium' ? 'border-orange/20 text-orange' :
                      'border-primary/20 text-primary'
                    }`}
                  >
                    {state.risk}%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Population:</span>
                    <span className="font-medium">{state.population}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        state.status === 'critical' || state.status === 'high' ? 'bg-destructive' :
                        state.status === 'medium' ? 'bg-orange' : 'bg-primary'
                      }`}
                      style={{ width: `${state.risk}%` }}
                    />
                  </div>
                  <p className={`text-xs font-medium capitalize ${
                    state.status === 'critical' || state.status === 'high' ? 'text-destructive' :
                    state.status === 'medium' ? 'text-orange' : 'text-primary'
                  }`}>
                    {state.status} Risk
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t">
            <Button variant="outline" className="w-full">
              View All 20 States Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const warningContent = (
    <div className="space-y-8">
      <DashboardHeader
        title="Early Warning System"
        subtitle="Proactive alerts and intervention recommendations before nutrition crises develop."
        actions={
          <Badge variant="outline" className="px-4 py-2 bg-destructive/10 text-destructive border-destructive/20 rounded-full">
            12 Active Alerts
          </Badge>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Critical Alerts"
          value="4"
          subtitle="Immediate action required"
          icon={<AlertTriangle />}
          progress={100}
          progressColor="destructive"
        />
        <StatsCard
          title="Medium Risk"
          value="6"
          subtitle="Monitor closely"
          icon={<TrendingUp />}
          progress={60}
        />
        <StatsCard
          title="Low Risk"
          value="2"
          subtitle="Stable conditions"
          icon={<CheckCircle2 />}
          progress={20}
          progressColor="primary"
        />
        <StatsCard
          title="Response Time"
          value="2.3h"
          subtitle="Average alert response"
          icon={<Clock />}
          progress={85}
        />
      </div>

      <Card className="border-l-4 border-l-destructive">
        <CardHeader>
          <CardTitle className="text-lg text-destructive">Critical Risk Clusters</CardTitle>
          <CardDescription>Immediate intervention required</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: 'Alpha-9', risk: 92, population: '45K', eta: '6 hours' },
            { name: 'Delta-7', risk: 87, population: '32K', eta: '4 hours' },
            { name: 'Echo-5', risk: 83, population: '28K', eta: '8 hours' }
          ].map((cluster, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg">
              <div>
                <p className="font-semibold text-destructive">{cluster.name}</p>
                <p className="text-sm text-muted-foreground">{cluster.population} population</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-destructive">{cluster.risk}%</p>
                <p className="text-xs text-muted-foreground">ETA: {cluster.eta}</p>
              </div>
            </div>
          ))}
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
              <Badge variant="outline" className="bg-primary/5 rounded-full flex items-center gap-2 cursor-pointer hover:bg-primary/10 transition-colors" onClick={() => {}}>
                <Globe className="h-3 w-3" />
                {selectedLanguage}
                <ChevronDown className="h-3 w-3" />
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-6 space-y-6 overflow-y-auto">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Leaf className="h-4 w-4 text-primary" />
              </div>
              <div className="bg-muted p-4 rounded-2xl rounded-tl-none text-sm max-w-[85%] border border-border/50 shadow-sm">
                Hello! I am your Yellowsense nutrition assistant. What have you eaten today?
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-tr-none text-sm max-w-[85%] shadow-md">
                I had roti and dal for lunch. I also had some clean water.
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
                    Try adding some dark leafy greens or carrots to your next meal.
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
                placeholder="Describe your meal or tap mic to speak..."
                className="pr-20"
                onKeyDown={(e) => e.key === "Enter" && setChatMessage("")}
              />
              <div className="absolute right-2 top-2 flex gap-1">
                <Button
                  size="icon-sm"
                  variant={isRecording ? "destructive" : "outline"}
                  className="h-8 w-8"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button
                  size="icon-sm"
                  className="h-8 w-8"
                  onClick={() => setChatMessage("")}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {isRecording && (
              <div className="mt-2 flex items-center gap-2 text-sm text-destructive">
                <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                Recording in {selectedLanguage}...
              </div>
            )}
            <div className="mt-3">
              <p className="text-xs text-muted-foreground mb-2">Quick add Indian foods:</p>
              <div className="flex flex-wrap gap-2">
                {indianFoods.map((food, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 text-xs"
                    onClick={() => setChatMessage(prev => prev + (prev ? ", " : "") + food.name.toLowerCase())}
                  >
                    <span className="mr-1">{food.icon}</span>
                    {food.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

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
                Your current nourishment trend indicates a High Risk of micronutrient deficiency within the next 7 days.
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
                By adding 1 portion of green vegetables daily, your risk score will improve from 42% to 68% within 10 days.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const riskCheckerContent = (
    <div className="space-y-8">
      <DashboardHeader
        title="Risk Checker Tool"
        subtitle="Input age, meals, protein, attendance - AI generates risk score and recommendations."
        actions={
          <Badge variant="outline" className="px-4 py-2 bg-primary/10 text-primary border-primary/20 rounded-full">
            91% Accuracy
          </Badge>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Risk Assessment Form
            </CardTitle>
            <CardDescription>Enter beneficiary details for AI risk analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Age</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="80"
                  value={riskFormData.age}
                  onChange={(e) => setRiskFormData(prev => ({...prev, age: parseInt(e.target.value)}))}
                  className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-lg font-bold text-primary w-12">{riskFormData.age}y</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                Meal Frequency (per day)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map(num => (
                  <Button
                    key={num}
                    variant={riskFormData.mealFrequency === num ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRiskFormData(prev => ({...prev, mealFrequency: num}))}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Apple className="h-4 w-4" />
                Protein Intake Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["low", "medium", "high"].map(level => (
                  <Button
                    key={level}
                    variant={riskFormData.proteinIntake === level ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRiskFormData(prev => ({...prev, proteinIntake: level}))}
                    className="capitalize"
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <School className="h-4 w-4" />
                School Attendance
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={riskFormData.schoolAttendance ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRiskFormData(prev => ({...prev, schoolAttendance: true}))}
                >
                  Regular
                </Button>
                <Button
                  variant={!riskFormData.schoolAttendance ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRiskFormData(prev => ({...prev, schoolAttendance: false}))}
                >
                  Irregular
                </Button>
              </div>
            </div>

            <Button className="w-full h-12 text-base font-semibold">
              Generate Risk Score
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI Risk Analysis</CardTitle>
            <CardDescription>Real-time risk assessment and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-6">
              <div className="relative h-32 w-32 mx-auto mb-4">
                <svg className="h-full w-full" viewBox="0 0 36 36">
                  <path
                    className="stroke-muted"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="stroke-orange"
                    strokeWidth="3"
                    strokeDasharray="67, 100"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-orange">67%</span>
                  <span className="text-xs text-muted-foreground uppercase">Risk Score</span>
                </div>
              </div>
              <Badge variant="secondary" className="bg-orange/10 text-orange border-orange/20">
                Medium Risk
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-orange/5 rounded-lg border border-orange/20">
                <h4 className="font-semibold text-orange mb-2">AI Recommendations</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-orange mt-0.5 shrink-0" />
                    Increase meal frequency to 3 times daily
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-orange mt-0.5 shrink-0" />
                    Add protein-rich foods like dal, eggs, or milk
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-orange mt-0.5 shrink-0" />
                    Include green vegetables in daily diet
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <p className="text-xs uppercase text-muted-foreground mb-1">Prediction Window</p>
                  <p className="font-bold">14-30 Days</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <p className="text-xs uppercase text-muted-foreground mb-1">Confidence</p>
                  <p className="font-bold">91%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const interventionsContent = (
    <div className="space-y-8">
      <DashboardHeader
        title="AI Interventions"
        subtitle="Automated supply optimization and resource allocation powered by machine learning."
        actions={
          <Badge variant="outline" className="px-4 py-2 bg-primary/10 text-primary border-primary/20 rounded-full">
            8 Active Routes
          </Badge>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Routes"
          value="8"
          subtitle="AI-optimized supply chains"
          icon={<Zap />}
          progress={80}
          progressColor="primary"
        />
        <StatsCard
          title="Efficiency Gain"
          value="34%"
          subtitle="vs traditional routing"
          icon={<TrendingUp />}
          progress={34}
        />
        <StatsCard
          title="Resources Saved"
          value="$2.4M"
          subtitle="Cost optimization this quarter"
          icon={<BarChart3 />}
          progress={75}
        />
        <StatsCard
          title="Delivery Time"
          value="4.2h"
          subtitle="Average to high-risk areas"
          icon={<Clock />}
          progress={90}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Active Supply Routes</CardTitle>
          <CardDescription>Real-time AI-optimized logistics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { from: 'Central Hub A', to: 'Alpha-9', status: 'In Transit', eta: '2.5h', efficiency: '94%' },
            { from: 'Regional Depot', to: 'Delta-7', status: 'Loading', eta: '4.0h', efficiency: '87%' },
            { from: 'Emergency Stock', to: 'Echo-5', status: 'Dispatched', eta: '1.8h', efficiency: '96%' }
          ].map((route, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div>
                <p className="font-semibold">{route.from} → {route.to}</p>
                <p className="text-sm text-muted-foreground">{route.status} • ETA: {route.eta}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{route.efficiency}</p>
                <p className="text-xs text-muted-foreground">Efficiency</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className={`min-h-screen transition-all duration-1000 ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {/* Real-time Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg shadow-lg border backdrop-blur-sm animate-in slide-in-from-right-full duration-300 max-w-sm ${
              notification.type === 'critical' 
                ? 'bg-destructive/10 border-destructive/20 text-destructive' 
                : 'bg-orange/10 border-orange/20 text-orange'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-1 rounded-full ${
                notification.type === 'critical' ? 'bg-destructive/20' : 'bg-orange/20'
              }`}>
                <Bell className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{notification.message}</p>
                <p className="text-xs opacity-70 mt-1">{notification.time}</p>
              </div>
              <Button
                size="icon-sm"
                variant="ghost"
                className="h-6 w-6 opacity-70 hover:opacity-100"
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {activeTab === "dashboard" ? (
        <DashboardLayout
          sidebar={sidebarContent}
          rightPanel={rightPanelContent}
        >
          {dashboardContent}
        </DashboardLayout>
      ) : activeTab === "warning" ? (
        <DashboardLayout sidebar={sidebarContent}>
          {warningContent}
        </DashboardLayout>
      ) : activeTab === "riskchecker" ? (
        <DashboardLayout sidebar={sidebarContent}>
          {riskCheckerContent}
        </DashboardLayout>
      ) : activeTab === "interventions" ? (
        <DashboardLayout sidebar={sidebarContent}>
          {interventionsContent}
        </DashboardLayout>
      ) : (
        <DashboardLayout sidebar={sidebarContent}>
          {beneficiaryContent}
        </DashboardLayout>
      )}
      
      <footer className="border-t bg-card/50 backdrop-blur-sm py-6">
        <div className="container px-4 text-center space-y-2">
          <div className="flex justify-center items-center gap-4 mb-2">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
              Built on NFHS5 Data
            </Badge>
            <Badge variant="outline" className="bg-orange/5 text-orange border-orange/20">
              91% Prediction Accuracy
            </Badge>
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            © 2025 Yellowsense Technologies. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60">AI Nourishment Intelligence System | Version 4.2.0-Alpha</p>
        </div>
      </footer>
    </div>
  )
}