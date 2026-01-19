'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface DashboardLayoutProps {
  sidebar: React.ReactNode
  children: React.ReactNode
  rightPanel?: React.ReactNode
  className?: string
}

function DashboardLayout({ sidebar, children, rightPanel, className }: DashboardLayoutProps) {
  return (
    <div className={cn('flex min-h-screen bg-gradient-to-br from-background-solid to-background-solid', className)}>
      {/* Sidebar */}
      <div className="w-72 flex-shrink-0">
        {sidebar}
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex">
        <main className={cn('flex-1 p-8', rightPanel ? 'pr-4' : 'pr-8')}>
          <div className="max-w-none">
            {children}
          </div>
        </main>
        
        {/* Right Panel */}
        {rightPanel && (
          <aside className="w-80 flex-shrink-0 p-8 pl-4">
            {rightPanel}
          </aside>
        )}
      </div>
    </div>
  )
}

function DashboardHeader({ title, subtitle, actions, className }: {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-end justify-between mb-8', className)}>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground max-w-2xl leading-relaxed">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex gap-3">
          {actions}
        </div>
      )}
    </div>
  )
}

export { DashboardLayout, DashboardHeader }