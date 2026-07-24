import { type ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error'
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  const styles: Record<string, string> = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-gray-100 text-gray-900',
    warning: 'bg-gray-100 text-gray-800',
    error: 'bg-gray-100 text-gray-900',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  )
}
