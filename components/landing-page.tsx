'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Shield, 
  Brain, 
  Target, 
  Zap, 
  Users, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight,
  Play,
  Star,
  TrendingUp,
  AlertTriangle,
  Heart,
  Globe,
  Activity,
  Sparkles,
  Apple
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function LandingPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [animatedStats, setAnimatedStats] = useState({ population: 0, alerts: 0, accuracy: 0 })
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({ population: 1200000, alerts: 12, accuracy: 94 })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleDashboardTransition = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      window.location.href = '/dashboard'
    }, 1200)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-background-solid via-background-solid to-secondary/20 ${isTransitioning ? 'overflow-hidden' : ''}`}>
      {isTransitioning && (
        <div className="fixed inset-0 z-[9999] bg-primary flex items-center justify-center text-4xl text-white animate-pulse">
          <div className="flex items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <span>Opening Dashboard...</span>
          </div>
        </div>
      )}
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#FFF3C4]/80 via-card/80 to-[#FFF3C4]/80 backdrop-blur-md border-b border-[#6FBF44]/20 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#6FBF44] via-[#F6A23A] to-[#E94A7F] flex items-center justify-center shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <Apple className="h-6 w-6 text-white drop-shadow-sm" />
              </div>
              <div>
                <h1 className="font-bold text-lg bg-gradient-to-r from-[#6FBF44] via-[#F6A23A] to-[#E94A7F] bg-clip-text text-transparent">Nourishment AI</h1>
                <p className="text-xs text-muted-foreground font-medium">Intelligence System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="hidden md:flex hover:bg-[#6FBF44]/10">
                Solutions
              </Button>
              <Button variant="ghost" className="hidden md:flex hover:bg-[#F6A23A]/10">
                About
              </Button>
              <Button variant="outline" className="border-[#E94A7F]/30 hover:bg-[#E94A7F]/10">
                Contact
              </Button>
              <Button onClick={() => router.push('/dashboard')} className="bg-gradient-to-r from-[#6FBF44] to-[#F6A23A] hover:from-[#6FBF44]/90 hover:to-[#F6A23A]/90">
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full px-4 py-2">
                🚀 Government-Grade AI Technology
              </Badge>
              <h1 className="text-5xl font-bold text-foreground leading-tight">
                AI-Powered
                <span className="bg-gradient-to-r from-[#6FBF44] via-[#F6A23A] to-[#E94A7F] bg-clip-text text-transparent block">Nourishment Intelligence</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Transform nutrition monitoring with real-time AI insights, early warning systems, and personalized interventions for healthier communities.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="group relative w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-2xl hover:shadow-3xl transition-all duration-800 hover:scale-110 flex items-center justify-center"
                onClick={handleDashboardTransition}
                disabled={isTransitioning}
              >
                <ArrowRight className="h-12 w-12 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Trusted by <span className="font-semibold text-foreground">50+ NGOs</span> worldwide
              </p>
            </div>
          </div>

          <div className="relative">
            <Card className="bg-card/95 backdrop-blur-sm shadow-2xl border-border/50 overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Intelligence Dashboard</h3>
                    <p className="text-xs text-muted-foreground">Live monitoring active</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-3 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="h-4 w-4 text-primary" />
                      <p className="text-2xl font-bold text-primary">
                        {(animatedStats.population / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">Population Monitored</p>
                    <div className="w-full bg-primary/20 rounded-full h-1 mt-2">
                      <div className="bg-primary h-1 rounded-full w-4/5 transition-all duration-1000"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange/10 to-orange/5 p-3 rounded-lg border border-orange/20">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-orange" />
                      <p className="text-2xl font-bold text-orange">{animatedStats.alerts}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Active Alerts</p>
                    <div className="w-full bg-orange/20 rounded-full h-1 mt-2">
                      <div className="bg-orange h-1 rounded-full w-3/4 transition-all duration-1000"></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-pink/10 to-pink/5 p-3 rounded-lg border border-pink/20 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-pink" />
                      <span className="text-sm font-medium">AI Accuracy</span>
                    </div>
                    <span className="text-sm text-pink font-bold">{animatedStats.accuracy}%</span>
                  </div>
                  <div className="w-full bg-pink/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-pink to-pink/80 h-2 rounded-full transition-all duration-1000" style={{width: `${animatedStats.accuracy}%`}}></div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-destructive/10 to-destructive/5 p-4 rounded-lg border border-destructive/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-destructive" />
                      <span className="text-sm font-medium">Risk Assessment</span>
                    </div>
                    <span className="text-sm text-destructive font-bold">High Risk</span>
                  </div>
                  <div className="w-full bg-destructive/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-destructive to-destructive/80 h-2 rounded-full w-3/4 transition-all duration-1000"></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/20 rounded-full blur-2xl animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Complete Nutrition Intelligence Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From real-time monitoring to personalized interventions, our AI-powered platform provides everything you need for effective nutrition management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl text-primary">AI Intelligence Pulse</CardTitle>
              <CardDescription>
                Real-time monitoring of nutrition risk clusters with predictive analytics and automated insights.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card/50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Processing Speed</span>
                  <span className="text-sm text-primary font-bold">2.3ms</span>
                </div>
                <div className="w-full bg-primary/20 rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full w-5/6 transition-all duration-1000"></div>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Population-scale monitoring
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Predictive risk modeling
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Automated reporting
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br from-orange/5 to-orange/10 border-orange/20">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange to-orange/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl text-orange">Early Warning System</CardTitle>
              <CardDescription>
                Proactive alerts and intervention recommendations before nutrition crises develop.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card/50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Alert Accuracy</span>
                  <span className="text-sm text-orange font-bold">97.2%</span>
                </div>
                <div className="w-full bg-orange/20 rounded-full h-1.5">
                  <div className="bg-orange h-1.5 rounded-full w-full transition-all duration-1000"></div>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-orange" />
                  Crisis prevention alerts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-orange" />
                  Risk threshold monitoring
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-orange" />
                  Automated escalation
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br from-pink/5 to-pink/10 border-pink/20">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-pink to-pink/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl text-pink">Beneficiary AI Assistant</CardTitle>
              <CardDescription>
                Personal nutrition guidance with multilingual AI support for individual beneficiaries.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card/50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">User Satisfaction</span>
                  <span className="text-sm text-pink font-bold">4.8/5</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < 5 ? 'fill-pink text-pink' : 'text-muted'}`} />
                  ))}
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-pink" />
                  Personalized recommendations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-pink" />
                  Multilingual support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-pink" />
                  Progress tracking
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-2 border-[#6FBF44]/30 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#6FBF44] to-[#6FBF44]/80 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-[#6FBF44] to-[#6FBF44]/80 bg-clip-text text-transparent mb-2">50K+</h3>
            <p className="text-sm text-muted-foreground font-medium">Lives Improved</p>
          </Card>
          
          <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-2 border-[#F6A23A]/30 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#F6A23A] to-[#F6A23A]/80 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-[#F6A23A] to-[#F6A23A]/80 bg-clip-text text-transparent mb-2">25+</h3>
            <p className="text-sm text-muted-foreground font-medium">Countries Served</p>
          </Card>
          
          <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-2 border-[#E94A7F]/30 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#E94A7F] to-[#E94A7F]/80 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-[#E94A7F] to-[#E94A7F]/80 bg-clip-text text-transparent mb-2">99.1%</h3>
            <p className="text-sm text-muted-foreground font-medium">Uptime Reliability</p>
          </Card>
          
          <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-2 border-green-500/30 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-green-500/80 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-green-500/80 bg-clip-text text-transparent mb-2">40%</h3>
            <p className="text-sm text-muted-foreground font-medium">Risk Reduction</p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="bg-gradient-to-br from-primary/10 via-orange/5 to-pink/10 border border-primary/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink/20 to-transparent rounded-full blur-2xl"></div>
          <CardContent className="text-center py-16 relative z-10">
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI-Powered Intelligence</span>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Ready to Transform Nutrition Monitoring?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join leading NGOs and government agencies using Yellowsense to create healthier communities through AI-powered nutrition intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="gap-2 shadow-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70" onClick={handleDashboardTransition}>
                Open Dashboard <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-primary/30 hover:bg-primary/5">
                Schedule Demo
              </Button>
            </div>
            
            {/* Mini dashboard preview */}
            <div className="max-w-md mx-auto bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Live System Status</span>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs text-green-600">Active</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <p className="text-lg font-bold text-primary">1.2M</p>
                  <p className="text-xs text-muted-foreground">Monitored</p>
                </div>
                <div className="bg-orange/10 p-2 rounded-lg">
                  <p className="text-lg font-bold text-orange">94%</p>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                </div>
                <div className="bg-pink/10 p-2 rounded-lg">
                  <p className="text-lg font-bold text-pink">24/7</p>
                  <p className="text-xs text-muted-foreground">Support</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#6FBF44] via-[#F6A23A] to-[#E94A7F] flex items-center justify-center">
                  <Apple className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold bg-gradient-to-r from-[#6FBF44] via-[#F6A23A] to-[#E94A7F] bg-clip-text text-transparent">Nourishment AI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered nourishment intelligence for healthier communities worldwide.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Solutions</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Intelligence Pulse</li>
                <li>Early Warning</li>
                <li>Beneficiary AI</li>
                <li>Supply Optimization</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Help Center</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-12 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Nourishment AI Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}