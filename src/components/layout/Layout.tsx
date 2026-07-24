import { type ReactNode } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

interface LayoutProps {
  children: ReactNode
  currentPage: string
  onNavigate: (page: string) => void
  status: 'idle' | 'running' | 'error'
}

export default function Layout({ children, currentPage, onNavigate, status }: LayoutProps) {
  return (
    <div className="flex h-screen w-full bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header status={status} />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
