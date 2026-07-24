interface AgentNodeProps {
  label: string
  description: string
  status: 'idle' | 'running' | 'done' | 'error'
  active?: boolean
}

export default function AgentNode({ label, description, status, active }: AgentNodeProps) {
  const borderColor = status === 'running' ? 'border-gray-900' : status === 'error' ? 'border-red-500' : 'border-gray-200'
  const bgColor = status === 'done' ? 'bg-gray-50' : 'bg-white'
  const showSpinner = status === 'running'

  return (
    <div className={`flex flex-col items-center gap-2 rounded-lg border-2 ${borderColor} ${bgColor} p-4 min-w-[160px] ${active ? 'ring-2 ring-gray-300 ring-offset-2' : ''}`}>
      <div className="flex items-center justify-center">
        {showSpinner ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
        ) : (
          <div className={`h-3 w-3 rounded-full ${status === 'done' ? 'bg-gray-900' : status === 'error' ? 'bg-red-500' : 'bg-gray-300'}`} />
        )}
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  )
}
