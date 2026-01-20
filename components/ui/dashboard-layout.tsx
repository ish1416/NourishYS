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
    <div className={cn('h-screen bg-gradient-to-br from-background-solid to-background-solid overflow-hidden', className)}>
      {/* Fixed Sidebar */}
      {sidebar}
      
      {/* Main Content with left margin for fixed sidebar */}
      <div className="ml-72 h-full flex">
        <main className={cn('flex-1 overflow-y-auto', rightPanel ? 'pr-4' : 'pr-8')}>
          <div className="p-8">
            {children}
          </div>
        </main>
        
        {/* Right Panel */}
        {rightPanel && (
          <aside className="w-80 flex-shrink-0 p-8 pl-4 overflow-y-auto">
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