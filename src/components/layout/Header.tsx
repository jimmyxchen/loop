interface HeaderProps {
  status: 'idle' | 'running' | 'error'
}

export default function Header({ status }: HeaderProps) {
  const statusLabel = status === 'running' ? 'Pipeline running' : status === 'error' ? 'Error' : 'Idle'
  const statusDot = status === 'running' ? 'bg-gray-900' : status === 'error' ? 'bg-red-500' : 'bg-gray-400'

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div>
        <h1 className="text-sm font-medium text-gray-900">AI Frontend Self-Evolution</h1>
        <p className="text-xs text-gray-500">Generate → Verify → Iterate</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className={`inline-block h-2 w-2 rounded-full ${statusDot}`} />
          <span className="text-xs text-gray-600">{statusLabel}</span>
        </div>
        <div className="h-4 w-px bg-gray-200" />
        <div className="h-7 w-7 rounded-full bg-gray-200" />
      </div>
    </header>
  )
}
