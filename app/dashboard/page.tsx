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
  MapPin,
  Lightbulb,
  ArrowRight,
  Sparkles
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
  const [riskResult, setRiskResult] = useState<{
    risk: number;
    level: string;
    color: string;
    recommendations: string[];
  } | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { type: 'ai', content: 'Hello! I\'m your personalized nutrition assistant. I can help you track your meals, provide dietary recommendations, and monitor your nutritional health. What would you like to discuss today?' },
    { type: 'user', content: 'I had roti and dal for lunch today. I also drank some clean water. Can you help me understand if this is enough?' },
    { type: 'ai', content: 'Great start! Roti provides carbohydrates for energy, and dal is an excellent source of plant-based protein. However, your meal is missing some key nutrients.' }
  ])
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const [voiceConversation, setVoiceConversation] = useState<Array<{type: string, content: string, timestamp: string}>>([])
  const [isVoicePlaying, setIsVoicePlaying] = useState(false)
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(-1)
  const [isVoiceRecording, setIsVoiceRecording] = useState(false)
  const [voiceLanguage, setVoiceLanguage] = useState("English")
  const [isConversationActive, setIsConversationActive] = useState(false)
  const [conversationTimeouts, setConversationTimeouts] = useState<NodeJS.Timeout[]>([])
  const playVoiceMessage = (message: string, index: number) => {
    if ('speechSynthesis' in window) {
      setIsVoicePlaying(true)
      setCurrentPlayingIndex(index)
      const utterance = new SpeechSynthesisUtterance(message)
      utterance.rate = 1.0
      utterance.pitch = 1.0
      utterance.volume = 0.9
      utterance.onend = () => {
        setIsVoicePlaying(false)
        setCurrentPlayingIndex(-1)
      }
      speechSynthesis.speak(utterance)
    }
  }
  
  const startVoiceConversation = () => {
    setIsVoiceRecording(true)
    setIsConversationActive(true)
    setConversationTimeouts([])
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setVoiceConversation([{ type: 'system', content: 'Speak now...', timestamp }])
    
    const timeout1 = setTimeout(() => {
      setIsVoiceRecording(false)
      const userMessage = 'Hello, I want to know about my nutrition'
      setVoiceConversation(prev => [...prev.filter((m: any) => m.type !== 'system'), 
        { type: 'user', content: userMessage, timestamp }])
      
      const timeout2 = setTimeout(() => {
        const aiResponse = 'Hi! I am Nourish AI, your voice nutrition assistant. I can help you track meals, analyze nutrition, and provide personalized recommendations. What would you like to know about your diet?'
        const newTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        setVoiceConversation(prev => [...prev, { type: 'ai', content: aiResponse, timestamp: newTimestamp }])
        
        // Play voice and wait for it to finish before continuing
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(aiResponse)
          utterance.rate = 1.0
          utterance.pitch = 1.0
          utterance.volume = 0.9
          utterance.onend = () => {
            const timeout3 = setTimeout(() => {
              setIsConversationActive(active => {
                if (active) continueConversation(1)
                return active
              })
            }, 2000)
            setConversationTimeouts(prev => [...prev, timeout3])
          }
          speechSynthesis.speak(utterance)
        } else {
          const timeout3 = setTimeout(() => {
            setIsConversationActive(active => {
              if (active) continueConversation(1)
              return active
            })
          }, 5000)
          setConversationTimeouts(prev => [...prev, timeout3])
        }
      }, 1500)
      setConversationTimeouts(prev => [...prev, timeout2])
    }, 3000)
    setConversationTimeouts([timeout1])
  }
  
  const continueConversation = (step: number) => {
    const conversations = [
      { user: 'I had roti and dal for breakfast. Is that healthy?', ai: 'That\'s a great combination! Roti provides complex carbohydrates for sustained energy, and dal is an excellent source of plant protein. However, to make it more nutritionally complete, I\'d suggest adding some vegetables like spinach or tomatoes, and maybe a glass of milk or some fruit.' },
      { user: 'What about lunch? I usually eat rice and curry', ai: 'Rice and curry is a staple and nutritious meal! The type of curry matters a lot. If it\'s vegetable curry with legumes, that\'s excellent. Try to include different colored vegetables for various vitamins and minerals. Adding a small portion of yogurt can provide probiotics for gut health.' },
      { user: 'I often skip dinner. Is that okay?', ai: 'Skipping dinner isn\'t ideal for your metabolism and nutrition. Your body needs consistent fuel throughout the day. For dinner, try something light but nutritious like vegetable soup with whole grain bread, or a small portion of khichdi with vegetables. This helps maintain stable blood sugar levels.' },
      { user: 'How much water should I drink daily?', ai: 'Great question! You should aim for 8-10 glasses of water daily, which is about 2-3 liters. In hot weather or if you\'re active, you might need more. You can also get hydration from foods like fruits, vegetables, and beverages like buttermilk or coconut water.' },
      { user: 'Thank you for the advice!', ai: 'You\'re very welcome! Remember, small consistent changes make a big difference in your nutrition. Feel free to ask me anytime about your meals, and I\'ll help you make healthier choices. Take care and eat well!' }
    ]
    
    if (step < conversations.length) {
      const timeout1 = setTimeout(() => {
        setIsConversationActive(active => {
          if (!active) return active
          setIsVoiceRecording(true)
          const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          setVoiceConversation(prev => [...prev, { type: 'system', content: 'Speak now...', timestamp }])
          
          const timeout2 = setTimeout(() => {
            setIsConversationActive(active => {
              if (!active) return active
              setIsVoiceRecording(false)
              const userMessage = conversations[step].user
              setVoiceConversation(prev => [...prev.filter((m: any) => m.type !== 'system'), 
                { type: 'user', content: userMessage, timestamp }])
              
              const timeout3 = setTimeout(() => {
                setIsConversationActive(active => {
                  if (!active) return active
                  const aiResponse = conversations[step].ai
                  const newTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  setVoiceConversation(prev => [...prev, { type: 'ai', content: aiResponse, timestamp: newTimestamp }])
                  
                  // Play voice and wait for it to finish before continuing
                  if ('speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance(aiResponse)
                    utterance.rate = 1.0
                    utterance.pitch = 1.0
                    utterance.volume = 0.9
                    utterance.onend = () => {
                      setIsConversationActive(active => {
                        if (!active) return active
                        if (step < conversations.length - 1) {
                          const timeout4 = setTimeout(() => continueConversation(step + 1), 2000)
                          setConversationTimeouts(prev => [...prev, timeout4])
                        } else {
                          // Conversation finished, reset to allow restart
                          const timeout4 = setTimeout(() => {
                            setVoiceConversation([])
                            setIsVoiceRecording(false)
                            setIsConversationActive(false)
                            setConversationTimeouts([])
                          }, 3000)
                          setConversationTimeouts(prev => [...prev, timeout4])
                        }
                        return active
                      })
                    }
                    speechSynthesis.speak(utterance)
                  } else {
                    if (step < conversations.length - 1) {
                      const timeout4 = setTimeout(() => continueConversation(step + 1), 6000)
                      setConversationTimeouts(prev => [...prev, timeout4])
                    } else {
                      // Conversation finished, reset to allow restart
                      const timeout4 = setTimeout(() => {
                        setVoiceConversation([])
                        setIsVoiceRecording(false)
                        setIsConversationActive(false)
                        setConversationTimeouts([])
                      }, 6000)
                      setConversationTimeouts(prev => [...prev, timeout4])
                    }
                  }
                  return active
                })
              }, 1500)
              setConversationTimeouts(prev => [...prev, timeout3])
              return active
            })
          }, 4000)
          setConversationTimeouts(prev => [...prev, timeout2])
          return active
        })
      }, 1000)
      setConversationTimeouts(prev => [...prev, timeout1])
    }
  }
  
  const stopVoiceConversation = () => {
    // Cancel all timeouts
    conversationTimeouts.forEach(timeout => clearTimeout(timeout))
    setConversationTimeouts([])
    
    // Stop speech synthesis
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
    }
    
    // Reset all states
    setVoiceConversation([])
    setIsVoiceRecording(false)
    setIsConversationActive(false)
  }
  
  const sendChatMessage = () => {
    if (!chatMessage.trim()) return
    setIsSendingMessage(true)
    setChatMessages(prev => [...prev, { type: 'user', content: chatMessage }])
    setChatMessage('')
    
    setTimeout(() => {
      const responses = [
        'Based on your meal, I recommend adding green vegetables like spinach or fenugreek leaves for iron and vitamins.',
        'Your protein intake looks good with dal! Consider adding a source of Vitamin C like lemon or tomato.',
        'This is a balanced meal foundation. Try including yogurt for probiotics and calcium.',
        'Great choice with roti and dal! Add some seasonal vegetables to make it more nutritionally complete.',
        'Your meal provides good energy and protein. Consider adding fruits for additional vitamins and fiber.'
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setChatMessages(prev => [...prev, { type: 'ai', content: randomResponse }])
      setIsSendingMessage(false)
    }, 1500)
  }
  
  const generateRiskAssessment = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const mockResults = [
        { risk: 23, level: "Low", color: "primary", recommendations: ["Maintain current diet", "Add seasonal fruits", "Continue regular meals"] },
        { risk: 45, level: "Medium", color: "orange", recommendations: ["Increase protein intake", "Add green vegetables", "Ensure 3 meals daily"] },
        { risk: 67, level: "Medium", color: "orange", recommendations: ["Increase meal frequency", "Add protein sources", "Include micronutrients"] },
        { risk: 78, level: "High", color: "destructive", recommendations: ["Immediate intervention needed", "Add high-protein foods", "Medical consultation required"] },
        { risk: 89, level: "Critical", color: "destructive", recommendations: ["Emergency intervention", "Immediate medical attention", "Nutritional supplements required"] }
      ]
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]
      setRiskResult(randomResult)
      setIsGenerating(false)
    }, 2000)
  }
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
          <h2 className="font-bold text-xl bg-gradient-to-r from-[#6FBF44] via-[#F6A23A] to-[#E94A7F] bg-clip-text text-transparent">Nourish AI</h2>
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
          <SidebarNavItem
            icon={<Calculator />}
            label="Risk Checker"
            active={activeTab === "riskchecker"}
            onClick={() => setActiveTab("riskchecker")}
          />
          <SidebarNavItem
            icon={<Target />}
            label="Early Warning & Voice Nudges"
            active={activeTab === "warning"}
            onClick={() => setActiveTab("warning")}
          />
          <SidebarNavItem
            icon={<Mic />}
            label="Voice Bot"
            active={activeTab === "voicebot"}
            onClick={() => setActiveTab("voicebot")}
          />
        </div>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start gap-3 text-sm font-medium bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/15 border-primary/20 text-primary hover:text-primary transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => router.push('/')}
          >
            <Home className="h-4 w-4" />
            Back to Home
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-6">
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                  <span className="text-xs sm:text-sm">4 Critical cases</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-orange" />
                  <span className="text-xs sm:text-sm">19 High risk</span>
                </div>
              </div>
              <Button variant="destructive" className="shadow-md text-xs sm:text-sm w-full sm:w-auto">
                <span className="hidden sm:inline">View All High Risk Beneficiaries (23)</span>
                <span className="sm:hidden">View All (23)</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
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
        title="Early Warning & Voice Nudges"
        subtitle="Proactive alerts and intervention recommendations before nutrition crises develop, enhanced with intelligent voice nudges."
        actions={
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-4 py-2 bg-destructive/10 text-destructive border-destructive/20 rounded-full animate-pulse">
              <AlertTriangle className="h-4 w-4 mr-2" /> 12 Active Alerts
            </Badge>
            <Button variant="outline" size="sm" className="gap-2">
              <Bell className="h-4 w-4" />
              Alert Settings
            </Button>
          </div>
        }
      />

      {/* Voice Nudges Section */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-primary">
            <Mic className="h-5 w-5" />
            Voice Nudges System
          </CardTitle>
          <CardDescription className="text-muted-foreground">AI-powered voice interventions for behavioral change</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground mb-3">What are Voice Nudges?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Voice nudges are personalized audio messages delivered at optimal times to encourage positive nutrition behaviors. 
                Using behavioral psychology and AI timing, these gentle reminders help beneficiaries make better food choices.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Meal timing reminders</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Hydration prompts</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Nutritional education snippets</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Motivational health messages</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground mb-3">Smart Delivery</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-card/50 rounded-lg border border-border/50">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium text-foreground">Optimal Timing</p>
                  <p className="text-xs text-muted-foreground">AI-predicted moments</p>
                </div>
                <div className="text-center p-3 bg-card/50 rounded-lg border border-border/50">
                  <Globe className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium text-foreground">Multi-language</p>
                  <p className="text-xs text-muted-foreground">13 Indian languages</p>
                </div>
                <div className="text-center p-3 bg-card/50 rounded-lg border border-border/50">
                  <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium text-foreground">Personalized</p>
                  <p className="text-xs text-muted-foreground">Individual profiles</p>
                </div>
                <div className="text-center p-3 bg-card/50 rounded-lg border border-border/50">
                  <Brain className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium text-foreground">Adaptive</p>
                  <p className="text-xs text-muted-foreground">Learning system</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-destructive shadow-lg">
          <CardHeader className="bg-gradient-to-r from-destructive/5 to-destructive/10">
            <CardTitle className="text-lg text-destructive flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 animate-pulse" />
              Malnutrition Early Warning Indicators
            </CardTitle>
            <CardDescription>Key signs and symptoms to monitor for early intervention</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-4">
              <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Physical Warning Signs
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Rapid weight loss or failure to gain weight</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Visible ribs, spine, or hip bones</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Swelling in legs, feet, or face</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Hair changes (thinning, color loss, brittle)</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Behavioral Warning Signs
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Decreased energy and activity levels</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Irritability or mood changes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Difficulty concentrating or learning</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Frequent infections or slow healing</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
            <CardTitle className="text-lg text-primary flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Prevention & Early Intervention
            </CardTitle>
            <CardDescription>Proactive measures to prevent malnutrition</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-4">
              <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-primary" />
                  Nutritional Interventions
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span>Increase meal frequency to 4-6 times daily</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span>Add protein-rich foods (dal, eggs, milk)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span>Include iron-rich foods (green leafy vegetables)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span>Ensure adequate hydration (8-10 glasses water)</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Monitoring Schedule
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Weekly weight monitoring</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Monthly growth assessment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Quarterly health check-ups</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Immediate medical referral if critical</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-primary">
            <Brain className="h-5 w-5" />
            AI Prediction Model
          </CardTitle>
          <CardDescription>Machine learning insights and forecasting accuracy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-primary mb-1">Prediction Accuracy</h4>
              <p className="text-3xl font-bold text-primary">94.2%</p>
              <p className="text-xs text-muted-foreground">Based on NFHS5 data</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-orange/20 flex items-center justify-center mx-auto mb-3">
                <Zap className="h-8 w-8 text-orange" />
              </div>
              <h4 className="font-semibold text-orange mb-1">Early Detection</h4>
              <p className="text-3xl font-bold text-orange">14-30</p>
              <p className="text-xs text-muted-foreground">Days ahead warning</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-green-600 mb-1">Prevention Rate</h4>
              <p className="text-3xl font-bold text-green-600">87%</p>
              <p className="text-xs text-muted-foreground">Crisis prevention success</p>
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
    <div className="space-y-8">
      <DashboardHeader
        title="Beneficiary AI Assistant"
        subtitle="Personalized nutrition guidance powered by advanced AI intelligence and multilingual support."
        actions={
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-4 py-2 bg-primary/10 text-primary border-primary/20 rounded-full flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Active
            </Badge>
            <Button variant="outline" size="sm" className="gap-2">
              <Globe className="h-4 w-4" />
              Language Settings
            </Button>
          </div>
        }
      />
      
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Voice Chat Interface */}
        <div className="xl:col-span-3">
          <Card className="shadow-xl border-2 border-primary/20 h-[700px] flex flex-col">
            <CardHeader className="border-b bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">Nourish AI Helper</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span>Active Assistance in {selectedLanguage}</span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <select 
                      value={selectedLanguage} 
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="bg-primary/5 rounded-full flex items-center gap-2 cursor-pointer hover:bg-primary/10 transition-colors px-3 py-1 border border-primary/20 text-sm appearance-none pr-8"
                    >
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                    <ChevronDown className="h-3 w-3 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-primary" />
                  </div>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Users className="h-3 w-3" />
                    History
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 p-0 overflow-hidden">
              <div className="h-full flex flex-col">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-muted/20 to-muted/10">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center shrink-0 shadow-md">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none text-sm max-w-[85%] border border-primary/20 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="font-semibold text-primary">AI Assistant</span>
                      </div>
                      <p>Hello! I'm your personalized nutrition assistant. I can help you track your meals, provide dietary recommendations, and monitor your nutritional health. What would you like to discuss today?</p>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end">
                    <div className="bg-gradient-to-br from-primary to-primary/90 text-white p-4 rounded-2xl rounded-tr-none text-sm max-w-[85%] shadow-md">
                      I had roti and dal for lunch today. I also drank some clean water. Can you help me understand if this is enough?
                    </div>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shrink-0 shadow-md">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center shrink-0 shadow-md">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none text-sm max-w-[85%] border border-primary/20 shadow-sm space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="h-4 w-4 text-orange" />
                        <span className="font-semibold text-orange">Nutritional Analysis</span>
                      </div>
                      <p>Great start! Roti provides carbohydrates for energy, and dal is an excellent source of plant-based protein. However, your meal is missing some key nutrients.</p>
                      
                      <div className="bg-gradient-to-r from-orange/10 to-orange/5 p-3 rounded-lg border border-orange/20">
                        <h4 className="font-semibold text-orange mb-2 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          AI Recommendations
                        </h4>
                        <ul className="space-y-1 text-xs">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                            Add green vegetables (spinach, fenugreek leaves)
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                            Include a source of Vitamin C (lemon, tomato)
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                            Consider adding yogurt for probiotics
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-blue-700">Nutritional Completeness</span>
                          <span className="text-sm font-bold text-blue-700">65%</span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full w-2/3 transition-all duration-1000"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Input Area */}
                <div className="border-t bg-white p-4">
                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Describe your meal, ask nutrition questions, or tap mic to speak..."
                        className="pr-24 h-12 text-sm border-2 border-primary/20 focus:border-primary/40"
                        onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                      />
                      <div className="absolute right-2 top-2 flex gap-1">
                        <Button
                          size="sm"
                          variant={isRecording ? "destructive" : "outline"}
                          className="h-8 w-8 p-0"
                          onClick={() => setIsRecording(!isRecording)}
                        >
                          {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        </Button>
                        <Button
                          size="sm"
                          className="h-8 w-8 p-0 bg-gradient-to-r from-primary to-primary/80"
                          onClick={sendChatMessage}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {isRecording && (
                      <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/5 p-2 rounded-lg">
                        <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                        <span>Recording in {selectedLanguage}... Speak clearly about your meals</span>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-xs text-muted-foreground mb-2 font-medium">Quick add Indian foods:</p>
                      <div className="flex flex-wrap gap-2">
                        {indianFoods.map((food, i) => (
                          <Button
                            key={i}
                            variant="outline"
                            size="sm"
                            className="h-8 px-3 text-xs hover:bg-primary/10 border-primary/20"
                            onClick={() => setChatMessage(prev => prev + (prev ? ", " : "") + food.name.toLowerCase())}
                          >
                            {food.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Panel */}
        <div className="space-y-6">
          <Card className="shadow-xl border-2 border-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-primary/20">
              <CardTitle className="text-lg flex items-center gap-2">
                <Utensils className="h-5 w-5 text-primary" />
                Today's Nutrition Score
              </CardTitle>
              <CardDescription>Real-time nutritional assessment</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <div className="relative h-32 w-32 mx-auto mb-4">
                  <svg className="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="stroke-muted"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="stroke-primary"
                      strokeWidth="3"
                      strokeDasharray="65, 100"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-primary">65%</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Complete</span>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-4 py-2 font-semibold">
                  Good Progress
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 text-center">
                  <Apple className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <p className="text-xs uppercase text-green-600 mb-1 tracking-wide font-medium">Diversity</p>
                  <p className="font-bold text-lg text-green-700">4/10</p>
                  <p className="text-xs text-green-600">Food Groups</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 text-center">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-xs uppercase text-blue-600 mb-1 tracking-wide font-medium">Frequency</p>
                  <p className="font-bold text-lg text-blue-700">2</p>
                  <p className="text-xs text-blue-600">Meals Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-destructive/5 to-destructive/10 border-2 border-destructive/20 shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                <CardTitle className="text-lg">Nutrition Alert</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Your current meal pattern shows potential micronutrient gaps. Consider adding more variety to your diet.
              </p>
              <div className="bg-white/50 p-3 rounded-lg border border-destructive/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-destructive" />
                  <span className="text-sm font-medium text-destructive">Risk Window</span>
                </div>
                <p className="text-xs text-muted-foreground">7-day nutritional deficiency forecast active</p>
              </div>
              <Button variant="destructive" className="w-full h-10 shadow-sm font-semibold">
                Get Nutrition Plan
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-2 text-green-700">
                <TrendingUp className="h-5 w-5" />
                <CardTitle className="text-lg">AI Impact Forecast</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-800 mb-4">
                By following AI recommendations, your nutrition score could improve to 85% within 10 days.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-700">Current Score</span>
                  <span className="font-bold text-green-700">65%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-700">Projected Score</span>
                  <span className="font-bold text-green-700">85%</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full w-4/5 transition-all duration-1000"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const riskCheckerContent = (
    <div className="space-y-8">
      <DashboardHeader
        title="Risk Assessment Tool"
        subtitle="AI-powered nutrition risk analysis with personalized recommendations and intervention planning."
        actions={
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-4 py-2 bg-primary/10 text-primary border-primary/20 rounded-full flex items-center gap-2">
              <Target className="h-4 w-4" />
              91% Accuracy
            </Badge>
            <Button variant="outline" size="sm" className="gap-2">
              <Users className="h-4 w-4" />
              Bulk Assessment
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Assessment Form */}
        <div className="xl:col-span-2">
          <Card className="shadow-xl border-2 border-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-b border-primary/20">
              <CardTitle className="text-xl flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Calculator className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">Risk Assessment Form</h3>
                  <p className="text-sm text-muted-foreground font-normal">Complete beneficiary profile for AI analysis</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              {/* Age Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-base font-semibold flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    Age Assessment
                  </label>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">{riskFormData.age}</span>
                    <span className="text-sm text-muted-foreground ml-1">years</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
                  <input
                    type="range"
                    min="1"
                    max="80"
                    value={riskFormData.age}
                    onChange={(e) => setRiskFormData(prev => ({...prev, age: parseInt(e.target.value)}))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-blue-600 mt-2 font-medium">
                    <span>Infant (1y)</span>
                    <span>Adult (40y)</span>
                    <span>Senior (80y)</span>
                  </div>
                </div>
              </div>

              {/* Meal Frequency Section */}
              <div className="space-y-4">
                <label className="text-base font-semibold flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <Utensils className="h-4 w-4 text-orange-600" />
                  </div>
                  Daily Meal Frequency
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { num: 1, label: "Once", desc: "Single meal", tooltip: "High Risk: Only one meal per day increases malnutrition risk" },
                    { num: 2, label: "Twice", desc: "Two meals", tooltip: "Medium Risk: Two meals provide basic nutrition but may be insufficient" },
                    { num: 3, label: "Thrice", desc: "Three meals", tooltip: "Low Risk: Three meals per day meets most nutritional requirements" },
                    { num: 4, label: "Four+", desc: "Multiple", tooltip: "Optimal: Multiple meals ensure consistent nutrition throughout the day" }
                  ].map(({num, label, desc, tooltip}) => (
                    <div key={num} className="relative group">
                      <Button
                        variant={riskFormData.mealFrequency === num ? "default" : "outline"}
                        onClick={() => setRiskFormData(prev => ({...prev, mealFrequency: num}))}
                        className={`h-14 w-full flex flex-col gap-1 p-2 text-center ${
                          riskFormData.mealFrequency === num 
                            ? 'bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg' 
                            : 'hover:bg-orange-50 border-orange-200'
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          <Utensils className="h-4 w-4" />
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-semibold">{label}</p>
                          <p className="text-xs opacity-70">{desc}</p>
                        </div>
                      </Button>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        {tooltip}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Protein Intake Section */}
              <div className="space-y-4">
                <label className="text-base font-semibold flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Apple className="h-4 w-4 text-green-600" />
                  </div>
                  Protein Intake Level
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { 
                      level: "low", 
                      icon: AlertTriangle, 
                      color: "red", 
                      title: "Minimal", 
                      desc: "Rarely protein foods",
                      tooltip: "Minimal Protein: Rarely consumes protein-rich foods like dal or legumes"
                    },
                    { 
                      level: "medium", 
                      icon: Activity, 
                      color: "orange", 
                      title: "Moderate", 
                      desc: "Limited protein intake",
                      tooltip: "Moderate Protein: Regular but limited protein intake - daily dal, occasional eggs/milk"
                    },
                    { 
                      level: "high", 
                      icon: CheckCircle2, 
                      color: "green", 
                      title: "Adequate", 
                      desc: "Diverse protein sources",
                      tooltip: "Adequate Protein: Consistent diverse protein sources - dal, eggs, milk, meat, nuts"
                    }
                  ].map(({level, icon: Icon, color, title, desc, tooltip}) => (
                    <div key={level} className="relative group">
                      <Button
                        variant={riskFormData.proteinIntake === level ? "default" : "outline"}
                        onClick={() => setRiskFormData(prev => ({...prev, proteinIntake: level}))}
                        className={`h-16 w-full flex flex-col gap-1 p-3 text-center ${
                          riskFormData.proteinIntake === level 
                            ? 'bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg' 
                            : `hover:bg-${color}-50 border-${color}-200`
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          <Icon className={`h-4 w-4 ${
                            riskFormData.proteinIntake === level ? 'text-white' : `text-${color}-500`
                          }`} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold">{title}</p>
                          <p className="text-xs opacity-70">{desc}</p>
                        </div>
                      </Button>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        {tooltip}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* School Attendance Section */}
              <div className="space-y-4">
                <label className="text-base font-semibold flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <School className="h-4 w-4 text-purple-600" />
                  </div>
                  School Attendance Pattern
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative group">
                    <Button
                      variant={riskFormData.schoolAttendance ? "default" : "outline"}
                      onClick={() => setRiskFormData(prev => ({...prev, schoolAttendance: true}))}
                      className={`h-14 w-full flex flex-col gap-1 p-3 ${
                        riskFormData.schoolAttendance 
                          ? 'bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg' 
                          : 'hover:bg-green-50 border-green-200'
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        <CheckCircle2 className={`h-4 w-4 ${
                          riskFormData.schoolAttendance ? 'text-white' : 'text-green-500'
                        }`} />
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-semibold">Regular</p>
                        <p className="text-xs opacity-70">School participation</p>
                      </div>
                    </Button>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                      Regular Attendance: Consistent school participation with access to mid-day meals
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                  <div className="relative group">
                    <Button
                      variant={!riskFormData.schoolAttendance ? "default" : "outline"}
                      onClick={() => setRiskFormData(prev => ({...prev, schoolAttendance: false}))}
                      className={`h-14 w-full flex flex-col gap-1 p-3 ${
                        !riskFormData.schoolAttendance 
                          ? 'bg-gradient-to-br from-orange to-orange/80 text-white shadow-lg' 
                          : 'hover:bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        <X className={`h-4 w-4 ${
                          !riskFormData.schoolAttendance ? 'text-white' : 'text-red-500'
                        }`} />
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-semibold">Irregular</p>
                        <p className="text-xs opacity-70">Limited participation</p>
                      </div>
                    </Button>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                      Irregular Attendance: Inconsistent school participation with limited meal program access
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <div className="pt-4">
                <Button 
                  onClick={generateRiskAssessment}
                  disabled={isGenerating}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl flex items-center gap-3"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="h-6 w-6" />
                      Generate AI Risk Assessment
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          <Card className="shadow-xl border-2 border-orange/20">
            <CardHeader className="bg-gradient-to-r from-orange/5 to-orange/10 border-b border-orange/20">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-orange/20 flex items-center justify-center">
                  <Brain className="h-4 w-4 text-orange" />
                </div>
                AI Risk Analysis
              </CardTitle>
              <CardDescription>Real-time assessment results</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <div className="relative h-32 w-32 mx-auto mb-4">
                  <svg className="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="stroke-muted"
                      strokeWidth="4"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={`stroke-${riskResult?.color || 'orange'}`}
                      strokeWidth="4"
                      strokeDasharray={`${riskResult?.risk || 67}, 100`}
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-bold text-${riskResult?.color || 'orange'}`}>{riskResult?.risk || 67}%</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Risk Score</span>
                  </div>
                </div>
                <Badge variant="secondary" className={`bg-${riskResult?.color || 'orange'}/10 text-${riskResult?.color || 'orange'} border-${riskResult?.color || 'orange'}/20 px-4 py-2 font-semibold`}>
                  {riskResult?.level || "Medium"} Risk Level
                </Badge>
              </div>

              <div className="space-y-4">
                <div className={`p-4 bg-${riskResult?.color || 'orange'}/5 rounded-xl border border-${riskResult?.color || 'orange'}/20`}>
                  <h4 className={`font-bold text-${riskResult?.color || 'orange'} mb-3 flex items-center gap-2`}>
                    <Lightbulb className="h-4 w-4" />
                    AI Recommendations
                  </h4>
                  <ul className="space-y-3 text-sm">
                    {(riskResult?.recommendations || ["Increase meal frequency to 3 times daily", "Add protein-rich foods like dal, eggs, or milk", "Include green vegetables in daily diet"]).map((rec, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`h-5 w-5 rounded-full bg-${riskResult?.color || 'orange'}/20 flex items-center justify-center mt-0.5`}>
                          <CheckCircle2 className={`h-3 w-3 text-${riskResult?.color || 'orange'}`} />
                        </div>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-card/50 rounded-xl border border-border/50 text-center">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs uppercase text-muted-foreground mb-1 tracking-wide">Prediction Window</p>
                    <p className="font-bold text-lg">14-30</p>
                    <p className="text-xs text-muted-foreground">Days</p>
                  </div>
                  <div className="p-4 bg-card/50 rounded-xl border border-border/50 text-center">
                    <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs uppercase text-muted-foreground mb-1 tracking-wide">Confidence</p>
                    <p className="font-bold text-lg text-primary">91%</p>
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-green-700">
                <BarChart3 className="h-5 w-5" />
                Risk Factor Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { factor: 'Age Factor', impact: 25, color: 'bg-blue-500', icon: User },
                  { factor: 'Meal Frequency', impact: 35, color: 'bg-orange-500', icon: Utensils },
                  { factor: 'Protein Intake', impact: 30, color: 'bg-green-500', icon: Apple },
                  { factor: 'School Attendance', impact: 10, color: 'bg-purple-500', icon: School }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 text-green-700" />
                        <span className="text-sm font-medium text-green-800">{item.factor}</span>
                      </div>
                      <span className="text-sm font-bold text-green-700">{item.impact}%</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div 
                        className={`${item.color} h-2 rounded-full transition-all duration-1000`} 
                        style={{width: `${item.impact}%`}} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const voiceBotContent = (
    <div className="space-y-8">
      <DashboardHeader
        title="Voice AI Assistant"
        subtitle="Hands-free nutrition guidance with advanced voice recognition and natural language processing."
        actions={
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-4 py-2 bg-green-500/10 text-green-600 border-green-500/20 rounded-full flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Voice Active
            </Badge>
            <Button variant="outline" size="sm" className="gap-2">
              <Mic className="h-4 w-4" />
              Settings
            </Button>
          </div>
        }
      />

      {/* Smart Mode Detection Feature */}
      <Card className="shadow-xl border-2 border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-primary/20">
          <CardTitle className="text-xl flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold flex items-center gap-2">
                🤖 AI-Powered Conversations
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-2 py-1 text-xs">
                  Gemini AI
                </Badge>
              </h3>
              <p className="text-sm text-muted-foreground font-normal">Smart Mode Detection with Context Awareness</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
                <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Smart Mode Detection
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  AI automatically detects conversation type and adapts responses for optimal nutrition guidance:
                </p>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border/50">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">Guided Nutritional Assessment</p>
                      <p className="text-xs text-muted-foreground">Structured meal evaluation & scoring</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border/50">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">Open Conversational Advice</p>
                      <p className="text-xs text-muted-foreground">Natural dialogue & recommendations</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border/50">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">Health Symptom Tracking</p>
                      <p className="text-xs text-muted-foreground">Monitor wellness indicators</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border/50">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <School className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">Educational Content</p>
                      <p className="text-xs text-muted-foreground">Interactive learning sessions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-card/50 rounded-xl border border-border/50 text-center">
                  <Zap className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <p className="font-bold text-foreground">Gemini AI</p>
                  <p className="text-xs text-muted-foreground">Smart context-aware responses</p>
                </div>
                <div className="p-4 bg-card/50 rounded-xl border border-border/50 text-center">
                  <Brain className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <p className="font-bold text-foreground">Full Context</p>
                  <p className="text-xs text-muted-foreground">Remembers conversation history</p>
                </div>
                <div className="p-4 bg-card/50 rounded-xl border border-border/50 text-center">
                  <Globe className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <p className="font-bold text-foreground">Multi-language</p>
                  <p className="text-xs text-muted-foreground">13 Indian languages</p>
                </div>
                <div className="p-4 bg-card/50 rounded-xl border border-border/50 text-center">
                  <Activity className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <p className="font-bold text-foreground">Continuous</p>
                  <p className="text-xs text-muted-foreground">Never resets dialogue</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Intelligent Features</h4>
                    <p className="text-xs text-muted-foreground">Advanced AI capabilities</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Smart food detection from voice</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Real-time nutrition analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Personalized recommendations</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Behavioral pattern learning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <Card className="shadow-xl border-2 border-green-500/20 h-[600px] flex flex-col">
            <CardHeader className="border-b bg-gradient-to-r from-green-500/5 via-green-500/10 to-green-500/5 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                    <Mic className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">Nourish Voice AI</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span>Speaking in {voiceLanguage}</span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select 
                    value={voiceLanguage} 
                    onChange={(e) => setVoiceLanguage(e.target.value)}
                    className="bg-green-500/5 text-green-600 border-green-500/20 px-3 py-1 rounded-full text-sm"
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                  <Badge variant="outline" className="bg-green-500/5 text-green-600 border-green-500/20 px-3 py-1">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Smart Bot
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 p-0 overflow-hidden">
              <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-green-50/30 to-green-100/20">
                  {voiceConversation.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/30 flex items-center justify-center mx-auto mb-4">
                          <Mic className="h-10 w-10 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-green-700 mb-2">Ready to Chat</h3>
                        <p className="text-sm text-green-600">Tap the microphone to start your voice conversation</p>
                      </div>
                    </div>
                  ) : (
                    voiceConversation.map((msg, i) => (
                      <div key={i} className={`flex gap-4 ${msg.type === 'user' ? 'justify-end' : msg.type === 'system' ? 'justify-center' : ''}`}>
                        {msg.type === 'ai' && (
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/30 flex items-center justify-center shrink-0 shadow-md">
                            <Mic className="h-5 w-5 text-green-600" />
                          </div>
                        )}
                        {msg.type === 'system' ? (
                          <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">{msg.content}</span>
                          </div>
                        ) : (
                          <div className={`p-4 rounded-2xl text-sm max-w-[85%] shadow-sm relative group ${
                            msg.type === 'ai' 
                              ? 'bg-white border border-green-500/20 rounded-tl-none' 
                              : 'bg-gradient-to-br from-green-500 to-green-600 text-white rounded-tr-none'
                          }`}>
                            {msg.type === 'ai' && (
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Sparkles className="h-4 w-4 text-green-600" />
                                  <span className="font-semibold text-green-600">Voice AI</span>
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => playVoiceMessage(msg.content, i)}
                                  disabled={isVoicePlaying}
                                >
                                  {currentPlayingIndex === i && isVoicePlaying ? (
                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-600"></div>
                                  ) : (
                                    <Mic className="h-3 w-3 text-green-600" />
                                  )}
                                </Button>
                              </div>
                            )}
                            <p>{msg.content}</p>
                            <div className="text-xs opacity-70 mt-2">{msg.timestamp}</div>
                          </div>
                        )}
                        {msg.type === 'user' && (
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0 shadow-md">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
                
                <div className="border-t bg-white p-4">
                  <div className="flex items-center justify-center gap-4">
                    {!isConversationActive ? (
                      <Button
                        size="lg"
                        className="h-16 w-16 rounded-full shadow-xl transition-all bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                        onClick={startVoiceConversation}
                      >
                        <Mic className="h-8 w-8" />
                      </Button>
                    ) : (
                      <Button
                        size="lg"
                        variant="destructive"
                        className="h-16 w-16 rounded-full shadow-xl transition-all bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                        onClick={stopVoiceConversation}
                      >
                        <X className="h-8 w-8" />
                      </Button>
                    )}
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">
                        {isConversationActive ? 'Conversation in progress... Click X to stop' : 'Tap to start voice conversation'}
                      </p>
                      <p className="text-xs text-muted-foreground">Supports 13 Indian languages • Natural speech speed</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Panel */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-primary">
                <Activity className="h-5 w-5" />
                Voice Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Recognition Accuracy</span>
                  <span className="font-bold text-primary">98%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full w-[98%] transition-all duration-1000"></div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-card/50 rounded-lg border border-border/50">
                    <p className="text-2xl font-bold text-primary">2.4K</p>
                    <p className="text-xs text-muted-foreground">Daily Chats</p>
                  </div>
                  <div className="text-center p-3 bg-card/50 rounded-lg border border-border/50">
                    <p className="text-2xl font-bold text-primary">0.8s</p>
                    <p className="text-xs text-muted-foreground">Avg Response</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const interventionsContent = (
    <div className="space-y-8">
      <DashboardHeader
        title="AI Interventions"
        subtitle="Automated supply optimization and resource allocation powered by machine learning."
        actions={
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-4 py-2 bg-primary/10 text-primary border-primary/20 rounded-full flex items-center gap-2">
              <Zap className="h-4 w-4" />
              8 Active Routes
            </Badge>
            <Button variant="outline" size="sm" className="gap-2">
              <MapIcon className="h-4 w-4" />
              Route Optimizer
            </Button>
          </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-2 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Active Supply Routes
            </CardTitle>
            <CardDescription>Real-time AI-optimized logistics</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {[
                { 
                  from: 'Central Hub A', 
                  to: 'Alpha-9', 
                  status: 'In Transit', 
                  eta: '2.5h', 
                  efficiency: '94%', 
                  priority: 'Critical',
                  supplies: '500 units',
                  driver: 'Raj Kumar'
                },
                { 
                  from: 'Regional Depot', 
                  to: 'Delta-7', 
                  status: 'Loading', 
                  eta: '4.0h', 
                  efficiency: '87%', 
                  priority: 'High',
                  supplies: '320 units',
                  driver: 'Priya Singh'
                },
                { 
                  from: 'Emergency Stock', 
                  to: 'Echo-5', 
                  status: 'Dispatched', 
                  eta: '1.8h', 
                  efficiency: '96%', 
                  priority: 'Critical',
                  supplies: '750 units',
                  driver: 'Ahmed Ali'
                }
              ].map((route, i) => (
                <div key={i} className="p-4 border-b border-primary/10 hover:bg-primary/5 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        route.status === 'In Transit' ? 'bg-blue-100 text-blue-600' :
                        route.status === 'Loading' ? 'bg-orange-100 text-orange-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {route.status === 'In Transit' ? <MapIcon className="h-5 w-5" /> : 
                         route.status === 'Loading' ? <BarChart3 className="h-5 w-5" /> : 
                         <CheckCircle2 className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-semibold">{route.from} → {route.to}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>👨‍🚒 {route.driver}</span>
                          <span>📦 {route.supplies}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{route.efficiency}</p>
                      <Badge variant={route.priority === 'Critical' ? 'destructive' : 'secondary'} className="text-xs">
                        {route.priority}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        route.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                        route.status === 'Loading' ? 'bg-orange-100 text-orange-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {route.status}
                      </div>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        ETA: {route.eta}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-7 px-3 text-xs">
                        Track
                      </Button>
                      <Button size="sm" className="h-7 px-3 text-xs">
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-green-700">
                <Target className="h-5 w-5" />
                Optimization Metrics
              </CardTitle>
              <CardDescription className="text-green-600">AI-driven performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/50 rounded-lg">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold text-green-600">34%</p>
                  <p className="text-xs text-green-600">Faster Delivery</p>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-lg">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold text-green-600">$2.4M</p>
                  <p className="text-xs text-green-600">Cost Savings</p>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-lg">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold text-green-600">28%</p>
                  <p className="text-xs text-green-600">Fuel Reduction</p>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-lg">
                  <Globe className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold text-green-600">15%</p>
                  <p className="text-xs text-green-600">Carbon Footprint</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle className="text-lg flex items-center gap-2 text-blue-700">
                <Brain className="h-5 w-5" />
                AI Route Optimizer
              </CardTitle>
              <CardDescription className="text-blue-600">Machine learning recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Smart Suggestions
                </h4>
                <ul className="space-y-2 text-sm text-blue-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                    <span>Reroute via Highway 47 saves 45 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                    <span>Consolidate Delta-7 and Echo-5 deliveries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                    <span>Weather alert: Rain expected in 3 hours</span>
                  </li>
                </ul>
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Apply AI Optimizations
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
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
      ) : activeTab === "voicebot" ? (
        <DashboardLayout sidebar={sidebarContent}>
          {voiceBotContent}
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
            © 2025 Nourish AI Technologies. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60">AI Nourishment Intelligence System | Version 4.2.0-Alpha</p>
        </div>
      </footer>
    </div>
  )
}