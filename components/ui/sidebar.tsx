'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface SidebarProps extends React.ComponentProps<'div'> {
  children: React.ReactNode
}

interface SidebarNavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}

function Sidebar({ className, children, ...props }: SidebarProps) {
  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-40 h-screen w-72 bg-gradient-to-b from-sidebar to-sidebar/95 border-r border-sidebar-border/50 backdrop-blur-sm shadow-xl shadow-black/5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function SidebarHeader({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 px-6 py-6 border-b border-sidebar-border/30',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function SidebarContent({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex-1 overflow-y-auto px-4 py-6', className)}
      {...props}
    >
      {children}
    </div>
  )
}

function SidebarNavItem({ icon, label, active = false, onClick }: SidebarNavItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        'w-full justify-start gap-3 h-12 px-4 mb-2 rounded-xl font-medium transition-all duration-200',
        active
          ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md hover:bg-sidebar-primary/90'
          : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
      )}
      onClick={onClick}
    >
      <span className={cn('text-lg', active ? 'text-white' : 'text-sidebar-foreground/60')}>
        {icon}
      </span>
      <span className="text-sm">{label}</span>
    </Button>
  )
}

function SidebarFooter({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'border-t border-sidebar-border/30 px-4 py-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarNavItem,
  SidebarFooter,
}