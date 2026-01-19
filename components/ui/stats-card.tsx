import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { Progress } from './progress'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  trend?: {
    value: string
    direction: 'up' | 'down' | 'neutral'
    icon?: React.ReactNode
  }
  progress?: number
  progressColor?: 'primary' | 'destructive' | 'orange'
  className?: string
}

function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  progress, 
  progressColor = 'primary',
  className 
}: StatsCardProps) {
  const progressColorClasses = {
    primary: 'bg-primary/20 [&>div]:bg-primary',
    destructive: 'bg-destructive/20 [&>div]:bg-destructive',
    orange: 'bg-orange/20 [&>div]:bg-orange'
  }

  const trendColorClasses = {
    up: 'text-destructive',
    down: 'text-primary',
    neutral: 'text-muted-foreground'
  }

  return (
    <Card className={cn('transition-all hover:shadow-xl hover:-translate-y-1', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary text-lg">{icon}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mb-4">{subtitle}</p>
        )}
        {trend && (
          <p className="text-xs mb-4">
            <span className={cn('font-medium inline-flex items-center gap-1', trendColorClasses[trend.direction])}>
              {trend.icon}
              {trend.value}
            </span>
            {' from last month'}
          </p>
        )}
        {progress !== undefined && (
          <Progress 
            value={progress} 
            className={cn('h-2', progressColorClasses[progressColor])} 
          />
        )}
      </CardContent>
    </Card>
  )
}

export { StatsCard }