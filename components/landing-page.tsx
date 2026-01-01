'use client'

import { useState } from 'react'
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
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function LandingPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const router = useRouter()

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
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-foreground">Yellowsense</h1>
                <p className="text-xs text-muted-foreground">AI Nourishment Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="hidden md:flex">
                Solutions
              </Button>
              <Button variant="ghost" className="hidden md:flex">
                About
              </Button>
              <Button variant="outline">
                Contact
              </Button>
              <Button onClick={() => router.push('/dashboard')}>
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
                <span className="text-primary block">Nourishment Intelligence</span>
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
                  <div className="bg-card p-3 rounded-lg">
                    <p className="text-2xl font-bold text-primary">1.2M</p>
                    <p className="text-xs text-muted-foreground">Population Monitored</p>
                  </div>
                  <div className="bg-card p-3 rounded-lg">
                    <p className="text-2xl font-bold text-destructive">12</p>
                    <p className="text-xs text-muted-foreground">Active Alerts</p>
                  </div>
                </div>
                
                <div className="bg-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Risk Assessment</span>
                    <span className="text-sm text-destructive font-bold">High Risk</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-destructive h-2 rounded-full w-3/4"></div>
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
          <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">AI Intelligence Pulse</CardTitle>
              <CardDescription>
                Real-time monitoring of nutrition risk clusters with predictive analytics and automated insights.
              </CardDescription>
            </CardHeader>
            <CardContent>
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

          <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-orange/10 flex items-center justify-center mb-4 group-hover:bg-orange/20 transition-colors">
                <Target className="h-6 w-6 text-orange" />
              </div>
              <CardTitle className="text-xl">Early Warning System</CardTitle>
              <CardDescription>
                Proactive alerts and intervention recommendations before nutrition crises develop.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Crisis prevention alerts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Risk threshold monitoring
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Automated escalation
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-pink/10 flex items-center justify-center mb-4 group-hover:bg-pink/20 transition-colors">
                <Users className="h-6 w-6 text-pink" />
              </div>
              <CardTitle className="text-xl">Beneficiary AI Assistant</CardTitle>
              <CardDescription>
                Personal nutrition guidance with multilingual AI support for individual beneficiaries.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Personalized recommendations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Multilingual support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Progress tracking
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="text-center py-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Ready to Transform Nutrition Monitoring?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join leading NGOs and government agencies using Yellowsense to create healthier communities through AI-powered nutrition intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 shadow-lg" onClick={handleDashboardTransition}>
                Open Dashboard <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
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
                <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <span className="font-bold text-foreground">Yellowsense</span>
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
              © 2025 Yellowsense Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}