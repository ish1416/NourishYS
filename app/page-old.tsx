"use client" // added use client for interactivity

import { useState } from "react" // added state for tabs and menu
import {
  Shield,
  Activity,
  Users,
  AlertTriangle,
  TrendingUp,
  Bell,
  Menu,
  User,
  BarChart3,
  MapIcon,
  ChevronRight,
  MessageSquare,
  Utensils,
  Leaf,
  Clock,
  CheckCircle2,
  X,
  Send,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function YellowsenseDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState("")

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab("dashboard")}>
            <div className="bg-primary p-1.5 rounded-lg">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">Yellowsense</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Button
              variant="ghost"
              className={`text-sm font-medium ${activeTab === "dashboard" ? "text-primary" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              Intelligence
            </Button>
            <Button variant="ghost" className="text-sm font-medium">
              Early Warning
            </Button>
            <Button variant="ghost" className="text-sm font-medium">
              Interventions
            </Button>
            <Button
              variant="ghost"
              className={`text-sm font-medium ${activeTab === "beneficiary" ? "text-primary" : ""}`}
              onClick={() => setActiveTab("beneficiary")}
            >
              Beneficiary AI
            </Button>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-destructive"></span>
            </Button>
            <Button
              variant="outline"
              className="hidden sm:flex border-primary text-primary hover:bg-primary/10 bg-transparent"
            >
              Agency Portal
            </Button>
            <Button size="icon" variant="ghost" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-b bg-background animate-in slide-in-from-top-4">
            <div className="flex flex-col p-4 space-y-2">
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => {
                  setActiveTab("dashboard")
                  setIsMenuOpen(false)
                }}
              >
                Intelligence
              </Button>
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => {
                  setActiveTab("beneficiary")
                  setIsMenuOpen(false)
                }}
              >
                Beneficiary AI
              </Button>
              <Button variant="ghost" className="justify-start">
                Early Warning
              </Button>
              <Button variant="ghost" className="justify-start">
                Agency Portal
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-8 space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 bg-muted/50">
            <TabsTrigger value="dashboard">Agency Dashboard</TabsTrigger>
            <TabsTrigger value="beneficiary">Beneficiary AI</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            {/* Hero Section / Intelligence Pulse */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Intelligence Pulse</h1>
                <p className="text-muted-foreground max-w-lg">
                  Real-time monitoring of under-nutrition risk clusters across prioritized regions.
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="px-3 py-1 bg-accent/50 text-accent-foreground border-accent">
                  Live Data: Sub-Saharan Region
                </Badge>
              </div>
            </div>

            {/* High Level Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-none shadow-sm bg-card transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Global Risk Index</CardTitle>
                  <Activity className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">64.2</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-destructive font-medium inline-flex items-center gap-0.5">
                      <TrendingUp className="h-3 w-3" /> +2.1%
                    </span>{" "}
                    from last month
                  </p>
                  <Progress value={64} className="h-1 mt-4" />
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-card transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pop. Monitored</CardTitle>
                  <Users className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.2M</div>
                  <p className="text-xs text-muted-foreground mt-1">Across 14 priority clusters</p>
                  <Progress value={88} className="h-1 mt-4" />
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-card transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Early Warning Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground mt-1">4 Critical (Immediate action)</p>
                  <Progress value={33} className="h-1 mt-4 bg-destructive/10" />
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-card transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Interventions</CardTitle>
                  <BarChart3 className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground mt-1">Optimized supply routes active</p>
                  <Progress value={75} className="h-1 mt-4" />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Dashboard View */}
              <Card className="lg:col-span-2 border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Risk Visualization</CardTitle>
                    <CardDescription>Predicted nutrition deficits (Next 30 Days)</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <MapIcon className="h-4 w-4" /> Full Map
                  </Button>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center bg-muted/30 rounded-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center">
                    <div className="relative w-full h-full max-w-md max-h-80 opacity-50">
                      <div className="absolute top-10 left-20 w-32 h-24 bg-primary/20 rounded-full blur-xl animate-pulse" />
                      <div className="absolute bottom-10 right-20 w-40 h-32 bg-destructive/20 rounded-full blur-2xl animate-pulse" />
                      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-primary/10 border-2 border-primary/20 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 bg-primary rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div className="z-10 text-center space-y-4 max-w-sm px-6">
                    <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl border border-border shadow-xl">
                      <h3 className="font-semibold text-lg text-foreground">Cluster Alpha-9</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Maternal nutrition risk increasing due to local harvest delays.
                      </p>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Deficit Forecast</span>
                        <span className="font-bold text-destructive">82%</span>
                      </div>
                      <Progress value={82} className="h-2 bg-destructive/10 text-destructive" />
                      <Button className="w-full mt-4 gap-2" size="sm">
                        Launch Intervention <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Side Intelligence Panel */}
              <div className="space-y-6">
                <Card className="border-none shadow-sm overflow-hidden">
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
                      <Progress value={32} className="h-1.5" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-accent/30">
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
            </div>
          </TabsContent>

          {/* Beneficiary Interface Tab Content */}
          <TabsContent value="beneficiary" className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Left Column: AI Assistant Chat Mockup */}
              <Card className="border-none shadow-lg overflow-hidden flex flex-col h-[600px] bg-card">
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
                    <Badge variant="outline" className="bg-primary/5">
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
                      Hello! I am your Yellowsense nutrition assistant. What have you eaten today? You can describe it
                      or upload a photo.
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
                      <p>
                        That is a good start! Rice provides energy and dal provides protein. However, you are missing
                        micronutrients today.
                      </p>
                      <div className="bg-background p-3 rounded-lg border border-primary/20">
                        <p className="font-semibold text-primary mb-1">AI Recommendation:</p>
                        <p className="text-xs text-muted-foreground">
                          Try adding some **dark leafy greens** or **carrots** to your next meal. These are currently
                          available in your local cluster market.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="p-4 border-t bg-muted/10">
                  <div className="relative">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Describe your meal..."
                      className="w-full bg-background border rounded-full py-3 px-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      onKeyDown={(e) => e.key === "Enter" && setChatMessage("")}
                    />
                    <Button
                      size="icon"
                      className="absolute right-1.5 top-1.5 h-8 w-8 rounded-full"
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

              {/* Right Column: Personal Stats & Early Warning Info */}
              <div className="space-y-6">
                <Card className="border-none shadow-md">
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

                <Card className="border-none shadow-md bg-destructive/5 border-l-4 border-l-destructive">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-5 w-5" />
                      <CardTitle className="text-lg">Early Warning Alert</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">
                      Your current nourishment trend indicates a **High Risk** of micronutrient deficiency within the
                      next 7 days if your dietary diversity doesn't improve.
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground bg-white/50 p-3 rounded-lg border border-destructive/10">
                      <Clock className="h-4 w-4" />
                      <span>Forecast: 14-day risk window active</span>
                    </div>
                    <Button variant="destructive" className="w-full h-10 shadow-sm">
                      Request Nutrition Support
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md bg-green-50/50 border-l-4 border-l-green-500">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="h-5 w-5" />
                      <CardTitle className="text-lg">AI Impact Forecast</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      By adding **1 portion of green vegetables** daily, your risk score will improve from 42% to
                      **68%** within 10 days.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t bg-card py-6">
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
